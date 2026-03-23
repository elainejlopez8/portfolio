import { getContentWithFallback } from '@/services/content/blob';
import type { CONTENT_KEYS } from '@/services/content/i18n';
import i18n, { resources } from '@/services/content/i18n';
import type { KeyPrefix } from 'i18next';
import get from 'lodash/get';
import { useEffect, useState } from 'react';
import { type UseTranslationOptions, useTranslation } from 'react-i18next';

const namespaceLoadStatus = new Map<CONTENT_KEYS, 'blob' | 'local'>();
const namespaceLoadPromises = new Map<CONTENT_KEYS, Promise<'blob' | 'local'>>();
const namespaceContentCache = new Map<CONTENT_KEYS, unknown>();

const ensureNamespaceContent = async (namespace: CONTENT_KEYS) => {
  const cachedStatus = namespaceLoadStatus.get(namespace);
  if (cachedStatus && namespaceContentCache.has(namespace)) {
    return {
      source: cachedStatus,
      content: namespaceContentCache.get(namespace),
    };
  }

  const activeLoad = namespaceLoadPromises.get(namespace);
  if (activeLoad) {
    const source = await activeLoad;
    return {
      source,
      content: namespaceContentCache.get(namespace),
    };
  }

  const loadPromise = getContentWithFallback(namespace)
    .then(({ source, content }) => {
      namespaceContentCache.set(namespace, content);
      namespaceLoadStatus.set(namespace, source);
      return source;
    })
    .finally(() => {
      namespaceLoadPromises.delete(namespace);
    });

  namespaceLoadPromises.set(namespace, loadPromise);
  const source = await loadPromise;
  return {
    source,
    content: namespaceContentCache.get(namespace),
  };
};

const interpolateContentValue = (value: unknown, options?: Record<string, unknown>): unknown => {
  if (typeof value === 'string') {
    return i18n.services.interpolator.interpolate(
      value,
      options ?? {},
      i18n.language,
      i18n.options.interpolation ?? {}
    );
  }

  if (Array.isArray(value)) {
    return value.map((entry) => interpolateContentValue(entry, options));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, interpolateContentValue(entry, options)])
    );
  }

  return value;
};

export const useContent = <
  Namespace extends CONTENT_KEYS = 'general',
  KPrefix extends KeyPrefix<Namespace> = undefined,
>(
  namespace: Namespace = 'general' as Namespace,
  options?: UseTranslationOptions<KPrefix>
) => {
  const translation = useTranslation(namespace, options);
  const [, setContentVersion] = useState(0);
  const [namespaceContent, setNamespaceContent] = useState<unknown>(
    namespaceContentCache.get(namespace) ?? resources.en[namespace]
  );

  useEffect(() => {
    let isMounted = true;

    ensureNamespaceContent(namespace).then(({ content }) => {
      if (!isMounted) {
        return;
      }

      setNamespaceContent(content ?? resources.en[namespace]);
      setContentVersion((version) => version + 1);
    });

    return () => {
      isMounted = false;
    };
  }, [namespace]);

  const t = ((key: string, translationOptions?: Record<string, unknown>) => {
    const resolvedValue = get(namespaceContent, key);

    if (resolvedValue !== undefined) {
      const interpolatedValue = interpolateContentValue(resolvedValue, translationOptions);

      if (
        translationOptions &&
        Object.prototype.hasOwnProperty.call(translationOptions, 'returnObjects') &&
        translationOptions.returnObjects
      ) {
        return interpolatedValue;
      }

      if (typeof interpolatedValue === 'string') {
        return interpolatedValue;
      }
    }

    return translation.t(key as never, translationOptions as never);
  }) as typeof translation.t;

  return {
    ...translation,
    t,
  };
};
