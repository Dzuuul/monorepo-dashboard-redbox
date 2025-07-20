import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

export function DeploymentTab() {
  return (
    <div className="grid gap-6 w-full px-2 sm:px-4 md:px-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Deployment Guide</CardTitle>
          <CardDescription>
            Panduan lengkap untuk deployment aplikasi ke production.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Environment Variables</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  DATABASE_URL
                </code>
                <span className="text-sm text-muted-foreground">
                  Database connection string
                </span>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  NEXTAUTH_SECRET
                </code>
                <span className="text-sm text-muted-foreground">
                  Authentication secret
                </span>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  NEXTAUTH_URL
                </code>
                <span className="text-sm text-muted-foreground">
                  Application URL
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Build Commands</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Install</Badge>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  pnpm install
                </code>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Build</Badge>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  pnpm build
                </code>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Start</Badge>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  pnpm start
                </code>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Platforms</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <h5 className="font-medium mb-2">Vercel</h5>
                <Badge variant="secondary">Recommended</Badge>
              </div>
              <div className="text-center">
                <h5 className="font-medium mb-2">Railway</h5>
                <Badge variant="outline">Alternative</Badge>
              </div>
              <div className="text-center">
                <h5 className="font-medium mb-2">Docker</h5>
                <Badge variant="outline">Container</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
