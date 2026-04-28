import Link from "next/link";
import { titles, allCollections, byCollection } from "@/lib/data";
import { TitleCard } from "@/components/TitleCard";
import { Cover } from "@/components/Cover";

export default function HomePage() {
  const featured = titles[0];
  const tonight = titles.slice(1, 5);
  const studios = [
    "Atelier Kurai",
    "Hoshigumi",
    "Studio Velho",
    "Yatagarasu",
    "Yukimura Pictures",
    "Saudade Films",
  ];

  return (
    <>
      {/* HERO — asymmetric, type-led, single accent */}
      <section className="relative isolate overflow-hidden border-b border-[var(--ink-3)]">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="mx-auto grid max-w-[1320px] grid-cols-12 gap-x-6 gap-y-10 px-5 pb-20 pt-16 sm:px-8 md:pt-24">
          <div className="col-span-12 md:col-span-7">
            <p className="t-mono text-[var(--accent)]">A streaming room · Members only · 18+</p>
            <h1
              className="tt-display rise mt-5 text-[clamp(3rem,2rem+5vw,6.5rem)] text-[var(--ink-7)]"
            >
              animation
              <br />
              for the
              <br />
              small hours.
            </h1>
            <p className="rise mt-7 max-w-[52ch] text-[1.05rem] text-[var(--ink-5)] [animation-delay:120ms]">
              Adult animation, curated like a film series. Six new titles a
              month, four hours of programming a week, no autoplay banners,
              no ads. The point is to watch one thing tonight, slowly.
            </p>

            <div className="rise mt-9 flex flex-wrap items-center gap-3 [animation-delay:200ms]">
              <Link
                href="/browse"
                className="inline-flex h-11 items-center rounded-full bg-[var(--ink-7)] px-6 text-[0.95rem] font-medium text-[var(--ink-0)] transition-transform hover:-translate-y-px"
              >
                Open the catalog
              </Link>
              <Link
                href="/about"
                className="inline-flex h-11 items-center rounded-full border border-[var(--ink-3)] px-6 text-[0.95rem] text-[var(--ink-6)] transition-colors hover:border-[var(--ink-4)] hover:text-[var(--ink-7)]"
              >
                Read the editorial
              </Link>
            </div>

            <dl className="rise mt-14 grid max-w-[44ch] grid-cols-3 gap-6 [animation-delay:280ms]">
              {[
                ["72", "titles, hand-picked"],
                ["6", "studios in rotation"],
                ["0", "ads, ever"],
              ].map(([n, l]) => (
                <div key={l} className="border-t border-[var(--ink-3)] pt-3">
                  <dt
                    className="text-[1.6rem] text-[var(--ink-7)]"
                    style={{ fontVariationSettings: '"opsz" 32, "wdth" 96, "wght" 580' }}
                  >
                    {n}
                  </dt>
                  <dd className="t-mono mt-1 text-[var(--ink-4)]">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Featured tile, deliberately offset */}
          <div className="col-span-12 md:col-span-5 md:pt-12">
            <Link
              href={`/watch/${featured.slug}`}
              className="group block"
              aria-label={`Featured title: ${featured.name}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Cover
                  title={featured}
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--ink-0)] to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span className="t-mono text-[var(--ink-7)]">Now showing</span>
                </div>
                <div className="absolute inset-x-5 bottom-5">
                  <p className="t-mono text-[var(--ink-5)]">{featured.studio} · {featured.year}</p>
                  <h2
                    className="mt-2 text-[clamp(1.5rem,1.1rem+1.4vw,2.2rem)] text-[var(--ink-7)]"
                    style={{ fontVariationSettings: '"opsz" 32, "wdth" 96, "wght" 600' }}
                  >
                    {featured.name}
                  </h2>
                  <p className="mt-2 line-clamp-3 max-w-[42ch] text-[0.95rem] text-[var(--ink-6)]">
                    {featured.synopsis}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[0.85rem] text-[var(--ink-4)]">
                {featured.episodes} episodes · {featured.runtime} · {featured.rating}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE — studios in rotation */}
      <section
        aria-label="Studios in rotation"
        className="overflow-hidden border-b border-[var(--ink-3)] bg-[var(--ink-1)] py-5"
      >
        <div className="marquee flex w-max gap-14 whitespace-nowrap">
          {[...studios, ...studios, ...studios].map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="flex items-center gap-4 text-[1rem] text-[var(--ink-6)]"
              style={{ fontVariationSettings: '"opsz" 32, "wdth" 96, "wght" 500' }}
            >
              {s}
              <span className="inline-block h-1 w-1 rounded-full bg-[var(--accent)]" />
            </span>
          ))}
        </div>
      </section>

      {/* TONIGHT — short list, editorial */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="t-mono text-[var(--ink-4)]">Tonight</p>
            <h2 className="tt-h2 mt-2 text-[clamp(1.8rem,1.3rem+1.6vw,2.6rem)] text-[var(--ink-7)]">
              Four picks for a long evening.
            </h2>
          </div>
          <Link
            href="/browse"
            className="hidden text-[0.92rem] text-[var(--ink-5)] hover:text-[var(--ink-7)] sm:inline"
          >
            See the whole catalog →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {tonight.map((t) => (
            <TitleCard key={t.slug} title={t} />
          ))}
        </div>
      </section>

      {/* ETHOS — long-form quiet block, asymmetric */}
      <section className="border-y border-[var(--ink-3)] bg-[var(--ink-1)]">
        <div className="mx-auto grid max-w-[1320px] grid-cols-12 gap-x-6 gap-y-10 px-5 py-24 sm:px-8">
          <p className="t-mono col-span-12 text-[var(--accent)] md:col-span-3">
            What we are
          </p>
          <div className="col-span-12 md:col-span-9">
            <p
              className="text-[clamp(1.4rem,1rem+1.2vw,2rem)] text-[var(--ink-7)]"
              style={{
                fontVariationSettings: '"opsz" 32, "wdth" 100, "wght" 480',
                letterSpacing: "-0.012em",
                lineHeight: 1.25,
                maxWidth: "30ch",
              }}
            >
              Most of the internet is fast, loud, and free. We are slow, quiet,
              and inexpensive on purpose. The catalog is small. The lights are
              low. There are no recommendations from a machine.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  k: "01",
                  t: "Curated, not generated.",
                  d: "An editor watches every title before it's added. The list is short on purpose.",
                },
                {
                  k: "02",
                  t: "Members only.",
                  d: "Six dollars a month. No ads, no trackers, no engagement metrics shown to you.",
                },
                {
                  k: "03",
                  t: "Designed for the room you watch in.",
                  d: "A dark interface that disappears as soon as the title plays.",
                },
              ].map((p) => (
                <div key={p.k} className="border-t border-[var(--ink-3)] pt-4">
                  <p className="t-mono text-[var(--ink-4)]">{p.k}</p>
                  <h3
                    className="mt-2 text-[1.18rem] text-[var(--ink-7)]"
                    style={{ fontVariationSettings: '"opsz" 24, "wdth" 100, "wght" 580' }}
                  >
                    {p.t}
                  </h3>
                  <p className="mt-2 text-[0.95rem] text-[var(--ink-5)]">
                    {p.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS — name-led list */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
        <div className="mb-10">
          <p className="t-mono text-[var(--ink-4)]">Collections</p>
          <h2 className="tt-h2 mt-2 text-[clamp(1.8rem,1.3rem+1.6vw,2.6rem)] text-[var(--ink-7)]">
            Six rooms, one season at a time.
          </h2>
        </div>

        <ol className="divide-y divide-[var(--ink-3)] border-y border-[var(--ink-3)]">
          {allCollections.map((c, i) => {
            const items = byCollection(c);
            return (
              <li key={c}>
                <Link
                  href={`/collections#${c.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group flex items-center justify-between gap-6 py-7 transition-colors hover:bg-[var(--ink-1)]"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="t-mono w-10 text-[var(--ink-4)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)] text-[var(--ink-6)] transition-colors group-hover:text-[var(--ink-7)]"
                      style={{ fontVariationSettings: '"opsz" 48, "wdth" 100, "wght" 540', letterSpacing: "-0.02em" }}
                    >
                      {c}
                    </span>
                  </div>
                  <span className="t-mono text-[var(--ink-4)]">
                    {items.length} titles
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* CTA — quiet, single button */}
      <section className="mx-auto max-w-[1320px] px-5 pb-24 pt-4 sm:px-8">
        <div className="relative overflow-hidden border border-[var(--ink-3)] bg-[var(--ink-1)] p-10 md:p-16">
          <div className="grain absolute inset-0" aria-hidden />
          <div className="relative grid grid-cols-1 items-end gap-8 md:grid-cols-2">
            <h2
              className="tt-h2 max-w-[18ch] text-[clamp(2rem,1.4rem+2vw,3.2rem)] text-[var(--ink-7)]"
            >
              Six dollars. One short list. The lights stay low.
            </h2>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <Link
                href="/browse"
                className="inline-flex h-12 items-center rounded-full bg-[var(--accent)] px-7 text-[0.95rem] font-medium text-[var(--ink-0)] transition-colors hover:bg-[var(--accent-press)]"
              >
                Become a member
              </Link>
              <p className="t-mono text-[var(--ink-4)]">Cancel any month.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
