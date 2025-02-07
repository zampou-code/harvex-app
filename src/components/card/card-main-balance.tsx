"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart } from "recharts";
import { KYCBadge } from "@/assets/images";
import NumberFlow from "@number-flow/react";
import { AccountBalance, UserKYC } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { DialogMainBalanceWithdraw } from "@/components/dialog/dialog-main-balance-withdraw";

const data = [
  {
    revenue: Math.floor(Math.random() * 500),
  },
  {
    revenue: Math.floor(Math.random() * 500),
  },
  {
    revenue: Math.floor(Math.random() * 500),
  },
  {
    revenue: Math.floor(Math.random() * 500),
  },
  {
    revenue: Math.floor(Math.random() * 500),
  },
  {
    revenue: Math.floor(Math.random() * 500),
  },
  {
    revenue: Math.floor(Math.random() * 500),
  },
  {
    revenue: Math.floor(Math.random() * 500),
  },
];

const chartConfig = {
  revenue: {
    label: "Solde",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

type CardMainBalanceProps = {
  kyc?: UserKYC;
  account?: AccountBalance;
};
export function CardMainBalance(props: CardMainBalanceProps) {
  const { account, kyc } = props;

  return (
    <Card>
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
        {kyc?.status === "approved" && (
          <div className="absolute -top-4 -left-4 w-12 h-12">
            <KYCBadge alt="" className="w-full h-full object-contain" />
          </div>
        )}
        <CardTitle className="text-sm font-bold">Solde principal</CardTitle>
        <DialogMainBalanceWithdraw account={props} />
      </CardHeader>
      <CardContent className="pb-0">
        {account ? (
          <NumberFlow
            value={account?.main}
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
        <p className="text-xs text-muted-foreground">
          <span className="text-primary">Investissez maintenant</span> et
          maximiser vos rendements
        </p>
        <ChartContainer config={chartConfig} className="h-[80px] w-full pb-2">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="revenue"
              stroke="var(--color-revenue)"
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
