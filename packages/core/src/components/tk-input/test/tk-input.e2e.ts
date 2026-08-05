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

  // Caret handling needs a real browser: the mask rewrites the field on every keystroke.
  describe('masked input caret', () => {
    const setupMasked = async (maskOptions: object, value: string, selectionStart: number, selectionEnd: number) => {
      const page = await newE2EPage();
      await page.setContent('<tk-input mode="text"></tk-input>');
      await page.$eval('tk-input', (el: any, options) => (el.maskOptions = options), maskOptions);
      await page.waitForChanges();

      await page.$eval(
        'tk-input input',
        (el: HTMLInputElement, initialValue: string, start: number, end: number) => {
          el.focus();
          el.value = initialValue;
          el.setSelectionRange(start, end);
        },
        value,
        selectionStart,
        selectionEnd,
      );
      return page;
    };

    const readInput = (page: any) => page.$eval('tk-input input', (el: HTMLInputElement) => ({ value: el.value, caret: el.selectionStart }));

    it('keeps the caret in place while editing the middle of a date-time mask', async () => {
      // The mask tk-datepicker builds for `yyyy-MM-dd HH:mm`, with the hour selected.
      const page = await setupMasked({ blocks: [4, 2, 2, 2, 2], delimiters: ['-', '-', ' ', ':'], numericOnly: true }, '2026-08-04 09:30', 11, 13);

      await page.keyboard.type('13');
      await page.waitForChanges();

      expect(await readInput(page)).toEqual({ value: '2026-08-04 13:30', caret: 13 });
    });

    it('keeps the caret in place while editing the middle of a date mask', async () => {
      const page = await setupMasked({ date: true, datePattern: ['Y', 'm', 'd'], delimiter: '-' }, '2026-08-04', 5, 7);

      await page.keyboard.type('1');
      await page.waitForChanges();

      expect(await readInput(page)).toEqual({ value: '2026-10-04', caret: 6 });
    });

    it('keeps the caret at the end when typing at the end of a mask', async () => {
      // The mask appends its delimiter after the year block; the caret has to follow it.
      const page = await setupMasked({ date: true, datePattern: ['Y', 'm', 'd'], delimiter: '-' }, '202', 3, 3);

      await page.keyboard.type('6');
      await page.waitForChanges();

      expect(await readInput(page)).toEqual({ value: '2026-', caret: 5 });
    });
  });
});
