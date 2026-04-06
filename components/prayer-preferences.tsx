"use client"

import { Settings2 } from "lucide-react"
import type { CalculationMethod, Madhhab } from "@/lib/prayer-times"
import { useLocale } from "@/components/locale-provider"

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
  const { locale } = useLocale()

  const labels = {
    en: {
      title: "Prayer Preferences",
      method: "Calculation Method",
      asrSchool: "Asr School",
      adhanToggle: "Enable adhan notification for next prayer",
      reminder: "Reminder (minutes before prayer)",
      min: "min",
    },
    fr: { title: "Preferences de priere", method: "Methode de calcul", asrSchool: "Ecole pour Asr", adhanToggle: "Activer l'alerte adhan pour la prochaine priere", reminder: "Rappel (minutes avant la priere)", min: "min" },
    ar: { title: "إعدادات الصلاة", method: "طريقة الحساب", asrSchool: "مذهب العصر", adhanToggle: "تفعيل تنبيه الأذان للصلاة القادمة", reminder: "التذكير (دقائق قبل الصلاة)", min: "د" },
    tr: { title: "Namaz Tercihleri", method: "Hesaplama Yontemi", asrSchool: "Asr Mezhebi", adhanToggle: "Siradaki namaz icin ezan bildirimi", reminder: "Hatirlatma (namazdan once dakika)", min: "dk" },
    ur: { title: "نماز کی ترجیحات", method: "حساب کا طریقہ", asrSchool: "عصر کا مسلک", adhanToggle: "اگلی نماز کے لیے اذان نوٹیفکیشن فعال کریں", reminder: "یاد دہانی (نماز سے پہلے منٹ)", min: "منٹ" },
    es: { title: "Preferencias de oracion", method: "Metodo de calculo", asrSchool: "Escuela de Asr", adhanToggle: "Activar recordatorio de adhan para la proxima oracion", reminder: "Recordatorio (minutos antes de la oracion)", min: "min" },
    de: { title: "Gebets-Einstellungen", method: "Berechnungsmethode", asrSchool: "Asr-Rechtsschule", adhanToggle: "Adhan-Benachrichtigung fur nachstes Gebet aktivieren", reminder: "Erinnerung (Minuten vor dem Gebet)", min: "min" },
    ms: { title: "Tetapan Solat", method: "Kaedah Pengiraan", asrSchool: "Mazhab Asar", adhanToggle: "Aktifkan notifikasi azan untuk solat seterusnya", reminder: "Peringatan (minit sebelum solat)", min: "min" },
    id: { title: "Preferensi Sholat", method: "Metode Perhitungan", asrSchool: "Mazhab Asar", adhanToggle: "Aktifkan notifikasi adzan untuk sholat berikutnya", reminder: "Pengingat (menit sebelum sholat)", min: "mnt" },
    bn: { title: "নামাজ সেটিংস", method: "হিসাবের পদ্ধতি", asrSchool: "আসরের মাযহাব", adhanToggle: "পরবর্তী নামাজের জন্য আজান নোটিফিকেশন চালু করুন", reminder: "রিমাইন্ডার (নামাজের আগে মিনিট)", min: "মিনিট" },
  } as const

  const l = labels[locale]

  return (
    <section className="rounded-3xl glass-strong p-5 shadow-xl sm:p-6" aria-labelledby="prefs-title">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Settings2 className="h-4.5 w-4.5 text-primary" />
        </div>
        <h2 id="prefs-title" className="text-base font-bold text-foreground">{l.title}</h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm text-foreground">
          <span className="font-semibold">{l.method}</span>
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
          <span className="font-semibold">{l.asrSchool}</span>
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
          <span className="font-semibold">{l.adhanToggle}</span>
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-foreground md:col-span-2">
          <span className="font-semibold">{l.reminder}</span>
          <input
            type="range"
            min={0}
            max={30}
            value={value.reminderMinutes}
            onChange={(e) => onChange({ ...value, reminderMinutes: Number(e.target.value) })}
            className="accent-primary"
          />
          <span className="text-xs text-muted-foreground">{value.reminderMinutes} {l.min}</span>
        </label>
      </div>
    </section>
  )
}
