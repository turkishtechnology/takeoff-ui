import type { Components, JSX } from '../dist/types/components';

interface TkDialog extends Components.TkDialog, HTMLElement {}
export const TkDialog: {
  prototype: TkDialog;
  new (): TkDialog;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
