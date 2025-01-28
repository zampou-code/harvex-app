import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  CardIcome,
  CardInvestment,
  CardRSICalculator,
  CardReferal,
} from "@/components/card";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TableCodchildren, TableInvestment } from "@/components/tables";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";

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
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-10 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <CardIcome />
            <CardInvestment />
            <CardReferal />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-12">
            <div className="md:col-span-7 rounded-xl md:min-h-min">
              <TableInvestment />
            </div>
            <div className="md:col-span-5 rounded-xl md:min-h-min">
              <div className="rounded-xl mb-4">
                <TableCodchildren />
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
