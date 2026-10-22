/** A matching still pose is present in the server HTML, including without JS. */
export function RobotArmFallback() {
  return (
    <svg
      className="robot-fallback"
      viewBox="0 0 520 495"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="arm-enamel"
          x1="140"
          y1="130"
          x2="350"
          y2="360"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff8e7" />
          <stop offset="1" stopColor="#cdb097" />
        </linearGradient>
      </defs>
      <ellipse
        cx="274"
        cy="421"
        rx="151"
        ry="24"
        fill="#5a1226"
        opacity=".06"
      />
      <ellipse cx="236" cy="407" rx="78" ry="17" fill="#cdb097" />
      <path d="M169 391v14c0 17 132 17 132 0v-14" fill="#b8947a" />
      <ellipse
        cx="235"
        cy="391"
        rx="66"
        ry="17"
        fill="url(#arm-enamel)"
        stroke="#c4b7ad"
      />
      <path
        d="M234 380v-48l-46-111 12-28 121 37 15 48"
        stroke="#c4b7ad"
        strokeWidth="45"
        strokeLinejoin="round"
      />
      <path
        d="M234 380v-48l-46-111 12-28 121 37 15 48"
        stroke="url(#arm-enamel)"
        strokeWidth="38"
        strokeLinejoin="round"
      />
      <g fill="#5a1226" stroke="#dcd1c5" strokeWidth="7">
        <ellipse cx="234" cy="366" rx="22" ry="10" />
        <circle cx="234" cy="328" r="22" />
        <ellipse
          cx="190"
          cy="224"
          rx="19"
          ry="23"
          transform="rotate(-22 190 224)"
        />
        <circle cx="203" cy="193" r="23" />
        <ellipse
          cx="295"
          cy="223"
          rx="10"
          ry="22"
          transform="rotate(-73 295 223)"
        />
        <circle cx="323" cy="234" r="19" />
        <ellipse cx="337" cy="274" rx="17" ry="10" />
      </g>
      <g fill="#fff8e7" opacity=".75">
        <circle cx="234" cy="328" r="8" />
        <circle cx="203" cy="193" r="8" />
        <circle cx="323" cy="234" r="6" />
      </g>
      <path
        d="m323 284-2 24 9 10m23-37 7 22-6 12"
        stroke="#5a1226"
        strokeWidth="8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
