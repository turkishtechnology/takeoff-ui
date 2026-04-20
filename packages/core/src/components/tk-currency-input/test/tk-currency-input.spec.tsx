import { newSpecPage } from '@stencil/core/testing';
import { TkCurrencyInput } from '../tk-currency-input';

describe('tk-currency-input', () => {
  it('renders empty input when value prop is an empty string', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input></tk-currency-input>`,
    });

    const component = page.root as HTMLTkCurrencyInputElement;
    component.value = '';
    await page.waitForChanges();

    const inputElement = page.root?.querySelector('input.tk-currency-input-input') as HTMLInputElement;

    expect(inputElement.value).toBe('');
  });

  it('renders formatted value when value prop is numeric', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input></tk-currency-input>`,
    });

    const component = page.root as HTMLTkCurrencyInputElement;
    component.value = 123;
    await page.waitForChanges();

    const inputElement = page.root?.querySelector('input.tk-currency-input-input') as HTMLInputElement;

    expect(inputElement.value).not.toBe('');
  });

  it('shows the selected currency code in the trigger button', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input default-currency="USD"></tk-currency-input>`,
    });

    expect(page.root.querySelector('.tk-currency-input-dropdown-button-currency-code')?.textContent).toBe('USD');
  });

  it('updates input when value prop changes from number to empty string', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input></tk-currency-input>`,
    });

    const component = page.root as HTMLTkCurrencyInputElement;
    component.value = 123;
    await page.waitForChanges();

    component.value = '';
    await page.waitForChanges();

    const inputElement = page.root?.querySelector('input.tk-currency-input-input') as HTMLInputElement;

    expect(inputElement.value).toBe('');
  });

  it('normalizes cleared user input back to zero', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input></tk-currency-input>`,
    });

    const inputElement = page.root?.querySelector('input.tk-currency-input-input') as HTMLInputElement;

    inputElement.value = '123';
    inputElement.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(inputElement.value).toBe('0,00');
  });
});
