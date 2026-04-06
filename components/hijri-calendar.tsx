"use client"

import { useLocale } from "@/components/locale-provider"
import { toHijri } from "@/lib/prayer-times"
import { Calendar } from "lucide-react"
import { CrescentMoon } from "@/components/islamic-pattern"

export function HijriCalendar() {
  const { t, locale } = useLocale()
  const today = new Date()
  const hijri = toHijri(today)

  const gregorianDate = today.toLocaleDateString(
    locale === "ar" ? "ar-SA" : locale === "ur" ? "ur-PK" : locale === "tr" ? "tr-TR" : locale === "fr" ? "fr-FR" : locale === "es" ? "es-ES" : locale === "de" ? "de-DE" : locale === "ms" ? "ms-MY" : locale === "id" ? "id-ID" : locale === "bn" ? "bn-BD" : "en-US",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  )

  return (
    <div className="flex flex-col rounded-3xl glass-strong p-6 shadow-xl">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Calendar className="h-4.5 w-4.5 text-primary" />
        </div>
        <h2 className="text-base font-bold text-foreground">{t.hijriCalendar}</h2>
      </div>

      {/* Hijri date hero */}
      <div className="relative my-2 overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/[0.06] to-secondary/[0.03] p-7">
        <CrescentMoon className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 text-primary/[0.05] animate-float" />
        <div className="relative text-center">
          <div className="text-6xl font-extrabold tabular-nums text-primary">{hijri.day}</div>
          <div className="mt-1.5 text-lg font-bold text-foreground">{hijri.monthName}</div>
          <div className="mt-0.5 text-sm font-medium text-muted-foreground">{hijri.year} AH</div>
        </div>
      </div>

      {/* Gregorian date */}
      <div className="mt-3 rounded-xl bg-muted/15 p-3.5 text-center">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{t.gregorian}</span>
        <p className="mt-1 text-sm font-medium text-foreground/75">{gregorianDate}</p>
      </div>

      {/* Hijri breakdown */}
      <div className="mt-auto pt-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: t.day, value: hijri.day },
            { label: t.month, value: hijri.month },
            { label: t.year, value: hijri.year },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center rounded-xl bg-muted/10 px-2 py-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{item.label}</span>
              <span className="mt-1 text-xl font-bold tabular-nums text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
