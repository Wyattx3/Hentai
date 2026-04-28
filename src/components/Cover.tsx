import type { Title } from "@/lib/data";

/**
 * Generative cover art. No real imagery — each title gets a deterministic
 * gradient + line pattern derived from its hue tokens. Keeps the catalog
 * visually distinct without leaning on stock or AI imagery.
 */
export function Cover({
  title,
  className,
  style,
}: {
  title: Title;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`cover ${className ?? ""}`}
      style={
        {
          "--c1": `oklch(0.45 0.18 ${title.hue})`,
          "--c2": `oklch(0.30 0.14 ${title.hue2})`,
          "--cx": `${(title.hue % 60) + 10}%`,
          "--cy": `${(title.hue2 % 50) + 20}%`,
          "--cx2": `${(title.hue * 2) % 90}%`,
          "--cy2": `${(title.hue2 * 1.4) % 80}%`,
          "--lines": title.lines,
          "--gap": title.gap,
          ...style,
        } as React.CSSProperties
      }
      role="img"
      aria-label={`${title.name} cover art`}
    />
  );
}
