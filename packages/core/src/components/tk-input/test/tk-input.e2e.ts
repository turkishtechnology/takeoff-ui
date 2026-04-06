import { newE2EPage } from '@stencil/core/testing';

describe('tk-input', () => {
  it('updates its value and emits change when typing', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-input></tk-input>');

    const input = await page.find('tk-input');
    const changeSpy = await input.spyOnEvent('tk-change');

    await page.$eval('tk-input input', el => {
      const inputEl = el as HTMLInputElement;
      inputEl.value = 'Hello';
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(await page.$eval('tk-input', el => (el as HTMLTkInputElement).value)).toBe('Hello');
    expect(changeSpy).toHaveReceivedEventDetail('Hello');
  });
});
