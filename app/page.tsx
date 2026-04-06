"use client"

import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import { LocaleProvider } from "@/components/locale-provider"
import { Header } from "@/components/header"
import { PrayerTimesCard } from "@/components/prayer-times-card"
import { CountdownTimer } from "@/components/countdown-timer"
import { LocationPicker } from "@/components/location-picker"
import { Footer } from "@/components/footer"
import { PrayerPreferences } from "@/components/prayer-preferences"
import {
  calculatePrayerTimes,
  calculateQibla,
  getNextPrayer,
  type PrayerCalculationOptions,
  type PrayerTimesData,
} from "@/lib/prayer-times"

const QiblaCompass = dynamic(() => import("@/components/qibla-compass").then((m) => m.QiblaCompass), {
  loading: () => <div className="h-[320px] rounded-3xl glass-strong" aria-hidden="true" />,
})
const HijriCalendar = dynamic(() => import("@/components/hijri-calendar").then((m) => m.HijriCalendar), {
  loading: () => <div className="h-[320px] rounded-3xl glass-strong" aria-hidden="true" />,
})
const DailyVerse = dynamic(() => import("@/components/daily-verse").then((m) => m.DailyVerse), {
  loading: () => <div className="h-[320px] rounded-3xl glass-strong" aria-hidden="true" />,
})
const PrayerTracker = dynamic(() => import("@/components/prayer-tracker").then((m) => m.PrayerTracker), {
  loading: () => <div className="h-[260px] rounded-3xl glass-strong" aria-hidden="true" />,
})
const MotivationCard = dynamic(() => import("@/components/motivation-card").then((m) => m.MotivationCard), {
  loading: () => <div className="h-[260px] rounded-3xl glass-strong" aria-hidden="true" />,
})

const DEFAULT_LAT = 48.8566
const DEFAULT_LNG = 2.3522
const DEFAULT_CITY = "Paris, France"

type AppPreferences = PrayerCalculationOptions & {
  notificationsEnabled: boolean
  reminderMinutes: number
}

const DEFAULT_PREFS: AppPreferences = {
  method: "mwl",
  madhhab: "shafi",
  notificationsEnabled: false,
  reminderMinutes: 10,
}

export default function PrayerTimesPage() {
  const [lat, setLat] = useState(DEFAULT_LAT)
  const [lng, setLng] = useState(DEFAULT_LNG)
  const [city, setCity] = useState(DEFAULT_CITY)
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null)
  const [qiblaDirection, setQiblaDirection] = useState(0)
  const [nextPrayer, setNextPrayer] = useState("")
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [prefs, setPrefs] = useState<AppPreferences>(DEFAULT_PREFS)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedPrefs = globalThis?.localStorage?.getItem?.("salati-preferences")
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs) as AppPreferences
        setPrefs({ ...DEFAULT_PREFS, ...parsed })
      } catch {
        // Ignore invalid local data and keep defaults.
      }
    }

    const savedLocation = globalThis?.localStorage?.getItem?.("salati-location")
    if (savedLocation) {
      try {
        const parsed = JSON.parse(savedLocation) as { lat: number; lng: number; city: string }
        if (Number.isFinite(parsed.lat) && Number.isFinite(parsed.lng) && parsed.city) {
          setLat(parsed.lat)
          setLng(parsed.lng)
          setCity(parsed.city)
        }
      } catch {
        // Ignore invalid local data and keep defaults.
      }
    }
  }, [])

  useEffect(() => {
    const times = calculatePrayerTimes(lat, lng, new Date(), prefs)
    setPrayerTimes(times)
    setQiblaDirection(calculateQibla(lat, lng))
  }, [lat, lng, prefs])

  useEffect(() => {
    globalThis?.localStorage?.setItem?.("salati-preferences", JSON.stringify(prefs))
  }, [prefs])

  useEffect(() => {
    globalThis?.localStorage?.setItem?.("salati-location", JSON.stringify({ lat, lng, city }))
  }, [lat, lng, city])

  useEffect(() => {
    if (!prefs.notificationsEnabled || !prayerTimes || !("Notification" in globalThis)) return

    if (Notification.permission === "default") {
      Notification.requestPermission().catch(() => {
        // Browser blocked prompt.
      })
    }
    if (Notification.permission !== "granted") return

    const next = getNextPrayer(prayerTimes)
    const notificationDelay = next.remainingMs - prefs.reminderMinutes * 60 * 1000
    if (notificationDelay <= 0) return

    const timeout = setTimeout(() => {
      new Notification("Salati", {
        body: `Upcoming prayer: ${next.name.toUpperCase()} at ${next.time}`,
      })
    }, notificationDelay)

    return () => clearTimeout(timeout)
  }, [prayerTimes, prefs.notificationsEnabled, prefs.reminderMinutes])

  const handleDetectLocation = useCallback(() => {
    setLocationError(null)
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not available in this browser.")
      return
    }
    setLocationLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const newLat = pos.coords.latitude
        const newLng = pos.coords.longitude
        setLat(newLat)
        setLng(newLng)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${newLat}&lon=${newLng}&format=json`
          )
          if (!res.ok) {
            throw new Error("Reverse geocoding service is unavailable")
          }
          const data = await res.json()
          const cityName =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            "Unknown"
          const country = data.address?.country || ""
          setCity(`${cityName}, ${country}`)
        } catch {
          setCity(`${newLat.toFixed(2)}, ${newLng.toFixed(2)}`)
          setLocationError("Location found, but city lookup failed. Showing coordinates instead.")
        }
        setLocationLoading(false)
      },
      (err) => {
        setLocationLoading(false)
        setLocationError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied."
            : "Unable to detect your location right now."
        )
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    )
  }, [])

  const handleNextPrayerChange = useCallback((name: string) => {
    setNextPrayer(name)
  }, [])

  if (!prayerTimes || !mounted) {
    return (
      <LocaleProvider>
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Loading prayer times...</span>
          </div>
        </div>
      </LocaleProvider>
    )
  }

  return (
    <LocaleProvider>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Location picker */}
          <div className="mb-10">
            <LocationPicker
              city={city}
              onDetectLocation={handleDetectLocation}
              loading={locationLoading}
              error={locationError}
            />
          </div>

          <div className="mb-10">
            <PrayerPreferences value={prefs} onChange={setPrefs} />
          </div>

          {/* Main grid: Countdown + Prayer Times */}
          <section className="mb-10 grid gap-6 lg:grid-cols-2">
            <CountdownTimer
              prayerTimes={prayerTimes}
              onNextPrayerChange={handleNextPrayerChange}
            />
            <PrayerTimesCard prayerTimes={prayerTimes} nextPrayer={nextPrayer} />
          </section>

          {/* Secondary row: Qibla + Calendar + Verse */}
          <section className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <QiblaCompass direction={qiblaDirection} />
            <HijriCalendar />
            <DailyVerse />
          </section>

          {/* Bottom row: Tracker + Motivation */}
          <section className="mb-10 grid gap-6 lg:grid-cols-2">
            <PrayerTracker />
            <MotivationCard />
          </section>
        </main>

        <Footer />
      </div>
    </LocaleProvider>
  )
}
