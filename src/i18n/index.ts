import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ja from './locales/ja.json';
import fr from './locales/fr.json';

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  ja: {
    translation: ja,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
  .catch((error: unknown) => {
    let errorMessage = 'Failed to initialize i18n';
    if (error instanceof Error && error.message) {
      errorMessage += `: ${error.message}`;
    }
    console.error(errorMessage, error);
  });

export default i18n;
