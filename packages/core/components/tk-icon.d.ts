import type { Components, JSX } from '../dist/types/components';

interface TkIcon extends Components.TkIcon, HTMLElement {}
export const TkIcon: {
  prototype: TkIcon;
  new (): TkIcon;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
