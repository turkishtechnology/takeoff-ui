jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
}));

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TkAccordion } from '../tk-accordion';
import { TkAccordionItem } from '../tk-accordion-item';
import { TkIcon } from '../../tk-icon/tk-icon';

const originalComponentWillLoad = (TkAccordionItem.prototype as any).componentWillLoad;

beforeAll(() => {
  (TkAccordionItem.prototype as any).componentWillLoad = function () {
    this.parentEl = this.el.closest('tk-accordion');

    if (this.parentEl) {
      this.type = this.parentEl.type;
      this.arrowPosition = this.parentEl.arrowPosition;
      this.expandIcon = this.parentEl.expandIcon;
      this.collapseIcon = this.parentEl.collapseIcon;
      this.hideArrows = this.parentEl.hideArrows;
      this.mode = this.parentEl.mode;
    }

    this.hasHeaderSlot = Array.from(this.el.children).some((child: Element) => child.getAttribute?.('slot') === 'header');
  };
});

afterAll(() => {
  (TkAccordionItem.prototype as any).componentWillLoad = originalComponentWillLoad;
});

describe('tk-accordion', () => {
  //Basic Rendering
  describe('basic rendering', () => {
    it('should render with default properties', async () => {
      const page = await newSpecPage({
        components: [TkAccordion],
        html: `<tk-accordion></tk-accordion>`,
      });
      const accordion = page.root.shadowRoot.querySelector('.tk-accordion');
      expect(accordion.getAttribute('activeIndex')).toBeFalsy();
      expect(accordion.getAttribute('allowMultiple')).toBeFalsy();
    });
    it('should render items with default properties', async () => {
      const page = await newSpecPage({
        components: [TkAccordionItem, TkAccordion],
        html: `<tk-accordion><tk-accordion-item></tk-accordion-item></tk-accordion>`,
      });

      const accordionItem = page.body.querySelector('tk-accordion-item');

      expect(accordionItem.getAttribute('itemKey')).toBeFalsy();
      expect(accordionItem.getAttribute('header')).toBeFalsy();
      expect(accordionItem.getAttribute('icon')).toBeFalsy();
    });
    it('item should set header slot', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
        html: `<tk-accordion><tk-accordion-item><div slot="header"></div></tk-accordion-item></tk-accordion>`,
      });
      const accordion = page.root.querySelector('tk-accordion');
      const hasHeader = page.root.shadowRoot.querySelector('[slot="header"]');

      expect(accordion).toBeTruthy;
      expect(hasHeader).toBeTruthy;
    });
    it('item should set content slot', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
        html: `<tk-accordion><tk-accordion-item><div slot="content"></div></tk-accordion-item></tk-accordion>`,
      });
      const accordion = page.root.querySelector('tk-accordion');
      const hasContent = page.root.shadowRoot.querySelector('[slot="content"]');

      expect(accordion).toBeTruthy;
      expect(hasContent).toBeTruthy;
    });
  });

  it('applies numeric activeIndex to child items', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, TkAccordionItem],
      html: `
        <tk-accordion>
          <tk-accordion-item header="Item 1"></tk-accordion-item>
          <tk-accordion-item header="Item 2"></tk-accordion-item>
        </tk-accordion>
        `,
    });
    const accordionItem = page.body.querySelector('tk-accordion-item');
    expect(accordionItem).not.toBeNull;
    expect(accordionItem.shadowRoot.querySelector('.tk-accordion-item').classList.contains('grouped')).toBeTruthy;
  });
  it('activeIndex returns all items if allowMultiple is true', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, TkAccordionItem],
      html: `<tk-accordion active-index="[1,2,3]" allow-multiple="true">
        <tk-accordion-item item-key="1"></tk-accordion-item>
        <tk-accordion-item item-key="2"></tk-accordion-item>
        <tk-accordion-item item-key="3"></tk-accordion-item></tk-accordion>`,
    });
    const accordion = page.body.querySelector('tk-accordion');

    expect(accordion.getAttribute('active-index')).toBe('[1,2,3]');
  });
  it('last item returns active if allowMultiple is false', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, TkAccordionItem],
      template: () => (
        <tk-accordion activeIndex={[0, 1, 2]} allowMultiple={false}>
          <tk-accordion-item></tk-accordion-item>
          <tk-accordion-item></tk-accordion-item>
          <tk-accordion-item></tk-accordion-item>
        </tk-accordion>
      ),
    });

    const accordionItems = page.body.querySelectorAll('tk-accordion-item');

    expect(accordionItems[0].active).toBeFalsy;
    expect(accordionItems[1].active).toBeFalsy;
    expect(accordionItems[2].active).toBeTruthy;
  });
});
describe('icons', () => {
  it('item should handle icon', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, TkAccordionItem, TkIcon],
      html: `<tk-accordion><tk-accordion-item icon="home"></tk-accordion-item></tk-accordion>`,
    });
    const accordionItem = page.body.querySelector('tk-accordion-item');

    expect(accordionItem.icon).toBe('home');
  });
  it('handles icon string', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, TkAccordionItem, TkIcon],
      html: `<tk-accordion><tk-accordion-item icon="home"
        ></tk-accordion-item></tk-accordion>`,
    });

    await page.waitForChanges();
    const accordionItem = page.body.querySelector('tk-accordion-item');
    expect(accordionItem.icon).toBe('home');
  });
  it('handles icon object with default props', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, TkAccordionItem, TkIcon],
      html: `<tk-accordion><tk-accordion-item
        ></tk-accordion-item></tk-accordion>`,
    });

    const accordionItem = page.body.querySelector('tk-accordion-item');
    accordionItem.icon = {
      name: 'search',
    };
    await page.waitForChanges();

    const icon = accordionItem.shadowRoot.querySelector('.material-symbols-outlined') as HTMLElement;
    expect(icon).not.toBeNull;
    expect(icon.textContent).toBe('search');
    expect(icon.classList.contains('fill')).toBe(false);

    expect(icon.style.color).toBe('');
  });
  it('handles object collapse icon', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, TkAccordionItem, TkIcon],
      template: () => (
        <tk-accordion
          activeIndex={0}
          collapseIcon={{
            name: 'search',
            style: 'rounded',
            fill: true,
            color: '#000000',
          }}
        >
          <tk-accordion-item></tk-accordion-item>
        </tk-accordion>
      ),
    });
    await page.waitForChanges();
    const accordionItem = page.body.querySelector('tk-accordion-item');
    const icon = accordionItem.shadowRoot.querySelector('.material-symbols-rounded') as HTMLSpanElement;

    expect(icon.textContent).toBe('search');
    expect(icon.classList.contains('fill')).toBe(true);
    expect(icon.style.color).toBe('#000000');
  });
  it('handles object collapse icon with default props', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, TkAccordionItem, TkIcon],
      template: () => (
        <tk-accordion
          activeIndex={0}
          collapseIcon={{
            name: 'search',
          }}
        >
          <tk-accordion-item></tk-accordion-item>
        </tk-accordion>
      ),
    });
    await page.waitForChanges();
    const accordionItem = page.body.querySelector('tk-accordion-item');
    const icon = accordionItem.shadowRoot.querySelector('.material-symbols-outlined') as HTMLSpanElement;

    expect(icon.textContent).toBe('search');
    expect(icon.style.color).toBe('');
  });
  it('handles string collapse icon', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, TkAccordionItem, TkIcon],
      template: () => (
        <tk-accordion activeIndex={0}>
          <tk-accordion-item></tk-accordion-item>
        </tk-accordion>
      ),
    });

    await page.waitForChanges();
    const accordionItem = page.body.querySelector('tk-accordion-item');
    const icon = accordionItem.shadowRoot.querySelector('.material-symbols-outlined') as HTMLSpanElement;

    expect(icon.textContent).toBe('keyboard_arrow_up');
  });
  it('handles object expand icon', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, TkAccordionItem, TkIcon],
      template: () => (
        <tk-accordion
          expandIcon={{
            name: 'search',
            style: 'rounded',
            fill: true,
            color: '#000000',
          }}
        >
          <tk-accordion-item active={false}></tk-accordion-item>
        </tk-accordion>
      ),
    });
    await page.waitForChanges();
    const accordionItem = page.body.querySelector('tk-accordion-item');
    const icon = accordionItem.shadowRoot.querySelector('.material-symbols-rounded') as HTMLSpanElement;

    expect(icon.textContent).toBe('search');
    expect(icon.classList.contains('fill')).toBe(true);
    expect(icon.style.color).toBe('#000000');
  });
  it('handles string expand icon', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, TkAccordionItem, TkIcon],
      template: () => (
        <tk-accordion>
          <tk-accordion-item active={false}></tk-accordion-item>
        </tk-accordion>
      ),
    });

    const spy = jest.fn();
    const firstItem = page.root.querySelectorAll('tk-accordion-item')[0];

    page.root.addEventListener('tk-active-index-change', spy);
    firstItem.dispatchEvent(new CustomEvent('tk-active-change', { bubbles: true, detail: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });
});
