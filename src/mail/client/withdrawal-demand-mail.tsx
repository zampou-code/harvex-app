import { Link, Tailwind, Text } from "@react-email/components";

import React from "react";

export function WithdrawalDemandMail({
  name,
  amount,
  accountNumber,
  method,
  date,
}: {
  name: string;
  amount: number;
  accountNumber: string;
  method: string;
  date: string;
}) {
  return (
    <Tailwind>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Cher(e) {name},
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Nous avons bien reçu votre demande de retrait de fonds. Voici les
        détails de votre demande :
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Détails de la demande :
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        🔹 Montant demandé : {amount.toLocaleString()} FCFA
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        🔹 Numéro de compte : {accountNumber}
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        🔹 Méthode de retrait choisie : {method}
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        🔹 Date et heure de la demande : {date}
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Votre demande est en cours de traitement. Vous serez informé dès que les
        fonds seront disponibles dans votre compte money.
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        📲 Pour toute vérification ou assistance, contactez-nous via WhatsApp :
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        <Link
          href="https://wa.me/message/NJKVE6SPAMT4L1"
          className="text-[#e25c1d]"
        >
          https://wa.me/message/NJKVE6SPAMT4L1
        </Link>
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        <Link href="https://wa.me/+22370625684" className="text-[#e25c1d]">
          https://wa.me/+22370625684
        </Link>
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Merci pour votre confiance.
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        L&apos;équipe HARVEX GROUPE
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        <Link href="https://www.harvexgroupe.com" className="text-[#e25c1d]">
          www.harvexgroupe.com
        </Link>{" "}
        / contact@harvexgroupe.com
      </Text>
    </Tailwind>
  );
}
