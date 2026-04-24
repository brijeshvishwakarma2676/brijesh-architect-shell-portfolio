import Hero from "../sections/Hero";
import FeaturedProjects from "../sections/FeaturedProjects";
import Experience from "../sections/Experience";
import KeyImpact from "../sections/KeyImpact";
import EngineeringMethodology from "../sections/EngineeringMethodology";
import TechnicalValues from "../sections/TechnicalValues";
import TechnicalStack from "../sections/TechnicalStack";
import Contact from "../sections/Contact";
import AdSection from "../components/AdSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <KeyImpact />
      <FeaturedProjects />
      <AdSection />
      <Experience limit={1} />
      <EngineeringMethodology />
      <TechnicalValues />
      <TechnicalStack />
      <Contact />
    </div>
  );
}
