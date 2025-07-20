import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

export function ComponentsTab() {
  return (
    <div className="grid gap-6 grid-full-wrapper">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-xl">
            UI Components
          </CardTitle>
          <CardDescription>
            Dokumentasi komponen UI yang tersedia dan cara penggunaannya.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm sm:text-base">
                Layout Components
              </h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span>SiteHeader</span>
                  <Badge variant="secondary">Header</Badge>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span>AppSidebar</span>
                  <Badge variant="secondary">Navigation</Badge>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span>ThemeProvider</span>
                  <Badge variant="secondary">Theme</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm sm:text-base">
                Data Components
              </h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span>DataTable</span>
                  <Badge variant="secondary">Table</Badge>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span>ChartAreaInteractive</span>
                  <Badge variant="secondary">Chart</Badge>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span>SectionCards</span>
                  <Badge variant="secondary">Cards</Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold text-sm sm:text-base">
              Usage Example
            </h4>
            <div className="bg-muted p-2 sm:p-4 rounded-lg overflow-x-auto">
              <pre className="text-xs sm:text-sm whitespace-pre-wrap">
                {`import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export function ExampleComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Example content</p>
      </CardContent>
    </Card>
  );
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
