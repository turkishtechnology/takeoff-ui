import { newE2EPage } from '@stencil/core/testing';

describe('tk-select', () => {
  it('opens the panel, selects an option, and emits change', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-select></tk-select>');
    await page.$eval('tk-select', el => {
      (el as HTMLTkSelectElement).options = ['One', 'Two'];
    });
    await page.waitForChanges();

    const select = await page.find('tk-select');
    const changeSpy = await select.spyOnEvent('tk-change');
    const input = await page.find('tk-select .tk-input');

    await input.click();
    await page.waitForChanges();

    const options = await page.findAll('tk-select .dropdown-item');
    await options[1].click();
    await page.waitForChanges();

    expect(await page.find('tk-select .tk-select-panel')).toBeNull();
    expect(await page.$eval('tk-select', el => (el as HTMLTkSelectElement).value)).toBe('Two');
    expect(changeSpy).toHaveReceivedEventDetail('Two');
  });
});
