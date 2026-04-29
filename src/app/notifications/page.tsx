import Link from "next/link";
import Image from "next/image";
import { titles } from "@/lib/data";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Notifications",
  description: "Episode drops, list updates, and account activity.",
};

type Item = {
  kind: "release" | "list" | "system";
  title: string;
  body: string;
  when: string;
  href: string;
  imageId?: number;
  unread?: boolean;
};

function buildFeed(): Item[] {
  const t = titles;
  return [
    {
      kind: "release",
      title: `New episode · ${t[0].name}`,
      body: `Episode 6, "The slow shift", just dropped. ${t[0].studio} brought it home.`,
      when: "2m ago",
      href: `/watch/${t[0].slug}?ep=6`,
      imageId: t[0].imageId,
      unread: true,
    },
    {
      kind: "release",
      title: `Simulcast tonight · ${t[2].name}`,
      body: `Episode 3 lands at 22:00 local. Atelier Kurai sent the master earlier than usual.`,
      when: "1h ago",
      href: `/watch/${t[2].slug}?ep=3`,
      imageId: t[2].imageId,
      unread: true,
    },
    {
      kind: "list",
      title: `${t[3].name} updated its schedule`,
      body: `Now releasing every Friday at 21:00 instead of Saturday. Calendar is updated.`,
      when: "Yesterday",
      href: `/title/${t[3].slug}`,
      imageId: t[3].imageId,
    },
    {
      kind: "system",
      title: "We dropped a new player",
      body: "Quality, speed, audio toggle, skip-intro, next-up — all reachable in two taps.",
      when: "2 days ago",
      href: "/about",
    },
    {
      kind: "release",
      title: `Trailer added · ${t[5].name}`,
      body: "Two-minute teaser. The premiere date will be announced next week.",
      when: "3 days ago",
      href: `/title/${t[5].slug}`,
      imageId: t[5].imageId,
    },
    {
      kind: "list",
      title: "Your list grew by 2 titles",
      body: "Saudade and Kageboshi were added to your list from the Director's Pick row.",
      when: "Last week",
      href: "/my-list",
    },
    {
      kind: "system",
      title: "Ad preferences updated",
      body: "We rolled out a new \u201cBrand-safe only\u201d advertiser tier. Toggle it from Settings \u203a Ads.",
      when: "Apr 14",
      href: "/settings#ads",
    },
  ];
}

const kindLabel: Record<Item["kind"], string> = {
  release: "Release",
  list: "List",
  system: "System",
};

export default function NotificationsPage() {
  const feed = buildFeed();
  const unread = feed.filter((f) => f.unread).length;

  return (
    <main className="mx-auto max-w-[900px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <PageHero
        eyebrow="Inbox"
        title="Notifications"
        description={`${unread} new since you last visited. Tap any item to open it.`}
        rail={
          <Link href="/settings" className="btn-ghost text-[0.9rem]">
            Notification preferences
          </Link>
        }
      />

      <ul className="card divide-y divide-[var(--bg-3)]/70">
        {feed.map((n, i) => (
          <li key={i}>
            <Link
              href={n.href}
              className="group flex items-start gap-4 px-5 py-4 transition hover:bg-[var(--bg-2)]/50"
            >
              {n.imageId ? (
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--bg-2)]">
                  <Image
                    src={`https://picsum.photos/id/${n.imageId}/240/170`}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="grid h-14 w-20 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[var(--brand)] to-[oklch(0.5_0.18_15)] text-[oklch(0.18_0.02_30)]">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                  <span>{kindLabel[n.kind]}</span>
                  <span aria-hidden>·</span>
                  <span>{n.when}</span>
                  {n.unread && (
                    <span className="ml-1 rounded-full bg-[var(--brand)] px-1.5 py-[1px] text-[0.65rem] font-bold text-[oklch(0.18_0.02_30)]">
                      NEW
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[1rem] font-semibold text-[var(--fg-4)]">
                  {n.title}
                </p>
                <p className="mt-0.5 text-[0.92rem] leading-relaxed text-[var(--fg-2)]">
                  {n.body}
                </p>
              </div>

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden
                className="mt-3 shrink-0 text-[var(--fg-1)] transition group-hover:translate-x-0.5 group-hover:text-[var(--fg-4)]"
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-[0.86rem] text-[var(--fg-1)]">
        That&apos;s everything from the last 30 days.
      </p>
      <div className="h-20" />
    </main>
  );
}
