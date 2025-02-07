import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus, DollarSign, Loader } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Countdown from "react-countdown";
import NumberFlow from "@number-flow/react";
import { Transaction } from "@/types";
import { enqueueSnackbar } from "notistack";
import useProfit from "@/hooks/use-profit";

type CardInvestmentDetailsProps = {
  investment: Transaction;
};

export function CardInvestmentDetails(props: CardInvestmentDetailsProps) {
  const { investment } = props;
  const profit = useProfit(investment?.pack);
  const [loading, setLoading] = useState<boolean>(false);
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
        console.log(error);
        setRemainingDays(0);
      }
    }

    getRemainingDays();
  }, [investment]);

  const handleCreditClient = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "update-investment",
          investment: investment,
        }),
      });

      const json = await response.json();

      if (json?.state) {
        window.dispatchEvent(new CustomEvent("user-investment-updated"));
      }

      enqueueSnackbar(json?.message, {
        preventDuplicate: true,
        autoHideDuration: 5000,
        variant: json?.state ? "success" : "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } finally {
      setLoading(true);
    }
  };

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
              renderer={() => (
                <NumberFlow
                  className="text-xs font-bold"
                  value={Number(profit.toFixed(2)) || 0}
                  format={{
                    currency: "XOF",
                    style: "currency",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    trailingZeroDisplay: "stripIfInteger",
                  }}
                />
              )}
            />
          </div>
          {isForward ? (
            <Button
              className="flex-1"
              onClick={handleCreditClient}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : <CirclePlus />}
              Ajouter a mon compte
            </Button>
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
