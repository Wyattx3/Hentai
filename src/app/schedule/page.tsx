import Link from "next/link";
import Image from "next/image";
import { scheduleByDay } from "@/lib/data";

export const metadata = {
  title: "Release Schedule",
  description: "Weekly simulcast and release calendar on hentaiki.",
};

const dayLabels: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export default function SchedulePage() {
  const grid = scheduleByDay();
  const days = Object.keys(grid);
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            Weekly · Simulcast
          </p>
          <h1 className="mt-2 text-[clamp(2.2rem,1.6rem+2vw,3.2rem)] font-extrabold tracking-tight text-[var(--fg-4)]">
            Release schedule
          </h1>
          <p className="mt-2 max-w-[60ch] text-[1rem] text-[var(--fg-2)]">
            Same-day arrivals from partner studios, plus catalog drops. All
            times are local to your device.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="pill pill-brand">{today === "Tod" ? "TODAY" : `TODAY · ${today.toUpperCase()}`}</span>
          <span className="pill">12 titles</span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-7 lg:gap-3 xl:gap-4">
        {days.map((d) => {
          const items = grid[d];
          const isToday = d === today;
          return (
            <section
              key={d}
              className={`card hairline overflow-hidden ${isToday ? "ring-2 ring-[var(--brand)] ring-offset-2 ring-offset-[var(--bg-0)]" : ""}`}
            >
              <header
                className={`px-4 py-3 ${isToday ? "bg-[var(--brand)] text-[oklch(0.18_0.02_30)]" : "bg-[var(--bg-2)]/60 text-[var(--fg-3)]"}`}
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] opacity-80">
                  {isToday ? "Today" : ""}
                </p>
                <p className="text-[1rem] font-extrabold tracking-tight">
                  {dayLabels[d] ?? d}
                </p>
              </header>
              <ul className="divide-y divide-[var(--bg-3)]/70">
                {items.length === 0 && (
                  <li className="px-4 py-6 text-[0.86rem] text-[var(--fg-1)]">
                    No simulcasts.
                  </li>
                )}
                {items.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/title/${t.slug}`}
                      className="group flex items-start gap-3 px-3 py-3 transition hover:bg-[var(--bg-2)]"
                    >
                      <div className="relative aspect-[3/4] w-12 shrink-0 overflow-hidden rounded-md bg-black">
                        <Image
                          src={`https://picsum.photos/id/${t.imageId}/120/160`}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.7rem] font-mono font-semibold tabular-nums text-[var(--brand)]">
                          {t.releaseTime ?? "—"}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-[0.88rem] font-semibold text-[var(--fg-3)] group-hover:text-[var(--brand)]">
                          {t.name}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-[0.74rem] text-[var(--fg-1)]">
                          {t.studio}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
