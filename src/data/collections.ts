/**
 * Typed demo catalogue — the single source of truth for the three boxes.
 * Mirrors `data/collections.json` from the brief and extends it with the
 * visual/mechanical tokens each box needs. Copy is editable demo content;
 * it makes no claims about stock, prices, materials or certification.
 */

export type CollectionId = "ring" | "watch" | "diamond";

export type BoxMechanism = "clamshell-hinge" | "hinged-lid" | "lift-lid";

export interface BoxGeometry {
  /** Width / depth / base height / lid height, in abstract stage units (scaled by `--u`). */
  width: number;
  depth: number;
  height: number;
  lidHeight: number;
  /** Height of the cushion surface measured from the bottom of the base. */
  floor: number;
  /** Yaw of the box on the stage, in degrees. */
  yaw: number;
}

export interface Collection {
  id: CollectionId;
  index: string;
  nameHe: string;
  titleHe: string;
  nameEn: string;
  descriptionHe: string;
  ctaHe: string;
  /** Accessible names for the box button. */
  openLabelHe: string;
  closeLabelHe: string;
  visual: {
    material: "espresso-velvet" | "charcoal-leather" | "ivory-display-case";
    mechanism: BoxMechanism;
    geometry: BoxGeometry;
    /** Accent used for the halo / spotlight while this box is open. */
    glow: string;
  };
  asset: {
    /** `original-placeholder-svg` until licensed photography or models are supplied. */
    type: "original-placeholder-svg" | "image";
    /** Path under /public once a real, rights-cleared asset exists. */
    path: string | null;
    altHe: string;
  };
}

export const collections: readonly Collection[] = [
  {
    id: "ring",
    index: "01",
    nameHe: "טבעות",
    titleHe: "טבעות יהלומים",
    nameEn: "RINGS",
    descriptionHe: "נצנוץ מדויק, עיצוב על־זמני ורגעים שנשארים לנצח.",
    ctaHe: "גלו את הטבעות",
    openLabelHe: "פתיחת קופסת טבעות",
    closeLabelHe: "סגירת קופסת טבעות",
    visual: {
      material: "espresso-velvet",
      mechanism: "clamshell-hinge",
      geometry: { width: 128, depth: 118, height: 62, lidHeight: 44, floor: 40, yaw: 16 },
      glow: "rgba(247, 214, 190, 0.75)",
    },
    asset: {
      type: "original-placeholder-svg",
      path: null,
      altHe: "איור הדגמה של טבעת סוליטר עם אבן מרכזית",
    },
  },
  {
    id: "watch",
    index: "02",
    nameHe: "שעונים",
    titleHe: "שעוני יוקרה",
    nameEn: "WATCHES",
    descriptionHe: "תנועה אלגנטית, עיצוב אייקוני ודיוק בכל שנייה.",
    ctaHe: "גלו את השעונים",
    openLabelHe: "פתיחת קופסת שעונים",
    closeLabelHe: "סגירת קופסת שעונים",
    visual: {
      material: "charcoal-leather",
      mechanism: "hinged-lid",
      geometry: { width: 196, depth: 128, height: 58, lidHeight: 32, floor: 36, yaw: 0 },
      glow: "rgba(214, 226, 232, 0.8)",
    },
    asset: {
      type: "original-placeholder-svg",
      path: null,
      altHe: "איור הדגמה של שעון יד עם לוח כהה ורצועת עור",
    },
  },
  {
    id: "diamond",
    index: "03",
    nameHe: "יהלומים",
    titleHe: "יהלומים ואבני חן",
    nameEn: "DIAMONDS",
    descriptionHe: "עולם של אור, חיתוכים מרהיבים ופרטים קטנים שעושים את כל ההבדל.",
    ctaHe: "גלו את היהלומים",
    openLabelHe: "פתיחת קופסת יהלומים",
    closeLabelHe: "סגירת קופסת יהלומים",
    visual: {
      material: "ivory-display-case",
      mechanism: "lift-lid",
      geometry: { width: 150, depth: 142, height: 54, lidHeight: 52, floor: 34, yaw: -16 },
      glow: "rgba(222, 240, 246, 0.85)",
    },
    asset: {
      type: "original-placeholder-svg",
      path: null,
      altHe: "איור הדגמה של אבן חן בחיתוך עגול מבריק",
    },
  },
] as const;

export const defaultInvitation = {
  labelEn: "DISCOVER THE COLLECTIONS",
  titleHe: "הסיפור מתחיל בקופסה אחת",
  descriptionHe: "בחרו קופסה וגלו את הקולקציה שמסתתרת בפנים.",
  ctaHe: "לתיאום פגישה",
} as const;

export function getCollection(id: CollectionId): Collection {
  const found = collections.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown collection: ${id}`);
  return found;
}
