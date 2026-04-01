import { newE2EPage } from '@stencil/core/testing';

describe('tk-radio-group', () => {
  it('selects the clicked radio and emits group change', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <tk-radio-group>
        <tk-radio value="a" label="A"></tk-radio>
        <tk-radio value="b" label="B"></tk-radio>
      </tk-radio-group>
    `);

    const group = await page.find('tk-radio-group');
    const changeSpy = await group.spyOnEvent('tk-change');
    await page.$eval('tk-radio[value="b"] input', el => {
      const input = el as HTMLInputElement;
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(await page.$eval('tk-radio-group', el => (el as HTMLTkRadioGroupElement).value)).toBe('b');
    expect(changeSpy).toHaveReceivedEventDetail('b');
  });
});
