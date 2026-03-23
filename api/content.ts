import { get, head, put } from '@vercel/blob';
import { vercelLog } from '../lib/vercel-log.js';

const ALLOWED_NAMESPACE_VALUES = ['general', 'aboutMe', 'projects', 'resume'] as const;
type AllowedNamespace = (typeof ALLOWED_NAMESPACE_VALUES)[number];
const ALLOWED_NAMESPACES = new Set(ALLOWED_NAMESPACE_VALUES);

const coercePayload = (body: unknown) => {
  if (!body) {
    return {};
  }

  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(body)) {
    try {
      return JSON.parse(body.toString('utf8'));
    } catch {
      return {};
    }
  }

  if (body instanceof Uint8Array) {
    try {
      return JSON.parse(new TextDecoder().decode(body));
    } catch {
      return {};
    }
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  return typeof body === 'object' ? body : {};
};

const normalizeEntries = (body: Record<string, unknown>) => {
  if (Array.isArray(body.entries)) {
    return body.entries.filter(
      (entry): entry is { namespace: AllowedNamespace; content: unknown } =>
        Boolean(entry) &&
        typeof entry === 'object' &&
        typeof entry.namespace === 'string' &&
        ALLOWED_NAMESPACES.has(entry.namespace as AllowedNamespace) &&
        Object.prototype.hasOwnProperty.call(entry, 'content')
    );
  }

  if (
    typeof body.namespace === 'string' &&
    ALLOWED_NAMESPACES.has(body.namespace as AllowedNamespace) &&
    Object.prototype.hasOwnProperty.call(body, 'content')
  ) {
    return [{ namespace: body.namespace as AllowedNamespace, content: body.content }];
  }

  return [];
};

const readStreamToString = async (stream: ReadableStream<Uint8Array> | null) => {
  if (!stream) {
    return '';
  }

  const blobResponse = new Response(stream);
  return blobResponse.text();
};

const parseBlobJson = (text: string) => {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    const trimmed = text.trimStart();
    const firstObjectIndex = trimmed.search(/[\[{]/);

    if (firstObjectIndex > 0) {
      return JSON.parse(trimmed.slice(firstObjectIndex));
    }

    throw new Error(`Invalid blob JSON payload prefix: ${JSON.stringify(trimmed.slice(0, 24))}`);
  }
};

const getLocalContentResponse = (namespace: AllowedNamespace) => ({
  namespace,
  source: 'local',
  content: null,
});

export default async function handler(request, response) {
  if (!['GET', 'POST'].includes(request.method)) {
    response.setHeader('Allow', 'GET, POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  if (request.method === 'GET') {
    const rawNamespace = request.query?.namespace;
    const namespace = Array.isArray(rawNamespace) ? rawNamespace[0] : rawNamespace;

    if (typeof namespace !== 'string' || !ALLOWED_NAMESPACES.has(namespace as AllowedNamespace)) {
      return response.status(400).json({ error: 'Invalid namespace' });
    }

    const typedNamespace = namespace as AllowedNamespace;

    try {
      const blobMetadata = await head(`content/${typedNamespace}.json`);
      const blobResult = await get(blobMetadata.url, { access: 'private' });

      const text = await readStreamToString(blobResult.stream);
      const parsedContent = parseBlobJson(text);

      response.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=300');

      return response.status(200).json({
        namespace: typedNamespace,
        source: 'blob',
        content: parsedContent,
        blob: {
          pathname: blobMetadata.pathname,
          url: blobMetadata.url,
          etag: blobMetadata.etag,
          uploadedAt: blobMetadata.uploadedAt,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      if (!message.includes('The requested blob does not exist')) {
        vercelLog('warn', '[content] Failed to read blob content', {
          namespace: typedNamespace,
          message,
        });
      }

      return response.status(200).json(getLocalContentResponse(typedNamespace));
    }
  }

  const body = coercePayload(request.body) as Record<string, unknown>;
  const entries = normalizeEntries(body);

  if (entries.length === 0) {
    return response.status(400).json({
      error:
        'Provide either { namespace, content } or { entries: [{ namespace, content }] } for general, aboutMe, projects, or resume',
    });
  }

  try {
    const uploads = await Promise.all(
      entries.map(async ({ namespace, content }) => {
        const blob = await put(`content/${namespace}.json`, JSON.stringify(content, null, 2), {
          access: 'private',
          allowOverwrite: true,
          cacheControlMaxAge: 60,
          contentType: 'application/json',
        });

        return {
          namespace,
          pathname: blob.pathname,
          url: blob.url,
        };
      })
    );

    return response.status(200).json({ uploads });
  } catch (error) {
    vercelLog('error', '[content] Failed to upload content to Blob', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      namespaces: entries.map((entry) => entry.namespace),
    });

    return response.status(500).json({ error: error instanceof Error ? error.message : 'Failed to upload content' });
  }
}
