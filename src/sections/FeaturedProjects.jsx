import { Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function FeaturedProjects() {
  return (
    <section
      id="featured-work"
      className="section-padding bg-light-50 border-t border-light-200"
    >
      <div className="container-custom">
        {/* Section Header */}
        <header className="section-header">
          <span className="section-label">Selected Works</span>
          <h2 className="section-title">Architecture Case Studies</h2>
          <p className="section-description">
            Deep dives into distributed consistency, high-throughput data
            pipelines, and fault-tolerant system design.
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="group block"
            >
              <article className="h-full border border-light-200 bg-white p-8 transition-colors duration-300 hover:border-dark-900 flex flex-col justify-between">
                <div>
                  {/* Tech Stack (Top) */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs text-dark-400 uppercase tracking-wider border border-light-200 px-2 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-dark-900 mb-4 group-hover:underline decoration-1 underline-offset-4">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-dark-600 leading-relaxed mb-8 font-light">
                    {project.tagline}
                  </p>
                </div>

                {/* Footer / Link */}
                <div className="flex items-center gap-3 text-sm font-mono font-medium text-dark-900 mt-auto pt-6 border-t border-light-100">
                  <span>READ ARCHITECTURE REVIEW</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
