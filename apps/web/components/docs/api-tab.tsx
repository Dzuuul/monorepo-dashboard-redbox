import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

export function ApiTab() {
  return (
    <div className="grid gap-6 w-full px-2 sm:px-4 md:px-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
          <CardDescription>
            Dokumentasi lengkap untuk semua API endpoints yang tersedia.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Authentication</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">POST</Badge>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  /api/auth/login
                </code>
                <span className="text-sm text-muted-foreground">
                  Login user
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">POST</Badge>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  /api/auth/refresh
                </code>
                <span className="text-sm text-muted-foreground">
                  Refresh token
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Users</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">GET</Badge>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  /api/users
                </code>
                <span className="text-sm text-muted-foreground">
                  Get all users
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">POST</Badge>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  /api/users
                </code>
                <span className="text-sm text-muted-foreground">
                  Create user
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Data</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">GET</Badge>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  /api/dashboard/stats
                </code>
                <span className="text-sm text-muted-foreground">
                  Dashboard statistics
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">GET</Badge>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  /api/entries
                </code>
                <span className="text-sm text-muted-foreground">
                  Get entries data
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
