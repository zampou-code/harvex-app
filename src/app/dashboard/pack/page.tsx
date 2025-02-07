"use client";

import { AccountBalance, UserInfo } from "@/types";
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
import { useEffect, useState } from "react";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Pack from "@/components/pages/dashboard/pack";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const [account, setAccount] = useState<
    | {
        user: UserInfo;
        account: AccountBalance;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/accounts");

        const json = await response.json();

        if (json?.state) {
          setAccount(json?.data);
        }
      } finally {
      }
    };

    fetchUserInfo();
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
                  <BreadcrumbPage>Pack d&apos;investissement</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-10 pt-0">
          <h2 className="text-sm font-bold">Pack d&apos;investissement</h2>
          <Pack account={account} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
