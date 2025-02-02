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
import { CardInfo } from "@/components/card/card-info";
import { CardKYC } from "@/components/card/cark-kyc";
import { CardPassword } from "@/components/card/card-password";
import { HistoricalImage } from "@/assets/images";
import { Separator } from "@/components/ui/separator";
import { UserInfo } from "@/types";

export default function Page() {
  const [user, setUser] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/auth/me");

        const json = await response.json();

        if (json?.state) {
          setUser(json?.data);
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
                  <BreadcrumbPage>Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-10 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-12">
            <div className="md:col-span-8 rounded-xl md:min-h-min">
              <h2 className="text-sm font-bold pb-2 pl-2">Profile</h2>
              <CardInfo user={user} />
              <h2 className="text-sm font-bold py-2 pl-2">KYC</h2>
              <CardKYC user={user} />
              <h2 className="text-sm font-bold py-2 pl-2">Mot de passe</h2>
              <CardPassword user={user} />
            </div>
            <div className="md:col-span-4 rounded-xl md:min-h-min overflow-hidden hidden md:block">
              <HistoricalImage
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
