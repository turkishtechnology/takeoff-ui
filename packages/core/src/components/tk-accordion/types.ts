export type AccordionItemIndex = string | number;

export interface IAccordionItemSelect {
  index: AccordionItemIndex;
  itemKey: AccordionItemIndex;
  active: boolean;
}
