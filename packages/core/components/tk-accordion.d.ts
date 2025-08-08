import type { Components, JSX } from '../dist/types/components';

interface TkAccordion extends Components.TkAccordion, HTMLElement {}
export const TkAccordion: {
  prototype: TkAccordion;
  new (): TkAccordion;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
