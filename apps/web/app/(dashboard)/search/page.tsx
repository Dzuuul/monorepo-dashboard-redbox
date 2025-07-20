import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - Redbox Digital",
  description: "Search functionality page",
};

export default function SearchPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <div className="grid gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Search</h2>
          <p className="text-muted-foreground">
            Search through your data and content.
          </p>
        </div>
      </div>
    </div>
  );
}
