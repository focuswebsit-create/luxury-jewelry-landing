/**
 * Central brand configuration.
 *
 * MAISON ÉCLAT is TEMPORARY DEMONSTRATION CONTENT. No trademark, company
 * registration or domain availability has been checked. Replace every value
 * here once a real brand exists — components read from this file only.
 */
export interface ContactConfig {
  /** International format digits only, e.g. "9725XXXXXXXX". `null` = not configured. */
  whatsapp: string | null;
  email: string | null;
  phone: string | null;
}

export interface BrandConfig {
  name: string;
  tagline: string;
  status: "DEMO_PLACEHOLDER" | "LIVE";
  year: number;
  contact: ContactConfig;
}

export const brand: BrandConfig = {
  name: "MAISON ÉCLAT",
  tagline: "FINE OBJECTS",
  status: "DEMO_PLACEHOLDER",
  year: 2026,
  contact: {
    whatsapp: null,
    email: null,
    phone: null,
  },
};

export const isDemo = brand.status === "DEMO_PLACEHOLDER";

export const isContactConfigured = Boolean(
  brand.contact.whatsapp || brand.contact.email || brand.contact.phone,
);
