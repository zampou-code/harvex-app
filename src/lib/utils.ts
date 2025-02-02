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

// ------

function generateUUID(): string {
  return "xxxxxxxx-xxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export type Transaction = {
  id: string;
  amount: number;
  user_id: string;
  fee_amount: number;
  payment_mean?: "orange" | "wave" | "crypto";
  account: "main" | "affilate";
  type: "investment" | "deposit" | "withdraw";
  status: "pending" | "success" | "error" | "expired";
  pack?: {
    id: string;
    roi: number;
    name: string;
    amount: number;
    end_date: Date;
    start_date: Date;
    number_of_day: number;
  };
  created_at: Date;
};

const getRandomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

const generateTransaction = (): Transaction => {
  const types = ["investment", "deposit", "withdraw"] as const;
  const statuses = ["pending", "success", "error", "expired"] as const;
  const accounts = ["main", "affilate"] as const;
  const paymentMeans = ["orange", "wave", "crypto"] as const;
  const hasPack = Math.random() > 0.7;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30));
  const numberOfDays = Math.floor(Math.random() * 30) + 1;
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + numberOfDays);

  return {
    id: generateUUID(),
    amount: parseFloat((Math.random() * 1000).toFixed(2)),
    user_id: generateUUID(),
    fee_amount: parseFloat((Math.random() * 50).toFixed(2)),
    payment_mean:
      Math.random() > 0.5 ? getRandomElement([...paymentMeans]) : undefined,
    account: getRandomElement([...accounts]),
    type: getRandomElement([...types]),
    status: getRandomElement([...statuses]),
    pack: hasPack
      ? {
          id: generateUUID(),
          roi: parseFloat((Math.random() * 20).toFixed(2)),
          name: `Pack ${Math.floor(Math.random() * 10) + 1}`,
          amount: parseFloat((Math.random() * 1000).toFixed(2)),
          end_date: endDate,
          start_date: startDate,
          number_of_day: numberOfDays,
        }
      : undefined,
    created_at: new Date(),
  };
};

export const transactions: Transaction[] = Array.from(
  { length: 100 },
  generateTransaction
);
