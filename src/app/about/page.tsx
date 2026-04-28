import Link from "next/link";

export const metadata = {
  title: "About hentaiki",
  description:
    "What hentaiki is, who it's for, and how the catalog gets built each season.",
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-[1100px] px-5 pt-14 sm:px-8 sm:pt-20">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
          About
        </p>
        <h1 className="mt-3 text-[clamp(2.4rem,1.6rem+3vw,4.4rem)] font-extrabold leading-[1] tracking-tight text-[var(--fg-4)]">
          Adult animation, streamed in HD.
        </h1>
        <p className="mt-5 max-w-[64ch] text-[1.1rem] leading-relaxed text-[var(--fg-2)]">
          hentaiki is a streaming home for adult animation. Sub and dub, full series,
          new episodes every Friday, simulcast titles same-day. Members only, eighteen
          and over.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/browse" className="btn-brand text-[0.98rem]">Start watching</Link>
          <Link href="/collections" className="btn-ghost text-[0.96rem]">See collections</Link>
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-[1100px] grid-cols-1 gap-8 px-5 sm:grid-cols-3 sm:px-8">
        {[
          {
            head: "HD, on every device",
            body: "Stream up to 1080p on phone, tablet, browser, and TV. Resume on any device. Offline downloads on the apps.",
          },
          {
            head: "Simulcast same-day",
            body: "New episodes from partner studios stream the day they air, not weeks later. Subbed first, dubbed within the week.",
          },
          {
            head: "No ads, ever",
            body: "Membership is six dollars a month. The product is the catalog, not your attention. Cancel any month.",
          },
        ].map((c) => (
          <div key={c.head} className="card hairline p-6">
            <h3 className="text-[1.05rem] font-bold text-[var(--fg-4)]">{c.head}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--fg-2)]">
              {c.body}
            </p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-[1100px] px-5 sm:px-8">
        <h2 className="text-[clamp(1.6rem,1.2rem+1.4vw,2.2rem)] font-bold tracking-tight text-[var(--fg-4)]">
          How the catalog gets built.
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <p className="text-[1rem] leading-relaxed text-[var(--fg-2)]">
            Every season a small editorial team watches a few hundred new releases and
            picks roughly forty for the catalog. Studios in rotation: Atelier Kurai,
            Hoshigumi, Studio Velho, Yatagarasu, Yukimura Pictures, Saudade Films.
          </p>
          <p className="text-[1rem] leading-relaxed text-[var(--fg-2)]">
            Titles come and go. Member requests open the first week of each month at
            requests@hentaiki.app. Submission queries from rights holders go to
            licensing@hentaiki.app.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[1100px] px-5 sm:px-8">
        <h2 className="text-[clamp(1.6rem,1.2rem+1.4vw,2.2rem)] font-bold tracking-tight text-[var(--fg-4)]">
          Fine print.
        </h2>
        <ul className="mt-5 space-y-3 text-[0.96rem] leading-relaxed text-[var(--fg-2)]">
          <li>
            Eighteen-and-over only. We use a single age check on first visit and a
            verifier-of-record at signup. No ID copies are stored.
          </li>
          <li>
            We do not sell, rent, or barter watch history. We do not run third-party ad
            scripts. Telemetry is product-only and anonymized.
          </li>
          <li>
            Takedowns and rights questions: legal@hentaiki.app. We answer within five
            business days.
          </li>
        </ul>
      </section>
    </>
  );
}
