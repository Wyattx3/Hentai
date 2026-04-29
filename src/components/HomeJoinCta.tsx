"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";

/** Auth-aware bottom CTA for the home page. Signed-in members see a quieter
 *  "keep going" card; everyone else gets the join pitch. */
export function HomeJoinCta() {
  const { user, ready } = useAuth();

  return (
    <section className="mx-auto mt-20 max-w-[1500px] px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--brand)] via-[oklch(0.62_0.18_30)] to-[oklch(0.42_0.13_330)] p-10 sm:p-14">
        <div className="relative z-10 max-w-xl">
          {ready && user ? (
            <>
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[oklch(0.20_0.02_30)]/85">
                Welcome back, {user.name.split(" ")[0]}
              </p>
              <h2 className="mt-3 text-[clamp(1.8rem,1.3rem+2vw,3rem)] font-extrabold leading-tight tracking-tight text-[oklch(0.20_0.02_30)]">
                Keep your queue moving.
              </h2>
              <p className="mt-3 text-[1rem] text-[oklch(0.20_0.02_30)]/85">
                Pick up an episode where you left off, or dip into something
                new. Free, ad-supported, every device you own.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/my-list"
                  className="rounded-full bg-[oklch(0.18_0.02_30)] px-5 py-3 text-[0.96rem] font-bold text-[var(--fg-4)] transition hover:bg-[oklch(0.12_0.02_30)]"
                >
                  Open my list
                </Link>
                <Link
                  href="/browse"
                  className="rounded-full bg-white/15 px-5 py-3 text-[0.96rem] font-bold text-[oklch(0.20_0.02_30)] transition hover:bg-white/25"
                >
                  Browse the catalog
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[oklch(0.20_0.02_30)]/85">
                Free with ads, forever
              </p>
              <h2 className="mt-3 text-[clamp(1.8rem,1.3rem+2vw,3rem)] font-extrabold leading-tight tracking-tight text-[oklch(0.20_0.02_30)]">
                No card. No subscription. Just press play.
              </h2>
              <p className="mt-3 text-[1rem] text-[oklch(0.20_0.02_30)]/85">
                Create a free account to save titles, sync progress across
                devices, and get notified when new episodes drop.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/signup?next=%2Fbrowse"
                  className="rounded-full bg-[oklch(0.18_0.02_30)] px-5 py-3 text-[0.96rem] font-bold text-[var(--fg-4)] transition hover:bg-[oklch(0.12_0.02_30)]"
                >
                  Create free account
                </Link>
                <Link
                  href="/signin?next=%2Fbrowse"
                  className="rounded-full bg-white/15 px-5 py-3 text-[0.96rem] font-bold text-[oklch(0.20_0.02_30)] transition hover:bg-white/25"
                >
                  I already have one
                </Link>
              </div>
            </>
          )}
        </div>
        <div aria-hidden className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div aria-hidden className="absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-[oklch(0.45_0.20_330)]/40 blur-3xl" />
      </div>
    </section>
  );
}
