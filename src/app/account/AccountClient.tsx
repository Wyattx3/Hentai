"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { useAuth, monogram } from "@/lib/auth";

const devices = [
  { name: "MacBook Pro 14\"", os: "macOS 15", lastSeen: "Active now", current: true },
  { name: "iPhone 16", os: "iOS 18.3", lastSeen: "2 hours ago", current: false },
  { name: "Apple TV", os: "tvOS 18", lastSeen: "Yesterday", current: false },
  { name: "iPad Air", os: "iPadOS 18", lastSeen: "3 days ago", current: false },
];

const adActivity = [
  { window: "This week", views: 14, advertisers: 6, skipped: 9 },
  { window: "This month", views: 62, advertisers: 21, skipped: 38 },
  { window: "All-time", views: 412, advertisers: 84, skipped: 268 },
];

function fmtJoined(ts: number): string {
  const d = new Date(ts);
  const month = d.toLocaleString("en", { month: "short" });
  return `${month} ${d.getFullYear()}`;
}

export function AccountClient() {
  const { user, ready, signOut } = useAuth();

  if (!ready) {
    return (
      <main className="mx-auto max-w-[1100px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="card hairline h-72 animate-pulse" aria-hidden />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-[1100px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <PageHero
          eyebrow="Account"
          title="Sign in to manage your account"
          description="Free with ads, no card required. Sign in to see your devices, ad preferences, and watch stats."
        />
        <div className="card hairline grid place-items-center px-6 py-20 text-center">
          <h2 className="text-[1.4rem] font-extrabold tracking-tight text-[var(--fg-4)]">
            You&apos;re not signed in
          </h2>
          <p className="mt-2 max-w-md text-[0.94rem] text-[var(--fg-2)]">
            Create a free account or sign in to see your profile, devices, and
            ad activity.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/signup?next=%2Faccount"
              className="btn-brand text-[0.94rem]"
            >
              Create free account
            </Link>
            <Link href="/signin?next=%2Faccount" className="btn-ghost text-[0.94rem]">
              Sign in
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const initials = monogram(user.name);
  const joined = fmtJoined(user.joinedAt);

  return (
    <main className="mx-auto max-w-[1100px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <PageHero
        eyebrow="Account"
        title={user.name}
        description={`Member since ${joined} · Free · Ad-supported`}
        rail={
          <Link href="/settings" className="btn-ghost text-[0.92rem]">
            Edit preferences
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card lg:col-span-2 p-6">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[var(--brand)] to-[oklch(0.55_0.18_15)] text-[1.1rem] font-extrabold text-[oklch(0.18_0.02_30)]">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[1.2rem] font-bold text-[var(--fg-4)]">
                {user.name}
              </p>
              <p className="truncate text-[0.92rem] text-[var(--fg-1)]">
                {user.email}
              </p>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-[0.92rem] sm:grid-cols-3">
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                Plan
              </dt>
              <dd className="mt-1 font-semibold text-[var(--fg-4)]">Free · Ad-supported</dd>
            </div>
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                Cost
              </dt>
              <dd className="mt-1 text-[var(--fg-3)]">$0 · forever</dd>
            </div>
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                Audio
              </dt>
              <dd className="mt-1 text-[var(--fg-3)]">Sub + Dub</dd>
            </div>
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                Quality
              </dt>
              <dd className="mt-1 text-[var(--fg-3)]">Up to 1080p</dd>
            </div>
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                Member since
              </dt>
              <dd className="mt-1 text-[var(--fg-3)]">{joined}</dd>
            </div>
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                Status
              </dt>
              <dd className="mt-1 text-[var(--fg-3)]">
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  Verified
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <Link
              href="/settings"
              className="btn-brand text-[0.92rem]"
            >
              Manage preferences
            </Link>
            <Link
              href="/settings#ads"
              className="btn-ghost text-[0.92rem]"
            >
              Ad preferences
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-full bg-white/5 px-4 py-2.5 text-[0.92rem] font-semibold text-[var(--fg-2)] transition hover:bg-white/10 hover:text-[var(--fg-4)]"
            >
              Sign out
            </button>
          </div>
        </section>

        <aside className="card hairline p-6">
          <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--fg-1)]">
            Watch stats
          </h2>
          <dl className="mt-4 space-y-4 text-[0.94rem]">
            <Stat label="Episodes watched" value="128" />
            <Stat label="Hours streamed" value="62.4" />
            <Stat label="In My List" value="14" />
            <Stat label="Top studio" value="Atelier Kurai" />
            <Stat label="Top genre" value="Drama" />
          </dl>
        </aside>
      </div>

      <section className="card mt-6 p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-[1.1rem] font-bold tracking-tight text-[var(--fg-4)]">
              Ad activity
            </h2>
            <p className="mt-1 text-[0.86rem] text-[var(--fg-1)]">
              Free, ad-supported playback. We never share your watch history with advertisers.
            </p>
          </div>
          <Link href="/settings#ads" className="btn-ghost text-[0.86rem]">
            Manage ad preferences →
          </Link>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {adActivity.map((row) => (
            <div key={row.window} className="rounded-2xl bg-[var(--bg-2)] p-4 hairline">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
                {row.window}
              </p>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-[1.6rem] font-extrabold text-[var(--fg-4)] tabular-nums">
                  {row.views}
                </span>
                <span className="text-[0.82rem] text-[var(--fg-1)]">ads viewed</span>
              </div>
              <p className="mt-1 text-[0.82rem] text-[var(--fg-2)]">
                {row.advertisers} advertisers · {row.skipped} skipped
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="card mt-6 p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-[1.1rem] font-bold tracking-tight text-[var(--fg-4)]">
              Devices signed in
            </h2>
            <p className="mt-1 text-[0.86rem] text-[var(--fg-1)]">
              You can sign in on as many devices as you like.
            </p>
          </div>
          <button
            type="button"
            className="btn-ghost text-[0.86rem]"
          >
            Sign out everywhere
          </button>
        </div>
        <ul className="mt-5 divide-y divide-[var(--bg-3)]/70">
          {devices.map((d) => (
            <li
              key={d.name}
              className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="truncate text-[0.96rem] font-semibold text-[var(--fg-4)]">
                  {d.name}
                  {d.current && (
                    <span className="ml-2 inline-flex h-5 items-center rounded-full bg-[var(--brand-soft)] px-2 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[var(--brand)]">
                      This device
                    </span>
                  )}
                </p>
                <p className="text-[0.82rem] text-[var(--fg-1)]">
                  {d.os} · {d.lastSeen}
                </p>
              </div>
              {!d.current && (
                <button
                  type="button"
                  className="rounded-full bg-white/5 px-3.5 py-2 text-[0.82rem] font-semibold text-[var(--fg-2)] transition hover:bg-white/10 hover:text-[var(--fg-4)]"
                >
                  Sign out
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-[var(--fg-1)]">{label}</dt>
      <dd className="font-semibold text-[var(--fg-4)] tabular-nums">{value}</dd>
    </div>
  );
}
