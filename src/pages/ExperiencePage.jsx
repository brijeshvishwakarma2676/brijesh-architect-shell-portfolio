import Experience from "../sections/Experience";
import Contact from "../sections/Contact";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function ExperiencePage() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <Experience />
      <Contact />
    </div>
  );
}
