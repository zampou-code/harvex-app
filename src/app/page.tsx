import AboutUs from "@/components/pages/home/about-us";
import Contacts from "@/components/pages/home/contacts";
import Faq from "@/components/pages/home/faq";
import Footer from "@/components/pages/footer";
import HeroBanner from "@/components/pages/home/hero-banner";
import Historical from "@/components/pages/home/historical";
import Navbar from "@/components/pages/navbar";
import Pack from "@/components/pages/home/pack";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <AboutUs />
      <Historical />
      <Pack />
      <Faq />
      <Contacts />
      <Footer />
    </>
  );
}
