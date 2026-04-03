import { SITE_CONFIG, SKILLS } from "../data/constants";

export default function Hero() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center bg-light-50 section-padding overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          {/* Identity Line */}
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-8 bg-dark-900"></span>
            <span className="font-mono text-sm font-medium tracking-widest uppercase text-dark-600">
              Brijesh Vishwakarma
            </span>
          </div>

          {/* Architectural Statement */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-dark-900 mb-8 leading-[1.05] tracking-tighter">
            Designing systems that <br className="hidden sm:block" />
            survive success.
          </h1>

          {/* Technical Manifesto */}
          <p className="text-xl sm:text-2xl text-dark-600 leading-relaxed mb-12 max-w-3xl font-light">
            Software Engineer Trainee specializing in FastAPI and Clean
            Architecture. I build scalable, efficient web services that power
            modern applications, focusing on performance, asynchronous APIs, and
            seamless system integrations.
          </p>

          {/* Core Competencies (Text-only, no badges) */}
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-widest text-dark-400 mb-4">
              Core Competencies
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm text-dark-800">
              <span>Distributed Systems</span>
              <span>Event-Driven Architecture</span>
              <span>Database Internals</span>
              <span>System Design</span>
              <span>Python & Go</span>
            </div>
          </div>

          {/* CTA (Minimalist) */}
          <div className="flex flex-wrap gap-6">
            <a
              href="#featured-work"
              className="btn btn-primary rounded-none px-8 py-4 text-sm tracking-wide"
            >
              READ CASE STUDIES
            </a>
            <a
              href="#contact"
              className="btn btn-secondary rounded-none px-8 py-4 text-sm tracking-wide"
            >
              CONTACT
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary rounded-none px-8 py-4 text-sm tracking-wide flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              RESUME
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
