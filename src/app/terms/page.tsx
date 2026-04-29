import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Terms",
  description: "The rules of the road, written like a human wrote them.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-[820px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <PageHero
        eyebrow="Agreement"
        title="Terms of service"
        description="The rules that govern your account. We tried to make this readable."
      />

      <article className="prose-content space-y-10 text-[1rem] leading-relaxed text-[var(--fg-3)]">
        <Clause num="01" title="Eligibility">
          You must be at least 18 years old (or the legal age of majority in
          your region, whichever is greater) to register for hentaiki. By
          confirming the age gate you affirm that this is true.
        </Clause>

        <Clause num="02" title="Your account">
          One account per person. You&apos;re responsible for keeping the
          password safe and for everything that happens under it. If you suspect
          unauthorized access, reset the password immediately and email{" "}
          <a className="text-[var(--brand)] hover:underline" href="mailto:security@hentaiki.app">
            security@hentaiki.app
          </a>
          .
        </Clause>

        <Clause num="03" title="Free, ad-supported access">
          hentaiki is free for members. We don&apos;t ask for a card and we
          don&apos;t bill you. Playback is supported by short ads from
          independent advertisers. Ads are brand-safe, frequency-capped, and
          never share your watch history with the advertiser. You can manage ad
          preferences in Settings at any time.
        </Clause>

        <Clause num="04" title="Acceptable use">
          Don&apos;t scrape, mirror, or rebroadcast our streams. Don&apos;t
          attempt to bypass DRM or share account credentials. Don&apos;t use the
          service to harass other members or abuse our staff. Three strikes
          (warn, suspend, terminate) — but blatant abuse may skip steps.
        </Clause>

        <Clause num="05" title="Content and ratings">
          All hentaiki content is rated R18+. The service is intended for
          private viewing only. We curate; we don&apos;t produce. We honor
          takedown requests from rights holders within 72 hours.
        </Clause>

        <Clause num="06" title="Termination">
          You can delete your account at any time from Account. We can suspend
          accounts that violate these terms; we&apos;ll always email you with
          the specific cause and a path to appeal.
        </Clause>

        <Clause num="07" title="Liability">
          We do our best to keep the service running, but we don&apos;t promise
          zero downtime. Because hentaiki is provided free of charge, our
          liability is limited to the maximum extent permitted by law. Some
          regions don&apos;t allow this kind of limitation; in those regions,
          we abide by local rules.
        </Clause>

        <Clause num="08" title="Changes to these terms">
          We&apos;ll email registered members at least 14 days before any
          material change. If you don&apos;t agree, you can close your account
          before the change takes effect.
        </Clause>

        <Clause num="09" title="Disputes">
          We prefer to resolve issues directly first — write to{" "}
          <a className="text-[var(--brand)] hover:underline" href="mailto:hello@hentaiki.app">
            hello@hentaiki.app
          </a>
          . If that fails, formal disputes are handled in Singapore under
          Singapore law.
        </Clause>

        <Clause num="10" title="Contact">
          hentaiki, Inc. · Yangon · hello@hentaiki.app
        </Clause>
      </article>

      <p className="mt-12 text-[0.84rem] text-[var(--fg-1)]">
        Effective April 14, 2026. Previous version archived on request.
      </p>
      <div className="h-20" />
    </main>
  );
}

function Clause({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-3 sm:grid-cols-[80px_1fr] sm:gap-6">
      <div className="font-mono text-[0.86rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
        {num}
      </div>
      <div>
        <h2 className="text-[1.2rem] font-bold tracking-tight text-[var(--fg-4)]">
          {title}
        </h2>
        <div className="mt-2 space-y-3">{children}</div>
      </div>
    </section>
  );
}
