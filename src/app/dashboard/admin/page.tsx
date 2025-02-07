"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DashbordAdminData,
  TableAdminUsers,
} from "@/components/tables/table-admin-users";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dashbordAdminData, setDashbordAdminData] = useState<
    DashbordAdminData[]
  >([]);

  const fetchDashbordAdminData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");

      const json = await response.json();

      if (json?.state) {
        setDashbordAdminData(json.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashbordAdminData();
  }, []);

  useEffect(() => {
    window.addEventListener("user-admin-updated", fetchDashbordAdminData);
    return () => {
      window.removeEventListener("user-admin-updated", fetchDashbordAdminData);
    };
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4 lg:px-10 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard admin</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-10 pt-0">
          <h2 className="text-sm font-bold">Dashboard admin</h2>
          <TableAdminUsers
            loading={loading}
            dashboardData={dashbordAdminData}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
