import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

void i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',

  // have a common namespace used around the full app
  ns: ['translationsNS'],
  defaultNS: 'translationsNS',

  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  resources: {
    en: {
      translationsNS: {
        loadSample: 'Load Sample',
        clearAll: 'Clear All',
        htmlPreview: 'HTML Preview',
        columnAlignment: 'Column Alignment',
        alignmentDefault: 'Default',
        alignmentLeft: 'Left',
        alignmentCenter: 'Center',
        alignmentRight: 'Right',
      },
    },
  },
});

export default i18n;
