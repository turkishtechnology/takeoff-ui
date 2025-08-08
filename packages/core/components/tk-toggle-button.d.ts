import type { Components, JSX } from '../dist/types/components';

interface TkToggleButton extends Components.TkToggleButton, HTMLElement {}
export const TkToggleButton: {
  prototype: TkToggleButton;
  new (): TkToggleButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
