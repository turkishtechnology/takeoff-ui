import type { Components, JSX } from '../dist/types/components';

interface TkTabsItem extends Components.TkTabsItem, HTMLElement {}
export const TkTabsItem: {
  prototype: TkTabsItem;
  new (): TkTabsItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
