"use client";

import { BoxSearch, LampCharge, Lock01, Umbrella02 } from "@/assets/svg";

import { Element } from "react-scroll";

export default function AboutUs() {
  return (
    <Element name="about-us" as="section" className="bg-white">
      <div className="md:flex gap-10 justify-between items-center responvive-p-x py-16">
        <div className="flex gap-2 md:gap-5 md:w-96">
          <div className="w-1/2 mb-10 space-y-2 md:space-y-5">
            <div className="w-full h-36 bg-[#F4A628] rounded-lg flex flex-col gap-3 justify-center items-center">
              <BoxSearch />
              <p className="text-base text-white font-bold">Transparence</p>
            </div>
            <div className="w-full h-36 bg-primary rounded-lg flex flex-col gap-4 justify-center items-center">
              <Lock01 />
              <p className="text-base text-white font-bold">Responsabilité </p>
            </div>
          </div>
          <div className="w-1/2 mt-10 space-y-2 md:space-y-5">
            <div className="w-full h-36 bg-primary rounded-lg flex flex-col gap-4 justify-center items-center">
              <LampCharge />
              <p className="text-base text-white font-bold">Innovation</p>
            </div>
            <div className="w-full h-36 bg-[#F4A628] rounded-lg flex flex-col gap-4 justify-center items-center">
              <Umbrella02 />
              <p className="text-base text-white font-bold">Exellence</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-5 md:space-y-12">
          <h2 className="font-bold text-xl md:text-3xl mt-10 md:t-0">
            À propos de <span className="text-primary">HARVEX GROUPE</span>
          </h2>

          <div>
            <p className="text-xs md:text-sm">
              HARVEX GROUPE est une société d’investissement de premier plan,
              dédiée à la création de valeur à long terme pour ses clients et
              partenaires. Fondée sur des principes solides de transparence,
              d&apos;innovation et d&apos;excellence, notre mission est
              d&apos;accompagner les investisseurs dans leur quête de croissance
              durable et d&apos;opportunités stratégiques.
            </p>
            <p className="text-xs md:text-sm mt-2">
              Avec une expertise diversifiée couvrant plusieurs secteurs clés,
              HARVEX GROUPE se positionne comme un acteur engagé dans la
              transformation économique, favorisant des projets à fort impact
              social et environnemental.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[url('/historical-counter-bg.png')] bg-center bg-no-repeat bg-contain bg-[#030304] responvive-p-x py-16 flex flex-col md:flex-row gap-5 justify-between items-center">
        <div className="text-white w-full max-w-52">
          <h2 className="text-4xl font-semibold mb-1">132+</h2>
          <p className="text-xl font-medium">Projet financé</p>
        </div>
        <div className="text-white w-full max-w-52">
          <h2 className="text-4xl font-semibold mb-1">35%</h2>
          <p className="text-xl font-medium">Rendement moyen</p>
        </div>
        <div className="text-white w-full max-w-52">
          <h2 className="text-4xl font-semibold mb-1">10+</h2>
          <p className="text-xl font-medium">Pays</p>
        </div>
        <div className="text-white w-full max-w-52">
          <h2 className="text-4xl font-semibold mb-1">3+</h2>
          <p className="text-xl font-medium">Continents</p>
        </div>
      </div>
    </Element>
  );
}
