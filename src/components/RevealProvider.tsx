"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { MotionConfig } from "motion/react";
import type { CollectionId } from "@/data/collections";
import { revealReducer, type ActiveBox } from "@/lib/reveal-state";

interface RevealContextValue {
  active: ActiveBox;
  /** The last collection the visitor opened — kept after closing for the contact section. */
  interest: CollectionId | null;
  select: (id: CollectionId) => void;
  close: () => void;
  registerBox: (id: CollectionId, el: HTMLButtonElement | null) => void;
}

const RevealContext = createContext<RevealContextValue | null>(null);

export function RevealProvider({ children }: { children: ReactNode }) {
  const [active, dispatch] = useReducer(revealReducer, null);
  const interestRef = useRef<CollectionId | null>(null);
  if (active) interestRef.current = active;

  const boxes = useRef(new Map<CollectionId, HTMLButtonElement>());
  const activeRef = useRef<ActiveBox>(null);
  activeRef.current = active;

  const select = useCallback((id: CollectionId) => dispatch({ type: "select", id }), []);
  const close = useCallback(() => dispatch({ type: "close" }), []);
  const registerBox = useCallback((id: CollectionId, el: HTMLButtonElement | null) => {
    if (el) boxes.current.set(id, el);
    else boxes.current.delete(id);
  }, []);

  // Escape closes the open box and returns focus to it when focus was lost
  // (e.g. it sat on the body or on the CTA that is about to change).
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      const current = activeRef.current;
      if (!current) return;
      dispatch({ type: "close" });
      const box = boxes.current.get(current);
      const focused = document.activeElement;
      const focusIsLost = !focused || focused === document.body;
      const focusInStage = focused instanceof HTMLElement && focused.closest("[data-stage]");
      if (box && (focusIsLost || focusInStage)) box.focus({ preventScroll: true });
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = useMemo<RevealContextValue>(
    () => ({ active, interest: interestRef.current, select, close, registerBox }),
    // interest only changes together with `active`
    [active, select, close, registerBox],
  );

  return (
    <RevealContext.Provider value={value}>
      {/* "user": transforms become instant when prefers-reduced-motion is set. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </RevealContext.Provider>
  );
}

export function useReveal(): RevealContextValue {
  const ctx = useContext(RevealContext);
  if (!ctx) throw new Error("useReveal must be used inside <RevealProvider>");
  return ctx;
}
