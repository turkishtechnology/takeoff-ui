import type { Components, JSX } from '../dist/types/components';

interface TkButton extends Components.TkButton, HTMLElement {}
export const TkButton: {
  prototype: TkButton;
  new (): TkButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
