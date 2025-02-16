import { Tailwind, Text } from "@react-email/components";

type InvestmentDemandMailProps = {
  roi: number;
  name: string;
  amount: number;
  packName: string;
  duration: number;
};

export function InvestmentDemandMail({
  roi,
  name,
  amount,
  packName,
  duration,
}: InvestmentDemandMailProps) {
  return (
    <Tailwind>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Cher(e) {name},
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Nous avons bien reçu votre demande d&apos;investissement et nous vous
        remercions de votre confiance en HARVEX GROUPE.
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Détails de votre investissement :
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        🔹 Pack choisi : {packName}
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        🔹 Montant à investir : {amount} FCFA
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        🔹 Durée de l&apos;investissement : {duration} jours
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        🔹 Montant estimé à recevoir à la fin de l&apos;investissement : {roi}{" "}
        FCFA
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Votre investissement est en attente de validation. Pour finaliser votre
        demande et activer votre investissement, veuillez contacter un agent en
        ligne via WhatsApp :
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        📲 WhatsApp: +225 0713065959
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        📲 WhatsApp: +225 0718101078
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        📲 WhatsApp: +223 70 62 56 84
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Dès que votre demande sera validée, vous recevrez un message de
        confirmation.
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Besoin d&apos;assistance ?
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        ✅ Vous pouvez suivre l&apos;évolution de votre investissement en vous
        connectant à votre espace client : https://www.harvexgroupe.com/login
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        ✅ Pour toute question, notre service client est disponible à
        contact@harvexgroupe.com ou au :
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        🇨🇮 Côte d&apos;Ivoire : +225 07 13 06 59 59 / +225 07 18 10 10 78
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        🇲🇱 Mali : +223 70 62 56 84
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Merci de votre confiance et à très bientôt !
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        L&apos;équipe HARVEX GROUPE
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        www.harvexgroupe.com
      </Text>
    </Tailwind>
  );
}
