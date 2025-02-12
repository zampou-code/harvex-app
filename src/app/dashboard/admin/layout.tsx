"use client";

import { useEffect, useState } from "react";

import { UserInfo } from "@/types";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch("/api/auth/me");
        const json = await response.json();

        if (json?.state) {
          if ((json?.data as UserInfo).role !== "admin") {
            redirect("/dashboard");
          } else {
            setIsAdmin(true);
          }
        } else {
          redirect("/dashboard");
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du rôle admin:", error);
        redirect("/dashboard");
      }
    };

    checkAdminStatus();
  }, []);

  if (isAdmin === null) {
    return null;
  }

  return <>{children}</>;
}
