"use client"

import { useLocale } from "@/components/locale-provider"
import { BookOpen } from "lucide-react"
import { IslamicPattern } from "@/components/islamic-pattern"

export function DailyVerse() {
  const { t } = useLocale()

  return (
    <div className="relative flex flex-col overflow-hidden rounded-3xl glass-strong p-6 shadow-xl">
      <IslamicPattern className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 text-primary/[0.03]" />

      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <BookOpen className="h-4.5 w-4.5 text-primary" />
        </div>
        <h2 className="text-base font-bold text-foreground">{t.dailyVerse}</h2>
      </div>

      <div className="relative flex-1">
        {/* Large decorative quote */}
        <div className="absolute -left-1 -top-2 select-none font-serif text-8xl leading-none text-primary/[0.06]" aria-hidden="true">
          {'\u201C'}
        </div>

        <blockquote className="relative z-10 pt-8">
          <p className="text-base text-foreground/80 leading-relaxed italic">{t.verseText}</p>
        </blockquote>

        {/* Source */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-primary/15 to-transparent" />
          <cite className="flex items-center gap-2 text-sm font-bold text-primary not-italic">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
            {t.verseSource}
            <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
          </cite>
          <div className="h-px flex-1 bg-gradient-to-l from-primary/15 to-transparent" />
        </div>
      </div>
    </div>
  )
}
