import { Metadata } from "next";
import { METADATA } from "../../../lib/constants";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  UserAccessTab,
  SystemConfigTab,
  ModularTab,
  IntegrationsTab,
} from "../../../components/settings";
import { Users, Settings, Menu, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: METADATA.TITLE("Settings"),
  description: METADATA.SETTINGS.description,
  keywords: METADATA.SETTINGS.keywords,
  authors: [{ name: "Redbox Digital" }],
  openGraph: METADATA.SETTINGS.openGraph,
  robots: {
    index: false,
    follow: false,
  },
};

export default function SettingsPage() {
  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Kelola konfigurasi sistem, user, dan integrasi aplikasi.
        </p>
      </div>

      <Tabs defaultValue="user-access" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="user-access" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">User & Access</span>
          </TabsTrigger>
          <TabsTrigger
            value="system-config"
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
          <TabsTrigger value="modular" className="flex items-center gap-2">
            <Menu className="h-4 w-4" />
            <span className="hidden sm:inline">Modular</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="user-access">
            <UserAccessTab />
          </TabsContent>

          <TabsContent value="system-config">
            <SystemConfigTab />
          </TabsContent>

          <TabsContent value="modular">
            <ModularTab />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
