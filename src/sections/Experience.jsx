import { Link } from "react-router-dom";
import { experience } from "../data/experience";

export default function Experience({ limit }) {
  const displayExperience = limit ? experience.slice(0, limit) : experience;

  return (
    <section
      id="experience"
      className="section-padding bg-light-50 border-t border-light-200"
    >
      <div className="container-custom">
        {/* Section Header */}
        <header className="section-header">
          <span className="section-label">
            {limit ? "Current State" : "Career History"}
          </span>
          <h2 className="section-title">
            {limit ? "Active Engagement" : "System Log"}
          </h2>
          <p className="section-description">
            {limit
              ? "Current technical focus and organizational impact."
              : "A chronological record of technical leadership, architectural decisions, and scaling milestones."}
          </p>
        </header>

        {/* Vertical Timeline (Log Style) */}
        <div className="relative border-l border-light-200 ml-3 md:ml-6 space-y-12 md:space-y-16">
          {displayExperience.map((job, index) => (
            <article key={job.id} className="relative pl-8 md:pl-12 group">
              {/* Timeline Marker */}
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-light-50 border border-dark-900 rotate-45 group-hover:bg-dark-900 transition-colors duration-300" />

              <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-12 items-start">
                {/* Meta Data (Left Column) */}
                <div className="font-mono text-sm text-dark-600 pt-1">
                  <div className="font-bold text-dark-900 mb-1">
                    {job.company}
                  </div>
                  <div className="text-xs uppercase tracking-wide text-dark-400 mb-2">
                    {job.period}
                  </div>
                  <div className="text-xs text-dark-400">{job.location}</div>
                </div>

                {/* Content (Right Column) */}
                <div>
                  <h3 className="text-xl font-bold text-dark-900 mb-4 group-hover:underline decoration-1 underline-offset-4">
                    {job.title}
                  </h3>

                  <p className="text-base text-dark-700 leading-relaxed mb-6 max-w-2xl font-light">
                    {job.description}
                  </p>

                  <ul className="space-y-3">
                    {job.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="flex items-start gap-4 text-sm text-dark-600"
                      >
                        <span className="font-mono text-xs text-dark-400 mt-1 shrink-0">
                          {String(hIndex + 1).padStart(2, "0")}.
                        </span>
                        <span>
                          <strong className="font-medium text-dark-900">
                            {highlight.label}
                          </strong>
                          <span className="text-dark-400"> — </span>
                          {highlight.detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        {limit && (
          <div className="mt-12 pt-8 border-t border-light-200 flex justify-end">
            <Link
              to="/experience"
              className="font-mono text-sm font-bold text-dark-900 flex items-center gap-2 group hover:underline decoration-2 underline-offset-4"
            >
              READ FULL SYSTEM LOG
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
