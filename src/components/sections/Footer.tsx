import { brand } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>
          © {brand.year} — <span lang="fr" dir="ltr">{brand.name}</span>. כל הזכויות שמורות.
        </p>
        <p className="footer-demo">
          מותג ותוכן להדגמה בלבד · איורי המוצרים הם איורים מקוריים ולא צילומי מוצר · לא מתבצעות הזמנות או
          תשלומים
        </p>
      </div>
    </footer>
  );
}
