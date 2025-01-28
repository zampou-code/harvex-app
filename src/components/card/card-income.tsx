"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import NumberFlow from "@number-flow/react";
import { BadgeDollarSign } from "lucide-react";
import { Line, LineChart } from "recharts";

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
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function CardIcome() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold">Revenue total</CardTitle>
        <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pb-0">
        <NumberFlow
          value={15231}
          className="text-2xl font-bold"
          format={{
            style: "currency",
            currency: "XOF",
            trailingZeroDisplay: "stripIfInteger",
          }}
        />
        <p className="text-xs text-muted-foreground">
          <span className="text-primary">+20,1%</span> par rapport au mois
          dernier
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
