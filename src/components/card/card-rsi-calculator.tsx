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
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import NumberFlow from "@number-flow/react";
import { PackData } from "@/types";
import { collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

export function CardRSICalculator() {
  const [packData, setPackData] = useState<PackData[] | null>(null);
  const [packs] = useCollectionOnce(collection(db, "packs"));

  const [selectedPack, setSelectedPack] = useState<PackData | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  useEffect(() => {
    const pack = packs?.docs.map((p) => {
      const packData = p.data();
      return {
        name: packData.name,
        details: packData.details,
      };
    });

    setPackData(pack || null);
  }, [packs]);

  const handlePackChange = (value: string) => {
    const pack = packData?.find((p) => p.name === value);
    setSelectedPack(pack || null);
    setSelectedDuration(null);
    setSelectedAmount(null);
  };

  const handleDurationChange = (value: string) => {
    setSelectedDuration(Number(value));
    setSelectedAmount(null);
  };

  const handleAmountChange = (value: string) => {
    setSelectedAmount(Number(value));
  };

  const roi = selectedPack?.details.find(
    (d) => d.number_of_day === selectedDuration && d.amount === selectedAmount
  )?.roi;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Calculateur RSI</CardTitle>
        <Button size="sm" asChild>
          <Link href="/dashboard/pack">
            Investir
            <ChevronRight className="-mr-1.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col items-center gap-2">
          <div className="flex gap-2 w-full">
            <div className="grid gap-2 flex-1">
              <Label>Pack</Label>
              <Select onValueChange={handlePackChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir un pack" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {packData?.map((pack) => (
                      <SelectItem key={pack.name} value={pack.name}>
                        {pack.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 flex-1">
              <Label>Durée</Label>
              <Select
                onValueChange={handleDurationChange}
                disabled={!selectedPack}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir une durée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Array.from(
                      new Set(selectedPack?.details.map((d) => d.number_of_day))
                    ).map((duration, index) => (
                      <SelectItem key={index} value={duration.toString()}>
                        {duration} jours
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2 w-full">
            <Label>Montant</Label>
            <Select
              onValueChange={handleAmountChange}
              disabled={!selectedDuration}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir un montant" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectedPack?.details
                    .filter((d) => d.number_of_day === selectedDuration)
                    .map((d, index) => (
                      <SelectItem key={index} value={d.amount.toString()}>
                        {d.amount.toLocaleString()} XOF
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full p-3 mt-3 flex justify-center items-center rounded-xl border-2 border-primary border-dashed">
            <NumberFlow
              value={roi || 0}
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
