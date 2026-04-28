"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";
import { useMyList } from "@/lib/storage";

const nav = [
  { href: "/browse", label: "Browse" },
  { href: "/schedule", label: "Schedule" },
  { href: "/genres", label: "Genres" },
  { href: "/collections", label: "Collections" },
  { href: "/my-list", label: "My List" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { list } = useMyList();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdowns on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // outside click for profile
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    if (profileOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [profileOpen]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--bg-3)]/70 bg-[var(--bg-0)]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-black/65 via-black/30 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-[var(--fg-2)] transition hover:bg-[var(--bg-2)] hover:text-[var(--fg-4)] lg:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            {menuOpen ? (
              <>
                <path d="m6 6 12 12" />
                <path d="m18 6-12 12" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>

        <Link href="/" aria-label="hentaiki home" className="shrink-0">
          <Wordmark size={22} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 text-[0.92rem] font-medium transition ${
                  active
                    ? "text-[var(--fg-4)]"
                    : "text-[var(--fg-2)] hover:text-[var(--fg-4)]"
                }`}
              >
                {item.label}
                {item.label === "My List" && list.length > 0 && (
                  <span className="ml-1.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[var(--brand)] px-1 text-[0.62rem] font-bold text-[oklch(0.2_0.02_30)]">
                    {list.length}
                  </span>
                )}
                {active && (
                  <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-[var(--brand)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search the catalog"
            className="flex h-10 items-center gap-2 rounded-full bg-[var(--bg-2)]/70 px-3.5 text-[0.9rem] text-[var(--fg-2)] transition hover:bg-[var(--bg-3)] hover:text-[var(--fg-4)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </Link>

          <button
            type="button"
            aria-label="Notifications"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-2)]/70 text-[var(--fg-2)] transition hover:bg-[var(--bg-3)] hover:text-[var(--fg-4)] sm:inline-flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span aria-hidden className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--brand)]" />
          </button>

          <Link href="/browse" className="btn-brand hidden text-[0.92rem] sm:inline-flex">
            Watch now
          </Link>

          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              aria-label="Account menu"
              className="flex h-10 items-center gap-2 rounded-full bg-[var(--bg-2)]/70 pl-1 pr-3 transition hover:bg-[var(--bg-3)]"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[oklch(0.55_0.18_15)] text-[0.78rem] font-bold text-[oklch(0.18_0.02_30)]">
                NW
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="hidden text-[var(--fg-2)] sm:block">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {profileOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-[var(--bg-3)] bg-[var(--bg-1)] shadow-2xl shadow-black/50"
              >
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--bg-3)]/70">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[oklch(0.55_0.18_15)] text-[0.85rem] font-bold text-[oklch(0.18_0.02_30)]">
                    NW
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[0.92rem] font-semibold text-[var(--fg-4)]">Nay Waratt</p>
                    <p className="truncate text-[0.78rem] text-[var(--fg-1)]">Premium · 4K + Sub/Dub</p>
                  </div>
                </div>
                <div className="py-1.5">
                  {[
                    { label: "Profile", href: "/about" },
                    { label: "My List", href: "/my-list" },
                    { label: "Settings", href: "/about" },
                    { label: "Help center", href: "/about" },
                  ].map((it) => (
                    <Link
                      key={it.label}
                      href={it.href}
                      role="menuitem"
                      className="flex items-center justify-between px-4 py-2 text-[0.9rem] text-[var(--fg-2)] transition hover:bg-[var(--bg-2)] hover:text-[var(--fg-4)]"
                    >
                      <span>{it.label}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                        <path d="m9 6 6 6-6 6" />
                      </svg>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-[var(--bg-3)]/70 px-4 py-2.5 text-[0.78rem] text-[var(--fg-1)]">
                  Member since 2024 · v1.2
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav
          aria-label="Mobile primary"
          className="border-t border-[var(--bg-3)]/70 bg-[var(--bg-0)]/95 backdrop-blur-xl lg:hidden"
        >
          <div className="mx-auto flex max-w-[1500px] flex-col gap-1 p-3">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-[0.98rem] ${
                    active
                      ? "bg-[var(--bg-2)] text-[var(--fg-4)]"
                      : "text-[var(--fg-2)] hover:bg-[var(--bg-2)]/60 hover:text-[var(--fg-4)]"
                  }`}
                >
                  {item.label}
                  {item.label === "My List" && list.length > 0 && (
                    <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[var(--brand)] px-1.5 text-[0.7rem] font-bold text-[oklch(0.2_0.02_30)]">
                      {list.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
