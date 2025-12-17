export type AccordionItemIndex = string | number;

export type ActiveIndex = AccordionItemIndex | AccordionItemIndex[];

export interface IAccordionItemSelect {
  index: AccordionItemIndex;
  itemKey: AccordionItemIndex;
  active: boolean;
}
