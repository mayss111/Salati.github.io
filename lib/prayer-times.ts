// Prayer time calculation using standard astronomical formulas
// This implements the Muslim World League method

export interface PrayerTimesData {
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

export type CalculationMethod = "mwl" | "umm_al_qura" | "egyptian" | "karachi"
export type Madhhab = "shafi" | "hanafi"

export interface PrayerCalculationOptions {
  method?: CalculationMethod
  madhhab?: Madhhab
}

const METHOD_ANGLES: Record<CalculationMethod, { fajr: number; isha: number | null; ishaIntervalMinutes?: number }> = {
  mwl: { fajr: 18, isha: 17 },
  umm_al_qura: { fajr: 18.5, isha: null, ishaIntervalMinutes: 90 },
  egyptian: { fajr: 19.5, isha: 17.5 },
  karachi: { fajr: 18, isha: 18 },
}

function toRadians(deg: number) {
  return (deg * Math.PI) / 180
}

function toDegrees(rad: number) {
  return (rad * 180) / Math.PI
}

function fixHour(a: number) {
  a = a - 24.0 * Math.floor(a / 24.0)
  a = a < 0 ? a + 24.0 : a
  return a
}

function sunDeclination(jd: number) {
  const D = jd - 2451545.0
  const g = toRadians(357.529 + 0.98560028 * D)
  const q = 280.459 + 0.98564736 * D
  const L = toRadians(q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g))
  const e = toRadians(23.439 - 0.00000036 * D)
  const d = toDegrees(Math.asin(Math.sin(e) * Math.sin(L)))
  return d
}

function equationOfTime(jd: number) {
  const D = jd - 2451545.0
  const g = toRadians(357.529 + 0.98560028 * D)
  const q = 280.459 + 0.98564736 * D
  const L = toRadians(q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g))
  const e = toRadians(23.439 - 0.00000036 * D)
  let RA = toDegrees(Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L))) / 15
  RA = fixHour(RA)
  const EqT = q / 15 - RA
  return EqT
}

function julianDate(year: number, month: number, day: number) {
  if (month <= 2) {
    year -= 1
    month += 12
  }
  const A = Math.floor(year / 100)
  const B = 2 - A + Math.floor(A / 4)
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5
}

function sunAngleTime(angle: number, jdate: number, lat: number, isRising: boolean) {
  const decl = sunDeclination(jdate)
  const noon = 12 - equationOfTime(jdate)
  const cosHA =
    (-Math.sin(toRadians(angle)) - Math.sin(toRadians(lat)) * Math.sin(toRadians(decl))) /
    (Math.cos(toRadians(lat)) * Math.cos(toRadians(decl)))

  if (cosHA > 1 || cosHA < -1) return noon

  const HA = toDegrees(Math.acos(cosHA)) / 15
  return noon + (isRising ? -HA : HA)
}

function asrTime(jdate: number, lat: number, factor: number) {
  const decl = sunDeclination(jdate)
  const angle = -toDegrees(Math.atan(1 / (factor + Math.tan(toRadians(Math.abs(lat - decl))))))
  return sunAngleTime(angle, jdate, lat, false)
}

function formatTime(hours: number): string {
  hours = fixHour(hours)
  const h = Math.floor(hours)
  const m = Math.floor((hours - h) * 60)
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
}

export function calculatePrayerTimes(
  lat: number,
  lng: number,
  date: Date,
  options: PrayerCalculationOptions = {}
): PrayerTimesData {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const jdate = julianDate(year, month, day) - lng / (15 * 24)

  const method = options.method ?? "mwl"
  const madhhab = options.madhhab ?? "shafi"
  const methodConfig = METHOD_ANGLES[method]
  const fajrAngle = methodConfig.fajr

  const timezone = -date.getTimezoneOffset() / 60

  const fajr = sunAngleTime(fajrAngle, jdate, lat, true) + timezone
  const sunrise = sunAngleTime(0.833, jdate, lat, true) + timezone
  const dhuhr = 12 - equationOfTime(jdate) + timezone
  const asrFactor = madhhab === "hanafi" ? 2 : 1
  const asr = asrTime(jdate, lat, asrFactor) + timezone
  const maghrib = sunAngleTime(0.833, jdate, lat, false) + timezone
  const isha =
    methodConfig.isha === null
      ? maghrib + (methodConfig.ishaIntervalMinutes ?? 90) / 60
      : sunAngleTime(methodConfig.isha, jdate, lat, false) + timezone

  return {
    fajr: formatTime(fajr),
    sunrise: formatTime(sunrise),
    dhuhr: formatTime(dhuhr),
    asr: formatTime(asr),
    maghrib: formatTime(maghrib),
    isha: formatTime(isha),
  }
}

export function getNextPrayer(prayerTimes: PrayerTimesData): {
  name: string
  time: string
  remainingMs: number
} {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const prayers = [
    { name: "fajr", time: prayerTimes.fajr },
    { name: "sunrise", time: prayerTimes.sunrise },
    { name: "dhuhr", time: prayerTimes.dhuhr },
    { name: "asr", time: prayerTimes.asr },
    { name: "maghrib", time: prayerTimes.maghrib },
    { name: "isha", time: prayerTimes.isha },
  ]

  for (const prayer of prayers) {
    const [h, m] = prayer.time.split(":").map(Number)
    const prayerMinutes = h * 60 + m
    if (prayerMinutes > currentMinutes) {
      const remainingMs = (prayerMinutes - currentMinutes) * 60 * 1000 - now.getSeconds() * 1000
      return { name: prayer.name, time: prayer.time, remainingMs }
    }
  }

  // If all prayers passed, next is Fajr tomorrow
  const [fh, fm] = prayerTimes.fajr.split(":").map(Number)
  const fajrTomorrow = (24 * 60 - currentMinutes + fh * 60 + fm) * 60 * 1000
  return { name: "fajr", time: prayerTimes.fajr, remainingMs: fajrTomorrow }
}

// Qibla calculation
export function calculateQibla(lat: number, lng: number): number {
  const makkahLat = 21.4225
  const makkahLng = 39.8262

  const latRad = toRadians(lat)
  const lngRad = toRadians(lng)
  const makkahLatRad = toRadians(makkahLat)
  const makkahLngRad = toRadians(makkahLng)

  const y = Math.sin(makkahLngRad - lngRad)
  const x =
    Math.cos(latRad) * Math.tan(makkahLatRad) -
    Math.sin(latRad) * Math.cos(makkahLngRad - lngRad)

  let qibla = toDegrees(Math.atan2(y, x))
  if (qibla < 0) qibla += 360

  return Math.round(qibla * 10) / 10
}

// Simplified Hijri date conversion
export function toHijri(date: Date): { day: number; month: number; year: number; monthName: string } {
  const jd = julianDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
  const l = Math.floor(jd) - 1948440 + 10632
  const n = Math.floor((l - 1) / 10631)
  const lp = l - 10631 * n + 354
  const j =
    Math.floor((10985 - lp) / 5316) * Math.floor((50 * lp) / 17719) +
    Math.floor(lp / 5670) * Math.floor((43 * lp) / 15238)
  const lpp =
    lp - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29
  const month = Math.floor((24 * lpp) / 709)
  const day = lpp - Math.floor((709 * month) / 24)
  const year = 30 * n + j - 30

  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabi al-Awwal",
    "Rabi al-Thani",
    "Jumada al-Ula",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhul Qi'dah",
    "Dhul Hijjah",
  ]

  return { day, month, year, monthName: hijriMonths[(month - 1) % 12] }
}
