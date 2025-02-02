"use client";

import { ReactNode } from "react";
import { SnackbarProvider } from "notistack";
type ProvidersLayout = {
  children: ReactNode;
};

export function ProvidersLayout(props: ProvidersLayout) {
  const { children } = props;
  return <SnackbarProvider>{children}</SnackbarProvider>;
}
