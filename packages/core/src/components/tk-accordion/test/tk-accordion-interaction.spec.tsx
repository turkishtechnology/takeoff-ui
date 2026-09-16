jest.mock('lodash-es', () => ({
  isEqual: (left: unknown, right: unknown) => JSON.stringify(left) === JSON.stringify(right),
}));

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkAccordion } from '../tk-accordion';
import { TkAccordionItem } from '../tk-accordion-item';
import { TkIcon } from '../../tk-icon/tk-icon';
import type { IAccordionItemSelect } from '../types';

const components = [TkAccordion, TkAccordionItem, TkIcon];

const createAccordion = async (
  attrs = '',
  itemsHtml = `<tk-accordion-item header="One"></tk-accordion-item><tk-accordion-item header="Two"></tk-accordion-item>`,
): Promise<SpecPage> =>
  newSpecPage({
    components,
    html: `<tk-accordion ${attrs}>${itemsHtml}</tk-accordion>`,
  });

// activeIndex set through an attribute always arrives as a string, so numeric indexes go through props
type AccordionProps = Partial<Pick<TkAccordion, 'activeIndex' | 'allowMultiple' | 'type' | 'mode' | 'arrowPosition' | 'expandIcon' | 'collapseIcon'>>;
const createKeylessAccordion = async (props: AccordionProps, headers = ['One', 'Two']): Promise<SpecPage> =>
  newSpecPage({
    components,
    template: () => (
      <tk-accordion {...props}>
        {headers.map(header => (
          <tk-accordion-item header={header}></tk-accordion-item>
        ))}
      </tk-accordion>
    ),
  });

const items = (page: SpecPage) => Array.from(page.root.querySelectorAll('tk-accordion-item')) as HTMLTkAccordionItemElement[];
const itemRoot = (item: HTMLTkAccordionItemElement) => item.shadowRoot.querySelector('.tk-accordion-item') as HTMLElement;
const isOpen = (item: HTMLTkAccordionItemElement) => itemRoot(item).classList.contains('open') && item.shadowRoot.querySelector('.content').classList.contains('open');
const openStates = (page: SpecPage) => items(page).map(isOpen);
const arrowIcon = (item: HTMLTkAccordionItemElement) => item.shadowRoot.querySelector('.header > tk-icon:not(.tk-accordion-item-icon)') as HTMLTkIconElement | null;

const clickHeader = async (page: SpecPage, index: number) => {
  (items(page)[index].shadowRoot.querySelector('.header') as HTMLElement).click();
  await page.waitForChanges();
};

const listen = <T,>(page: SpecPage, eventName: string) => {
  const spy = jest.fn();
  page.root.addEventListener(eventName, spy);
  return {
    details: () => spy.mock.calls.map(call => (call[0] as CustomEvent<T>).detail),
    calls: () => spy.mock.calls.length,
  };
};

describe('tk-accordion interaction', () => {
  describe('opening and closing', () => {
    it('opens a closed item when its header is clicked', async () => {
      const page = await createAccordion();
      const activeIndexChange = listen<number>(page, 'tk-active-index-change');
      const selected = listen<IAccordionItemSelect>(page, 'tk-accordion-item-selected');

      await clickHeader(page, 1);

      expect(openStates(page)).toEqual([false, true]);
      expect(items(page)[1].active).toBe(true);
      expect(activeIndexChange.details()).toEqual([1]);
      expect(selected.details()).toEqual([{ index: 1, active: true }]);
    });

    it('closes an open item when its header is clicked again', async () => {
      const page = await createKeylessAccordion({ activeIndex: 0 });
      const selected = listen<IAccordionItemSelect>(page, 'tk-accordion-item-selected');

      await clickHeader(page, 0);

      expect(openStates(page)).toEqual([false, false]);
      expect(selected.details()).toEqual([{ index: 0, active: false }]);
    });

    it('closes the previously open item when another opens in single mode', async () => {
      const page = await createAccordion();
      const activeIndexChange = listen<number>(page, 'tk-active-index-change');
      const selected = listen<IAccordionItemSelect>(page, 'tk-accordion-item-selected');

      await clickHeader(page, 0);
      await clickHeader(page, 1);

      expect(openStates(page)).toEqual([false, true]);
      expect(activeIndexChange.details()).toEqual([0, 1]);
      expect(selected.details()).toEqual([
        { index: 0, active: true },
        { index: 1, active: true },
      ]);
    });

    it('keeps every clicked item open when allowMultiple is set', async () => {
      const page = await createAccordion('allow-multiple');
      const activeIndexChange = listen<number[]>(page, 'tk-active-index-change');
      const selected = listen<IAccordionItemSelect>(page, 'tk-accordion-item-selected');

      await clickHeader(page, 0);
      await clickHeader(page, 1);

      expect(openStates(page)).toEqual([true, true]);
      expect(activeIndexChange.details()).toEqual([[0], [0, 1]]);

      await clickHeader(page, 0);

      expect(openStates(page)).toEqual([false, true]);
      expect(activeIndexChange.details()).toEqual([[0], [0, 1], [1]]);
      expect(selected.details()).toEqual([
        { index: 0, active: true },
        { index: 1, active: true },
        { index: 0, active: false },
      ]);
    });

    it('reports item keys instead of positions when items are keyed', async () => {
      const page = await createAccordion(
        '',
        `<tk-accordion-item item-key="general" header="General"></tk-accordion-item><tk-accordion-item item-key="advanced" header="Advanced"></tk-accordion-item>`,
      );
      const activeIndexChange = listen<string>(page, 'tk-active-index-change');
      const selected = listen<IAccordionItemSelect>(page, 'tk-accordion-item-selected');

      await clickHeader(page, 1);

      expect(activeIndexChange.details()).toEqual(['advanced']);
      expect(selected.details()).toEqual([{ index: 'advanced', active: true }]);
      expect(openStates(page)).toEqual([false, true]);
    });

    it('opens an item programmatically through its active prop', async () => {
      const page = await createAccordion();
      const activeIndexChange = listen<number>(page, 'tk-active-index-change');

      items(page)[1].active = true;
      await page.waitForChanges();

      expect(openStates(page)).toEqual([false, true]);
      expect(activeIndexChange.details()).toEqual([1]);

      items(page)[0].active = true;
      await page.waitForChanges();

      expect(openStates(page)).toEqual([true, false]);
      expect(activeIndexChange.details()).toEqual([1, 0]);
    });

    it('wires up an item that is appended after load', async () => {
      const page = await createAccordion();
      const activeIndexChange = listen<number>(page, 'tk-active-index-change');
      const selected = listen<IAccordionItemSelect>(page, 'tk-accordion-item-selected');

      const appended = page.doc.createElement('tk-accordion-item');
      appended.setAttribute('header', 'Three');
      page.root.appendChild(appended);
      await page.waitForChanges();

      await clickHeader(page, 2);

      expect(openStates(page)).toEqual([false, false, true]);
      expect(activeIndexChange.details()).toEqual([2]);
      expect(selected.details()).toEqual([{ index: 2, active: true }]);

      await clickHeader(page, 0);

      expect(openStates(page)).toEqual([true, false, false]);
      expect(activeIndexChange.details()).toEqual([2, 0]);
    });

    it('ignores active changes from items of a nested accordion', async () => {
      const page = await createAccordion(
        '',
        `<tk-accordion-item header="Outer"><tk-accordion slot="content"><tk-accordion-item header="Inner"></tk-accordion-item></tk-accordion></tk-accordion-item>`,
      );
      const activeIndexChange = jest.fn();
      page.root.addEventListener('tk-active-index-change', activeIndexChange);
      const innerAccordion = page.root.querySelector('tk-accordion') as HTMLTkAccordionElement;
      const inner = innerAccordion.querySelector('tk-accordion-item') as HTMLTkAccordionItemElement;

      (inner.shadowRoot.querySelector('.header') as HTMLElement).click();
      await page.waitForChanges();

      expect(isOpen(inner)).toBe(true);
      expect(isOpen(items(page)[0])).toBe(false);
      // only the inner accordion reports the change; it bubbles through the outer one untouched
      expect(activeIndexChange.mock.calls.map(call => (call[0] as CustomEvent).target)).toEqual([innerAccordion]);
    });
  });

  describe('activeIndex prop', () => {
    it('opens the item at the given position on load', async () => {
      const page = await createKeylessAccordion({ activeIndex: 1 });

      expect(openStates(page)).toEqual([false, true]);
    });

    it('opens the keyed item matching a string activeIndex', async () => {
      const page = await createAccordion('active-index="b"', `<tk-accordion-item item-key="a"></tk-accordion-item><tk-accordion-item item-key="b"></tk-accordion-item>`);

      expect(openStates(page)).toEqual([false, true]);
    });

    it('opens every listed item when allowMultiple is set', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <tk-accordion activeIndex={[0, 2]} allowMultiple>
            <tk-accordion-item header="One"></tk-accordion-item>
            <tk-accordion-item header="Two"></tk-accordion-item>
            <tk-accordion-item header="Three"></tk-accordion-item>
          </tk-accordion>
        ),
      });

      expect(openStates(page)).toEqual([true, false, true]);
    });

    it('opens nothing for an empty activeIndex array', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <tk-accordion activeIndex={[]}>
            <tk-accordion-item header="One"></tk-accordion-item>
            <tk-accordion-item header="Two"></tk-accordion-item>
          </tk-accordion>
        ),
      });

      expect(openStates(page)).toEqual([false, false]);
    });

    it('syncs the open items when activeIndex changes after load', async () => {
      const page = await createKeylessAccordion({ activeIndex: 0 });
      const activeIndexChange = listen<number>(page, 'tk-active-index-change');

      page.root.activeIndex = 1;
      await page.waitForChanges();

      expect(openStates(page)).toEqual([false, true]);
      // the new value came from the prop itself, so nothing is reported back
      expect(activeIndexChange.calls()).toBe(0);
    });

    it('closes everything when activeIndex is cleared', async () => {
      const page = await createKeylessAccordion({ activeIndex: 1 });

      page.root.activeIndex = undefined;
      await page.waitForChanges();

      expect(openStates(page)).toEqual([false, false]);
    });

    it('ignores an activeIndex update that matches the current state', async () => {
      const page = await createAccordion('allow-multiple');
      await clickHeader(page, 1);
      const activeIndexChange = listen(page, 'tk-active-index-change');

      page.root.activeIndex = [1];
      await page.waitForChanges();

      expect(openStates(page)).toEqual([false, true]);
      expect(activeIndexChange.calls()).toBe(0);
    });

    it('reports a user change as a value that differs from the prop', async () => {
      const page = await createKeylessAccordion({ activeIndex: 0 });
      const activeIndexChange = listen<number>(page, 'tk-active-index-change');

      await clickHeader(page, 1);

      expect(activeIndexChange.details()).toEqual([1]);
      expect(openStates(page)).toEqual([false, true]);
    });
  });

  describe('initial active items', () => {
    it('uses the items own active prop when no activeIndex is given', async () => {
      const page = await createAccordion('', `<tk-accordion-item></tk-accordion-item><tk-accordion-item active></tk-accordion-item>`);

      expect(openStates(page)).toEqual([false, true]);

      await clickHeader(page, 1);
      expect(openStates(page)).toEqual([false, false]);
    });

    it('keeps every initially active item open when allowMultiple is set', async () => {
      const page = await createAccordion(
        'allow-multiple',
        `<tk-accordion-item active></tk-accordion-item><tk-accordion-item></tk-accordion-item><tk-accordion-item active></tk-accordion-item>`,
      );

      expect(openStates(page)).toEqual([true, false, true]);
      expect(items(page).map(item => item.active)).toEqual([true, false, true]);

      await clickHeader(page, 0);
      expect(openStates(page)).toEqual([false, false, true]);
    });

    it('keeps only the first initially active item open without allowMultiple', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const page = await createAccordion('', `<tk-accordion-item active></tk-accordion-item><tk-accordion-item></tk-accordion-item><tk-accordion-item active></tk-accordion-item>`);

      expect(openStates(page)).toEqual([true, false, false]);
      (console.error as jest.Mock).mockRestore();
    });

    it('warns when several items are active without allowMultiple', async () => {
      const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);

      await createAccordion('', `<tk-accordion-item active></tk-accordion-item><tk-accordion-item active></tk-accordion-item>`);

      expect(error).toHaveBeenCalledWith(expect.stringContaining('allowMultiple is false'));
      error.mockRestore();
    });

    it('warns when both activeIndex and item active props are used', async () => {
      const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);

      await createAccordion('active-index="1"', `<tk-accordion-item active></tk-accordion-item><tk-accordion-item></tk-accordion-item>`);

      expect(error).toHaveBeenCalledWith(expect.stringContaining('cannot have both activeIndex and active accordion items'));
      error.mockRestore();
    });

    it('warns when item keys mix types', async () => {
      const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);

      await newSpecPage({
        components,
        template: () => (
          <tk-accordion>
            <tk-accordion-item itemKey="a"></tk-accordion-item>
            <tk-accordion-item itemKey={2}></tk-accordion-item>
          </tk-accordion>
        ),
      });

      expect(error).toHaveBeenCalledWith(expect.stringContaining('keys must be of the same type'));
      error.mockRestore();
    });

    it('warns when a string activeIndex targets keyless items', async () => {
      const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);

      await createAccordion('active-index="first"');

      expect(error).toHaveBeenCalledWith(expect.stringContaining('activeIndex must be of type number'));
      error.mockRestore();
    });

    it('does not warn for a consistent keyed configuration', async () => {
      const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);

      await createAccordion('active-index="a"', `<tk-accordion-item item-key="a"></tk-accordion-item><tk-accordion-item item-key="b"></tk-accordion-item>`);

      expect(error).not.toHaveBeenCalled();
      error.mockRestore();
    });
  });

  describe('item appearance inherited from the accordion', () => {
    it('passes type, mode, arrow position and icons down to its items', async () => {
      const page = await createKeylessAccordion({ type: 'divided', mode: 'compact', arrowPosition: 'left', expandIcon: 'add', collapseIcon: 'remove', activeIndex: 0 });
      const [open, closed] = items(page);

      expect(itemRoot(open).classList.contains('divided')).toBe(true);
      expect(itemRoot(open).classList.contains('compact')).toBe(true);
      expect(arrowIcon(open).icon).toBe('remove');
      expect(arrowIcon(closed).icon).toBe('add');
      expect(open.shadowRoot.querySelector('.header').firstElementChild.tagName).toBe('TK-ICON');
    });

    it('places the arrow after the title by default', async () => {
      const page = await createAccordion();
      const header = items(page)[0].shadowRoot.querySelector('.header');

      expect(header.lastElementChild.tagName).toBe('TK-ICON');
      expect(header.firstElementChild.classList.contains('title')).toBe(true);
      expect(arrowIcon(items(page)[0]).icon).toBe('keyboard_arrow_down');
    });

    it('renders no arrows when hideArrows is set', async () => {
      const page = await createAccordion('hide-arrows');

      expect(arrowIcon(items(page)[0])).toBeNull();
    });

    it('swaps the arrow icon and its test id when the item opens', async () => {
      const page = await createAccordion('', `<tk-accordion-item data-testid="faq" header="Q"></tk-accordion-item>`);
      const item = items(page)[0];

      expect(arrowIcon(item).icon).toBe('keyboard_arrow_down');
      expect(arrowIcon(item).dataTestid).toBe('faq-expand-icon');

      await clickHeader(page, 0);

      expect(arrowIcon(item).icon).toBe('keyboard_arrow_up');
      expect(arrowIcon(item).dataTestid).toBe('faq-collapse-icon');
    });
  });

  describe('item header and icon', () => {
    it('renders the header prop as the title', async () => {
      const page = await createAccordion('', `<tk-accordion-item header="Shipping"></tk-accordion-item>`);

      expect(items(page)[0].shadowRoot.querySelector('.title').textContent).toBe('Shipping');
    });

    it('prefers a header slot over the header prop', async () => {
      const page = await createAccordion('', `<tk-accordion-item header="Ignored"><strong slot="header">Custom</strong></tk-accordion-item>`);
      const title = items(page)[0].shadowRoot.querySelector('.title');

      expect(title.querySelector('slot[name="header"]')).not.toBeNull();
      expect(title.textContent).not.toContain('Ignored');
    });

    it('renders an empty title without header or slot', async () => {
      const page = await createAccordion('', `<tk-accordion-item></tk-accordion-item>`);

      expect(items(page)[0].shadowRoot.querySelector('.title').textContent).toBe('');
    });

    it('renders a leading icon from the icon prop', async () => {
      const page = await createAccordion('', `<tk-accordion-item icon="home" header="Home"></tk-accordion-item>`);
      const header = items(page)[0].shadowRoot.querySelector('.header');
      const icon = header.querySelector('tk-icon.tk-accordion-item-icon') as HTMLTkIconElement;

      expect(icon.icon).toBe('home');
      expect(header.children[0]).toBe(icon);
    });

    it('renders icons on both sides from a multi icon option', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <tk-accordion>
            <tk-accordion-item icon={{ left: 'home', right: 'star' }} header="Home"></tk-accordion-item>
          </tk-accordion>
        ),
      });
      const header = items(page)[0].shadowRoot.querySelector('.header');
      const icons = Array.from(header.querySelectorAll('tk-icon.tk-accordion-item-icon')) as HTMLTkIconElement[];

      expect(icons.map(icon => icon.icon)).toEqual(['home', 'star']);
      expect(header.children[0]).toBe(icons[0]);
      expect(header.children[2]).toBe(icons[1]);
    });

    it('applies the size class to the item', async () => {
      const page = await createAccordion('', `<tk-accordion-item size="large"></tk-accordion-item>`);

      expect(itemRoot(items(page)[0]).classList.contains('large')).toBe(true);
    });
  });

  describe('standalone item', () => {
    it('emits tk-active-change with the toggled value when its header is clicked', async () => {
      const page = await newSpecPage({
        components: [TkAccordionItem, TkIcon],
        html: `<tk-accordion-item header="Alone"></tk-accordion-item>`,
      });
      const activeChange = listen<boolean>(page, 'tk-active-change');

      (page.root.shadowRoot.querySelector('.header') as HTMLElement).click();
      await page.waitForChanges();

      expect(activeChange.details()).toEqual([true]);
      // without an accordion nobody applies the change, so the item stays closed
      expect(page.root.shadowRoot.querySelector('.tk-accordion-item').classList.contains('open')).toBe(false);
    });

    it('emits tk-active-change when its active prop changes', async () => {
      const page = await newSpecPage({
        components: [TkAccordionItem, TkIcon],
        html: `<tk-accordion-item header="Alone"></tk-accordion-item>`,
      });
      const activeChange = listen<boolean>(page, 'tk-active-change');

      page.root.active = true;
      await page.waitForChanges();

      expect(activeChange.details()).toEqual([true]);
      expect(page.root.shadowRoot.querySelector('.tk-accordion-item').classList.contains('open')).toBe(true);
    });
  });
});
