import { newE2EPage } from '@stencil/core/testing';

describe('tk-tabs', () => {
  it('activates the clicked tab and emits a change event', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <tk-tabs>
        <tk-tabs-item label="One">One</tk-tabs-item>
        <tk-tabs-item label="Two">Two</tk-tabs-item>
      </tk-tabs>
    `);

    const tabs = await page.find('tk-tabs');
    const changeSpy = await tabs.spyOnEvent('tk-tab-change');
    const headers = await page.findAll('tk-tabs >>> .tab-header');

    await headers[1].click();
    await page.waitForChanges();

    const activeLabel = await page.find('tk-tabs >>> .tab-header.active .tk-tabs-item-label');

    expect(activeLabel.textContent).toBe('Two');
    expect(changeSpy).toHaveReceivedEventDetail(1);
  });
});
