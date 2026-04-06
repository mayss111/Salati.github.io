"use client"

import { useState, useEffect } from "react"
import { useLocale } from "@/components/locale-provider"
import { Check, Target, Sparkles } from "lucide-react"

const prayerKeys = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const

export function PrayerTracker() {
  const { t } = useLocale()
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [animate, setAnimate] = useState<string | null>(null)

  useEffect(() => {
    const now = new Date()
    const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime()
    const timeout = setTimeout(() => setCompleted({}), msUntilMidnight)
    return () => clearTimeout(timeout)
  }, [])

  const togglePrayer = (key: string) => {
    const newVal = !completed[key]
    setCompleted((prev) => ({ ...prev, [key]: newVal }))
    if (newVal) {
      setAnimate(key)
      setTimeout(() => setAnimate(null), 800)
    }
  }

  const completedCount = Object.values(completed).filter(Boolean).length
  const totalPrayers = prayerKeys.length
  const percentage = Math.round((completedCount / totalPrayers) * 100)
  const allDone = completedCount === totalPrayers

  const radius = 46
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - percentage / 100)

  return (
    <div className="rounded-3xl glass-strong p-6 shadow-xl sm:p-8">
      <div className="mb-1 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Target className="h-4.5 w-4.5 text-primary" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">{t.prayerTracker}</h2>
          <p className="text-[10px] text-muted-foreground">{t.trackerDesc}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
        {/* Progress ring */}
        <div className="relative shrink-0">
          <svg className="-rotate-90" width="130" height="130" viewBox="0 0 110 110" aria-hidden="true">
            <circle cx="55" cy="55" r={radius} fill="none" stroke="currentColor" strokeWidth="5" className="text-muted/20" />
            <circle cx="55" cy="55" r={radius} fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className={`transition-all duration-700 ${allDone ? "text-secondary" : "text-primary"}`} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {allDone ? (
              <Sparkles className="h-7 w-7 text-secondary animate-glow-pulse" />
            ) : (
              <>
                <span className="text-3xl font-extrabold tabular-nums text-foreground">{completedCount}</span>
                <span className="text-[10px] font-bold text-muted-foreground">/ {totalPrayers}</span>
              </>
            )}
          </div>
        </div>

        {/* Prayer list */}
        <div className="flex w-full flex-col gap-1.5">
          {prayerKeys.map((key) => {
            const isCompleted = completed[key]
            const isAnimating = animate === key
            return (
              <button
                key={key}
                onClick={() => togglePrayer(key)}
                className={`group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 ${
                  isCompleted ? "bg-secondary/[0.06]" : "bg-muted/10 hover:bg-muted/20"
                } ${isAnimating ? "scale-[1.02]" : ""}`}
                aria-label={`${t[key as keyof typeof t]} - ${isCompleted ? t.completed : t.markAsDone}`}
              >
                <span className={`text-sm font-semibold transition-all duration-300 ${isCompleted ? "text-secondary" : "text-foreground"}`}>
                  {t[key as keyof typeof t] as string}
                </span>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 ${
                  isCompleted
                    ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20 scale-110"
                    : "border-2 border-muted/50 text-transparent group-hover:border-primary/40"
                }`}>
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-semibold text-muted-foreground">{t.prayerProgress}</span>
          <span className={`font-bold tabular-nums ${allDone ? "text-secondary" : "text-primary"}`}>{percentage}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted/15">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              allDone ? "bg-gradient-to-r from-secondary/80 to-secondary" : "bg-gradient-to-r from-primary/60 to-primary"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {allDone && (
          <p className="mt-3 text-center text-sm font-bold text-secondary animate-slide-up">{t.allPrayersCompleted}</p>
        )}
      </div>
    </div>
  )
}
