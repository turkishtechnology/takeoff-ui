import type { Components, JSX } from '../dist/types/components';

interface TkAlert extends Components.TkAlert, HTMLElement {}
export const TkAlert: {
  prototype: TkAlert;
  new (): TkAlert;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
