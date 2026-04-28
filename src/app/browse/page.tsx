import Link from "next/link";
import { titles, allTags, allCollections, byCollection } from "@/lib/data";
import { TitleCard } from "@/components/TitleCard";
import { Row } from "@/components/Row";

export const metadata = {
  title: "Browse the catalog",
  description: "All titles. Filter by genre, sort by year or rating.",
};

type SearchParams = Promise<{ tag?: string; sort?: "year" | "title" | "score" }>;

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { tag, sort = "score" } = await searchParams;
  const filtered = tag ? titles.filter((t) => t.tags.includes(tag)) : titles;
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "year") return b.year - a.year;
    if (sort === "title") return a.name.localeCompare(b.name);
    return b.score - a.score;
  });

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pt-10 sm:px-8 sm:pt-14">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
          {tag ? `Genre: ${tag}` : "Catalog"}
        </p>
        <h1 className="mt-2 text-[clamp(2rem,1.4rem+2.4vw,3.4rem)] font-extrabold tracking-tight text-[var(--fg-4)]">
          Browse {sorted.length} titles
        </h1>
        <p className="mt-2 text-[0.98rem] text-[var(--fg-2)]">
          Hand-picked adult animation. Sub and dub. New episodes every Friday.
        </p>
      </section>

      {/* Filter rail */}
      <section className="sticky top-16 z-30 mt-8 border-y border-[var(--bg-3)]/70 bg-[var(--bg-0)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 overflow-x-auto px-5 py-3 sm:px-8 no-scrollbar">
          <Link
            href="/browse"
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[0.86rem] font-medium transition ${
              !tag
                ? "bg-[var(--brand)] text-[oklch(0.18_0.02_30)]"
                : "bg-[var(--bg-2)] text-[var(--fg-2)] hover:text-[var(--fg-4)]"
            }`}
          >
            All
          </Link>
          {allTags.map((t) => {
            const active = tag === t;
            return (
              <Link
                key={t}
                href={`/browse?tag=${encodeURIComponent(t)}`}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[0.86rem] font-medium transition ${
                  active
                    ? "bg-[var(--brand)] text-[oklch(0.18_0.02_30)]"
                    : "bg-[var(--bg-2)] text-[var(--fg-2)] hover:text-[var(--fg-4)]"
                }`}
              >
                {t}
              </Link>
            );
          })}
          <div className="ml-auto flex shrink-0 items-center gap-2 text-[0.84rem] text-[var(--fg-1)]">
            <span>Sort</span>
            <SortLink current={sort} value="score" tag={tag} label="Top rated" />
            <SortLink current={sort} value="year" tag={tag} label="Newest" />
            <SortLink current={sort} value="title" tag={tag} label="A–Z" />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1400px] px-5 pt-8 sm:px-8">
        {sorted.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--bg-3)] p-14 text-center">
            <p className="text-[1.1rem] font-semibold text-[var(--fg-3)]">
              Nothing matches that yet.
            </p>
            <p className="mt-2 text-[0.92rem] text-[var(--fg-1)]">
              Try another tag or browse collections.
            </p>
            <Link
              href="/browse"
              className="btn-brand mt-5 inline-flex text-[0.92rem]"
            >
              See all titles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {sorted.map((t, i) => (
              <TitleCard key={t.slug} title={t} priority={i < 5} />
            ))}
          </div>
        )}
      </section>

      {/* Bonus rows for unfiltered view */}
      {!tag && (
        <>
          {allCollections.slice(0, 3).map((c) => (
            <Row key={c} heading={c} titles={byCollection(c)} href={`/collections#${slug(c)}`} />
          ))}
        </>
      )}
    </>
  );
}

function SortLink({
  current,
  value,
  tag,
  label,
}: {
  current: string;
  value: "score" | "year" | "title";
  tag?: string;
  label: string;
}) {
  const params = new URLSearchParams();
  if (tag) params.set("tag", tag);
  params.set("sort", value);
  const active = current === value;
  return (
    <Link
      href={`/browse?${params.toString()}`}
      className={`rounded-full px-3 py-1.5 transition ${
        active
          ? "bg-[var(--bg-3)] text-[var(--fg-4)]"
          : "text-[var(--fg-2)] hover:text-[var(--fg-4)]"
      }`}
    >
      {label}
    </Link>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
