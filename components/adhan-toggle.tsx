"use client"

import { useState } from "react"
import { useLocale } from "@/components/locale-provider"
import { Bell, BellOff, Volume2 } from "lucide-react"

export function AdhanToggle() {
  const { t } = useLocale()
  const [enabled, setEnabled] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const toggle = () => {
    const newState = !enabled
    setEnabled(newState)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)

    if (newState && "Notification" in window) {
      Notification.requestPermission()
    }
  }

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className={`group flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
          enabled
            ? "border border-secondary/25 bg-secondary/[0.08] text-secondary hover:bg-secondary/[0.12]"
            : "glass text-muted-foreground hover:text-foreground"
        }`}
        aria-label={t.adhanNotification}
      >
        {enabled ? (
          <Bell className="h-4 w-4" />
        ) : (
          <BellOff className="h-4 w-4" />
        )}
        <span>{t.adhanNotification}</span>
        {enabled && <Volume2 className="h-3.5 w-3.5 animate-pulse text-secondary/60" />}
      </button>

      {/* Toast notification */}
      {showToast && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap animate-slide-up rounded-xl glass-strong px-4 py-2 text-xs font-semibold text-foreground shadow-xl">
          {enabled ? t.adhanEnabled : t.adhanDisabled}
        </div>
      )}
    </div>
  )
}
