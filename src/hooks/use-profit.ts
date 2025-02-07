import { useEffect, useState } from "react";

interface Pack {
  id: string;
  name: string;
  amount: number;
  end_date: Date;
  start_date: Date;
  number_of_day: number;
}

const ROI_TABLE: {
  name: string;
  days: number;
  values: Record<number, number>;
}[] = [
  // Pack Start
  {
    name: "pack start",
    days: 7,
    values: { 50000: 0.2, 100000: 0.15, 150000: 0.13, 200000: 0.15 },
  },
  {
    name: "pack start",
    days: 14,
    values: { 50000: 0.5, 100000: 0.35, 150000: 0.33, 200000: 0.475 },
  },
  {
    name: "pack start",
    days: 21,
    values: { 50000: 0.9, 100000: 0.65, 150000: 0.633, 200000: 0.85 },
  },

  // Pack Premium
  {
    name: "pack premium",
    days: 10,
    values: { 250000: 0.2, 500000: 0.2, 800000: 0.1875, 1000000: 0.2 },
  },
  {
    name: "pack premium",
    days: 20,
    values: { 250000: 0.56, 500000: 0.5, 800000: 0.4375, 1000000: 0.45 },
  },
  {
    name: "pack premium",
    days: 30,
    values: { 250000: 0.96, 500000: 0.9, 800000: 0.75, 1000000: 0.75 },
  },

  // Pack Business
  {
    name: "pack business",
    days: 15,
    values: {
      1500000: 0.33,
      2000000: 0.375,
      3000000: 0.333,
      4000000: 0.375,
      5000000: 0.4,
    },
  },
  {
    name: "pack business",
    days: 30,
    values: {
      1500000: 1.33,
      2000000: 0.9,
      3000000: 0.85,
      4000000: 0.75,
      5000000: 0.75,
    },
  },
  {
    name: "pack business",
    days: 45,
    values: {
      1500000: 2,
      2000000: 1.6,
      3000000: 1.5,
      4000000: 1.375,
      5000000: 1.34,
    },
  },
];

const getROI = (name: string, amount: number, days: number): number => {
  const pack = ROI_TABLE.find((p) => p.name === name && p.days === days);
  return pack?.values[amount] ?? 0;
};

const useProfit = (pack?: Pack) => {
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    if (!pack) return;

    const { name, amount, start_date, end_date, number_of_day } = pack;
    const roi = getROI(name, amount, number_of_day);
    const totalProfit = amount * roi; // Gain total attendu

    if (roi === 0) {
      console.warn("⚠️ ROI non trouvé pour ce pack.");
      return;
    }

    const startTime = new Date(start_date).getTime();
    const endTime = new Date(end_date).getTime();
    const totalDuration = endTime - startTime;

    const updateProfit = () => {
      const now = Date.now();

      if (now >= endTime) {
        setProfit(totalProfit);
        return;
      }

      const elapsedTime = now - startTime;
      const newProfit = (elapsedTime / totalDuration) * totalProfit;
      setProfit(newProfit);
    };

    const interval = setInterval(updateProfit, 1000);
    updateProfit();

    return () => clearInterval(interval);
  }, [pack]);

  return profit;
};

export default useProfit;
