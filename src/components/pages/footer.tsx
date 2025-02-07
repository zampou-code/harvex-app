"use client";

import { Link } from "react-scroll";
import { Logo } from "@/assets/images";
import NextLink from "next/link";
import { Telegram } from "@/assets/svg";

export default function Footer() {
  return (
    <footer>
      <div className="bg-primary responvive-p-x py-10">
        <div className="bg-white flex flex-col md:flex-row gap-4 justify-between items-start rounded-lg py-5 px-7">
          <div className="w-auto h-10">
            <Logo alt="" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h2 className="text-lg font-bold mb-2">Menu</h2>
              <div className="flex flex-col gap-1">
                <Link
                  to="home"
                  spy={true}
                  offset={-80}
                  smooth={true}
                  duration={500}
                  activeClass="text-primary underline"
                  className="text-base hover:underline underline-offset-4 hover:text-primary cursor-pointer"
                >
                  Acceuil
                </Link>
                <Link
                  spy={true}
                  offset={-80}
                  to="about-us"
                  smooth={true}
                  duration={500}
                  activeClass="text-primary underline"
                  className="text-base hover:underline underline-offset-4 hover:text-primary cursor-pointer"
                >
                  À propos
                </Link>
                <Link
                  spy={true}
                  offset={-80}
                  smooth={true}
                  duration={500}
                  to="investment-plan"
                  activeClass="text-primary underline"
                  className="text-base hover:underline underline-offset-4 hover:text-primary cursor-pointer"
                >
                  Plans d’investissement
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Création de compte</h2>
              <div className="flex flex-col gap-1">
                <NextLink
                  href="/login"
                  className="text-base hover:underline underline-offset-4 hover:text-primary cursor-pointer"
                >
                  Connexion
                </NextLink>
                <NextLink
                  href="/register"
                  className="text-base hover:underline underline-offset-4 hover:text-primary cursor-pointer"
                >
                  Inscription
                </NextLink>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Création de compte</h2>
              <div className="flex flex-col gap-1">
                <Link
                  to="faq"
                  spy={true}
                  offset={-80}
                  smooth={true}
                  duration={500}
                  activeClass="text-primary underline"
                  className="text-base hover:underline underline-offset-4 hover:text-primary cursor-pointer"
                >
                  Faq
                </Link>
                <NextLink
                  href="/legal"
                  className="text-base hover:underline underline-offset-4 hover:text-primary cursor-pointer"
                >
                  Conditions générales
                </NextLink>
                <NextLink
                  href="/legal"
                  className="text-base hover:underline underline-offset-4 hover:text-primary cursor-pointer"
                >
                  Politiques de confidentialté
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white responvive-p-x py-3">
        <p className="max-md:text-center">
          © 2024 <span className="text-primary font-bold">HARVEX GROUP</span>{" "}
          tout droit reservé
        </p>
        <NextLink href="#" prefetch={false}>
          <Telegram />
        </NextLink>
      </div>
    </footer>
  );
}
