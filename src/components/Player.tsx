"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Title } from "@/lib/data";

export function Player({ title }: { title: Title }) {
  const [playing, setPlaying] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setPct((p) => (p >= 100 ? 100 : p + 0.6));
    }, 1000);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <div className="relative isolate aspect-video w-full overflow-hidden rounded-2xl bg-black">
      <Image
        src={`https://picsum.photos/id/${title.imageId}/1600/900`}
        alt={`${title.name} stream still`}
        fill
        sizes="(min-width:1280px) 1320px, 100vw"
        priority
        className={`object-cover transition duration-700 ${playing ? "scale-[1.02] brightness-90" : "scale-100"}`}
        unoptimized
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/40"
      />

      {/* Center play button */}
      {!playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play episode"
          className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--brand)] text-[oklch(0.18_0.02_30)] shadow-2xl shadow-black/60 transition hover:scale-105 hover:bg-[var(--brand-hot)]"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}

      {/* Top ribbon */}
      <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            Episode 01 · Up next
          </p>
          <h2 className="mt-1 text-[clamp(1.4rem,1rem+1.2vw,2.2rem)] font-extrabold tracking-tight text-[var(--fg-4)]">
            {title.name}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="pill pill-brand">HD</span>
          {title.hasSub && <span className="pill">SUB</span>}
          {title.hasDub && <span className="pill">DUB</span>}
          <span className="pill">{title.rating}</span>
        </div>
      </div>

      {/* Transport */}
      <div className="absolute inset-x-5 bottom-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand)] text-[oklch(0.18_0.02_30)] transition hover:bg-[var(--brand-hot)]"
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <span className="font-mono text-[0.78rem] text-[var(--fg-3)] tabular-nums">
            {fmt(pct)}
          </span>
          <div className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-[var(--brand)]"
              style={{ width: `${pct}%`, transition: "width 1s linear" }}
            />
          </div>
          <span className="font-mono text-[0.78rem] text-[var(--fg-2)] tabular-nums">
            {title.episodeRuntime ?? title.runtime}
          </span>
        </div>
      </div>
    </div>
  );
}

function fmt(pct: number) {
  // 28-minute episode mock
  const total = 28 * 60;
  const sec = Math.floor((pct / 100) * total);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
