import type { Components, JSX } from '../dist/types/components';

interface TkRadio extends Components.TkRadio, HTMLElement {}
export const TkRadio: {
  prototype: TkRadio;
  new (): TkRadio;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
