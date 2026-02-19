"use client";

import { createContext, useContext, useEffect, useState } from "react";
import enTranslations from "@/locales/en.json";
import trTranslations from "@/locales/tr.json";

type Language = "en" | "tr";
type Translations = typeof enTranslations;

const translations: Record<Language, Translations> = {
  en: enTranslations,
  tr: trTranslations,
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
} | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("orion-language") as Language | null;
    if (stored === "tr" || stored === "en") {
      setLanguageState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("orion-language", language);
  }, [language, mounted]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const toggleLanguage = () => setLanguageState((prev) => (prev === "en" ? "tr" : "en"));

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        toggleLanguage, 
        t: translations[language] 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
