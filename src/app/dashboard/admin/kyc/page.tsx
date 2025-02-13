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
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  TableAdminUsersKYC,
  UsersKYCData,
} from "@/components/tables/table-admin-users-kyc";
import { useEffect, useState } from "react";

import { AppSidebarAdmin } from "@/components/sidebar/app-sidebar-admin";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [usersKYCData, setUsersKYCData] = useState<UsersKYCData[]>([]);

  const fetchUsersKYCData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users/kyc");

      const json = await response.json();

      if (json?.state) {
        setUsersKYCData(json.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersKYCData();
  }, []);

  useEffect(() => {
    window.addEventListener("user-admin-updated", fetchUsersKYCData);
    return () => {
      window.removeEventListener("user-admin-updated", fetchUsersKYCData);
    };
  }, []);

  return (
    <SidebarProvider>
      <AppSidebarAdmin />
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
                  <BreadcrumbPage>Veification de piece</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-10 pt-0">
          <h2 className="text-sm font-bold">Verification de piece</h2>
          <TableAdminUsersKYC loading={loading} usersKYCData={usersKYCData} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
