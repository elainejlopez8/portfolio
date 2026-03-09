import { useTranslation, UseTranslationOptions, UseTranslationResponse } from 'react-i18next';

type UseContentOptions = {
  ns?: string | string[];
  keyPrefix?: string;
  options?: UseTranslationOptions<string>;
};

export default function useContent({
  ns = 'general',
  keyPrefix,
  options,
}: UseContentOptions = {}): UseTranslationResponse<string, string> {
  const useTranslationOptions = keyPrefix ? { ...(options || {}), keyPrefix } : options;
  return useTranslation(ns, useTranslationOptions as UseTranslationOptions<string>);
}
