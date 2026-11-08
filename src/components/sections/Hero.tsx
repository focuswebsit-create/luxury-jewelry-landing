"use client";

import { motion } from "motion/react";
import { CollectionsStage } from "@/components/stage/CollectionsStage";
import { CollectionInfo } from "./CollectionInfo";

const EASE = [0.22, 0.8, 0.2, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <motion.p className="eyebrow" lang="en" {...rise(0.05)}>
            THE ART OF REVEAL
          </motion.p>
          <motion.h1 id="hero-title" className="hero-title" {...rise(0.15)}>
            יוקרה שמתגלה
            <br />
            <em>ברגע אחד.</em>
          </motion.h1>
          <motion.p className="hero-lede" {...rise(0.28)}>
            שלוש קופסאות. שלושה עולמות של דיוק, אור ויופי. לחצו על קופסה וגלו מה מסתתר בפנים.
          </motion.p>
          <motion.a className="text-link" href="#collections" {...rise(0.4)}>
            גלו את הקולקציות
            <span aria-hidden="true">↙</span>
          </motion.a>
        </div>

        <motion.div
          id="collections"
          className="hero-stage"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
        >
          <CollectionsStage />
        </motion.div>
      </div>
      <div className="hero-detail">
        <CollectionInfo />
      </div>
    </section>
  );
}
