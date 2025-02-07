"use client";

import { AccountBalance, PackDetail, UserInfo } from "@/types";
import { ChevronsUpDown, LifeBuoy } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Pack1, Pack2, Pack3 } from "@/assets/images/pack";
import { closeSnackbar, enqueueSnackbar } from "notistack";

import { Button } from "@/components/ui/button";
import { CheckBroken } from "@/assets/svg";
import Link from "next/link";
import { PackForm } from "@/components/form/pack-form";
import { Skeleton } from "@/components/ui/skeleton";
import { collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

type PackProps = {
  account?: { user: UserInfo; account: AccountBalance };
};

export default function Pack(props: PackProps) {
  const { account } = props;
  const [packs] = useCollectionOnce(collection(db, "packs"));

  async function souscribe(
    pack: PackDetail & { action: "demande" | "account" },
    name: string,
    id: string
  ) {
    if (
      account?.account?.main &&
      pack.action === "account" &&
      account.account.main < pack.amount
    ) {
      enqueueSnackbar(
        `Solde est insuffisant pour effectuer cet investissement. Votre solde actuel est de ${new Intl.NumberFormat(
          "fr-FR",
          { style: "currency", currency: "XOF" }
        ).format(account.account.main)}.`,
        {
          variant: "error",
          autoHideDuration: 5000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        }
      );

      return;
    }

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account: "main",
          type: "investment",
          action: pack.action,
          amount: pack.amount,
          pack: {
            id: id,
            name: name,
            roi: pack.roi,
            amount: pack.amount,
            number_of_day: pack.number_of_day,
          },
        }),
      });

      const json = await response.json();

      enqueueSnackbar(json?.message, {
        variant: json?.state ? "success" : "error",
        persist: json?.state && pack.action === "demande",
        autoHideDuration: json?.state ? undefined : 5000,
        anchorOrigin: { vertical: "top", horizontal: "center" },
        action:
          json?.state && pack.action === "demande"
            ? (snackbarId) => (
                <>
                  <Button
                    className="mr-4"
                    variant="destructive"
                    onClick={() => closeSnackbar(snackbarId)}
                  >
                    Fermer
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link href="/dashboard/support">
                      <LifeBuoy />
                      Support
                    </Link>
                  </Button>
                </>
              )
            : null,
      });
    } finally {
    }
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
                Idéal pour débuter, ce pack offre une introduction simple et
                accessible au monde des investissements.
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
              {account ? (
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
              ) : (
                <Skeleton className="w-full h-9 mb-2" />
              )}
            </div>
          </div>
          <div className="w-full flex-1 shadow-custom rounded-lg">
            <div className="bg-black px-4 py-2 rounded-t-lg">
              <h1 className="text-xl text-white font-bold">Pack Premiun</h1>
            </div>
            <div className="bg-black">
              <Pack2 alt="" className="p-1" />
            </div>
            <div className="p-4 hidden md:block">
              <p className="text-sm">
                Pour les investisseurs intermédiaires cherchant à maximiser
                leurs rendements avec un risque modéré.
              </p>
            </div>
            <div className="bg-black flex justify-center items-center py-2 px-4">
              <div className="text-right">
                <h2 className="text-white text-xl lg:text-2xl xl:text-4xl font-bold">
                  250.000 FCFA
                </h2>
                <p className="text-white text-sm">Montant minimum</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-start items-center gap-3">
                <CheckBroken
                  color="black"
                  width={14}
                  height={14}
                  className="inline"
                />
                <p className="text-xs">
                  <span className="font-bold">Durées : </span>
                  10, 20 ou 30 jours
                </p>
              </div>
              <div className="flex justify-start items-center gap-3">
                <CheckBroken
                  color="black"
                  width={14}
                  height={14}
                  className="inline"
                />
                <p className="text-xs flex-1">
                  <span className="font-bold">Rendements : </span>
                  exemple concret comme 1.000.000 → 1.750.000 F CFA en 30 jours.
                </p>
              </div>
            </div>
            <div className="px-4 pb-4 md:pt-7">
              {account ? (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button className="w-full mb-1 bg-black hover:bg-black/90">
                      Investir maintenant <ChevronsUpDown />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {printPackForm("pack premium")}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Skeleton className="w-full  h-9 mb-2" />
              )}
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
                Conçu pour les investisseurs expérimentés souhaitant des
                rendements élevés sur des projets à long terme.
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
              {account ? (
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
              ) : (
                <Skeleton className="w-full  h-9 mb-2" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
