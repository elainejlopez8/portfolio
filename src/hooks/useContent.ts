import { CONTENT_KEYS } from '@/services/content/i18n';
import { KeyPrefix } from 'i18next';
import { useTranslation, UseTranslationOptions } from 'react-i18next';

export const useContent = <
  Namespace extends CONTENT_KEYS = 'general',
  KPrefix extends KeyPrefix<Namespace> = undefined,
>(
  namespace: Namespace = 'general' as Namespace,
  options?: UseTranslationOptions<KPrefix>
) => {
  return useTranslation(namespace, options);
};
