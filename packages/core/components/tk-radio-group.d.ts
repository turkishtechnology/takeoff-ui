import type { Components, JSX } from '../dist/types/components';

interface TkRadioGroup extends Components.TkRadioGroup, HTMLElement {}
export const TkRadioGroup: {
  prototype: TkRadioGroup;
  new (): TkRadioGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
