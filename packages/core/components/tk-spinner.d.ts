import type { Components, JSX } from '../dist/types/components';

interface TkSpinner extends Components.TkSpinner, HTMLElement {}
export const TkSpinner: {
  prototype: TkSpinner;
  new (): TkSpinner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
