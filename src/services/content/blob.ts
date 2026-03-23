import merge from 'lodash/merge';
import { resources, type CONTENT_KEYS } from './i18n';

type BlobContentResponse = {
  namespace: CONTENT_KEYS;
  source: 'blob' | 'local';
  content: unknown;
  blob?: {
    pathname: string;
    url: string;
    etag: string;
    uploadedAt: string;
  };
};

export async function getContentWithFallback<Namespace extends CONTENT_KEYS>(namespace: Namespace) {
  const localContent = resources.en[namespace];

  try {
    const response = await fetch(`/api/content?namespace=${encodeURIComponent(namespace)}`);
    const payload = (await response.json()) as BlobContentResponse;

    return {
      namespace,
      source: payload.source === 'blob' ? ('blob' as const) : ('local' as const),
      content: merge({}, localContent, payload.content),
      blob: payload.blob,
    };
  } catch {
    return {
      namespace,
      source: 'local' as const,
      content: localContent,
    };
  }
}
