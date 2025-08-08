import type { Components, JSX } from '../dist/types/components';

interface TkAccordionItem extends Components.TkAccordionItem, HTMLElement {}
export const TkAccordionItem: {
  prototype: TkAccordionItem;
  new (): TkAccordionItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
