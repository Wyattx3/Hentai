import Link from "next/link";
import type { Title } from "@/lib/data";
import { Cover } from "./Cover";

export function TitleCard({
  title,
  size = "md",
}: {
  title: Title;
  size?: "sm" | "md" | "lg";
}) {
  const aspect =
    size === "lg"
      ? "aspect-[3/4]"
      : size === "sm"
        ? "aspect-[4/5]"
        : "aspect-[3/4]";

  return (
    <Link
      href={`/watch/${title.slug}`}
      className="group block focus:outline-none"
      aria-label={`${title.name}, ${title.studio}, ${title.year}`}
    >
      <div className={`relative ${aspect} overflow-hidden`}>
        <Cover
          title={title}
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[var(--ink-0)]/85 to-transparent" />
        <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
          <span className="t-mono text-[var(--ink-7)]">{title.rating}</span>
          <span className="t-mono text-[var(--ink-6)]">
            {title.episodes} EP
          </span>
        </div>
        <div className="absolute inset-x-3 bottom-3">
          <p className="t-mono mb-1 text-[var(--ink-5)]">{title.studio}</p>
          <h3
            className="tt-h3 text-[clamp(1rem,0.85rem+0.6vw,1.18rem)] text-[var(--ink-7)]"
            style={{ fontVariationSettings: '"opsz" 24, "wdth" 96, "wght" 600' }}
          >
            {title.name}
          </h3>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[0.82rem] text-[var(--ink-5)]">
        <span>{title.year}</span>
        <span className="t-mono">{title.runtime}</span>
      </div>
    </Link>
  );
}
