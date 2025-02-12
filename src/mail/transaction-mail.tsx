import { Button, Tailwind, Text } from "@react-email/components";

import React from "react";

export function TransactionMail({
  type,
  action,
}: {
  type: "investment" | "withdraw";
  action: "demand" | "account";
}) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const getMessage = () => {
    if (type === "investment" && action === "demand") {
      return "Une demande d'investissement a été effectuée sur votre compte Harvex. Veuillez contacter notre support pour finaliser la transaction.";
    } else if (type === "withdraw" && action === "demand") {
      return "Une demande de retrait a été effectuée sur votre compte Harvex. Veuillez contacter notre support pour finaliser la transaction.";
    } else if (type === "investment" && action === "account") {
      return "Votre investissement a été validé avec succès. Vous pouvez désormais suivre son évolution et vos gains directement depuis votre tableau de bord.";
    }

    return "";
  };

  return (
    <Tailwind>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        {getMessage()}
      </Text>
      <Button
        className="bg-[#e25c1d] text-white px-6 py-3 rounded-lg no-underline block w-4/5 mx-auto text-center"
        href={`${baseUrl}/dashboard`}
      >
        Accéder à mon compte
      </Button>
    </Tailwind>
  );
}
