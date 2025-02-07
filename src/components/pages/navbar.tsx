"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Link } from "react-scroll";
import { Logo } from "@/assets/images";
import { Menu } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const menuItems = [
    { to: "home", label: "Accueil" },
    { to: "about-us", label: "A propos" },
    { to: "investment-plan", label: "Plans d'investissement" },
    { to: "faq", label: "Faq" },
    { to: "contacts", label: "Contacts" },
  ];

  const path = usePathname();

  function renderMenuItems() {
    return menuItems.map((menuItem) => {
      return path === "/" ? (
        <Link
          spy={true}
          offset={-80}
          smooth={true}
          duration={500}
          to={menuItem.to}
          key={menuItem.to}
          activeClass="text-primary underline"
          className="text-base hover:underline underline-offset-4 hover:text-primary cursor-pointer"
        >
          {menuItem.label}
        </Link>
      ) : (
        <NextLink
          key={menuItem.to}
          href={`/#${menuItem.to}`}
          className="text-base hover:underline underline-offset-4 hover:text-primary cursor-pointer"
        >
          {menuItem.label}
        </NextLink>
      );
    });
  }

  function renderAuthButton() {
    return (
      <>
        <Button variant="outline" asChild className="w-full">
          <NextLink href="/register">Inscription</NextLink>
        </Button>
        <Button className="w-full" asChild>
          <NextLink href="/login">Connexion</NextLink>
        </Button>
      </>
    );
  }

  return (
    <nav className="sticky w-full top-0 left-0 z-20 flex items-center justify-between px-7 sm:px-10 lg:px-10 xl:px-36 py-6 bg-white dark:bg-gray-800">
      <NextLink href="/#">
        <div className="w-auto h-9 cursor-pointer">
          <Logo alt="" className="w-full h-full object-contain" />
        </div>
      </NextLink>

      <div className="hidden lg:flex gap-5 lg:gap-10">{renderMenuItems()}</div>
      <div className="hidden lg:flex gap-2">{renderAuthButton()}</div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="lg:hidden border-black text-black"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="grid w-[200px] gap-5 p-4">{renderMenuItems()}</div>
          <div className="mt-4 space-y-2">{renderAuthButton()}</div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
