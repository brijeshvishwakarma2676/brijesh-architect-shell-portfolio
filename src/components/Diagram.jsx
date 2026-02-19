import React from "react";

/**
 * A minimal, typography-first SVG diagram component.
 * Instead of complex Mermaid, we use simple SVG shapes with high-quality CSS styling.
 */
export default function Diagram({ type, projectSlug }) {
  if (type === "architecture") {
    return (
      <div className="my-8 overflow-x-auto">
        <div className="min-w-[600px] flex justify-center py-8 bg-light-100 rounded-lg border border-light-200">
          <svg
            width="600"
            height="200"
            viewBox="0 0 600 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Boxes */}
            <rect
              x="20"
              y="70"
              width="120"
              height="60"
              rx="4"
              className="fill-white stroke-light-300"
            />
            <text
              x="80"
              y="105"
              textAnchor="middle"
              className="text-[12px] font-mono fill-dark-700 uppercase tracking-wider"
            >
              Client App
            </text>

            <rect
              x="180"
              y="70"
              width="120"
              height="60"
              rx="4"
              className="fill-white stroke-accent"
              strokeWidth="2"
            />
            <text
              x="240"
              y="105"
              textAnchor="middle"
              className="text-[12px] font-mono fill-dark-700 uppercase tracking-wider"
            >
              API Layer
            </text>

            <rect
              x="340"
              y="40"
              width="100"
              height="50"
              rx="4"
              className="fill-white stroke-light-300"
            />
            <text
              x="390"
              y="70"
              textAnchor="middle"
              className="text-[11px] font-mono fill-dark-700"
            >
              DB (Postgres)
            </text>

            <rect
              x="340"
              y="110"
              width="100"
              height="50"
              rx="4"
              className="fill-white stroke-light-300"
            />
            <text
              x="390"
              y="140"
              textAnchor="middle"
              className="text-[11px] font-mono fill-dark-700"
            >
              Cache (Redis)
            </text>

            <rect
              x="480"
              y="70"
              width="100"
              height="60"
              rx="4"
              className="fill-white stroke-light-300"
            />
            <text
              x="530"
              y="105"
              textAnchor="middle"
              className="text-[11px] font-mono fill-dark-700"
            >
              Worker/Queue
            </text>

            {/* Arrows */}
            <path
              d="M140 100 H180"
              stroke="#a1a1aa"
              strokeWidth="1"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M300 85 L340 65"
              stroke="#a1a1aa"
              strokeWidth="1"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M300 115 L340 135"
              stroke="#a1a1aa"
              strokeWidth="1"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M440 65 L480 85"
              stroke="#a1a1aa"
              strokeWidth="1"
              markerEnd="url(#arrowhead)"
            />

            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#a1a1aa" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "database") {
    return (
      <div className="my-8 overflow-x-auto">
        <div className="min-w-[600px] flex justify-center py-8 bg-light-100 rounded-lg border border-light-200">
          <svg
            width="500"
            height="150"
            viewBox="0 0 500 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Table 1 */}
            <rect
              x="20"
              y="20"
              width="150"
              height="110"
              rx="4"
              className="fill-white stroke-light-300"
            />
            <rect
              x="20"
              y="20"
              width="150"
              height="30"
              rx="4"
              className="fill-light-200"
            />
            <text
              x="95"
              y="40"
              textAnchor="middle"
              className="text-[12px] font-bold fill-dark-700"
            >
              Table A
            </text>
            <text x="30" y="65" className="text-[11px] font-mono fill-zinc-500">
              id: UUID (PK)
            </text>
            <text x="30" y="85" className="text-[11px] font-mono fill-zinc-500">
              user_id: FK
            </text>
            <text
              x="30"
              y="105"
              className="text-[11px] font-mono fill-zinc-500"
            >
              created_at: TS
            </text>

            {/* Link */}
            <path
              d="M170 75 H330"
              stroke="#a1a1aa"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x="250"
              y="70"
              textAnchor="middle"
              className="text-[10px] fill-accent uppercase tracking-tighter"
            >
              Relation
            </text>

            {/* Table 2 */}
            <rect
              x="330"
              y="20"
              width="150"
              height="110"
              rx="4"
              className="fill-white stroke-light-300"
            />
            <rect
              x="330"
              y="20"
              width="150"
              height="30"
              rx="4"
              className="fill-light-200"
            />
            <text
              x="405"
              y="40"
              textAnchor="middle"
              className="text-[12px] font-bold fill-dark-700"
            >
              Table B
            </text>
            <text
              x="340"
              y="65"
              className="text-[11px] font-mono fill-zinc-500"
            >
              id: UUID (PK)
            </text>
            <text
              x="340"
              y="85"
              className="text-[11px] font-mono fill-zinc-500"
            >
              parent_id: FK
            </text>
            <text
              x="340"
              y="105"
              className="text-[11px] font-mono fill-zinc-500"
            >
              status: Enum
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
