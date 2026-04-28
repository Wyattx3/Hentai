import { allCollections, byCollection } from "@/lib/data";
import { TitleCard } from "@/components/TitleCard";

export const metadata = {
  title: "Collections",
  description: "Six rooms, one season at a time.",
};

const blurbs: Record<string, string> = {
  "Late Night": "Things to put on after the dishes are done.",
  "Studio Spotlight": "A working room of the studios we keep coming back to.",
  "Slow Burn": "Long evenings, the camera holding its breath.",
  "Underground": "Smaller releases, weirder shapes, the corners.",
  "New & Notable": "Added in the last thirty days.",
  "Director's Pick": "A short shelf curated by our editor in chief.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
      <section className="border-b border-[var(--ink-3)] py-14">
        <p className="t-mono text-[var(--ink-4)]">Collections</p>
        <h1 className="tt-h1 mt-3 text-[clamp(2.4rem,1.6rem+3vw,4.2rem)] text-[var(--ink-7)]">
          Six rooms, one season at a time.
        </h1>
        <p className="mt-4 max-w-[58ch] text-[1.05rem] text-[var(--ink-5)]">
          {"The catalog is organised the way we'd organise a film series at a small theatre: a few rooms, refreshed once a month."}
        </p>
      </section>

      {allCollections.map((c, i) => {
        const items = byCollection(c);
        const id = c.toLowerCase().replace(/\s+/g, "-");
        return (
          <section
            key={c}
            id={id}
            className={[
              "py-16",
              i !== allCollections.length - 1 ? "border-b border-[var(--ink-3)]" : "",
            ].join(" ")}
          >
            <header className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="t-mono text-[var(--accent)]">
                  Collection {String(i + 1).padStart(2, "0")}
                </p>
                <h2
                  className="mt-2 text-[clamp(1.8rem,1.3rem+1.8vw,2.8rem)] text-[var(--ink-7)]"
                  style={{ fontVariationSettings: '"opsz" 48, "wdth" 96, "wght" 580', letterSpacing: "-0.022em" }}
                >
                  {c}
                </h2>
                <p className="mt-3 max-w-[52ch] text-[1rem] text-[var(--ink-5)]">
                  {blurbs[c]}
                </p>
              </div>
              <span className="t-mono hidden text-[var(--ink-4)] sm:inline">
                {items.length} titles
              </span>
            </header>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {items.map((t) => (
                <TitleCard key={t.slug} title={t} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
