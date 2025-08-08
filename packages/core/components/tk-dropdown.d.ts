import type { Components, JSX } from '../dist/types/components';

interface TkDropdown extends Components.TkDropdown, HTMLElement {}
export const TkDropdown: {
  prototype: TkDropdown;
  new (): TkDropdown;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
