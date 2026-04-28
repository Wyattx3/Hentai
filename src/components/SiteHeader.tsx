import Link from "next/link";
import { Wordmark } from "./Wordmark";

const nav = [
  { href: "/browse", label: "Browse" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--bg-3)]/70 bg-[var(--bg-0)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-8 px-5 sm:px-8">
        <Link href="/" aria-label="hentaiki home" className="shrink-0">
          <Wordmark size={22} />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-[0.92rem] font-medium text-[var(--fg-2)] transition hover:bg-[var(--bg-2)] hover:text-[var(--fg-4)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search the catalog"
            className="flex h-10 items-center gap-2 rounded-full bg-[var(--bg-2)] px-3.5 text-[0.9rem] text-[var(--fg-2)] transition hover:bg-[var(--bg-3)] hover:text-[var(--fg-4)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </Link>
          <Link href="/browse" className="btn-brand text-[0.92rem]">
            Watch now
          </Link>
        </div>
      </div>
    </header>
  );
}
