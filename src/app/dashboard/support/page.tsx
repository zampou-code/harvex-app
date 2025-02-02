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

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { CardSupportDetails } from "@/components/card/card-support-details";
import { Separator } from "@/components/ui/separator";
import { Support10 } from "@/assets/images/supports";

export default function Page() {
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
                  <BreadcrumbPage>Support</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-10 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-12">
            <div className="md:col-span-5 rounded-xl md:min-h-min">
              <h2 className="text-sm font-bold pb-2 pl-2">Support</h2>
              <CardSupportDetails />
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
