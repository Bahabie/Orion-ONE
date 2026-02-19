"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface SettingsContextProps {
  language: "tr" | "en";
  theme: "dark" | "light";
  setLanguage: (language: "tr" | "en") => void;
  setTheme: (theme: "dark" | "light") => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<"tr" | "en">(() => {
    return (localStorage.getItem("language") as "tr" | "en") || "en";
  });
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    return (localStorage.getItem("theme") as "dark" | "light") || "light";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <SettingsContext.Provider value={{ language, theme, setLanguage, setTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
