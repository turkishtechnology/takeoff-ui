import type { Components, JSX } from '../dist/types/components';

interface TkTreeView extends Components.TkTreeView, HTMLElement {}
export const TkTreeView: {
  prototype: TkTreeView;
  new (): TkTreeView;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
