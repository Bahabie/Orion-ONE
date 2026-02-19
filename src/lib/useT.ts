"use client";

import { useSettings } from "@/context/SettingsContext";
import { t } from "@/lib/translations";

export function useT() {
  const { language } = useSettings();
  return (key: string) => t(key, language);
}
