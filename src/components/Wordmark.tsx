export function Wordmark({ size = 22 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-baseline gap-[3px]"
      style={{ fontSize: size, fontWeight: 800, letterSpacing: "-0.02em" }}
    >
      <span className="text-[var(--fg-4)]">hentai</span>
      <span className="text-[var(--brand)]">ki</span>
      <span
        aria-hidden
        className="ml-[1px] inline-block rounded-full bg-[var(--brand)]"
        style={{ height: size * 0.18, width: size * 0.18 }}
      />
    </span>
  );
}
