import Link from "next/link";
import {
  titles,
  allTags,
  allStudios,
  allYears,
} from "@/lib/data";
import { TitleCard } from "@/components/TitleCard";

export const metadata = {
  title: "Browse the catalog",
  description: "All titles. Filter by genre, studio, year, sort.",
};

type SearchParams = Promise<{
  tag?: string;
  studio?: string;
  year?: string;
  sub?: string;
  dub?: string;
  sort?: "year" | "title" | "score";
}>;

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const tag = sp.tag;
  const studio = sp.studio;
  const year = sp.year;
  const sub = sp.sub === "1";
  const dub = sp.dub === "1";
  const sort = sp.sort ?? "score";

  let filtered = titles;
  if (tag) filtered = filtered.filter((t) => t.tags.includes(tag));
  if (studio) filtered = filtered.filter((t) => t.studio === studio);
  if (year) filtered = filtered.filter((t) => String(t.year) === year);
  if (sub) filtered = filtered.filter((t) => t.hasSub);
  if (dub) filtered = filtered.filter((t) => t.hasDub);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "year") return b.year - a.year;
    if (sort === "title") return a.name.localeCompare(b.name);
    return b.score - a.score;
  });

  const facets: Array<{ key: string; value?: string; label: string }> = [];
  if (tag) facets.push({ key: "tag", value: tag, label: tag });
  if (studio) facets.push({ key: "studio", value: studio, label: studio });
  if (year) facets.push({ key: "year", value: year, label: year });
  if (sub) facets.push({ key: "sub", label: "Sub" });
  if (dub) facets.push({ key: "dub", label: "Dub" });

  function urlFor(overrides: Record<string, string | undefined>) {
    const next = new URLSearchParams();
    const merge: Record<string, string | undefined> = {
      tag,
      studio,
      year,
      sort,
      sub: sub ? "1" : undefined,
      dub: dub ? "1" : undefined,
      ...overrides,
    };
    for (const [k, v] of Object.entries(merge)) {
      if (v !== undefined && v !== "") next.set(k, String(v));
    }
    const qs = next.toString();
    return qs ? `/browse?${qs}` : "/browse";
  }

  return (
    <main className="mx-auto max-w-[1500px] px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            {facets.length === 0 ? "Catalog" : "Filtered"}
          </p>
          <h1 className="mt-2 text-[clamp(2rem,1.4rem+2.4vw,3.4rem)] font-extrabold tracking-tight text-[var(--fg-4)]">
            {sorted.length} {sorted.length === 1 ? "title" : "titles"}
          </h1>
          <p className="mt-2 text-[0.98rem] text-[var(--fg-2)]">
            Hand-picked adult animation. Sub and dub. New episodes every week.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[0.84rem]">
          <span className="text-[var(--fg-1)]">Sort</span>
          <SortLink current={sort} value="score" url={(v) => urlFor({ sort: v })} label="Top rated" />
          <SortLink current={sort} value="year" url={(v) => urlFor({ sort: v })} label="Newest" />
          <SortLink current={sort} value="title" url={(v) => urlFor({ sort: v })} label="A–Z" />
        </div>
      </header>

      <div className="grid grid-cols-12 gap-x-6 gap-y-6">
        {/* Filter rail */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-3">
          <div className="card hairline sticky top-20 overflow-hidden">
            <FacetGroup
              title="Genre"
              options={["All", ...allTags]}
              selected={tag ?? "All"}
              hrefFor={(opt) => urlFor({ tag: opt === "All" ? undefined : opt })}
            />
            <FacetGroup
              title="Studio"
              options={["All", ...allStudios]}
              selected={studio ?? "All"}
              hrefFor={(opt) => urlFor({ studio: opt === "All" ? undefined : opt })}
            />
            <FacetGroup
              title="Year"
              options={["All", ...allYears.map((y) => String(y))]}
              selected={year ?? "All"}
              hrefFor={(opt) => urlFor({ year: opt === "All" ? undefined : opt })}
            />
            <div className="border-t border-[var(--bg-3)]/70 px-4 py-3">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
                Audio
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link
                  href={urlFor({ sub: sub ? undefined : "1" })}
                  aria-pressed={sub}
                  className={`rounded-full px-3 py-1 text-[0.78rem] font-semibold transition ${
                    sub
                      ? "bg-[var(--brand)] text-[oklch(0.18_0.02_30)]"
                      : "bg-[var(--bg-2)] text-[var(--fg-2)] hover:text-[var(--fg-4)]"
                  }`}
                >
                  Sub
                </Link>
                <Link
                  href={urlFor({ dub: dub ? undefined : "1" })}
                  aria-pressed={dub}
                  className={`rounded-full px-3 py-1 text-[0.78rem] font-semibold transition ${
                    dub
                      ? "bg-[var(--brand)] text-[oklch(0.18_0.02_30)]"
                      : "bg-[var(--bg-2)] text-[var(--fg-2)] hover:text-[var(--fg-4)]"
                  }`}
                >
                  Dub
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <section className="col-span-12 md:col-span-9 lg:col-span-9">
          {facets.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[0.82rem]">
              <span className="text-[var(--fg-1)]">Active:</span>
              {facets.map((f) => (
                <Link
                  key={f.key + (f.value ?? "")}
                  href={urlFor({ [f.key]: undefined })}
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-soft)] px-2.5 py-1 font-semibold text-[var(--brand)] transition hover:bg-[oklch(0.72_0.182_52_/_0.28)]"
                >
                  {f.label}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden>
                    <path d="m6 6 12 12" />
                    <path d="m18 6-12 12" />
                  </svg>
                </Link>
              ))}
              <Link href="/browse" className="ml-2 text-[0.82rem] text-[var(--fg-1)] underline-offset-4 hover:underline">
                Clear all
              </Link>
            </div>
          )}
          {sorted.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--bg-3)] p-14 text-center">
              <p className="text-[1.1rem] font-semibold text-[var(--fg-3)]">
                Nothing matches that yet.
              </p>
              <p className="mt-2 text-[0.92rem] text-[var(--fg-1)]">
                Try fewer filters or browse collections.
              </p>
              <Link href="/browse" className="btn-brand mt-5 inline-flex text-[0.92rem]">
                See all titles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
              {sorted.map((t, i) => (
                <TitleCard key={t.slug} title={t} priority={i < 5} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function FacetGroup({
  title,
  options,
  selected,
  hrefFor,
}: {
  title: string;
  options: string[];
  selected: string;
  hrefFor: (opt: string) => string;
}) {
  return (
    <div className="border-b border-[var(--bg-3)]/70 px-4 py-3 last:border-0">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
        {title}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = opt === selected;
          return (
            <Link
              key={opt}
              href={hrefFor(opt)}
              className={`rounded-full px-2.5 py-1 text-[0.78rem] font-medium transition ${
                active
                  ? "bg-[var(--brand)] text-[oklch(0.18_0.02_30)]"
                  : "bg-[var(--bg-2)] text-[var(--fg-2)] hover:bg-[var(--bg-3)] hover:text-[var(--fg-4)]"
              }`}
            >
              {opt}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SortLink({
  current,
  value,
  url,
  label,
}: {
  current: string;
  value: "score" | "year" | "title";
  url: (v: string) => string;
  label: string;
}) {
  const active = current === value;
  return (
    <Link
      href={url(value)}
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
