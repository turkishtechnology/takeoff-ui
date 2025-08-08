import type { Components, JSX } from '../dist/types/components';

interface TkTabs extends Components.TkTabs, HTMLElement {}
export const TkTabs: {
  prototype: TkTabs;
  new (): TkTabs;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
