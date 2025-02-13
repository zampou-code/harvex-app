"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader, Loader2, Trash } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useCallback, useEffect, useState } from "react";

import { AppSidebarAdmin } from "@/components/sidebar/app-sidebar-admin";
import { Button } from "@/components/ui/button";
import { CardAccounts } from "@/components/card/admin/card-accounts";
import { CardInfo } from "@/components/card/admin/card-info";
import { CardShowKyc } from "@/components/card/admin/card-show-kyc";
import { DashbordAdminData } from "@/components/tables/table-admin-users";
import { Separator } from "@/components/ui/separator";
import { TableAdminTransactions } from "@/components/tables/table-admin-transactions";
import { enqueueSnackbar } from "notistack";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [userDetails, setUserDetails] = useState<DashbordAdminData | null>(
    null
  );

  const fetchUserDetails = useCallback(async () => {
    try {
      if (!userId) return;
      console.log(userId);

      setLoading(true);
      const response = await fetch("/api/admin/users/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });

      const json = await response.json();

      if (json?.state) {
        setUserDetails(json.data);
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const handleDeleteTransaction = async () => {
    try {
      setDeleteLoading(true);

      const res = await fetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({
          type: "delete-user",
          user: userDetails?.user,
        }),
      });

      const json = await res.json();

      if (json?.state) {
        window.dispatchEvent(new CustomEvent("user-admin-updated"));
      }

      enqueueSnackbar(json?.message, {
        preventDuplicate: true,
        autoHideDuration: 5000,
        variant: json?.state ? "success" : "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    window.addEventListener("user-info-updated", fetchUserDetails);
    return () => {
      window.removeEventListener("user-info-updated", fetchUserDetails);
    };
  }, [fetchUserDetails]);

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
                  <BreadcrumbPage>
                    Details de l&lsquo;utilisateur
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-10 pt-0">
          <h2 className="text-sm font-bold">Details de l&lsquo;utilisateur</h2>

          {userDetails ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CardInfo user={userDetails.user} />
                <CardShowKyc user={userDetails.user} />
              </div>
              <CardAccounts
                user={userDetails.user}
                account={userDetails.account}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Historique des transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <TableAdminTransactions
                    loading={loading}
                    transactions={userDetails.transactions}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Supprimer l&apos;utilisateur</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleDeleteTransaction}
                  >
                    {deleteLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <Trash />
                    )}
                    Supprimer l&apos;utilisateur
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              {loading ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <span>Aucune donnée disponible</span>
              )}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
