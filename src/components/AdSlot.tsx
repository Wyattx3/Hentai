"use client";

import { useMemo, useState } from "react";

/**
 * AdSlot — production-style placeholder ad unit. The real network would inject
 * a creative here at request time. Until then we render a deterministic mock
 * creative based on the slot id so the page reads as a plausible ad-supported
 * experience without flickering.
 */

type AdCreative = {
  brand: string;
  headline: string;
  cta: string;
  href: string;
  hue: number; // 0..360
};

const CREATIVES: AdCreative[] = [
  {
    brand: "Nakamura Foods",
    headline: "Late-night ramen, delivered in 25 minutes.",
    cta: "Order now",
    href: "https://example.com/nakamura",
    hue: 18,
  },
  {
    brand: "Shibuya Gear",
    headline: "Mechanical keyboards built for marathon sessions.",
    cta: "Shop the line",
    href: "https://example.com/shibuya-gear",
    hue: 252,
  },
  {
    brand: "Volume One Manga",
    headline: "First three volumes free this week. New members only.",
    cta: "Claim 3 free",
    href: "https://example.com/volume-one",
    hue: 332,
  },
  {
    brand: "Kazoku Matcha",
    headline: "Stone-milled matcha. Ships from Uji, every Friday.",
    cta: "Try a tin",
    href: "https://example.com/kazoku",
    hue: 142,
  },
  {
    brand: "Hi-Fi Tokyo",
    headline: "Bookshelf speakers tuned for streaming. 60-day return.",
    cta: "Listen at home",
    href: "https://example.com/hifi-tokyo",
    hue: 208,
  },
  {
    brand: "Late Train Brewing",
    headline: "Limited summer pilsner. Local pickup only.",
    cta: "Reserve a pack",
    href: "https://example.com/late-train",
    hue: 88,
  },
  {
    brand: "Atelier Stationery",
    headline: "Saturated inks for monochrome days. Free sample card.",
    cta: "Get the sampler",
    href: "https://example.com/atelier",
    hue: 22,
  },
];

function pick(slot: string): AdCreative {
  let h = 0;
  for (let i = 0; i < slot.length; i++) h = (h * 31 + slot.charCodeAt(i)) | 0;
  return CREATIVES[Math.abs(h) % CREATIVES.length];
}

export function AdSlot({
  slot,
  variant = "banner",
}: {
  slot: string;
  variant?: "banner" | "leaderboard" | "card";
}) {
  const ad = useMemo(() => pick(slot), [slot]);
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const accent = `oklch(0.72 0.18 ${ad.hue})`;
  const accentSoft = `oklch(0.72 0.18 ${ad.hue} / 0.18)`;

  if (variant === "card") {
    return (
      <aside
        aria-label="Sponsored"
        className="card hairline relative overflow-hidden p-5"
      >
        <AdLabel onDismiss={() => setDismissed(true)} compact />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${accent}, transparent 60%)`,
          }}
        />
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em]" style={{ color: accent }}>
          {ad.brand}
        </p>
        <h3 className="mt-2 text-[1.05rem] font-extrabold leading-snug tracking-tight text-[var(--fg-4)]">
          {ad.headline}
        </h3>
        <a
          href={ad.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-4 inline-flex h-9 items-center rounded-full px-4 text-[0.86rem] font-bold transition"
          style={{ background: accent, color: "oklch(0.18 0.02 30)" }}
        >
          {ad.cta} →
        </a>
      </aside>
    );
  }

  return (
    <section
      aria-label="Sponsored"
      className={`relative overflow-hidden hairline ${
        variant === "leaderboard"
          ? "rounded-2xl bg-[var(--bg-1)]"
          : "rounded-2xl bg-[var(--bg-1)]"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          background: `linear-gradient(110deg, ${accentSoft} 0%, transparent 55%), radial-gradient(circle at 95% 10%, ${accent} 0%, transparent 50%)`,
        }}
      />
      <div className="relative flex flex-wrap items-center justify-between gap-5 px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex min-w-0 flex-1 items-center gap-5">
          <div
            className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl text-[1.1rem] font-extrabold sm:grid"
            style={{ background: accent, color: "oklch(0.18 0.02 30)" }}
          >
            {ad.brand
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <AdLabel onDismiss={() => setDismissed(true)} />
              <span
                className="hidden text-[0.78rem] font-semibold uppercase tracking-[0.16em] sm:inline"
                style={{ color: accent }}
              >
                {ad.brand}
              </span>
            </div>
            <p className="mt-2 text-[0.98rem] font-bold leading-snug text-[var(--fg-4)] sm:text-[1.05rem]">
              {ad.headline}
            </p>
            <p className="mt-1 text-[0.78rem] text-[var(--fg-1)] sm:hidden">
              {ad.brand}
            </p>
          </div>
        </div>
        <a
          href={ad.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex h-10 shrink-0 items-center rounded-full px-5 text-[0.88rem] font-bold transition"
          style={{ background: accent, color: "oklch(0.18 0.02 30)" }}
        >
          {ad.cta}
        </a>
      </div>
    </section>
  );
}

function AdLabel({
  onDismiss,
  compact = false,
}: {
  onDismiss: () => void;
  compact?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="inline-flex h-5 items-center rounded-full bg-[var(--bg-3)] px-2 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[var(--fg-2)]">
        Ad
      </span>
      {!compact && (
        <span className="text-[0.7rem] uppercase tracking-[0.14em] text-[var(--fg-1)]">
          Sponsored
        </span>
      )}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Why am I seeing this ad?"
        className={`ml-1 grid h-5 w-5 place-items-center rounded-full text-[var(--fg-1)] transition hover:bg-[var(--bg-3)] hover:text-[var(--fg-3)] ${
          compact ? "absolute right-3 top-3" : ""
        }`}
        title="Dismiss this ad"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
          <path d="m6 6 12 12" />
          <path d="m18 6-12 12" />
        </svg>
      </button>
    </div>
  );
}
