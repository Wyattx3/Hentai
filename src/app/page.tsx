import Link from "next/link";
import { titles, byCollection, heroSlides, getTitle, topTen } from "@/lib/data";
import { Hero } from "@/components/Hero";
import { Row } from "@/components/Row";
import { ContinueRow } from "@/components/ContinueRow";
import { Top10Row } from "@/components/Top10Row";

const studios = [
  "Atelier Kurai",
  "Hoshigumi",
  "Studio Velho",
  "Yatagarasu",
  "Yukimura Pictures",
  "Saudade Films",
];

export default function HomePage() {
  const slides = heroSlides
    .map((s) => getTitle(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const trending = byCollection("Trending Now");
  const newReleases = byCollection("New Releases");
  const popular = byCollection("Popular This Week");
  const studioSpotlight = byCollection("Studio Spotlight");
  const directorsPick = byCollection("Director's Pick");
  const lateNight = byCollection("Late Night");
  const ranking = topTen();

  return (
    <>
      <Hero slides={slides} />

      {/* Studio strip */}
      <section
        aria-label="Studios in rotation"
        className="overflow-hidden border-y border-[var(--bg-3)]/70 bg-[var(--bg-1)]/40 py-4"
      >
        <div className="marquee flex w-max gap-12 whitespace-nowrap text-[0.86rem] font-semibold uppercase tracking-[0.18em] text-[var(--fg-1)]">
          {[...studios, ...studios, ...studios].map((s, i) => (
            <span key={`${s}-${i}`} className="flex items-center gap-3">
              {s}
              <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-[var(--brand)]" />
            </span>
          ))}
        </div>
      </section>

      <div className="space-y-14 py-10 sm:space-y-16">
        <ContinueRow />

        <Row
          heading="Trending Now"
          subheading="What members are watching tonight"
          titles={[...trending, ...popular].slice(0, 8)}
          href="/browse"
        />

        <Top10Row titles={ranking} />

        <Row
          heading="New Releases"
          subheading="Fresh this week, simulcast same-day"
          titles={newReleases}
          href="/browse"
        />
        <Row
          heading="Popular This Week"
          titles={[...popular, ...trending].slice(0, 8)}
          href="/collections#popular-this-week"
        />
        <Row
          heading="Studio Spotlight"
          subheading="Atelier Kurai, in focus"
          titles={[...studioSpotlight, ...lateNight].slice(0, 8)}
          href="/collections#studio-spotlight"
        />
        <Row
          heading="Director's Pick"
          titles={[...directorsPick, ...lateNight].slice(0, 8)}
          href="/collections#directors-pick"
        />
      </div>

      {/* Genres strip */}
      <section className="mx-auto mt-8 max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-[1.4rem] font-bold tracking-tight text-[var(--fg-4)] sm:text-[1.6rem]">
          Browse by genre
        </h2>
        <p className="mt-1 text-[0.92rem] text-[var(--fg-1)]">
          Twelve tags, twelve moods.
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {Array.from(new Set(titles.flatMap((t) => t.tags))).map((tag) => (
            <Link
              key={tag}
              href={`/genres/${encodeURIComponent(tag.toLowerCase())}`}
              className="rounded-full bg-[var(--bg-1)] px-4 py-2 text-[0.92rem] font-medium text-[var(--fg-3)] hairline transition hover:bg-[var(--bg-2)] hover:text-[var(--brand)]"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-20 max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--brand)] via-[oklch(0.62_0.18_30)] to-[oklch(0.42_0.13_330)] p-10 sm:p-14">
          <div className="relative z-10 max-w-xl">
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[oklch(0.20_0.02_30)]/85">
              Free this month
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,1.3rem+2vw,3rem)] font-extrabold leading-tight tracking-tight text-[oklch(0.20_0.02_30)]">
              Two episodes free. Then six dollars a month, no ads.
            </h2>
            <p className="mt-3 text-[1rem] text-[oklch(0.20_0.02_30)]/85">
              Join hentaiki and unlock every series in HD, on every device. Cancel any month.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/browse"
                className="rounded-full bg-[oklch(0.18_0.02_30)] px-5 py-3 text-[0.96rem] font-bold text-[var(--fg-4)] transition hover:bg-[oklch(0.12_0.02_30)]"
              >
                Start watching
              </Link>
              <Link
                href="/about"
                className="rounded-full bg-white/15 px-5 py-3 text-[0.96rem] font-bold text-[oklch(0.20_0.02_30)] transition hover:bg-white/25"
              >
                What you get
              </Link>
            </div>
          </div>
          <div aria-hidden className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div aria-hidden className="absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-[oklch(0.45_0.20_330)]/40 blur-3xl" />
        </div>
      </section>

      <div className="h-20" />
    </>
  );
}
