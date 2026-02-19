export default function TechnicalValues() {
  const values = [
    {
      title: "Design for Failure",
      description:
        "Systems are only as strong as their weakest dependency. I prioritize observability, circuit breakers, and idempotency to ensure production resilience.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Pragmatic Engineering",
      description:
        "I value simplicity over premature abstraction. Every layer of complexity must earn its place by solving a distinct, current business constraint.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "Data Integrity First",
      description:
        "Applications are temporary, data is permanent. I focus on schema correctness, migration safety, and transaction boundaries to protect business state.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="section-padding bg-light-50 border-t border-light-200">
      <div className="container-custom">
        {/* Section Header */}
        <header className="section-header">
          <span className="section-label">Philosophy</span>
          <h2 className="section-title">Engineering Values</h2>
          <p className="section-description">
            Guiding principles for building software that survives the test of
            time.
          </p>
        </header>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div key={value.title} className="group">
              {/* Icon */}
              <div className="w-12 h-12 bg-light-100 border border-light-200 flex items-center justify-center text-dark-900 mb-6 group-hover:bg-dark-900 group-hover:text-white transition-colors duration-300">
                {value.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-dark-900 mb-3">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-dark-600 leading-relaxed font-light">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
