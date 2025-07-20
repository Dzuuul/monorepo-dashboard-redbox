import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics - Redbox Digital",
  description: "Analytics and reporting page",
};

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="grid gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            View detailed analytics and performance metrics.
          </p>
        </div>
      </div>
    </div>
  );
}
