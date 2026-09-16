jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
  isNil: (value: unknown) => value === null || value === undefined,
}));

// uuid v14 ships pure ESM which Jest can't transform from node_modules; stub it for the suite.
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkInput } from '../tk-input';
import { IInputMaskOptions } from '../types';

const DATE_MASK: IInputMaskOptions = { blocks: [2, 2, 4], delimiter: '/', numericOnly: true };
// letterOnly is applied by tk-input before Cleave re-syncs; Cleave needs a block or it keeps nothing.
const LETTERS_MASK: IInputMaskOptions = { letterOnly: true, blocks: [10] };

const nativeInputOf = (page: SpecPage) => page.root.querySelector('input') as HTMLInputElement;

const listenChange = (page: SpecPage) => {
  const spy = jest.fn();
  page.root.addEventListener('tk-change', (e: Event) => spy((e as CustomEvent).detail));
  return spy;
};

/** Renders a text input whose mask is already in place when the component loads. */
const renderMasked = async (maskOptions: IInputMaskOptions, value?: string): Promise<SpecPage> =>
  newSpecPage({
    components: [TkInput],
    template: () => <tk-input mode="text" maskOptions={maskOptions} value={value}></tk-input>,
  });

/**
 * The mock DOM has no focus management and no selection API on inputs; this makes the
 * native input look focused with a collapsed caret at `caret` so caret handling runs.
 */
const focusWithCaret = (page: SpecPage, caret: number) => {
  const input = nativeInputOf(page);
  Object.defineProperty(page.doc, 'activeElement', { get: () => input, configurable: true });
  input.setSelectionRange = jest.fn((start: number, end: number) => {
    input.selectionStart = start;
    input.selectionEnd = end;
  });
  input.selectionStart = caret;
  input.selectionEnd = caret;
  return input;
};

const fireInput = (page: SpecPage, text: string) => {
  const input = nativeInputOf(page);
  input.value = text;
  input.dispatchEvent(new Event('input'));
};

describe('tk-input Cleave mask', () => {
  it('formats a value typed into a mask set before load', async () => {
    const page = await renderMasked(DATE_MASK);
    const change = listenChange(page);

    fireInput(page, '1234');

    expect(nativeInputOf(page).value).toBe('12/34/');
    expect(change).toHaveBeenLastCalledWith('12/34/');
    expect(page.root.value).toBe('12/34/');
  });

  it('keeps the caret at the end, after a delimiter the mask appended', async () => {
    const page = await renderMasked(DATE_MASK);
    const input = focusWithCaret(page, 4);

    fireInput(page, '1234');

    expect(input.value).toBe('12/34/');
    expect(input.selectionStart).toBe(6);
  });

  it('keeps the caret where the user is editing in the middle of the value', async () => {
    const page = await renderMasked(DATE_MASK);
    const input = focusWithCaret(page, 1);

    fireInput(page, '1234');

    expect(input.value).toBe('12/34/');
    expect(input.selectionStart).toBe(1);
  });

  it('keeps a mask set at runtime formatting later input', async () => {
    const page = await newSpecPage({ components: [TkInput], html: `<tk-input mode="text"></tk-input>` });
    page.root.maskOptions = DATE_MASK;
    await page.waitForChanges();

    fireInput(page, '01022024');

    expect(nativeInputOf(page).value).toBe('01/02/2024');
  });

  it('ignores an identical maskOptions object set again', async () => {
    const page = await renderMasked(DATE_MASK);
    const cleave = page.rootInstance.cleaveInstance;

    page.root.maskOptions = { ...DATE_MASK };
    await page.waitForChanges();

    expect(page.rootInstance.cleaveInstance).toBe(cleave);
  });

  it('does not build a Cleave instance outside text mode', async () => {
    const page = await newSpecPage({
      components: [TkInput],
      template: () => <tk-input mode="number" maskOptions={DATE_MASK}></tk-input>,
    });

    expect(page.rootInstance.cleaveInstance).toBeUndefined();
    fireInput(page, '1234');
    expect(page.root.value).toBe(1234);
  });

  describe('letterOnly', () => {
    it('strips non-letters from the typed value and emits the filtered text', async () => {
      const page = await renderMasked(LETTERS_MASK);
      const change = listenChange(page);

      fireInput(page, 'ab1c-2');

      expect(nativeInputOf(page).value).toBe('abc');
      expect(change).toHaveBeenLastCalledWith('abc');
    });

    it('moves the caret left by the number of characters dropped before it', async () => {
      const page = await renderMasked(LETTERS_MASK);
      const input = focusWithCaret(page, 3);

      // caret after "ab1": the digit before it is dropped, so the caret lands after "ab"
      fireInput(page, 'ab1c');

      expect(input.value).toBe('abc');
      expect(input.selectionStart).toBe(2);
    });

    it('leaves an all-letter value untouched', async () => {
      const page = await renderMasked(LETTERS_MASK);
      const input = focusWithCaret(page, 3);

      fireInput(page, 'abc');

      expect(input.value).toBe('abc');
      expect(input.selectionStart).toBe(3);
    });
  });

  describe('deleting a delimiter', () => {
    const pressAt = (page: SpecPage, key: 'Backspace' | 'Delete', caret: number, selectionEnd = caret) => {
      const input = nativeInputOf(page);
      input.selectionStart = caret;
      input.selectionEnd = selectionEnd;
      const event = new KeyboardEvent('keydown', { key, cancelable: true });
      input.dispatchEvent(event);
      return event;
    };

    const flushTimers = () => new Promise(resolve => setTimeout(resolve, 1));

    it('Backspace behind a delimiter also removes the digit before it and reformats', async () => {
      const page = await renderMasked(DATE_MASK);
      const input = focusWithCaret(page, 0);
      fireInput(page, '12345');
      expect(input.value).toBe('12/34/5');
      const change = listenChange(page);

      const event = pressAt(page, 'Backspace', 6);
      await flushTimers();

      expect(event.defaultPrevented).toBe(true);
      expect(input.value).toBe('12/35/');
      expect(page.root.value).toBe('12/35/');
      expect(change).toHaveBeenLastCalledWith('12/35/');
      expect(input.selectionStart).toBe(4);
    });

    it('Delete in front of a delimiter also removes the digit after it and reformats', async () => {
      const page = await renderMasked(DATE_MASK);
      const input = focusWithCaret(page, 0);
      fireInput(page, '12345');

      const event = pressAt(page, 'Delete', 2);
      await flushTimers();

      expect(event.defaultPrevented).toBe(true);
      expect(input.value).toBe('12/45/');
      expect(input.selectionStart).toBe(2);
    });

    it('leaves an ordinary character to the browser', async () => {
      const page = await renderMasked(DATE_MASK);
      const input = focusWithCaret(page, 0);
      fireInput(page, '12345');
      const change = listenChange(page);

      const backspace = pressAt(page, 'Backspace', 2);
      const del = pressAt(page, 'Delete', 0);
      const other = pressAt(page, 'ArrowLeft', 3);

      expect(backspace.defaultPrevented).toBe(false);
      expect(del.defaultPrevented).toBe(false);
      expect(other.defaultPrevented).toBe(false);
      expect(input.value).toBe('12/34/5');
      expect(change).not.toHaveBeenCalled();
    });

    it('leaves a selected range and the field edges to the browser', async () => {
      const page = await renderMasked(DATE_MASK);
      const input = focusWithCaret(page, 0);
      fireInput(page, '12345');

      const range = pressAt(page, 'Backspace', 2, 4);
      const atStart = pressAt(page, 'Backspace', 0);
      const atEnd = pressAt(page, 'Delete', input.value.length);

      expect(range.defaultPrevented).toBe(false);
      expect(atStart.defaultPrevented).toBe(false);
      expect(atEnd.defaultPrevented).toBe(false);
      expect(input.value).toBe('12/34/5');
    });

    it('recognises every delimiter of a multi-delimiter mask', async () => {
      const page = await renderMasked({ blocks: [2, 2, 4, 2], delimiters: ['.', '.', ' '], numericOnly: true });
      const input = focusWithCaret(page, 0);
      fireInput(page, '0102202412');
      expect(input.value).toBe('01.02.2024 12');

      const event = pressAt(page, 'Backspace', 11);
      await flushTimers();

      expect(event.defaultPrevented).toBe(true);
      expect(input.value).toBe('01.02.2021 2');
    });

    it('treats the thousands separator of a numeral mask as a delimiter but not the decimal mark', async () => {
      const page = await renderMasked({ numeral: true, numeralDecimalMark: ',', delimiter: '.' });
      const input = focusWithCaret(page, 0);
      fireInput(page, '1234,5');
      expect(input.value).toBe('1.234,5');

      const decimal = pressAt(page, 'Backspace', 6);
      expect(decimal.defaultPrevented).toBe(false);

      const thousands = pressAt(page, 'Backspace', 2);
      await flushTimers();
      expect(thousands.defaultPrevented).toBe(true);
      expect(input.value).toBe('234,5');
    });

    it('falls back to any non-digit as a delimiter for a numeral mask without an explicit one', async () => {
      const page = await renderMasked({ numeral: true });
      const input = focusWithCaret(page, 0);
      fireInput(page, '1234.5');
      expect(input.value).toBe('1,234.5');

      const decimal = pressAt(page, 'Backspace', 6);
      expect(decimal.defaultPrevented).toBe(false);

      const thousands = pressAt(page, 'Backspace', 2);
      await flushTimers();
      expect(thousands.defaultPrevented).toBe(true);
      expect(input.value).toBe('234.5');
    });

    it('does not run for a regex mask', async () => {
      const page = await renderMasked({ regex: /^[0-9/]+$/ });
      const input = focusWithCaret(page, 0);
      fireInput(page, '12/34');

      const event = pressAt(page, 'Backspace', 3);

      expect(event.defaultPrevented).toBe(false);
      expect(input.value).toBe('12/34');
    });
  });
});

describe('tk-input caret preservation on programmatic writes', () => {
  it('keeps the caret when a consumer echoes a reformatted version of the user edit back', async () => {
    const page = await newSpecPage({ components: [TkInput], html: `<tk-input mode="text"></tk-input>` });
    const input = focusWithCaret(page, 0);

    // the user typed "0930" with the caret after "09"
    fireInput(page, '0930');
    input.selectionStart = 2;
    input.selectionEnd = 2;

    // the consumer normalises it to "09:30 AM"
    page.root.value = '09:30 AM';
    await page.waitForChanges();

    expect(input.value).toBe('09:30 AM');
    expect(input.selectionStart).toBe(2);
  });

  it('parks the caret at the end when the new value replaces what the user typed', async () => {
    const page = await newSpecPage({ components: [TkInput], html: `<tk-input mode="text"></tk-input>` });
    const input = focusWithCaret(page, 0);

    fireInput(page, 'abc');
    input.selectionStart = 1;
    input.selectionEnd = 1;

    page.root.value = 'xyz';
    await page.waitForChanges();

    expect(input.value).toBe('xyz');
    expect(input.setSelectionRange).not.toHaveBeenCalled();
  });

  it('does not restore the caret for a value that arrives after focus moved into the field', async () => {
    const page = await newSpecPage({ components: [TkInput], html: `<tk-input mode="text"></tk-input>` });
    const input = focusWithCaret(page, 0);

    fireInput(page, '0930');
    input.dispatchEvent(new Event('focus'));
    input.selectionStart = 2;
    input.selectionEnd = 2;

    page.root.value = '09:30 AM';
    await page.waitForChanges();

    expect(input.value).toBe('09:30 AM');
    expect(input.setSelectionRange).not.toHaveBeenCalled();
  });

  it('clamps a restored caret to the new value length', async () => {
    const page = await newSpecPage({ components: [TkInput], html: `<tk-input mode="text"></tk-input>` });
    const input = focusWithCaret(page, 0);

    fireInput(page, 'abcdef');
    input.selectionStart = 6;
    input.selectionEnd = 6;

    // a reformat that keeps the prefix before the caret but ends up shorter than the caret
    page.root.value = 'abc';
    await page.waitForChanges();

    expect(input.value).toBe('abc');
    expect(input.setSelectionRange).not.toHaveBeenCalled();

    input.selectionStart = 2;
    input.selectionEnd = 2;
    fireInput(page, 'ab');
    input.selectionStart = 2;
    input.selectionEnd = 2;
    page.root.value = 'ab-';
    await page.waitForChanges();

    expect(input.selectionStart).toBe(2);
  });
});
