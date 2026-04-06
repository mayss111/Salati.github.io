"use client"

import { useLocale } from "@/components/locale-provider"
import { Sparkles } from "lucide-react"
import { IslamicPattern, StarDecoration } from "@/components/islamic-pattern"

export function MotivationCard() {
  const { t } = useLocale()

  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/[0.05] via-card to-secondary/[0.03] p-8 shadow-xl sm:p-10">
      <IslamicPattern className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 text-primary/[0.04]" />
      <StarDecoration className="pointer-events-none absolute right-[12%] top-[18%] h-4 w-4 text-primary/10 animate-twinkle" />
      <StarDecoration className="pointer-events-none absolute left-[10%] bottom-[15%] h-3 w-3 text-primary/8 animate-twinkle [animation-delay:1s]" />

      <div className="relative flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>

        <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {t.motivationTitle}
        </h3>

        <p className="mb-10 max-w-lg text-sm text-muted-foreground leading-relaxed">
          {t.motivationText}
        </p>

        {/* Stats */}
        <div className="flex w-full max-w-sm items-stretch justify-center gap-0">
          {[
            { value: "5", label: t.dailyPrayers },
            { value: "17", label: t.rakaatMin },
            { value: "365", label: t.daysYear },
          ].map((stat, i) => (
            <div key={stat.label} className="flex flex-1 items-center">
              <div className="flex w-full flex-col items-center gap-1.5 py-3">
                <span className="text-3xl font-extrabold tabular-nums text-primary sm:text-4xl">{stat.value}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</span>
              </div>
              {i < 2 && <div className="h-12 w-px shrink-0 bg-border/30" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
