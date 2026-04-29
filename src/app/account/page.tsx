import type { Metadata } from "next";
import { AccountClient } from "./AccountClient";

export const metadata: Metadata = {
  title: "Your account",
  description: "Manage your hentaiki profile, devices, and ad preferences.",
};

export default function AccountPage() {
  return <AccountClient />;
}
