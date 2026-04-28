"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Title } from "@/lib/data";
import { TitleCard } from "./TitleCard";

export function Row({
  heading,
  subheading,
  titles,
  href,
  size = "md",
}: {
  heading: string;
  subheading?: string;
  titles: Title[];
  href?: string;
  size?: "sm" | "md" | "lg";
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  function scroll(dir: -1 | 1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  }

  return (
    <section className="mt-12">
      <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-5 sm:px-8">
        <div>
          <h2 className="text-[1.4rem] font-bold tracking-tight text-[var(--fg-4)] sm:text-[1.6rem]">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-1 text-[0.92rem] text-[var(--fg-1)]">{subheading}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {href && (
            <Link
              href={href}
              className="hidden text-[0.88rem] font-semibold text-[var(--fg-2)] transition hover:text-[var(--brand)] md:inline-block"
            >
              See all →
            </Link>
          )}
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-2)] text-[var(--fg-3)] transition hover:bg-[var(--bg-3)] md:inline-flex"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-2)] text-[var(--fg-3)] transition hover:bg-[var(--bg-3)] md:inline-flex"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:px-8"
      >
        {titles.map((t, i) => (
          <div key={t.slug} className="snap-start">
            <TitleCard title={t} size={size} priority={i < 3} />
          </div>
        ))}
        <div aria-hidden className="w-2 shrink-0" />
      </div>
    </section>
  );
}
