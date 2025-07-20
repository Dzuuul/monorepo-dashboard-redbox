"use client";
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
  Menu,
  ToggleLeft,
  Layout,
  Plus,
  Edit,
  Eye,
  EyeOff,
  Move,
  Palette,
  Type,
  Check,
  RotateCcw,
} from "lucide-react";
import { useThemeStore } from "../../lib/theme-store";
import { useState } from "react";

export function ModularTab() {
  const {
    color,
    font,
    tempColor,
    tempFont,
    setTempColor,
    setTempFont,
    applySettings,
    revertSettings,
  } = useThemeStore();

  const [isLoading, setIsLoading] = useState(false);

  const colorOptions = [
    { name: "Red", value: "red", color: "bg-red-500" },
    { name: "Rose", value: "rose", color: "bg-rose-500" },
    { name: "Orange", value: "orange", color: "bg-orange-500" },
    { name: "Green", value: "green", color: "bg-green-500" },
    { name: "Blue", value: "blue", color: "bg-blue-500" },
    { name: "Yellow", value: "yellow", color: "bg-yellow-500" },
    { name: "Violet", value: "violet", color: "bg-violet-500" },
  ];

  const fontOptions = [
    { name: "Plus Jakarta Sans", value: "plus-jakarta-sans", preview: "Aa" },
    { name: "Inter", value: "inter", preview: "Aa" },
    { name: "Roboto", value: "roboto", preview: "Aa" },
    { name: "Open Sans", value: "open-sans", preview: "Aa" },
    { name: "Poppins", value: "poppins", preview: "Aa" },
    { name: "Nunito", value: "nunito", preview: "Aa" },
    { name: "Montserrat", value: "montserrat", preview: "Aa" },
  ];

  // Get current display values (temp or actual)
  const currentColor = tempColor || color;
  const currentFont = tempFont || font;

  // Check if there are unsaved changes
  const hasUnsavedChanges = tempColor !== null || tempFont !== null;

  const handleColorSelect = (selectedColor: string) => {
    setTempColor(
      selectedColor as
        | "red"
        | "rose"
        | "orange"
        | "green"
        | "blue"
        | "yellow"
        | "violet"
    );
  };

  const handleFontSelect = (selectedFont: string) => {
    setTempFont(
      selectedFont as
        | "inter"
        | "roboto"
        | "open-sans"
        | "poppins"
        | "nunito"
        | "montserrat"
        | "plus-jakarta-sans"
    );
  };

  const handleApply = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      applySettings();
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevert = () => {
    revertSettings();
  };

  return (
    <div className="grid gap-6 grid-full-wrapper">
      {/* Appearance Settings */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Pilih warna tema dan font untuk dashboard sesuai preferensi Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Colors */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2 text-sm md:text-base">
              <Palette className="h-4 w-4" />
              Theme Colors
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {colorOptions.map((option) => (
                <div
                  key={option.value}
                  className={`relative cursor-pointer rounded-lg border-2 p-3 sm:p-4 transition-all hover:scale-105 ${
                    currentColor === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleColorSelect(option.value)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full ${option.color}`} />
                    <div className="flex-1">
                      <p className="font-medium text-xs sm:text-sm">
                        {option.name}
                      </p>
                      {currentColor === option.value && (
                        <p className="text-xs text-muted-foreground">
                          {tempColor === option.value ? "Preview" : "Active"}
                        </p>
                      )}
                    </div>
                    {currentColor === option.value && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Font Selection */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2 text-sm md:text-base">
              <Type className="h-4 w-4" />
              Typography
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {fontOptions.map((option) => (
                <div
                  key={option.value}
                  className={`relative cursor-pointer rounded-lg border-2 p-3 sm:p-4 transition-all hover:scale-105 ${
                    currentFont === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleFontSelect(option.value)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p
                        className={`font-${option.value} font-medium text-xs sm:text-sm`}
                      >
                        {option.name}
                      </p>
                      <p
                        className={`font-${option.value} text-xs text-muted-foreground`}
                      >
                        {currentFont === option.value
                          ? tempFont === option.value
                            ? "Preview"
                            : "Active"
                          : "Sample text"}
                      </p>
                    </div>
                    {currentFont === option.value && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Preview */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm md:text-base">Preview</h4>
            <div className="p-3 sm:p-4 border rounded-lg bg-card">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-3">
                <Button size="sm">Primary Button</Button>
                <Button variant="outline" size="sm">
                  Secondary Button
                </Button>
                <Badge variant="secondary">Badge</Badge>
              </div>
              <div className="space-y-2">
                <h5 className="text-base md:text-lg font-semibold">
                  Sample Typography
                </h5>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Ini adalah preview bagaimana warna tema dan font akan terlihat
                  di seluruh aplikasi. Font yang dipilih akan diterapkan ke
                  semua teks dalam dashboard.
                </p>
                <div className="text-xs text-muted-foreground">
                  <p>Heading 1: Font weight dan style yang dipilih</p>
                  <p>Body text: Ukuran dan spacing yang konsisten</p>
                  <p>Small text: Untuk informasi tambahan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {hasUnsavedChanges && (
            <>
              <Separator />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Ada perubahan yang belum disimpan
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRevert}
                    disabled={isLoading}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Revert
                  </Button>
                  <Button size="sm" onClick={handleApply} disabled={isLoading}>
                    {isLoading ? (
                      <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Check className="h-4 w-4 mr-2" />
                    )}
                    Apply Changes
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Menu Builder / Menu Settings */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Menu className="h-5 w-5" />
            Menu Builder / Menu Settings
          </CardTitle>
          <CardDescription>
            Buat dan atur menu yang tampil di sidebar/dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-semibold text-sm md:text-base">Menu Items</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Manage sidebar menu items
              </p>
            </div>
            <Button size="sm" className="w-full sm:w-auto mt-2 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </Button>
          </div>

          <div className="space-y-3">
            {/* Card menu items tetap, hanya pastikan padding dan font size responsif */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                  <Layout className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Dashboard</p>
                  <p className="text-xs text-muted-foreground">
                    Main dashboard page
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Badge variant="secondary">Active</Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Move className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                  <Layout className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Users</p>
                  <p className="text-xs text-muted-foreground">
                    User management
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Badge variant="secondary">Active</Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Move className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 border rounded-lg opacity-60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                  <Layout className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Reports</p>
                  <p className="text-xs text-muted-foreground">
                    Analytics and reports
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Badge variant="outline">Inactive</Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Move className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <ToggleLeft className="h-5 w-5" />
            Feature Toggles
          </CardTitle>
          <CardDescription>
            Aktif/nonaktifkan fitur tertentu secara dinamis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">Dark Mode</p>
                <p className="text-xs text-muted-foreground">
                  Enable dark theme for users
                </p>
              </div>
              <Switch defaultChecked className="mt-2 sm:mt-0" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">Real-time Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Enable real-time push notifications
                </p>
              </div>
              <Switch defaultChecked className="mt-2 sm:mt-0" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">Advanced Analytics</p>
                <p className="text-xs text-muted-foreground">
                  Enable detailed analytics features
                </p>
              </div>
              <Switch className="mt-2 sm:mt-0" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">Multi-language Support</p>
                <p className="text-xs text-muted-foreground">
                  Enable multiple language options
                </p>
              </div>
              <Switch className="mt-2 sm:mt-0" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">API Rate Limiting</p>
                <p className="text-xs text-muted-foreground">
                  Enable API request rate limiting
                </p>
              </div>
              <Switch defaultChecked className="mt-2 sm:mt-0" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Widget Settings */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Layout className="h-5 w-5" />
            Widget Settings
          </CardTitle>
          <CardDescription>
            Kelola widget yang muncul di homepage dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm md:text-base">
                Available Widgets
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-green-600" />
                    <span className="text-xs sm:text-sm">Statistics Cards</span>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-green-600" />
                    <span className="text-xs sm:text-sm">Chart Widget</span>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs sm:text-sm">Recent Activity</span>
                  </div>
                  <Badge variant="outline">Inactive</Badge>
                </div>

                <div className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs sm:text-sm">Quick Actions</span>
                  </div>
                  <Badge variant="outline">Inactive</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm md:text-base">
                Widget Configuration
              </h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="widget-refresh">Auto Refresh Interval</Label>
                  <Input
                    id="widget-refresh"
                    type="number"
                    defaultValue="30"
                    placeholder="Seconds"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="widget-limit">Data Limit</Label>
                  <Input
                    id="widget-limit"
                    type="number"
                    defaultValue="10"
                    placeholder="Items per widget"
                    className="w-full"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="widget-animation" defaultChecked />
                  <Label htmlFor="widget-animation">Enable Animations</Label>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h4 className="font-semibold text-sm md:text-base">
                Widget Performance
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Current widget load time
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-semibold">1.2s</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Average load time
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
