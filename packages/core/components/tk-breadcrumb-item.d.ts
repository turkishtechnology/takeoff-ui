import type { Components, JSX } from '../dist/types/components';

interface TkBreadcrumbItem extends Components.TkBreadcrumbItem, HTMLElement {}
export const TkBreadcrumbItem: {
  prototype: TkBreadcrumbItem;
  new (): TkBreadcrumbItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
