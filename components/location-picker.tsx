"use client"

import { useLocale } from "@/components/locale-provider"
import { MapPin, Navigation, Loader2 } from "lucide-react"

interface LocationPickerProps {
  city: string
  onDetectLocation: () => void
  loading: boolean
  error?: "geolocation_unavailable" | "permission_denied" | "location_failed" | "reverse_geocode_failed" | null
}

export function LocationPicker({ city, onDetectLocation, loading, error }: LocationPickerProps) {
  const { t, locale } = useLocale()

  const errorMessages = {
    en: {
      geolocation_unavailable: "Geolocation is not available in this browser.",
      permission_denied: "Location permission denied.",
      location_failed: "Unable to detect your location right now.",
      reverse_geocode_failed: "Location found, but city lookup failed. Showing coordinates instead.",
    },
    fr: {
      geolocation_unavailable: "La geolocalisation n'est pas disponible dans ce navigateur.",
      permission_denied: "Permission de localisation refusee.",
      location_failed: "Impossible de detecter votre position pour le moment.",
      reverse_geocode_failed: "Position detectee, mais ville introuvable. Coordonnees affichees.",
    },
    ar: {
      geolocation_unavailable: "تحديد الموقع غير متاح في هذا المتصفح.",
      permission_denied: "تم رفض إذن الموقع.",
      location_failed: "تعذر تحديد موقعك الآن.",
      reverse_geocode_failed: "تم العثور على الموقع لكن تعذر تحديد المدينة. سيتم عرض الإحداثيات.",
    },
    tr: {
      geolocation_unavailable: "Bu tarayicida konum ozelligi desteklenmiyor.",
      permission_denied: "Konum izni reddedildi.",
      location_failed: "Konumunuz su anda algilanamiyor.",
      reverse_geocode_failed: "Konum bulundu ancak sehir alinamadi. Koordinatlar gosteriliyor.",
    },
    ur: {
      geolocation_unavailable: "اس براؤزر میں لوکیشن دستیاب نہیں ہے۔",
      permission_denied: "لوکیشن کی اجازت مسترد کر دی گئی۔",
      location_failed: "اس وقت آپ کی لوکیشن معلوم نہیں ہو سکی۔",
      reverse_geocode_failed: "لوکیشن مل گئی لیکن شہر نہیں ملا، کوآرڈینیٹس دکھائے جا رہے ہیں۔",
    },
    es: {
      geolocation_unavailable: "La geolocalizacion no esta disponible en este navegador.",
      permission_denied: "Permiso de ubicacion denegado.",
      location_failed: "No se pudo detectar tu ubicacion ahora.",
      reverse_geocode_failed: "Ubicacion encontrada, pero fallo al obtener la ciudad. Mostrando coordenadas.",
    },
    de: {
      geolocation_unavailable: "Geolokalisierung ist in diesem Browser nicht verfugbar.",
      permission_denied: "Standortberechtigung verweigert.",
      location_failed: "Ihr Standort kann derzeit nicht erkannt werden.",
      reverse_geocode_failed: "Standort gefunden, aber Stadt konnte nicht ermittelt werden. Koordinaten werden angezeigt.",
    },
    ms: {
      geolocation_unavailable: "Geolokasi tidak tersedia dalam pelayar ini.",
      permission_denied: "Kebenaran lokasi ditolak.",
      location_failed: "Lokasi anda tidak dapat dikesan sekarang.",
      reverse_geocode_failed: "Lokasi ditemui tetapi bandar gagal diperoleh. Koordinat dipaparkan.",
    },
    id: {
      geolocation_unavailable: "Geolokasi tidak tersedia di browser ini.",
      permission_denied: "Izin lokasi ditolak.",
      location_failed: "Lokasi Anda tidak dapat dideteksi saat ini.",
      reverse_geocode_failed: "Lokasi ditemukan tetapi kota gagal didapatkan. Menampilkan koordinat.",
    },
    bn: {
      geolocation_unavailable: "এই ব্রাউজারে জিওলোকেশন উপলব্ধ নয়।",
      permission_denied: "লোকেশন অনুমতি প্রত্যাখ্যান করা হয়েছে।",
      location_failed: "এখন আপনার অবস্থান শনাক্ত করা যাচ্ছে না।",
      reverse_geocode_failed: "অবস্থান পাওয়া গেছে, কিন্তু শহর পাওয়া যায়নি। কোঅর্ডিনেট দেখানো হচ্ছে।",
    },
  } as const

  const localizedError = error ? errorMessages[locale][error] : null

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

      {localizedError ? (
        <p id="location-error" role="status" aria-live="assertive" className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200">
          {localizedError}
        </p>
      ) : null}
    </div>
  )
}
