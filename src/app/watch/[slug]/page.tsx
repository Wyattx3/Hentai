import Link from "next/link";
import { notFound } from "next/navigation";
import { getTitle, titles } from "@/lib/data";
import { Cover } from "@/components/Cover";
import { TitleCard } from "@/components/TitleCard";
import { Player } from "@/components/Player";

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

  const episodes = Array.from({ length: title.episodes }, (_, i) => ({
    n: i + 1,
    label: `Episode ${String(i + 1).padStart(2, "0")}`,
    runtime: episodeRuntime(title.runtime, title.episodes, i),
  }));

  return (
    <>
      {/* Player */}
      <section className="border-b border-[var(--ink-3)] bg-[var(--ink-1)]">
        <div className="mx-auto max-w-[1320px] px-5 pb-8 pt-6 sm:px-8">
          <Player title={title} />
        </div>
      </section>

      {/* Meta */}
      <section className="mx-auto grid max-w-[1320px] grid-cols-12 gap-x-6 gap-y-12 px-5 py-14 sm:px-8">
        <div className="col-span-12 md:col-span-8">
          <p className="t-mono text-[var(--accent)]">
            {title.collection} · {title.studio} · {title.year}
          </p>
          <h1 className="tt-h1 mt-3 text-[clamp(2rem,1.4rem+2.4vw,3.6rem)] text-[var(--ink-7)]">
            {title.name}
          </h1>
          <p className="mt-5 max-w-[60ch] text-[1.1rem] text-[var(--ink-5)]">
            {title.synopsis}
          </p>

          <ul className="mt-6 flex flex-wrap items-center gap-2">
            {title.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/browse?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex h-7 items-center rounded-full border border-[var(--ink-3)] px-3 text-[0.78rem] text-[var(--ink-5)] hover:border-[var(--ink-4)] hover:text-[var(--ink-7)]"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <aside className="col-span-12 md:col-span-4">
          <dl className="divide-y divide-[var(--ink-3)] border-y border-[var(--ink-3)]">
            {[
              ["Runtime", title.runtime],
              ["Episodes", `${title.episodes}`],
              ["Studio", title.studio],
              ["Year", `${title.year}`],
              ["Rating", title.rating],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between py-3">
                <dt className="t-mono text-[var(--ink-4)]">{k}</dt>
                <dd className="text-[0.95rem] text-[var(--ink-6)]">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* Episodes */}
      <section className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <header className="mb-6 flex items-end justify-between border-b border-[var(--ink-3)] pb-4">
          <h2
            className="text-[clamp(1.3rem,1rem+0.8vw,1.6rem)] text-[var(--ink-7)]"
            style={{ fontVariationSettings: '"opsz" 32, "wdth" 100, "wght" 580' }}
          >
            Episodes
          </h2>
          <span className="t-mono text-[var(--ink-4)]">{title.episodes} total</span>
        </header>
        <ol className="divide-y divide-[var(--ink-3)]">
          {episodes.map((e, i) => (
            <li key={e.n}>
              <button
                type="button"
                className="flex w-full items-center gap-5 py-4 text-left transition-colors hover:bg-[var(--ink-1)]"
              >
                <span className="t-mono w-10 text-[var(--ink-4)]">
                  {String(e.n).padStart(2, "0")}
                </span>
                <span
                  className="flex-1 text-[1rem] text-[var(--ink-6)]"
                  style={{ fontVariationSettings: '"opsz" 24, "wdth" 100, "wght" 500' }}
                >
                  {e.label}
                </span>
                {i === 0 && (
                  <span className="t-mono rounded-full bg-[var(--accent-soft)] px-2 py-1 text-[var(--accent)]">
                    Up next
                  </span>
                )}
                <span className="t-mono text-[var(--ink-5)]">{e.runtime}</span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      {/* You may also like */}
      {more.length > 0 && (
        <section className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
          <header className="mb-8">
            <p className="t-mono text-[var(--ink-4)]">More from {title.collection}</p>
            <h2 className="tt-h2 mt-2 text-[clamp(1.6rem,1.2rem+1.4vw,2.2rem)] text-[var(--ink-7)]">
              If you liked this evening, try these.
            </h2>
          </header>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {more.map((m) => (
              <TitleCard key={m.slug} title={m} />
            ))}
          </div>
        </section>
      )}

      {/* Featured cover at full bleed for visual punctuation */}
      <section className="relative h-[40vh] min-h-[280px] overflow-hidden border-y border-[var(--ink-3)]">
        <Cover title={title} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink-0)] via-[var(--ink-0)]/40 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1320px] items-end px-5 pb-10 sm:px-8">
          <p
            className="max-w-[28ch] text-[clamp(1.4rem,1.1rem+1vw,2rem)] text-[var(--ink-7)]"
            style={{ fontVariationSettings: '"opsz" 32, "wdth" 100, "wght" 540', letterSpacing: "-0.012em" }}
          >
            Watch slow. The lights stay low.
          </p>
        </div>
      </section>
    </>
  );
}

/**
 * Approximate episode runtimes by splitting the total runtime label.
 */
function episodeRuntime(total: string, count: number, index: number): string {
  const m = total.match(/(\d+)h\s*(\d+)?m?/);
  if (!m) return "—";
  const hours = parseInt(m[1] ?? "0", 10);
  const mins = parseInt(m[2] ?? "0", 10);
  const totalMin = hours * 60 + mins;
  const base = Math.round(totalMin / count);
  const drift = (index % 3) - 1;
  const v = Math.max(15, base + drift);
  return `${v}m`;
}
