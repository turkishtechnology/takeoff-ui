import type { Components, JSX } from '../dist/types/components';

interface TkEditor extends Components.TkEditor, HTMLElement {}
export const TkEditor: {
  prototype: TkEditor;
  new (): TkEditor;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
