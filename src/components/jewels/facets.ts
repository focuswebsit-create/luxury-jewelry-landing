/**
 * Generates a stylised side/three-quarter view of a round brilliant cut as a
 * list of shaded polygons. Purely geometric — an original illustration, not a
 * traced product photo.
 */
export interface Facet {
  points: string;
  fill: string;
}

interface Pt {
  x: number;
  y: number;
}

// High-contrast tones: real brilliance comes from bright/dark facet contrast, not pastel fills.
const CROWN_TONES = ["#ffffff", "#e8f1f6", "#9fb4c2", "#f8fbfd", "#5f7787", "#ffffff", "#cddde7", "#7d95a5", "#eef5f9"];
const PAVILION_TONES = ["#2c3d4a", "#e6f0f5", "#6e8696", "#ffffff", "#1d2b35", "#b9ccd8", "#4b6272", "#f3f8fb", "#8ea5b4"];
const FIRE = ["#ffe3cf", "#dde4ff", "#e0f6e6"];

const fmt = (p: Pt) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
const poly = (...pts: Pt[]) => pts.map(fmt).join(" ");
const lerp = (a: Pt, b: Pt, t: number): Pt => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

export interface BrilliantOptions {
  cx: number;
  /** y of the girdle line */
  girdleY: number;
  /** girdle radius (half width) */
  radius: number;
  /** table half width */
  tableRadius: number;
  crownHeight: number;
  pavilionDepth: number;
  /** vertical squash of the round outline, gives the elevated viewpoint */
  tilt?: number;
  /** add a few warm/cool dispersion tints */
  fire?: boolean;
}

export function brilliantFacets(o: BrilliantOptions): { facets: Facet[]; table: string; outline: string } {
  const tilt = o.tilt ?? 0.12;
  const tableY = o.girdleY - o.crownHeight;
  const culet: Pt = { x: o.cx, y: o.girdleY + o.pavilionDepth };

  // Front half of the girdle: 9 points from left (θ = π) to right (θ = 0).
  const g: Pt[] = Array.from({ length: 9 }, (_, k) => {
    const theta = Math.PI - (k * Math.PI) / 8;
    return {
      x: o.cx + o.radius * Math.cos(theta),
      y: o.girdleY + o.radius * tilt * Math.sin(theta),
    };
  });
  // Front edge of the table: 5 points.
  const t: Pt[] = Array.from({ length: 5 }, (_, j) => {
    const phi = Math.PI - (j * Math.PI) / 4;
    return {
      x: o.cx + o.tableRadius * Math.cos(phi),
      y: tableY + o.tableRadius * tilt * Math.sin(phi),
    };
  });
  // Back edge of the table (visible because the stone is seen slightly from above).
  const tb: Pt[] = Array.from({ length: 3 }, (_, j) => {
    const phi = Math.PI / 4 + (j * Math.PI) / 4;
    return {
      x: o.cx + o.tableRadius * Math.cos(phi),
      y: tableY - o.tableRadius * tilt * Math.sin(phi),
    };
  });

  const facets: Facet[] = [];
  let n = 0;
  const tone = (palette: string[]) => {
    n += 1;
    if (o.fire && n % 11 === 4) return FIRE[n % FIRE.length]!;
    return palette[(n * 5) % palette.length]!;
  };

  // Crown: star facets + upper girdle facets.
  const tIndexForGirdle = [0, 1, 1, 2, 2, 3, 3, 4];
  for (let k = 0; k < 8; k++) {
    facets.push({ points: poly(g[k]!, g[k + 1]!, t[tIndexForGirdle[k]!]!), fill: tone(CROWN_TONES) });
  }
  for (let j = 0; j < 4; j++) {
    facets.push({ points: poly(t[j]!, t[j + 1]!, g[2 * j + 1]!), fill: tone(CROWN_TONES) });
  }

  // Pavilion: each girdle segment split into three facets around a lower-girdle point.
  for (let k = 0; k < 8; k++) {
    const mid = lerp(g[k]!, g[k + 1]!, 0.5);
    const low = lerp(mid, culet, 0.42);
    facets.push({ points: poly(g[k]!, g[k + 1]!, low), fill: tone(PAVILION_TONES) });
    facets.push({ points: poly(g[k]!, low, culet), fill: tone(PAVILION_TONES) });
    facets.push({ points: poly(g[k + 1]!, culet, low), fill: tone(PAVILION_TONES) });
  }

  const table = poly(t[0]!, ...tb, t[4]!, t[3]!, t[2]!, t[1]!);
  const outline = poly(t[0]!, ...tb, t[4]!, g[8]!, culet, g[0]!);
  return { facets, table, outline };
}
