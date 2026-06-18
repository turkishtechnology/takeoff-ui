import { newSpecPage } from '@stencil/core/testing';
import { TkCurrencyInput } from '../tk-currency-input';

describe('tk-currency-input', () => {
  it('shows the selected currency code in the trigger button', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input default-currency="USD"></tk-currency-input>`,
    });

    expect(page.root.querySelector('.tk-currency-input-dropdown-button-currency-code')?.textContent).toBe('USD');
  });

  it('clamps the value to the min prop on blur', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input value="25" min="50" precision="0"></tk-currency-input>`,
    });

    const input = page.root.querySelector('input');
    input.dispatchEvent(new Event('blur'));
    await page.waitForChanges();

    expect(input.value).toBe('50');
    expect((page.rootInstance as any).currentNumericValue).toBe(50);
  });

  it('clamps typed values to the max prop on blur', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input max="100" precision="0"></tk-currency-input>`,
    });

    const input = page.root.querySelector('input');
    input.value = '150';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(input.value).toBe('150');

    input.dispatchEvent(new Event('blur'));
    await page.waitForChanges();

    expect(input.value).toBe('100');
    expect((page.rootInstance as any).currentNumericValue).toBe(100);
  });
});
