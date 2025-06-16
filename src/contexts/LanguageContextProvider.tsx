import {
  useState,
  useEffect,
  useMemo,
  type ReactNode,
  useCallback,
} from 'react';
import {
  LanguageContext,
  type Language,
  type LanguageContextType,
} from './language-context';
import i18n from '../i18n';
import { detectBrowserLanguage } from '../utils/language-detection';

interface Props {
  children: ReactNode;
}

export function LanguageContextProvider({ children }: Props) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (
      savedLanguage === 'en' ||
      savedLanguage === 'ja' ||
      savedLanguage === 'fr'
    ) {
      return savedLanguage;
    }
    // If no saved language, detect from browser preferences
    return detectBrowserLanguage();
  });

  const nextLanguage = useCallback((): Language => {
    switch (language) {
      case 'en':
        return 'fr';
      case 'fr':
        return 'ja';
      case 'ja':
        return 'en';
      default:
        return 'en';
    }
  }, [language]);

  const setNextLanguage = useCallback(() => {
    setLanguage(nextLanguage());
  }, [nextLanguage]);

  const changeLanguage = (language: Language) => {
    setLanguage(language);
  };

  useEffect(() => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language).catch((error: unknown) => {
      console.error('Failed to change language:', error);
    });
  }, [language]);

  const contextValue = useMemo<LanguageContextType>(
    () => ({
      language,
      nextLanguage,
      setNextLanguage,
      changeLanguage,
    }),
    [language, nextLanguage, setNextLanguage],
  );

  return <LanguageContext value={contextValue}>{children}</LanguageContext>;
}
