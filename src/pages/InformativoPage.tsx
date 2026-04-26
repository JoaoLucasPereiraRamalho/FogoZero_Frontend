import { Header } from "../components/Header";
import { HeroCarousel } from "../components/Informativo/HeroCarousel";
import { AboutSection } from "../components/Informativo/AboutSection";
import { NewsGrid } from "../components/Informativo/Noticia/NewsGrid";
import { SituationSection } from "../components/Informativo/SituationSection";
import { GlossarySection } from "../components/Informativo/GlossarySection";
import { Footer } from "../components/Footer/Footer";

export function InformativoPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <Header />

      <main>
        <HeroCarousel />
        <AboutSection />
        <NewsGrid />
        <SituationSection />
        <GlossarySection />
      </main>
      <Footer />
    </div>
  );
}
