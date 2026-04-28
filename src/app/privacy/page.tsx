import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Privacy",
  description: "What we collect, what we don't, and what you control.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[820px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <PageHero
        eyebrow="Policy"
        title="Privacy"
        description="Plain-English summary first. The legal long-form follows. No third-party trackers, ever."
      />

      <section className="card p-6 sm:p-8">
        <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
          The short version
        </h2>
        <ul className="mt-4 space-y-3 text-[1rem] leading-relaxed text-[var(--fg-3)]">
          <li>• We never sell your watch history. We don&apos;t even share it with our cloud provider in a way they could read.</li>
          <li>• We collect only what we need to run the service: account email, payment confirmation token, watch progress, region, and device type.</li>
          <li>• You can export everything we have on you, or delete it permanently, from Account → Privacy controls.</li>
          <li>• We don&apos;t run third-party trackers. Anonymous, on-server analytics only.</li>
          <li>• If we&apos;re ever compelled by law to share data, we publish a transparency report that quarter.</li>
        </ul>
      </section>

      <article className="prose-content mt-12 space-y-10 text-[1rem] leading-relaxed text-[var(--fg-3)]">
        <Section title="What we collect">
          <p>
            When you create an account, we store your email and a hashed
            password. When you watch something, we record your progress on each
            episode so Continue Watching works and recommendations improve. When
            you pay, we keep a token from our processor — never your full card
            details.
          </p>
          <p>
            Your IP address is stored in a rolling 30-day log so we can detect
            abuse. After 30 days it&apos;s permanently aggregated.
          </p>
        </Section>

        <Section title="What we don't collect">
          <p>
            We don&apos;t fingerprint your browser. We don&apos;t embed
            third-party SDKs. We don&apos;t share data with ad networks because
            we don&apos;t run ads.
          </p>
        </Section>

        <Section title="What you control">
          <p>
            From Account → Privacy controls you can: download your full data
            export as JSON, delete your account, opt out of personalization (we
            stop using your viewing history for recommendations), and clear any
            single watch record without losing the rest.
          </p>
        </Section>

        <Section title="Where data lives">
          <p>
            Primary data sits on encrypted disk in the EU and Singapore. Backups
            are encrypted at rest with keys we rotate quarterly. We don&apos;t
            cross-replicate to any region whose laws would force unencrypted
            access.
          </p>
        </Section>

        <Section title="How to reach us">
          <p>
            <a className="text-[var(--brand)] hover:underline" href="mailto:privacy@hentaiki.app">
              privacy@hentaiki.app
            </a>{" "}
            — replied to within seven days. For urgent issues (a leaked
            credential, a suspicious login), use{" "}
            <a className="text-[var(--brand)] hover:underline" href="mailto:security@hentaiki.app">
              security@hentaiki.app
            </a>{" "}
            and we&apos;ll prioritize it.
          </p>
        </Section>
      </article>

      <p className="mt-12 text-[0.84rem] text-[var(--fg-1)]">
        Last updated April 14, 2026. Material changes are emailed 14 days in advance.
      </p>
      <div className="h-20" />
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[1.4rem] font-bold tracking-tight text-[var(--fg-4)]">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
