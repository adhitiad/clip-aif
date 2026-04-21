"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import id from "@/dictionaries/id.json";
import en from "@/dictionaries/en.json";
import { useAuthStore } from "@/store/authStore";
import Cookies from "js-cookie";

type Language = "id" | "en";
type Dictionaries = typeof id;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const dictionaries: Record<Language, Dictionaries> = { id, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { user, updateUserSettings } = useAuthStore();
  const [language, setLanguageState] = useState<Language>("id");

  // Load language from storage/store
  useEffect(() => {
    const savedLang = Cookies.get("preferred_language") as Language;
    const userLang = user?.settings?.preferred_language;
    
    if (userLang) {
      setLanguageState(userLang);
    } else if (savedLang) {
      setLanguageState(savedLang);
    }
  }, [user?.settings?.preferred_language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    Cookies.set("preferred_language", lang, { expires: 365, path: "/" });
    updateUserSettings({ preferred_language: lang });
  };

  const t = (path: string) => {
    const keys = path.split(".");
    let result: any = dictionaries[language];

    for (const key of keys) {
      if (result[key] === undefined) {
        console.warn(`Translation key not found: ${path}`);
        return path;
      }
      result = result[key];
    }

    return result as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
