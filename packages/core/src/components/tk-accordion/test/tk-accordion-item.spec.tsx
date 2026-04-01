import { TkAccordionItem } from '../tk-accordion-item';

type TkAccordionItemTestInstance = TkAccordionItem & {
  tkActiveChange: { emit: (value: boolean) => void };
};

describe('tk-accordion-item', () => {
  it('emits active changes when the active prop updates', () => {
    const instance = new TkAccordionItem();
    const emit = jest.fn();

    (instance as unknown as TkAccordionItemTestInstance).tkActiveChange = { emit };
    instance.activeChanged(true, false);

    expect(emit).toHaveBeenCalledWith(true);
  });
});
