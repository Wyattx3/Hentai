"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useContinueWatching,
  seedContinueWatchingIfEmpty,
} from "@/lib/storage";
import { useAuth } from "@/lib/auth";
import { titles, getTitle } from "@/lib/data";

export function ContinueRow() {
  const { records, remove } = useContinueWatching();
  const { user, ready } = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  // Only signed-in members get a personal Continue Watching row.
  // We seed the first time they have an account but no records yet.
  useEffect(() => {
    if (ready && user) {
      seedContinueWatchingIfEmpty(titles.slice(0, 5).map((t) => t.slug));
    }
  }, [ready, user]);

  if (!ready || !user || records.length === 0) return null;

  function scrollBy(dir: -1 | 1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  }

  return (
    <section className="relative">
      <div className="mb-4 flex items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-[1.4rem] font-extrabold tracking-tight text-[var(--fg-4)]">
            Continue Watching
          </h2>
          <p className="mt-1 text-[0.86rem] text-[var(--fg-1)]">
            Pick up where you left off
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
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8"
      >
        {records.map((r) => {
          const t = getTitle(r.slug);
          if (!t) return null;
          return (
            <div
              key={r.slug}
              className="group relative w-[300px] shrink-0 snap-start sm:w-[340px]"
            >
              <Link
                href={`/watch/${t.slug}`}
                className="lift relative block aspect-[16/9] overflow-hidden rounded-xl bg-[var(--bg-1)] hairline"
                aria-label={`Resume ${t.name} episode ${r.episode}`}
              >
                <Image
                  src={`https://picsum.photos/id/${t.imageId}/700/394`}
                  alt=""
                  fill
                  sizes="340px"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

                {/* Center play */}
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>

                {/* Bottom info + progress */}
                <div className="absolute inset-x-3 bottom-2.5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
                    Episode {r.episode} · {Math.round(r.progress * 100)}% watched
                  </p>
                  <h3 className="mt-0.5 line-clamp-1 text-[1.02rem] font-bold text-white">
                    {t.name}
                  </h3>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-[var(--brand)]"
                      style={{ width: `${Math.round(r.progress * 100)}%` }}
                    />
                  </div>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => remove(t.slug)}
                aria-label={`Remove ${t.name} from Continue Watching`}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition hover:bg-black/80 group-hover:opacity-100"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                  <path d="m6 6 12 12" />
                  <path d="m18 6-12 12" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
