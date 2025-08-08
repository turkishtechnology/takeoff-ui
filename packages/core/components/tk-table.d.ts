import type { Components, JSX } from '../dist/types/components';

interface TkTable extends Components.TkTable, HTMLElement {}
export const TkTable: {
  prototype: TkTable;
  new (): TkTable;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
