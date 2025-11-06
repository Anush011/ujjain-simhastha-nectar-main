import Hero from "@/components/Hero";
import BathingDates from "@/components/BathingDates";
import SpiritualSignificance from "@/components/SpiritualSignificance";
import Akharas from "@/components/Akharas";
import SacredLocations from "@/components/SacredLocations";
import Preparations from "@/components/Preparations";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section id="hero">
        <Hero />
      </section>
      <section id="bathing-dates">
        <BathingDates />
      </section>
      <section id="spiritual-significance">
        <SpiritualSignificance />
      </section>
      <section id="akharas">
        <Akharas />
      </section>
      <section id="sacred-locations">
        <SacredLocations />
      </section>
      <section id="preparations">
        <Preparations />
      </section>

      <Footer />
    </main>
  );
};

export default Index;
