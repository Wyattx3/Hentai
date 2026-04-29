"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Title } from "@/lib/data";
import { Cover } from "./Cover";
import { Stars } from "./Stars";
import { useMyList } from "@/lib/storage";
import { useAuth } from "@/lib/auth";

export function TitleCard({
  title,
  size = "md",
  priority = false,
  preview = true,
}: {
  title: Title;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  preview?: boolean;
}) {
  const widthClass =
    size === "lg"
      ? "w-[260px] sm:w-[300px]"
      : size === "sm"
        ? "w-[160px] sm:w-[180px]"
        : "w-[200px] sm:w-[220px]";

  const { has, toggle } = useMyList();
  const { user, ready } = useAuth();
  const router = useRouter();
  const inList = has(title.slug);

  function handleListToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!ready) return;
    if (!user) {
      router.push(`/signup?next=${encodeURIComponent(`/title/${title.slug}`)}&intent=save`);
      return;
    }
    toggle(title.slug);
  }

  return (
    <div className={`group/card relative ${widthClass} shrink-0`}>
      <Link
        href={`/title/${title.slug}`}
        className="block focus:outline-none"
        aria-label={`${title.name}, ${title.studio}, ${title.year}`}
      >
        <div className="lift relative aspect-[2/3] overflow-hidden rounded-xl bg-[var(--bg-1)] hairline">
          <Cover
            title={title}
            width={500}
            height={750}
            priority={priority}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover/card:scale-[1.06]"
          />
          <div className="cover-shade" />

          {/* Badges */}
          <div className="absolute left-2.5 right-2.5 top-2.5 flex flex-wrap items-center gap-1.5">
            {title.isNew && <span className="pill pill-pink">NEW</span>}
            {title.isHot && <span className="pill pill-brand">HOT</span>}
            <span className="pill ml-auto">{title.rating}</span>
          </div>

          {/* Hover-only play scrim */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-5 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand)] text-[var(--bg-0)] shadow-lg shadow-black/40">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="mt-3 px-0.5">
          <h3 className="line-clamp-1 text-[0.98rem] font-semibold text-[var(--fg-3)] transition group-hover/card:text-[var(--brand)]">
            {title.name}
          </h3>
          <div className="mt-1 flex items-center justify-between text-[0.8rem] text-[var(--fg-1)]">
            <span className="flex items-center gap-1.5">
              <Stars score={title.score} />
              <span>{title.score.toFixed(1)}</span>
            </span>
            <span>{title.episodes} ep</span>
          </div>
          <p className="mt-0.5 line-clamp-1 text-[0.78rem] text-[var(--fg-1)]">
            {title.studio} · {title.year}
          </p>
        </div>
      </Link>

      {/* Hover popover — details + actions. Hidden on touch / sm screens. */}
      {preview && (
        <div
          className="pointer-events-none absolute left-0 right-0 top-[calc(100%-12px)] z-30 hidden translate-y-1 scale-[0.98] opacity-0 transition duration-200 group-hover/card:pointer-events-auto group-hover/card:translate-y-0 group-hover/card:scale-100 group-hover/card:opacity-100 lg:block"
        >
          <div className="card hairline overflow-hidden p-3 shadow-2xl shadow-black/60">
            <p className="line-clamp-3 text-[0.82rem] leading-relaxed text-[var(--fg-2)]">
              {title.synopsis}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-[0.7rem]">
              {title.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--bg-2)] px-2 py-0.5 text-[var(--fg-2)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Link
                href={`/watch/${title.slug}`}
                className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-[var(--brand)] text-[0.82rem] font-bold text-[oklch(0.18_0.02_30)] transition hover:bg-[var(--brand-hot)]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </Link>
              <button
                type="button"
                onClick={handleListToggle}
                aria-label={
                  !user && ready
                    ? "Sign in to add to My List"
                    : inList
                      ? "Remove from My List"
                      : "Add to My List"
                }
                aria-pressed={inList}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                  inList
                    ? "bg-[var(--brand-soft)] text-[var(--brand)]"
                    : "bg-[var(--bg-2)] text-[var(--fg-2)] hover:bg-[var(--bg-3)] hover:text-[var(--fg-4)]"
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
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
