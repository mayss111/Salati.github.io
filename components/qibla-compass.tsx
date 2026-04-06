"use client"

import { useLocale } from "@/components/locale-provider"
import { Compass } from "lucide-react"

interface QiblaCompassProps {
  direction: number
}

export function QiblaCompass({ direction }: QiblaCompassProps) {
  const { t } = useLocale()

  return (
    <div className="flex flex-col rounded-3xl glass-strong p-6 shadow-xl">
      <div className="mb-1 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Compass className="h-4.5 w-4.5 text-primary" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">{t.qiblaDirection}</h2>
          <p className="text-[10px] text-muted-foreground">{t.qiblaDesc}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-6">
        <div className="relative flex h-48 w-48 items-center justify-center">
          {/* Outer rings */}
          <div className="absolute inset-0 rounded-full border border-border/30" />
          <div className="absolute inset-2 rounded-full border border-border/20" />
          <div className="absolute inset-4 rounded-full border border-border/10" />

          {/* Cardinal marks */}
          {[
            { label: "N", angle: 0, primary: true },
            { label: "E", angle: 90, primary: false },
            { label: "S", angle: 180, primary: false },
            { label: "W", angle: 270, primary: false },
          ].map(({ label, angle, primary }) => {
            const rad = (angle * Math.PI) / 180
            const r = 88
            return (
              <span
                key={label}
                className={`absolute text-[10px] font-extrabold ${primary ? "text-primary" : "text-muted-foreground/40"}`}
                style={{
                  left: `calc(50% + ${Math.sin(rad) * r}px - 6px)`,
                  top: `calc(50% - ${Math.cos(rad) * r}px - 6px)`,
                }}
              >
                {label}
              </span>
            )
          })}

          {/* Degree ticks */}
          {Array.from({ length: 72 }).map((_, i) => (
            <div key={i} className="absolute left-1/2 top-0 origin-bottom" style={{ height: "50%", transform: `rotate(${i * 5}deg)` }}>
              <div className={`mx-auto ${
                i % 18 === 0 ? "h-3 w-0.5 bg-primary/50" : i % 9 === 0 ? "h-2 w-0.5 bg-foreground/20" : "h-1 w-px bg-muted-foreground/10"
              }`} />
            </div>
          ))}

          {/* Qibla needle with glow */}
          <div
            className="absolute left-1/2 top-1/2 -ml-px origin-bottom"
            style={{ height: "38%", transform: `rotate(${direction}deg) translateY(-100%)` }}
          >
            <div className="relative h-full w-0.5">
              <div className="absolute inset-0 rounded-t-full bg-primary/20 blur-sm" />
              <div className="absolute inset-0 rounded-t-full bg-gradient-to-t from-primary/20 to-primary" />
              {/* Kaaba marker */}
              <div className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center">
                <div className="h-4 w-4 rotate-45 rounded-sm bg-primary shadow-lg shadow-primary/40" />
                <div className="absolute h-2 w-2 rotate-45 rounded-sm bg-primary-foreground/80" />
              </div>
            </div>
          </div>

          {/* Center hub */}
          <div className="relative z-10 h-6 w-6 rounded-full border-2 border-primary/40 bg-card shadow-lg">
            <div className="absolute inset-1 rounded-full bg-primary" />
          </div>
        </div>

        {/* Degree readout */}
        <div className="mt-6 flex items-center gap-2">
          <span className="text-4xl font-extrabold tabular-nums text-primary">{direction}</span>
          <div className="flex flex-col">
            <span className="text-lg leading-none text-primary/60">&deg;</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.degree}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
