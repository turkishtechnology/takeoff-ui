import type { Components, JSX } from '../dist/types/components';

interface TkTooltip extends Components.TkTooltip, HTMLElement {}
export const TkTooltip: {
  prototype: TkTooltip;
  new (): TkTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
