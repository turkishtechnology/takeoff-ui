import type { Components, JSX } from '../dist/types/components';

interface TkInput extends Components.TkInput, HTMLElement {}
export const TkInput: {
  prototype: TkInput;
  new (): TkInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
