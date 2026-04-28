"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Title } from "@/lib/data";
import { TitleCard } from "@/components/TitleCard";

const RECENT_KEY = "hentaiki:recent-searches";

export function SearchClient({
  titles,
  tags,
}: {
  titles: Title[];
  tags: string[];
}) {
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch {}
  }, []);

  function pushRecent(term: string) {
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 8);
    setRecent(next);
    try {
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {}
  }

  const query = q.trim().toLowerCase();
  const results = useMemo(() => {
    if (!query) return [];
    return titles.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.studio.toLowerCase().includes(query) ||
        t.synopsis.toLowerCase().includes(query) ||
        t.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }, [query, titles]);

  // group: titles, studios, tags
  const studioMatches = useMemo(() => {
    if (!query) return [];
    const set = new Set<string>();
    for (const t of titles) if (t.studio.toLowerCase().includes(query)) set.add(t.studio);
    return Array.from(set).slice(0, 5);
  }, [query, titles]);

  const tagMatches = useMemo(
    () => (query ? tags.filter((t) => t.toLowerCase().includes(query)).slice(0, 6) : []),
    [query, tags],
  );

  const trendingTags = tags.slice(0, 8);

  return (
    <main className="mx-auto max-w-[1500px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <header>
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
          Search
        </p>
        <h1 className="mt-2 text-[clamp(2rem,1.4rem+2.4vw,3.4rem)] font-extrabold tracking-tight text-[var(--fg-4)]">
          {query ? `Results for "${q}"` : "What are you looking for?"}
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query) pushRecent(query);
          }}
          className="mt-6 max-w-2xl"
        >
          <label htmlFor="q" className="sr-only">
            Search the catalog
          </label>
          <div className="flex h-14 items-center gap-3 rounded-full bg-[var(--bg-1)] px-5 hairline focus-within:ring-2 focus-within:ring-[var(--ring)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--fg-1)]" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
            <input
              id="q"
              name="q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoFocus
              placeholder="Title, studio, tag…"
              className="flex-1 bg-transparent text-[1rem] text-[var(--fg-4)] placeholder:text-[var(--fg-1)] focus:outline-none"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="Clear"
                className="grid h-8 w-8 place-items-center rounded-full text-[var(--fg-1)] transition hover:bg-[var(--bg-2)] hover:text-[var(--fg-4)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                  <path d="m6 6 12 12" />
                  <path d="m18 6-12 12" />
                </svg>
              </button>
            )}
          </div>
        </form>
      </header>

      {!query ? (
        <section className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-7">
            <h2 className="text-[0.86rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
              Trending tags
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQ(tag)}
                  className="rounded-full bg-[var(--bg-1)] px-3.5 py-1.5 text-[0.86rem] font-medium text-[var(--fg-3)] hairline transition hover:bg-[var(--bg-2)] hover:text-[var(--brand)]"
                >
                  {tag}
                </button>
              ))}
            </div>

            {recent.length > 0 && (
              <>
                <h2 className="mt-8 text-[0.86rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
                  Recent searches
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {recent.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setQ(r)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-2)] px-3 py-1.5 text-[0.84rem] font-medium text-[var(--fg-3)] transition hover:bg-[var(--bg-3)] hover:text-[var(--fg-4)]"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                      {r}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="col-span-12 md:col-span-5">
            <h2 className="text-[0.86rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
              Discover
            </h2>
            <ul className="mt-3 space-y-2">
              {titles.slice(0, 4).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/title/${t.slug}`}
                    className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-[var(--bg-2)]"
                  >
                    <div className="relative aspect-[3/4] w-12 shrink-0 overflow-hidden rounded-md bg-black">
                      <Image
                        src={`https://picsum.photos/id/${t.imageId}/120/160`}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-[0.92rem] font-semibold text-[var(--fg-3)] group-hover:text-[var(--brand)]">
                        {t.name}
                      </p>
                      <p className="line-clamp-1 text-[0.76rem] text-[var(--fg-1)]">
                        {t.studio} · {t.year}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="mt-8 space-y-10">
          {tagMatches.length > 0 && (
            <div>
              <h2 className="text-[0.86rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
                Tags
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {tagMatches.map((tag) => (
                  <Link
                    key={tag}
                    href={`/genres/${encodeURIComponent(tag.toLowerCase())}`}
                    className="rounded-full bg-[var(--brand-soft)] px-3 py-1.5 text-[0.86rem] font-semibold text-[var(--brand)] transition hover:bg-[oklch(0.72_0.182_52_/_0.28)]"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {studioMatches.length > 0 && (
            <div>
              <h2 className="text-[0.86rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
                Studios
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {studioMatches.map((s) => (
                  <Link
                    key={s}
                    href={`/browse?studio=${encodeURIComponent(s)}`}
                    className="rounded-full bg-[var(--bg-2)] px-3 py-1.5 text-[0.86rem] font-medium text-[var(--fg-3)] transition hover:bg-[var(--bg-3)] hover:text-[var(--fg-4)]"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-[0.86rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
              Titles · {results.length}
            </h2>
            {results.length === 0 ? (
              <div className="mt-3 rounded-2xl border border-dashed border-[var(--bg-3)] p-14 text-center">
                <p className="text-[1.1rem] font-semibold text-[var(--fg-3)]">
                  {`No matches for "${q}".`}
                </p>
                <p className="mt-2 text-[0.92rem] text-[var(--fg-1)]">
                  Try a shorter query or a tag like Drama or Romance.
                </p>
                <Link href="/browse" className="btn-brand mt-5 inline-flex text-[0.92rem]">
                  Browse all titles
                </Link>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
                {results.map((t, i) => (
                  <TitleCard key={t.slug} title={t} priority={i < 5} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
