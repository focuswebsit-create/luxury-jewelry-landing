const CX = 100;
const CY = 132;

const hourIndices = Array.from({ length: 12 }, (_, i) => i * 30);
const minuteTicks = Array.from({ length: 60 }, (_, i) => i * 6).filter((a) => a % 30 !== 0);

/**
 * Original illustration: steel dress watch with a midnight dial on a leather
 * strap. No logo or brand insignia. The seconds hand sweeps only while the
 * case is open (see `.is-open .watch-seconds` in globals.css).
 */
export function WatchIllustration() {
  return (
    <svg viewBox="0 0 200 264" className="jewel-svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="watch-strap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1d1412" />
          <stop offset="0.3" stopColor="#4a3329" />
          <stop offset="0.55" stopColor="#3a271f" />
          <stop offset="1" stopColor="#170f0d" />
        </linearGradient>
        <linearGradient id="watch-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f6f8" />
          <stop offset="0.25" stopColor="#9aa6ae" />
          <stop offset="0.5" stopColor="#eef1f3" />
          <stop offset="0.75" stopColor="#7d8a93" />
          <stop offset="1" stopColor="#dfe4e8" />
        </linearGradient>
        <linearGradient id="watch-steel-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#6c7880" />
        </linearGradient>
        <radialGradient id="watch-dial" cx="0.42" cy="0.36" r="0.75">
          <stop offset="0" stopColor="#2f4a5a" />
          <stop offset="0.55" stopColor="#15252f" />
          <stop offset="1" stopColor="#0a1218" />
        </radialGradient>
        <linearGradient id="watch-crystal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="watch-hand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff7e4" />
          <stop offset="0.5" stopColor="#fff7e4" />
          <stop offset="0.5" stopColor="#b7a37f" />
          <stop offset="1" stopColor="#b7a37f" />
        </linearGradient>
      </defs>

      {/* strap: upper and lower halves, slightly tapering */}
      <path d="M74 4 C74 30 72 52 70 82 L130 82 C128 52 126 30 126 4 Z" fill="url(#watch-strap)" />
      <path d="M70 182 L130 182 C128 214 126 238 126 262 L74 262 C74 238 72 214 70 182 Z" fill="url(#watch-strap)" />
      <path d="M79 8 C79 32 77 54 76 80 M121 8 C121 32 123 54 124 80" stroke="#b48d62" strokeOpacity="0.55" strokeWidth="0.9" strokeDasharray="3 2.4" fill="none" />
      <path d="M76 184 C77 212 79 236 79 258 M124 184 C123 212 121 236 121 258" stroke="#b48d62" strokeOpacity="0.55" strokeWidth="0.9" strokeDasharray="3 2.4" fill="none" />

      {/* lugs */}
      <path d="M66 92 L72 70 L84 70 L82 92 Z M134 92 L128 70 L116 70 L118 92 Z" fill="url(#watch-steel)" />
      <path d="M66 172 L72 194 L84 194 L82 172 Z M134 172 L128 194 L116 194 L118 172 Z" fill="url(#watch-steel)" />

      {/* crown */}
      <rect x={CX + 60} y={CY - 8} width="11" height="16" rx="2.5" fill="url(#watch-steel)" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={CX + 62 + i * 2.4} y1={CY - 7} x2={CX + 62 + i * 2.4} y2={CY + 7} stroke="#6f7c84" strokeWidth="0.7" />
      ))}

      {/* case + bezel */}
      <circle cx={CX} cy={CY} r="64" fill="url(#watch-steel)" />
      <circle cx={CX} cy={CY} r="64" fill="none" stroke="url(#watch-steel-edge)" strokeWidth="1.4" />
      <circle cx={CX} cy={CY} r="56.5" fill="#56636b" />
      <circle cx={CX} cy={CY} r="55" fill="url(#watch-dial)" />

      {/* faint sunburst */}
      {Array.from({ length: 24 }, (_, i) => (
        <line
          key={i}
          x1={CX}
          y1={CY}
          x2={CX}
          y2={CY - 54}
          stroke="#ffffff"
          strokeOpacity={i % 2 ? 0.025 : 0.05}
          strokeWidth="5"
          transform={`rotate(${i * 15} ${CX} ${CY})`}
        />
      ))}

      {/* minute track */}
      {minuteTicks.map((a) => (
        <line key={a} x1={CX} y1={CY - 52} x2={CX} y2={CY - 49} stroke="#c9d3d8" strokeOpacity="0.55" strokeWidth="0.6" transform={`rotate(${a} ${CX} ${CY})`} />
      ))}
      {/* applied hour indices */}
      {hourIndices.map((a) =>
        a === 0 ? (
          <g key={a}>
            <rect x={CX - 4.2} y={CY - 51} width="3" height="13" rx="0.8" fill="#f1e2c2" />
            <rect x={CX + 1.2} y={CY - 51} width="3" height="13" rx="0.8" fill="#f1e2c2" />
          </g>
        ) : (
          <rect key={a} x={CX - 1.6} y={CY - 51} width="3.2" height={a % 90 === 0 ? 12 : 9.5} rx="0.8" fill="#e9dbbd" transform={`rotate(${a} ${CX} ${CY})`} />
        ),
      )}

      {/* hands at 10:09 — two-tone dauphine for a faceted look */}
      <g transform={`rotate(-56 ${CX} ${CY})`}>
        <polygon points={`${CX - 3.6},${CY} ${CX},${CY - 30} ${CX + 3.6},${CY} ${CX},${CY + 6}`} fill="url(#watch-hand)" />
      </g>
      <g transform={`rotate(54 ${CX} ${CY})`}>
        <polygon points={`${CX - 3},${CY} ${CX},${CY - 46} ${CX + 3},${CY} ${CX},${CY + 7}`} fill="url(#watch-hand)" />
      </g>
      <g className="watch-seconds">
        <line x1={CX} y1={CY + 12} x2={CX} y2={CY - 49} stroke="#c9a46a" strokeWidth="1" strokeLinecap="round" />
        <circle cx={CX} cy={CY + 10} r="2.2" fill="#c9a46a" />
      </g>
      <circle cx={CX} cy={CY} r="3.4" fill="#d8c29a" stroke="#6d5a3b" strokeWidth="0.6" />

      {/* sapphire-like crystal reflection (illustrative) */}
      <path d={`M${CX - 50} ${CY - 18} A55 55 0 0 1 ${CX + 22} ${CY - 51} L${CX + 10} ${CY - 34} A40 40 0 0 0 ${CX - 36} ${CY - 8} Z`} fill="url(#watch-crystal)" />
      <circle cx={CX} cy={CY} r="55" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="0.8" />
    </svg>
  );
}
