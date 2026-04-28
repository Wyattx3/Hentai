import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTitle, titles } from "@/lib/data";
import { TitleCard } from "@/components/TitleCard";
import { Player } from "@/components/Player";
import { Stars } from "@/components/Stars";

export async function generateStaticParams() {
  return titles.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTitle(slug);
  if (!t) return {};
  return {
    title: t.name,
    description: t.synopsis,
  };
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = getTitle(slug);
  if (!title) notFound();

  const more = titles
    .filter((t) => t.slug !== slug && t.collection === title.collection)
    .slice(0, 4);
  const moreFilled = more.length >= 4
    ? more
    : [...more, ...titles.filter((t) => t.slug !== slug && !more.includes(t))].slice(0, 4);

  const episodes = Array.from({ length: title.episodes }, (_, i) => ({
    n: i + 1,
    label: `Episode ${String(i + 1).padStart(2, "0")}`,
    runtime: title.episodeRuntime ?? "—",
  }));

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
            className="object-cover opacity-40 blur-[2px]"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-0)]/40 via-[var(--bg-0)]/70 to-[var(--bg-0)]" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-5 pb-8 pt-10 sm:px-8 sm:pt-14">
          <Player title={title} />
        </div>
      </section>

      {/* Meta */}
      <section className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-8 gap-y-10 px-5 py-12 sm:px-8">
        <div className="col-span-12 md:col-span-8">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            {title.collection} · {title.studio} · {title.year}
          </p>
          <h1 className="mt-3 text-[clamp(2rem,1.4rem+2.4vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-[var(--fg-4)]">
            {title.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.95rem] text-[var(--fg-2)]">
            <span className="flex items-center gap-1.5">
              <Stars score={title.score} size={14} />
              <span className="font-semibold text-[var(--fg-3)]">{title.score.toFixed(1)}</span>
              <span className="text-[var(--fg-1)]">({title.votes})</span>
            </span>
            <span>{title.episodes} episodes</span>
            <span>{title.runtime}</span>
            <span className="pill pill-brand">HD</span>
            {title.hasSub && <span className="pill">SUB</span>}
            {title.hasDub && <span className="pill">DUB</span>}
            <span className="pill">{title.rating}</span>
          </div>
          <p className="mt-6 max-w-[64ch] text-[1.06rem] leading-relaxed text-[var(--fg-2)]">
            {title.synopsis}
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-2">
            {title.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/browse?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-[var(--bg-1)] px-3.5 py-1.5 text-[0.84rem] font-medium text-[var(--fg-3)] hairline transition hover:bg-[var(--bg-2)] hover:text-[var(--brand)]"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="#episodes" className="btn-brand inline-flex items-center gap-2 text-[0.96rem]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
              Start watching
            </Link>
            <button type="button" className="btn-ghost inline-flex items-center gap-2 text-[0.96rem]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <path d="M17 21v-8H7v8" />
              </svg>
              Save to list
            </button>
          </div>
        </div>

        <aside className="col-span-12 md:col-span-4">
          <div className="card hairline p-5">
            <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--fg-1)]">
              About this series
            </h3>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.92rem]">
              {[
                ["Episodes", `${title.episodes}`],
                ["Runtime", title.runtime],
                ["Per episode", title.episodeRuntime ?? "—"],
                ["Studio", title.studio],
                ["Year", `${title.year}`],
                ["Rating", title.rating],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col">
                  <dt className="text-[0.76rem] uppercase tracking-wider text-[var(--fg-1)]">{k}</dt>
                  <dd className="font-semibold text-[var(--fg-3)]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>

      {/* Episodes */}
      <section id="episodes" className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <header className="mb-5 flex items-end justify-between">
          <h2 className="text-[clamp(1.4rem,1.1rem+0.9vw,1.8rem)] font-bold tracking-tight text-[var(--fg-4)]">
            Episodes
          </h2>
          <span className="text-[0.86rem] text-[var(--fg-1)]">{title.episodes} total</span>
        </header>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((e, i) => (
            <li key={e.n}>
              <Link
                href="#"
                className="card hairline group flex items-center gap-4 p-3 transition hover:bg-[var(--bg-2)]"
              >
                <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-md bg-black">
                  <Image
                    src={`https://picsum.photos/id/${title.imageId + e.n}/320/180`}
                    alt={`${e.label} thumbnail`}
                    fill
                    sizes="128px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand)] text-[oklch(0.18_0.02_30)]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
                    Ep {String(e.n).padStart(2, "0")}
                    {i === 0 && <span className="ml-2 text-[var(--brand)]">Up next</span>}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-[0.96rem] font-semibold text-[var(--fg-3)]">
                    {e.label}
                  </p>
                  <p className="mt-0.5 text-[0.82rem] text-[var(--fg-1)]">{e.runtime}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <h2 className="text-[clamp(1.4rem,1.1rem+0.9vw,1.8rem)] font-bold tracking-tight text-[var(--fg-4)]">
          You may also like
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {moreFilled.map((t) => (
            <TitleCard key={t.slug} title={t} />
          ))}
        </div>
      </section>
    </>
  );
}
