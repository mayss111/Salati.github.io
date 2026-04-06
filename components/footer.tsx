"use client"

import { useLocale } from "@/components/locale-provider"
import { Heart } from "lucide-react"
import { CrescentMoon, IslamicPattern } from "@/components/islamic-pattern"

export function Footer() {
  const { t } = useLocale()

  return (
    <footer className="relative overflow-hidden border-t border-border/30 bg-card/30 backdrop-blur-sm">
      <IslamicPattern className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2 text-primary/[0.02]" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top ornamental line */}
        <div className="mb-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="flex flex-col items-center gap-5 text-center">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
              <CrescentMoon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">Salati</span>
          </div>

          {/* Message */}
          <p className="max-w-lg text-sm text-muted-foreground leading-relaxed">
            {t.footerText}
          </p>

          {/* Divider */}
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Bottom credit */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <span>{t.madeWith}</span>
            <Heart className="h-3 w-3 text-primary" />
            <span>{t.forUmmah}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
