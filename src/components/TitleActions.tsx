"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMyList } from "@/lib/storage";
import { useAuth } from "@/lib/auth";

export function TitleActions({ slug }: { slug: string }) {
  const { has, toggle } = useMyList();
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const inList = has(slug);

  function handleListClick() {
    if (!ready) return;
    if (!user) {
      const next = encodeURIComponent(pathname || `/title/${slug}`);
      router.push(`/signup?next=${next}&intent=save`);
      return;
    }
    toggle(slug);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href={`/watch/${slug}`}
        className="btn-brand pulse-brand inline-flex items-center gap-2 text-[0.98rem]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
        Watch episode 1
      </Link>
      <button
        type="button"
        onClick={handleListClick}
        aria-pressed={inList}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.94rem] font-semibold transition ${
          inList
            ? "bg-[var(--brand-soft)] text-[var(--brand)] hover:bg-[oklch(0.72_0.182_52_/_0.28)]"
            : "bg-white/10 text-[var(--fg-3)] hover:bg-white/15"
        }`}
      >
        {inList ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m5 13 4 4L19 7" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        )}
        {!user && ready ? "Sign in to save" : inList ? "In My List" : "Add to My List"}
      </button>
      <button
        type="button"
        aria-label="Share"
        onClick={() => {
          if (typeof window !== "undefined" && navigator.share) {
            void navigator
              .share({ url: `${window.location.origin}/title/${slug}` })
              .catch(() => {});
          } else if (typeof window !== "undefined") {
            void navigator.clipboard
              ?.writeText(`${window.location.origin}/title/${slug}`)
              .catch(() => {});
          }
        }}
        className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-[var(--fg-3)] transition hover:bg-white/15"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
        </svg>
      </button>
    </div>
  );
}
