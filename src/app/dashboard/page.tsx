"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  CardMainBalance,
  CardRSICalculator,
  CardReferal,
  CardReferralBalance,
} from "@/components/card";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TableGodchildren, TableInvestment } from "@/components/tables";
import { useEffect, useState } from "react";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { DashboardData } from "@/types";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const fetchDashboardData = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/dashboard");

      const json = await response.json();

      if (json?.state) {
        setDashboardData(json?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    window.addEventListener("dashboard-data-updated", fetchDashboardData);
    return () => {
      window.removeEventListener("dashboard-data-updated", fetchDashboardData);
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
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-10 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <CardMainBalance
              kyc={dashboardData?.user?.kyc}
              account={dashboardData?.account}
            />
            <CardReferralBalance account={dashboardData?.account} />
            <CardReferal
              user={dashboardData?.user}
              referrals={dashboardData?.referrals}
            />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-12">
            <div className="md:col-span-7 rounded-xl md:min-h-min">
              <TableInvestment
                loading={loading}
                transactions={dashboardData?.transactions}
              />
            </div>
            <div className="md:col-span-5 rounded-xl md:min-h-min">
              <div className="rounded-xl mb-4">
                <TableGodchildren
                  loading={loading}
                  referrals={dashboardData?.referrals}
                />
              </div>
              <div className="rounded-xl">
                <CardRSICalculator />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
