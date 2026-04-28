import { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  rail,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  rail?: ReactNode;
}) {
  return (
    <header className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-12">
      <div className="max-w-2xl">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-[clamp(2rem,1.4rem+2.4vw,3.4rem)] font-extrabold tracking-tight text-[var(--fg-4)]">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-[var(--fg-2)]">
            {description}
          </p>
        )}
      </div>
      {rail && <div className="shrink-0">{rail}</div>}
    </header>
  );
}
