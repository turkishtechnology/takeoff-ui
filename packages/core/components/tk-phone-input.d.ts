import type { Components, JSX } from '../dist/types/components';

interface TkPhoneInput extends Components.TkPhoneInput, HTMLElement {}
export const TkPhoneInput: {
  prototype: TkPhoneInput;
  new (): TkPhoneInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
