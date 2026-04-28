import { newE2EPage } from '@stencil/core/testing';

describe('tk-popover', () => {
  it('opens on trigger click and emits open state', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>');

    const popover = await page.find('tk-popover');
    const changeSpy = await popover.spyOnEvent('tk-change');
    const trigger = await page.find('tk-popover [slot="trigger"]');

    await trigger.click();
    await page.waitForChanges();

    const content = await page.find('tk-popover >>> .tk-popover-content');

    expect(content).toBeTruthy();
    expect(changeSpy).toHaveReceivedEventDetail(true);
  });
});
