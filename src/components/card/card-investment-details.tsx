import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Countdown from "react-countdown";
import { DollarSign } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { Transaction } from "@/types";

type CardInvestmentDetailsProps = {
  investment: Transaction;
};

export function CardInvestmentDetails(props: CardInvestmentDetailsProps) {
  const { investment } = props;
  const [isForward, setIsForward] = useState<boolean>(false);
  const [remainingDays, setRemainingDays] = useState<number>(0);

  useEffect(() => {
    async function getRemainingDays() {
      try {
        const response = await fetch("/api/remaining-days", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            end_date: investment?.pack?.end_date,
          }),
        });

        const json = await response.json();

        if (json?.state) {
          setRemainingDays(json?.data?.remaining_days || 0);
        }
      } catch (error) {
        setRemainingDays(0);
      }
    }

    getRemainingDays();
  }, [investment]);

  return (
    <Card>
      <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0 pb-0">
        <div>
          <CardTitle className="text-xl font-bold text-primary capitalize">
            {investment?.pack?.name}
          </CardTitle>
        </div>
        <div className="w-7 h-7 rounded-lg bg-primary flex justify-center items-center">
          <DollarSign className="h-4 w-4 text-muted-foreground text-white" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="w-full flex flex-wrap gap-1">
          <div className="h-full rounded-lg p-2 pb-1  border border-primary">
            <p className="text-xs">Future gains</p>
            <NumberFlow
              value={investment?.pack?.roi || 0}
              className="text-[14px] font-bold"
              format={{
                currency: "XOF",
                style: "currency",
                trailingZeroDisplay: "stripIfInteger",
              }}
            />
          </div>
          <div className="flex-1 h-full rounded-lg p-2 border border-primary">
            <div className="flex flex-nowrap justify-between">
              <span className="text-xs">Nombre de jours </span>
              <div className="text-xs font-bold">
                <NumberFlow value={remainingDays} />
                <span className="text-[8px]">
                  /{investment?.pack?.number_of_day || 0} jours
                </span>
              </div>
            </div>
            <div className="flex flex-nowrap justify-between">
              <span className="text-xs">Montant inv. </span>
              <NumberFlow
                className="text-xs font-bold"
                value={investment?.pack?.amount || 0}
                format={{
                  currency: "XOF",
                  style: "currency",
                  trailingZeroDisplay: "stripIfInteger",
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap justify-between items-end gap-2">
          <div>
            <p className="text-xs">Temps restant</p>
            <Countdown
              date={investment?.pack?.end_date}
              onComplete={() => setIsForward(true)}
              renderer={({ days, hours, minutes, seconds }) => (
                <div className="flex justify-between items-center gap-1">
                  <div className="text-center">
                    <NumberFlow className="font-bold" value={days} />
                    <div className="text-[8px] -mt-2">jours</div>
                  </div>
                  <div className="text-center">
                    <NumberFlow className="font-bold" value={hours} />
                    <div className="text-[8px] -mt-2">heurs</div>
                  </div>
                  <div className="text-center">
                    <NumberFlow className="font-bold" value={minutes} />
                    <div className="text-[8px] -mt-2">minutes</div>
                  </div>
                  <div className="text-center">
                    <NumberFlow className="font-bold" value={seconds} />
                    <div className="text-[8px] -mt-2">seconds</div>
                  </div>
                </div>
              )}
            />
          </div>
          {isForward ? (
            <Button className="flex-1">Ajouter a mon compte</Button>
          ) : (
            <Button
              disabled
              className="flex-1 bg-slate-200 shadow-none text-black"
            >
              En cours...
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
