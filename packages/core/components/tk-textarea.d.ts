import type { Components, JSX } from '../dist/types/components';

interface TkTextarea extends Components.TkTextarea, HTMLElement {}
export const TkTextarea: {
  prototype: TkTextarea;
  new (): TkTextarea;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
