export default function EngineeringMethodology() {
  const steps = [
    {
      step: "01",
      title: "Constraint Discovery",
      description:
        "Identify SLAs, consistency requirements, and failure modes before writing code.",
    },
    {
      step: "02",
      title: "Structural Design",
      description:
        "Define entity boundaries, access patterns, and interface contracts (API schemas).",
    },
    {
      step: "03",
      title: "Failure Modeling",
      description:
        "Simulate network partitions, latency spikes, and partial outages to validate recovery.",
    },
    {
      step: "04",
      title: "Performance Iteration",
      description:
        "Optimize hot paths using flamegraphs, index tuning, and caching strategies.",
    },
  ];

  return (
    <section className="section-padding bg-light-50 border-t border-light-200">
      <div className="container-custom">
        {/* Section Header */}
        <header className="section-header">
          <span className="section-label">Methodology</span>
          <h2 className="section-title">System Design Principles</h2>
          <p className="section-description">
            A systematic approach to solving complex backend problems,
            prioritizing predictability over cleverness.
          </p>
        </header>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item) => (
            <div key={item.step} className="group cursor-default">
              <span className="block font-mono text-4xl font-bold text-light-200 mb-6 group-hover:text-dark-900 transition-colors duration-300">
                {item.step}
              </span>

              <h3 className="text-lg font-bold text-dark-900 mb-3 group-hover:underline decoration-1 underline-offset-4">
                {item.title}
              </h3>

              <p className="text-sm text-dark-600 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
