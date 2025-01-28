import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "../ui/button";
import { DollarSign } from "lucide-react";
import NumberFlow from "@number-flow/react";

export function CardInvestmentDetails() {
  return (
    <Card>
      <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0 pb-0">
        <div>
          <CardTitle className="text-xl font-bold text-primary">
            Pack Business
          </CardTitle>
        </div>
        <div className="w-7 h-7 rounded-lg bg-primary flex justify-center items-center">
          <DollarSign className="h-4 w-4 text-muted-foreground text-white" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="w-full flex flex-wrap gap-1">
          <div className="h-full rounded-lg p-2 border-2 border-primary">
            <p className="text-xs">Temps restant</p>
            <p className="text-sm font-bold">10 : 10 : 10</p>
          </div>
          <div className="flex-1 h-full rounded-lg p-2 border-2 border-primary">
            <div className="flex flex-nowrap justify-between">
              <span className="text-xs">Nombre de jours: </span>
              <div className="text-xs font-bold">
                <NumberFlow value={10} />
                <span className="text-[8px]">/10jours</span>
              </div>
            </div>
            <div className="flex flex-nowrap justify-between">
              <span className="text-xs">Montant investir: </span>
              <NumberFlow
                className="text-xs font-bold"
                value={1152310}
                format={{
                  currency: "XOF",
                  style: "currency",
                  trailingZeroDisplay: "stripIfInteger",
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap justify-between items-center gap-2">
          <div>
            <p className="text-xs">Future gains:</p>
            <NumberFlow
              value={1152310}
              className="text-lg font-bold"
              format={{
                currency: "XOF",
                style: "currency",
                trailingZeroDisplay: "stripIfInteger",
              }}
            />
          </div>
          <Button className="flex-1" disabled>
            En cours...
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
