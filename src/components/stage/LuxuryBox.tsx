"use client";

import type { CSSProperties } from "react";
import type { Collection } from "@/data/collections";
import { JewelryObject } from "@/components/jewels/JewelryObject";
import { Face } from "./Face";
import { t3d, u } from "./geometry";

interface LuxuryBoxProps {
  collection: Collection;
  isOpen: boolean;
  isDimmed: boolean;
  onSelect: () => void;
  registerRef: (el: HTMLButtonElement | null) => void;
  controlsId: string;
}

/** Size of the product plane inside each case, in stage units. */
const JEWEL_SIZE: Record<Collection["id"], { w: number; h: number; sink: number; rise: number }> = {
  // sink: how far the object rests below the cushion surface (inserted into the slot)
  // rise: extra lift while presented
  ring: { w: 126, h: 145, sink: 22, rise: 12 },
  watch: { w: 124, h: 164, sink: 40, rise: 6 },
  diamond: { w: 116, h: 100, sink: -20, rise: 14 },
};

const GLINTS: Record<Collection["id"], { x: number; y: number; r: number; d: number }[]> = {
  ring: [
    { x: 62, y: 16, r: 7, d: 0.55 },
    { x: 36, y: 26, r: 4, d: 0.85 },
  ],
  watch: [{ x: 32, y: 40, r: 5, d: 0.7 }],
  diamond: [
    { x: 30, y: 14, r: 8, d: 0.55 },
    { x: 78, y: 40, r: 5, d: 0.85 },
    { x: 54, y: 70, r: 3.5, d: 1.05 },
  ],
};

export function LuxuryBox({ collection, isOpen, isDimmed, onSelect, registerRef, controlsId }: LuxuryBoxProps) {
  const { geometry: g, mechanism, material } = collection.visual;
  const { width: W, depth: D, height: H, lidHeight: L, floor: F, yaw } = g;
  const T = 6; // wall thickness
  const innerH = H - F;
  const innerY = -(F + innerH / 2);
  const Wl = W + 2;
  const Dl = D + 2;
  const jewel = JEWEL_SIZE[collection.id];

  const vars = {
    "--yaw": `${yaw}deg`,
    "--glow": collection.visual.glow,
    "--hinge-z": u(-Dl / 2),
    "--jewel-open": u(jewel.sink - jewel.rise),
    "--jewel-closed": u(jewel.sink + 36),
    "--case-w": u(W),
  } as CSSProperties;

  return (
    <button
      ref={registerRef}
      type="button"
      className={`box-slot ${isOpen ? "is-open" : ""} ${isDimmed ? "is-dimmed" : ""}`}
      data-kind={collection.id}
      data-mechanism={mechanism}
      data-material={material}
      data-state={isOpen ? "open" : "closed"}
      data-testid={`box-${collection.id}`}
      aria-pressed={isOpen}
      aria-label={isOpen ? collection.closeLabelHe : collection.openLabelHe}
      aria-controls={controlsId}
      onClick={onSelect}
      style={vars}
    >
      <span className="slot-visual" aria-hidden="true">
        <span className="slot-beam" />
        <span className="slot-halo" />
        <span className="slot-shadow" />
        <span className="scene">
          <span className="box-lift">
            <span className="box3d">
              {/* ── base shell ── */}
              <Face w={W} h={H} className="f-front" transform={`${t3d(0, -H / 2, D / 2)}`}>
                <span className="seam" />
              </Face>
              <Face w={W} h={H} className="f-back" transform={`${t3d(0, -H / 2, -D / 2)} rotateY(180deg)`} />
              <Face w={D} h={H} className="f-side f-right" transform={`${t3d(W / 2, -H / 2, 0)} rotateY(90deg)`} />
              <Face w={D} h={H} className="f-side f-left" transform={`${t3d(-W / 2, -H / 2, 0)} rotateY(-90deg)`} />

              {/* ── interior lining ── */}
              <Face w={W - 2 * T} h={innerH} className="f-lining f-lining-back" transform={`${t3d(0, innerY, -D / 2 + T)}`} />
              <Face w={D - 2 * T} h={innerH} className="f-lining f-lining-side" transform={`${t3d(-W / 2 + T, innerY, 0)} rotateY(90deg)`} />
              <Face w={D - 2 * T} h={innerH} className="f-lining f-lining-side" transform={`${t3d(W / 2 - T, innerY, 0)} rotateY(-90deg)`} />
              <Face w={W - 2 * T} h={D - 2 * T} className="f-floor" transform={`${t3d(0, -F, 0)} rotateX(90deg)`}>
                <span className="floor-detail" />
              </Face>

              {/* ── rim ── */}
              <Face w={W} h={T} className="f-rim" transform={`${t3d(0, -H, D / 2 - T / 2)} rotateX(90deg)`} />
              <Face w={W} h={T} className="f-rim" transform={`${t3d(0, -H, -D / 2 + T / 2)} rotateX(90deg)`} />
              <Face w={T} h={D - 2 * T} className="f-rim" transform={`${t3d(-W / 2 + T / 2, -H, 0)} rotateX(90deg)`} />
              <Face w={T} h={D - 2 * T} className="f-rim" transform={`${t3d(W / 2 - T / 2, -H, 0)} rotateX(90deg)`} />

              {/* diamond case: small pedestal */}
              {collection.id === "diamond" && (
                <>
                  <Face w={44} h={14} className="pedestal pedestal-front" transform={`${t3d(0, -F - 7, 22)}`} />
                  <Face w={44} h={14} className="pedestal pedestal-side" transform={`${t3d(22, -F - 7, 0)} rotateY(90deg)`} />
                  <Face w={44} h={14} className="pedestal pedestal-side" transform={`${t3d(-22, -F - 7, 0)} rotateY(-90deg)`} />
                  <Face w={44} h={44} className="pedestal pedestal-top" transform={`${t3d(0, -F - 14, 0)} rotateX(90deg)`} />
                </>
              )}

              {/* ── product ── */}
              <span className="jewel-anchor" style={{ transform: `${t3d(0, collection.id === "diamond" ? -F - 14 : -F, 0)} rotateX(8deg)` }}>
                <span
                  className="jewel"
                  style={{ width: u(jewel.w), height: u(jewel.h), marginLeft: u(-jewel.w / 2), marginTop: u(-jewel.h) }}
                >
                  <JewelryObject collection={collection} />
                  {GLINTS[collection.id].map((s, i) => (
                    <span
                      key={i}
                      className="glint"
                      style={{ left: `${s.x}%`, top: `${s.y}%`, "--s": s.r * 3, animationDelay: `${s.d}s` } as CSSProperties}
                    />
                  ))}
                </span>
              </span>

              {/* ── lid ── */}
              <span className="lid-anchor" style={{ transform: t3d(0, -H, 0) }}>
                <span className="lid">
                  <Face w={Wl} h={Dl} className="l-top" transform={`${t3d(0, -L, 0)} rotateX(90deg)`}>
                    <span className="lid-inlay" />
                  </Face>
                  <Face w={Wl} h={L} className="l-front" transform={`${t3d(0, -L / 2, Dl / 2)}`}>
                    <span className="clasp" />
                  </Face>
                  <Face w={Wl} h={L} className="l-back" transform={`${t3d(0, -L / 2, -Dl / 2)} rotateY(180deg)`} />
                  <Face w={Dl} h={L} className="l-side l-right" transform={`${t3d(Wl / 2, -L / 2, 0)} rotateY(90deg)`} />
                  <Face w={Dl} h={L} className="l-side l-left" transform={`${t3d(-Wl / 2, -L / 2, 0)} rotateY(-90deg)`} />
                  <Face w={Wl - 4} h={Dl - 4} className="l-under" transform={`${t3d(0, -0.5, 0)} rotateX(-90deg)`}>
                    <span className="lid-lining-mark">MAISON ÉCLAT</span>
                  </Face>
                </span>
              </span>
            </span>
          </span>
        </span>
      </span>

      <span className="slot-caption">
        <span className="slot-index">{collection.index}</span>
        <span className="slot-name">{collection.nameHe}</span>
        <span className="slot-en" lang="en">
          {collection.nameEn}
        </span>
        <span className="slot-state">{isOpen ? "לחצו לסגירה" : "לחצו לפתיחה"}</span>
      </span>
    </button>
  );
}
