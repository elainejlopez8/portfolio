import { vercelLog } from './_lib/vercel-log';

const ALLOWED_LEVELS = new Set(['debug', 'info', 'warn', 'error']);

const coercePayload = (body) => {
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

const normalizeValue = (value) => {
  if (value == null) {
    return undefined;
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  if (value instanceof Error) {
    return {
      message: value.message,
      stack: value.stack,
      name: value.name,
    };
  }

  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }

  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, entry]) => [key, normalizeValue(entry)])
        .filter(([, entry]) => entry !== undefined)
    );
  }

  return String(value);
};

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const body = coercePayload(request.body);
  const level = ALLOWED_LEVELS.has(body.level) ? body.level : 'info';
  const message = typeof body.message === 'string' && body.message.trim() ? body.message.trim() : 'Client log event';
  const metadata = normalizeValue({
    source: 'client',
    pathname: typeof body.pathname === 'string' ? body.pathname : undefined,
    timestamp: typeof body.timestamp === 'string' ? body.timestamp : new Date().toISOString(),
    userAgent: typeof body.userAgent === 'string' ? body.userAgent : undefined,
    context: body.context,
  });

  vercelLog(level, `[client] ${message}`, metadata);

  return response.status(204).end();
}
