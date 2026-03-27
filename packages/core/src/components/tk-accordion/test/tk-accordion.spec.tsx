jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
}));

import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TkAccordion } from '../tk-accordion';
import { TkIcon } from '../../tk-icon/tk-icon';

@Component({
  tag: 'tk-accordion-item',
  shadow: true,
})
class MockAccordionItem {
  @Prop({ mutable: true }) active: boolean;
  @Prop() itemKey?: string | number;
  @Prop() header?: string;
  @Prop() icon?: string;

  @Event({ eventName: 'tk-active-change' }) tkActiveChange: EventEmitter<boolean>;

  render() {
    return (
      <div>
        <span class="title">{this.header}</span>
        {this.icon && <tk-icon icon={this.icon}></tk-icon>}
      </div>
    );
  }
}

describe('tk-accordion', () => {
  it('renders accordion items from slotted content', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, MockAccordionItem, TkIcon],
      html: `
        <tk-accordion>
          <tk-accordion-item header="Item 1"></tk-accordion-item>
          <tk-accordion-item header="Item 2"></tk-accordion-item>
        </tk-accordion>
      `,
    });

    const items = page.root.querySelectorAll('tk-accordion-item');
    expect(items).toHaveLength(2);
    expect(items[0].shadowRoot.querySelector('.title').textContent).toContain('Item 1');
  });

  it('applies numeric activeIndex to child items', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, MockAccordionItem, TkIcon],
      html: `
        <tk-accordion>
          <tk-accordion-item header="Item 1"></tk-accordion-item>
          <tk-accordion-item header="Item 2"></tk-accordion-item>
        </tk-accordion>
      `,
    });

    page.root.activeIndex = 1;
    await page.waitForChanges();

    const items = page.root.querySelectorAll('tk-accordion-item');

    expect(items[0].active).toBe(false);
    expect(items[1].active).toBe(true);
  });

  it('emits active index changes from item interactions', async () => {
    const page = await newSpecPage({
      components: [TkAccordion, MockAccordionItem, TkIcon],
      html: `
        <tk-accordion>
          <tk-accordion-item header="Item 1"></tk-accordion-item>
          <tk-accordion-item header="Item 2"></tk-accordion-item>
        </tk-accordion>
      `,
    });

    const spy = jest.fn();
    const secondItem = page.root.querySelectorAll('tk-accordion-item')[1];

    page.root.addEventListener('tk-active-index-change', spy);
    secondItem.dispatchEvent(new CustomEvent('tk-active-change', { bubbles: true, detail: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });
});
