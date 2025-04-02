import { newSpecPage } from '@stencil/core/testing';
import { TkAccordion } from '../tk-accordion';
import { TkAccordionItem } from '../tk-accordion-item';
import { h } from '@stencil/core';

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
  describe('state handling', () => {
    it('item renders with different sizes', async () => {
      const sizes = ['base', 'large'];
      for (const size of sizes) {
        const page = await newSpecPage({
          components: [TkAccordion, TkAccordionItem],
          html: `<tk-accordion><tk-accordion-item size=${size}></tk-accordion-item></tk-accordion>`,
        });

        const accordionItem = page.body.querySelector('tk-accordion-item');

        expect(accordionItem.getAttribute('size')).toBe(size);
      }
    });
    it('item should set type prop according to the parent TkAccordion', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
        html: `<tk-accordion>
        <tk-accordion-item></tk-accordion-item>
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
        components: [TkAccordion, TkAccordionItem],
        html: `<tk-accordion><tk-accordion-item icon="home"></tk-accordion-item></tk-accordion>`,
      });
      const accordionItem = page.body.querySelector('tk-accordion-item');

      expect(accordionItem.icon).toBe('home');
    });
    it('handles icon string', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
        html: `<tk-accordion><tk-accordion-item icon="home"
        ></tk-accordion-item></tk-accordion>`,
      });

      await page.waitForChanges();
      const accordionItem = page.body.querySelector('tk-accordion-item');
      expect(accordionItem.icon).toBe('home');
    });
    it('handles icon object', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
        html: `<tk-accordion><tk-accordion-item
        ></tk-accordion-item></tk-accordion><`,
      });

      const accordionItem = page.body.querySelector('tk-accordion-item');
      accordionItem.icon = {
        name: 'search',
        style: 'rounded',
        fill: true,
        color: '#000000',
      };
      await page.waitForChanges();

      const icon = accordionItem.shadowRoot.querySelector('.material-symbols-rounded') as HTMLElement;

      expect(icon.textContent).toBe('search');
      expect(icon.classList.contains('fill')).toBe(true);
      expect(icon.style.color).toBe('#000000');
    });
    it('handles icon object with default props', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
        html: `<tk-accordion><tk-accordion-item
        ></tk-accordion-item></tk-accordion><`,
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

      expect(icon.style.color).toBe('inherit');
    });
    it('handles object collapse icon', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
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
        components: [TkAccordion, TkAccordionItem],
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
      expect(icon.style.color).toBe('inherit');
    });
    it('handles string collapse icon', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
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
        components: [TkAccordion, TkAccordionItem],
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
        components: [TkAccordion, TkAccordionItem],
        template: () => (
          <tk-accordion>
            <tk-accordion-item active={false}></tk-accordion-item>
          </tk-accordion>
        ),
      });

      await page.waitForChanges();
      const accordionItem = page.body.querySelector('tk-accordion-item');
      const icon = accordionItem.shadowRoot.querySelector('.material-symbols-outlined') as HTMLSpanElement;

      expect(icon.textContent).toBe('keyboard_arrow_down');
    });
    it('handles string expand icon with left arrow position', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
        template: () => (
          <tk-accordion arrowPosition="left">
            <tk-accordion-item active={false}></tk-accordion-item>
          </tk-accordion>
        ),
      });

      await page.waitForChanges();
      const accordionItem = page.body.querySelector('tk-accordion-item');
      const icon = accordionItem.shadowRoot.querySelector('.material-symbols-outlined') as HTMLSpanElement;

      expect(icon.textContent).toBe('keyboard_arrow_down');
    });
    it('item should not render icon when hideArrow is true', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
        template: () => (
          <tk-accordion hideArrows={true}>
            <tk-accordion-item></tk-accordion-item>
          </tk-accordion>
        ),
      });

      const accordionItem = page.body.querySelector('tk-accordion-item');

      expect(accordionItem.icon).toBeFalsy();
    });
  });
  describe('event handling', () => {
    it('should close items when header is clicked when allowMultiple is true', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
        template: () => (
          <tk-accordion activeIndex={0} allowMultiple={true}>
            <tk-accordion-item header={'test'}></tk-accordion-item>
          </tk-accordion>
        ),
      });

      const accordionItem = page.body.querySelector('tk-accordion-item');
      const header = accordionItem.shadowRoot.querySelector('.header') as HTMLElement;

      header.click();

      await page.waitForChanges();

      expect(accordionItem.active).toBeFalsy();
    });
    it('should open items when header is clicked when allowMultiple is true', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
        template: () => (
          <tk-accordion activeIndex={[]} allowMultiple={true}>
            <tk-accordion-item header={'test'}></tk-accordion-item>
          </tk-accordion>
        ),
      });

      const accordionItem = page.body.querySelector('tk-accordion-item');
      const header = accordionItem.shadowRoot.querySelector('.header') as HTMLElement;

      header.click();

      await page.waitForChanges();

      expect(accordionItem.active).toBeTruthy();
    });
    it('should close item when header is clicked when allowMultiple is false', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
        template: () => (
          <tk-accordion activeIndex={0} allowMultiple={false}>
            <tk-accordion-item header={'test'}></tk-accordion-item>
          </tk-accordion>
        ),
      });

      const accordionItem = page.body.querySelector('tk-accordion-item');
      const header = accordionItem.shadowRoot.querySelector('.header') as HTMLElement;

      header.click();

      await page.waitForChanges();

      expect(accordionItem.active).toBeFalsy();
    });
    it('should open item when header is clicked when allowMultiple is false', async () => {
      const page = await newSpecPage({
        components: [TkAccordion, TkAccordionItem],
        template: () => (
          <tk-accordion allowMultiple={false}>
            <tk-accordion-item header={'test'}></tk-accordion-item>
          </tk-accordion>
        ),
      });

      const accordionItem = page.body.querySelector('tk-accordion-item');
      const header = accordionItem.shadowRoot.querySelector('.header') as HTMLElement;

      header.click();

      await page.waitForChanges();

      expect(accordionItem.active).toBeTruthy();
    });
  });
});
