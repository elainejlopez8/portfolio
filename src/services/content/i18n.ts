import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { content } from './default';

export const resources = {
  en: {
    ...content,
  },
};

export type CONTENT_KEYS = keyof (typeof resources)['en'];

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources,
    defaultNS: 'general',
    fallbackNS: 'general',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
