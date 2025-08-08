import type { Components, JSX } from '../dist/types/components';

interface TkSelect extends Components.TkSelect, HTMLElement {}
export const TkSelect: {
  prototype: TkSelect;
  new (): TkSelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
