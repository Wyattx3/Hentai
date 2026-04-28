import Link from "next/link";
import { titles, allTags } from "@/lib/data";
import { TitleCard } from "@/components/TitleCard";

export const metadata = {
  title: "Search the catalog",
  description: "Find titles by name, studio, tag, or synopsis.",
};

type SearchParams = Promise<{ q?: string }>;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const results = query
    ? titles.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.studio.toLowerCase().includes(query) ||
          t.synopsis.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    : [];

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pt-12 sm:px-8 sm:pt-16">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
          Search
        </p>
        <h1 className="mt-2 text-[clamp(2rem,1.4rem+2.4vw,3.4rem)] font-extrabold tracking-tight text-[var(--fg-4)]">
          {query ? `Results for "${query}"` : "What are you looking for?"}
        </h1>
        <form method="get" action="/search" className="mt-6 max-w-2xl">
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
              defaultValue={q}
              autoFocus
              placeholder="Title, studio, tag…"
              className="flex-1 bg-transparent text-[1rem] text-[var(--fg-4)] placeholder:text-[var(--fg-1)] focus:outline-none"
            />
            <button type="submit" className="btn-brand text-[0.9rem]">
              Search
            </button>
          </div>
        </form>
        {!query && (
          <div className="mt-6">
            <p className="text-[0.86rem] uppercase tracking-[0.16em] text-[var(--fg-1)]">
              Try a tag
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {allTags.slice(0, 10).map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-[var(--bg-1)] px-3.5 py-1.5 text-[0.86rem] font-medium text-[var(--fg-3)] hairline transition hover:bg-[var(--bg-2)] hover:text-[var(--brand)]"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {query && (
        <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8">
          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--bg-3)] p-14 text-center">
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
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {results.map((t, i) => (
                <TitleCard key={t.slug} title={t} priority={i < 5} />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
