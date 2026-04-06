"use client"

import { Settings2 } from "lucide-react"
import type { CalculationMethod, Madhhab } from "@/lib/prayer-times"

type PrayerPreferences = {
  method: CalculationMethod
  madhhab: Madhhab
  notificationsEnabled: boolean
  reminderMinutes: number
}

interface PrayerPreferencesProps {
  value: PrayerPreferences
  onChange: (next: PrayerPreferences) => void
}

const methods: Array<{ value: CalculationMethod; label: string }> = [
  { value: "mwl", label: "Muslim World League" },
  { value: "umm_al_qura", label: "Umm al-Qura" },
  { value: "egyptian", label: "Egyptian" },
  { value: "karachi", label: "Karachi" },
]

export function PrayerPreferences({ value, onChange }: PrayerPreferencesProps) {
  return (
    <section className="rounded-3xl glass-strong p-5 shadow-xl sm:p-6" aria-labelledby="prefs-title">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Settings2 className="h-4.5 w-4.5 text-primary" />
        </div>
        <h2 id="prefs-title" className="text-base font-bold text-foreground">Prayer Preferences</h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm text-foreground">
          <span className="font-semibold">Calculation Method</span>
          <select
            className="rounded-xl border border-primary/20 bg-background/70 px-3 py-2 outline-none ring-primary/30 transition focus:ring"
            value={value.method}
            onChange={(e) => onChange({ ...value, method: e.target.value as CalculationMethod })}
          >
            {methods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-foreground">
          <span className="font-semibold">Asr School</span>
          <select
            className="rounded-xl border border-primary/20 bg-background/70 px-3 py-2 outline-none ring-primary/30 transition focus:ring"
            value={value.madhhab}
            onChange={(e) => onChange({ ...value, madhhab: e.target.value as Madhhab })}
          >
            <option value="shafi">Shafi / Maliki / Hanbali</option>
            <option value="hanafi">Hanafi</option>
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-primary/20 bg-background/60 px-3 py-2 text-sm text-foreground md:col-span-2">
          <input
            type="checkbox"
            checked={value.notificationsEnabled}
            onChange={(e) => onChange({ ...value, notificationsEnabled: e.target.checked })}
            className="h-4 w-4 accent-primary"
          />
          <span className="font-semibold">Enable adhan notification for next prayer</span>
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-foreground md:col-span-2">
          <span className="font-semibold">Reminder (minutes before prayer)</span>
          <input
            type="range"
            min={0}
            max={30}
            value={value.reminderMinutes}
            onChange={(e) => onChange({ ...value, reminderMinutes: Number(e.target.value) })}
            className="accent-primary"
          />
          <span className="text-xs text-muted-foreground">{value.reminderMinutes} min</span>
        </label>
      </div>
    </section>
  )
}
