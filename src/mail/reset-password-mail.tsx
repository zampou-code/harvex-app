import { Button, Link, Tailwind, Text } from "@react-email/components";

import React from "react";

export function ResetPasswordMail({ resetCode }: { resetCode: string }) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  return (
    <Tailwind>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Une demande de réinitialisation de mot de passe a été effectuée pour
        votre compte Harvex. Pour finaliser cette opération, veuillez cliquer
        sur le code unique ci-dessous ou utiliser le bouton de réinitialisation.
      </Text>
      <Link
        href={`${baseUrl}/change-password?code=${resetCode}`}
        className="text-2xl font-bold text-[#e25c1d] my-5 text-center"
      >
        {resetCode}
      </Link>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Ce code expirera dans 1 heure. Si vous n&apos;avez pas demandé cette
        réinitialisation, veuillez ignorer cet email.
      </Text>
      <Button
        className="bg-[#e25c1d] text-white px-6 py-3 rounded-lg no-underline block w-4/5 mx-auto text-center"
        href={`${baseUrl}/change-password?code=${resetCode}`}
      >
        Réinitialiser le mot de passe
      </Button>
    </Tailwind>
  );
}
