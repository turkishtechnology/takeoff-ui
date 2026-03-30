import { newSpecPage } from '@stencil/core/testing';
import { TkTabs } from '../tk-tabs';
import { TkTabsItem } from '../tk-tabs-item';

describe('tk-tabs', () => {
  it('activates the tab from the activeIndex prop', async () => {
    const page = await newSpecPage({
      components: [TkTabs, TkTabsItem],
      html: `<tk-tabs><tk-tabs-item label="One">One</tk-tabs-item><tk-tabs-item label="Two">Two</tk-tabs-item></tk-tabs>`,
    });

    page.root.activeIndex = 1;
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('.tab-header.active .tk-tabs-item-label')?.textContent).toBe('Two');
  });
});
