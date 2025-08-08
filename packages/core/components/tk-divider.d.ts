import type { Components, JSX } from '../dist/types/components';

interface TkDivider extends Components.TkDivider, HTMLElement {}
export const TkDivider: {
  prototype: TkDivider;
  new (): TkDivider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
