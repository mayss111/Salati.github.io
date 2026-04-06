"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Locale, getTranslation, getDirection } from "@/lib/i18n"

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: ReturnType<typeof getTranslation>
  dir: "ltr" | "rtl"
}

const LocaleContext = createContext<LocaleContextType | null>(null)

const validLocales = ["en", "fr", "ar", "tr", "ur", "es", "de", "ms", "id", "bn"]

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    const saved = globalThis?.localStorage?.getItem?.("salati-locale")
    if (saved && validLocales.includes(saved)) {
      setLocale(saved as Locale)
    }
  }, [])

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    globalThis?.localStorage?.setItem?.("salati-locale", newLocale)
  }

  const t = getTranslation(locale)
  const dir = getDirection(locale)

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t, dir }}>
      <div dir={dir} lang={locale} className={locale === "ar" || locale === "ur" || locale === "bn" ? "font-serif" : "font-sans"}>
        {children}
      </div>
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error("useLocale must be used within a LocaleProvider")
  return context
}
