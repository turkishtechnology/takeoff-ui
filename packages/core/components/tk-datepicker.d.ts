import type { Components, JSX } from '../dist/types/components';

interface TkDatepicker extends Components.TkDatepicker, HTMLElement {}
export const TkDatepicker: {
  prototype: TkDatepicker;
  new (): TkDatepicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
