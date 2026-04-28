import Link from "next/link";
import { titles, allTags } from "@/lib/data";
import { TitleCard } from "@/components/TitleCard";

export const metadata = {
  title: "Search",
  description: "Search the catalog.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const results = query
    ? titles.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.studio.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          t.synopsis.toLowerCase().includes(query)
      )
    : [];

  return (
    <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
      <section className="border-b border-[var(--ink-3)] py-14">
        <p className="t-mono text-[var(--ink-4)]">Find a title</p>
        <h1 className="tt-h1 mt-3 text-[clamp(2.2rem,1.4rem+2.4vw,3.4rem)] text-[var(--ink-7)]">
          Search the room.
        </h1>

        <form
          action="/search"
          method="get"
          role="search"
          className="mt-7 flex max-w-[640px] items-center gap-3 border-b border-[var(--ink-4)] py-3"
        >
          <label htmlFor="q" className="sr-only">
            Search the catalog
          </label>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            aria-hidden="true"
            className="text-[var(--ink-5)]"
          >
            <circle cx="8" cy="8" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <line x1="11.7" y1="11.7" x2="16" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="Try a studio, a mood, a feeling..."
            className="w-full bg-transparent text-[1.05rem] text-[var(--ink-7)] placeholder:text-[var(--ink-4)] focus:outline-none"
          />
          <button
            type="submit"
            className="t-mono rounded-full bg-[var(--ink-7)] px-3 py-1 text-[var(--ink-0)]"
          >
            Search
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="t-mono text-[var(--ink-4)]">Try</span>
          {allTags.slice(0, 6).map((t) => (
            <Link
              key={t}
              href={`/search?q=${encodeURIComponent(t)}`}
              className="inline-flex h-7 items-center rounded-full border border-[var(--ink-3)] px-3 text-[0.78rem] text-[var(--ink-5)] hover:border-[var(--ink-4)] hover:text-[var(--ink-7)]"
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12">
        {!q ? (
          <p className="text-[var(--ink-5)]">Type something above. Six characters is enough.</p>
        ) : results.length === 0 ? (
          <div className="border border-dashed border-[var(--ink-3)] p-12 text-center">
            <p className="t-mono text-[var(--ink-4)]">{`Nothing matches “${q}”`}</p>
            <h2
              className="mt-3 text-[clamp(1.4rem,1rem+1vw,1.8rem)] text-[var(--ink-7)]"
              style={{ fontVariationSettings: '"opsz" 32, "wdth" 100, "wght" 580' }}
            >
              Try a studio name, a mood, or just open the catalog.
            </h2>
            <Link
              href="/browse"
              className="mt-5 inline-flex h-10 items-center rounded-full bg-[var(--ink-7)] px-5 text-[0.9rem] font-medium text-[var(--ink-0)]"
            >
              Open the catalog
            </Link>
          </div>
        ) : (
          <>
            <p className="t-mono mb-6 text-[var(--ink-4)]">
              {`${results.length} ${results.length === 1 ? "result" : "results"} for “${q}”`}
            </p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {results.map((t) => (
                <TitleCard key={t.slug} title={t} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
