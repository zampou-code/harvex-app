"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import NumberFlow from "@number-flow/react";
import { DollarSign } from "lucide-react";
import { Line, LineChart } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountBalance } from "@/types";

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
    label: "Parrainage",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

type CardReferralBalanceProps = {
  account?: AccountBalance;
};

export function CardReferralBalance(props: CardReferralBalanceProps) {
  const { account } = props;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold">Solde de parrainage</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pb-0">
        {account ? (
          <NumberFlow
            value={account?.affiliate}
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
          <span className="text-primary">Parrainez</span> pour maximiser vos
          gains de parrainage.
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
