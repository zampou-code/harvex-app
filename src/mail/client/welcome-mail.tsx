import { Link, Tailwind, Text } from "@react-email/components";

import React from "react";

export function WelcomeMail({ name }: { name: string }) {
  return (
    <Tailwind>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Cher(e) {name},
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Nous sommes ravis de vous accueillir chez HARVEX GROUPE ! Votre
        inscription a bien été prise en compte, et vous faites désormais partie
        de notre communauté d&apos;investisseurs engagés.
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Ce que vous pouvez faire dès maintenant :
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        ✅ Accédez à votre compte en vous connectant ici :
        <Link
          className="text-[#e25c1d]"
          href="https://www.harvexgroupe.com/login"
        >
          https://www.harvexgroupe.com/login
        </Link>
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        ✅ Explorez nos différentes opportunités d&apos;investissement adaptées
        à vos objectifs financiers
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        ✅ Contactez notre service client pour toute question à l&apos;adresse
        contact@harvexgroupe.com
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        📲 Rejoignez notre communauté Telegram pour rester informé de nos offres
        et actualités :
        <Link href="https://t.me/harvexgroupe" className="text-[#e25c1d]">
          https://t.me/harvexgroupe
        </Link>
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Nous vous remercions pour votre confiance et restons à votre disposition
        pour vous accompagner dans votre parcours d&apos;investissement.
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        L&apos;équipe HARVEX GROUPE
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        <Link href="https://www.harvexgroupe.com" className="text-[#e25c1d]">
          https://www.harvexgroupe.com
        </Link>
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        Notre service client est disponible au :
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        🇨🇮 Côte d&apos;Ivoire : +225 07 13 06 59 59 / +225 07 18 10 10 78
      </Text>
      <Text className="text-base leading-relaxed text-gray-700 mb-5">
        🇲🇱 Mali : +223 70 62 56 84
      </Text>
    </Tailwind>
  );
}
