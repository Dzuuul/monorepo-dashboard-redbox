import { Metadata } from "next";
import { AppSidebar } from "../../components/app-sidebar";
import { SiteHeader } from "../../components/site-header";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";

export const metadata: Metadata = {
  title: "Dashboard | Redbox",
  description:
    "Dashboard internal Redbox untuk manajemen data, pemantauan performa, dan pelaporan yang presisi. Solusi cerdas untuk tim admin.",
  keywords: [
    "dashboard",
    "redbox",
    "admin",
    "manajemen data",
    "performa",
    "pelaporan",
    "analytics",
  ],
  authors: [{ name: "Redbox Digital" }],
  openGraph: {
    title: "Dashboard | Redbox",
    description: "Dashboard internal untuk manajemen data dan performa",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
