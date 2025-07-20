import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help - Redbox Digital",
  description: "Help and support page",
};

export default function HelpPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Help</h1>
      <div className="grid gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
          <p className="text-muted-foreground">
            Get help and support for using the application.
          </p>
        </div>
      </div>
    </div>
  );
}
