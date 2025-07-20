import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports - Redbox Digital",
  description: "Reports and analytics page",
};

export default function ReportsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="grid gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Reports</h2>
          <p className="text-muted-foreground">
            View and generate detailed reports.
          </p>
        </div>
      </div>
    </div>
  );
}
