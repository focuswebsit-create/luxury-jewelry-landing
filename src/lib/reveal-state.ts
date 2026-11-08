import type { CollectionId } from "@/data/collections";

/** Exactly four states: none | ring | watch | diamond. */
export type ActiveBox = CollectionId | null;

export type RevealAction =
  | { type: "select"; id: CollectionId }
  | { type: "close" };

/**
 * Pure transition function.
 * - selecting the open box closes it
 * - selecting another box moves directly to it (the previous one closes)
 * - close always returns to the default invitation
 */
export function revealReducer(state: ActiveBox, action: RevealAction): ActiveBox {
  switch (action.type) {
    case "select":
      return state === action.id ? null : action.id;
    case "close":
      return null;
    default:
      return state;
  }
}
