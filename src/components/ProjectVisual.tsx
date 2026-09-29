import { CISAppScreens } from "./CISAppScreens";
import type { Project } from "@/data/projects";

export function ProjectVisual({
  kind,
  compact = false,
}: {
  kind: Project["visual"];
  compact?: boolean;
}) {
  if (kind === "school") return <SchoolVisual compact={compact} />;
  return (
    <div
      className={`project-art art-${kind}`}
      role="img"
      aria-label={`${kind === "networks" ? "Neural network architecture" : kind === "gan" ? "Generator and discriminator training" : kind === "robot" ? "Robot arm drawing a path" : "Gesture to motor command"} diagram`}
    >
      <div className="art-topline">
        <span>
          {kind === "networks"
            ? "ARCHITECTURE STUDY"
            : kind === "gan"
              ? "ADVERSARIAL TRAINING"
              : kind === "robot"
                ? "CARTESIAN MOTION"
                : "HUMAN → MACHINE"}
        </span>
        <span>
          {kind === "networks"
            ? "02"
            : kind === "gan"
              ? "03"
              : kind === "robot"
                ? "04"
                : "05"}
        </span>
      </div>
      {kind === "networks" ? (
        <Network />
      ) : kind === "gan" ? (
        <Generative />
      ) : kind === "robot" ? (
        <Robot />
      ) : (
        <Gesture />
      )}
      <span className="art-caption">
        {kind === "networks"
          ? "ResNet18 ↔ VGG13 / MNIST"
          : kind === "gan"
            ? "Noise → generate → discriminate"
            : kind === "robot"
              ? "ROS / Panda manipulator"
              : "Sense → classify → move"}
      </span>
    </div>
  );
}

function SchoolVisual({ compact }: { compact: boolean }) {
  return (
    <div className={`school-art ${compact ? "school-compact" : ""}`}>
      <CISAppScreens priority={compact} />
      <span className="visual-note">CIS Compass · Public app previews</span>
    </div>
  );
}

function Network() {
  const columns = [3, 5, 5, 3];
  return (
    <svg viewBox="0 0 480 250" aria-hidden="true">
      {columns
        .slice(0, -1)
        .flatMap((count, col) =>
          Array.from({ length: count }, (_, row) =>
            Array.from({ length: columns[col + 1] }, (_, next) => (
              <line
                key={`${col}-${row}-${next}`}
                x1={85 + col * 104}
                y1={125 + (row - (count - 1) / 2) * 34}
                x2={85 + (col + 1) * 104}
                y2={125 + (next - (columns[col + 1] - 1) / 2) * 34}
                stroke="currentColor"
                opacity=".17"
              />
            )),
          ),
        )}
      {columns.flatMap((count, col) =>
        Array.from({ length: count }, (_, row) => (
          <circle
            key={`${col}-${row}`}
            cx={85 + col * 104}
            cy={125 + (row - (count - 1) / 2) * 34}
            r="8"
            fill={col === 3 ? "#f0ba87" : "#845a68"}
            stroke="#e0b5b9"
            strokeWidth="1.3"
          />
        )),
      )}
      <path
        d="M85 59 V27 H293 V40"
        stroke="#f0ba87"
        strokeWidth="1.4"
        fill="none"
        strokeDasharray="4 5"
      />
      <text
        x="188"
        y="18"
        textAnchor="middle"
        fill="currentColor"
        fontSize="9"
        letterSpacing="2"
      >
        RESIDUAL CONNECTION
      </text>
    </svg>
  );
}

function Generative() {
  return (
    <svg viewBox="0 0 480 250" aria-hidden="true">
      {Array.from({ length: 64 }, (_, i) => (
        <rect
          key={i}
          x={40 + (i % 8) * 13}
          y={65 + Math.floor(i / 8) * 13}
          width="10"
          height="10"
          fill="currentColor"
          opacity={((i * 17 + 7) % 23) / 28 + 0.1}
        />
      ))}
      <path
        d="M165 115 H210 M310 115 H355"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m202 110 8 5-8 5 m145-10 8 5-8 5"
        fill="none"
        stroke="currentColor"
      />
      <rect
        x="211"
        y="73"
        width="96"
        height="86"
        rx="43"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <text
        x="259"
        y="123"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontStyle="italic"
        fontSize="32"
        fill="currentColor"
      >
        G
      </text>
      <rect
        x="359"
        y="73"
        width="78"
        height="86"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <text
        x="398"
        y="123"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontStyle="italic"
        fontSize="32"
        fill="currentColor"
      >
        D
      </text>
      <path
        d="M398 172 V199 H259 V172"
        fill="none"
        stroke="currentColor"
        strokeDasharray="4 5"
        opacity=".5"
      />
      <text
        x="329"
        y="220"
        textAnchor="middle"
        fontSize="9"
        fill="currentColor"
        letterSpacing="2"
      >
        FEEDBACK
      </text>
    </svg>
  );
}

function Robot() {
  return (
    <svg viewBox="0 0 480 250" aria-hidden="true">
      <g stroke="currentColor" strokeWidth=".6" opacity=".15">
        {Array.from({ length: 10 }, (_, i) => (
          <path
            key={i}
            d={`M${30 + i * 45} 195 l110 40 M${30 + i * 45} 235 l110 -40`}
          />
        ))}
      </g>
      <path
        d="M286 162 l90 -24 58 38 -92 25 Z"
        fill="none"
        stroke="#ae634c"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <path
        d="M107 206 L162 90 L274 64 L310 140"
        fill="none"
        stroke="#d0c9b5"
        strokeWidth="24"
        strokeLinejoin="round"
      />
      <path
        d="M107 206 L162 90 L274 64 L310 140"
        fill="none"
        stroke="#586755"
        strokeWidth="13"
        strokeLinejoin="round"
      />
      <g fill="#eee9db" stroke="#586755" strokeWidth="4">
        <circle cx="162" cy="90" r="14" />
        <circle cx="274" cy="64" r="12" />
      </g>
      <path
        d="M310 140 l7 15 -8 10 M310 140 l17 10 1 12"
        fill="none"
        stroke="#586755"
        strokeWidth="4"
      />
      <rect x="71" y="205" width="79" height="12" rx="3" fill="#586755" />
      <circle cx="324" cy="159" r="4" fill="#ae634c" />
    </svg>
  );
}

function Gesture() {
  return (
    <svg viewBox="0 0 480 250" aria-hidden="true">
      <circle
        cx="160"
        cy="127"
        r="83"
        fill="none"
        stroke="currentColor"
        opacity=".18"
      />
      <circle
        cx="160"
        cy="127"
        r="64"
        fill="none"
        stroke="currentColor"
        opacity=".18"
        strokeDasharray="2 5"
      />
      <path
        d="M140 177 c-12-15-25-39-21-45 5-9 14 9 19 13 V85 c0-12 13-12 13 0 v37 V64 c0-12 14-12 14 0 v57 V78 c0-12 13-12 13 0 v46 V96 c0-11 13-11 13 0 v56 c0 14-7 26-16 31"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M260 126 H330 m-9-8 9 8-9 8" stroke="currentColor" fill="none" />
      <rect x="354" y="104" width="42" height="42" rx="5" fill="currentColor" />
      <path
        d="M375 134 V115 m-7 7 7-7 7 7"
        stroke="#f3dfc4"
        strokeWidth="2"
        fill="none"
      />
      <text
        x="375"
        y="170"
        textAnchor="middle"
        fontSize="9"
        letterSpacing="2"
        fill="currentColor"
      >
        MOTOR
      </text>
    </svg>
  );
}
