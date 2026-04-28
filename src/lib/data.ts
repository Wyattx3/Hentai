/**
 * Mock catalog. Titles, runtimes, and tags are fictional placeholders for
 * the streaming-platform UI demo. No real licensed content is referenced.
 */

export type Title = {
  slug: string;
  name: string;
  studio: string;
  year: number;
  episodes: number;
  runtime: string; // total runtime label
  rating: "R18+";
  synopsis: string;
  tags: string[];
  collection: string;
  // generative cover params
  hue: number;
  hue2: number;
  lines: string;
  gap: string;
};

const collections = [
  "Late Night",
  "Studio Spotlight",
  "Slow Burn",
  "Underground",
  "New & Notable",
  "Director's Pick",
] as const;

export const titles: Title[] = [
  {
    slug: "shion-after-hours",
    name: "Shion, After Hours",
    studio: "Atelier Kurai",
    year: 2024,
    episodes: 6,
    runtime: "2h 48m",
    rating: "R18+",
    synopsis:
      "A jazz pianist closes the bar each night to a single regular. Six episodes on the slow grammar of attention.",
    tags: ["Drama", "Slow Burn", "Mature"],
    collection: "Slow Burn",
    hue: 22,
    hue2: 320,
    lines: "92deg",
    gap: "13px",
  },
  {
    slug: "ren-no-yoru",
    name: "Ren no Yoru",
    studio: "Hoshigumi",
    year: 2023,
    episodes: 12,
    runtime: "5h 12m",
    rating: "R18+",
    synopsis:
      "Two graduate students share a thesis and a rented apartment. Quiet rooms, longer evenings, the way a city sounds at four.",
    tags: ["Romance", "Drama"],
    collection: "Late Night",
    hue: 12,
    hue2: 280,
    lines: "102deg",
    gap: "11px",
  },
  {
    slug: "saudade",
    name: "Saudade",
    studio: "Studio Velho",
    year: 2024,
    episodes: 4,
    runtime: "1h 56m",
    rating: "R18+",
    synopsis:
      "A translator in Lisbon revisits the apartment she once shared. Four chapters, four rooms, one summer.",
    tags: ["Drama", "Foreign", "Mature"],
    collection: "Director's Pick",
    hue: 32,
    hue2: 200,
    lines: "78deg",
    gap: "16px",
  },
  {
    slug: "kageboshi",
    name: "Kageboshi",
    studio: "Atelier Kurai",
    year: 2022,
    episodes: 8,
    runtime: "3h 22m",
    rating: "R18+",
    synopsis:
      "A noir in eight panels. A private detective who has stopped charging clients. A widow who has stopped sleeping.",
    tags: ["Noir", "Drama", "Suspense"],
    collection: "Studio Spotlight",
    hue: 18,
    hue2: 240,
    lines: "115deg",
    gap: "9px",
  },
  {
    slug: "the-last-train",
    name: "The Last Train",
    studio: "Yatagarasu",
    year: 2025,
    episodes: 1,
    runtime: "1h 38m",
    rating: "R18+",
    synopsis:
      "Two strangers, the 23:48 from Shibuya. A short feature about the courage of small honesties.",
    tags: ["Romance", "Short"],
    collection: "New & Notable",
    hue: 8,
    hue2: 300,
    lines: "88deg",
    gap: "12px",
  },
  {
    slug: "winter-room",
    name: "Winter Room",
    studio: "Yukimura Pictures",
    year: 2023,
    episodes: 6,
    runtime: "2h 30m",
    rating: "R18+",
    synopsis:
      "Snow, kerosene, a phone that rings only on Sundays. A study in waiting, drawn frame by frame.",
    tags: ["Drama", "Slow Burn"],
    collection: "Slow Burn",
    hue: 200,
    hue2: 30,
    lines: "70deg",
    gap: "18px",
  },
  {
    slug: "lacquer",
    name: "Lacquer",
    studio: "Hoshigumi",
    year: 2024,
    episodes: 10,
    runtime: "4h 45m",
    rating: "R18+",
    synopsis:
      "A craftsman teaches an apprentice the difference between repair and restoration. Ten episodes, one cabinet.",
    tags: ["Drama", "Slice of Life"],
    collection: "Director's Pick",
    hue: 28,
    hue2: 340,
    lines: "98deg",
    gap: "14px",
  },
  {
    slug: "kimi-to-amayo",
    name: "Kimi to Amayo",
    studio: "Yatagarasu",
    year: 2024,
    episodes: 8,
    runtime: "3h 04m",
    rating: "R18+",
    synopsis:
      "Eight nights of monsoon. A novelist, an editor, the manuscript that won't end.",
    tags: ["Romance", "Drama"],
    collection: "Late Night",
    hue: 15,
    hue2: 260,
    lines: "108deg",
    gap: "10px",
  },
  {
    slug: "the-fox-house",
    name: "The Fox House",
    studio: "Studio Velho",
    year: 2022,
    episodes: 6,
    runtime: "2h 40m",
    rating: "R18+",
    synopsis:
      "A folk tale rebuilt from old letters. Six episodes on the mathematics of a long absence.",
    tags: ["Folklore", "Drama"],
    collection: "Underground",
    hue: 35,
    hue2: 220,
    lines: "82deg",
    gap: "17px",
  },
  {
    slug: "graphite",
    name: "Graphite",
    studio: "Atelier Kurai",
    year: 2025,
    episodes: 3,
    runtime: "1h 22m",
    rating: "R18+",
    synopsis:
      "A miniseries on architecture school: deadlines, drafting tables, a romance held in margins.",
    tags: ["Drama", "Short"],
    collection: "New & Notable",
    hue: 20,
    hue2: 290,
    lines: "94deg",
    gap: "12px",
  },
  {
    slug: "mahogany-light",
    name: "Mahogany Light",
    studio: "Saudade Films",
    year: 2023,
    episodes: 9,
    runtime: "4h 02m",
    rating: "R18+",
    synopsis:
      "A perfumer's notebook becomes a love story when a customer leaves a forgotten coat.",
    tags: ["Romance", "Drama"],
    collection: "Studio Spotlight",
    hue: 25,
    hue2: 310,
    lines: "86deg",
    gap: "15px",
  },
  {
    slug: "the-quiet-tide",
    name: "The Quiet Tide",
    studio: "Yatagarasu",
    year: 2024,
    episodes: 7,
    runtime: "3h 18m",
    rating: "R18+",
    synopsis:
      "A lighthouse, a radio operator, a year of letters that arrive in the wrong order.",
    tags: ["Drama", "Slow Burn"],
    collection: "Slow Burn",
    hue: 220,
    hue2: 20,
    lines: "112deg",
    gap: "11px",
  },
];

export function getTitle(slug: string): Title | undefined {
  return titles.find((t) => t.slug === slug);
}

export function byCollection(name: string): Title[] {
  return titles.filter((t) => t.collection === name);
}

export const allCollections = collections;

export const allTags = Array.from(
  new Set(titles.flatMap((t) => t.tags))
).sort();
