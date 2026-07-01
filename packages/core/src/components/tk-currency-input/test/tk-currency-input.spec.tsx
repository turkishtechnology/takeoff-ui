// uuid v14 ships pure ESM which Jest can't transform from node_modules; stub it for the suite.
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

import { newSpecPage } from '@stencil/core/testing';
import { TkCurrencyInput } from '../tk-currency-input';

describe('tk-currency-input', () => {
  const pasteText = (input: HTMLInputElement, text: string) => {
    const pasteEvent = new Event('paste', { bubbles: true, cancelable: true }) as ClipboardEvent;
    Object.defineProperty(pasteEvent, 'clipboardData', {
      value: {
        getData: () => text,
      },
    });
    input.dispatchEvent(pasteEvent);
  };

  const setSelection = (input: HTMLInputElement, start: number, end: number = start) => {
    Object.defineProperty(input, 'selectionStart', { configurable: true, value: start });
    Object.defineProperty(input, 'selectionEnd', { configurable: true, value: end });
  };

  it('shows the selected currency code in the trigger button', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input default-currency="USD"></tk-currency-input>`,
    });

    expect(page.root.querySelector('.tk-currency-input-dropdown-button-currency-code')?.textContent).toBe('USD');
  });

  it('clamps an out-of-range value prop to min on initial render (no blur required)', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input value="25" min="50" precision="0"></tk-currency-input>`,
    });

    const input = page.root.querySelector('input');
    expect(input.value).toBe('50');
    expect((page.rootInstance as any).currentNumericValue).toBe(50);
  });

  it('clamps an out-of-range value prop to max on initial render', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input value="9999" max="100" precision="0"></tk-currency-input>`,
    });

    const input = page.root.querySelector('input');
    expect(input.value).toBe('100');
    expect((page.rootInstance as any).currentNumericValue).toBe(100);
  });

  it('clamps typed values to the max prop on blur and emits tk-change with the clamped value', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input max="100" precision="0"></tk-currency-input>`,
    });

    const tkChange = jest.fn();
    page.root.addEventListener('tk-change', tkChange);

    const input = page.root.querySelector('input');
    input.value = '150';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(input.value).toBe('150');

    input.dispatchEvent(new Event('blur'));
    await page.waitForChanges();

    expect(input.value).toBe('100');
    expect((page.rootInstance as any).currentNumericValue).toBe(100);
    expect(tkChange).toHaveBeenLastCalledWith(expect.objectContaining({ detail: expect.objectContaining({ value: 100, formattedValue: '100' }) }));
  });

  it('keeps the stored value and the displayed value in sync for a fractional min at default precision', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input value="10" min="50.4"></tk-currency-input>`,
    });

    const input = page.root.querySelector('input');
    // The bound is rounded to the configured precision (2) so display and state agree.
    // Default currency is TRY, whose decimal separator is a comma.
    expect((page.rootInstance as any).currentNumericValue).toBe(50.4);
    expect(input.value).toBe('50,40');
  });

  it('respects min when the range is inverted (min > max)', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input value="75" min="100" max="50" precision="0"></tk-currency-input>`,
    });

    expect((page.rootInstance as any).currentNumericValue).toBe(100);
  });

  it('ignores a negative bound when allowNegative is false', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input value="0" min="-100" max="-10" precision="0"></tk-currency-input>`,
    });

    // Both bounds are negative and unreachable without allowNegative, so they are ignored.
    expect((page.rootInstance as any).currentNumericValue).toBe(0);
    expect(page.root.querySelector('input').value).toBe('0');
  });

  it('does not snap an emptied field up to min on blur', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input min="50" precision="0"></tk-currency-input>`,
    });

    const input = page.root.querySelector('input');
    input.value = '';
    input.dispatchEvent(new Event('blur'));
    await page.waitForChanges();

    expect(input.value).toBe('0');
    expect((page.rootInstance as any).currentNumericValue).toBe(0);
  });

  it('pastes comma decimal values over the default zero value', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input></tk-currency-input>`,
    });

    const tkChange = jest.fn();
    page.root.addEventListener('tk-change', tkChange);

    const input = page.root.querySelector('input');
    setSelection(input, input.value.length);
    pasteText(input, '123,45');
    await page.waitForChanges();

    expect(input.value).toBe('123,45');
    expect((page.rootInstance as any).currentNumericValue).toBe(123.45);
    expect(tkChange).toHaveBeenLastCalledWith(expect.objectContaining({ detail: expect.objectContaining({ value: 123.45, formattedValue: '123,45' }) }));
  });

  it('preserves comma decimals when pasting a fully selected formatted amount', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input value="9876.54"></tk-currency-input>`,
    });

    const input = page.root.querySelector('input');
    setSelection(input, 0, input.value.length);
    pasteText(input, '1.234,56');
    await page.waitForChanges();

    expect(input.value).toBe('1.234,56');
    expect((page.rootInstance as any).currentNumericValue).toBe(1234.56);
  });
});
