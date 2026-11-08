import type { CSSProperties, ReactNode } from "react";
import { u } from "./geometry";

interface FaceProps {
  /** Width / height in stage units. */
  w: number;
  h: number;
  transform: string;
  className: string;
  children?: ReactNode;
}

/** A single plane of a CSS 3D solid, centred on its parent's origin. */
export function Face({ w, h, transform, className, children }: FaceProps) {
  const style: CSSProperties = {
    width: u(w),
    height: u(h),
    marginLeft: u(-w / 2),
    marginTop: u(-h / 2),
    transform,
  };
  return (
    <span className={`face ${className}`} style={style}>
      {children}
    </span>
  );
}
