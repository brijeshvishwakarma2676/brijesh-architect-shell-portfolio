/**
 * Logo - A minimalist architectural monogram "BV".
 * Features technical drawing elements like overhanging lines and grid references.
 */
export default function Logo({
  className = "w-10 h-10",
  textColor = "currentColor",
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background/Structure Lines (Subtle) */}
      <path
        d="M10 20H90"
        stroke={textColor}
        strokeWidth="0.5"
        strokeOpacity="0.1"
      />
      <path
        d="M10 50H90"
        stroke={textColor}
        strokeWidth="0.5"
        strokeOpacity="0.1"
      />
      <path
        d="M10 80H90"
        stroke={textColor}
        strokeWidth="0.5"
        strokeOpacity="0.1"
      />
      <path
        d="M20 10V90"
        stroke={textColor}
        strokeWidth="0.5"
        strokeOpacity="0.1"
      />
      <path
        d="M50 10V90"
        stroke={textColor}
        strokeWidth="0.5"
        strokeOpacity="0.1"
      />
      <path
        d="M80 10V90"
        stroke={textColor}
        strokeWidth="0.5"
        strokeOpacity="0.1"
      />

      {/* The "B" */}
      <path
        d="M30 25V75M30 25H55C62.5 25 62.5 45 55 45H30M55 45C65 45 65 75 55 75H30"
        stroke={textColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* The "V" */}
      <path
        d="M65 25L75 75L85 25"
        stroke={textColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Architectural "Draft" Extensions */}
      <line
        x1="25"
        y1="25"
        x2="35"
        y2="25"
        stroke={textColor}
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <line
        x1="25"
        y1="75"
        x2="35"
        y2="75"
        stroke={textColor}
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <line
        x1="30"
        y1="20"
        x2="30"
        y2="30"
        stroke={textColor}
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <line
        x1="30"
        y1="70"
        x2="30"
        y2="80"
        stroke={textColor}
        strokeWidth="1"
        strokeOpacity="0.5"
      />

      {/* Technical Annotation (Mock) */}
      <text
        x="10"
        y="95"
        fill={textColor}
        fillOpacity="0.4"
        fontSize="4"
        fontFamily="monospace"
        className="select-none"
      >
        REV 2.0.4 // SCALE 1:1
      </text>
    </svg>
  );
}
