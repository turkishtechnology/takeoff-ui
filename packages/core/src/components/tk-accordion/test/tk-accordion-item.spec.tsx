import { newSpecPage } from '@stencil/core/testing';
import { TkAccordionItem } from '../tk-accordion-item';

// Stub componentWillLoad to avoid :scope selector and missing parent issues
jest.spyOn(TkAccordionItem.prototype as any, 'componentWillLoad').mockImplementation(function (this: TkAccordionItem) {
  (this as any).hasHeaderSlot = false;
});

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

  describe('dataTestid', () => {
    it('applies test id to root, header, title and content', async () => {
      const page = await newSpecPage({
        components: [TkAccordionItem],
        html: `<tk-accordion-item data-testid="my-item" header="Title"></tk-accordion-item>`,
      });

      const root = page.root?.shadowRoot?.querySelector('[data-testid="my-item-item"]');
      const header = page.root?.shadowRoot?.querySelector('[data-testid="my-item-header"]');
      const title = page.root?.shadowRoot?.querySelector('[data-testid="my-item-title"]');
      const content = page.root?.shadowRoot?.querySelector('[data-testid="my-item-content"]');

      expect(root).toBeTruthy();
      expect(header).toBeTruthy();
      expect(title).toBeTruthy();
      expect(content).toBeTruthy();
    });

    it('does not add data-testid when prop is not set', async () => {
      const page = await newSpecPage({
        components: [TkAccordionItem],
        html: `<tk-accordion-item header="Title"></tk-accordion-item>`,
      });

      const anyTestId = page.root?.shadowRoot?.querySelector('[data-testid]');
      expect(anyTestId).toBeFalsy();
    });
  });
});
