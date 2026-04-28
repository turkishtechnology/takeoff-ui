import { newE2EPage } from '@stencil/core/testing';

describe('tk-dropdown', () => {
  it('opens from the trigger and emits the clicked item', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-dropdown><button slot="trigger">Open</button></tk-dropdown>');
    await page.$eval('tk-dropdown', el => {
      (el as HTMLTkDropdownElement).options = ['One', 'Two'];
    });
    await page.waitForChanges();

    const dropdown = await page.find('tk-dropdown');
    const itemClickSpy = await dropdown.spyOnEvent('tk-item-click');
    const trigger = await page.find('tk-dropdown [slot="trigger"]');

    await trigger.click();
    await page.waitForChanges();

    const items = await page.findAll('tk-dropdown .tk-dropdown-item');
    await items[1].click();
    await page.waitForChanges();

    expect(await page.find('tk-dropdown .tk-dropdown-panel')).toBeNull();
    expect(itemClickSpy).toHaveReceivedEventDetail('Two');
  });
});
