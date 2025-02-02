"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Pack1, Pack2, Pack3 } from "@/assets/images/pack";

import { Button } from "@/components/ui/button";
import { CheckBroken } from "@/assets/svg";
import { ChevronsUpDown } from "lucide-react";
import { PackDetail } from "@/types";
import { PackForm } from "@/components/form/pack-form";
import { collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useSnackbar } from "notistack";

export default function Pack() {
  const { enqueueSnackbar } = useSnackbar();
  const [packs] = useCollectionOnce(collection(db, "packs"));

  async function souscribe(pack: PackDetail, name: string, id: string) {
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: pack.amount,
          type: "investment",
          pack: {
            id: id,
            name: name,
            roi: pack.roi,
            amount: pack.amount,
            number_of_day: pack.number_of_day,
          },
          status: "pending",
        }),
      });

      const json = await response.json();

      if (json?.state) {
        enqueueSnackbar("Votre investissement a été effectué avec succès !", {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      } else {
        enqueueSnackbar(
          "Une erreur s'est produite lors de votre investissement. Veuillez réessayer.",
          {
            variant: "error",
            preventDuplicate: true,
            autoHideDuration: 3000,
            anchorOrigin: { vertical: "top", horizontal: "center" },
          }
        );
        throw Error("Error while creating the transaction");
      }
    } catch (error) {}
  }

  function printPackForm(name: string) {
    const pack = packs?.docs.find((doc) => doc.data().name === name);
    return pack ? (
      <PackForm
        data={pack.data().details}
        onClick={async (packDetail) => {
          await souscribe(packDetail, pack.data().name, pack.id);
        }}
      />
    ) : null;
  }

  return (
    <section>
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-start md:gap-2 gap-8">
          <div className="w-full flex-1 shadow-custom rounded-lg">
            <div className="bg-primary px-4 py-2 rounded-t-lg">
              <h1 className="text-xl text-white font-bold">Pack Start</h1>
            </div>
            <div className="bg-primary">
              <Pack1 alt="" className="p-1" />
            </div>
            <div className="p-4 hidden md:block">
              <p className="text-xs md:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <div className="bg-primary flex justify-center items-center py-2 px-4">
              <div className="text-right">
                <h2 className="text-white text-xl lg:text-2xl xl:text-4xl font-bold">
                  50.000 FCFA
                </h2>
                <p className="text-white text-sm">Montant minimum</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-start items-center gap-3">
                <CheckBroken width={14} height={14} className="inline" />
                <p className="text-xs">
                  <span className="font-bold">Durées : </span>
                  7, 14 ou 21 jours
                </p>
              </div>
              <div className="flex justify-start items-center gap-3">
                <CheckBroken width={14} height={14} className="inline" />
                <p className="text-xs flex-1">
                  <span className="font-bold">Rendements : </span>
                  exemple concret comme 50,000 → 60,000 F CFA en 7 jours.
                </p>
              </div>
            </div>
            <div className="px-4 pb-4 md:pt-7">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button className="w-full mb-1">
                    Investir maintenant <ChevronsUpDown />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {printPackForm("pack start")}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
          <div className="w-full flex-1 shadow-custom rounded-lg">
            <div className="bg-primary px-4 py-2 rounded-t-lg">
              <h1 className="text-xl text-white font-bold">Pack Premiun</h1>
            </div>
            <div className="bg-primary">
              <Pack2 alt="" className="p-1" />
            </div>
            <div className="p-4 hidden md:block">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <div className="bg-primary flex justify-center items-center py-2 px-4">
              <div className="text-right">
                <h2 className="text-white text-xl lg:text-2xl xl:text-4xl font-bold">
                  250.000 FCFA
                </h2>
                <p className="text-white text-sm">Montant minimum</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-start items-center gap-3">
                <CheckBroken width={14} height={14} className="inline" />
                <p className="text-xs">
                  <span className="font-bold">Durées : </span>
                  10, 20 ou 30 jours
                </p>
              </div>
              <div className="flex justify-start items-center gap-3">
                <CheckBroken width={14} height={14} className="inline" />
                <p className="text-xs flex-1">
                  <span className="font-bold">Rendements : </span>
                  exemple concret comme 1.000.000 → 1.750.000 F CFA en 30 jours.
                </p>
              </div>
            </div>
            <div className="px-4 pb-4 md:pt-7">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button className="w-full mb-1">
                    Investir maintenant <ChevronsUpDown />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {printPackForm("pack premium")}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
          <div className="w-full flex-1 shadow-custom rounded-lg">
            <div className="bg-primary px-4 py-2 rounded-t-lg">
              <h1 className="text-xl text-white font-bold">Pack Business</h1>
            </div>
            <div className="bg-primary">
              <Pack3 alt="" className="p-1" />
            </div>
            <div className="p-4 hidden md:block">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <div className="bg-primary flex justify-center items-center py-2 px-4">
              <div className="text-right">
                <h2 className="text-white text-xl lg:text-2xl xl:text-4xl font-bold">
                  1.500.000 FCFA
                </h2>
                <p className="text-white text-sm">Montant minimum</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-start items-center gap-3">
                <CheckBroken width={14} height={14} className="inline" />
                <p className="text-xs">
                  <span className="font-bold">Durées : </span>
                  15, 30 ou 45 jours
                </p>
              </div>
              <div className="flex justify-start items-center gap-3">
                <CheckBroken width={14} height={14} className="inline" />
                <p className="text-xs flex-1">
                  <span className="font-bold">Rendements : </span>
                  exemple concret comme 1,500,000 → 2,500,000 F CFA en 45 jours.
                </p>
              </div>
            </div>
            <div className="px-4 pb-4 pt-2">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button className="w-full mb-1">
                    Investir maintenant <ChevronsUpDown />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {printPackForm("pack business")}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
