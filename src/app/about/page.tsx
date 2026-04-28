import Link from "next/link";

export const metadata = {
  title: "About",
  description: "What we are, who picks the catalog, and the fine print.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-[820px] px-5 pb-24 pt-16 sm:px-8">
      <p className="t-mono text-[var(--accent)]">About</p>
      <h1 className="tt-h1 mt-3 text-[clamp(2.4rem,1.6rem+3vw,4.2rem)] text-[var(--ink-7)]">
        A small streaming room, run by a small editorial staff.
      </h1>

      <section className="mt-12 space-y-5 text-[1.08rem] leading-relaxed text-[var(--ink-6)]">
        <p>
          hentaiki is a members-only streaming service for adult animation. We
          are not a tube site. We do not show ads, sell data, or run a
          recommendation algorithm. There is no infinite scroll. Six dollars a
          month, six new titles a month, twelve hours of programming on the
          shelf at any time.
        </p>
        <p>
          The catalog is curated by a working editorial staff of three: an
          editor in chief in Tokyo, a programmer in Lisbon, and a contributing
          writer in Mexico City. Every title is watched in full before it is
          added. The shelf is small on purpose. We would rather you find one
          thing tonight than scroll past forty.
        </p>
      </section>

      <section id="editorial" className="mt-16">
        <p className="t-mono text-[var(--ink-4)]">Editorial</p>
        <h2 className="tt-h2 mt-3 text-[clamp(1.6rem,1.2rem+1.4vw,2.2rem)] text-[var(--ink-7)]">
          What we look for.
        </h2>
        <ol className="mt-6 space-y-7">
          {[
            {
              k: "01",
              t: "A point of view.",
              d: "Animation as authored work, not assembly. We index for direction, restraint, and a willingness to hold a frame.",
            },
            {
              k: "02",
              t: "Adult, not adolescent.",
              d: "Adult themes, adult pacing, adult viewers. Eighteen and over, on the shelf and on the screen.",
            },
            {
              k: "03",
              t: "Studios over scenes.",
              d: "We follow studios for years, not single titles. Six rotating studios on the shelf at a time.",
            },
          ].map((p) => (
            <li
              key={p.k}
              className="grid grid-cols-[3rem_1fr] gap-5 border-t border-[var(--ink-3)] pt-5"
            >
              <span className="t-mono text-[var(--ink-4)]">{p.k}</span>
              <div>
                <h3
                  className="text-[1.18rem] text-[var(--ink-7)]"
                  style={{ fontVariationSettings: '"opsz" 24, "wdth" 100, "wght" 580' }}
                >
                  {p.t}
                </h3>
                <p className="mt-2 text-[var(--ink-5)]">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="contact" className="mt-16">
        <p className="t-mono text-[var(--ink-4)]">Contact</p>
        <p className="mt-3 text-[1.08rem] text-[var(--ink-6)]">
          Press, studios, and corrections:{" "}
          <a
            href="mailto:editorial@hentaiki.app"
            className="text-[var(--ink-7)] underline decoration-[var(--accent)] decoration-2 underline-offset-4"
          >
            editorial@hentaiki.app
          </a>
        </p>
      </section>

      <section id="terms" className="mt-16 space-y-4 text-[var(--ink-5)]">
        <p className="t-mono text-[var(--ink-4)]">Fine print</p>
        <p>
          By using hentaiki you confirm that you are at least eighteen years
          old and that adult content is legal where you live. We do not host
          content depicting anyone under eighteen, real or drawn.
        </p>
        <p id="privacy">
          We do not sell or share data with third parties. The only personal
          information we store is the email address used for billing, kept for
          the duration of the subscription.
        </p>
        <p id="takedown">
          For takedown requests covering material you hold rights to, write to{" "}
          <a
            href="mailto:legal@hentaiki.app"
            className="text-[var(--ink-7)] underline decoration-[var(--accent)] decoration-2 underline-offset-4"
          >
            legal@hentaiki.app
          </a>
          . We aim to respond inside three business days.
        </p>
      </section>

      <div className="mt-16 border-t border-[var(--ink-3)] pt-8">
        <Link
          href="/browse"
          className="inline-flex h-11 items-center rounded-full bg-[var(--ink-7)] px-6 text-[0.95rem] font-medium text-[var(--ink-0)]"
        >
          Open the catalog
        </Link>
      </div>
    </article>
  );
}
