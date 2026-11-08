import type { Collection } from "@/data/collections";
import { RingIllustration } from "./RingIllustration";
import { WatchIllustration } from "./WatchIllustration";
import { DiamondIllustration } from "./DiamondIllustration";

/**
 * Renders the product inside a box. Uses a licensed image when
 * `collection.asset.path` is set, otherwise the original SVG placeholder.
 * Decorative here: the box button already carries the accessible name.
 */
export function JewelryObject({ collection }: { collection: Collection }) {
  if (collection.asset.type === "image" && collection.asset.path) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- must stay a plain leaf inside the CSS 3D context
      <img src={collection.asset.path} alt="" className="jewel-svg" draggable={false} />
    );
  }
  switch (collection.id) {
    case "ring":
      return <RingIllustration />;
    case "watch":
      return <WatchIllustration />;
    case "diamond":
      return <DiamondIllustration />;
  }
}
