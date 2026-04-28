import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Your account",
  description: "Manage your hentaiki membership and devices.",
};

const devices = [
  { name: "MacBook Pro 14\"", os: "macOS 15", lastSeen: "Active now", current: true },
  { name: "iPhone 16", os: "iOS 18.3", lastSeen: "2 hours ago", current: false },
  { name: "Apple TV", os: "tvOS 18", lastSeen: "Yesterday", current: false },
  { name: "iPad Air", os: "iPadOS 18", lastSeen: "3 days ago", current: false },
];

const billing = [
  { date: "Apr 14, 2026", amount: "$6.00", status: "Paid", invoice: "INV-0421" },
  { date: "Mar 14, 2026", amount: "$6.00", status: "Paid", invoice: "INV-0398" },
  { date: "Feb 14, 2026", amount: "$6.00", status: "Paid", invoice: "INV-0376" },
  { date: "Jan 14, 2026", amount: "$6.00", status: "Paid", invoice: "INV-0354" },
];

export default function AccountPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <PageHero
        eyebrow="Account"
        title="Nay Waratt"
        description="Member since 2024 · Premium plan · Two episodes free for life"
        rail={
          <Link href="/settings" className="btn-ghost text-[0.92rem]">
            Edit preferences
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card lg:col-span-2 p-6">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[var(--brand)] to-[oklch(0.55_0.18_15)] text-[1.1rem] font-extrabold text-[oklch(0.18_0.02_30)]">
              NW
            </span>
            <div className="min-w-0">
              <p className="truncate text-[1.2rem] font-bold text-[var(--fg-4)]">
                Nay Waratt
              </p>
              <p className="truncate text-[0.92rem] text-[var(--fg-1)]">
                naywarattpaing@gmail.com
              </p>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-[0.92rem] sm:grid-cols-3">
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                Plan
              </dt>
              <dd className="mt-1 font-semibold text-[var(--fg-4)]">Premium · 4K</dd>
            </div>
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                Renews
              </dt>
              <dd className="mt-1 text-[var(--fg-3)]">May 14, 2026</dd>
            </div>
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                Audio
              </dt>
              <dd className="mt-1 text-[var(--fg-3)]">Sub + Dub</dd>
            </div>
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                Region
              </dt>
              <dd className="mt-1 text-[var(--fg-3)]">Yangon, MM</dd>
            </div>
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                Member since
              </dt>
              <dd className="mt-1 text-[var(--fg-3)]">Apr 14, 2024</dd>
            </div>
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                Verified
              </dt>
              <dd className="mt-1 text-[var(--fg-3)]">18+ confirmed</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/settings" className="btn-brand text-[0.92rem]">
              Manage plan
            </Link>
            <button type="button" className="btn-ghost text-[0.92rem]">
              Update payment
            </button>
            <button type="button" className="btn-ghost text-[0.92rem]">
              Cancel renewal
            </button>
          </div>
        </section>

        <aside className="card p-6">
          <h3 className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[var(--fg-1)]">
            Watch stats
          </h3>
          <ul className="mt-4 space-y-3 text-[0.96rem]">
            <li className="flex items-baseline justify-between">
              <span className="text-[var(--fg-2)]">Episodes watched</span>
              <span className="font-bold text-[var(--fg-4)]">128</span>
            </li>
            <li className="flex items-baseline justify-between">
              <span className="text-[var(--fg-2)]">Hours streamed</span>
              <span className="font-bold text-[var(--fg-4)]">62.4</span>
            </li>
            <li className="flex items-baseline justify-between">
              <span className="text-[var(--fg-2)]">My List</span>
              <span className="font-bold text-[var(--fg-4)]">14 titles</span>
            </li>
            <li className="flex items-baseline justify-between">
              <span className="text-[var(--fg-2)]">Top studio</span>
              <span className="font-bold text-[var(--fg-4)]">Atelier Kurai</span>
            </li>
            <li className="flex items-baseline justify-between">
              <span className="text-[var(--fg-2)]">Top genre</span>
              <span className="font-bold text-[var(--fg-4)]">Drama</span>
            </li>
          </ul>
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="text-[1.1rem] font-bold tracking-tight text-[var(--fg-4)]">
          Devices
        </h2>
        <p className="mt-1 text-[0.92rem] text-[var(--fg-1)]">
          Up to four devices on Premium. Sign out remotely if anything looks off.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {devices.map((d) => (
            <li
              key={d.name}
              className="card flex items-center justify-between gap-3 p-4"
            >
              <div className="min-w-0">
                <p className="flex items-center gap-2 truncate text-[0.98rem] font-semibold text-[var(--fg-4)]">
                  {d.name}
                  {d.current && (
                    <span className="rounded-full bg-[var(--brand-soft)] px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[var(--brand)]">
                      This device
                    </span>
                  )}
                </p>
                <p className="mt-0.5 truncate text-[0.82rem] text-[var(--fg-1)]">
                  {d.os} · {d.lastSeen}
                </p>
              </div>
              {!d.current && (
                <button
                  type="button"
                  className="rounded-full bg-[var(--bg-2)] px-3 py-1.5 text-[0.82rem] font-semibold text-[var(--fg-3)] transition hover:bg-[var(--bg-3)] hover:text-[var(--fg-4)]"
                >
                  Sign out
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-[1.1rem] font-bold tracking-tight text-[var(--fg-4)]">
          Billing history
        </h2>
        <div className="card mt-5 overflow-hidden">
          <table className="w-full text-left text-[0.92rem]">
            <thead>
              <tr className="border-b border-[var(--bg-3)]/70 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[var(--fg-1)]">
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billing.map((b, i) => (
                <tr
                  key={b.invoice}
                  className={i % 2 ? "bg-[var(--bg-1)]/40" : ""}
                >
                  <td className="px-5 py-3 text-[var(--fg-3)]">{b.date}</td>
                  <td className="px-5 py-3 font-semibold text-[var(--fg-4)]">
                    {b.amount}
                  </td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-[oklch(0.6_0.16_150_/_0.18)] px-2.5 py-0.5 text-[0.74rem] font-semibold text-[oklch(0.78_0.16_150)]">
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-[0.86rem] text-[var(--fg-1)]">
                    {b.invoice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="h-20" />
    </main>
  );
}
