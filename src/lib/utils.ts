import { clsx, type ClassValue } from "clsx";
import { type NextRequest, NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function redirectIfNotOn(
  currentPath: string,
  targetPath: string,
  request: NextRequest
) {
  if (currentPath !== targetPath) {
    return NextResponse.redirect(new URL(targetPath, request.nextUrl.origin));
  }

  return null;
}
