"use client"

import { useState, useEffect, useCallback } from "react"
import { LocaleProvider } from "@/components/locale-provider"
import { Header } from "@/components/header"
import { PrayerTimesCard } from "@/components/prayer-times-card"
import { CountdownTimer } from "@/components/countdown-timer"
import { QiblaCompass } from "@/components/qibla-compass"
import { HijriCalendar } from "@/components/hijri-calendar"
import { DailyVerse } from "@/components/daily-verse"
import { PrayerTracker } from "@/components/prayer-tracker"
import { LocationPicker } from "@/components/location-picker"
import { MotivationCard } from "@/components/motivation-card"
import { Footer } from "@/components/footer"
import {
  calculatePrayerTimes,
  calculateQibla,
  type PrayerTimesData,
} from "@/lib/prayer-times"

const DEFAULT_LAT = 48.8566
const DEFAULT_LNG = 2.3522
const DEFAULT_CITY = "Paris, France"

export default function PrayerTimesPage() {
  const [lat, setLat] = useState(DEFAULT_LAT)
  const [lng, setLng] = useState(DEFAULT_LNG)
  const [city, setCity] = useState(DEFAULT_CITY)
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null)
  const [qiblaDirection, setQiblaDirection] = useState(0)
  const [nextPrayer, setNextPrayer] = useState("")
  const [locationLoading, setLocationLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const times = calculatePrayerTimes(lat, lng, new Date())
    setPrayerTimes(times)
    setQiblaDirection(calculateQibla(lat, lng))
  }, [lat, lng])

  const handleDetectLocation = useCallback(() => {
    if (!navigator.geolocation) return
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
        }
        setLocationLoading(false)
      },
      () => setLocationLoading(false)
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
            />
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
