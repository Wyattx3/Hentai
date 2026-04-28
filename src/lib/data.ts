/**
 * Mock catalog. Titles, runtimes, and tags are fictional placeholders for
 * the streaming-platform UI demo. No real licensed content is referenced.
 *
 * `imageId` references a deterministic placeholder photo from picsum.photos
 * so each title has a distinct piece of "art" without shipping any real
 * licensed imagery in the prototype.
 */

export type Title = {
  slug: string;
  name: string;
  studio: string;
  director?: string;
  country?: string;
  language?: string;
  year: number;
  episodes: number;
  runtime: string;            // total runtime label
  episodeRuntime?: string;    // per-episode label, optional
  rating: "R18+";
  score: number;              // 0..5 stars
  votes: string;              // formatted ("12.4k")
  synopsis: string;
  tags: string[];
  collection: string;
  imageId: number;            // picsum photo id
  isNew?: boolean;
  isHot?: boolean;
  hasDub?: boolean;
  hasSub?: boolean;
  releaseDay?: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  releaseTime?: string;       // e.g. "21:00"
};

const collections = [
  "Trending Now",
  "New Releases",
  "Popular This Week",
  "Late Night",
  "Studio Spotlight",
  "Director's Pick",
] as const;

export const titles: Title[] = [
  {
    slug: "shion-after-hours",
    name: "Shion, After Hours",
    studio: "Atelier Kurai",
    director: "M. Onogawa",
    country: "Japan",
    language: "Japanese",
    year: 2024,
    episodes: 6,
    runtime: "2h 48m",
    episodeRuntime: "28m",
    rating: "R18+",
    score: 4.8,
    votes: "18.2k",
    synopsis:
      "A jazz pianist closes the bar each night to a single regular. Six episodes on the slow grammar of attention.",
    tags: ["Drama", "Romance", "Mature"],
    collection: "Trending Now",
    imageId: 1062,
    isHot: true,
    hasSub: true,
    hasDub: true,
    releaseDay: "Fri",
    releaseTime: "21:00",
  },
  {
    slug: "ren-no-yoru",
    name: "Ren no Yoru",
    studio: "Hoshigumi",
    director: "K. Tachibana",
    country: "Japan",
    language: "Japanese",
    year: 2023,
    episodes: 12,
    runtime: "5h 12m",
    episodeRuntime: "26m",
    rating: "R18+",
    score: 4.6,
    votes: "24.1k",
    synopsis:
      "Two graduate students share a thesis and a rented apartment. Quiet rooms, longer evenings, the way a city sounds at four.",
    tags: ["Romance", "Drama"],
    collection: "Trending Now",
    imageId: 1025,
    isHot: true,
    hasSub: true,
    releaseDay: "Wed",
    releaseTime: "22:30",
  },
  {
    slug: "saudade",
    name: "Saudade",
    studio: "Studio Velho",
    director: "I. Castanho",
    country: "Portugal",
    language: "Portuguese",
    year: 2024,
    episodes: 4,
    runtime: "1h 56m",
    episodeRuntime: "29m",
    rating: "R18+",
    score: 4.5,
    votes: "9.8k",
    synopsis:
      "A translator in Lisbon revisits the apartment she once shared. Four chapters, four rooms, one summer.",
    tags: ["Drama", "Foreign", "Mature"],
    collection: "New Releases",
    imageId: 1011,
    isNew: true,
    hasSub: true,
    hasDub: true,
    releaseDay: "Sat",
    releaseTime: "20:00",
  },
  {
    slug: "kageboshi",
    name: "Kageboshi",
    studio: "Atelier Kurai",
    director: "T. Hayato",
    country: "Japan",
    language: "Japanese",
    year: 2022,
    episodes: 8,
    runtime: "3h 22m",
    episodeRuntime: "25m",
    rating: "R18+",
    score: 4.7,
    votes: "31.0k",
    synopsis:
      "A noir in eight panels. A private detective who has stopped charging clients. A widow who has stopped sleeping.",
    tags: ["Noir", "Drama", "Suspense"],
    collection: "Studio Spotlight",
    imageId: 1059,
    hasSub: true,
    hasDub: true,
    releaseDay: "Tue",
    releaseTime: "23:00",
  },
  {
    slug: "the-last-train",
    name: "The Last Train",
    studio: "Yatagarasu",
    director: "S. Asaba",
    country: "Japan",
    language: "Japanese",
    year: 2025,
    episodes: 1,
    runtime: "1h 38m",
    episodeRuntime: "98m",
    rating: "R18+",
    score: 4.4,
    votes: "4.2k",
    synopsis:
      "Two strangers, the 23:48 from Shibuya. A short feature about the courage of small honesties.",
    tags: ["Romance", "Short"],
    collection: "New Releases",
    imageId: 1033,
    isNew: true,
    hasSub: true,
    releaseDay: "Sun",
    releaseTime: "21:00",
  },
  {
    slug: "winter-room",
    name: "Winter Room",
    studio: "Yukimura Pictures",
    director: "A. Yukimura",
    country: "Japan",
    language: "Japanese",
    year: 2023,
    episodes: 6,
    runtime: "2h 30m",
    episodeRuntime: "25m",
    rating: "R18+",
    score: 4.3,
    votes: "11.5k",
    synopsis:
      "Snow, kerosene, a phone that rings only on Sundays. A study in waiting, drawn frame by frame.",
    tags: ["Drama", "Slow Burn"],
    collection: "Late Night",
    imageId: 1015,
    hasSub: true,
    releaseDay: "Mon",
    releaseTime: "23:30",
  },
  {
    slug: "lacquer",
    name: "Lacquer",
    studio: "Hoshigumi",
    director: "R. Mineda",
    country: "Japan",
    language: "Japanese",
    year: 2024,
    episodes: 10,
    runtime: "4h 45m",
    episodeRuntime: "28m",
    rating: "R18+",
    score: 4.6,
    votes: "16.8k",
    synopsis:
      "A craftsman teaches an apprentice the difference between repair and restoration. Ten episodes, one cabinet.",
    tags: ["Drama", "Slice of Life"],
    collection: "Director's Pick",
    imageId: 1043,
    hasSub: true,
    hasDub: true,
    releaseDay: "Thu",
    releaseTime: "21:30",
  },
  {
    slug: "kimi-to-amayo",
    name: "Kimi to Amayo",
    studio: "Yatagarasu",
    director: "S. Asaba",
    country: "Japan",
    language: "Japanese",
    year: 2024,
    episodes: 8,
    runtime: "3h 04m",
    episodeRuntime: "23m",
    rating: "R18+",
    score: 4.7,
    votes: "22.6k",
    synopsis:
      "Eight nights of monsoon. A novelist, an editor, the manuscript that won't end.",
    tags: ["Romance", "Drama"],
    collection: "Popular This Week",
    imageId: 1018,
    isHot: true,
    hasSub: true,
    hasDub: true,
    releaseDay: "Fri",
    releaseTime: "22:00",
  },
  {
    slug: "the-fox-house",
    name: "The Fox House",
    studio: "Studio Velho",
    director: "I. Castanho",
    country: "Portugal",
    language: "Portuguese",
    year: 2022,
    episodes: 6,
    runtime: "2h 40m",
    episodeRuntime: "26m",
    rating: "R18+",
    score: 4.4,
    votes: "8.9k",
    synopsis:
      "A folk tale rebuilt from old letters. Six episodes on the mathematics of a long absence.",
    tags: ["Folklore", "Drama"],
    collection: "Late Night",
    imageId: 1039,
    hasSub: true,
    releaseDay: "Sat",
    releaseTime: "23:00",
  },
  {
    slug: "graphite",
    name: "Graphite",
    studio: "Atelier Kurai",
    director: "M. Onogawa",
    country: "Japan",
    language: "Japanese",
    year: 2025,
    episodes: 3,
    runtime: "1h 22m",
    episodeRuntime: "27m",
    rating: "R18+",
    score: 4.5,
    votes: "3.7k",
    synopsis:
      "A miniseries on architecture school: deadlines, drafting tables, a romance held in margins.",
    tags: ["Drama", "Short"],
    collection: "New Releases",
    imageId: 1050,
    isNew: true,
    hasSub: true,
    releaseDay: "Wed",
    releaseTime: "20:30",
  },
  {
    slug: "mahogany-light",
    name: "Mahogany Light",
    studio: "Saudade Films",
    director: "L. Ferreira",
    country: "Brazil",
    language: "Portuguese",
    year: 2023,
    episodes: 9,
    runtime: "4h 02m",
    episodeRuntime: "27m",
    rating: "R18+",
    score: 4.3,
    votes: "12.1k",
    synopsis:
      "A perfumer's notebook becomes a love story when a customer leaves a forgotten coat.",
    tags: ["Romance", "Drama"],
    collection: "Studio Spotlight",
    imageId: 1074,
    hasSub: true,
    hasDub: true,
    releaseDay: "Thu",
    releaseTime: "22:00",
  },
  {
    slug: "the-quiet-tide",
    name: "The Quiet Tide",
    studio: "Yatagarasu",
    director: "K. Tachibana",
    country: "Japan",
    language: "Japanese",
    year: 2024,
    episodes: 7,
    runtime: "3h 18m",
    episodeRuntime: "28m",
    rating: "R18+",
    score: 4.6,
    votes: "14.4k",
    synopsis:
      "A lighthouse, a radio operator, a year of letters that arrive in the wrong order.",
    tags: ["Drama", "Slow Burn"],
    collection: "Popular This Week",
    imageId: 1019,
    isHot: true,
    hasSub: true,
    releaseDay: "Tue",
    releaseTime: "21:30",
  },
];

export type Episode = {
  number: number;
  name: string;
  runtime: string;
  synopsis: string;
};

const episodeFragments = [
  "First evening",
  "Long Sunday",
  "After the rain",
  "A held breath",
  "Letter, unread",
  "The slow shift",
  "Rooms in low light",
  "Final cadence",
  "Threshold",
  "Margins",
  "Coda",
  "An open window",
];

export function episodesFor(t: Title): Episode[] {
  return Array.from({ length: t.episodes }).map((_, i) => ({
    number: i + 1,
    name: episodeFragments[i % episodeFragments.length],
    runtime: t.episodeRuntime ?? "26m",
    synopsis:
      i === 0
        ? t.synopsis
        : `Episode ${i + 1} of ${t.episodes}. The story continues with quiet intent and considered framing.`,
  }));
}

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

export const allStudios = Array.from(new Set(titles.map((t) => t.studio))).sort();
export const allYears = Array.from(new Set(titles.map((t) => t.year))).sort((a, b) => b - a);

export const heroSlides = [
  "shion-after-hours",
  "kimi-to-amayo",
  "kageboshi",
  "the-quiet-tide",
];

/** Top 10 ranking by score, then votes (parsed from "18.2k"). */
export function topTen(): Title[] {
  const v = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
  return [...titles]
    .sort((a, b) => b.score - a.score || v(b.votes) - v(a.votes))
    .slice(0, 10);
}

/** Group titles by their release weekday. Slugs sorted by release time. */
export function scheduleByDay(): Record<string, Title[]> {
  const days: Array<NonNullable<Title["releaseDay"]>> = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];
  const out: Record<string, Title[]> = Object.fromEntries(days.map((d) => [d, []]));
  for (const t of titles) {
    if (!t.releaseDay) continue;
    out[t.releaseDay].push(t);
  }
  for (const d of days) {
    out[d].sort((a, b) => (a.releaseTime ?? "").localeCompare(b.releaseTime ?? ""));
  }
  return out;
}
