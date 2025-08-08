import type { Components, JSX } from '../dist/types/components';

interface TkCard extends Components.TkCard, HTMLElement {}
export const TkCard: {
  prototype: TkCard;
  new (): TkCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
