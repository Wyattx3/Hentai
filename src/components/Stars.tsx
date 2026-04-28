export function Stars({
  score,
  size = 12,
}: {
  score: number;
  size?: number;
}) {
  const pct = Math.max(0, Math.min(100, (score / 5) * 100));
  return (
    <span
      aria-label={`${score.toFixed(1)} out of 5`}
      className="relative inline-block"
      style={{ width: size * 5, height: size, lineHeight: 0 }}
    >
      <span
        aria-hidden
        className="absolute inset-0 text-[var(--bg-3)]"
        style={{ fontSize: size, letterSpacing: "0px" }}
      >
        ★★★★★
      </span>
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 overflow-hidden text-[var(--brand)]"
        style={{ width: `${pct}%`, fontSize: size, letterSpacing: "0px" }}
      >
        ★★★★★
      </span>
    </span>
  );
}
