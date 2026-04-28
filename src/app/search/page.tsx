import { titles, allTags } from "@/lib/data";
import { SearchClient } from "./SearchClient";

export const metadata = {
  title: "Search the catalog",
  description: "Find titles by name, studio, tag, or synopsis.",
};

export default function SearchPage() {
  return <SearchClient titles={titles} tags={allTags} />;
}
