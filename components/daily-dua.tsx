"use client"

import { useState, useMemo } from "react"
import { useLocale } from "@/components/locale-provider"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"

const duas = [
  { arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", source: "2:201" },
  { arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً", source: "3:8" },
  { arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", source: "20:25-26" },
  { arabic: "رَبِّ زِدْنِي عِلْمًا", source: "20:114" },
  { arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", source: "3:173" },
  { arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا", source: "3:147" },
  { arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ", source: "7:23" },
]

export function DailyDua() {
  const { t } = useLocale()
  const dayOfYear = useMemo(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    return Math.floor((now.getTime() - start.getTime()) / 86400000)
  }, [])

  const [index, setIndex] = useState(dayOfYear % duas.length)
  const dua = duas[index]

  const prev = () => setIndex((i) => (i - 1 + duas.length) % duas.length)
  const next = () => setIndex((i) => (i + 1) % duas.length)

  return (
    <div className="rounded-3xl glass-strong p-6 shadow-xl sm:p-8">
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Heart className="h-4.5 w-4.5 text-primary" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">{t.dailyDua}</h2>
          <p className="text-[10px] text-muted-foreground">{t.duaDesc}</p>
        </div>
      </div>

      {/* Dua text */}
      <div className="rounded-2xl bg-gradient-to-br from-primary/[0.04] to-secondary/[0.02] p-6 text-center">
        <p className="font-serif text-2xl leading-loose text-foreground sm:text-3xl" dir="rtl">
          {dua.arabic}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-px w-8 bg-primary/20" />
          <span className="text-xs font-bold text-primary">{t.quran} {dua.source}</span>
          <div className="h-px w-8 bg-primary/20" />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-5 flex items-center justify-between">
        <button onClick={prev} className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/15 text-muted-foreground transition-all hover:bg-muted/30 hover:text-foreground" aria-label="Previous dua">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {index + 1} / {duas.length}
        </span>
        <button onClick={next} className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/15 text-muted-foreground transition-all hover:bg-muted/30 hover:text-foreground" aria-label="Next dua">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
