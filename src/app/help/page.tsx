import { PageHero } from "@/components/PageHero";
import { HelpClient } from "./HelpClient";

export const metadata = {
  title: "Help center",
  description: "Answers to the most common questions, and a way to reach a human.",
};

export default function HelpPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <PageHero
        eyebrow="Support"
        title="Help center"
        description="Find an answer in seconds. If you don't, email us — a human writes back, not a bot."
      />
      <HelpClient />
      <div className="h-20" />
    </main>
  );
}
