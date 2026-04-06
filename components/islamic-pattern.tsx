export function IslamicPattern({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="islamic-geo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.25" />
          <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="0.25" fill="none" opacity="0.15" />
          <circle cx="0" cy="0" r="2" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.1" />
          <circle cx="40" cy="0" r="2" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.1" />
          <circle cx="0" cy="40" r="2" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.1" />
          <circle cx="40" cy="40" r="2" stroke="currentColor" strokeWidth="0.2" fill="none" opacity="0.1" />
          <path d="M10 10 L30 10 L30 30 L10 30 Z" stroke="currentColor" strokeWidth="0.15" fill="none" opacity="0.08" transform="rotate(45 20 20)" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#islamic-geo)" />
    </svg>
  )
}

export function CrescentMoon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M55 8C32 8 18 26 18 50C18 74 32 92 55 92C43 86 35 70 35 50C35 30 43 14 55 8Z" fill="currentColor" />
      <circle cx="70" cy="18" r="7" fill="currentColor" />
      <circle cx="78" cy="32" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="82" cy="22" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export function StarDecoration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 0L13.9 8.1L22 10L13.9 11.9L12 20L10.1 11.9L2 10L10.1 8.1L12 0Z" />
    </svg>
  )
}

export function MosqueSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 120 L0 90 L20 90 L20 40 L25 40 L25 15 L27 15 L27 5 L28 0 L29 5 L29 15 L31 15 L31 40 L36 40 L36 90 L60 90 L60 60 C60 30 90 10 120 10 C150 10 180 30 180 60 L180 90 L200 90 L200 60 C200 30 230 10 260 10 C290 10 320 30 320 60 L320 90 L340 90 L340 40 L345 40 L345 15 L347 15 L347 5 L348 0 L349 5 L349 15 L351 15 L351 40 L356 40 L356 90 L380 90 L380 80 L400 80 L400 120 Z" opacity="0.08" />
      <ellipse cx="120" cy="50" rx="18" ry="25" opacity="0.04" />
      <ellipse cx="260" cy="50" rx="18" ry="25" opacity="0.04" />
    </svg>
  )
}
