import type { Components, JSX } from '../dist/types/components';

interface TkRating extends Components.TkRating, HTMLElement {}
export const TkRating: {
  prototype: TkRating;
  new (): TkRating;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
