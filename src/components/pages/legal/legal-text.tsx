import { Card, CardContent } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

export function LegalText() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent className="p-6">
          <Section title="Accord Client">
            <SubSection title="Introduction">
              <p>
                Cet Accord Client (« Accord ») est conclu entre HARVEX GROUPE («
                la Société ») et vous (« le Client »). En accédant à nos
                services ou en investissant avec HARVEX GROUPE, vous acceptez
                d’être lié par les termes et conditions décrits dans cet Accord.
              </p>
            </SubSection>
            <SubSection title="Portée et Objet">
              <p>
                HARVEX GROUPE offre des services d’investissement dans les
                secteurs suivants :
              </p>
              <ul className="list-disc pl-6">
                <li>Immobilier</li>
                <li>Énergies renouvelables</li>
                <li>Crypto-monnaies</li>
                <li>Placements financiers divers</li>
              </ul>
            </SubSection>
            <SubSection title="Responsabilités du Client">
              <ul className="list-disc pl-6">
                <li>Fournir des informations exactes et mises à jour.</li>
                <li>
                  Être responsable des fonds investis et de leur origine licite.
                </li>
                <li>Comprendre les risques associés aux investissements.</li>
                <li>Respecter les lois et réglementations applicables.</li>
              </ul>
            </SubSection>
            <SubSection title="Engagements de HARVEX GROUPE">
              <ul className="list-disc pl-6">
                <li>Gérer les fonds investis avec transparence.</li>
                <li>Offrir des informations claires sur les produits.</li>
                <li>Proposer une plateforme sécurisée.</li>
                <li>Fournir un support client réactif.</li>
              </ul>
            </SubSection>
          </Section>

          <Separator className="my-4" />

          <Section title="Divulgation et Avertissement sur les Risques">
            <SubSection title="Introduction">
              <p>
                Investir comporte des risques. HARVEX GROUPE informe ses clients
                des risques associés aux placements.
              </p>
            </SubSection>
            <SubSection title="Risques Généraux">
              <ul className="list-disc pl-6">
                <li>Perte de capital possible.</li>
                <li>Volatilité des marchés financiers.</li>
                <li>Risques de liquidité et réglementaires.</li>
              </ul>
            </SubSection>
            <SubSection title="Exclusion de Responsabilité">
              <p>
                HARVEX GROUPE ne garantit aucun rendement et ne pourra être tenu
                responsable des pertes financières.
              </p>
            </SubSection>
          </Section>
        </CardContent>
      </Card>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}

function SubSection({ title, children }: any) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      {children}
    </div>
  );
}
