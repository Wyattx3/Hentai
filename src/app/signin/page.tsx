import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthFormClient } from "./AuthFormClient";

export const metadata: Metadata = {
  title: "Sign in · hentaiki",
  description: "Sign in to keep your list and progress synced.",
};

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <AuthFormClient mode="signin" />
    </Suspense>
  );
}
