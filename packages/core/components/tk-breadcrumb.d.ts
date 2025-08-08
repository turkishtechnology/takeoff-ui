import type { Components, JSX } from '../dist/types/components';

interface TkBreadcrumb extends Components.TkBreadcrumb, HTMLElement {}
export const TkBreadcrumb: {
  prototype: TkBreadcrumb;
  new (): TkBreadcrumb;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
