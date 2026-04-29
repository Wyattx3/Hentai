"use client";

import Link from "next/link";
import { useMyList } from "@/lib/storage";
import { useAuth } from "@/lib/auth";
import { titles } from "@/lib/data";
import { TitleCard } from "@/components/TitleCard";

export default function MyListPage() {
  const { list, ready: listReady } = useMyList();
  const { user, ready: authReady } = useAuth();
  const ready = listReady && authReady;
  const items = list
    .map((slug) => titles.find((t) => t.slug === slug))
    .filter(Boolean) as typeof titles;

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            Saved for later
          </p>
          <h1 className="mt-2 text-[clamp(2.2rem,1.6rem+2vw,3.2rem)] font-extrabold tracking-tight text-[var(--fg-4)]">
            My List
          </h1>
          <p className="mt-2 text-[1rem] text-[var(--fg-2)]">
            {!ready
              ? "Loading your list…"
              : !user
                ? "Sign in to save titles and sync them across devices."
                : items.length === 0
                  ? "Empty for now. Tap the + on any card to start a list."
                  : `${items.length} ${items.length === 1 ? "title" : "titles"} ready to watch.`}
          </p>
        </div>
        <Link href="/browse" className="btn-ghost text-[0.92rem]">
          Find more →
        </Link>
      </header>

      {ready && !user ? (
        <div className="card hairline grid place-items-center px-6 py-20 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <path d="M17 21v-8H7v8" />
            </svg>
          </div>
          <h2 className="mt-4 text-[1.4rem] font-extrabold tracking-tight text-[var(--fg-4)]">
            Save titles to your list
          </h2>
          <p className="mt-2 max-w-[44ch] text-[0.94rem] text-[var(--fg-2)]">
            Free with ads, no card required. Create an account to bookmark
            titles, sync progress, and pick up where you left off on any device.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/signup?next=%2Fmy-list&intent=save"
              className="btn-brand text-[0.94rem]"
            >
              Create free account
            </Link>
            <Link
              href="/signin?next=%2Fmy-list&intent=save"
              className="btn-ghost text-[0.94rem]"
            >
              I already have one
            </Link>
          </div>
        </div>
      ) : items.length === 0 && ready ? (
        <div className="card hairline grid place-items-center px-6 py-20 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <path d="M17 21v-8H7v8" />
            </svg>
          </div>
          <h2 className="mt-4 text-[1.4rem] font-extrabold tracking-tight text-[var(--fg-4)]">
            Your list is empty
          </h2>
          <p className="mt-2 max-w-[40ch] text-[0.94rem] text-[var(--fg-2)]">
            Browse the catalog and tap the + on any title card to keep it
            here for later.
          </p>
          <Link href="/browse" className="btn-brand mt-5 text-[0.94rem]">
            Browse the catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((t) => (
            <TitleCard key={t.slug} title={t} />
          ))}
        </div>
      )}
    </main>
  );
}
