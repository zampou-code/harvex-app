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
import { Separator } from "@/components/ui/separator";
import { TableAdminTransactions } from "@/components/tables/table-admin-transactions";
import { Transaction } from "@/types";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/transactions");

      const json = await response.json();

      if (json?.state) {
        const investmentTransactions = json.data.filter(
          (transaction: Transaction) =>
            transaction.type === "investment" &&
            transaction.status === "pending"
        );

        setTransactions(investmentTransactions);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    window.addEventListener("transaction-admin-updated", fetchTransactions);
    return () => {
      window.removeEventListener(
        "transaction-admin-updated",
        fetchTransactions
      );
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
                  <BreadcrumbPage>Demande d&apos;insvest. admin</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-10 pt-0">
          <h2 className="text-sm font-bold">
            Demande d&apos;insvestissement admin
          </h2>
          <TableAdminTransactions
            loading={loading}
            transactions={transactions}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
