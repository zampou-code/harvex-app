"use client";

import { AccountBalance, UserInfo } from "@/types";
import { BadgeDollarSign, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import NumberFlow from "@number-flow/react";
import { Skeleton } from "@/components/ui/skeleton";

type CardFinanceDetailsProps = {
  account?: {
    user: UserInfo;
    account: AccountBalance;
  };
};

export function CardFinanceDetails(props: CardFinanceDetailsProps) {
  const { account } = props;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold">Solde principal</h2>
            <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          {account ? (
            <NumberFlow
              value={account?.account?.main}
              className="text-2xl font-bold"
              format={{
                style: "currency",
                currency: "XOF",
                trailingZeroDisplay: "stripIfInteger",
              }}
            />
          ) : (
            <Skeleton className="w-full h-7 mb-2" />
          )}
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold">Solde de parrainage</h2>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          {account ? (
            <NumberFlow
              value={account?.account?.affiliate}
              className="text-2xl font-bold"
              format={{
                style: "currency",
                currency: "XOF",
                trailingZeroDisplay: "stripIfInteger",
              }}
            />
          ) : (
            <Skeleton className="w-full h-7 mb-2" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
