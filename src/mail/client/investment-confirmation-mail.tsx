import { Tailwind, Text } from "@react-email/components";

type InvestmentConfirmationMailProps = {
  roi: number;
  name: string;
  amount: number;
  packName: string;
  endDate: string;
  duration: number;
  startDate: string;
};

export function InvestmentConfirmationMail({
  roi,
  name,
  amount,
  endDate,
  packName,
  duration,
  startDate,
}: InvestmentConfirmationMailProps) {
  return (
    <Tailwind>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Cher(e) {name},
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Nous sommes heureux de vous informer que votre investissement a été
        confirmé avec succès !
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Détails de votre investissement :
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        ✅ Pack choisi : {packName}
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        ✅ Montant à investir : {amount.toLocaleString()} FCFA
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        ✅ Durée de l&apos;investissement : {duration} jours
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        ✅ Gain estimé : {roi.toLocaleString()} FCFA
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        ✅ Date de début : {startDate}
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        ✅ Date de fin prévue : {endDate}
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Votre investissement est désormais actif et vous pouvez suivre son
        évolution en temps réel depuis votre espace client.
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Suivi de votre investissement :
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        📊 Accédez à votre tableau de bord ici :
        https://www.harvexgroupe.com/login
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        📩 Pour toute question, notre support est disponible à
        contact@harvexgroupe.com ou au +225 07 13 06 59 59 sur WhatsApp
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Merci pour votre confiance et bon investissement avec HARVEX GROUPE !
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        L&apos;équipe HARVEX GROUPE
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        www.harvexgroupe.com / contact@harvexgroupe.com
      </Text>
    </Tailwind>
  );
}
