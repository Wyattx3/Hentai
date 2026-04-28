"use client";

import { useMemo, useState } from "react";

const sections: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Account & billing",
    items: [
      {
        q: "How do I cancel my subscription?",
        a: "Account → Cancel renewal. You keep full access until the end of the current billing period.",
      },
      {
        q: "What payment methods are supported?",
        a: "Major cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, and PayPal. Region-specific local methods roll out by quarter.",
      },
      {
        q: "Can I change my plan later?",
        a: "Yes. Go to Account → Manage plan. Upgrades take effect immediately; downgrades apply at the next renewal.",
      },
    ],
  },
  {
    title: "Playback & devices",
    items: [
      {
        q: "Why does my video keep buffering?",
        a: "We adapt quality automatically. If issues persist, try Settings → Default quality → 720p, or check your connection at fast.com.",
      },
      {
        q: "How many devices can I use?",
        a: "Premium supports up to four concurrent streams and unlimited registered devices. Standard supports two.",
      },
      {
        q: "Where can I download episodes?",
        a: "Downloads live on iOS, Android, and macOS apps. Use the cloud icon on a title page.",
      },
    ],
  },
  {
    title: "Catalog & releases",
    items: [
      {
        q: "When do simulcasts arrive?",
        a: "Same-day, usually within two hours of the partner studio's broadcast. Check the Schedule page for exact times in your local timezone.",
      },
      {
        q: "Are dubs available for everything?",
        a: "Most releases. The DUB badge appears on titles with English dubs. We're expanding language tracks every quarter.",
      },
      {
        q: "Can I request a title?",
        a: "Yes — write to catalog@hentaiki.app with the studio name, romanized title, and links if available.",
      },
    ],
  },
  {
    title: "Privacy & age",
    items: [
      {
        q: "Why do I see an age gate on first visit?",
        a: "All hentaiki content is rated R18+. We confirm age locally on each device. No PII is collected at the gate.",
      },
      {
        q: "Do you sell my watch history?",
        a: "Never. We don't run third-party trackers and don't share usage data. See the Privacy page for the full list.",
      },
    ],
  },
];

export function HelpClient() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!query) return sections;
    return sections
      .map((s) => ({
        ...s,
        items: s.items.filter(
          (it) =>
            it.q.toLowerCase().includes(query) || it.a.toLowerCase().includes(query),
        ),
      }))
      .filter((s) => s.items.length > 0);
  }, [query]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <label htmlFor="help-q" className="sr-only">
          Search the help center
        </label>
        <div className="flex h-12 items-center gap-2 rounded-full bg-[var(--bg-1)] px-4 hairline focus-within:ring-2 focus-within:ring-[var(--ring)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--fg-1)]" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3-3" />
          </svg>
          <input
            id="help-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Search help…"
            className="flex-1 bg-transparent text-[0.94rem] text-[var(--fg-4)] placeholder:text-[var(--fg-1)] focus:outline-none"
          />
        </div>
        <nav className="mt-6 space-y-1 text-[0.92rem]">
          {sections.map((s) => (
            <a
              key={s.title}
              href={`#${slug(s.title)}`}
              className="block rounded-lg px-3 py-2 text-[var(--fg-2)] transition hover:bg-[var(--bg-2)] hover:text-[var(--fg-4)]"
            >
              {s.title}
            </a>
          ))}
        </nav>
        <div className="card mt-8 p-5">
          <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
            Still stuck?
          </h3>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--fg-2)]">
            Email{" "}
            <a
              href="mailto:hello@hentaiki.app"
              className="text-[var(--brand)] hover:underline"
            >
              hello@hentaiki.app
            </a>
            . We answer within one business day, in English or Burmese.
          </p>
        </div>
      </aside>

      <section className="space-y-10">
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-[var(--bg-3)] p-10 text-center text-[var(--fg-1)]">
            {`No matches for "${q}". Try a shorter query or email us.`}
          </p>
        )}
        {filtered.map((s) => (
          <div key={s.title} id={slug(s.title)} className="scroll-mt-24">
            <h2 className="text-[1.4rem] font-bold tracking-tight text-[var(--fg-4)]">
              {s.title}
            </h2>
            <ul className="mt-4 card divide-y divide-[var(--bg-3)]/70">
              {s.items.map((it, i) => (
                <FaqItem key={i} q={it.q} a={it.a} defaultOpen={query.length > 0} />
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

function FaqItem({
  q,
  a,
  defaultOpen,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[var(--bg-2)]/40"
      >
        <span className="text-[1rem] font-semibold text-[var(--fg-4)]">{q}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          aria-hidden
          className={`shrink-0 text-[var(--fg-1)] transition ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 text-[0.96rem] leading-relaxed text-[var(--fg-2)]">
          {a}
        </div>
      )}
    </li>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
