import type { Components, JSX } from '../dist/types/components';

interface TkStep extends Components.TkStep, HTMLElement {}
export const TkStep: {
  prototype: TkStep;
  new (): TkStep;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
