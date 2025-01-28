"use client";

import * as React from "react";

import {
  BadgeDollarSign,
  History,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Send,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { Logo } from "@/assets/images";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";

const data = {
  user: {
    sex: "M",
    name: "Jean marc",
    email: "m@example.com",
  },
  navMain: [
    {
      title: "Dashborad",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Pack d'investissements",
      url: "/dashboard/pack",
      icon: Package,
    },
    {
      title: "Investissements",
      url: "/dashboard/investment",
      icon: BadgeDollarSign,
    },
    {
      title: "Historiques",
      url: "/dashboard/historical",
      icon: History,
    },
  ],
  navSecondary: [
    {
      title: "Faq",
      url: "/dashboard/faq",
      icon: Send,
    },
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="w-auto h-8 cursor-pointer">
                  <Logo alt="" className="w-full h-full object-contain" />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
