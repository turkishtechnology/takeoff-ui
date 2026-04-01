import { newE2EPage } from '@stencil/core/testing';

describe('tk-toggle', () => {
  it('toggles on click and emits change', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-toggle></tk-toggle>');

    const toggle = await page.find('tk-toggle');
    const changeSpy = await toggle.spyOnEvent('tk-change');
    const nativeInput = await page.find('tk-toggle >>> input');

    await nativeInput.click();
    await page.waitForChanges();

    expect(await page.$eval('tk-toggle', el => (el as HTMLTkToggleElement).value)).toBe(true);
    expect(changeSpy).toHaveReceivedEventDetail(true);
  });
});
