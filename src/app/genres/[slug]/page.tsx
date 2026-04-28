import Link from "next/link";
import { notFound } from "next/navigation";
import { allTags, titles } from "@/lib/data";
import { TitleCard } from "@/components/TitleCard";

export function generateStaticParams() {
  return allTags.map((tag) => ({ slug: tag.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = allTags.find((t) => t.toLowerCase() === decodeURIComponent(slug));
  if (!tag) return {};
  return {
    title: `${tag} on hentaiki`,
    description: `Titles tagged ${tag}.`,
  };
}

export default async function GenrePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = allTags.find(
    (t) => t.toLowerCase() === decodeURIComponent(slug),
  );
  if (!tag) notFound();
  const list = titles.filter((t) => t.tags.includes(tag));

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-3 flex items-center gap-2 text-[0.86rem] text-[var(--fg-1)]">
        <Link href="/genres" className="hover:text-[var(--brand)]">
          Genres
        </Link>
        <span>/</span>
        <span className="text-[var(--fg-3)]">{tag}</span>
      </nav>
      <header className="mb-10">
        <h1 className="text-[clamp(2.4rem,1.8rem+2vw,3.6rem)] font-extrabold tracking-tight text-[var(--fg-4)]">
          {tag}
        </h1>
        <p className="mt-2 text-[1rem] text-[var(--fg-2)]">
          {list.length} {list.length === 1 ? "title" : "titles"} matching{" "}
          <span className="text-[var(--brand)]">{tag}</span>.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
        {list.map((t) => (
          <TitleCard key={t.slug} title={t} />
        ))}
      </div>
    </main>
  );
}
