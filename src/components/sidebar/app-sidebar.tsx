"use client";

import * as React from "react";

import {
  BadgeDollarSign,
  HandCoins,
  History,
  LayoutDashboard,
  LifeBuoy,
  Lock,
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
import { useEffect, useState } from "react";

import Link from "next/link";
import { Logo } from "@/assets/images";
import { NavAdmin } from "./nav-admin";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import { UserInfo } from "@/types";

const data = {
  navMain: [
    {
      title: "Dashborad",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Finance",
      url: "/dashboard/finance",
      icon: HandCoins,
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
      url: "/dashboard/support",
      icon: LifeBuoy,
    },
  ],

  navAdmin: [
    {
      title: "Dashboard admin",
      url: "/dashboard/admin",
      icon: Lock,
    },
    {
      title: "Admin transactions",
      url: "/dashboard/admin/transactions",
      icon: Lock,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<UserInfo | undefined>(undefined);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("/api/auth/me");

      const json = await response.json();

      if (json?.state) {
        setUser(json?.data);
      }
    } finally {
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    window.addEventListener("user-info-updated", fetchUserInfo);
    return () => {
      window.removeEventListener("user-info-updated", fetchUserInfo);
    };
  }, []);

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
        <div className="mt-auto">
          {user?.role === "admin" ? (
            <>
              <NavAdmin items={data.navAdmin} />
              <div className="mt-2" />
            </>
          ) : null}
          <NavSecondary items={data.navSecondary} />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
