import { Metadata } from "next";
import { METADATA } from "../../../lib/constants";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  BookOpen,
  Code,
  Database,
  Globe,
  Palette,
  Smartphone,
} from "lucide-react";
import { OverviewTab } from "../../../components/docs/overview-tab";
import { ApiTab } from "../../../components/docs/api-tab";
import { ComponentsTab } from "../../../components/docs/components-tab";
import { DatabaseTab } from "../../../components/docs/database-tab";
import { DeploymentTab } from "../../../components/docs/deployment-tab";
import { MobileTab } from "../../../components/docs/mobile-tab";

export const metadata: Metadata = {
  title: METADATA.TITLE("Documentation"),
  description:
    "Dokumentasi lengkap untuk developer Redbox Dashboard. Panduan API, komponen, dan best practices.",
  keywords: ["documentation", "developer", "api", "guide", "redbox"],
  authors: [{ name: "Redbox Digital" }],
  openGraph: {
    title: METADATA.TITLE("Documentation"),
    description: "Dokumentasi developer Redbox Dashboard",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DocumentationPage() {
  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          Developer Documentation
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Panduan lengkap untuk developer dalam mengembangkan dan memaintain
          sistem Redbox Dashboard.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-2">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="api"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">API</span>
          </TabsTrigger>
          <TabsTrigger
            value="components"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Components</span>
          </TabsTrigger>
          <TabsTrigger
            value="database"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Database</span>
          </TabsTrigger>
          <TabsTrigger
            value="deployment"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Deployment</span>
          </TabsTrigger>
          <TabsTrigger
            value="mobile"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">Mobile</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-4 sm:mt-6">
          <OverviewTab />
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="mt-4 sm:mt-6">
          <ApiTab />
        </TabsContent>

        {/* Components Tab */}
        <TabsContent value="components" className="mt-4 sm:mt-6">
          <ComponentsTab />
        </TabsContent>

        {/* Database Tab */}
        <TabsContent value="database" className="mt-4 sm:mt-6">
          <DatabaseTab />
        </TabsContent>

        {/* Deployment Tab */}
        <TabsContent value="deployment" className="mt-4 sm:mt-6">
          <DeploymentTab />
        </TabsContent>

        {/* Mobile Tab */}
        <TabsContent value="mobile" className="mt-4 sm:mt-6">
          <MobileTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
