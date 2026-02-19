export default function KeyImpact() {
  const impacts = [
    {
      title: "Backend Excellence",
      description:
        "Specializing in FastAPI to build high-concurrency, asynchronous systems. I focus on writing code that is not just functional, but optimized for scale and performance.",
      metrics: ["FastAPI Specialist", "Async Python Expert"],
    },
    {
      title: "Architectural Integrity",
      description:
        "I advocate for Clean Architecture and SOLID principles. My goal is to build decoupled, modular systems that are easy to test and maintain as project requirements evolve.",
      metrics: ["SOLID Principles", "Test-Driven Mindset"],
    },
    {
      title: "System Reliability",
      description:
        "Passionate about observability and robust error handling. I believe in 'Designing for Failure' to ensure services remain resilient under varying load conditions.",
      metrics: ["Zero-Downtime Focus", "Observability Enthusiast"],
    },
  ];

  return (
    <section className="section-padding bg-white border-t border-light-200">
      <div className="container-custom">
        <header className="section-header">
          <span className="section-label">Technical Focus</span>
          <h2 className="section-title">Core Competencies</h2>
          <p className="section-description">
            Building foundationally sound systems through modern frameworks and
            architectural best practices.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impacts.map((item) => (
            <div key={item.title} className="group">
              <h3 className="text-lg font-bold text-dark-900 mb-3 group-hover:underline decoration-1 underline-offset-4">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed mb-6 font-light">
                {item.description}
              </p>
              <ul className="space-y-2">
                {item.metrics.map((metric) => (
                  <li
                    key={metric}
                    className="flex items-center gap-2 text-xs font-mono text-dark-700 uppercase tracking-wide"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
