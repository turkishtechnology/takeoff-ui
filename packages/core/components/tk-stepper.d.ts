import type { Components, JSX } from '../dist/types/components';

interface TkStepper extends Components.TkStepper, HTMLElement {}
export const TkStepper: {
  prototype: TkStepper;
  new (): TkStepper;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
