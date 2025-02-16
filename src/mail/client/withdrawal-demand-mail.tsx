import { Tailwind, Text } from "@react-email/components";

type WithdrawalDemandMailProps = {
  name: string;
  amount: number;
  accountNumber: string;
  method: string;
  date: string;
};

export function WithdrawalDemandMail({
  name,
  amount,
  accountNumber,
  method,
  date,
}: WithdrawalDemandMailProps) {
  return (
    <Tailwind>
      <Text className="leading-relaxed text-gray-700 mb-5">
        Cher(e) {name},
      </Text>
      <Text className="leading-relaxed text-gray-700 mb-5">
        Nous avons bien reçu votre demande de retrait de fonds. Voici les
        détails de votre demande :
      </Text>
      <Text className="leading-relaxed text-gray-700 mb-5">
        Détails de la demande :
      </Text>
      <Text className="leading-relaxed text-gray-700">
        🔹 Montant demandé : {amount} FCFA
      </Text>
      <Text className="leading-relaxed text-gray-700">
        🔹 Numéro de compte : {accountNumber}
      </Text>
      <Text className="leading-relaxed text-gray-700">
        🔹 Méthode de retrait choisie : {method}
      </Text>
      <Text className="leading-relaxed text-gray-700 mb-5">
        🔹 Date et heure de la demande : {date}
      </Text>
      <Text className="leading-relaxed text-gray-700 mb-5">
        Votre demande est en cours de traitement. Vous serez informé dès que les
        fonds seront disponibles dans votre compte money.
      </Text>
      <Text className="leading-relaxed text-gray-700 mb-5">
        📲 Pour toute vérification ou assistance, contactez-nous via WhatsApp :
      </Text>
      <Text className="leading-relaxed text-gray-700 mb-5">
        🇨🇮 Côte d'Ivoire : +225 07 13 06 59 59 / +225 07 18 10 10 78
      </Text>
      <Text className="leading-relaxed text-gray-700 mb-5">
        🇲🇱 Mali : +223 70 62 56 84
      </Text>
      <Text className="leading-relaxed text-gray-700 mb-5">
        Merci pour votre confiance.
      </Text>
      <Text className="leading-relaxed text-gray-700 mb-5">
        L&apos;équipe HARVEX GROUPE
      </Text>
      <Text className="leading-relaxed text-gray-700 mb-5">
        www.harvexgroupe.com / contact@harvexgroupe.com
      </Text>
    </Tailwind>
  );
}
