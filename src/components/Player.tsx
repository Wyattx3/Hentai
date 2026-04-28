"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Episode, Title } from "@/lib/data";
import { useContinueWatching } from "@/lib/storage";

export function Player({
  title,
  episodes,
  episode,
  onEpisodeChange,
}: {
  title: Title;
  episodes: Episode[];
  episode: number;
  onEpisodeChange: (n: number) => void;
}) {
  const current = episodes.find((e) => e.number === episode) ?? episodes[0];
  const totalSec = parseRuntime(current.runtime);

  const [playing, setPlaying] = useState(false);
  const [pct, setPct] = useState(0);
  const [muted, setMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState("1080p");
  const [speed, setSpeed] = useState(1);
  const [audio, setAudio] = useState<"sub" | "dub">(title.hasDub ? "sub" : "sub");
  const [cc, setCc] = useState(true);
  const settingsRef = useRef<HTMLDivElement>(null);

  const { upsert } = useContinueWatching();

  // Mock playback ticker
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setPct((p) => {
        const next = Math.min(100, p + 0.18 * speed);
        upsert({
          slug: title.slug,
          episode: current.number,
          progress: next / 100,
          updatedAt: Date.now(),
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [playing, speed, title.slug, current.number, upsert]);

  // Reset when episode changes
  useEffect(() => {
    setPct(0);
    setPlaying(false);
  }, [episode]);

  // Outside click for settings
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!settingsRef.current) return;
      if (!settingsRef.current.contains(e.target as Node)) setShowSettings(false);
    };
    if (showSettings) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showSettings]);

  const isNearEnd = pct >= 92 && pct < 100;
  const isFinished = pct >= 100;
  const next = episodes.find((e) => e.number === current.number + 1);

  const elapsedSec = Math.floor((pct / 100) * totalSec);
  const remainingSec = Math.max(0, totalSec - elapsedSec);

  return (
    <div className="relative isolate aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-[0_30px_80px_-30px_oklch(0_0_0_/_0.9)]">
      <Image
        src={`https://picsum.photos/id/${title.imageId + current.number}/1600/900`}
        alt={`${title.name} stream still`}
        fill
        sizes="(min-width:1280px) 1320px, 100vw"
        priority
        className={`object-cover transition duration-700 ${
          playing ? "scale-[1.03] brightness-90" : "scale-100"
        }`}
        unoptimized
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/55"
      />

      {/* Top ribbon */}
      <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            Episode {String(current.number).padStart(2, "0")} · {audio === "dub" ? "English Dub" : "Original"}
          </p>
          <h2 className="mt-1 line-clamp-1 text-[clamp(1.1rem,0.8rem+1vw,1.8rem)] font-extrabold tracking-tight text-white">
            {title.name}
            <span className="ml-3 text-[var(--fg-2)]">— {current.name}</span>
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="pill pill-brand">{quality}</span>
          {audio === "sub" && cc && <span className="pill">CC</span>}
          <span className="pill">{title.rating}</span>
        </div>
      </div>

      {/* Center play button (only when not started) */}
      {!playing && pct === 0 && (
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

      {/* Skip intro chip */}
      {playing && pct < 12 && (
        <button
          type="button"
          onClick={() => setPct(12)}
          className="absolute right-5 top-20 rounded-full bg-black/65 px-3.5 py-2 text-[0.84rem] font-semibold text-white backdrop-blur transition hover:bg-black/80"
        >
          Skip intro
        </button>
      )}

      {/* Up-next overlay near end */}
      {(isNearEnd || isFinished) && next && (
        <div className="absolute right-5 bottom-24 flex w-72 items-center gap-3 rounded-xl bg-black/70 p-3 backdrop-blur-md">
          <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-md">
            <Image
              src={`https://picsum.photos/id/${title.imageId + next.number}/240/135`}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
              Up next · Ep {next.number}
            </p>
            <p className="mt-0.5 line-clamp-1 text-[0.86rem] font-semibold text-white">
              {next.name}
            </p>
            <button
              type="button"
              onClick={() => onEpisodeChange(next.number)}
              className="mt-1.5 rounded-full bg-[var(--brand)] px-2.5 py-1 text-[0.74rem] font-bold text-[oklch(0.18_0.02_30)]"
            >
              Play next
            </button>
          </div>
        </div>
      )}

      {/* Transport */}
      <div className="absolute inset-x-5 bottom-5">
        <div className="mb-2 flex items-center gap-3">
          <span className="font-mono text-[0.78rem] text-white tabular-nums">
            {fmtTime(elapsedSec)}
          </span>
          <div className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-[var(--brand)]"
              style={{ width: `${pct}%`, transition: "width 1s linear" }}
            />
          </div>
          <span className="font-mono text-[0.78rem] text-white/70 tabular-nums">
            -{fmtTime(remainingSec)}
          </span>
        </div>
        <div className="flex items-center gap-2">
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
          <button
            type="button"
            onClick={() => setPct((p) => Math.max(0, p - 5))}
            aria-label="Rewind 10 seconds"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:flex"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L3 10" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setPct((p) => Math.min(100, p + 5))}
            aria-label="Forward 10 seconds"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:flex"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L21 10" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:flex"
          >
            {muted ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M11 5 6 9H2v6h4l5 4Z" />
                <path d="m22 9-6 6m0-6 6 6" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M11 5 6 9H2v6h4l5 4Z" />
                <path d="M19 12a4 4 0 0 0-1.5-3.1" />
                <path d="M22 12a8 8 0 0 0-3-6.2" />
              </svg>
            )}
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCc((v) => !v)}
              aria-pressed={cc}
              className={`hidden h-9 items-center gap-1.5 rounded-full px-3 text-[0.78rem] font-semibold transition sm:inline-flex ${
                cc ? "bg-white/20 text-white" : "bg-white/8 text-white/70 hover:bg-white/15"
              }`}
            >
              CC
            </button>
            {title.hasDub && (
              <button
                type="button"
                onClick={() => setAudio((a) => (a === "sub" ? "dub" : "sub"))}
                className="hidden h-9 items-center gap-1.5 rounded-full bg-white/10 px-3 text-[0.78rem] font-semibold text-white transition hover:bg-white/20 sm:inline-flex"
              >
                {audio === "dub" ? "DUB" : "SUB"}
              </button>
            )}
            <div ref={settingsRef} className="relative">
              <button
                type="button"
                onClick={() => setShowSettings((v) => !v)}
                aria-label="Settings"
                aria-expanded={showSettings}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.13.42.46.74.88.88H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </button>
              {showSettings && (
                <div
                  role="menu"
                  className="absolute bottom-12 right-0 w-60 overflow-hidden rounded-xl border border-white/10 bg-[var(--bg-1)]/95 backdrop-blur-md shadow-2xl shadow-black/60"
                >
                  <SettingsRow label="Quality" options={["4K", "1080p", "720p", "480p"]} value={quality} onChange={setQuality} />
                  <SettingsRow label="Speed" options={["0.75", "1", "1.25", "1.5", "2"]} value={String(speed)} onChange={(v) => setSpeed(parseFloat(v))} />
                  <SettingsRow label="Audio" options={title.hasDub ? ["sub", "dub"] : ["sub"]} value={audio} onChange={(v) => setAudio(v as "sub" | "dub")} />
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="Fullscreen"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="border-b border-white/5 px-3 py-2 last:border-0">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
        {label}
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded-full px-2.5 py-1 text-[0.78rem] font-semibold transition ${
              value === opt
                ? "bg-[var(--brand)] text-[oklch(0.18_0.02_30)]"
                : "bg-white/5 text-white hover:bg-white/15"
            }`}
          >
            {opt === "sub" ? "Original + Sub" : opt === "dub" ? "English Dub" : opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function parseRuntime(s: string): number {
  // "28m" -> 1680, "98m" -> 5880, fallback 1680
  const m = /(\d+)\s*m/.exec(s);
  return m ? parseInt(m[1], 10) * 60 : 28 * 60;
}

function fmtTime(sec: number) {
  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
