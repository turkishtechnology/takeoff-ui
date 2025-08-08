import type { Components, JSX } from '../dist/types/components';

interface TkCheckbox extends Components.TkCheckbox, HTMLElement {}
export const TkCheckbox: {
  prototype: TkCheckbox;
  new (): TkCheckbox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
