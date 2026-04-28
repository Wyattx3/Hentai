import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { episodesFor, getTitle, titles } from "@/lib/data";
import { TitleCard } from "@/components/TitleCard";
import { Stars } from "@/components/Stars";
import { TitleActions } from "@/components/TitleActions";

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

export default async function TitlePage({
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

  const episodes = episodesFor(title);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={`https://picsum.photos/id/${title.imageId}/2400/1200`}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
            unoptimized
          />
          <div aria-hidden className="hero-shade" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[var(--bg-0)] via-[var(--bg-0)]/40 to-transparent" />
        </div>

        <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-x-8 gap-y-10 px-4 pb-14 pt-32 sm:px-6 sm:pb-20 sm:pt-44 lg:px-8">
          <div className="col-span-12 hero-fade md:col-span-7 lg:col-span-6">
            <p className="flex flex-wrap items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
              <span>{title.collection}</span>
              <span className="text-[var(--fg-1)]">·</span>
              <span className="text-[var(--fg-2)]">{title.studio}</span>
              {title.director && (
                <>
                  <span className="text-[var(--fg-1)]">·</span>
                  <span className="text-[var(--fg-2)]">Dir. {title.director}</span>
                </>
              )}
            </p>
            <h1 className="mt-3 text-[clamp(2.2rem,1.6rem+3vw,4.4rem)] font-extrabold leading-[0.96] tracking-tight text-[var(--fg-4)]">
              {title.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.95rem] text-[var(--fg-2)]">
              <span className="flex items-center gap-1.5">
                <Stars score={title.score} size={14} />
                <span className="font-semibold text-[var(--fg-3)]">
                  {title.score.toFixed(1)}
                </span>
                <span className="text-[var(--fg-1)]">({title.votes})</span>
              </span>
              <span>{title.year}</span>
              <span>{title.episodes} episodes</span>
              <span>{title.runtime}</span>
              <span className="pill pill-brand">HD</span>
              {title.hasSub && <span className="pill">SUB</span>}
              {title.hasDub && <span className="pill">DUB</span>}
              <span className="pill">{title.rating}</span>
            </div>
            <p className="mt-5 max-w-[60ch] text-[1.04rem] leading-relaxed text-[var(--fg-2)]">
              {title.synopsis}
            </p>
            <ul className="mt-5 flex flex-wrap items-center gap-2">
              {title.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/browse?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-[var(--bg-1)] px-3 py-1.5 text-[0.82rem] font-medium text-[var(--fg-3)] hairline transition hover:bg-[var(--bg-2)] hover:text-[var(--brand)]"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <TitleActions slug={title.slug} />
            </div>
          </div>

          <aside className="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
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
                  ["Director", title.director ?? "—"],
                  ["Country", title.country ?? "—"],
                  ["Language", title.language ?? "—"],
                  ["Year", `${title.year}`],
                  ["Rating", title.rating],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <dt className="text-[0.74rem] uppercase tracking-wider text-[var(--fg-1)]">{k}</dt>
                    <dd className="font-semibold text-[var(--fg-3)]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Episodes */}
      <section id="episodes" className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <header className="mb-5 flex items-end justify-between">
          <h2 className="text-[clamp(1.4rem,1.1rem+0.9vw,1.8rem)] font-bold tracking-tight text-[var(--fg-4)]">
            Episodes
          </h2>
          <span className="text-[0.86rem] text-[var(--fg-1)]">
            Season 1 · {title.episodes} episodes
          </span>
        </header>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((e, i) => (
            <li key={e.number}>
              <Link
                href={`/watch/${title.slug}?ep=${e.number}`}
                className="card hairline group flex items-start gap-4 p-3 transition hover:bg-[var(--bg-2)]"
              >
                <div className="relative aspect-video w-36 shrink-0 overflow-hidden rounded-md bg-black">
                  <Image
                    src={`https://picsum.photos/id/${title.imageId + e.number}/360/200`}
                    alt={`Episode ${e.number} thumbnail`}
                    fill
                    sizes="144px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  <span className="absolute right-1.5 bottom-1.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[0.66rem] font-semibold text-white">
                    {e.runtime}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand)] text-[oklch(0.18_0.02_30)]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
                    Ep {String(e.number).padStart(2, "0")}
                    {i === 0 && (
                      <span className="ml-2 text-[var(--brand)]">Up next</span>
                    )}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-[0.98rem] font-semibold text-[var(--fg-3)] group-hover:text-[var(--brand)]">
                    {e.name}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[0.82rem] leading-relaxed text-[var(--fg-1)]">
                    {e.synopsis}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-[clamp(1.4rem,1.1rem+0.9vw,1.8rem)] font-bold tracking-tight text-[var(--fg-4)]">
          You may also like
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {moreFilled.map((t) => (
            <TitleCard key={t.slug} title={t} />
          ))}
        </div>
      </section>
    </>
  );
}
