"use client";

import { collections } from "@/data/collections";
import { useReveal } from "@/components/RevealProvider";
import { LuxuryBox } from "./LuxuryBox";

export const DETAIL_PANEL_ID = "collection-detail";

/** The editorial stage with the three interactive cases on a shared baseline. */
export function CollectionsStage() {
  const { active, select, registerBox } = useReveal();

  return (
    <div
      className="stage"
      data-stage
      data-active={active ?? "none"}
      role="group"
      aria-label="בחירת קולקציה — שלוש קופסאות"
    >
      <span className="stage-plinth" aria-hidden="true" />
      <div className="stage-row">
        {collections.map((collection) => (
          <LuxuryBox
            key={collection.id}
            collection={collection}
            isOpen={active === collection.id}
            isDimmed={active !== null && active !== collection.id}
            onSelect={() => select(collection.id)}
            registerRef={(el) => registerBox(collection.id, el)}
            controlsId={DETAIL_PANEL_ID}
          />
        ))}
      </div>
      <p className="stage-hint" aria-hidden={active !== null}>
        <span className="stage-hint-dot" />
        {active ? "לחצו שוב על הקופסה כדי לסגור, או Esc" : "הקישו על קופסה כדי לפתוח אותה"}
      </p>
    </div>
  );
}
