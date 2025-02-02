"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  SquareAsterisk,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { man, woman } from "@/assets/images/pp";

import { KYCBadge } from "@/assets/images";
import Link from "next/link";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { UserInfo } from "@/types";
import { useRouter } from "next/navigation";

type NavUserProps = {
  user?: UserInfo;
};

export function NavUser(props: NavUserProps) {
  const { user } = props;
  const router = useRouter();
  const { isMobile } = useSidebar();

  async function logOut() {
    try {
      const res = await fetch("/api/auth/logout");
      const json = await res.json();

      if (json?.state) {
        router.push("/");
      }
    } catch (error) {}
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {user ? (
                <>
                  {user?.kyc?.status === "approved" && (
                    <div className="absolute top-0 left-0 w-5 h-5 z-20">
                      <KYCBadge
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      alt={user?.firstname}
                      className="bg-primary object-contain p-1"
                      src={user.sex === "M" ? man.src : woman.src}
                    />
                    <AvatarFallback className="rounded-lg">HG</AvatarFallback>
                  </Avatar>
                </>
              ) : (
                <Skeleton className="h-8 w-8 rounded-lg" />
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                {user ? (
                  <>
                    <span className="truncate font-semibold">{`${user.firstname} ${user.lastname}`}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </>
                ) : (
                  <>
                    <Skeleton className="w-full h-2 mb-2.5" />
                    <Skeleton className="w-full h-2" />
                  </>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={4}
            side={isMobile ? "bottom" : "right"}
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {user ? (
                  <>
                    {user?.kyc?.status === "approved" && (
                      <div className="absolute top-1 left-1 w-5 h-5 z-20">
                        <KYCBadge
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        alt={user?.firstname}
                        className="bg-primary object-contain p-1"
                        src={user.sex === "M" ? man.src : woman.src}
                      />
                      <AvatarFallback className="rounded-lg">HG</AvatarFallback>
                    </Avatar>
                  </>
                ) : (
                  <Skeleton className="h-8 w-8 rounded-lg" />
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {user ? (
                    <>
                      <span className="truncate font-semibold">{`${user.firstname} ${user.lastname}`}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </>
                  ) : (
                    <>
                      <Skeleton className="w-full h-2 mb-2.5" />
                      <Skeleton className="w-full h-2" />
                    </>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/dashboard/profil">
                  <BadgeCheck />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/dashboard/profil#KYC">
                  <CreditCard />
                  KYC
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/dashboard/profil#password">
                  <SquareAsterisk />
                  Mot de passe
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logOut} className="cursor-pointer">
              <LogOut />
              Deconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
