import Link from "next/link";
import Image from "next/image";
import { allTags, titles } from "@/lib/data";

export const metadata = {
  title: "Genres",
  description: "Browse hentaiki by genre, tone, and pacing.",
};

const genreEmoji: Record<string, string> = {
  Drama: "🌧",
  Romance: "💌",
  Mature: "🌙",
  Noir: "🕶",
  Suspense: "🔪",
  "Slow Burn": "🕰",
  "Slice of Life": "🍵",
  Foreign: "✈",
  Folklore: "🦊",
  Short: "⏱",
};

export default function GenresPage() {
  const cards = allTags.map((tag) => {
    const count = titles.filter((t) => t.tags.includes(tag)).length;
    const featured = titles.find((t) => t.tags.includes(tag));
    return { tag, count, featured };
  });

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
          Browse by mood
        </p>
        <h1 className="mt-2 text-[clamp(2.2rem,1.6rem+2vw,3.2rem)] font-extrabold tracking-tight text-[var(--fg-4)]">
          Genres
        </h1>
        <p className="mt-2 max-w-[60ch] text-[1rem] text-[var(--fg-2)]">
          Pick a tone, a tempo, a temperature. Every genre on hentaiki is
          curated by editors who actually watch the catalog.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map(({ tag, count, featured }) => (
          <Link
            key={tag}
            href={`/genres/${encodeURIComponent(tag.toLowerCase())}`}
            className="group relative aspect-[5/4] overflow-hidden rounded-2xl bg-[var(--bg-1)] hairline"
          >
            {featured && (
              <Image
                src={`https://picsum.photos/id/${featured.imageId}/600/480`}
                alt=""
                fill
                sizes="(min-width:1024px) 22vw, 50vw"
                className="object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                unoptimized
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-0)]/80 via-[var(--bg-0)]/30 to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
              <span aria-hidden className="text-3xl">
                {genreEmoji[tag] ?? "★"}
              </span>
              <div>
                <h2 className="text-[1.4rem] font-extrabold tracking-tight text-[var(--fg-4)]">
                  {tag}
                </h2>
                <p className="mt-0.5 text-[0.86rem] text-[var(--fg-2)]">
                  {count} {count === 1 ? "title" : "titles"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
