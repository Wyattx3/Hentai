import { PageHero } from "@/components/PageHero";
import { SettingsClient } from "./SettingsClient";

export const metadata = {
  title: "Settings",
  description: "Tune playback, audio, and notifications.",
};

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-[900px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <PageHero
        eyebrow="Preferences"
        title="Settings"
        description="Quiet defaults that travel with you across devices."
      />
      <SettingsClient />
      <div className="h-20" />
    </main>
  );
}
