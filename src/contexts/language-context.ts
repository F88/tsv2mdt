import { createContext, use } from 'react';

export type Language = 'en' | 'fr' | 'ja';

export interface LanguageContextType {
  language: Language;
  setNextLanguage: () => void;
  nextLanguage: () => Language;
  changeLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function useLanguageContext() {
  const context = use(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
