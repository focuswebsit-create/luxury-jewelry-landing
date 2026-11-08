import type { Metadata, Viewport } from "next";
import "@fontsource/frank-ruhl-libre/300.css";
import "@fontsource/frank-ruhl-libre/400.css";
import "@fontsource/frank-ruhl-libre/500.css";
import "@fontsource-variable/assistant";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "./globals.css";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${brand.name} — טבעות, שעונים ויהלומים | קונספט הדגמה`,
  description:
    "דף נחיתה אינטראקטיבי להדגמה: שלוש קופסאות יוקרה — טבעות יהלומים, שעוני יוקרה ויהלומים ואבני חן — שנפתחות וחושפות את הפריט שבתוכן.",
  applicationName: brand.name,
  robots: { index: false, follow: false },
  openGraph: {
    title: `${brand.name} — The Art of Reveal`,
    description: "שלוש קופסאות. שלושה עולמות של דיוק, אור ויופי. (מותג הדגמה)",
    locale: "he_IL",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F6F2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <a href="#main" className="skip-link">
          דלגו לתוכן הראשי
        </a>
        {children}
      </body>
    </html>
  );
}
