"use client";

import { useEffect, useRef, useState } from "react";
import { Cover } from "./Cover";
import type { Title } from "@/lib/data";

/**
 * Mock player. No real video — a poster plate, a play button, fake transport
 * controls. The point is to show how the player feels in this brand: quiet,
 * cinema-like, the chrome retreats once you press play.
 */
export function Player({ title }: { title: Title }) {
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const total = 22 * 60; // 22-minute mock runtime per episode
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    ref.current = window.setInterval(() => {
      setT((prev) => {
        const next = prev + 1;
        return next >= total ? total : next;
      });
    }, 1000);
    return () => {
      if (ref.current) window.clearInterval(ref.current);
    };
  }, [playing, total]);

  const pct = (t / total) * 100;

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-[var(--ink-0)]">
      <Cover title={title} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink-0)]/85 via-[var(--ink-0)]/30 to-transparent" />

      {/* Play button — single solid disc, no gradient, no glassmorphism */}
      {!playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title.name}`}
          className="absolute inset-0 z-10 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--ink-7)] text-[var(--ink-0)] transition-transform duration-500 ease-out hover:scale-105 sm:h-24 sm:w-24"
          style={{ transitionTimingFunction: "var(--ease-out)" }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
            <path d="M5 3.5 L18 11 L5 18.5 Z" fill="currentColor" />
          </svg>
        </button>
      )}

      {/* Title ribbon when not playing */}
      {!playing && (
        <div className="absolute inset-x-6 top-6 flex items-center gap-3 sm:inset-x-10 sm:top-10">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="t-mono text-[var(--ink-7)]">Episode 01 · Up next</span>
        </div>
      )}

      {/* Now-playing card retreats when playing — chrome fades */}
      {!playing && (
        <div className="absolute inset-x-6 bottom-16 sm:inset-x-10 sm:bottom-24">
          <p className="t-mono text-[var(--ink-5)]">{title.studio} · {title.year}</p>
          <h2
            className="mt-2 text-[clamp(1.4rem,1rem+1.6vw,2.2rem)] text-[var(--ink-7)]"
            style={{ fontVariationSettings: '"opsz" 32, "wdth" 96, "wght" 580', letterSpacing: "-0.018em" }}
          >
            {title.name}
          </h2>
          <p className="mt-1 max-w-[52ch] text-[0.95rem] text-[var(--ink-6)]">
            {title.synopsis}
          </p>
        </div>
      )}

      {/* Transport */}
      <div
        className={[
          "absolute inset-x-0 bottom-0 transition-opacity duration-500",
          playing ? "opacity-90 hover:opacity-100" : "opacity-100",
        ].join(" ")}
      >
        <div className="mx-6 mb-3 sm:mx-10">
          <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--ink-3)]">
            <div
              className="h-full bg-[var(--accent)]"
              style={{ width: `${pct}%`, transition: "width 1s linear" }}
            />
          </div>
        </div>
        <div className="mx-6 mb-5 flex items-center gap-4 sm:mx-10">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ink-7)] text-[var(--ink-0)] transition-transform hover:-translate-y-px"
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <rect x="3" y="2" width="3" height="10" fill="currentColor" />
                <rect x="8" y="2" width="3" height="10" fill="currentColor" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M3 2 L12 7 L3 12 Z" fill="currentColor" />
              </svg>
            )}
          </button>
          <span className="t-mono tabular-nums text-[var(--ink-6)]">
            {fmt(t)} / {fmt(total)}
          </span>
          <span className="ml-auto t-mono text-[var(--ink-5)]">{title.rating}</span>
        </div>
      </div>
    </div>
  );
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}
