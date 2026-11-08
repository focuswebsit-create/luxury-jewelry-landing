"use client";

import { AnimatePresence, motion } from "motion/react";
import { defaultInvitation, getCollection } from "@/data/collections";
import { useReveal } from "@/components/RevealProvider";
import { DETAIL_PANEL_ID } from "@/components/stage/CollectionsStage";

const EASE = [0.22, 0.8, 0.2, 1] as const;

/** Dynamic detail bar under the stage. Crossfades once the reveal is under way. */
export function CollectionInfo() {
  const { active } = useReveal();
  const c = active ? getCollection(active) : null;

  const content = c
    ? {
        key: c.id,
        label: `${c.index} — ${c.nameEn}`,
        sub: "הקולקציה הנבחרת",
        title: c.titleHe,
        description: c.descriptionHe,
        cta: c.ctaHe,
      }
    : {
        key: "none",
        label: defaultInvitation.labelEn,
        sub: "שלוש קופסאות, שלושה עולמות",
        title: defaultInvitation.titleHe,
        description: defaultInvitation.descriptionHe,
        cta: defaultInvitation.ctaHe,
      };

  return (
    <section
      id={DETAIL_PANEL_ID}
      className="detail-panel"
      aria-labelledby="detail-title"
      data-testid="detail-panel"
      data-active={active ?? "none"}
    >
      <div className="detail-progress" aria-hidden="true">
        {(["ring", "watch", "diamond"] as const).map((id) => (
          <span key={id} className={active === id ? "is-active" : undefined} />
        ))}
      </div>
      <div aria-live="polite" aria-atomic="true" className="detail-live">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={content.key}
            className="detail-body"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: c ? 0.32 : 0.05, ease: EASE } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.18, ease: "easeIn" } }}
          >
            <div className="detail-text">
              <p className="detail-label">
                <span lang="en">{content.label}</span>
                <span className="detail-sub">{content.sub}</span>
              </p>
              <h2 id="detail-title" className="detail-title">
                {content.title}
              </h2>
              <p className="detail-desc">{content.description}</p>
            </div>
            <a className="btn-primary detail-cta" href="#contact" data-testid="detail-cta">
              {content.cta}
              <span aria-hidden="true" className="btn-arrow">
                ←
              </span>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
