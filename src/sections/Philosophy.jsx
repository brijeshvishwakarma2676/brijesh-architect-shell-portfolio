import { philosophy } from "../data/experience";

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="section-padding bg-light-100"
    >
      <div className="container-custom">
        {/* Section Header */}
        <header className="section-header">
          <span className="section-label">Engineering Philosophy</span>
          <h2 className="section-title">How I Think About Systems</h2>
          <p className="section-description">
            Core principles that guide my approach to building reliable,
            maintainable software.
          </p>
        </header>

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {philosophy.map((item, index) => (
            <article key={index} className="card-enhanced group">
              {/* Number Badge */}
              <div className="flex items-center gap-4 mb-4">
                <span className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold text-sm group-hover:bg-accent group-hover:text-white transition-all">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-dark-700 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Content */}
              <div className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line pl-14">
                {item.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
