"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { JSX, SVGProps } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Support10,
  Support3,
  Support4,
  Support9,
} from "@/assets/images/supports";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Button } from "@/components/ui/button";
import { CardSupportDetails } from "@/components/card/card-support-details";
import Link from "next/link";
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card className="rounded-xl overflow-hidden">
              <CardHeader className="p-0">
                <Support3
                  alt="Support 3"
                  className="w-full h-full object-cover"
                />
              </CardHeader>
              <CardContent className="p-4 text-center">
                <p className="text-sm font-medium text-center">
                  WhatsApp: +225 0713065959
                </p>
                <Button className="w-full mt-3" asChild>
                  <Link href="https://wa.me/message/NJKVE6SPAMT4L1">
                    <Wha fill="#fff" /> Discuter maintenant
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="rounded-xl overflow-hidden">
              <CardHeader className="p-0">
                <Support4
                  alt="Support 4"
                  className="w-full h-full object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm font-medium text-center">
                  WhatsApp: +225 0718101078
                </p>
                <Button className="w-full mt-3" asChild>
                  <Link href="https://wa.me/message/GG4KDJEIZMVSA1">
                    <Wha fill="#fff" /> Discuter maintenant
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="rounded-xl overflow-hidden">
              <CardHeader className="p-0">
                <Support9
                  alt="Support 9"
                  className="w-full h-full object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm font-medium text-center">
                  WhatsApp: +223 70 62 56 84
                </p>
                <Button className="w-full mt-3" asChild>
                  <Link href="https://wa.me/+22370625684">
                    <Wha fill="#fff" /> Discuter maintenant
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

const Wha = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="800px"
    height="800px"
    viewBox="-2 -2 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMin"
    className="jam jam-whatsapp"
    {...props}
  >
    <path d="M9.516.012C4.206.262.017 4.652.033 9.929a9.798 9.798 0 0 0 1.085 4.465L.06 19.495a.387.387 0 0 0 .47.453l5.034-1.184a9.981 9.981 0 0 0 4.284 1.032c5.427.083 9.951-4.195 10.12-9.58C20.15 4.441 15.351-.265 9.516.011zm6.007 15.367a7.784 7.784 0 0 1-5.52 2.27 7.77 7.77 0 0 1-3.474-.808l-.701-.347-3.087.726.65-3.131-.346-.672A7.62 7.62 0 0 1 2.197 9.9c0-2.07.812-4.017 2.286-5.48a7.85 7.85 0 0 1 5.52-2.271c2.086 0 4.046.806 5.52 2.27a7.672 7.672 0 0 1 2.287 5.48c0 2.052-.825 4.03-2.287 5.481z" />
    <path d="M14.842 12.045l-1.931-.55a.723.723 0 0 0-.713.186l-.472.478a.707.707 0 0 1-.765.16c-.913-.367-2.835-2.063-3.326-2.912a.694.694 0 0 1 .056-.774l.412-.53a.71.71 0 0 0 .089-.726L7.38 5.553a.723.723 0 0 0-1.125-.256c-.539.453-1.179 1.14-1.256 1.903-.137 1.343.443 3.036 2.637 5.07 2.535 2.349 4.566 2.66 5.887 2.341.75-.18 1.35-.903 1.727-1.494a.713.713 0 0 0-.408-1.072z" />
  </svg>
);
