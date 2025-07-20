"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { SidebarTrigger } from "../components/ui/sidebar";
import { ThemeSelector } from "../components/theme-selector";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

export function SiteHeader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Interface untuk breadcrumb item
  interface BreadcrumbItem {
    label: string;
    href: string;
    isLast: boolean;
  }

  // Fungsi untuk mengubah pathname menjadi breadcrumb items
  const getBreadcrumbItems = (path: string): BreadcrumbItem[] => {
    const segments = path.split("/").filter(Boolean);

    if (segments.length === 0) {
      return [{ label: "Dashboard", href: "/dashboard", isLast: true }];
    }

    const items: BreadcrumbItem[] = [];
    let currentPath = "";

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;

      // Mapping untuk label yang lebih user-friendly
      const labelMap: Record<string, string> = {
        dashboard: "Dashboard",
        entries: "Entries",
        user: "User",
        prize: "Prize",
        projects: "Projects",
        team: "Team",
        settings: "Settings",
        help: "Help",
        search: "Search",
        documents: "Documents",
        "data-library": "Data Library",
        reports: "Reports",
        "word-assistant": "Word Assistant",
        data: "Data",
        approved: "Approved",
        summary: "Summary",
        "consumer-data": "Consumer Data",
        registrations: "Registrations",
        whitelist: "Whitelist",
        blacklist: "Blacklist",
        allocation: "Allocation",
      };

      const label =
        (segment && labelMap[segment]) ||
        (segment
          ? segment
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          : "");

      items.push({
        label,
        href: currentPath,
        isLast: i === segments.length - 1,
      });
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems(pathname);

  return (
    <div suppressHydrationWarning>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          {mounted ? (
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((item) => (
                  <React.Fragment key={item.href}>
                    <BreadcrumbItem>
                      {item.isLast ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={item.href}>
                          {item.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!item.isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          ) : (
            <h1 className="text-base font-medium">Dashboard</h1>
          )}
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              asChild
              size="sm"
              className="hidden sm:flex"
            >
              <a className="dark:text-foreground">Kokokrunch x Superman</a>
            </Button>
            <ThemeSelector />
          </div>
        </div>
      </header>
    </div>
  );
}
