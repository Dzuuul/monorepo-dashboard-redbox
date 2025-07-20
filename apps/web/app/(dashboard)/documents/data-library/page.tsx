import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Library - Redbox Digital",
  description: "Data library management page",
};

export default function DataLibraryPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Data Library</h1>
      <div className="grid gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Data Library</h2>
          <p className="text-muted-foreground">
            Manage and organize your data resources.
          </p>
        </div>
      </div>
    </div>
  );
}
