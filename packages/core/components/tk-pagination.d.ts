import type { Components, JSX } from '../dist/types/components';

interface TkPagination extends Components.TkPagination, HTMLElement {}
export const TkPagination: {
  prototype: TkPagination;
  new (): TkPagination;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
