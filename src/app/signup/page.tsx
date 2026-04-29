import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthFormClient } from "../signin/AuthFormClient";

export const metadata: Metadata = {
  title: "Create account · hentaiki",
  description:
    "Create a free, ad-supported hentaiki account to save titles and sync progress.",
};

export default function SignUpPage() {
  return (
    <Suspense fallback={null}>
      <AuthFormClient mode="signup" />
    </Suspense>
  );
}
