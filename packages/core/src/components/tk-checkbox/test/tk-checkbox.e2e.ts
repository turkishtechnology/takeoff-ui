import { newE2EPage } from '@stencil/core/testing';

describe('tk-checkbox', () => {
  it('checks on click and emits change', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-checkbox label="Accept"></tk-checkbox>');

    const checkbox = await page.find('tk-checkbox');
    const changeSpy = await checkbox.spyOnEvent('tk-change');
    await page.$eval('tk-checkbox input', el => {
      const input = el as HTMLInputElement;
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(await page.$eval('tk-checkbox', el => (el as HTMLTkCheckboxElement).value)).toBe(true);
    expect(changeSpy).toHaveReceivedEventDetail(true);
  });
});
