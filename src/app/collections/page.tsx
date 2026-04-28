import { allCollections, byCollection } from "@/lib/data";
import { TitleCard } from "@/components/TitleCard";

export const metadata = {
  title: "Collections",
  description: "Curated rooms: trending, new releases, and director picks.",
};

const blurbs: Record<string, string> = {
  "Trending Now": "What everyone's watching this week.",
  "New Releases": "Out this month. Simulcasts same-day.",
  "Popular This Week": "Top-rated and most-watched right now.",
  "Late Night": "Slow stories for the small hours.",
  "Studio Spotlight": "One studio at a time, in focus.",
  "Director's Pick": "Hand-selected by the editorial team.",
};

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function CollectionsPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pt-12 sm:px-8 sm:pt-16">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
          Collections
        </p>
        <h1 className="mt-2 text-[clamp(2.2rem,1.5rem+2.6vw,3.6rem)] font-extrabold tracking-tight text-[var(--fg-4)]">
          Six rooms, hand-picked.
        </h1>
        <p className="mt-2 max-w-[60ch] text-[1rem] text-[var(--fg-2)]">
          Every title in the catalog lives in one curated room. New rooms open every season.
        </p>
      </section>

      {allCollections.map((name, idx) => {
        const list = byCollection(name);
        if (list.length === 0) return null;
        return (
          <section
            id={slug(name)}
            key={name}
            className="mx-auto max-w-[1400px] px-5 pt-14 sm:px-8"
          >
            <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--fg-1)]">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 text-[clamp(1.6rem,1.2rem+1.2vw,2.2rem)] font-bold tracking-tight text-[var(--fg-4)]">
                  {name}
                </h2>
                <p className="mt-1 text-[0.94rem] text-[var(--fg-2)]">{blurbs[name]}</p>
              </div>
              <span className="text-[0.86rem] text-[var(--fg-1)]">{list.length} titles</span>
            </header>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {list.map((t) => (
                <TitleCard key={t.slug} title={t} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
