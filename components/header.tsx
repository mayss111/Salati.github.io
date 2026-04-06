"use client"

import { useLocale } from "@/components/locale-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CrescentMoon, MosqueSilhouette } from "@/components/islamic-pattern"
import { StarParticles } from "@/components/star-particles"

export function Header() {
  const { t } = useLocale()

  return (
    <header className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <img
          src="/images/night-sky.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Star particles */}
      <StarParticles count={50} />

      {/* Mosque silhouette at bottom */}
      <div className="absolute inset-x-0 bottom-0">
        <MosqueSilhouette className="w-full text-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl glass">
              <CrescentMoon className="h-7 w-7 text-primary" />
              <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-secondary ring-2 ring-background animate-glow-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground">Salati</span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-primary/60">Prayer Times</span>
            </div>
          </div>
          <LanguageSwitcher />
        </nav>

        {/* Hero */}
        <div className="flex flex-col items-center pb-32 pt-16 text-center sm:pb-36 sm:pt-20 lg:pb-44 lg:pt-28">
          {/* Live badge */}
          <div className="mb-8 inline-flex animate-slide-up items-center gap-2.5 rounded-full glass px-5 py-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
            </span>
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              {t.liveBadge}
            </span>
          </div>

          {/* Bismillah */}
          <p className="mb-4 font-serif text-2xl text-primary/50 animate-slide-up [animation-delay:0.1s] sm:text-3xl" aria-label="Bismillah">
            {'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ'}
          </p>

          {/* Main title */}
          <h1 className="animate-slide-up [animation-delay:0.2s] text-balance text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            {t.siteTitle}
          </h1>

          {/* Gold line */}
          <div className="mt-4 h-1 w-32 animate-slide-up [animation-delay:0.3s] rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />

          <p className="mt-6 max-w-2xl animate-slide-up [animation-delay:0.4s] text-pretty text-base text-foreground/60 leading-relaxed sm:text-lg">
            {t.siteSubtitle}
          </p>

          {/* Scroll indicator */}
          <div className="mt-14 flex animate-slide-up [animation-delay:0.5s] flex-col items-center gap-1.5 text-muted-foreground/40">
            <div className="h-10 w-[22px] rounded-full border-2 border-muted-foreground/20 p-1">
              <div className="mx-auto h-2.5 w-1.5 animate-bounce rounded-full bg-primary/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ornamental border */}
      <div className="relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </header>
  )
}
