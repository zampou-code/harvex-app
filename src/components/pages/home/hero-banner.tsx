"use client";

import { Card, Money2, MoneyChange } from "@/assets/svg";

import { Button } from "@/components/ui/button";
import { Element } from "react-scroll";
import { HeroImage } from "@/assets/images";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <Element name="home" id="home" as="section" className="bg-white">
      <div className="responvive-p-x pt-24">
        <div className="md:bg-[url('/hero-bg.png')] bg-top bg-cover bg-no-repeat flex max-md:flex-col justify-between items-center gap-10">
          <div className="w-full md:w-1/2 space-y-7">
            <h1 className="font-bold text-xl md:text-3xl">
              <span className="text-primary">Investissez</span> dans un avenir
              durable avec <span className="text-primary">HARVEX GROUPE</span>
            </h1>
            <p className="text-xs md:text-sm">
              Découvrez des opportunités d’investissement responsables dans les
              secteurs clés de demain : immobilier, énergies renouvelables, et
              crypto-monnaies.
            </p>
            <div className="space-x-2">
              <Button>
                <Link href="/login">Connexion</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-transparent hover:bg-transparent"
              >
                <Link href="/register">Inscription</Link>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-auto">
              <HeroImage alt="" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-7 justify-between items-center bg-primary responvive-p-x py-10">
        <div className="max-w-[272px] text-white flex items-start">
          <Card className="mr-2 w-14 h-auto" />
          <div>
            <h2 className="text-base sm:text-sm lg:text-base font-bold">
              CHOISIR UN PACK
            </h2>
            <p className="text-xs">
              Sélectionnez parmi nos packs d&apos;investissement adaptés à vos
              besoins et à votre budget.
            </p>
          </div>
        </div>
        <div className="max-w-[272px] text-white flex items-start">
          <Money2 className="mr-2 w-14 h-auto" />
          <div>
            <h2 className="text-base sm:text-sm lg:text-base font-bold">
              INVESTIR FACILEMENT
            </h2>
            <p className="text-xs">
              Procédez à votre investissement en quelques clics, de manière
              sécurisée et rapide.
            </p>
          </div>
        </div>
        <div className="max-w-[272px] text-white flex items-start">
          <MoneyChange className="mr-2 w-14 h-auto" />
          <div>
            <h2 className="text-base sm:text-sm lg:text-base font-bold">
              RECEVOIR LES RENDEMENTS
            </h2>
            <p className="text-xs">
              Bénéficiez de vos profits selon les termes de votre contrat
              d&apos;investissement.
            </p>
          </div>
        </div>
      </div>
    </Element>
  );
}
