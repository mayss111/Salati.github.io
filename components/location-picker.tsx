"use client"

import { useLocale } from "@/components/locale-provider"
import { MapPin, Navigation, Loader2 } from "lucide-react"

interface LocationPickerProps {
  city: string
  onDetectLocation: () => void
  loading: boolean
  error?: string | null
}

export function LocationPicker({ city, onDetectLocation, loading, error }: LocationPickerProps) {
  const { t } = useLocale()

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div className="flex items-center gap-2.5 rounded-2xl glass px-5 py-3" aria-live="polite">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">{city || t.location}</span>
        </div>
        <button
          onClick={onDetectLocation}
          disabled={loading}
          className="group flex items-center gap-2.5 rounded-2xl border border-primary/20 bg-primary/[0.06] px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-primary/[0.12] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 disabled:opacity-50 disabled:pointer-events-none"
          aria-busy={loading}
          aria-describedby={error ? "location-error" : undefined}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Navigation className="h-4 w-4 transition-transform group-hover:-rotate-12" />
          )}
          {t.detectLocation}
        </button>
      </div>

      {error ? (
        <p id="location-error" role="status" aria-live="assertive" className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200">
          {error}
        </p>
      ) : null}
    </div>
  )
}
