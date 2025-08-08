import type { Components, JSX } from '../dist/types/components';

interface TkSlider extends Components.TkSlider, HTMLElement {}
export const TkSlider: {
  prototype: TkSlider;
  new (): TkSlider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
