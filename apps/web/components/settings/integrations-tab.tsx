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
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  Globe,
  Webhook,
  Zap,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";

export function IntegrationsTab() {
  return (
    <div className="grid gap-6 w-full px-2 sm:px-4 md:px-8">
      {/* Third-party Integrations */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
            <Globe className="h-5 w-5" />
            Third-party Integrations
          </CardTitle>
          <CardDescription>
            Konfigurasi integrasi seperti Google OAuth, payment gateway, dsb.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-semibold text-sm sm:text-base">
                Active Integrations
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Manage external service connections
              </p>
            </div>
            <Button size="sm" className="w-full sm:w-auto mt-2 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
          </div>

          <div className="grid gap-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Google OAuth</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Authentication via Google
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 sm:mt-0">
                <Badge variant="secondary">Connected</Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Stripe Payment</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Payment processing
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 sm:mt-0">
                <Badge variant="secondary">Connected</Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg opacity-60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Slack Notifications</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Team notifications
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 sm:mt-0">
                <Badge variant="outline">Disconnected</Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Settings */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            Webhook Settings
          </CardTitle>
          <CardDescription>
            Tambah dan atur webhook listener/outbound.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-semibold text-sm sm:text-base">
                Webhook Endpoints
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Manage webhook configurations
              </p>
            </div>
            <Button size="sm" className="w-full sm:w-auto mt-2 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Webhook
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">User Registration</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  https://api.example.com/webhooks/user-reg
                </p>
              </div>
              <div className="flex items-center gap-1 mt-2 sm:mt-0">
                <Badge variant="secondary">Active</Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">Payment Success</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  https://api.example.com/webhooks/payment
                </p>
              </div>
              <div className="flex items-center gap-1 mt-2 sm:mt-0">
                <Badge variant="secondary">Active</Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-semibold">Webhook Configuration</h4>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="webhook-timeout">Timeout (seconds)</Label>
                <Input
                  id="webhook-timeout"
                  type="number"
                  defaultValue="30"
                  placeholder="30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-retries">Max Retries</Label>
                <Input
                  id="webhook-retries"
                  type="number"
                  defaultValue="3"
                  placeholder="3"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Rate Limits */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            API Rate Limits
          </CardTitle>
          <CardDescription>
            Pengaturan throttle/batasan akses API.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <Label className="text-sm sm:text-base font-medium">
                  Enable Rate Limiting
                </Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Control API request frequency
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Rate Limit Rules</h4>
              <div className="grid gap-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Public API</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      100 requests per minute
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-2 sm:mt-0">
                    <Badge variant="secondary">Active</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Authenticated API</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      1000 requests per hour
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-2 sm:mt-0">
                    <Badge variant="secondary">Active</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Admin API</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Unlimited requests
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-2 sm:mt-0">
                    <Badge variant="outline">No Limit</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h4 className="font-semibold text-sm sm:text-base">
                API Usage Statistics
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Current API request volume
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-semibold">1,234 requests</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Last 24 hours
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
