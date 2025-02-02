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
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { PackDetail } from "@/types";

type PackFormProps = {
  data: PackDetail[];
  onClick: (data: PackDetail) => Promise<void>;
};

export function PackForm(props: PackFormProps) {
  const { data, onClick } = props;
  const [roi, setRoi] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string>("");

  useEffect(() => {
    if (data.length > 0) {
      setSelectedDuration(data[0].number_of_day.toString());
      setSelectedAmount(data[0].amount.toString());
      setRoi(data[0].roi);
    }
  }, [data]);

  const availableAmounts = [...new Set(data.map((d) => d.amount))];
  const availableDurations = [...new Set(data.map((d) => d.number_of_day))];

  const handleClick = async () => {
    if (selectedAmount && selectedDuration && roi) {
      setLoading(true);
      try {
        await onClick({
          roi,
          amount: +selectedAmount,
          number_of_day: +selectedDuration,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectionChange = (
    type: "duration" | "amount",
    value: string
  ) => {
    if (type === "duration") {
      setSelectedDuration(value);
    } else {
      setSelectedAmount(value);
    }

    const found = data.find(
      (d) =>
        d.number_of_day ===
          Number(type === "duration" ? value : selectedDuration) &&
        d.amount === Number(type === "amount" ? value : selectedAmount)
    );

    setRoi(found ? found.roi : 0);
  };

  return (
    <div className="border-t-2 border-primary pt-3 mt-3 grid gap-2">
      <div className="grid gap-2">
        <Label>Durée</Label>
        <Select
          value={selectedDuration}
          onValueChange={(value) => handleSelectionChange("duration", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez une durée" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availableDurations.map((duration) => (
                <SelectItem key={duration} value={duration.toString()}>
                  {duration} jours
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Montant</Label>
        <Select
          value={selectedAmount}
          onValueChange={(value) => handleSelectionChange("amount", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez un montant" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availableAmounts.map((amount) => (
                <SelectItem key={amount} value={amount.toString()}>
                  {amount.toLocaleString()} XOF
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>RSI</Label>
        <div className="w-full p-1 flex justify-center items-center rounded-xl border-2 border-primary border-dashed">
          <NumberFlow
            value={roi}
            format={{
              style: "currency",
              currency: "XOF",
              trailingZeroDisplay: "stripIfInteger",
            }}
            className="text-primary text-xl font-bold"
          />
        </div>
      </div>
      <Button className="w-full mt-2" onClick={handleClick} disabled={loading}>
        Valider {loading && <Loader className="animate-spin" />}
      </Button>
    </div>
  );
}
