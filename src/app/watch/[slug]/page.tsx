import { notFound } from "next/navigation";
import { episodesFor, getTitle, titles } from "@/lib/data";
import { WatchClient } from "./WatchClient";

export async function generateStaticParams() {
  return titles.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTitle(slug);
  if (!t) return {};
  return {
    title: `Watch ${t.name}`,
    description: t.synopsis,
  };
}

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ ep?: string }>;
}) {
  const { slug } = await params;
  const sp = (await searchParams) ?? {};
  const title = getTitle(slug);
  if (!title) notFound();

  const episodes = episodesFor(title);
  const epParam = sp.ep ? parseInt(sp.ep, 10) : 1;
  const initialEpisode = Number.isFinite(epParam) && epParam > 0 && epParam <= title.episodes ? epParam : 1;

  const related = titles
    .filter((t) => t.slug !== slug && t.collection === title.collection)
    .slice(0, 6);

  return (
    <WatchClient
      title={title}
      episodes={episodes}
      initialEpisode={initialEpisode}
      related={related}
    />
  );
}
