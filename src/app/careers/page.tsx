import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Careers",
  description: "Help us build a calmer place to watch.",
};

const roles = [
  {
    title: "Senior product designer",
    team: "Design",
    location: "Remote · APAC ±2h",
    type: "Full-time",
    summary:
      "Own the player and watch flow end-to-end. Strong systems thinking, taste for restraint.",
  },
  {
    title: "Catalog editor (Japanese ↔ English)",
    team: "Editorial",
    location: "Tokyo or Remote",
    type: "Full-time",
    summary:
      "Curate releases, write the editorial copy that sets us apart. Native JP, fluent EN.",
  },
  {
    title: "Streaming infrastructure engineer",
    team: "Platform",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "HLS, low-latency origin, regional caching. You ship calm, observable systems.",
  },
  {
    title: "iOS engineer",
    team: "Apps",
    location: "Remote · APAC",
    type: "Full-time",
    summary:
      "Swift, AVFoundation, downloads. You write code that opens a window in 200ms.",
  },
  {
    title: "Member support · Burmese",
    team: "Support",
    location: "Yangon, MM",
    type: "Part-time",
    summary:
      "First reply within 24h. Replies that read like a friend wrote them, not a bot.",
  },
];

const values = [
  {
    title: "Restraint",
    body: "Less is more. Defaults that age well. We say no a lot.",
  },
  {
    title: "Craft",
    body: "Pixels, lines of code, and replies to support — all held to the same standard.",
  },
  {
    title: "Members first",
    body: "We answer email. We don't run dark patterns. We refund without making it weird.",
  },
  {
    title: "Async by default",
    body: "Two meetings a week, max. Long-form writing over standups.",
  },
];

export default function CareersPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <PageHero
        eyebrow="Working at hentaiki"
        title="Help us build a calmer place to watch."
        description="Small team, distributed across Yangon, Tokyo, Lisbon, and Singapore. Quiet defaults, sharp work."
      />

      <section className="grid gap-4 md:grid-cols-2">
        {values.map((v) => (
          <div key={v.title} className="card p-6">
            <h3 className="text-[1.1rem] font-bold tracking-tight text-[var(--fg-4)]">
              {v.title}
            </h3>
            <p className="mt-2 text-[0.96rem] leading-relaxed text-[var(--fg-2)]">
              {v.body}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-[1.4rem] font-bold tracking-tight text-[var(--fg-4)] sm:text-[1.6rem]">
          Open roles · {roles.length}
        </h2>
        <p className="mt-1 text-[0.96rem] text-[var(--fg-1)]">
          We hire slowly and stay small. We value taste over titles.
        </p>
        <ul className="mt-6 card divide-y divide-[var(--bg-3)]/70">
          {roles.map((r) => (
            <li key={r.title}>
              <Link
                href={`mailto:jobs@hentaiki.app?subject=${encodeURIComponent("Application · " + r.title)}`}
                className="group flex flex-wrap items-center justify-between gap-4 px-5 py-5 transition hover:bg-[var(--bg-2)]/50 sm:px-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[1.05rem] font-bold tracking-tight text-[var(--fg-4)]">
                    {r.title}
                  </p>
                  <p className="mt-1 text-[0.9rem] text-[var(--fg-2)]">{r.summary}</p>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.78rem] uppercase tracking-[0.14em] text-[var(--fg-1)]">
                    <span>{r.team}</span>
                    <span>·</span>
                    <span>{r.location}</span>
                    <span>·</span>
                    <span>{r.type}</span>
                  </p>
                </div>
                <span className="rounded-full bg-[var(--bg-2)] px-4 py-2 text-[0.86rem] font-semibold text-[var(--fg-3)] transition group-hover:bg-[var(--brand)] group-hover:text-[oklch(0.18_0.02_30)]">
                  Apply →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 rounded-3xl bg-gradient-to-br from-[var(--bg-1)] to-[var(--bg-0)] p-8 text-center hairline">
        <h2 className="text-[1.4rem] font-bold tracking-tight text-[var(--fg-4)]">
          Don&apos;t see your role?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-[0.96rem] text-[var(--fg-2)]">
          Write to{" "}
          <a
            className="text-[var(--brand)] hover:underline"
            href="mailto:jobs@hentaiki.app"
          >
            jobs@hentaiki.app
          </a>{" "}
          with a one-page note about what you&apos;d build here. We read every
          one.
        </p>
      </section>

      <div className="h-20" />
    </main>
  );
}
