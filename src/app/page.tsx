import AboutUs from "@/components/about-us";
import Contacts from "@/components/contacts";
import Faq from "@/components/faq";
import Footer from "@/components/footer";
import HeroBanner from "@/components/hero-banner";
import Historical from "@/components/historical";
import Navbar from "@/components/navbar";
import Pack from "@/components/pack";

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
