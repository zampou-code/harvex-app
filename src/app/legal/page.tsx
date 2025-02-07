import Footer from "@/components/pages/footer";
import { LegalHero } from "@/components/pages/legal/legal-hero";
import { LegalText } from "@/components/pages/legal/legal-text";
import Navbar from "@/components/pages/navbar";

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <LegalHero />
      <LegalText />
      <Footer />
    </>
  );
}
