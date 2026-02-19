"use client";
import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LANGS = ["TR", "EN"];

export function GlobalHeader() {
  const [lang, setLang] = useState("EN");
  const [theme, setTheme] = useState("dark");
  const [toast, setToast] = useState<string | null>(null);

  // Theme logic
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    setToast(theme === "dark" ? "Dark mode enabled" : "Light mode enabled");
    const t = setTimeout(() => setToast(null), 1200);
    return () => clearTimeout(t);
  }, [theme]);

  // Language logic
  const handleLang = (l: string) => {
    setLang(l);
    setToast(l === "EN" ? "English" : "Türkçe");
    setTimeout(() => setToast(null), 1200);
  };

  return (
    <div className="fixed top-6 right-8 z-50 flex items-center gap-4 px-5 py-2 rounded-xl border border-white/5 backdrop-blur-md bg-zinc-950/60 shadow-lg" style={{minWidth:180}}>
      {/* Language Toggle */}
      <div className="flex items-center gap-0.5 bg-zinc-900/60 rounded-lg overflow-hidden border border-white/5">
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => handleLang(l)}
            className={`px-3 py-1 text-xs font-semibold transition-colors duration-200 ${
              lang === l
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:bg-zinc-800/40"
            }`}
            aria-pressed={lang === l}
          >
            {l}
          </button>
        ))}
      </div>
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="ml-2 flex items-center justify-center w-9 h-9 rounded-lg border border-white/5 bg-zinc-900/60 transition-colors duration-300 hover:bg-zinc-800/60"
        aria-label="Toggle theme"
      >
        <motion.div
          key={theme}
          initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 360, scale: 1, opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-zinc-200" />
          ) : (
            <Sun className="w-5 h-5 text-zinc-200" />
          )}
        </motion.div>
      </button>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 right-0 bg-zinc-900/90 text-white text-xs px-4 py-2 rounded shadow border border-white/10"
            style={{ pointerEvents: "none" }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
