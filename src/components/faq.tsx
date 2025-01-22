"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Element } from "react-scroll";

export default function Faq() {
  return (
    <Element name="faq" as="section" className="bg-primary">
      <div className="py-16 responvive-p-x">
        <h2 className="font-bold text-white text-xl md:text-3xl text-center mb-2">
          Foire aux Questions (FAQ)
        </h2>
        <p className="text-white text-xs md:text-sm text-center mb-10">
          Tout ce que vous devez savoir sur HARVEX GROUPE et nos solutions
          d’investissement.
        </p>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-[800px] mx-auto space-y-3"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-black text-sm  md:text-lg font-bold">
              1. Qu’est-ce que{" "}
              <span className="text-primary">HARVEX GROUPE</span> ?
            </AccordionTrigger>
            <AccordionContent>
              HARVEX GROUPE est une société spécialisée dans le placement de
              biens, l’immobilier, les énergies renouvelables et la
              crypto-monnaie. Nous offrons des solutions d’investissement
              adaptées à une large gamme de clients, y compris les particuliers,
              les entreprises de taille moyenne et les grandes entreprises.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              2. Quels types de plans d’investissement proposez-vous ?
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Nous proposons trois catégories de packs d’investissement :
              </p>
              <ol>
                <li className="font-bold">1. Pack Start :</li>
                <li className="pl-5">
                  <ul>
                    <li>- Montant minimum : 50,000 F CFA</li>
                    <li>- Périodes : 7, 14 et 21 jours</li>
                  </ul>
                </li>
              </ol>
              <ol className="mt-2">
                <li className="font-bold">2. Pack Premium :</li>
                <li className="pl-5">
                  <ul>
                    <li>- Montant minimum : 250,000 F CFA</li>
                    <li>- Périodes : 10, 20 et 30 jours</li>
                  </ul>
                </li>
              </ol>
              <ol className="mt-2">
                <li className="font-bold">2. Pack Business :</li>
                <li className="pl-5">
                  <ul>
                    <li>- Montant minimum : 1,500,000 F CFA</li>
                    <li>- Périodes : 15, 30 et 45 jours</li>
                  </ul>
                </li>
              </ol>
              <p className="mt-2">
                Chaque pack offre des rendements croissants en fonction du
                montant investi et de la durée de l’investissement.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              3. Comment fonctionne le processus d’investissement ?
            </AccordionTrigger>
            <AccordionContent>
              <ol className="space-y-2">
                <li>
                  <span className="font-bold">1. Choix du pack : </span>
                  Sélectionnez un pack d’investissement adapté à vos objectifs
                  financiers.
                </li>

                <li>
                  <span className="font-bold">2. Engagement : </span>
                  Versez le montant correspondant au pack choisi.
                </li>
                <li>
                  <span className="font-bold">3. Rendements : </span>
                  Recevez les bénéfices en fin de période d’investissement
                  (selon le tableau des rendements).
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              4. Quels sont les secteurs d’intervention de{" "}
              <span className="text-primary">HARVEX GROUPE</span> ?
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-bold mb-2">
                Nous investissons activement dans :
              </p>
              <ul className="pl-5">
                <li>- Les biens immobiliers à haute valeur ajoutée</li>
                <li>- Les énergies renouvelables (solaire, éolien, etc.)</li>
                <li>
                  - Les placements en crypto-monnaie et autres actifs numériques
                </li>
                <li>- Le développement de projets durables</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              5. Qui peut investir avec{" "}
              <span className="text-primary">HARVEX GROUPE</span> ?
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-bold mb-2">Nos solutions sont ouvertes à :</p>
              <ul className="pl-5">
                <li>
                  - Les particuliers recherchant une croissance financière
                  rapide.
                </li>
                <li>
                  - Les entreprises de taille moyenne et grande souhaitant
                  diversifier leurs portefeuilles d’actifs.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              6. Quels sont les rendements attendus des investissements ?
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-bold mb-2">
                Les rendements varient selon le montant investi et la durée du
                placement. Par exemple :
              </p>
              <ul className="pl-5">
                <li>
                  - Avec 50,000 F CFA dans un Pack Start (7 jours), vous obtenez
                  60,000 F CFA.
                </li>
                <li>
                  - Avec 1,000,000 F CFA dans un Pack Premium (30 jours), vous
                  obtenez 1,750,000 F CFA.
                </li>
                <li>
                  - Consultez notre tableau complet des rendements pour plus de
                  détails.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              7. Quels sont vos engagements en matière de gestion des fonds ?
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-bold mb-2">HARVEX GROUPE s’engage à :</p>
              <ul className="pl-5">
                <li>
                  - Offrir une transparence totale dans la gestion des
                  investissements.
                </li>
                <li>- Prioriser des projets durables et responsables.</li>
                <li>
                  - Assurer un suivi rigoureux des placements pour garantir des
                  rendements optimaux.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              8. Quels sont les risques liés à l’investissement ?
            </AccordionTrigger>
            <AccordionContent>
              Comme tout investissement, il existe des risques, notamment les
              fluctuations des marchés et les aléas économiques. HARVEX GROUPE
              met en place des stratégies solides pour minimiser ces risques.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              9. Comment puis-je commencer à investir avec{" "}
              <span className="text-primary">HARVEX GROUPE</span> ?
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-bold mb-2">Pour commencer :</p>
              <ol className="pl-5">
                <li>
                  1. Contactez notre équipe via notre site Web ou email
                  ([adresse email]).
                </li>
                <li>2. Sélectionnez le pack adapté à vos besoins.</li>
                <li>
                  3. Effectuez votre investissement et laissez-nous gérer vos
                  placements.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-10">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              10. Comment suivre mes investissements ?
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-bold mb-2">
                Nous offrons une plateforme en ligne sécurisée où vous pouvez
                consulter :
              </p>
              <ul className="pl-5">
                <li>- Vos investissements actifs.</li>
                <li> - Les rendements à venir</li>
                <li>- Les rapports d’activité et bilans financiers</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-11">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              11. Que faire en cas d&apos;activité suspecte sur mon compte ?
            </AccordionTrigger>
            <AccordionContent>
              Si vous constatez une activité suspecte sur votre compte, veuillez
              nous contacter immédiatement via notre support client afin que
              nous puissions prendre les mesures nécessaires pour sécuriser
              votre compte.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-12">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              12. Puis-je annuler un investissement ?
            </AccordionTrigger>
            <AccordionContent>
              Une fois qu&apos;un investissement est réalisé, il ne peut
              généralement pas être annulé. Cependant, certaines conditions
              peuvent s&apos;appliquer selon le produit d&apos;investissement.
              Veuillez consulter les termes spécifiques de chaque produit ou
              contacter le support client pour plus de détails.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-13">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              13. <span className="text-primary">HARVEX GROUPE</span>{" "}
              propose-t-elle des opportunités d’emploi ?
            </AccordionTrigger>
            <AccordionContent>
              Oui, nous sommes toujours à la recherche de talents passionnés.
              Consultez notre page Carrières pour découvrir les postes
              disponibles.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-14">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              14. Quels sont les moyens de paiement acceptés ?
            </AccordionTrigger>
            <AccordionContent>
              <p className="font-bold mb-2">
                Nous acceptons les paiements via :
              </p>
              <ul className="pl-5">
                <li>- Wave</li>
                <li>- Orange Money</li>
                <li>- Crypto-monnaies</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-15">
            <AccordionTrigger className="text-black text-sm md:text-lg font-bold">
              15. Comment contacter{" "}
              <span className="text-primary">HARVEX GROUPE</span> ?
            </AccordionTrigger>
            <AccordionContent>
              <span className="text-primary">HARVEX GROUPE</span> est une
              société spécialisée dans le placement de biens, l’immobilier, les
              énergies renouvelables et la crypto-monnaie. Nous offrons des
              solutions d’investissement adaptées à une large gamme de clients,
              y compris les particuliers, les entreprises de taille moyenne et
              les grandes entreprises.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Element>
  );
}
