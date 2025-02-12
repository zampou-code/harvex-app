import { Button, Tailwind, Text } from "@react-email/components";

import React from "react";

export function TransactionConfirmationMail({
  type,
  action,
}: {
  type: "investment" | "withdraw";
  action: "approved" | "rejected";
}) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const getMessage = () => {
    if (type === "investment" && action === "approved") {
      return "Votre investissement a été validé avec succès. Vous pouvez désormais suivre son évolution et vos gains directement depuis votre tableau de bord.";
    } else if (type === "investment" && action === "rejected") {
      return "Votre demande d'investissement a été rejetée. Veuillez contacter notre support pour plus d'informations.";
    } else if (type === "withdraw" && action === "approved") {
      return "Votre demande de retrait a été approuvée. Les fonds seront transférés sur votre compte bancaire sous 3 jours ouvrés.";
    } else if (type === "withdraw" && action === "rejected") {
      return "Votre demande de retrait a été rejetée. Veuillez contacter notre support pour plus d'informations.";
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
