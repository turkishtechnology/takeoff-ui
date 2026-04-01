import { newSpecPage } from '@stencil/core/testing';
import { TkTabsItem } from '../tk-tabs-item';

describe('tk-tabs-item', () => {
  it('emits tk-update when the label changes', async () => {
    const page = await newSpecPage({
      components: [TkTabsItem],
      html: `<tk-tabs-item label="One">Panel</tk-tabs-item>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-update', spy);
    page.root.label = 'Two';
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.label).toBe('Two');
  });
});
