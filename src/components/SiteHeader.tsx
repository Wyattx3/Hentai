import Link from "next/link";
import { Wordmark } from "./Wordmark";

const nav = [
  { href: "/browse", label: "Browse" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--ink-3)]/70 bg-[var(--ink-0)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1320px] items-center gap-8 px-5 sm:px-8">
        <Link
          href="/"
          aria-label="hentaiki home"
          className="flex items-center gap-2 text-[var(--ink-7)]"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.92rem] text-[var(--ink-5)]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[var(--ink-7)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/search"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-[var(--ink-3)] px-3 text-[0.85rem] text-[var(--ink-5)] transition-colors hover:border-[var(--ink-4)] hover:text-[var(--ink-7)]"
            aria-label="Search the catalog"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              aria-hidden="true"
              className="opacity-80"
            >
              <circle cx="6" cy="6" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <line x1="9.2" y1="9.2" x2="12.5" y2="12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </Link>
          <Link
            href="/browse"
            className="hidden sm:inline-flex h-9 items-center rounded-full bg-[var(--ink-7)] px-4 text-[0.85rem] font-medium text-[var(--ink-0)] transition-transform hover:-translate-y-px"
          >
            Start watching
          </Link>
        </div>
      </div>
    </header>
  );
}
