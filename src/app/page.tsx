import { RevealProvider } from "@/components/RevealProvider";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { EditorialSection } from "@/components/sections/EditorialSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <div id="top" className="page">
      <Header />
      <RevealProvider>
        <main id="main" tabIndex={-1}>
          <Hero />
          <EditorialSection />
          <ContactSection />
        </main>
      </RevealProvider>
      <Footer />
    </div>
  );
}
