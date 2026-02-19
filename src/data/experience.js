export const experience = [
  {
    id: 1,
    title: 'Software Engineer Trainee',
    company: 'OpenSpace Services Pvt. Ltd.',
    period: 'Jun 2025 – Present',
    location: 'Mumbai, India',
    description: 'Developing high-performance, asynchronous web services using FastAPI. Focused on implementing clean architecture patterns and ensuring seamless system integrations.',
    highlights: [
      {
        label: 'Building Core Backend Infrastructure',
        detail: 'Utilizing FastAPI to develop scalable async APIs, focusing on low-latency response times and efficient resource management.',
      },
      {
        label: 'Implementing Clean Architecture',
        detail: 'Applying decoupled design patterns to ensure the codebase remains testable, maintainable, and adaptable to future requirements.',
      },
      {
        label: 'Asynchronous API Optimization',
        detail: 'Leveraging Python\'s asyncio capabilities to handle concurrent requests efficiently, improving the overall throughput of backend services.',
      },
    ],
  },
  {
    id: 2,
    title: 'Back-end Developer Internship',
    company: 'OpenSpace Services Pvt. Ltd.',
    period: 'May 2025 – Jun 2025',
    location: 'Mumbai, India',
    description: 'Gained specialized experience in backend development, focusing on database management and API construction using modern Python frameworks.',
    highlights: [
      {
        label: 'Mastering FastAPI Fundamentals',
        detail: 'Built and documented RESTful endpoints while learning the nuances of request/response validation and dependency injection.',
      },
      {
        label: 'Object-Relational Mapping (ORM)',
        detail: 'Implemented database interactions using ORM layers, ensuring data integrity and optimizing query performance for relational data.',
      },
      {
        label: 'Scalable Service Design',
        detail: 'Contributed to the design of efficient web services, focusing on modularity and adherence to backend development best practices.',
      },
    ],
  },
];

export const philosophy = [
  {
    title: 'ORMs vs Raw SQL',
    content: `I use SQLAlchemy for most work. The productivity gain from mapped objects, relationship loading, and query composition outweighs the abstraction cost for typical CRUD operations.

But I switch to raw SQL when: the query involves complex joins that the ORM makes awkward, when I need fine-grained control over execution plans, or when I am writing one-off data migrations.

The key is recognizing when the ORM is helping and when it is hiding important details. I have debugged too many N+1 issues caused by developers not understanding what queries their ORM calls generate.`,
  },
  {
    title: 'Designing for Failure',
    content: `Every external call will fail eventually. Networks timeout, services go down, databases hit connection limits. The question is not if but when and how you handle it.

My defaults: timeouts on all external calls (no unbounded waits), circuit breakers for repeated failures, graceful degradation over hard failures, and meaningful error messages that help debugging.

I also think about failure modes during design, not after. "What happens if X is down?" should be answered before writing code, not discovered in production.`,
  },
  {
    title: 'Pagination Strategies',
    content: `Offset pagination is fine for admin tables with low update frequency. It breaks down for user-facing feeds where content is constantly added.

For dynamic content, I use cursor-based pagination exclusively. The cursor encodes the position (typically a timestamp + ID tuple), is opaque to the client, and handles insertions correctly.

The downside is you cannot jump to page 50. For most UX, this is acceptable. For admin tables needing random access, offset is still appropriate.`,
  },
  {
    title: 'When Not to Optimize',
    content: `Premature optimization is real, but so is premature pessimism—assuming something will be slow without measuring.

My approach: write the straightforward implementation first, measure under realistic load, optimize only what the data shows is slow. I have seen teams spend weeks optimizing code paths that handle 0.1% of traffic.

The exception is when the optimization is free—choosing the right data structure, adding an index during initial design, using batch operations. These cost nothing upfront and prevent obvious problems.`,
  },
  {
    title: 'Trade-off Thinking',
    content: `Engineering is about trade-offs. Every decision has costs: consistency vs availability, latency vs throughput, simplicity vs flexibility.

I try to make trade-offs explicit. When choosing eventual consistency, document what "eventually" means. When adding complexity for performance, quantify the gain and the maintenance cost.

The worst decisions are ones where the trade-offs were not understood. The best are ones where they were documented and can be revisited when requirements change.`,
  },
];
