"use client";

import { getCollection } from "@/data/collections";
import { brand, isContactConfigured } from "@/lib/brand";
import { useReveal } from "@/components/RevealProvider";

/**
 * Conversion section. Until real contact details exist in `src/lib/brand.ts`
 * it states plainly that it is a demo — no fake form, number or success message.
 */
export function ContactSection() {
  const { interest } = useReveal();
  const chosen = interest ? getCollection(interest) : null;
  const { whatsapp, email, phone } = brand.contact;
  const message = chosen ? `שלום, אשמח לשמוע על ${chosen.titleHe}` : "שלום, אשמח לתאם פגישת ייעוץ";

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="contact-inner">
        <p className="eyebrow" lang="en">
          PRIVATE CONSULTATION
        </p>
        <h2 id="contact-title" className="section-title">
          הפריט הבא שלכם מתחיל בשיחה.
        </h2>
        <p className="section-text">
          השאירו פרטים או פנו אלינו כדי לבחור את הפריט שמתאים לרגע שלכם.
        </p>

        <p className="contact-interest" data-testid="contact-interest" aria-live="polite">
          {chosen ? (
            <>
              הקולקציה שבחרתם: <strong>{chosen.titleHe}</strong>
            </>
          ) : (
            "עדיין לא נבחרה קולקציה — אפשר לחזור לקופסאות בכל רגע."
          )}
        </p>

        {isContactConfigured ? (
          <div className="contact-actions">
            {whatsapp && (
              <a className="btn-primary" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`} rel="noopener noreferrer" target="_blank">
                דברו איתנו ב־WhatsApp
              </a>
            )}
            {email && (
              <a className="btn-ghost" href={`mailto:${email}?subject=${encodeURIComponent(message)}`}>
                שליחת אימייל
              </a>
            )}
            {phone && (
              <a className="btn-ghost" href={`tel:${phone}`}>
                התקשרו אלינו
              </a>
            )}
          </div>
        ) : (
          <div className="demo-status" role="note" data-testid="contact-demo-status">
            <span className="demo-status-badge" lang="en">
              DEMO
            </span>
            <p>
              הדגמת חוויית משתמש — אפשרויות יצירת קשר יתחברו בהמשך. בשלב זה לא נשלחות הודעות ולא נאספים
              פרטים.
            </p>
          </div>
        )}

        <a className="text-link contact-back" href="#collections">
          חזרה לקופסאות
          <span aria-hidden="true">↖</span>
        </a>
      </div>
    </section>
  );
}
