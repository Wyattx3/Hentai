import Link from "next/link";
import { titles, allCollections, allTags, byCollection } from "@/lib/data";
import { TitleCard } from "@/components/TitleCard";

export const metadata = {
  title: "Browse",
  description: "The whole catalog, in one short page.",
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}) {
  const { tag, sort } = await searchParams;
  const filtered = tag ? titles.filter((t) => t.tags.includes(tag)) : titles;
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "year") return b.year - a.year;
    if (sort === "title") return a.name.localeCompare(b.name);
    return b.year - a.year;
  });

  return (
    <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
      {/* Page header — type-led, no card */}
      <header className="border-b border-[var(--ink-3)] py-14">
        <p className="t-mono text-[var(--ink-4)]">The catalog</p>
        <h1 className="tt-h1 mt-3 text-[clamp(2.4rem,1.6rem+3vw,4.2rem)] text-[var(--ink-7)]">
          {tag ? <>{tag}, twelve titles deep.</> : <>Twelve titles, six studios.</>}
        </h1>
        <p className="mt-4 max-w-[58ch] text-[1.05rem] text-[var(--ink-5)]">
          Updated the first Friday of every month. Filter by mood or studio. Pick one for tonight.
        </p>
      </header>

      {/* Filter rail — chips + sort, no nested cards */}
      <div className="sticky top-14 z-20 -mx-5 mt-0 flex flex-col gap-4 border-b border-[var(--ink-3)] bg-[var(--ink-0)]/95 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <nav aria-label="Filter by tag" className="flex flex-wrap items-center gap-2">
          <Link
            href="/browse"
            className={chip(!tag)}
            aria-current={!tag ? "page" : undefined}
          >
            All
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/browse?tag=${encodeURIComponent(t)}`}
              className={chip(tag === t)}
              aria-current={tag === t ? "page" : undefined}
            >
              {t}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-[0.85rem]">
          <span className="t-mono text-[var(--ink-4)]">Sort</span>
          <SortLink current={sort} value="year" label="Newest" tag={tag} />
          <SortLink current={sort} value="title" label="A–Z" tag={tag} />
        </div>
      </div>

      {/* Grid — 2 → 3 → 4 columns, varied gap rhythm */}
      <section className="py-12">
        {sorted.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {sorted.map((t) => (
              <TitleCard key={t.slug} title={t} />
            ))}
          </div>
        )}
      </section>

      {/* Collections strip at the bottom — list, not cards */}
      <section className="border-t border-[var(--ink-3)] py-16">
        <p className="t-mono text-[var(--ink-4)]">Or browse by collection</p>
        <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
          {allCollections.map((c) => (
            <li key={c} className="flex items-baseline justify-between border-b border-[var(--ink-3)] pb-3">
              <Link
                href={`/collections#${c.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[1.1rem] text-[var(--ink-6)] hover:text-[var(--ink-7)]"
                style={{ fontVariationSettings: '"opsz" 24, "wdth" 100, "wght" 540' }}
              >
                {c}
              </Link>
              <span className="t-mono text-[var(--ink-4)]">
                {byCollection(c).length}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function chip(active: boolean) {
  return [
    "inline-flex h-8 items-center rounded-full border px-3 text-[0.82rem] transition-colors",
    active
      ? "border-[var(--accent-line)] bg-[var(--accent-soft)] text-[var(--ink-7)]"
      : "border-[var(--ink-3)] text-[var(--ink-5)] hover:border-[var(--ink-4)] hover:text-[var(--ink-7)]",
  ].join(" ");
}

function SortLink({
  current,
  value,
  label,
  tag,
}: {
  current: string | undefined;
  value: string;
  label: string;
  tag: string | undefined;
}) {
  const active = current === value || (!current && value === "year");
  const params = new URLSearchParams();
  if (tag) params.set("tag", tag);
  params.set("sort", value);
  return (
    <Link
      href={`/browse?${params.toString()}`}
      className={
        active
          ? "text-[var(--ink-7)] underline decoration-[var(--accent)] decoration-2 underline-offset-4"
          : "text-[var(--ink-5)] hover:text-[var(--ink-7)]"
      }
    >
      {label}
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-[var(--ink-3)] px-6 py-16 text-center">
      <p className="t-mono text-[var(--ink-4)]">Nothing in this filter</p>
      <h2
        className="mt-3 text-[clamp(1.4rem,1rem+1vw,1.8rem)] text-[var(--ink-7)]"
        style={{ fontVariationSettings: '"opsz" 32, "wdth" 100, "wght" 580' }}
      >
        Try another mood, or look at the whole catalog.
      </h2>
      <Link
        href="/browse"
        className="mt-5 inline-flex h-10 items-center rounded-full bg-[var(--ink-7)] px-5 text-[0.9rem] font-medium text-[var(--ink-0)]"
      >
        See everything
      </Link>
    </div>
  );
}
