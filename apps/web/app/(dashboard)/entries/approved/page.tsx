import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lifecycle - Redbox Digital",
  description: "Lifecycle management page",
};

export default function LifecyclePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Lifecycle</h1>
      <div className="grid gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Lifecycle Management</h2>
          <p className="text-muted-foreground">
            Manage your project lifecycles and workflows here.
          </p>
        </div>
      </div>
    </div>
  );
}
