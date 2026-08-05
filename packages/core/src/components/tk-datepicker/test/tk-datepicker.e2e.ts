import { newE2EPage } from '@stencil/core/testing';

describe('tk-datepicker', () => {
  const setupDateTime = async (value: string, selectionStart: number, selectionEnd: number) => {
    const page = await newE2EPage();
    await page.setContent(`<tk-datepicker mode="single" show-time-picker="true" value="${value}"></tk-datepicker>`);
    await page.waitForChanges();

    await page.evaluate(
      (start: number, end: number) => {
        const input = document.querySelector('tk-datepicker')?.shadowRoot?.querySelector('input') as HTMLInputElement;
        input.focus();
        input.setSelectionRange(start, end);
      },
      selectionStart,
      selectionEnd,
    );
    return page;
  };

  const readInput = (page: any) =>
    page.evaluate(() => {
      const input = document.querySelector('tk-datepicker')?.shadowRoot?.querySelector('input') as HTMLInputElement;
      return { value: input.value, caret: input.selectionStart };
    });

  it('keeps the caret in place when the time part is edited', async () => {
    // With the hour selected, typing "13" over it used to send the caret to the end after the
    // first digit, so the second one landed in the minutes and produced "13:03".
    const page = await setupDateTime('2026-08-04 09:30', 11, 13);

    await page.keyboard.type('13');
    await page.waitForChanges();

    expect(await readInput(page)).toEqual({ value: '2026-08-04 13:30', caret: 13 });
  });

  it('keeps the caret in place when the date part is edited', async () => {
    const page = await setupDateTime('2026-08-04 09:30', 5, 7);

    await page.keyboard.type('1');
    await page.waitForChanges();

    expect((await readInput(page)).caret).toBe(6);
  });

  it('keeps the caret at the end while typing a value from scratch', async () => {
    const page = await newE2EPage();
    await page.setContent('<tk-datepicker mode="single" show-time-picker="true"></tk-datepicker>');
    await page.waitForChanges();

    await page.evaluate(() => {
      const input = document.querySelector('tk-datepicker')?.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = '';
      input.focus();
    });
    await page.keyboard.type('202608040930');
    await page.waitForChanges();

    expect(await readInput(page)).toEqual({ value: '2026-08-04 09:30', caret: 16 });
  });
});
