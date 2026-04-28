/**
 * hentaiki wordmark.
 * Bricolage Grotesque, condensed width, with a kerned-tight stop and a
 * single accent dot. Single solid color (no gradient text).
 */
export function Wordmark({ size = 18 }: { size?: number }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontVariationSettings: '"opsz" 32, "wdth" 88, "wght" 620',
        letterSpacing: "-0.025em",
        fontSize: size,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "baseline",
        gap: "0.06em",
        color: "var(--ink-7)",
      }}
    >
      hentaiki
      <span
        aria-hidden="true"
        style={{
          width: "0.32em",
          height: "0.32em",
          borderRadius: "999px",
          background: "var(--accent)",
          alignSelf: "center",
          marginLeft: "0.08em",
        }}
      />
    </span>
  );
}
