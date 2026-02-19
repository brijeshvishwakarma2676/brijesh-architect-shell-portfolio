import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "../data/projects";
import Diagram from "../components/Diagram";
import CodeBlock from "../components/CodeBlock";
import NotFound from "./NotFound";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const revealRef = useScrollReveal();

  if (!project) {
    return <NotFound />;
  }

  return (
    <article className="section-padding" ref={revealRef}>
      <div className="container-custom">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-accent transition-colors mb-10 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to projects
        </Link>

        {/* Header */}
        <header className="mb-16" data-reveal>
          <div className="section-label mb-4">Project Deep Dive</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-700 mb-4 text-balance leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-zinc-600 mb-6 max-w-2xl leading-relaxed">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="badge-enhanced">
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Problem Statement */}
        <Section title="Problem Statement">
          <p className="whitespace-pre-line leading-relaxed text-base">
            {project.problemStatement}
          </p>
        </Section>

        {/* Technical Highlights */}
        <Section title="Technical Implementation">
          <div className="space-y-10">
            {project.technicalHighlights.map((highlight, index) => (
              <div
                key={index}
                data-reveal
                data-reveal-delay={Math.min(index + 1, 3)}
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-xs font-bold shrink-0 mt-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-base font-bold text-dark-700">
                    {highlight.title}
                  </h4>
                </div>
                <div className="pl-12">
                  <p className="text-sm text-zinc-600 mb-4 leading-relaxed">
                    {highlight.description}
                  </p>
                  {highlight.code && <CodeBlock code={highlight.code} />}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Architecture */}
        <Section title="Architecture">
          <p className="whitespace-pre-line mb-2 font-semibold text-zinc-700">
            System Topology
          </p>
          <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
            {project.architectureDescription}
          </p>
          <Diagram type="architecture" projectSlug={project.slug} />
        </Section>

        {/* Database Considerations */}
        <Section title="Database Design">
          <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
            {project.databaseConsiderations}
          </p>
          <Diagram type="database" projectSlug={project.slug} />
        </Section>

        {/* Key Engineering Decisions */}
        <Section title="Key Engineering Decisions">
          <div className="space-y-8">
            {project.keyDecisions.map((decision, index) => (
              <div
                key={index}
                className="card-enhanced"
                data-reveal
                data-reveal-delay={Math.min(index + 1, 3)}
              >
                {/* Context */}
                <p className="text-sm text-zinc-600 mb-4">
                  <span className="font-bold text-dark-700">Context:</span>{" "}
                  {decision.context}
                </p>

                {/* Options */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Options considered:
                  </p>
                  <ul className="text-sm text-zinc-600 space-y-2">
                    {decision.options.map((option, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${option === decision.decision ? "bg-accent" : "bg-zinc-300"}`}
                        />
                        <span
                          className={
                            option === decision.decision
                              ? "font-medium text-accent"
                              : ""
                          }
                        >
                          {option}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decision Result */}
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                  <p className="text-sm text-zinc-600 mb-2">
                    <span className="font-bold text-dark-700">Decision:</span>{" "}
                    <span className="text-accent font-semibold">
                      {decision.decision}
                    </span>
                  </p>
                  <p className="text-sm text-zinc-600 mb-2 leading-relaxed">
                    <span className="font-bold text-dark-700">Reasoning:</span>{" "}
                    {decision.reasoning}
                  </p>
                  <p className="text-xs text-zinc-500 italic">
                    <span className="font-bold not-italic">Downside:</span>{" "}
                    {decision.downside}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Failures & Lessons Learned — Enhanced "Alert" style */}
        <Section title="Failures & Lessons Learned">
          <div className="space-y-10">
            {project.failures.map((failure, index) => (
              <div key={index} className="group" data-reveal>
                {/* Alert Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-dark-700">
                    {failure.title}
                  </h4>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FailureDetail label="What broke" value={failure.whatBroke} />
                  <FailureDetail
                    label="Why it broke"
                    value={failure.whyBroke}
                  />
                  <FailureDetail
                    label="Impact"
                    value={failure.impact}
                    color="text-amber-600"
                  />
                  <FailureDetail
                    label="Fix applied"
                    value={failure.fix}
                    color="text-emerald-600"
                  />
                </div>

                {/* Key Lesson */}
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                  <div className="flex items-start gap-3">
                    <svg>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                      />
                    </svg>
                    <div>
                      <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">
                        Key Lesson
                      </span>
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {failure.learned}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Trade-offs */}
        <Section title="Design Trade-offs">
          <ul className="space-y-4">
            {project.tradeoffs.map((tradeoff, index) => (
              <li
                key={index}
                className="text-sm text-zinc-600 flex items-start gap-3"
                data-reveal
                data-reveal-delay={Math.min(index + 1, 3)}
              >
                <span className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="leading-relaxed">{tradeoff}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* If I Were Rebuilding This Today */}
        <Section title="If I Were Rebuilding This Today">
          <div className="card-enhanced" data-reveal>
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-accent shrink-0 mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644a8.25 8.25 0 0013.803 3.7"
                />
              </svg>
              <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line italic">
                "{project.rebuildingToday}"
              </p>
            </div>
          </div>
        </Section>

        {/* Footer Navigation */}
        <footer className="mt-20 pt-8 border-t border-light-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <Link
            to="/"
            className="hover:text-accent transition-colors flex items-center gap-2 group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            View other projects
          </Link>
          <div className="flex gap-4 text-xs font-mono opacity-50">
            <span>#system-design</span>
            <span>#backend-engineering</span>
          </div>
        </footer>
      </div>
    </article>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-20" data-reveal>
      <h3 className="section-label mb-6 pb-3 border-b border-light-200">
        {title}
      </h3>
      <div className="text-zinc-600">{children}</div>
    </section>
  );
}

function FailureDetail({ label, value, color = "" }) {
  return (
    <div className="p-4 rounded-xl bg-light-100 border border-light-200">
      <span className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
        {label}
      </span>
      <p className={`text-sm leading-relaxed ${color || "text-zinc-600"}`}>
        {value}
      </p>
    </div>
  );
}
