"use client";

import Link from "next/link";
import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "../components/nav-main";
import { NavSecondary } from "../components/nav-secondary";
import { NavUser } from "../components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar";

const data = {
  user: {
    name: "Rifky Baladraf",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Entries",
      url: "/entries",
      icon: IconListDetails,
      items: [
        {
          title: "Data",
          url: "/entries/data",
        },
        {
          title: "Approved",
          url: "/entries/approved",
        },
        {
          title: "Summary",
          url: "/entries/summary",
        },
      ],
    },
    {
      title: "User",
      url: "/user",
      icon: IconUsers,
      items: [
        {
          title: "Consumer Data",
          url: "/user/consumer-data",
        },
        {
          title: "Registrations",
          url: "/user/registrations",
        },
        {
          title: "Whitelist",
          url: "/user/whitelist",
        },
        {
          title: "Blacklist",
          url: "/user/blacklist",
        },
      ],
    },
    {
      title: "Prize",
      url: "/prize",
      icon: IconChartBar,
      items: [
        {
          title: "Summary",
          url: "/prize/consumer-data",
        },
        {
          title: "Allocation",
          url: "/prize/registrations",
        },
        {
          title: "Whitelist",
          url: "/user/whitelist",
        },
        {
          title: "Blacklist",
          url: "/user/blacklist",
        },
      ],
    },
    {
      title: "Projects",
      url: "/projects",
      icon: IconFolder,
      items: [
        {
          title: "Active Projects",
          url: "/projects/active",
        },
        {
          title: "Completed",
          url: "/projects/completed",
        },
      ],
    },
    {
      title: "Team",
      url: "/team",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Promo Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/search",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Redbox Digital</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
