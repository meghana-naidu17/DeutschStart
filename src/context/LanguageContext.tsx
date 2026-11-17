import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { TargetLanguage, LanguageOption } from '../types';
import { availableLanguages, germanDictionary, uiTranslations, type WordTranslation } from '../data/translations';

interface LanguageContextType {
  targetLanguage: TargetLanguage;
  setTargetLanguage: (lang: TargetLanguage) => void;
  currentLanguage: LanguageOption;
  availableLanguages: LanguageOption[];
  t: (key: string) => string;
  lookupWord: (query: string) => WordTranslation | undefined;
  searchDictionary: (query: string) => WordTranslation[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'deutschstart_target_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [targetLanguage, setTargetLanguageState] = useState<TargetLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as TargetLanguage | null;
      if (saved && availableLanguages.some((l) => l.code === saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const setTargetLanguage = (lang: TargetLanguage) => {
    setTargetLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const currentLanguage =
    availableLanguages.find((l) => l.code === targetLanguage) || availableLanguages[0];

  const t = (key: string): string => {
    const langDict = uiTranslations[targetLanguage] || uiTranslations.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    return uiTranslations.en[key] || key;
  };

  const lookupWord = (query: string): WordTranslation | undefined => {
    const q = query.trim().toLowerCase();
    if (!q) return undefined;

    return germanDictionary.find((item) => {
      if (item.german.toLowerCase() === q) return true;
      const trans = item.translations[targetLanguage];
      if (trans && trans.toLowerCase().includes(q)) return true;
      const transEn = item.translations.en;
      if (transEn && transEn.toLowerCase().includes(q)) return true;
      return false;
    });
  };

  const searchDictionary = (query: string): WordTranslation[] => {
    const q = query.trim().toLowerCase();
    if (!q) return germanDictionary.slice(0, 8);

    return germanDictionary.filter((item) => {
      if (item.german.toLowerCase().includes(q)) return true;
      if (item.category.toLowerCase().includes(q)) return true;
      const trans = item.translations[targetLanguage];
      if (trans && trans.toLowerCase().includes(q)) return true;
      const transEn = item.translations.en;
      if (transEn && transEn.toLowerCase().includes(q)) return true;
      return false;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', targetLanguage);
  }, [targetLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        targetLanguage,
        setTargetLanguage,
        currentLanguage,
        availableLanguages,
        t,
        lookupWord,
        searchDictionary
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
