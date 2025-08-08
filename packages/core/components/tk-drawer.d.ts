import type { Components, JSX } from '../dist/types/components';

interface TkDrawer extends Components.TkDrawer, HTMLElement {}
export const TkDrawer: {
  prototype: TkDrawer;
  new (): TkDrawer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
