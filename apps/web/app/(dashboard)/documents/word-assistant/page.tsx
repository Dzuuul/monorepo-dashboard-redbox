import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Assistant - Redbox Digital",
  description: "Word processing assistant page",
};

export default function WordAssistantPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Word Assistant</h1>
      <div className="grid gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Word Assistant</h2>
          <p className="text-muted-foreground">
            AI-powered word processing and document assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
