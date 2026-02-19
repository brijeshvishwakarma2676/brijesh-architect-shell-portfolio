import { SKILLS } from "../data/constants";

export default function TechnicalStack() {
  return (
    <section className="section-padding bg-light-50 border-t border-light-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 items-start">
          {/* Header */}
          <header className="md:sticky md:top-24">
            <span className="section-label">Toolbox</span>
            <h2 className="section-title">Technical Proficiency</h2>
            <p className="section-description text-sm">
              The technologies I trust to build reliable systems.
            </p>
          </header>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
            {SKILLS.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-bold text-dark-900 uppercase tracking-wider mb-6 pb-2 border-b border-light-200">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="font-mono text-sm text-dark-700 flex items-center justify-between group cursor-default"
                    >
                      <span>{skill}</span>
                      <span className="w-1.5 h-1.5 bg-light-200 rounded-full group-hover:bg-dark-900 transition-colors"></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
