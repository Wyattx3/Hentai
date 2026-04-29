"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/signin") || pathname?.startsWith("/signup")) {
    return null;
  }
  return (
    <footer className="mt-24 border-t border-[var(--bg-3)] bg-[var(--bg-1)]">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-md">
            <Wordmark size={22} />
            <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--fg-2)]">
              Adult animation streaming in HD. New episodes every week, simulcast
              titles same-day, full back-catalog. Free with ads, eighteen and over.
            </p>
          </div>
          <FooterCol
            title="Watch"
            items={[
              { href: "/browse", label: "Browse" },
              { href: "/collections", label: "Collections" },
              { href: "/search", label: "Search" },
            ]}
          />
          <FooterCol
            title="hentaiki"
            items={[
              { href: "/about", label: "About" },
              { href: "/careers", label: "Careers" },
              { href: "/press", label: "Press" },
            ]}
          />
          <FooterCol
            title="Help"
            items={[
              { href: "/account", label: "Account" },
              { href: "/help", label: "Help center" },
              { href: "/settings", label: "Settings" },
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
            ]}
          />
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--bg-3)] pt-6 text-[0.82rem] text-[var(--fg-1)]">
          <span>© {new Date().getFullYear()} hentaiki, inc. R18+ · Free with ads.</span>
          <span>Built with care. No third-party trackers.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--fg-1)]">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            <Link href={it.href} className="text-[0.95rem] text-[var(--fg-2)] transition hover:text-[var(--fg-4)]">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
