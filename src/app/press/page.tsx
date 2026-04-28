import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Press",
  description: "Brand assets, the official line, and a way to reach our PR team.",
};

const facts = [
  { k: "Founded", v: "2024 · Yangon" },
  { k: "Members", v: "120,000+ paid · 32 countries" },
  { k: "Catalog", v: "1,400+ titles · 9,200+ episodes" },
  { k: "Studios", v: "42 partner studios across JP, TW, KR, BR" },
  { k: "Languages", v: "Sub: 14 · Dub: 6" },
  { k: "Plans", v: "Standard ($4) · Premium ($6) · Premium 4K ($9)" },
];

const quotes = [
  {
    by: "Yui Tanaka, Studio Atelier Kurai",
    text: "hentaiki gave us editorial framing, not just a CDN. Our titles look like art again.",
  },
  {
    by: "Bruno Reis, Studio Velho",
    text: "Same-day simulcast that actually arrives same-day. The first platform we don't email about.",
  },
];

export default function PressPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <PageHero
        eyebrow="Press"
        title="hentaiki press kit"
        description="Brand assets, fast facts, and a single inbox for journalists and partners."
        rail={
          <Link
            href="mailto:press@hentaiki.app"
            className="btn-brand text-[0.92rem]"
          >
            press@hentaiki.app
          </Link>
        }
      />

      <section className="card p-6 sm:p-8">
        <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
          The official line
        </h2>
        <p className="mt-3 text-[1.04rem] leading-relaxed text-[var(--fg-3)]">
          hentaiki is a curated streaming service for adult animation. We
          partner with studios to publish licensed work in HD and 4K, with
          editorial framing in English, Burmese, and Japanese. The service
          launched in 2024 and is privately held.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-[1.2rem] font-bold tracking-tight text-[var(--fg-4)]">
          Fast facts
        </h2>
        <dl className="mt-5 card grid grid-cols-1 divide-y divide-[var(--bg-3)]/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {facts.map((f, i) => (
            <div
              key={f.k}
              className={`px-5 py-4 ${i >= 2 ? "sm:border-t sm:border-[var(--bg-3)]/70" : ""}`}
            >
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                {f.k}
              </dt>
              <dd className="mt-1 text-[1rem] font-semibold text-[var(--fg-4)]">
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="text-[1.2rem] font-bold tracking-tight text-[var(--fg-4)]">
          Brand assets
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Wordmark · SVG", file: "hentaiki-wordmark.svg" },
            { label: "Mark only · SVG", file: "hentaiki-mark.svg" },
            { label: "Hero stills · ZIP", file: "hentaiki-stills.zip" },
          ].map((a) => (
            <li key={a.file}>
              <button
                type="button"
                className="card flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-[var(--bg-2)]/40"
              >
                <span className="font-semibold text-[var(--fg-4)]">{a.label}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="text-[var(--fg-1)]"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[0.84rem] text-[var(--fg-1)]">
          Email press@hentaiki.app for the master file or higher-res variants.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-[1.2rem] font-bold tracking-tight text-[var(--fg-4)]">
          From our partners
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {quotes.map((q) => (
            <figure key={q.by} className="card p-6">
              <blockquote className="text-[1.04rem] leading-relaxed text-[var(--fg-3)]">
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[0.86rem] font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
                {q.by}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="h-20" />
    </main>
  );
}
