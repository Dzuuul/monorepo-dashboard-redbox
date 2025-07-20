import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

export function MobileTab() {
  return (
    <div className="grid gap-6 grid-full-wrapper">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mobile Development</CardTitle>
          <CardDescription>
            Panduan untuk pengembangan versi mobile dan responsive design.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold">Responsive Breakpoints</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Mobile</span>
                  <Badge variant="outline">&lt; 768px</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tablet</span>
                  <Badge variant="outline">768px - 1024px</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Desktop</span>
                  <Badge variant="outline">&gt; 1024px</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Mobile Features</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Touch Gestures</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Swipe Navigation</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Mobile Menu</Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Mobile Optimization</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Performance</Badge>
                <span className="text-sm text-muted-foreground">
                  Optimized images and lazy loading
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Touch</Badge>
                <span className="text-sm text-muted-foreground">
                  Touch-friendly button sizes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Viewport</Badge>
                <span className="text-sm text-muted-foreground">
                  Proper viewport meta tags
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
