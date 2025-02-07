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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardInvestmentDetails } from "@/components/card/card-investment-details";
import Link from "next/link";
import { Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@/types";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [investments, setInvestments] = useState<Transaction[]>([]);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/transactions");

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des investissements");
      }

      const json = await response.json();

      if (json?.state) {
        const investmentTransactions = json.data.filter(
          (transaction: Transaction) =>
            transaction.type === "investment" &&
            transaction.status === "approved"
        );

        setInvestments(investmentTransactions);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  useEffect(() => {
    window.addEventListener("user-investment-updated", fetchInvestments);
    return () => {
      window.removeEventListener("user-investment-updated", fetchInvestments);
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
                  <BreadcrumbPage>Investissements</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-10 pt-0">
          <h2 className="text-sm font-bold">Investissements</h2>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card
                  key={index}
                  className="flex flex-col gap-4 p-4 border rounded-lg"
                >
                  <Skeleton className="h-6 w-1/2"></Skeleton>
                  <Skeleton className="h-4 w-3/4"></Skeleton>
                  <Skeleton className="h-4 w-full"></Skeleton>
                  <Skeleton className="h-4 w-2/3"></Skeleton>
                </Card>
              ))
            ) : investments?.length ? (
              investments.map((investment) => (
                <CardInvestmentDetails
                  key={investment.id}
                  investment={investment}
                />
              ))
            ) : (
              <div className="col-span-3 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="text-xl font-semibold">
                  Vous n&apos;avez pas encore d&apos;investissement actif
                </div>
                <div className="text-muted-foreground mb-4">
                  Commencez dès maintenant à faire fructifier votre argent en
                  choisissant un de nos packs d&apos;investissement sécurisés et
                  rentables.
                </div>
                <Link href="/dashboard/pack">
                  <Button className="gap-2" size="lg">
                    <Package className="h-5 w-5" />
                    Démarrer un investissement
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
