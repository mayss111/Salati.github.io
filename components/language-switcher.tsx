"use client"

import { useState, useRef, useEffect } from "react"
import { useLocale } from "@/components/locale-provider"
import { locales, type Locale } from "@/lib/i18n"
import { Globe, ChevronDown } from "lucide-react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const current = locales.find((l) => l.code === locale)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/30 px-3 py-2 text-sm font-medium text-foreground backdrop-blur-md transition-all hover:bg-card/60 hover:border-primary/30"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4 text-primary" />
        <span>{current?.label}</span>
        <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border/50 bg-card/95 shadow-xl shadow-background/50 backdrop-blur-xl">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code as Locale)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-all ${
                locale === l.code
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-muted/50"
              }`}
            >
              <span className="text-base">{l.flag === "GB" ? "🇬🇧" : l.flag === "FR" ? "🇫🇷" : l.flag === "SA" ? "🇸🇦" : l.flag === "TR" ? "🇹🇷" : "🇵🇰"}</span>
              <span>{l.label}</span>
              {locale === l.code && (
                <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
