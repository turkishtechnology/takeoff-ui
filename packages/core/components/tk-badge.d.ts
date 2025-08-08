import type { Components, JSX } from '../dist/types/components';

interface TkBadge extends Components.TkBadge, HTMLElement {}
export const TkBadge: {
  prototype: TkBadge;
  new (): TkBadge;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
