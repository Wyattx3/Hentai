"use client";

import { useEffect, useState } from "react";

const KEY = "hentaiki:age-confirmed";

export function AgeGate() {
  const [state, setState] = useState<"loading" | "open" | "closed">("loading");

  useEffect(() => {
    let next: "open" | "closed";
    try {
      next = window.localStorage.getItem(KEY) === "1" ? "closed" : "open";
    } catch {
      next = "open";
    }
    setState(next);
  }, []);

  if (state !== "open") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/85 p-0 backdrop-blur-md sm:items-center sm:p-6"
    >
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-t-2xl bg-[var(--bg-1)] hairline sm:rounded-2xl">
        <div className="px-7 pt-7">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            Members only · 18+
          </p>
          <h2
            id="age-gate-title"
            className="mt-3 text-[clamp(1.6rem,1.2rem+1.6vw,2.1rem)] font-extrabold leading-tight tracking-tight text-[var(--fg-4)]"
          >
            Are you eighteen or older?
          </h2>
          <p className="mt-3 max-w-[48ch] text-[0.96rem] leading-relaxed text-[var(--fg-2)]">
            hentaiki streams adult animation. Continuing confirms you are at
            least eighteen and that adult content is legal where you live.
          </p>
        </div>
        <div className="mt-7 flex flex-col gap-2 px-7 pb-7 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              try { window.localStorage.setItem(KEY, "1"); } catch {}
              setState("closed");
            }}
            className="btn-brand pulse-brand text-[0.96rem]"
          >
            Yes, I&apos;m 18+. Enter.
          </button>
          <button
            type="button"
            onClick={() => { window.location.href = "https://www.google.com"; }}
            className="btn-ghost text-[0.96rem]"
          >
            Take me somewhere else
          </button>
        </div>
      </div>
    </div>
  );
}
