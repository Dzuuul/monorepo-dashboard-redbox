import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Dashboard Redbox",
  description:
    "Halaman manajemen proyek dashboard Redbox. Kelola proyek, timeline, dan progress tracking.",
  keywords: [
    "projects",
    "proyek",
    "dashboard",
    "redbox",
    "timeline",
    "progress",
    "manajemen",
  ],
  authors: [{ name: "Redbox Digital" }],
  openGraph: {
    title: "Projects | Dashboard Redbox",
    description: "Halaman manajemen proyek dashboard Redbox",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Project Management</h2>
          <p className="text-muted-foreground">
            Manage and organize your projects efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}
