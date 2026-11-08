import { brilliantFacets } from "./facets";

const STONE = { cx: 100, girdleY: 54, radius: 40 };

const stone = brilliantFacets({
  cx: STONE.cx,
  girdleY: STONE.girdleY,
  radius: STONE.radius,
  tableRadius: 21,
  crownHeight: 17,
  pavilionDepth: 34,
  tilt: 0.14,
  fire: true,
});

/** Claw x offsets from the stone centre — two front claws, two rear claws. */
const CLAWS = [
  { dx: -37, front: false },
  { dx: 37, front: false },
  { dx: -17, front: true },
  { dx: 17, front: true },
];

/** Original illustration: yellow-gold solitaire, three-quarter view. */
export function RingIllustration() {
  const top = STONE.girdleY;
  return (
    <svg viewBox="0 0 200 230" className="jewel-svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ring-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5a3b1c" />
          <stop offset="0.12" stopColor="#a87a3c" />
          <stop offset="0.26" stopColor="#fff0c4" />
          <stop offset="0.36" stopColor="#d9a95e" />
          <stop offset="0.55" stopColor="#8f6430" />
          <stop offset="0.72" stopColor="#f2cf8a" />
          <stop offset="0.8" stopColor="#fff4d6" />
          <stop offset="0.9" stopColor="#a47436" />
          <stop offset="1" stopColor="#4d3318" />
        </linearGradient>
        <linearGradient id="ring-gold-inner" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3b2712" />
          <stop offset="0.3" stopColor="#7b5629" />
          <stop offset="0.5" stopColor="#c69a58" />
          <stop offset="0.7" stopColor="#7b5629" />
          <stop offset="1" stopColor="#3b2712" />
        </linearGradient>
        <linearGradient id="ring-gold-back" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3e2a15" />
          <stop offset="0.5" stopColor="#9b7240" />
          <stop offset="1" stopColor="#36240f" />
        </linearGradient>
        <linearGradient id="ring-prong" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a6130" />
          <stop offset="0.45" stopColor="#fff3cf" />
          <stop offset="1" stopColor="#9c6f36" />
        </linearGradient>
        <linearGradient id="ring-stone-light" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#1e3444" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="ring-spec" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* back of the band, seen through the opening */}
      <path d="M57 140 C57 108 76 92 100 92 C124 92 143 108 143 140" fill="none" stroke="url(#ring-gold-back)" strokeWidth="6" />

      {/* inner surface of the shank (gives the band real thickness) */}
      <path
        d="M56 150 C56 184 76 210 100 210 C124 210 144 184 144 150 C144 178 124 200 100 200 C76 200 56 178 56 150 Z"
        fill="url(#ring-gold-inner)"
      />
      {/* outer face of the shank */}
      <path
        d="M100 224 C64 224 40 188 40 148 C40 116 60 96 80 89 L88 100 C69 108 56 126 56 150 C56 184 76 210 100 210 C124 210 144 184 144 150 C144 126 131 108 112 100 L120 89 C140 96 160 116 160 148 C160 188 136 224 100 224 Z"
        fill="url(#ring-gold)"
      />
      {/* polished edge highlights */}
      <path d="M45 156 C48 192 72 218 100 219" fill="none" stroke="#fffbe9" strokeOpacity="0.8" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M155 150 C153 176 140 200 120 213" fill="none" stroke="#ffe9b8" strokeOpacity="0.45" strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="62" cy="182" rx="3" ry="9" fill="url(#ring-spec)" transform="rotate(-24 62 182)" />

      {/* cathedral shoulders and gallery under the stone */}
      <path d="M78 90 L86 74 L114 74 L122 90 L113 101 L100 93 L87 101 Z" fill="url(#ring-gold)" />
      <path d="M84 77 L116 77 L110 92 L90 92 Z" fill="#4d3418" opacity="0.55" />

      {/* rear claws (behind the stone, following the pavilion silhouette) */}
      {CLAWS.filter((c) => !c.front).map((c) => {
        const d = Math.sign(c.dx);
        return (
          <path
            key={c.dx}
            d={`M${100 + d * 12} 80 Q${100 + d * 31} 72 ${100 + d * 40} ${top - 5}`}
            fill="none"
            stroke="url(#ring-prong)"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        );
      })}

      {/* stone */}
      <g>
        {stone.facets.map((f, i) => (
          <polygon key={i} points={f.points} fill={f.fill} stroke="#ffffff" strokeOpacity="0.5" strokeWidth="0.4" strokeLinejoin="round" />
        ))}
        <polygon points={stone.table} fill="#f7fbfd" stroke="#ffffff" strokeWidth="0.6" />
        <polygon points={stone.outline} fill="url(#ring-stone-light)" stroke="#eef5f9" strokeWidth="0.8" strokeLinejoin="round" />
        <path d={`M${100 - 14} ${top - 15} L${100 + 2} ${top - 15} L${100 - 6} ${top - 9} L${100 - 20} ${top - 9} Z`} fill="#ffffff" opacity="0.9" />
      </g>

      {/* front claws gripping the girdle */}
      {CLAWS.filter((c) => c.front).map((c) => {
        const d = Math.sign(c.dx);
        return (
          <path
            key={c.dx}
            d={`M${100 + d * 7} 84 Q${100 + d * 19} 70 ${100 + d * 19} ${top - 6}`}
            fill="none"
            stroke="url(#ring-prong)"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
