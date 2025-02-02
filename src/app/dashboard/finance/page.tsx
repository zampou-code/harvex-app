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
import { CardFinance } from "@/components/card/card-finance";
import { CardFinanceDetails } from "@/components/card/card-finance-details";
import { Separator } from "@/components/ui/separator";
import { Support10 } from "@/assets/images/supports";

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
      } catch (err: any) {}
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
                  <BreadcrumbPage>Finance</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-10 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-12">
            <div className="md:col-span-5 rounded-xl md:min-h-min">
              <h2 className="text-sm font-bold pb-2 pl-2">Finance</h2>
              <CardFinanceDetails account={account} />
              <div className="mt-2" />
              <CardFinance account={account} />
            </div>
            <div className="md:col-span-7 rounded-xl md:min-h-min overflow-hidden border border-primary">
              <Support10
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
