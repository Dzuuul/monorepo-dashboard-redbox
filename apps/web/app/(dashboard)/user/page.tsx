import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management | Dashboard Redbox",
  description:
    "Halaman manajemen user dashboard Redbox. Kelola pengguna, role, dan akses sistem.",
  keywords: [
    "user",
    "manajemen",
    "dashboard",
    "redbox",
    "pengguna",
    "role",
    "akses",
  ],
  authors: [{ name: "Redbox Digital" }],
  openGraph: {
    title: "User Management | Dashboard Redbox",
    description: "Halaman manajemen user dashboard Redbox",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function UserPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="grid gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <p className="text-muted-foreground">
            Manage your user accounts and their roles.
          </p>
        </div>
      </div>
    </div>
  );
}
