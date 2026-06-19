jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
  isNil: (value: unknown) => value === null || value === undefined,
}));

// uuid v14 ships pure ESM which Jest can't transform from node_modules; stub it for the suite.
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

import { newSpecPage } from '@stencil/core/testing';
import { TkInput } from '../tk-input';

describe('tk-input', () => {
  it('renders the label asterisk when showAsterisk is true', async () => {
    const page = await newSpecPage({
      components: [TkInput],
      html: `<tk-input label="Name" show-asterisk="true"></tk-input>`,
    });

    expect(page.root.querySelector('.label .asterisk')?.textContent).toBe('*');
  });

  describe('regex mask', () => {
    // Simulates realistic typing: appends one character at a time and fires an
    // input event after each keystroke, the way a real <input> behaves.
    const setup = async (regex: RegExp | string) => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="text"></tk-input>`,
      });
      page.rootInstance.maskOptions = { regex };
      const input = page.root.querySelector('input') as HTMLInputElement;
      const type = (text: string) => {
        for (const ch of text) {
          input.value = input.value + ch;
          input.dispatchEvent(new Event('input'));
        }
      };
      return { page, input, type };
    };

    it('keeps valid characters when an invalid one is typed (anchored pattern)', async () => {
      // Anchored, whole-string pattern is the natural way a dev writes a mask rule.
      const { page, input, type } = await setup(/^[A-Z0-9]+$/);

      type('ABC');
      expect(input.value).toBe('ABC');

      // Typing an invalid char must NOT wipe the field — it must reject only the bad char.
      type('!');
      expect(input.value).toBe('ABC');
      expect(page.rootInstance.value).toBe('ABC');

      // Typing continues to work after a rejected keystroke.
      type('9');
      expect(input.value).toBe('ABC9');
    });

    it('rejects invalid characters as they are typed (character-class pattern)', async () => {
      const { input, type } = await setup(/^[A-Z0-9]+$/);

      type('A1b2C');
      expect(input.value).toBe('A12C');
    });

    it('accepts a string regex source', async () => {
      const { input, type } = await setup('^[0-9]*$');

      type('12a34');
      expect(input.value).toBe('1234');
    });

    it('enforces the length limit from a {n,m} quantifier', async () => {
      // Digits and commas, max 10 characters.
      const { input, type } = await setup(/^[0-9,]{1,10}$/);

      type('1,2,3,4,5,'); // 10 chars
      expect(input.value).toBe('1,2,3,4,5,');
      expect(input.value).toHaveLength(10);

      // The 11th character is rejected; the value stays capped at 10.
      type('6');
      expect(input.value).toBe('1,2,3,4,5,');
    });

    it('enforces an exact-length {n} quantifier', async () => {
      const { input, type } = await setup(/^[A-Z]{3}$/);

      type('ABCDE');
      expect(input.value).toBe('ABC');
    });

    it('keeps an unbounded + quantifier length-unlimited', async () => {
      const { input, type } = await setup(/^[0-9]+$/);

      type('1234567890123456');
      expect(input.value).toBe('1234567890123456');
    });

    it('validates structural patterns incrementally (alternation)', async () => {
      const { input, type } = await setup(/^(abc|def)$/);

      type('abc');
      expect(input.value).toBe('abc');
      // 'x' cannot continue either branch and is rejected.
      type('x');
      expect(input.value).toBe('abc');
    });

    it('validates positional patterns incrementally (letters then digits)', async () => {
      const { page, input, type } = await setup(/^[A-Z]{2}[0-9]{4}$/);

      type('AB'); // letters accepted
      expect(input.value).toBe('AB');
      type('C'); // a third letter is not allowed at this position
      expect(input.value).toBe('AB');
      type('1234'); // digits accepted
      expect(input.value).toBe('AB1234');
      expect(page.rootInstance.value).toBe('AB1234');
    });

    it('disables the mask and warns for an unsupported/invalid regex', async () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
      const { input, type } = await setup('[A-Z'); // unterminated character class

      type('a!1'); // mask disabled → input passes through untouched
      expect(input.value).toBe('a!1');
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('maskOptions.regex'));
      warn.mockRestore();
    });
  });

  describe('regex mask — interactions with other features', () => {
    const typeInto = (input: HTMLInputElement, text: string) => {
      for (const ch of text) {
        input.value = input.value + ch;
        input.dispatchEvent(new Event('input'));
      }
    };

    it('does not create a Cleave instance for a regex-only mask', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="text"></tk-input>`,
      });
      page.rootInstance.maskOptions = { regex: /^[A-Z]+$/ };
      await page.waitForChanges();
      // cleaveInstance must stay undefined so the Cleave-specific code paths (initial
      // space stripping, backspace delimiter logic) never run for regex masks.
      expect((page.rootInstance as any).cleaveInstance).toBeUndefined();
    });

    it('reverts to the initial value (not empty) when the first keystroke is invalid', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="text" value="ABC"></tk-input>`,
      });
      page.rootInstance.maskOptions = { regex: /^[A-Z]+$/ };
      await page.waitForChanges();
      const input = page.root.querySelector('input') as HTMLInputElement;

      typeInto(input, '!'); // invalid right away
      expect(input.value).toBe('ABC'); // restored, not wiped to ''
    });

    it('keeps a programmatically-set value as the revert target', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="text"></tk-input>`,
      });
      page.rootInstance.maskOptions = { regex: /^[A-Z]+$/ };
      await page.waitForChanges();
      const input = page.root.querySelector('input') as HTMLInputElement;

      // External/programmatic value set.
      page.rootInstance.value = 'XY';
      await page.waitForChanges();
      expect(input.value).toBe('XY');

      typeInto(input, '!'); // invalid keystroke
      expect(input.value).toBe('XY'); // reverts to the set value, not stale ''
    });

    it('reverts cleanly after the clear button is used', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="text" clearable="true"></tk-input>`,
      });
      page.rootInstance.maskOptions = { regex: /^[A-Z]+$/ };
      await page.waitForChanges();
      const input = page.root.querySelector('input') as HTMLInputElement;

      typeInto(input, 'ABC');
      expect(input.value).toBe('ABC');

      (page.rootInstance as any).handleFormReset();
      await page.waitForChanges();

      typeInto(input, '!'); // invalid after clear
      expect(input.value).toBe(''); // empty, not the stale 'ABC'
      typeInto(input, 'Z');
      expect(input.value).toBe('Z');
    });

    it('salvages the valid leading prefix of a pasted value', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="text"></tk-input>`,
      });
      page.rootInstance.maskOptions = { regex: /^[A-Z]+$/ };
      await page.waitForChanges();
      const input = page.root.querySelector('input') as HTMLInputElement;

      // Simulate a paste: the whole string lands at once, then one input event fires.
      input.value = 'AB!CD';
      input.dispatchEvent(new Event('input'));
      expect(input.value).toBe('AB'); // leading valid prefix kept, junk dropped
    });

    it('resets revert state when the mask changes at runtime', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="text"></tk-input>`,
      });
      page.rootInstance.maskOptions = { regex: /^[A-Z]+$/ };
      await page.waitForChanges();
      const input = page.root.querySelector('input') as HTMLInputElement;

      typeInto(input, 'ABC');
      expect(input.value).toBe('ABC');

      // Switch to a digits-only mask; the stale 'ABC' must not survive as a revert target.
      page.rootInstance.maskOptions = { regex: /^[0-9]+$/ };
      await page.waitForChanges();
      // Field still shows ABC, but the new mask rejects it; clear and type digits.
      input.value = '';
      typeInto(input, '12a3');
      expect(input.value).toBe('123');
    });

    it('does not break a regular Cleave (date) mask', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="text"></tk-input>`,
      });
      page.rootInstance.maskOptions = { date: true, datePattern: ['d', 'm', 'Y'], delimiter: '.' };
      await page.waitForChanges();
      // A Cleave instance must still be created for non-regex masks.
      expect((page.rootInstance as any).cleaveInstance).toBeDefined();
    });
  });

  // Mirrors how internal components (tk-datepicker, tk-select, tk-phone-input, etc.)
  // drive tk-input, to ensure the regex changes do not regress those usages.
  describe('consumer usage contracts', () => {
    it('tk-datepicker style: runtime maskOptions swap keeps a Cleave instance', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="text"></tk-input>`,
      });
      // date-only mask, like tk-datepicker default
      page.rootInstance.maskOptions = { date: true, datePattern: ['d', 'm', 'Y'], delimiter: '.' };
      await page.waitForChanges();
      expect((page.rootInstance as any).cleaveInstance).toBeDefined();

      // swap to datetime mask (showTimePicker), like tk-datepicker does at runtime
      page.rootInstance.maskOptions = { blocks: [2, 2, 4, 2, 2], delimiters: ['.', '.', ' ', ':'], numericOnly: true };
      await page.waitForChanges();
      expect((page.rootInstance as any).cleaveInstance).toBeDefined();
    });

    it('tk-datepicker style: disabling the mask (undefined) tears down Cleave without error', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="text"></tk-input>`,
      });
      page.rootInstance.maskOptions = { date: true, datePattern: ['d', 'm', 'Y'], delimiter: '.' };
      await page.waitForChanges();
      expect((page.rootInstance as any).cleaveInstance).toBeDefined();

      // disableMask / range mode passes undefined
      page.rootInstance.maskOptions = undefined;
      await page.waitForChanges();
      expect((page.rootInstance as any).cleaveInstance).toBeUndefined();
    });

    it('tk-select style: chips mode is unaffected by regex logic', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="chips"></tk-input>`,
      });
      const input = page.root.querySelector('input') as HTMLInputElement;
      // Add a chip via Enter, like tk-select multiple mode.
      input.value = 'apple';
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();
      expect(page.rootInstance.value).toEqual(['apple']);
    });

    it('tk-phone-input / tk-textarea style: plain text mode with no mask passes through', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="text"></tk-input>`,
      });
      const input = page.root.querySelector('input') as HTMLInputElement;
      // No maskOptions → no Cleave, no regex; value flows through untouched.
      expect((page.rootInstance as any).cleaveInstance).toBeUndefined();
      input.value = 'free text 123!';
      input.dispatchEvent(new Event('input'));
      expect(page.rootInstance.value).toBe('free text 123!');
    });

    it('tk-color-picker style: number mode is unaffected', async () => {
      const page = await newSpecPage({
        components: [TkInput],
        html: `<tk-input mode="number"></tk-input>`,
      });
      const input = page.root.querySelector('input') as HTMLInputElement;
      input.value = '42';
      input.dispatchEvent(new Event('input'));
      expect(page.rootInstance.value).toBe(42);
    });
  });

  it('assigns unique data-testid values to password strength lines', async () => {
    const page = await newSpecPage({
      components: [TkInput],
      html: `<tk-input mode="password" show-safety-status="true" data-testid="secure-input"></tk-input>`,
    });

    const safetyStatus = page.root.querySelector('.safety-status');
    const lines = Array.from(page.root.querySelectorAll('.safety-status .line'));

    expect(safetyStatus?.getAttribute('data-testid')).toBe('secure-input-safety-status');
    expect(lines).toHaveLength(4);
    expect(lines.map(line => line.getAttribute('data-testid'))).toEqual([
      'secure-input-strength-line-0',
      'secure-input-strength-line-1',
      'secure-input-strength-line-2',
      'secure-input-strength-line-3',
    ]);
  });
});
