"use client"

import { useLocale } from "@/components/locale-provider"
import { type PrayerTimesData } from "@/lib/prayer-times"
import { Sun, Sunrise, Sunset, Moon, CloudSun, CloudMoon } from "lucide-react"

const prayerIcons: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  fajr: { icon: <CloudMoon className="h-4.5 w-4.5" />, color: "text-blue-300", bg: "bg-blue-500/15" },
  sunrise: { icon: <Sunrise className="h-4.5 w-4.5" />, color: "text-amber-300", bg: "bg-amber-500/15" },
  dhuhr: { icon: <Sun className="h-4.5 w-4.5" />, color: "text-yellow-300", bg: "bg-yellow-500/15" },
  asr: { icon: <CloudSun className="h-4.5 w-4.5" />, color: "text-orange-300", bg: "bg-orange-500/15" },
  maghrib: { icon: <Sunset className="h-4.5 w-4.5" />, color: "text-rose-300", bg: "bg-rose-500/15" },
  isha: { icon: <Moon className="h-4.5 w-4.5" />, color: "text-indigo-300", bg: "bg-indigo-500/15" },
}

interface PrayerTimesCardProps {
  prayerTimes: PrayerTimesData
  nextPrayer: string
}

export function PrayerTimesCard({ prayerTimes, nextPrayer }: PrayerTimesCardProps) {
  const { t } = useLocale()

  const prayers = [
    { key: "fajr", name: t.fajr, time: prayerTimes.fajr },
    { key: "sunrise", name: t.sunrise, time: prayerTimes.sunrise },
    { key: "dhuhr", name: t.dhuhr, time: prayerTimes.dhuhr },
    { key: "asr", name: t.asr, time: prayerTimes.asr },
    { key: "maghrib", name: t.maghrib, time: prayerTimes.maghrib },
    { key: "isha", name: t.isha, time: prayerTimes.isha },
  ]

  return (
    <div className="relative overflow-hidden rounded-3xl glass-strong p-6 shadow-xl sm:p-8">
      <div className="pointer-events-none absolute -left-16 -top-16 h-32 w-32 rounded-full bg-secondary/[0.04] blur-3xl" />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{t.prayerTimes}</h2>
        <div className="flex items-center gap-2 rounded-xl bg-muted/20 px-3 py-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">{t.today}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {prayers.map((prayer, index) => {
          const isNext = prayer.key === nextPrayer
          const meta = prayerIcons[prayer.key]
          return (
            <div
              key={prayer.key}
              className={`group relative flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-500 ${
                isNext
                  ? "bg-primary/[0.08] shadow-lg shadow-primary/[0.05]"
                  : "hover:bg-muted/15"
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Active glow */}
              {isNext && (
                <>
                  <div className="absolute inset-y-2 start-0 w-[3px] rounded-full bg-primary" />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/20" />
                </>
              )}

              <div className="flex items-center gap-3.5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                  isNext ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : `${meta.bg} ${meta.color}`
                }`}>
                  {meta.icon}
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-semibold transition-colors ${isNext ? "text-primary" : "text-foreground"}`}>
                    {prayer.name}
                  </span>
                  {isNext && (
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/60">
                      {t.nextPrayer}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`font-mono text-lg font-bold tabular-nums tracking-wider transition-colors ${
                  isNext ? "text-primary" : "text-foreground/90"
                }`}>
                  {prayer.time}
                </span>
                {isNext && (
                  <div className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Visual timeline bar */}
      <div className="mt-6 flex items-center gap-1">
        {prayers.map((prayer, i) => {
          const isPast = prayers.findIndex(p => p.key === nextPrayer) > i
          const isCurrent = prayer.key === nextPrayer
          return (
            <div key={prayer.key} className="relative flex-1">
              <div className={`h-1 rounded-full transition-all duration-700 ${
                isPast ? "bg-primary/40" : isCurrent ? "bg-primary animate-shimmer bg-gradient-to-r from-primary/40 via-primary to-primary/40" : "bg-muted/20"
              }`} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
