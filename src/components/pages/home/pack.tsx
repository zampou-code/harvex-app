"use client";

import { Button } from "@/components/ui/button";
import { CheckBroken } from "@/assets/svg";
import { Element } from "react-scroll";

export default function Pack() {
  return (
    <Element as="section" name="investment-plan">
      <div className="responvive-p-x py-16">
        <h2 className="font-bold text-xl md:text-3xl text-center mb-10">
          Plans d’investissement{" "}
          <span className="text-primary">HARVEX GROUPE</span>
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="w-full flex-1 shadow-custom rounded-lg">
            <div className="p-4">
              <h1 className="text-2xl text-primary font-bold mb-1">
                Pack Starter
              </h1>
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
            <div className="px-4 pb-4 pt-2">
              <Button className="w-full mb-1">Voir les details</Button>
            </div>
          </div>
          <div className="w-full flex-1 shadow-custom rounded-lg">
            <div className="bg-primary p-4 rounded-t-lg">
              <h1 className="text-2xl text-white font-bold">Recommander</h1>
            </div>
            <div className="p-4">
              <h1 className="text-2xl text-primary font-bold mb-1">
                Pack Premium
              </h1>
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
            <div className="px-4 pb-4 pt-2">
              <Button className="w-full mb-1">Voir les details</Button>
            </div>
          </div>
          <div className="w-full flex-1 shadow-custom rounded-lg">
            <div className="p-4">
              <h1 className="text-2xl text-primary font-bold mb-1">
                Pack Business
              </h1>
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
              <Button className="w-full mb-1">Voir les details</Button>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
}
