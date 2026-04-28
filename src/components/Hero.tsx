"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Title } from "@/lib/data";
import { Stars } from "./Stars";

export function Hero({ slides }: { slides: Title[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const current = slides[idx];

  return (
    <section
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured titles"
    >
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.slug}
            aria-hidden={i !== idx}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === idx ? 1 : 0 }}
          >
            <Image
              src={`https://picsum.photos/id/${s.imageId}/2000/1000`}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
        <div className="hero-shade" />
        <div className="glow" />
      </div>

      <div className="relative mx-auto flex min-h-[78vh] max-w-[1400px] items-end px-5 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
        <div key={current.slug} className="hero-fade max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            <span>Featured</span>
            <span className="text-[var(--fg-1)]">·</span>
            <span className="text-[var(--fg-2)]">{current.collection}</span>
          </div>
          <h1 className="mt-3 text-[clamp(2.4rem,1.8rem+3.5vw,4.6rem)] font-extrabold leading-[0.95] tracking-tight text-[var(--fg-4)]">
            {current.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.92rem] text-[var(--fg-2)]">
            <span className="flex items-center gap-1.5">
              <Stars score={current.score} size={14} />
              <span className="font-semibold text-[var(--fg-3)]">
                {current.score.toFixed(1)}
              </span>
              <span className="text-[var(--fg-1)]">({current.votes})</span>
            </span>
            <span>{current.year}</span>
            <span>{current.episodes} episodes</span>
            <span>{current.runtime}</span>
            <span className="pill pill-brand">HD</span>
            {current.hasSub && <span className="pill">SUB</span>}
            {current.hasDub && <span className="pill">DUB</span>}
            <span className="pill">{current.rating}</span>
          </div>
          <p className="mt-5 max-w-[58ch] text-[1.02rem] leading-relaxed text-[var(--fg-2)]">
            {current.synopsis}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={`/watch/${current.slug}`}
              className="btn-brand pulse-brand inline-flex items-center gap-2 text-[0.98rem]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch episode 1
            </Link>
            <Link
              href={`/watch/${current.slug}`}
              className="btn-ghost inline-flex items-center gap-2 text-[0.94rem]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M19 14V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v8" />
                <path d="m9 11 3 3 3-3" />
              </svg>
              Add to my list
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="ml-auto hidden items-center gap-2 self-end pb-1 md:flex">
          {slides.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Show slide ${i + 1}: ${s.name}`}
              aria-current={i === idx}
              className="group relative h-1.5 w-10 overflow-hidden rounded-full bg-[var(--bg-3)] transition hover:bg-[var(--bg-2)]"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 bg-[var(--brand)] transition-[width] duration-500"
                style={{ width: i === idx ? "100%" : i < idx ? "100%" : "0%" }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
