import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import {
  Users,
  Shield,
  Settings,
  Zap,
  GitBranch,
  FileText,
} from "lucide-react";

export function OverviewTab() {
  return (
    <div className="grid gap-6 grid-full-wrapper">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
            <Zap className="h-5 w-5" />
            Quick Start
          </CardTitle>
          <CardDescription>
            Mulai dengan cepat untuk memahami arsitektur dan teknologi yang
            digunakan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm sm:text-base">
                Teknologi Stack
              </h4>
              <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                <li>• Next.js 15 dengan App Router</li>
                <li>• TypeScript untuk type safety</li>
                <li>• Tailwind CSS untuk styling</li>
                <li>• Shadcn/ui untuk komponen</li>
                <li>• Zustand untuk state management</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm sm:text-base">
                Struktur Project
              </h4>
              <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                <li>• `/app` - Pages dan layouts</li>
                <li>• `/components` - Reusable components</li>
                <li>• `/lib` - Utilities dan constants</li>
                <li>• `/hooks` - Custom React hooks</li>
                <li>• `/styles` - Global styles</li>
              </ul>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="sm" className="w-full sm:w-auto">
              <GitBranch className="h-4 w-4 mr-2" />
              Clone Repository
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <FileText className="h-4 w-4 mr-2" />
              View README
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Users className="h-5 w-5" />
              Team Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4">
              Panduan untuk tim development dalam mengembangkan fitur baru.
            </p>
            <Badge variant="secondary">Git Flow</Badge>
            <Badge variant="secondary" className="ml-2">
              Code Review
            </Badge>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4">
              Best practices keamanan dan autentikasi.
            </p>
            <Badge variant="secondary">JWT</Badge>
            <Badge variant="secondary" className="ml-2">
              CORS
            </Badge>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Settings className="h-5 w-5" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4">
              Pengaturan environment dan konfigurasi aplikasi.
            </p>
            <Badge variant="secondary">.env</Badge>
            <Badge variant="secondary" className="ml-2">
              Constants
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
