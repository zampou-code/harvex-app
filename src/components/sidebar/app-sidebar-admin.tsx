"use client";

import * as React from "react";

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
import { Lock } from "lucide-react";
import { Logo } from "@/assets/images";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { UserInfo } from "@/types";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: Lock,
    },
    {
      title: "Demande de retrait",
      url: "/dashboard/admin/withdraw",
      icon: Lock,
    },
    {
      title: "Demande d'investissement",
      url: "/dashboard/admin/investment",
      icon: Lock,
    },
    {
      title: "Verification de piece",
      url: "/dashboard/admin/kyc",
      icon: Lock,
    },
    {
      title: "Historique des transactions",
      url: "/dashboard/admin/transactions",
      icon: Lock,
    },
  ],
};

export function AppSidebarAdmin({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
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
              <Link href="/dashboard/admin">
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
              <Button className="w-full" asChild>
                <Link href="/dashboard">
                  <Lock />
                  Dashboard Client
                </Link>
              </Button>
              <div className="mt-2" />
            </>
          ) : null}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
