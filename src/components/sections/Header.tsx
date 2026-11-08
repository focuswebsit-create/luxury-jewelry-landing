import { brand, isDemo } from "@/lib/brand";

const links = [
  { href: "#collections", label: "הקולקציות" },
  { href: "#about", label: "הסיפור שלנו" },
  { href: "#contact", label: "יצירת קשר" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="wordmark" href="#top" aria-label={`${brand.name} — לראש העמוד`}>
          <span className="wordmark-name" lang="fr" dir="ltr">
            {brand.name}
          </span>
          <span className="wordmark-tag" lang="en" dir="ltr">
            {brand.tagline}
            {isDemo ? " · DEMO" : ""}
          </span>
        </a>
        <nav aria-label="ניווט ראשי" className="site-nav">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn-ghost header-cta" href="#contact">
          לתיאום פגישה
        </a>
      </div>
    </header>
  );
}
