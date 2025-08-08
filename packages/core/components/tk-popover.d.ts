import type { Components, JSX } from '../dist/types/components';

interface TkPopover extends Components.TkPopover, HTMLElement {}
export const TkPopover: {
  prototype: TkPopover;
  new (): TkPopover;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
