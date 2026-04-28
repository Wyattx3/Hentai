"use client";

import { useEffect, useState } from "react";

const KEY = "hentaiki:age-confirmed";

export function AgeGate() {
  const [state, setState] = useState<"loading" | "open" | "closed">(
    "loading"
  );

  useEffect(() => {
    let next: "open" | "closed";
    try {
      next = window.localStorage.getItem(KEY) === "1" ? "closed" : "open";
    } catch {
      next = "open";
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(next);
  }, []);

  if (state !== "open") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--ink-0)]/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <div className="relative w-full max-w-[520px] overflow-hidden border border-[var(--ink-3)] bg-[var(--ink-1)] sm:rounded-md">
        <div className="grain pointer-events-none" aria-hidden />
        <div className="px-7 pt-7">
          <p className="t-mono text-[var(--accent)]">Members only · 18+</p>
          <h2
            id="age-gate-title"
            className="tt-h2 mt-3 max-w-[18ch] text-[clamp(1.6rem,1.2rem+1.6vw,2.1rem)] text-[var(--ink-7)]"
          >
            Are you old enough to be here, and do you want to be here?
          </h2>
          <p className="mt-3 max-w-[44ch] text-[0.95rem] text-[var(--ink-5)]">
            hentaiki is an adult-animation streaming room. Continuing means you
            are at least eighteen, that adult content is legal where you live,
            and that you would like to see it.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-px bg-[var(--ink-3)] sm:grid-cols-[1fr_auto]">
          <button
            type="button"
            onClick={() => {
              window.location.href = "https://www.google.com";
            }}
            className="bg-[var(--ink-1)] px-7 py-4 text-left text-[0.95rem] text-[var(--ink-5)] transition-colors hover:bg-[var(--ink-2)] hover:text-[var(--ink-7)]"
          >
            Take me somewhere else
          </button>
          <button
            type="button"
            onClick={() => {
              try {
                window.localStorage.setItem(KEY, "1");
              } catch {}
              setState("closed");
            }}
            className="bg-[var(--accent)] px-7 py-4 text-[0.95rem] font-medium text-[var(--ink-0)] transition-colors hover:bg-[var(--accent-press)]"
          >
            {"I'm 18+. Continue."}
          </button>
        </div>
      </div>
    </div>
  );
}
