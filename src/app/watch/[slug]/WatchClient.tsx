"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Episode, Title } from "@/lib/data";
import { Player } from "@/components/Player";
import { TitleCard } from "@/components/TitleCard";
import { Stars } from "@/components/Stars";
import { TitleActions } from "@/components/TitleActions";

export function WatchClient({
  title,
  episodes,
  initialEpisode,
  related,
}: {
  title: Title;
  episodes: Episode[];
  initialEpisode: number;
  related: Title[];
}) {
  const [episode, setEpisode] = useState(initialEpisode);
  const current = episodes.find((e) => e.number === episode) ?? episodes[0];

  return (
    <>
      {/* Backdrop band */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`https://picsum.photos/id/${title.imageId}/2000/900`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30 blur-md"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-0)]/60 via-[var(--bg-0)]/85 to-[var(--bg-0)]" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-4 pb-8 pt-24 sm:px-6 sm:pt-28 lg:px-8">
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-[0.78rem] text-[var(--fg-1)]">
            <Link href="/browse" className="hover:text-[var(--brand)]">
              Browse
            </Link>
            <span>/</span>
            <Link
              href={`/title/${title.slug}`}
              className="hover:text-[var(--brand)]"
            >
              {title.name}
            </Link>
            <span>/</span>
            <span className="text-[var(--fg-3)]">
              Episode {String(current.number).padStart(2, "0")}
            </span>
          </nav>

          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 lg:col-span-9">
              <Player
                title={title}
                episodes={episodes}
                episode={episode}
                onEpisodeChange={setEpisode}
              />

              {/* Title strip + actions */}
              <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                    Episode {String(current.number).padStart(2, "0")} ·{" "}
                    {current.runtime}
                  </p>
                  <h1 className="mt-1 text-[clamp(1.4rem,1rem+1vw,2.2rem)] font-extrabold tracking-tight text-[var(--fg-4)]">
                    {title.name}
                  </h1>
                  <p className="mt-0.5 text-[1rem] text-[var(--fg-2)]">
                    {current.name}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.86rem] text-[var(--fg-2)]">
                    <span className="flex items-center gap-1.5">
                      <Stars score={title.score} size={12} />
                      <span className="font-semibold text-[var(--fg-3)]">
                        {title.score.toFixed(1)}
                      </span>
                    </span>
                    <span>{title.studio}</span>
                    <span>{title.year}</span>
                    {title.director && <span>Dir. {title.director}</span>}
                  </div>
                </div>
                <TitleActions slug={title.slug} />
              </div>

              <p className="mt-4 max-w-[70ch] text-[0.96rem] leading-relaxed text-[var(--fg-2)]">
                {current.synopsis}
              </p>
            </div>

            {/* Episodes rail */}
            <aside className="col-span-12 lg:col-span-3">
              <div className="card hairline">
                <header className="flex items-center justify-between border-b border-[var(--bg-3)]/70 px-4 py-3">
                  <div>
                    <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
                      Episodes
                    </h3>
                    <p className="mt-0.5 text-[0.92rem] font-bold text-[var(--fg-4)]">
                      Season 1
                    </p>
                  </div>
                  <span className="text-[0.78rem] text-[var(--fg-1)]">
                    {episodes.length} ep
                  </span>
                </header>
                <ol className="max-h-[640px] overflow-y-auto px-2 py-2">
                  {episodes.map((e) => {
                    const active = e.number === current.number;
                    return (
                      <li key={e.number}>
                        <button
                          type="button"
                          onClick={() => setEpisode(e.number)}
                          aria-current={active ? "true" : undefined}
                          className={`group flex w-full items-start gap-3 rounded-lg p-2 text-left transition ${
                            active
                              ? "bg-[var(--bg-2)]"
                              : "hover:bg-[var(--bg-2)]/60"
                          }`}
                        >
                          <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-md bg-black">
                            <Image
                              src={`https://picsum.photos/id/${title.imageId + e.number}/240/135`}
                              alt=""
                              fill
                              sizes="96px"
                              className="object-cover transition duration-500 group-hover:scale-105"
                              unoptimized
                            />
                            {active && (
                              <span className="absolute inset-0 grid place-items-center bg-black/35">
                                <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--brand)] text-[oklch(0.18_0.02_30)]">
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </span>
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${
                                active ? "text-[var(--brand)]" : "text-[var(--fg-1)]"
                              }`}
                            >
                              Ep {String(e.number).padStart(2, "0")} · {e.runtime}
                            </p>
                            <p
                              className={`mt-0.5 line-clamp-1 text-[0.86rem] font-semibold ${
                                active ? "text-[var(--fg-4)]" : "text-[var(--fg-3)]"
                              }`}
                            >
                              {e.name}
                            </p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-[1500px] px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-[clamp(1.4rem,1.1rem+0.9vw,1.8rem)] font-bold tracking-tight text-[var(--fg-4)]">
          Recommended for you
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {related.map((t) => (
            <TitleCard key={t.slug} title={t} preview={false} />
          ))}
        </div>
      </section>
    </>
  );
}
