import Link from "next/link";
import { Logo } from "@/assets/images";
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
                  href="#"
                  prefetch={false}
                  className="text-base hover:underline underline-offset-4 hover:text-primary"
                >
                  Acceuil
                </Link>
                <Link
                  href="#"
                  prefetch={false}
                  className="text-base hover:underline underline-offset-4 hover:text-primary"
                >
                  À propos
                </Link>
                <Link
                  href="#"
                  prefetch={false}
                  className="text-base hover:underline underline-offset-4 hover:text-primary"
                >
                  Plans d’investissement
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Création de compte</h2>
              <div className="flex flex-col gap-1">
                <Link
                  href="#"
                  prefetch={false}
                  className="text-base hover:underline underline-offset-4 hover:text-primary"
                >
                  Connexion
                </Link>
                <Link
                  href="#"
                  prefetch={false}
                  className="text-base hover:underline underline-offset-4 hover:text-primary"
                >
                  Inscription
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Création de compte</h2>
              <div className="flex flex-col gap-1">
                <Link
                  href="#"
                  prefetch={false}
                  className="text-base hover:underline underline-offset-4 hover:text-primary"
                >
                  Faq
                </Link>

                <Link
                  href="#"
                  prefetch={false}
                  className="text-base hover:underline underline-offset-4 hover:text-primary"
                >
                  Conditions générales
                </Link>
                <Link
                  href="#"
                  prefetch={false}
                  className="text-base hover:underline underline-offset-4 hover:text-primary"
                >
                  Politiques de confidentialté
                </Link>
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
        <Link href="#" prefetch={false}>
          <Telegram />
        </Link>
      </div>
    </footer>
  );
}
