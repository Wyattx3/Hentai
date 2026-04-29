"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Wordmark } from "@/components/Wordmark";

export type AuthMode = "signin" | "signup";

const COPY = {
  signin: {
    eyebrow: "Welcome back",
    title: "Sign in to hentaiki",
    description:
      "Pick up your list, your progress, and your queue. Free with ads — no card needed.",
    submit: "Sign in",
    altLine: "New here?",
    altCta: "Create an account",
    altHref: "/signup",
  },
  signup: {
    eyebrow: "Create your free account",
    title: "Start your hentaiki list",
    description:
      "Save titles, sync progress across devices, and pick up where you left off. Free with ads, forever.",
    submit: "Create account",
    altLine: "Already have an account?",
    altCta: "Sign in",
    altHref: "/signin",
  },
} as const;

export function AuthFormClient({ mode }: { mode: AuthMode }) {
  const copy = COPY[mode];
  const router = useRouter();
  const params = useSearchParams();
  const { signIn } = useAuth();

  const next = params.get("next") || "/";
  const intent = params.get("intent");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(mode === "signin");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const altHref = `${copy.altHref}${
    next && next !== "/"
      ? `?next=${encodeURIComponent(next)}${intent ? `&intent=${intent}` : ""}`
      : ""
  }`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.includes("@") || email.length < 4) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    if (mode === "signup" && !age) {
      setError("Please confirm you are 18 or older.");
      return;
    }
    setSubmitting(true);
    // Mock auth — there's no backend; we just persist locally.
    signIn(email, mode === "signup" ? name : undefined);
    // Tiny artificial delay so the button transition feels deliberate.
    setTimeout(() => {
      router.replace(next);
    }, 250);
  }

  return (
    <div className="min-h-[100svh] bg-[var(--bg-0)]">
      <div className="mx-auto grid min-h-[100svh] w-full max-w-[1200px] items-center gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-0">
        {/* Left: brand */}
        <div className="hidden flex-col justify-between lg:flex lg:py-16">
          <Link href="/" aria-label="hentaiki home">
            <Wordmark size={26} />
          </Link>
          <div>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(2.4rem,1.6rem+2.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-tight text-[var(--fg-4)]">
              Free, ad-supported anime —
              <br />
              your list goes with you.
            </h2>
            <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-[var(--fg-2)]">
              No subscription. No card. Sign in to keep your saved titles and
              continue-watching synced across devices.
            </p>
            <ul className="mt-8 space-y-3 text-[0.94rem] text-[var(--fg-2)]">
              {[
                "Save titles to My List with one tap",
                "Pick up where you left off, on any device",
                "Get notified when new episodes drop",
              ].map((line) => (
                <li key={line} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)]">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[0.78rem] text-[var(--fg-1)]">
            By continuing you agree to our{" "}
            <Link href="/terms" className="underline-offset-4 hover:text-[var(--fg-3)] hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline-offset-4 hover:text-[var(--fg-3)] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Right: form */}
        <div className="flex flex-col">
          <Link href="/" aria-label="hentaiki home" className="mb-8 lg:hidden">
            <Wordmark size={22} />
          </Link>
          <div className="card hairline px-6 py-8 sm:px-9 sm:py-10">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
              {copy.eyebrow}
            </p>
            <h1 className="mt-2 text-[clamp(1.6rem,1.2rem+1.2vw,2.2rem)] font-extrabold tracking-tight text-[var(--fg-4)]">
              {copy.title}
            </h1>
            <p className="mt-2 text-[0.94rem] leading-relaxed text-[var(--fg-2)]">
              {copy.description}
            </p>
            {intent === "save" && (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand-soft)] px-4 py-3 text-[0.86rem] text-[var(--fg-3)]">
                <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--brand)] text-[oklch(0.18_0.02_30)]">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  </svg>
                </span>
                <span>
                  {mode === "signup"
                    ? "Create a free account to save this title to your list."
                    : "Sign in to save this title to your list."}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              {mode === "signup" && (
                <Field
                  label="Display name"
                  hint="Shown on your profile. You can change it later."
                >
                  <input
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nay Waratt"
                    className="auth-input"
                  />
                </Field>
              )}
              <Field label="Email">
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="auth-input"
                />
              </Field>
              <Field label="Password">
                <input
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "signup" ? "At least 4 characters" : "Your password"}
                  className="auth-input"
                />
              </Field>

              {mode === "signup" && (
                <label className="flex items-start gap-3 text-[0.86rem] text-[var(--fg-2)]">
                  <input
                    type="checkbox"
                    checked={age}
                    onChange={(e) => setAge(e.target.checked)}
                    className="mt-0.5 h-4 w-4 cursor-pointer accent-[var(--brand)]"
                  />
                  <span>
                    I confirm I am 18 or older and understand hentaiki contains
                    adult animation. I agree to the{" "}
                    <Link href="/terms" className="underline-offset-4 hover:text-[var(--fg-3)] hover:underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline-offset-4 hover:text-[var(--fg-3)] hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              )}

              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-[oklch(0.34_0.16_25_/_0.25)] px-3 py-2 text-[0.86rem] text-[oklch(0.84_0.16_25)]"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-brand w-full justify-center text-[0.98rem] disabled:opacity-60"
              >
                {submitting ? "Just a sec…" : copy.submit}
              </button>

              {mode === "signin" && (
                <p className="text-center text-[0.82rem] text-[var(--fg-1)]">
                  Forgot your password?{" "}
                  <Link
                    href="/help"
                    className="text-[var(--fg-2)] underline-offset-4 hover:text-[var(--fg-4)] hover:underline"
                  >
                    Recover it
                  </Link>
                </p>
              )}
            </form>

            <div className="mt-6 flex items-center gap-3">
              <span aria-hidden className="h-px flex-1 bg-[var(--bg-3)]" />
              <span className="text-[0.78rem] uppercase tracking-[0.16em] text-[var(--fg-1)]">
                or
              </span>
              <span aria-hidden className="h-px flex-1 bg-[var(--bg-3)]" />
            </div>
            <p className="mt-5 text-center text-[0.92rem] text-[var(--fg-2)]">
              {copy.altLine}{" "}
              <Link
                href={altHref}
                className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
              >
                {copy.altCta}
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-[0.78rem] text-[var(--fg-1)] lg:hidden">
            By continuing you agree to our{" "}
            <Link href="/terms" className="underline-offset-4">Terms</Link> and{" "}
            <Link href="/privacy" className="underline-offset-4">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between text-[0.84rem] font-semibold text-[var(--fg-3)]">
        {label}
        {hint && (
          <span className="text-[0.76rem] font-normal text-[var(--fg-1)]">
            {hint}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
