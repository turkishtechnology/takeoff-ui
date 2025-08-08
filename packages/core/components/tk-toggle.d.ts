import type { Components, JSX } from '../dist/types/components';

interface TkToggle extends Components.TkToggle, HTMLElement {}
export const TkToggle: {
  prototype: TkToggle;
  new (): TkToggle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
