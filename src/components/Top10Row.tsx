"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Title } from "@/lib/data";

export function Top10Row({ titles }: { titles: Title[] }) {
  const ref = useRef<HTMLDivElement>(null);

  function scrollBy(dir: -1 | 1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  }

  return (
    <section className="relative">
      <div className="mb-4 flex items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="flex items-center gap-2 text-[1.4rem] font-extrabold tracking-tight text-[var(--fg-4)]">
            Top 10 this week
            <span className="pill pill-brand">RANKED</span>
          </h2>
          <p className="mt-1 text-[0.86rem] text-[var(--fg-1)]">
            What is climbing the charts on hentaiki right now
          </p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-2)] text-[var(--fg-2)] transition hover:bg-[var(--bg-3)] hover:text-[var(--fg-4)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 6-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-2)] text-[var(--fg-2)] transition hover:bg-[var(--bg-3)] hover:text-[var(--fg-4)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pl-4 sm:gap-6 sm:pl-6 lg:pl-8"
      >
        {titles.slice(0, 10).map((t, i) => (
          <Link
            key={t.slug}
            href={`/title/${t.slug}`}
            className="group relative flex shrink-0 snap-start items-end gap-3 sm:gap-4"
            aria-label={`Number ${i + 1}: ${t.name}`}
          >
            <span
              aria-hidden
              className="select-none text-[clamp(7rem,16vw,12rem)] font-black leading-[0.78] tracking-[-0.06em] text-transparent transition duration-500 group-hover:text-[var(--brand)]"
              style={{
                WebkitTextStroke: "2px var(--bg-3)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {i + 1}
            </span>
            <div className="lift relative h-[230px] w-[156px] overflow-hidden rounded-xl bg-[var(--bg-1)] hairline sm:h-[280px] sm:w-[190px]">
              <Image
                src={`https://picsum.photos/id/${t.imageId}/500/750`}
                alt={`${t.name} cover`}
                fill
                sizes="190px"
                className="object-cover transition duration-700 group-hover:scale-[1.06]"
                unoptimized
              />
              <div className="cover-shade" />
              <div className="absolute inset-x-2.5 bottom-2.5">
                <h3 className="line-clamp-1 text-[0.92rem] font-semibold text-white">
                  {t.name}
                </h3>
                <p className="line-clamp-1 text-[0.74rem] text-white/70">
                  {t.studio}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
