import Philosophy from "../sections/Philosophy";
import Contact from "../sections/Contact";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function PhilosophyPage() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <Philosophy />
      <Contact />
    </div>
  );
}
