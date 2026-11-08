/** Express an abstract stage unit as a CSS length that scales with `--u`. */
export const u = (n: number): string => `calc(${n} * var(--u))`;

export const t3d = (x: number, y: number, z: number): string => `translate3d(${u(x)}, ${u(y)}, ${u(z)})`;
