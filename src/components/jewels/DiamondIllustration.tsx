import { brilliantFacets } from "./facets";

const stone = brilliantFacets({
  cx: 100,
  girdleY: 66,
  radius: 86,
  tableRadius: 44,
  crownHeight: 34,
  pavilionDepth: 92,
  tilt: 0.13,
  fire: true,
});

/** Original illustration: loose round brilliant gemstone. */
export function DiamondIllustration() {
  return (
    <svg viewBox="0 0 200 172" className="jewel-svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="diamond-light" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#3d5d74" stopOpacity="0.28" />
        </linearGradient>
        <radialGradient id="diamond-table" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#eaf5fa" />
          <stop offset="1" stopColor="#c9dfea" />
        </radialGradient>
      </defs>
      {stone.facets.map((f, i) => (
        <polygon key={i} points={f.points} fill={f.fill} stroke="#ffffff" strokeOpacity="0.7" strokeWidth="0.7" />
      ))}
      <polygon points={stone.table} fill="url(#diamond-table)" stroke="#ffffff" strokeWidth="1" />
      <polygon points={stone.outline} fill="url(#diamond-light)" stroke="#f3f9fc" strokeWidth="1.2" strokeLinejoin="round" />
      {/* a single crisp reflection streak across the table */}
      <path d="M74 30 L104 30 L92 40 L66 40 Z" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}
