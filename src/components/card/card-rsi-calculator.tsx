"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import NumberFlow from "@number-flow/react";

export function CardRSICalculator() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Calculateur RSI</CardTitle>
        <Button variant="outline" size="sm">
          Investir
          <ChevronRight className="-mr-1.5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className=" w-full flex flex-col items-center gap-2">
          <div className="flex gap-2 w-full">
            <div className="grid gap-2 flex-1">
              <Label>Pack</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="H">Homme</SelectItem>
                    <SelectItem value="F">Femme</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 flex-1">
              <Label>Durée</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="H">Homme</SelectItem>
                    <SelectItem value="F">Femme</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2 w-full">
            <Label>Montant</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="H">Homme</SelectItem>
                  <SelectItem value="F">Femme</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full p-3 mt-3 flex justify-center items-center rounded-xl border-2 border-primary border-dashed">
            <NumberFlow
              value={100000}
              format={{
                style: "currency",
                currency: "XOF",
                trailingZeroDisplay: "stripIfInteger",
              }}
              className="text-primary text-xl font-bold"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
