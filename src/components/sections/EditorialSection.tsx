"use client";

import { motion } from "motion/react";

const notes = [
  {
    n: "01",
    en: "LIGHT",
    title: "אור",
    text: "הבמה, הצללים והברק נבנו כדי שהעין תנוח קודם כול על הפריט עצמו.",
  },
  {
    n: "02",
    en: "PRECISION",
    title: "דיוק",
    text: "כל קופסה נפתחת בתנועה משלה — ציר רך, מכסה כבד או הרמה עדינה.",
  },
  {
    n: "03",
    en: "RITUAL",
    title: "טקס",
    text: "רגע הפתיחה הוא חלק מהמתנה. כאן הוא מתחיל עוד לפני השיחה הראשונה.",
  },
];

const EASE = [0.22, 0.8, 0.2, 1] as const;

export function EditorialSection() {
  return (
    <section id="about" className="editorial" aria-labelledby="about-title">
      <div className="editorial-inner">
        <motion.div
          className="editorial-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="eyebrow" lang="en">
            CRAFTED TO BE REMEMBERED
          </p>
          <h2 id="about-title" className="section-title">
            פרטים קטנים. רושם בלתי נשכח.
          </h2>
          <p className="section-text">
            אנחנו מאמינים שהרגע שבו מגלים פריט מיוחד הוא חלק מהחוויה. בחרו קולקציה, התקרבו לפרטים
            והתחילו את הסיפור שלכם.
          </p>
          <p className="demo-note">טקסט הדגמה קריאייטיבי — אינו מתאר מותג או עסק קיים.</p>
        </motion.div>

        <ol className="notes">
          {notes.map((note, i) => (
            <motion.li
              key={note.n}
              className="note"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: EASE }}
            >
              <span className="note-n" lang="en" aria-hidden="true">
                {note.n}
              </span>
              <span className="note-en" lang="en">
                {note.en}
              </span>
              <h3 className="note-title">{note.title}</h3>
              <p className="note-text">{note.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
