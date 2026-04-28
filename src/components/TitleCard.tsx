import Link from "next/link";
import type { Title } from "@/lib/data";
import { Cover } from "./Cover";
import { Stars } from "./Stars";

export function TitleCard({
  title,
  size = "md",
  priority = false,
}: {
  title: Title;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}) {
  const widthClass =
    size === "lg"
      ? "w-[260px] sm:w-[300px]"
      : size === "sm"
        ? "w-[160px] sm:w-[180px]"
        : "w-[200px] sm:w-[220px]";

  return (
    <Link
      href={`/watch/${title.slug}`}
      className={`group block ${widthClass} shrink-0 focus:outline-none`}
      aria-label={`${title.name}, ${title.studio}, ${title.year}`}
    >
      <div className="lift relative aspect-[2/3] overflow-hidden rounded-xl bg-[var(--bg-1)] hairline">
        <Cover
          title={title}
          width={500}
          height={750}
          priority={priority}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
        />
        <div className="cover-shade" />

        {/* Badges */}
        <div className="absolute left-2.5 right-2.5 top-2.5 flex flex-wrap items-center gap-1.5">
          {title.isNew && <span className="pill pill-pink">NEW</span>}
          {title.isHot && <span className="pill pill-brand">HOT</span>}
          <span className="pill ml-auto">{title.rating}</span>
        </div>

        {/* Hover-only play scrim */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand)] text-[var(--bg-0)] shadow-lg shadow-black/40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>

      <div className="mt-3 px-0.5">
        <h3 className="line-clamp-1 text-[0.98rem] font-semibold text-[var(--fg-3)] transition group-hover:text-[var(--brand)]">
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
  );
}
