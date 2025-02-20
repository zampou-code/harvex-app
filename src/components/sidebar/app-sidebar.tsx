"use client";

import * as React from "react";

import {
  BadgeDollarSign,
  History,
  LayoutDashboard,
  LifeBuoy,
  Lock,
  Package,
  Send,
} from "lucide-react";
import { KYCBadge, Logo } from "@/assets/images";
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

import { Button } from "@/components/ui/button";
import Link from "next/link";
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
              <Link href="/dashboard">
                <div className="w-auto h-8 cursor-pointer">
                  <Logo alt="" className="w-full h-full object-contain" />
                </div>
                {user?.kyc?.status === "approved" && (
                  <div className="absolute top-3 right-0 w-5 h-5 z-20">
                    <KYCBadge alt="" className="w-full h-full object-contain" />
                  </div>
                )}
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
              <Button className="w-full" asChild>
                <Link href="/dashboard/admin">
                  <Lock />
                  Dashboard Admin
                </Link>
              </Button>
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
