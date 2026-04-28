import Link from "next/link";
import { Wordmark } from "./Wordmark";

const cols: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Watch",
    links: [
      { href: "/browse", label: "Browse" },
      { href: "/collections", label: "Collections" },
      { href: "/search", label: "Search" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/about#editorial", label: "Editorial" },
      { href: "/about#contact", label: "Contact" },
    ],
  },
  {
    title: "Fine print",
    links: [
      { href: "/about#terms", label: "Terms" },
      { href: "/about#privacy", label: "Privacy" },
      { href: "/about#takedown", label: "Takedown" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--ink-3)] bg-[var(--ink-0)]">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Wordmark size={20} />
          <p className="max-w-[36ch] text-[0.95rem] text-[var(--ink-5)]">
            A small streaming room for adult animation, curated like a film
            series. Members only, eighteen and over.
          </p>
          <p className="t-mono text-[var(--ink-4)]">
            Established 2025 · Tokyo · Lisbon · Mexico City
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="t-mono text-[var(--ink-4)]">{c.title}</p>
            <ul className="mt-3 space-y-2 text-[0.95rem] text-[var(--ink-6)]">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[var(--ink-7)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--ink-3)]/60">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-5 py-5 text-[0.8rem] text-[var(--ink-4)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2025 hentaiki. Members only. 18+.</p>
          <p className="t-mono">Built quietly. No ads, ever.</p>
        </div>
      </div>
    </footer>
  );
}
