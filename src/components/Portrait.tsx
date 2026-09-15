type PortraitProps = {
  src: string;
  available: boolean;
  alt: string;
  className?: string;
  variant?: "hero" | "founder";
};

/**
 * Editorial portrait slot. Renders the real photograph when it exists in /public,
 * otherwise a warm sunlit-paper composition that reads as an intentional image.
 */
export function Portrait({ src, available, alt, className, variant = "hero" }: PortraitProps) {
  return (
    <div className={className}>
      <div className="grain relative h-full w-full overflow-hidden ring-1 ring-ink/10">
        <div className="absolute inset-0">
          {available ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className="h-full w-full object-cover" />
          ) : (
            <Placeholder variant={variant} />
          )}
        </div>
      </div>
    </div>
  );
}

function Placeholder({ variant }: { variant: "hero" | "founder" }) {
  return (
    <div className="paper-light relative h-full w-full" role="img" aria-label="Sunlit paper and architecture, placeholder for a portrait">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id={`arch-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7ede0" stopOpacity="0.9" />
            <stop offset="1" stopColor="#c99a80" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={`light-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff6e8" stopOpacity="0.85" />
            <stop offset="1" stopColor="#fff6e8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {variant === "hero" ? (
          <>
            <rect width="600" height="800" fill="#ead9c4" />
            <path d="M0 0 H280 V800 H0 Z" fill={`url(#light-${variant})`} />
            <rect x="88" y="64" width="214" height="348" fill="#f7efe4" fillOpacity="0.58" />
            <path d="M195 64 V412" stroke="#6e4d3c" strokeOpacity="0.2" />
            <path d="M88 238 H302" stroke="#6e4d3c" strokeOpacity="0.12" />
            <path d="M0 628 L600 548 V800 H0 Z" fill="#c4a08a" fillOpacity="0.42" />
            <path d="M248 820 V478 A138 138 0 0 1 524 478 V820 Z" fill={`url(#arch-${variant})`} />
            <circle cx="486" cy="128" r="52" fill="#fff4e4" fillOpacity="0.72" />
          </>
        ) : (
          <>
            <rect x="60" y="120" width="480" height="720" rx="240" fill={`url(#arch-${variant})`} />
            <path d="M600 0 L600 320 L200 820 L0 820 Z" fill={`url(#light-${variant})`} />
            <path d="M0 200 H600" stroke="#6e4d3c" strokeOpacity="0.14" />
            <circle cx="130" cy="130" r="56" fill="#fff4e4" fillOpacity="0.5" />
          </>
        )}
      </svg>
    </div>
  );
}
