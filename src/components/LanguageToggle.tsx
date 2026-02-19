"use client";

import { useLanguage } from "./LanguageProvider";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex h-10 items-center gap-1.5 rounded-lg border px-3 transition-colors duration-300 hover:opacity-90"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
        color: "var(--text-primary)",
      }}
      aria-label={language === "en" ? "Switch to Turkish" : "Switch to English"}
    >
      <span
        className="text-sm font-semibold transition-colors duration-200"
        style={{
          color: language === "en" ? "var(--accent)" : "var(--text-tertiary)",
        }}
      >
        EN
      </span>
      <span
        className="text-sm font-light"
        style={{ color: "var(--border-color-strong)" }}
      >
        |
      </span>
      <span
        className="text-sm font-semibold transition-colors duration-200"
        style={{
          color: language === "tr" ? "var(--accent)" : "var(--text-tertiary)",
        }}
      >
        TR
      </span>
    </button>
  );
}
