"use client"

import { useState, useEffect } from "react"
import { useLocale } from "@/components/locale-provider"
import { type PrayerTimesData, getNextPrayer } from "@/lib/prayer-times"

interface CountdownTimerProps {
  prayerTimes: PrayerTimesData
  onNextPrayerChange: (name: string) => void
}

export function CountdownTimer({ prayerTimes, onNextPrayerChange }: CountdownTimerProps) {
  const { t } = useLocale()
  const [remaining, setRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [nextPrayerName, setNextPrayerName] = useState("")
  const [nextPrayerTime, setNextPrayerTime] = useState("")
  const [totalDuration, setTotalDuration] = useState(1)

  useEffect(() => {
    let initialMs = 0
    function update() {
      const next = getNextPrayer(prayerTimes)
      const totalSeconds = Math.max(0, Math.floor(next.remainingMs / 1000))
      setRemaining({
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      })
      setNextPrayerName(next.name)
      setNextPrayerTime(next.time)
      onNextPrayerChange(next.name)
      if (initialMs === 0) {
        initialMs = next.remainingMs
        setTotalDuration(initialMs)
      }
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [prayerTimes, onNextPrayerChange])

  const prayerLabel = t[nextPrayerName as keyof typeof t] || nextPrayerName
  const currentMs = (remaining.hours * 3600 + remaining.minutes * 60 + remaining.seconds) * 1000
  const progress = totalDuration > 0 ? Math.max(0, Math.min(100, ((totalDuration - currentMs) / totalDuration) * 100)) : 0

  const radius = 72
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress / 100)

  const timeBlocks = [
    { value: remaining.hours, label: t.hours },
    { value: remaining.minutes, label: t.minutes },
    { value: remaining.seconds, label: t.seconds },
  ]

  return (
    <div className="relative overflow-hidden rounded-3xl glass-strong p-6 shadow-xl sm:p-8">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-secondary/[0.04] blur-3xl" />

      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{t.timeUntil}</span>
        <span className="rounded-lg bg-muted/30 px-3 py-1 font-mono text-xs text-muted-foreground tabular-nums">{nextPrayerTime}</span>
      </div>

      {/* Prayer name */}
      <h3 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
        {prayerLabel}
      </h3>

      {/* Circular countdown */}
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg className="-rotate-90" width="200" height="200" viewBox="0 0 160 160" aria-hidden="true">
            {/* Outer decorative ring */}
            <circle cx="80" cy="80" r="78" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border/30" />
            {/* Tick marks */}
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i * 6 * Math.PI) / 180
              const isMajor = i % 5 === 0
              const r1 = isMajor ? 72 : 74
              const r2 = 76
              return (
                <line
                  key={i}
                  x1={80 + r1 * Math.cos(angle)}
                  y1={80 + r1 * Math.sin(angle)}
                  x2={80 + r2 * Math.cos(angle)}
                  y2={80 + r2 * Math.sin(angle)}
                  stroke="currentColor"
                  strokeWidth={isMajor ? 1.5 : 0.5}
                  className={isMajor ? "text-foreground/20" : "text-foreground/8"}
                />
              )
            })}
            {/* Track */}
            <circle cx="80" cy="80" r={radius} fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/25" />
            {/* Glow behind progress */}
            <circle cx="80" cy="80" r={radius} fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="text-primary/15 blur-[2px]" />
            {/* Progress */}
            <circle cx="80" cy="80" r={radius} fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="text-primary transition-all duration-1000" />
            {/* End dot */}
            {progress > 1 && (() => {
              const angle = ((progress / 100) * 360 - 90) * (Math.PI / 180)
              return <circle cx={80 + radius * Math.cos(angle)} cy={80 + radius * Math.sin(angle)} r="4" fill="currentColor" className="text-primary" />
            })()}
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <div className="flex items-baseline gap-0.5 font-mono text-4xl font-bold tabular-nums text-foreground">
              <span>{remaining.hours.toString().padStart(2, "0")}</span>
              <span className="animate-pulse text-primary/40">:</span>
              <span>{remaining.minutes.toString().padStart(2, "0")}</span>
              <span className="animate-pulse text-primary/40">:</span>
              <span className="text-2xl text-primary">{remaining.seconds.toString().padStart(2, "0")}</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{t.remainingTime}</span>
          </div>
        </div>
      </div>

      {/* Time blocks at bottom */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        {timeBlocks.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1.5 rounded-2xl bg-muted/15 py-3">
            <span className="font-mono text-2xl font-bold tabular-nums text-foreground">{item.value.toString().padStart(2, "0")}</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
