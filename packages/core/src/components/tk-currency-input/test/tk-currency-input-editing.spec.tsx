// uuid v14 ships pure ESM which Jest can't transform from node_modules; stub it for the suite.
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TkCurrencyInput } from '../tk-currency-input';
import type { ICurrency } from '../types';

const setup = async (attrs = '') =>
  newSpecPage({
    components: [TkCurrencyInput],
    html: `<tk-currency-input ${attrs}></tk-currency-input>`,
  });

const getInput = (page: SpecPage) => page.root.querySelector('input') as HTMLInputElement;
const getButton = (page: SpecPage) => page.root.querySelector('.tk-currency-input-dropdown-button') as HTMLButtonElement;
const getMenu = (page: SpecPage) => page.root.querySelector('.tk-currency-input-dropdown-menu');
const storedValue = (page: SpecPage) => page.rootInstance.currentNumericValue;

const setSelection = (input: HTMLInputElement, start: number | null, end: number | null = start) => {
  Object.defineProperty(input, 'selectionStart', { configurable: true, value: start });
  Object.defineProperty(input, 'selectionEnd', { configurable: true, value: end });
};

const typeValue = async (page: SpecPage, value: string, caret?: number) => {
  const input = getInput(page);
  input.value = value;
  setSelection(input, caret ?? value.length);
  input.dispatchEvent(new Event('input'));
  await page.waitForChanges();
  return input;
};

const blur = async (page: SpecPage) => {
  getInput(page).dispatchEvent(new Event('blur'));
  await page.waitForChanges();
};

const pasteText = (input: HTMLInputElement, text: string | undefined, withClipboard = true) => {
  const pasteEvent = new Event('paste', { bubbles: true, cancelable: true }) as ClipboardEvent;
  if (withClipboard) {
    Object.defineProperty(pasteEvent, 'clipboardData', { value: { getData: () => text } });
  }
  input.dispatchEvent(pasteEvent);
  return pasteEvent;
};

const openDropdown = async (page: SpecPage) => {
  getButton(page).click();
  await page.waitForChanges();
};

const listenChange = (page: SpecPage) => {
  const spy = jest.fn();
  page.root.addEventListener('tk-change', spy);
  return spy;
};

const lastDetail = (spy: jest.Mock) => spy.mock.calls[spy.mock.calls.length - 1][0].detail;

describe('tk-currency-input formatting', () => {
  it('formats the initial value with the selected currency separators', async () => {
    const page = await setup('value="1234567.891" default-currency="USD"');

    expect(getInput(page).value).toBe('1,234,567.89');
  });

  it('formats without decimals when precision is 0', async () => {
    const page = await setup('value="1234.6" precision="0"');

    expect(getInput(page).value).toBe('1.235');
  });

  it('uses custom decimal and thousands separators over the currency defaults', async () => {
    const page = await setup('value="1234.5" default-currency="TRY" decimal-separator="." thousands-separator=","');

    expect(getInput(page).value).toBe('1,234.50');
  });

  it('picks the alternative separator when only a thousands separator is given', async () => {
    const page = await setup('value="1234.5" default-currency="USD" thousands-separator="."');

    // "." is taken as the thousands separator, so the decimal separator flips to ",".
    expect(getInput(page).value).toBe('1.234,50');
  });

  it('formats a space thousands separator (SEK)', async () => {
    const page = await setup('value="1234567.5" default-currency="SEK"');

    expect(getInput(page).value).toBe('1 234 567,50');
  });

  it('shows a negative sign only when allowNegative is true', async () => {
    const withoutNegative = await setup('value="-42.5"');
    expect(getInput(withoutNegative).value).toBe('42,50');

    const withNegative = await setup('value="-42.5" allow-negative="true"');
    expect(getInput(withNegative).value).toBe('-42,50');
  });

  it('reformats the field when the value prop changes', async () => {
    const page = await setup('value="1"');

    page.root.value = 9876.54;
    await page.waitForChanges();

    expect(getInput(page).value).toBe('9.876,54');
    expect(storedValue(page)).toBe(9876.54);
  });

  it('clamps a value prop set at runtime to max', async () => {
    const page = await setup('max="100" precision="0"');

    page.root.value = 500;
    await page.waitForChanges();

    expect(getInput(page).value).toBe('100');
    expect(storedValue(page)).toBe(100);
  });

  it('treats an undefined value prop as zero', async () => {
    const page = await setup('value="5"');

    page.root.value = undefined;
    await page.waitForChanges();

    expect(storedValue(page)).toBe(0);
    expect(getInput(page).value).toBe('0,00');
  });

  it('empties the field for a null value when allowEmptyValue is true', async () => {
    const page = await setup('allow-empty-value="true" min="10"');

    page.root.value = null;
    await page.waitForChanges();

    expect(storedValue(page)).toBeNull();
    expect(getInput(page).value).toBe('');
  });

  it('falls back to zero for a null value when allowEmptyValue is false', async () => {
    const page = await setup('value="5"');

    page.root.value = null;
    await page.waitForChanges();

    expect(storedValue(page)).toBe(0);
    expect(getInput(page).value).toBe('0,00');
  });

  it('shows an empty field for a NaN value instead of "NaN"', async () => {
    const page = await setup('min="0"');

    page.root.value = NaN;
    await page.waitForChanges();

    expect(getInput(page).value).toBe('');
  });

  it('clamps an over-limit negative value to the negative digit bound when allowNegative is true', async () => {
    const page = await setup('value="-123456" allow-negative="true" max-integer-digits="3"');

    expect(storedValue(page)).toBe(-999.99);
    expect(getInput(page).value).toBe('-999,99');
  });

  it('respects a negative min when allowNegative is true', async () => {
    const page = await setup('value="-500" allow-negative="true" min="-100" precision="0"');

    expect(storedValue(page)).toBe(-100);
    expect(getInput(page).value).toBe('-100');
  });
});

describe('tk-currency-input typing', () => {
  it('formats digits as they are typed and emits tk-change with the numeric value', async () => {
    const page = await setup('default-currency="USD"');
    const tkChange = listenChange(page);

    const input = await typeValue(page, '1234');

    expect(input.value).toBe('1,234.00');
    expect(lastDetail(tkChange)).toMatchObject({ value: 1234, formattedValue: '1,234.00' });
    expect(lastDetail(tkChange).currency.code).toBe('USD');
  });

  it('drops letters and symbols from the typed value', async () => {
    const page = await setup('default-currency="USD"');

    const input = await typeValue(page, '12ab$3');

    expect(input.value).toBe('123.00');
    expect(storedValue(page)).toBe(123);
  });

  it('truncates decimals beyond the configured precision', async () => {
    const page = await setup();

    const input = await typeValue(page, '1,23456');

    expect(input.value).toBe('1,23');
    expect(storedValue(page)).toBe(1.23);
  });

  it('keeps the previous decimals when a second decimal separator is typed', async () => {
    const page = await setup('value="123.45"');

    const input = await typeValue(page, '12,3,45');

    expect(input.value).toBe('12,45');
    expect(storedValue(page)).toBe(12.45);
  });

  it('restores the decimal separator and parks the caret on it when only the separator was deleted', async () => {
    const page = await setup('value="123.45"');
    const tkChange = listenChange(page);
    const input = getInput(page);
    input.setSelectionRange = jest.fn();

    await typeValue(page, '12345', 3);

    expect(input.value).toBe('123,45');
    expect(input.setSelectionRange).toHaveBeenCalledWith(3, 3);
    expect(tkChange).not.toHaveBeenCalled();
  });

  it('treats a lone decimal separator as zero', async () => {
    const page = await setup();

    const input = await typeValue(page, ',');

    expect(input.value).toBe('0,00');
    expect(storedValue(page)).toBe(0);
  });

  it('accepts a leading minus only when allowNegative is true', async () => {
    const withoutNegative = await setup();
    expect((await typeValue(withoutNegative, '-12')).value).toBe('12,00');
    expect(storedValue(withoutNegative)).toBe(12);

    const withNegative = await setup('allow-negative="true"');
    expect((await typeValue(withNegative, '-12')).value).toBe('-12,00');
    expect(storedValue(withNegative)).toBe(-12);
  });

  it('collapses duplicate minus signs and ignores a minus in the middle', async () => {
    const page = await setup('allow-negative="true"');

    expect((await typeValue(page, '--12')).value).toBe('-12,00');
    expect((await typeValue(page, '1-2')).value).toBe('12,00');
    expect(storedValue(page)).toBe(12);
  });

  it('clears the value and emits null when the field is emptied with allowEmptyValue', async () => {
    const page = await setup('allow-empty-value="true" value="42"');
    const tkChange = listenChange(page);

    const input = await typeValue(page, '', 0);

    expect(input.value).toBe('');
    expect(storedValue(page)).toBeNull();
    expect(lastDetail(tkChange)).toMatchObject({ value: null, formattedValue: '' });
  });

  it('falls back to zero when the field is emptied without allowEmptyValue', async () => {
    const page = await setup('value="42"');

    const input = await typeValue(page, '', 0);

    expect(input.value).toBe('0,00');
    expect(storedValue(page)).toBe(0);
  });

  it('keeps the caret after the digit that was just typed before a thousands separator is inserted', async () => {
    const page = await setup('default-currency="USD" precision="0"');
    const input = getInput(page);
    input.setSelectionRange = jest.fn();

    // "123" -> user types "4" at the end -> "1,234"; caret stays after the "4".
    await typeValue(page, '123');
    await typeValue(page, '1234', 4);

    expect(input.value).toBe('1,234');
    expect(input.setSelectionRange).toHaveBeenLastCalledWith(5, 5);
  });

  it('keeps the caret inside the integer part when digits are inserted before existing ones', async () => {
    const page = await setup('value="234"');
    const input = getInput(page);
    input.setSelectionRange = jest.fn();

    // Insert "1" in front of "234,00" with the caret right after it.
    await typeValue(page, '1234,00', 1);

    expect(input.value).toBe('1.234,00');
    expect(input.setSelectionRange).toHaveBeenLastCalledWith(1, 1);
  });

  it('keeps the caret right after the decimal separator when nothing was typed after it', async () => {
    const page = await setup('value="5"');
    const input = getInput(page);
    input.setSelectionRange = jest.fn();

    await typeValue(page, '5,00', 2);

    expect(input.setSelectionRange).toHaveBeenLastCalledWith(2, 2);
  });

  it('keeps the caret after the typed decimal digit', async () => {
    const page = await setup('value="5"');
    const input = getInput(page);
    input.setSelectionRange = jest.fn();

    // Replace the decimals: caret sits after the first decimal digit.
    await typeValue(page, '5,70', 3);

    expect(input.value).toBe('5,70');
    expect(input.setSelectionRange).toHaveBeenLastCalledWith(3, 3);
  });

  it('moves the caret to the start when the leading zeros before it are dropped', async () => {
    const page = await setup('value="7"');
    const input = getInput(page);
    input.setSelectionRange = jest.fn();

    // Caret before "007": every digit it was counting from vanishes in "7,00".
    await typeValue(page, '007,00', 0);

    expect(input.value).toBe('7,00');
    expect(input.setSelectionRange).toHaveBeenLastCalledWith(0, 0);
  });

  it('keeps the caret after the minus sign when the leading zeros before it are dropped', async () => {
    const page = await setup('value="-7" allow-negative="true"');
    const input = getInput(page);
    input.setSelectionRange = jest.fn();

    await typeValue(page, '-007,00', 0);

    expect(input.value).toBe('-7,00');
    expect(input.setSelectionRange).toHaveBeenLastCalledWith(1, 1);
  });

  it('puts the caret back where the refused digit was typed', async () => {
    const page = await setup('value="123" max-integer-digits="3"');
    const input = getInput(page);
    input.setSelectionRange = jest.fn();

    // Insert "9" after the first digit: "1|9|23,00" -> refused, caret returns to 1.
    await typeValue(page, '1923,00', 2);

    expect(input.value).toBe('123,00');
    expect(input.setSelectionRange).toHaveBeenLastCalledWith(1, 1);
  });

  it('defaults the caret to the start when the browser reports no selection', async () => {
    const page = await setup('allow-empty-value="true" value="7"');

    const input = getInput(page);
    input.value = '';
    setSelection(input, null, null);
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(storedValue(page)).toBeNull();
  });
});

describe('tk-currency-input keyboard', () => {
  const pressKey = (page: SpecPage, key: string) => {
    const event = new KeyboardEvent('keydown', { key, cancelable: true });
    getInput(page).dispatchEvent(event);
    return event;
  };

  it('blocks the "." key when the decimal separator is a comma', async () => {
    const page = await setup('default-currency="TRY"');

    expect(pressKey(page, '.').defaultPrevented).toBe(true);
    expect(pressKey(page, ',').defaultPrevented).toBe(false);
    expect(pressKey(page, '5').defaultPrevented).toBe(false);
  });

  it('allows the "." key when the decimal separator is a dot', async () => {
    const page = await setup('default-currency="USD"');

    expect(pressKey(page, '.').defaultPrevented).toBe(false);
  });
});

describe('tk-currency-input paste', () => {
  it('inserts pasted text at the caret when only part of the value is selected', async () => {
    const page = await setup('value="1000"');
    const input = getInput(page);

    // "1.000,00" -> paste "5" after "1." -> "1.5000,00"
    setSelection(input, 2, 2);
    const event = pasteText(input, '5');
    await page.waitForChanges();

    expect(event.defaultPrevented).toBe(true);
    expect(input.value).toBe('15.000,00');
    expect(storedValue(page)).toBe(15000);
  });

  it('replaces the selected range with the pasted text', async () => {
    const page = await setup('value="1234"');
    const input = getInput(page);

    // Select "234" in "1.234,00" and paste "9"
    setSelection(input, 2, 5);
    pasteText(input, '9');
    await page.waitForChanges();

    expect(input.value).toBe('19,00');
    expect(storedValue(page)).toBe(19);
  });

  it('appends pasted text when the browser reports no selection', async () => {
    const page = await setup('value="12" precision="0"');
    const input = getInput(page);

    setSelection(input, null, null);
    pasteText(input, '3');
    await page.waitForChanges();

    expect(input.value).toBe('123');
  });

  it('ignores a paste without clipboard text', async () => {
    const page = await setup('value="12"');
    const tkChange = listenChange(page);
    const input = getInput(page);

    const emptyText = pasteText(input, '');
    const noClipboard = pasteText(input, undefined, false);
    await page.waitForChanges();

    expect(emptyText.defaultPrevented).toBe(false);
    expect(noClipboard.defaultPrevented).toBe(false);
    expect(input.value).toBe('12,00');
    expect(tkChange).not.toHaveBeenCalled();
  });

  it('rejects a pasted value containing no digits without changing the stored value', async () => {
    const page = await setup('value="12"');
    const input = getInput(page);

    setSelection(input, 0, input.value.length);
    pasteText(input, 'abc');
    await page.waitForChanges();

    expect(input.value).toBe('0,00');
    expect(storedValue(page)).toBe(0);
  });
});

describe('tk-currency-input focus and blur', () => {
  it('emits tk-focus when the input gains focus', async () => {
    const page = await setup();
    const tkFocus = jest.fn();
    // The focus/blur events are declared without an explicit eventName, so they fire as "tkFocus"/"tkBlur".
    page.root.addEventListener('tkFocus', tkFocus);

    getInput(page).dispatchEvent(new Event('focus'));

    expect(tkFocus).toHaveBeenCalledTimes(1);
  });

  it('emits tk-blur and reformats a partially typed value on blur', async () => {
    const page = await setup('default-currency="USD"');
    const tkBlur = jest.fn();
    page.root.addEventListener('tkBlur', tkBlur);

    const input = getInput(page);
    input.value = '12.5';
    await blur(page);

    expect(input.value).toBe('12.50');
    expect(storedValue(page)).toBe(12.5);
    expect(tkBlur).toHaveBeenCalledTimes(1);
  });

  it('keeps an emptied field empty on blur when allowEmptyValue is true', async () => {
    const page = await setup('allow-empty-value="true" value="9" min="5"');

    const input = getInput(page);
    input.value = '';
    await blur(page);

    expect(input.value).toBe('');
    expect(storedValue(page)).toBeNull();
  });

  it('clamps up to min on blur and emits the clamped value', async () => {
    const page = await setup('min="50" precision="0"');
    const tkChange = listenChange(page);

    await typeValue(page, '20');
    expect(getInput(page).value).toBe('20');

    await blur(page);

    expect(getInput(page).value).toBe('50');
    expect(lastDetail(tkChange)).toMatchObject({ value: 50, formattedValue: '50' });
  });

  it('does not emit tk-change on blur when the value is already within range', async () => {
    const page = await setup('min="1" max="100" value="50"');
    const tkChange = listenChange(page);

    await blur(page);

    expect(tkChange).not.toHaveBeenCalled();
  });
});

describe('tk-currency-input currency selection', () => {
  it('falls back to the first currency when defaultCurrency is unknown', async () => {
    const page = await setup('default-currency="XXX"');

    expect(page.root.querySelector('.tk-currency-input-dropdown-button-currency-code').textContent).toBe('USD');
  });

  it('matches defaultCurrency case-insensitively', async () => {
    const page = await setup('default-currency="eur"');

    expect(page.root.querySelector('.tk-currency-input-dropdown-button-currency-code').textContent).toBe('EUR');
  });

  it('reformats the value and emits tk-change when defaultCurrency changes at runtime', async () => {
    const page = await setup('value="1234.5" default-currency="TRY"');
    const tkChange = listenChange(page);

    page.root.defaultCurrency = 'USD';
    await page.waitForChanges();

    expect(getInput(page).value).toBe('1,234.50');
    expect(lastDetail(tkChange)).toMatchObject({ value: 1234.5, formattedValue: '1,234.50' });
    expect(lastDetail(tkChange).currency.code).toBe('USD');
  });

  it('keeps the current currency when defaultCurrency changes to an unknown code', async () => {
    const page = await setup('value="1234.5" default-currency="TRY"');
    const tkChange = listenChange(page);

    page.root.defaultCurrency = 'NOPE';
    await page.waitForChanges();

    expect(getInput(page).value).toBe('1.234,50');
    expect(tkChange).not.toHaveBeenCalled();
  });

  it('selecting a currency from the list reformats the value, closes the list and emits', async () => {
    const page = await setup('value="1234.5" default-currency="TRY"');
    const tkChange = listenChange(page);

    await openDropdown(page);
    const items = Array.from(page.root.querySelectorAll('.tk-currency-input-dropdown-menu-list-item')) as HTMLElement[];
    const usd = items.find(item => item.querySelector('.tk-currency-input-dropdown-menu-list-dial-id')?.textContent === 'US Dollar');
    usd.click();
    await page.waitForChanges();

    expect(getMenu(page)).toBeNull();
    expect(getInput(page).value).toBe('1,234.50');
    expect(page.root.querySelector('.tk-currency-input-dropdown-button-currency-code').textContent).toBe('USD');
    expect(lastDetail(tkChange).currency.code).toBe('USD');
  });

  it('marks the selected currency in the list', async () => {
    const page = await setup('default-currency="EUR"');

    await openDropdown(page);
    const selected = Array.from(page.root.querySelectorAll('[role="option"]')).filter(item => item.getAttribute('aria-selected') === 'true');

    expect(selected).toHaveLength(1);
    expect(selected[0].querySelector('.tk-currency-input-dropdown-menu-list-dial-id').textContent).toBe('Euro');
  });

  it('uses a custom currency list and shows a placeholder flag for currencies without an id', async () => {
    const list = [
      { code: 'BTC', symbol: 'B', name: 'Bitcoin', decimalSeparator: '.', thousandsSeparator: ',' },
      { code: 'ETH', id: 'XX', name: 'Ether', decimalSeparator: '.', thousandsSeparator: ',' },
    ] as ICurrency[];
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      template: () => <tk-currency-input currencyList={list} defaultCurrency="BTC" value={1.5} />,
    });

    expect(getInput(page).value).toBe('1.50');
    const buttonFlag = page.root.querySelector('.tk-currency-input-dropdown-button .flag');
    expect(buttonFlag.classList.contains('flag-none')).toBe(true);
    expect(buttonFlag.querySelector('tk-icon')).not.toBeNull();

    await openDropdown(page);
    const flags = Array.from(page.root.querySelectorAll('.tk-currency-input-dropdown-menu-list-item .flag'));
    expect(flags).toHaveLength(2);
    expect(flags[1].classList.contains('flag-xx')).toBe(true);
    expect(flags[1].getAttribute('aria-label')).toBe('ETH flag');

    // Searching must not throw for entries missing optional fields.
    page.rootInstance.handleSearchChange({ target: { value: 'eth' } });
    await page.waitForChanges();
    expect(page.root.querySelectorAll('.tk-currency-input-dropdown-menu-list-item')).toHaveLength(1);
  });

  it('hides flags everywhere when hideFlag is true', async () => {
    const page = await setup('hide-flag="true"');

    await openDropdown(page);

    expect(page.root.querySelector('.flag')).toBeNull();
  });
});

describe('tk-currency-input dropdown open and close', () => {
  it('opens on the trigger click and closes on a click outside', async () => {
    const page = await setup();

    await openDropdown(page);
    expect(getMenu(page)).not.toBeNull();

    page.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(getMenu(page)).toBeNull();
    expect(page.rootInstance.searchTerm).toBe('');
  });

  it('ignores clicks inside the component while open', async () => {
    const page = await setup();

    await openDropdown(page);
    page.root.querySelector('.tk-currency-input-dropdown-menu-search').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    getInput(page).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(getMenu(page)).not.toBeNull();
  });

  it('stays open for a click that lands on the detached dropdown or host without bubbling through the host', async () => {
    const page = await setup();
    const instance = page.rootInstance;

    await openDropdown(page);
    instance.closeDropdown({ composedPath: () => [], target: getMenu(page) });
    await page.waitForChanges();
    expect(getMenu(page)).not.toBeNull();

    instance.closeDropdown({ composedPath: () => [], target: getInput(page) });
    await page.waitForChanges();
    expect(getMenu(page)).not.toBeNull();
  });

  it('does nothing on an outside click while closed', async () => {
    const page = await setup();

    page.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(getMenu(page)).toBeNull();
  });

  it('closes the dropdown when the component becomes disabled', async () => {
    const page = await setup();

    await openDropdown(page);
    page.root.disabled = true;
    await page.waitForChanges();

    expect(getMenu(page)).toBeNull();
    expect(getButton(page).hasAttribute('disabled')).toBe(true);
    expect(getInput(page).hasAttribute('disabled')).toBe(true);
  });

  it('does not open when readonly', async () => {
    const page = await setup('readonly="true"');

    await openDropdown(page);

    expect(getMenu(page)).toBeNull();
    expect(getInput(page).hasAttribute('readonly')).toBe(true);
  });

  it('disables the trigger and hides the arrow when currencyDisabled is true', async () => {
    const page = await setup('currency-disabled="true"');

    expect(getButton(page).hasAttribute('disabled')).toBe(true);
    expect(getButton(page).querySelector('tk-icon')).toBeNull();

    await openDropdown(page);
    expect(getMenu(page)).toBeNull();
  });

  it('sizes the dropdown to a fixed width when dropdownWidthMode is a css length', async () => {
    const page = await setup('dropdown-width-mode="300px"');

    await openDropdown(page);
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();

    expect((getMenu(page) as HTMLElement).style.width).toBe('300px');
  });

  it('leaves the dropdown width alone when dropdownWidthMode is auto', async () => {
    const page = await setup('dropdown-width-mode="auto"');

    await openDropdown(page);
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();

    expect((getMenu(page) as HTMLElement).style.width).toBe('');
  });

  it('stops listening for outside clicks once removed from the document', async () => {
    const page = await setup();
    const removeSpy = jest.spyOn(page.doc, 'removeEventListener');

    await openDropdown(page);
    page.root.remove();
    await page.waitForChanges();

    expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function));
    removeSpy.mockRestore();
  });
});

describe('tk-currency-input rendering', () => {
  it('renders the label with an asterisk and links it to the input', async () => {
    const page = await setup('label="Amount" show-asterisk="true"');

    const label = page.root.querySelector('label');
    expect(label.querySelector('.tk-currency-input-label-title').textContent).toBe('Amount');
    expect(label.querySelector('.tk-currency-input-label-asterisk').textContent).toBe('*');
    expect(label.getAttribute('for')).toBe(getInput(page).id);
  });

  it('renders no label element when no label is given', async () => {
    const page = await setup();

    expect(page.root.querySelector('label')).toBeNull();
    expect(page.root.querySelector('.tk-currency-input-label-asterisk')).toBeNull();
  });

  it('applies size, invalid, disabled and readonly state to the container', async () => {
    const page = await setup('size="small" invalid="true" disabled="true" readonly="true"');

    const container = page.root.querySelector('.tk-currency-input-container');
    expect(container.classList.contains('tk-currency-input-container-small')).toBe(true);
    expect(container.getAttribute('aria-invalid')).toBe('true');
    expect(container.getAttribute('aria-disabled')).toBe('true');
    expect(container.getAttribute('aria-readonly')).toBe('true');
  });

  it('does not flag the container when the state props are off', async () => {
    const page = await setup();

    const container = page.root.querySelector('.tk-currency-input-container');
    expect(container.classList.contains('tk-currency-input-container-base')).toBe(true);
    expect(container.getAttribute('aria-invalid')).toBe('false');
    expect(container.getAttribute('aria-disabled')).toBe('false');
    expect(container.getAttribute('aria-readonly')).toBe('false');
  });

  it('passes placeholder and name through to the native input', async () => {
    const page = await setup('placeholder="0,00" name="amount"');

    expect(getInput(page).getAttribute('placeholder')).toBe('0,00');
    expect(getInput(page).getAttribute('name')).toBe('amount');
  });

  it('shows the error message instead of the hint when invalid', async () => {
    const withHint = await setup('hint="Enter an amount"');
    expect(withHint.root.textContent).toContain('Enter an amount');

    const withError = await setup('hint="Enter an amount" error="Too much" invalid="true"');
    expect(withError.root.textContent).toContain('Too much');
    expect(withError.root.textContent).not.toContain('Enter an amount');
  });
});
