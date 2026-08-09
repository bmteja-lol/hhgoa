/** Flat screen-print Goa illustrations. No gradients, no shadows — just shapes. */

export function Sun({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="30" fill="var(--sun)" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 16;
        return (
          <line
            key={i}
            x1={60 + Math.cos(a) * 38}
            y1={60 + Math.sin(a) * 38}
            x2={60 + Math.cos(a) * (i % 2 ? 50 : 56)}
            y2={60 + Math.sin(a) * (i % 2 ? 50 : 56)}
            stroke="var(--sun)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

export function Palm({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 160"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path
        d="M52 158 C46 118 42 90 44 56"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <g fill="currentColor">
        {/* fronds arc out from the crown and droop */}
        <path d="M44 54 C24 44 10 48 0 62 C14 56 28 58 42 62 Z" />
        <path d="M44 54 C64 44 80 48 92 62 C76 56 60 58 46 62 Z" />
        <path d="M44 54 C28 56 14 68 8 86 C20 70 32 62 42 60 Z" />
        <path d="M44 54 C60 56 74 68 82 86 C68 70 56 62 46 60 Z" />
        <path d="M44 54 C38 40 40 26 48 16 C46 30 48 44 48 56 Z" />
      </g>
      <circle cx="44" cy="56" r="5" fill="var(--sun)" />
    </svg>
  );
}


export function Waves({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 40" className={className} preserveAspectRatio="none" aria-hidden="true">
      {[6, 18, 30].map((y, i) => (
        <path
          key={y}
          d={`M0 ${y} q 12 -7 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0`}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === 1 ? 3 : 2}
          opacity={i === 2 ? 0.6 : 1}
        />
      ))}
    </svg>
  );
}

export function GoanHouse({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 120" className={className} aria-hidden="true">
      <path d="M8 52 L70 14 L132 52 Z" fill="var(--terracotta)" stroke="var(--ink)" strokeWidth="3" />
      <path d="M8 52 h124 v62 H8 Z" fill="var(--cream)" stroke="var(--ink)" strokeWidth="3" />
      <rect x="22" y="66" width="26" height="30" fill="var(--pink)" stroke="var(--ink)" strokeWidth="3" />
      <rect x="92" y="66" width="26" height="30" fill="var(--sun)" stroke="var(--ink)" strokeWidth="3" />
      <rect x="58" y="70" width="24" height="44" fill="var(--goa)" stroke="var(--ink)" strokeWidth="3" />
      <line x1="35" y1="66" x2="35" y2="96" stroke="var(--ink)" strokeWidth="2" />
      <line x1="105" y1="66" x2="105" y2="96" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  );
}

export function Scooter({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 90" className={className} aria-hidden="true">
      <circle cx="28" cy="66" r="16" fill="none" stroke="currentColor" strokeWidth="5" />
      <circle cx="112" cy="66" r="16" fill="none" stroke="currentColor" strokeWidth="5" />
      <path
        d="M28 66 L52 66 C52 40 70 34 88 36 L104 36 L112 66"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M60 40 L96 40 L100 56 L64 56 Z" fill="var(--pink)" />
      <line x1="104" y1="36" x2="120" y2="22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <line x1="112" y1="22" x2="130" y2="22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function Bird({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 16" className={className} aria-hidden="true">
      <path
        d="M2 12 q 9 -11 18 0 q 9 -11 18 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Boat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden="true">
      <path d="M10 68 h100 l-16 16 H26 Z" fill="currentColor" />
      <line x1="60" y1="10" x2="60" y2="68" stroke="currentColor" strokeWidth="4" />
      <path d="M62 14 L98 62 H62 Z" fill="var(--pink)" />
      <path d="M56 22 L28 62 h28 Z" fill="var(--sun)" />
    </svg>
  );
}
