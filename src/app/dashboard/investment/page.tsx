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
import { useEffect, useState } from "react";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Card } from "@/components/ui/card";
import { CardInvestmentDetails } from "@/components/card/card-investment-details";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@/types";

export default function Page() {
  const [investments, setInvestments] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch("/api/transactions");

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des investissements");
        }

        const json = await response.json();

        if (json?.state) {
          const investmentTransactions = json.data.filter(
            (transaction: Transaction) => transaction.type === "investment"
          );

          setInvestments(investmentTransactions);
        }
      } finally {
      }
    };

    fetchInvestments();
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
                  <BreadcrumbPage>Investissements</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-10 pt-0">
          <h2 className="text-sm font-bold">Investissements</h2>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {investments?.length ? (
              investments.map((investment) => (
                <CardInvestmentDetails
                  key={investment.id}
                  investment={investment}
                />
              ))
            ) : (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card
                    key={index}
                    className="flex flex-col gap-4 p-4 border rounded-lg"
                  >
                    <Skeleton className="h-6 w-1/2"></Skeleton>
                    <Skeleton className="h-4 w-3/4"></Skeleton>
                    <Skeleton className="h-4 w-full"></Skeleton>
                    <Skeleton className="h-4 w-2/3"></Skeleton>
                  </Card>
                ))}
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
