// uuid v14 is ESM-only and Jest does not transform node_modules, so importing the component
// under test would fail to parse. The component only uses it for a per-instance DOM id.
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

// floating-ui needs real layout APIs that the spec environment lacks.
jest.mock('../../../utils/position-utils', () => ({
  floatingElementAutoUpdate: jest.fn(() => jest.fn()),
}));

import { Component, Method, Prop, h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkDatePicker } from '../tk-datepicker';

@Component({ tag: 'tk-input' })
class MockTkInput {
  @Prop() showAsterisk: boolean;

  @Method()
  async setFocus() {
    /* no-op */
  }

  render() {
    return h('div', { class: { 'tk-input': true } });
  }
}

type Time = { hour: number; minute: number } | null;
type DatepickerInternals = {
  isOpen: boolean;
  currentMonth: Date;
  inputValue: string;
  internalAmPm: 'AM' | 'PM';
  internalSelectedDates: { start: Date | null; end: Date | null };
  internalStartTime: Time;
  calendarTableHeightPx?: number;
  formResetCallback(): void;
};

const setup = async (attrs = '') =>
  newSpecPage({
    components: [TkDatePicker, MockTkInput],
    html: `<tk-datepicker data-testid="dp" ${attrs}></tk-datepicker>`,
  });

const internals = (page: SpecPage) => page.rootInstance as unknown as DatepickerInternals;
const byTestId = (page: SpecPage, id: string) => page.root.shadowRoot.querySelector(`[data-testid="dp-${id}"]`) as HTMLElement | null;
const childByTestId = (page: SpecPage, id: string) => page.root.shadowRoot.querySelector(`[datatestid="dp-${id}"]`) as HTMLElement | null;
const input = (page: SpecPage) => page.root.shadowRoot.querySelector('tk-input') as HTMLElement & { maskOptions?: unknown };
const dayCell = (page: SpecPage, year: number, month: number, day: number) => byTestId(page, `day-cell-${year}-${month}-${day}`);
const d = (year: number, month: number, day: number) => new Date(year, month - 1, day);

const click = (el: Element) => {
  const event = new MouseEvent('click', { bubbles: true, cancelable: true });
  el.dispatchEvent(event);
  return event;
};
const tkClick = (el: Element) => el.dispatchEvent(new CustomEvent('tk-click', { bubbles: true }));
const listen = (page: SpecPage, eventName: string) => {
  const details: unknown[] = [];
  page.root.addEventListener(eventName, (e: Event) => details.push((e as CustomEvent).detail));
  return details;
};

/** Mirrors tk-input: the masked text arrives through tk-change while the native input event starts the parse debounce. */
const typeText = (page: SpecPage, text: string) => {
  input(page).dispatchEvent(new CustomEvent('tk-change', { detail: text }));
  input(page).dispatchEvent(new Event('input'));
};

// The parse debounce is scheduled through the mock window's own setTimeout, which Jest's fake timers
// cannot intercept, so the tests wait out the 300ms for real.
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const DEBOUNCE_MS = 300;

/** Types text and waits for the parse debounce to run. */
const typeAndSettle = async (page: SpecPage, text: string) => {
  typeText(page, text);
  await wait(DEBOUNCE_MS + 20);
  await page.waitForChanges();
};

const openPanel = async (page: SpecPage) => {
  click(input(page));
  await page.waitForChanges();
};

describe('tk-datepicker input', () => {
  describe('typing a date', () => {
    it('reflects typed text in the input and reports it through tk-input-change', async () => {
      const page = await setup();
      const inputChanges = listen(page, 'tk-input-change');

      input(page).dispatchEvent(new CustomEvent('tk-change', { detail: '2024-03-2' }));
      await page.waitForChanges();

      expect(input(page).getAttribute('value')).toBe('2024-03-2');
      expect(inputChanges).toEqual(['2024-03-2']);
    });

    it('selects a valid date once typing settles', async () => {
      const page = await setup();
      const changes = listen(page, 'tk-change');

      await typeAndSettle(page, '2024-03-20');

      expect(changes).toEqual(['2024-03-20']);
      expect(internals(page).internalSelectedDates).toEqual({ start: d(2024, 3, 20), end: null });
      await openPanel(page);
      expect(dayCell(page, 2024, 3, 20).classList.contains('selected')).toBe(true);
    });

    it('only evaluates the final text when keystrokes arrive within the debounce window', async () => {
      const page = await setup();
      const changes = listen(page, 'tk-change');
      const invalids = listen(page, 'tk-invalid');

      typeText(page, '2024-03-2');
      await wait(100);
      expect(changes).toEqual([]);
      typeText(page, '2024-03-20');
      await wait(DEBOUNCE_MS + 20);
      await page.waitForChanges();

      expect(invalids).toEqual([]);
      expect(changes).toEqual(['2024-03-20']);
    });

    it('flags text that does not match the format and clears the flag once it is fixed', async () => {
      const page = await setup();
      const changes = listen(page, 'tk-change');
      const invalids = listen(page, 'tk-invalid');

      await typeAndSettle(page, '20/03/2024');

      expect(invalids).toEqual([{ message: 'Invalid date format', value: '20/03/2024' }]);
      expect(changes).toEqual([]);
      expect(input(page).hasAttribute('invalid')).toBe(true);

      await typeAndSettle(page, '2024-03-20');

      expect(input(page).hasAttribute('invalid')).toBe(false);
      expect(changes).toEqual(['2024-03-20']);
    });

    it('rejects a typed date that is outside the allowed range', async () => {
      const page = await setup(`min-date="2024-03-10"`);
      const invalids = listen(page, 'tk-invalid');

      await typeAndSettle(page, '2024-03-05');

      expect(invalids).toEqual([{ message: 'Invalid date format', value: '2024-03-05' }]);
      expect(internals(page).internalSelectedDates.start).toBeNull();
    });

    it('clears the selection when the text is deleted', async () => {
      const page = await setup(`value="2024-03-15"`);
      const changes = listen(page, 'tk-change');

      await typeAndSettle(page, '');

      expect(changes).toEqual([undefined]);
      expect(internals(page).internalSelectedDates).toEqual({ start: null, end: null });
      expect(input(page).hasAttribute('invalid')).toBe(false);
    });

    it('stays quiet about invalid or deleted text in apply-button mode', async () => {
      const page = await setup(`value="2024-03-15" allow-apply-button="true"`);
      const changes = listen(page, 'tk-change');
      const invalids = listen(page, 'tk-invalid');

      await typeAndSettle(page, 'nonsense');
      await typeAndSettle(page, '');

      expect(invalids).toEqual([]);
      expect(changes).toEqual([]);
      expect(input(page).hasAttribute('invalid')).toBe(false);
    });

    it('accepts a typed date and time when the time picker is on', async () => {
      const page = await setup(`show-time-picker="true"`);
      const changes = listen(page, 'tk-change');

      await typeAndSettle(page, '2024-03-20 14:30');

      expect(changes).toEqual(['2024-03-20 14:30']);
      expect(internals(page).internalStartTime).toEqual({ hour: 14, minute: 30 });
      expect(internals(page).internalSelectedDates.start).toEqual(d(2024, 3, 20));
    });

    it('rejects a typed time outside the min and max time', async () => {
      const page = await setup(`show-time-picker="true" min-time="09:00" max-time="17:00"`);
      const changes = listen(page, 'tk-change');

      await typeAndSettle(page, '2024-03-20 18:30');

      expect(changes).toEqual([undefined]);
      expect(input(page).hasAttribute('invalid')).toBe(true);
      expect(internals(page).internalSelectedDates.start).toBeNull();
    });

    it('flags text it cannot parse in 12-hour mode', async () => {
      const page = await setup(`show-time-picker="true" time-format="12"`);
      const invalids = listen(page, 'tk-invalid');

      await typeAndSettle(page, '2024-03-20 2:30 XM');

      expect(invalids).toEqual([{ message: 'Invalid date format', value: '2024-03-20 2:30 XM' }]);
      expect(input(page).hasAttribute('invalid')).toBe(true);
    });

    it('accepts 24-hour text in 12-hour mode and emits it in 12-hour form', async () => {
      const page = await setup(`show-time-picker="true" time-format="12"`);
      const changes = listen(page, 'tk-change');

      await typeAndSettle(page, '2024-03-20 14:30');

      expect(changes).toEqual(['2024-03-20 02:30 PM']);
    });

    it('resyncs AM/PM and reformats the text when the input loses focus in 12-hour mode', async () => {
      const page = await setup(`show-time-picker="true" time-format="12"`);
      await typeAndSettle(page, '2024-03-20 14:30');
      expect(internals(page).internalAmPm).toBe('AM');

      input(page).dispatchEvent(new CustomEvent('tk-blur'));
      await page.waitForChanges();

      expect(internals(page).internalAmPm).toBe('PM');
      expect(input(page).getAttribute('value')).toBe('2024-03-20 02:30 PM');
    });

    it('leaves the text alone on blur when no time is involved', async () => {
      const page = await setup(`value="2024-03-15"`);

      input(page).dispatchEvent(new CustomEvent('tk-blur'));
      await page.waitForChanges();

      expect(input(page).getAttribute('value')).toBe('2024-03-15');
    });
  });

  describe('masking', () => {
    it('passes a date mask derived from the format to the input', async () => {
      const page = await setup(`date-format="dd/MM/yyyy"`);

      expect(input(page).maskOptions).toEqual({ date: true, delimiter: '/', datePattern: ['d', 'm', 'Y'] });
    });

    it('drops the mask and blocks typing when disableMask is set', async () => {
      const page = await setup(`disable-mask="true"`);
      const inputChanges = listen(page, 'tk-input-change');
      const changes = listen(page, 'tk-change');

      expect(input(page).maskOptions).toBeUndefined();

      const keydown = new KeyboardEvent('keydown', { key: '2', cancelable: true });
      input(page).dispatchEvent(keydown);
      expect(keydown.defaultPrevented).toBe(true);

      await typeAndSettle(page, '2024-03-20');

      expect(inputChanges).toEqual([]);
      expect(changes).toEqual([]);
      expect(input(page).getAttribute('value')).toBe('');
    });

    it('lets keystrokes through in the default single mode', async () => {
      const page = await setup();

      const keydown = new KeyboardEvent('keydown', { key: '2', cancelable: true });
      input(page).dispatchEvent(keydown);

      expect(keydown.defaultPrevented).toBe(false);
    });

    it('rebuilds the mask and placeholder when the date format changes', async () => {
      const page = await setup();

      page.root.dateFormat = 'dd.MM.yyyy';
      await page.waitForChanges();

      expect(input(page).maskOptions).toEqual({ date: true, delimiter: '.', datePattern: ['d', 'm', 'Y'] });
      expect(input(page).getAttribute('placeholder')).toBe('DD.MM.YYYY');
    });

    it('extends the mask with time blocks when the time picker is switched on', async () => {
      const page = await setup();

      page.root.showTimePicker = true;
      await page.waitForChanges();

      expect(input(page).maskOptions).toEqual({ blocks: [4, 2, 2, 2, 2], delimiters: ['-', '-', ' ', ':'], numericOnly: true });
    });

    it('uses two-digit blocks for a short year in the time-aware mask', async () => {
      const page = await setup(`show-time-picker="true" date-format="dd/MM/yy"`);

      expect(input(page).maskOptions).toEqual({ blocks: [2, 2, 2, 2, 2], delimiters: ['/', '/', ' ', ':'], numericOnly: true });
      expect(input(page).getAttribute('placeholder')).toBe('DD/MM/YY HH:MM');
    });

    it('switches to a time mask in time-only mode and keeps it across date format changes', async () => {
      const page = await setup();

      page.root.timeOnly = true;
      await page.waitForChanges();
      expect(input(page).maskOptions).toEqual({ time: true, timePattern: ['h', 'm'], timeFormat: '24' });

      page.root.dateFormat = 'dd.MM.yyyy';
      await page.waitForChanges();
      expect(input(page).maskOptions).toEqual({ time: true, timePattern: ['h', 'm'], timeFormat: '24' });
    });

    it('updates the time mask when the time format changes in time-only mode', async () => {
      const page = await setup(`time-only="true"`);

      page.root.timeFormat = '12';
      await page.waitForChanges();

      expect(input(page).maskOptions).toEqual({ time: true, timePattern: ['h', 'm'], timeFormat: '12' });
      expect(input(page).getAttribute('placeholder')).toBe('HH:MM A');
    });
  });

  describe('placeholder and forwarded props', () => {
    it.each([
      ['', 'YYYY-MM-DD'],
      ['date-format="dd.MM.yyyy"', 'DD.MM.YYYY'],
      ['show-time-picker="true"', 'YYYY-MM-DD HH:MM'],
      ['show-time-picker="true" time-format="12"', 'YYYY-MM-DD HH:MM A'],
      ['time-only="true"', 'HH:MM'],
      ['time-only="true" time-format="12"', 'HH:MM A'],
    ])('derives the placeholder from the active format (%s)', async (attrs, expected) => {
      const page = await setup(attrs);

      expect(input(page).getAttribute('placeholder')).toBe(expected);
    });

    it('keeps a custom placeholder as written', async () => {
      const page = await setup(`placeholder="Pick a date"`);

      expect(input(page).getAttribute('placeholder')).toBe('Pick a date');
    });

    it('forwards the field props to the input', async () => {
      const page = await setup(
        `label="Start" hint="Optional" error="Required" name="start" size="small" icon="event" icon-position="right" clearable="true" loading="true" invalid="true"`,
      );
      const el = input(page);

      expect(el.getAttribute('label')).toBe('Start');
      expect(el.getAttribute('hint')).toBe('Optional');
      expect(el.getAttribute('error')).toBe('Required');
      expect(el.getAttribute('name')).toBe('start');
      expect(el.getAttribute('size')).toBe('small');
      expect(el.getAttribute('icon')).toBe('event');
      expect(el.getAttribute('iconposition')).toBe('right');
      expect(el.hasAttribute('clearable')).toBe(true);
      expect(el.hasAttribute('loading')).toBe(true);
      expect(el.hasAttribute('invalid')).toBe(true);
      expect(el.getAttribute('aria-haspopup')).toBe('true');
    });

    it('uses the calendar icon on the left by default', async () => {
      const page = await setup();

      expect(input(page).getAttribute('icon')).toBe('calendar_month');
      expect(input(page).getAttribute('iconposition')).toBe('left');
    });

    it('adopts the table input styling when hosted inside a table cell', async () => {
      const page = await newSpecPage({
        components: [TkDatePicker, MockTkInput],
        html: `<tk-datepicker class="tk-table-datepicker"></tk-datepicker>`,
      });

      expect(input(page).classList.contains('tk-table-input')).toBe(true);
    });
  });

  describe('opening from the input', () => {
    it('toggles the popup and mirrors the state on aria-expanded', async () => {
      const page = await setup();

      await openPanel(page);
      expect(byTestId(page, 'panel')).toBeTruthy();
      expect(input(page).hasAttribute('aria-expanded')).toBe(true);

      await openPanel(page);
      expect(byTestId(page, 'panel')).toBeNull();
      expect(input(page).hasAttribute('aria-expanded')).toBe(false);
    });

    it.each(['disabled="true"', 'readonly="true"'])('does not open when %s', async attr => {
      const page = await setup(attr);

      const event = click(input(page));
      await page.waitForChanges();

      expect(event.defaultPrevented).toBe(true);
      expect(byTestId(page, 'panel')).toBeNull();
      expect(internals(page).isOpen).toBe(false);
    });

    it('closes the popup and fills the input after picking a day', async () => {
      const page = await setup(`default-date="2024-03"`);
      const changes = listen(page, 'tk-change');
      await openPanel(page);

      click(dayCell(page, 2024, 3, 20));
      await page.waitForChanges();

      expect(changes).toEqual(['2024-03-20']);
      expect(page.root.value).toBe('2024-03-20');
      expect(input(page).getAttribute('value')).toBe('2024-03-20');
      expect(byTestId(page, 'panel')).toBeNull();
    });

    it('keeps the popup open after picking a day in apply-button mode until apply() runs', async () => {
      const page = await setup(`default-date="2024-03" allow-apply-button="true"`);
      const changes = listen(page, 'tk-change');
      await openPanel(page);

      click(dayCell(page, 2024, 3, 20));
      await page.waitForChanges();
      expect(changes).toEqual([]);
      expect(internals(page).isOpen).toBe(true);

      await page.root.apply();
      await page.waitForChanges();

      expect(changes).toEqual(['2024-03-20']);
      expect(internals(page).isOpen).toBe(false);
    });

    it('applies an empty selection as null', async () => {
      const page = await setup(`allow-apply-button="true"`);
      const changes = listen(page, 'tk-change');

      await page.root.apply();
      await page.waitForChanges();

      expect(changes).toEqual([null]);
      expect(page.root.value).toBeNull();
    });
  });

  describe('clearing', () => {
    it('clears the value and emits null from the clear button', async () => {
      const page = await setup(`clearable="true" value="2024-03-15"`);
      const changes = listen(page, 'tk-change');

      input(page).dispatchEvent(new CustomEvent('tk-clear-click'));
      await page.waitForChanges();

      expect(changes).toEqual([null]);
      expect(input(page).getAttribute('value')).toBe('');
      expect(internals(page).internalSelectedDates).toEqual({ start: null, end: null });
    });

    it('ignores the clear event when the picker is not clearable', async () => {
      const page = await setup(`value="2024-03-15"`);
      const changes = listen(page, 'tk-change');

      input(page).dispatchEvent(new CustomEvent('tk-clear-click'));
      await page.waitForChanges();

      expect(changes).toEqual([]);
      expect(input(page).getAttribute('value')).toBe('2024-03-15');
    });
  });

  describe('value prop', () => {
    it('shows nothing for a value that does not match the format', async () => {
      const page = await setup(`value="15/03/2024"`);

      expect(input(page).getAttribute('value')).toBe('');
      expect(internals(page).internalSelectedDates.start).toBeNull();
    });

    it('does not adopt a value that is disabled by minDate', async () => {
      const page = await setup(`value="2024-03-05" min-date="2024-03-10"`);

      expect(input(page).getAttribute('value')).toBe('');
      expect(internals(page).internalSelectedDates.start).toBeNull();
    });

    it('ignores a value update that is equal to the current one', async () => {
      const page = await setup(`inline="true" mode="range"`);
      page.root.value = { start: '2024-03-15' };
      await page.waitForChanges();

      tkClick(childByTestId(page, 'next-month-button'));
      await page.waitForChanges();
      expect(internals(page).currentMonth.getMonth()).toBe(3);

      page.root.value = { start: '2024-03-15' };
      await page.waitForChanges();
      expect(internals(page).currentMonth.getMonth()).toBe(3);

      page.root.value = { start: '2024-05-01' };
      await page.waitForChanges();
      expect(internals(page).currentMonth.getMonth()).toBe(4);
    });

    it('clears the selection when the value is removed', async () => {
      const page = await setup(`value="2024-03-15"`);

      page.root.value = '';
      await page.waitForChanges();

      expect(internals(page).internalSelectedDates.start).toBeNull();
      expect(input(page).getAttribute('value')).toBe('');
    });
  });

  describe('form reset', () => {
    it('restores the selection from the value attribute', async () => {
      const page = await setup(`value="2024-03-15"`);
      await openPanel(page);
      click(dayCell(page, 2024, 3, 20));
      await page.waitForChanges();
      expect(input(page).getAttribute('value')).toBe('2024-03-20');
      const changes = listen(page, 'tk-change');

      internals(page).formResetCallback();
      await page.waitForChanges();

      expect(internals(page).internalSelectedDates.start).toEqual(d(2024, 3, 15));
      expect(input(page).getAttribute('value')).toBe('2024-03-15');
      expect(changes.length).toBe(1);
    });

    it('parses a JSON value attribute into a range on reset', async () => {
      const page = await setup(`mode="range" value='{"start":"2024-03-10","end":"2024-03-12"}'`);
      expect(input(page).getAttribute('value')).toBe('');

      internals(page).formResetCallback();
      await page.waitForChanges();

      expect(internals(page).internalSelectedDates).toEqual({ start: d(2024, 3, 10), end: d(2024, 3, 12) });
      expect(input(page).getAttribute('value')).toBe('2024-03-10 - 2024-03-12');
    });

    it('clears the selection on reset when there was no initial value', async () => {
      const page = await setup(`default-date="2024-03"`);
      await openPanel(page);
      click(dayCell(page, 2024, 3, 20));
      await page.waitForChanges();

      internals(page).formResetCallback();
      await page.waitForChanges();

      expect(internals(page).internalSelectedDates.start).toBeNull();
      expect(input(page).getAttribute('value')).toBe('');
    });
  });

  describe('time panel sizing', () => {
    const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));
    let originalRect: () => DOMRect;

    beforeEach(() => {
      originalRect = Element.prototype.getBoundingClientRect;
      Element.prototype.getBoundingClientRect = () => ({ height: 300 }) as DOMRect;
    });

    afterEach(() => {
      Element.prototype.getBoundingClientRect = originalRect;
    });

    it('hides the popup until the calendar is measured, then sizes the time column to it', async () => {
      const page = await setup(`show-time-picker="true"`);

      await openPanel(page);
      expect(byTestId(page, 'panel').style.visibility).toBe('hidden');

      await nextFrame();
      await page.waitForChanges();

      expect(byTestId(page, 'panel').style.visibility).toBe('');
      expect(byTestId(page, 'timepicker-body').style.height).toBe('300px');
    });

    it('measures the inline calendar on load', async () => {
      const page = await setup(`inline="true" show-time-picker="true"`);

      await nextFrame();
      await page.waitForChanges();

      expect(byTestId(page, 'timepicker-body').style.height).toBe('300px');
    });

    it('drops the measured height when the popup closes', async () => {
      const page = await setup(`show-time-picker="true"`);
      await openPanel(page);
      await nextFrame();
      await page.waitForChanges();
      expect(internals(page).calendarTableHeightPx).toBe(300);

      await page.root.closePanel();
      await page.waitForChanges();

      expect(internals(page).calendarTableHeightPx).toBeUndefined();
    });
  });
});
