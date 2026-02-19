import { useScrollReveal } from "../hooks/useScrollReveal";
import Hero from "../sections/Hero";
import FeaturedProjects from "../sections/FeaturedProjects";
import Experience from "../sections/Experience";
import KeyImpact from "../sections/KeyImpact";
import EngineeringMethodology from "../sections/EngineeringMethodology";
import TechnicalValues from "../sections/TechnicalValues";
import TechnicalStack from "../sections/TechnicalStack";
import Contact from "../sections/Contact";

export default function Home() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <div data-reveal>
        <Hero />
      </div>
      <div data-reveal>
        <KeyImpact />
      </div>
      <div data-reveal>
        <FeaturedProjects />
      </div>
      <div data-reveal>
        <Experience limit={1} />
      </div>
      <div data-reveal>
        <EngineeringMethodology />
      </div>
      <div data-reveal>
        <TechnicalValues />
      </div>
      <div data-reveal>
        <TechnicalStack />
      </div>
      <div data-reveal>
        <Contact />
      </div>
    </div>
  );
}
