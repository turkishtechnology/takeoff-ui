import type { Components, JSX } from '../dist/types/components';

interface TkChips extends Components.TkChips, HTMLElement {}
export const TkChips: {
  prototype: TkChips;
  new (): TkChips;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
