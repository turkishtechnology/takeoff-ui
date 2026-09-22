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
import { pinClock, restoreClock } from './pin-clock';

afterEach(restoreClock);

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
  hoverDate: Date | null;
  inputValue: string;
  internalAmPm: 'AM' | 'PM';
  internalSelectedDates: { start: Date | null; end: Date | null };
  internalStartTime: Time;
  internalEndTime: Time;
};

const setup = async (attrs = '') =>
  newSpecPage({
    components: [TkDatePicker, MockTkInput],
    html: `<tk-datepicker data-testid="dp" mode="range" ${attrs}></tk-datepicker>`,
  });

const internals = (page: SpecPage) => page.rootInstance as unknown as DatepickerInternals;
const byTestId = (page: SpecPage, id: string) => page.root.shadowRoot.querySelector(`[data-testid="dp-${id}"]`) as HTMLElement | null;
const childByTestId = (page: SpecPage, id: string) => page.root.shadowRoot.querySelector(`[datatestid="dp-${id}"]`) as HTMLElement | null;
const dayCell = (page: SpecPage, day: number, month = 3, year = 2024) => byTestId(page, `day-cell-${year}-${month}-${day}`);
const input = (page: SpecPage) => page.root.shadowRoot.querySelector('tk-input') as HTMLElement;
const d = (year: number, month: number, day: number) => new Date(year, month - 1, day);

const click = (el: Element) => el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
const hover = (el: Element) => el.dispatchEvent(new MouseEvent('mouseenter'));
const tkClick = (el: Element) => el.dispatchEvent(new CustomEvent('tk-click', { bubbles: true }));
const listen = (page: SpecPage, eventName: string) => {
  const details: unknown[] = [];
  page.root.addEventListener(eventName, (e: Event) => details.push((e as CustomEvent).detail));
  return details;
};

const pickRange = async (page: SpecPage, first: number, second: number) => {
  click(dayCell(page, first));
  await page.waitForChanges();
  click(dayCell(page, second));
  await page.waitForChanges();
};

describe('tk-datepicker range mode', () => {
  describe('selecting a range with clicks', () => {
    it('selects the first click and waits for the second end before drawing a range', async () => {
      const page = await setup(`inline="true" default-date="2024-03"`);

      click(dayCell(page, 10));
      await page.waitForChanges();

      const cell = dayCell(page, 10);
      expect(cell.classList.contains('selected')).toBe(true);
      // Range styling only appears once there is an end (or a hovered day) to draw towards.
      expect(cell.classList.contains('range-start')).toBe(false);
      expect(cell.classList.contains('range-end')).toBe(false);
      expect(internals(page).internalSelectedDates.end).toBeNull();
      expect(internals(page).inputValue).toBe('2024-03-10');
    });

    it('completes the range on the second click and emits both ends', async () => {
      const page = await setup(`inline="true" default-date="2024-03"`);
      const changes = listen(page, 'tk-change');

      await pickRange(page, 10, 20);

      expect(changes[changes.length - 1]).toEqual({ start: '2024-03-10', end: '2024-03-20' });
      expect(dayCell(page, 10).classList.contains('range-start')).toBe(true);
      expect(dayCell(page, 20).classList.contains('range-end')).toBe(true);
      expect(dayCell(page, 20).classList.contains('selected')).toBe(true);
      expect(dayCell(page, 15).classList.contains('in-range')).toBe(true);
      expect(dayCell(page, 10).classList.contains('in-range')).toBe(false);
      expect(dayCell(page, 21).classList.contains('in-range')).toBe(false);
      expect(internals(page).inputValue).toBe('2024-03-10 - 2024-03-20');
      expect(page.root.value).toEqual({ start: '2024-03-10', end: '2024-03-20' });
    });

    it('orders the range when the second click is before the first', async () => {
      const page = await setup(`inline="true" default-date="2024-03"`);
      const changes = listen(page, 'tk-change');

      await pickRange(page, 20, 10);

      expect(changes[changes.length - 1]).toEqual({ start: '2024-03-10', end: '2024-03-20' });
      expect(dayCell(page, 10).classList.contains('range-start')).toBe(true);
      expect(dayCell(page, 20).classList.contains('range-end')).toBe(true);
    });

    it('starts a fresh range on the third click', async () => {
      const page = await setup(`inline="true" default-date="2024-03"`);
      await pickRange(page, 10, 20);

      click(dayCell(page, 25));
      await page.waitForChanges();

      expect(internals(page).internalSelectedDates).toEqual({ start: d(2024, 3, 25), end: null });
      expect(dayCell(page, 10).classList.contains('selected')).toBe(false);
      expect(dayCell(page, 20).classList.contains('range-end')).toBe(false);
      expect(dayCell(page, 15).classList.contains('in-range')).toBe(false);
      expect(dayCell(page, 25).classList.contains('selected')).toBe(true);
    });

    it('allows a single-day range', async () => {
      const page = await setup(`inline="true" default-date="2024-03"`);
      const changes = listen(page, 'tk-change');

      await pickRange(page, 10, 10);

      expect(changes[changes.length - 1]).toEqual({ start: '2024-03-10', end: '2024-03-10' });
      expect(dayCell(page, 10).classList.contains('range-start')).toBe(true);
      expect(dayCell(page, 10).classList.contains('range-end')).toBe(true);
    });

    it('keeps the popup open after the first click and closes it once the range is complete', async () => {
      const page = await setup(`default-date="2024-03"`);
      click(input(page));
      await page.waitForChanges();

      click(dayCell(page, 10));
      await page.waitForChanges();
      expect(internals(page).isOpen).toBe(true);

      click(dayCell(page, 20));
      await page.waitForChanges();
      expect(internals(page).isOpen).toBe(false);
      expect(input(page).getAttribute('value')).toBe('2024-03-10 - 2024-03-20');
    });

    it('ignores clicks on days that are disabled', async () => {
      const page = await setup(`inline="true" default-date="2024-03" min-date="2024-03-05"`);
      const changes = listen(page, 'tk-change');

      click(dayCell(page, 2));
      await page.waitForChanges();

      expect(changes).toEqual([]);
      expect(internals(page).internalSelectedDates.start).toBeNull();
    });
  });

  describe('hover preview', () => {
    it('previews the range up to the hovered day after the first click', async () => {
      const page = await setup(`inline="true" default-date="2024-03"`);
      click(dayCell(page, 10));
      await page.waitForChanges();

      hover(dayCell(page, 14));
      await page.waitForChanges();

      expect(dayCell(page, 12).classList.contains('in-range')).toBe(true);
      expect(dayCell(page, 14).classList.contains('range-end')).toBe(true);
      expect(dayCell(page, 15).classList.contains('in-range')).toBe(false);
    });

    it('previews a reversed range when hovering before the start', async () => {
      const page = await setup(`inline="true" default-date="2024-03"`);
      click(dayCell(page, 10));
      await page.waitForChanges();

      hover(dayCell(page, 6));
      await page.waitForChanges();

      expect(dayCell(page, 6).classList.contains('range-start')).toBe(true);
      expect(dayCell(page, 8).classList.contains('in-range')).toBe(true);
      expect(dayCell(page, 10).classList.contains('range-end')).toBe(true);
    });

    it('does not preview before a start is picked or after the range is complete', async () => {
      const page = await setup(`inline="true" default-date="2024-03"`);

      hover(dayCell(page, 14));
      await page.waitForChanges();
      expect(internals(page).hoverDate).toBeNull();
      expect(dayCell(page, 12).classList.contains('in-range')).toBe(false);

      await pickRange(page, 10, 12);
      hover(dayCell(page, 20));
      await page.waitForChanges();

      expect(internals(page).hoverDate).toBeNull();
      expect(dayCell(page, 15).classList.contains('in-range')).toBe(false);
    });

    it('does not preview in single mode', async () => {
      const page = await newSpecPage({
        components: [TkDatePicker, MockTkInput],
        html: `<tk-datepicker data-testid="dp" inline="true" value="2024-03-10"></tk-datepicker>`,
      });

      hover(dayCell(page, 14));
      await page.waitForChanges();

      expect(internals(page).hoverDate).toBeNull();
      expect(dayCell(page, 10).classList.contains('range-start')).toBe(false);
    });
  });

  describe('adopting a value', () => {
    it('renders both ends of a range value', async () => {
      const page = await setup(`inline="true"`);
      page.root.value = { start: '2024-03-10', end: '2024-03-20' };
      await page.waitForChanges();

      expect(dayCell(page, 10).classList.contains('range-start')).toBe(true);
      expect(dayCell(page, 20).classList.contains('range-end')).toBe(true);
      expect(dayCell(page, 15).classList.contains('in-range')).toBe(true);
      expect(internals(page).inputValue).toBe('2024-03-10 - 2024-03-20');
    });

    it('keeps only the start when the end is not selectable', async () => {
      const page = await setup(`inline="true" max-date="2024-03-15"`);
      page.root.value = { start: '2024-03-10', end: '2024-03-20' };
      await page.waitForChanges();

      expect(internals(page).internalSelectedDates).toEqual({ start: d(2024, 3, 10), end: null });
      expect(internals(page).inputValue).toBe('2024-03-10');
    });

    it('rejects the whole value when the start is not selectable', async () => {
      const page = await setup(`inline="true" min-date="2024-03-15"`);
      page.root.value = { start: '2024-03-10', end: '2024-03-20' };
      await page.waitForChanges();

      expect(internals(page).internalSelectedDates).toEqual({ start: null, end: null });
      expect(internals(page).inputValue).toBe('');
    });

    it('treats a plain string value as the start only', async () => {
      const page = await setup(`inline="true" value="2024-03-10"`);

      expect(internals(page).internalSelectedDates).toEqual({ start: d(2024, 3, 10), end: null });
      expect(internals(page).inputValue).toBe('2024-03-10');
    });

    it('ignores a value object without a start', async () => {
      const page = await setup(`inline="true"`);
      page.root.value = { end: '2024-03-20' };
      await page.waitForChanges();

      expect(internals(page).internalSelectedDates).toEqual({ start: null, end: null });
    });
  });

  describe('input', () => {
    it('does not mask the input and blocks typing in range mode', async () => {
      const page = await setup();
      const inputChanges = listen(page, 'tk-input-change');
      const inputEl = input(page);

      expect((inputEl as unknown as { maskOptions?: unknown }).maskOptions).toBeUndefined();

      const keydown = new KeyboardEvent('keydown', { key: '1', cancelable: true });
      inputEl.dispatchEvent(keydown);
      expect(keydown.defaultPrevented).toBe(true);

      inputEl.dispatchEvent(new CustomEvent('tk-change', { detail: '2024-03-10' }));
      await page.waitForChanges();

      expect(internals(page).inputValue).toBe('');
      expect(inputChanges).toEqual([]);
    });

    it('does not try to parse typed text in range mode', async () => {
      const page = await setup();
      const changes = listen(page, 'tk-change');
      const invalids = listen(page, 'tk-invalid');

      // The parser runs on a 300ms debounce scheduled through the mock window's own setTimeout,
      // which Jest's fake timers cannot intercept, so wait it out for real.
      input(page).dispatchEvent(new CustomEvent('tk-change', { detail: '2024-03-10' }));
      input(page).dispatchEvent(new Event('input'));
      await new Promise(resolve => setTimeout(resolve, 320));
      await page.waitForChanges();

      expect(changes).toEqual([]);
      expect(invalids).toEqual([]);
    });

    it('clears both ends of the range from the clear button', async () => {
      const page = await setup(`clearable="true"`);
      page.root.value = { start: '2024-03-10', end: '2024-03-20' };
      await page.waitForChanges();
      const changes = listen(page, 'tk-change');

      input(page).dispatchEvent(new CustomEvent('tk-clear-click'));
      await page.waitForChanges();

      expect(changes).toEqual([null]);
      expect(internals(page).internalSelectedDates).toEqual({ start: null, end: null });
      expect(input(page).getAttribute('value')).toBe('');
    });
  });

  describe('apply button mode', () => {
    it('defers emitting until apply() is called', async () => {
      const page = await setup(`inline="true" default-date="2024-03" allow-apply-button="true"`);
      const changes = listen(page, 'tk-change');

      await pickRange(page, 10, 20);
      expect(changes).toEqual([]);
      expect(dayCell(page, 15).classList.contains('in-range')).toBe(true);

      await page.root.apply();
      await page.waitForChanges();

      expect(changes).toEqual([{ start: '2024-03-10', end: '2024-03-20' }]);
      expect(page.root.value).toEqual({ start: '2024-03-10', end: '2024-03-20' });
    });

    it('discards a pending selection when the popup closes without applying', async () => {
      const page = await setup(`allow-apply-button="true"`);
      page.root.value = { start: '2024-03-10', end: '2024-03-12' };
      await page.waitForChanges();
      click(input(page));
      await page.waitForChanges();

      await pickRange(page, 20, 25);
      expect(internals(page).internalSelectedDates.start).toEqual(d(2024, 3, 20));
      expect(internals(page).isOpen).toBe(true);

      await page.root.closePanel();
      await page.waitForChanges();

      expect(internals(page).internalSelectedDates).toEqual({ start: d(2024, 3, 10), end: d(2024, 3, 12) });
      expect(input(page).getAttribute('value')).toBe('2024-03-10 - 2024-03-12');
    });

    it('applies a half-selected range with an open end and keeps the popup open', async () => {
      const page = await setup(`default-date="2024-03" allow-apply-button="true"`);
      const changes = listen(page, 'tk-change');
      click(input(page));
      await page.waitForChanges();

      click(dayCell(page, 10));
      await page.waitForChanges();
      await page.root.apply();
      await page.waitForChanges();

      expect(changes).toEqual([{ start: '2024-03-10', end: undefined }]);
      expect(internals(page).isOpen).toBe(true);
    });
  });

  describe('with the time picker', () => {
    const withTimes = `inline="true" show-time-picker="true"`;

    it('reads a start and end time from the value and shows the end time in the time panel', async () => {
      const page = await setup(withTimes);
      page.root.value = { start: '2024-03-10 09:00', end: '2024-03-12 17:30' };
      await page.waitForChanges();

      expect(internals(page).internalStartTime).toEqual({ hour: 9, minute: 0 });
      expect(internals(page).internalEndTime).toEqual({ hour: 17, minute: 30 });
      expect(internals(page).inputValue).toBe('2024-03-10 09:00 - 2024-03-12 17:30');
      expect(byTestId(page, 'timepicker-hour-17').classList.contains('selected')).toBe(true);
      expect(byTestId(page, 'timepicker-minute-30').classList.contains('selected')).toBe(true);
    });

    it('applies time changes to the end of a completed range', async () => {
      const page = await setup(withTimes);
      page.root.value = { start: '2024-03-10 09:00', end: '2024-03-12 17:30' };
      await page.waitForChanges();
      const changes = listen(page, 'tk-change');

      tkClick(childByTestId(page, 'timepicker-hours-increase'));
      await page.waitForChanges();

      expect(internals(page).internalStartTime).toEqual({ hour: 9, minute: 0 });
      expect(changes).toEqual([{ start: '2024-03-10 09:00', end: '2024-03-12 18:30' }]);
    });

    it('applies list clicks and minute steps to the end of a completed range', async () => {
      const page = await setup(withTimes);
      page.root.value = { start: '2024-03-10 09:00', end: '2024-03-12 17:30' };
      await page.waitForChanges();
      const changes = listen(page, 'tk-change');

      click(byTestId(page, 'timepicker-hour-18'));
      await page.waitForChanges();
      click(byTestId(page, 'timepicker-minute-31'));
      await page.waitForChanges();
      tkClick(childByTestId(page, 'timepicker-minutes-decrease'));
      await page.waitForChanges();
      tkClick(childByTestId(page, 'timepicker-minutes-increase'));
      await page.waitForChanges();

      expect(changes.map(c => (c as { end: string }).end)).toEqual(['2024-03-12 18:30', '2024-03-12 18:31', '2024-03-12 18:30', '2024-03-12 18:31']);
      expect(internals(page).internalStartTime).toEqual({ hour: 9, minute: 0 });
    });

    it('converts the end time when the meridiem toggle changes in 12-hour mode', async () => {
      const page = await setup(withTimes);
      page.root.value = { start: '2024-03-10 09:00', end: '2024-03-12 10:30' };
      await page.waitForChanges();
      // Switching the format syncs the meridiem with the start hour.
      page.root.timeFormat = '12';
      await page.waitForChanges();
      const changes = listen(page, 'tk-change');

      page.root.shadowRoot.querySelector('.tk-datepicker-ampm-toggle').dispatchEvent(new CustomEvent('tk-change', { detail: 'PM', bubbles: true, composed: true }));
      await page.waitForChanges();

      expect(internals(page).internalEndTime).toEqual({ hour: 22, minute: 30 });
      expect(internals(page).internalStartTime).toEqual({ hour: 9, minute: 0 });
      expect(changes).toEqual([{ start: '2024-03-10 09:00 AM', end: '2024-03-12 10:30 PM' }]);
    });

    it('takes the default time from the clock when a range is started in 12-hour mode', async () => {
      pinClock('2024-03-15T22:21:00');
      const page = await setup(`${withTimes} time-format="12" default-date="2024-03"`);

      click(dayCell(page, 10));
      await page.waitForChanges();

      expect(internals(page).internalStartTime).toEqual({ hour: 22, minute: 21 });
    });

    it('syncs the meridiem with a PM default time when a range is first started', async () => {
      pinClock('2024-03-15T22:21:00');
      const page = await setup(`${withTimes} time-format="12" default-date="2024-03"`);
      expect(internals(page).internalAmPm).toBe('PM');
      const changes = listen(page, 'tk-change');

      click(dayCell(page, 10));
      await page.waitForChanges();

      expect(internals(page).internalStartTime).toEqual({ hour: 22, minute: 21 });
      expect(internals(page).internalAmPm).toBe('PM');
      expect(page.root.shadowRoot.querySelector('.tk-datepicker-ampm-toggle').getAttribute('value')).toBe('PM');
      expect(changes).toEqual([{ start: '2024-03-10 10:21 PM', end: undefined }]);
    });

    it('keeps the end time when the input blurs with a 12-hour range loaded', async () => {
      const page = await setup(`show-time-picker="true" time-format="12"`);
      page.root.value = { start: '2024-03-10 09:00 AM', end: '2024-03-12 02:00 PM' };
      await page.waitForChanges();
      expect(internals(page).internalAmPm).toBe('PM');
      const changes = listen(page, 'tk-change');
      const timeChanges = listen(page, 'tk-time-change');

      input(page).dispatchEvent(new CustomEvent('tk-blur'));
      await page.waitForChanges();

      expect(internals(page).internalStartTime).toEqual({ hour: 9, minute: 0 });
      expect(internals(page).internalEndTime).toEqual({ hour: 14, minute: 0 });
      expect(internals(page).internalAmPm).toBe('PM');
      expect(internals(page).inputValue).toBe('2024-03-10 09:00 AM - 2024-03-12 02:00 PM');
      expect(changes).toEqual([]);
      expect(timeChanges).toEqual([]);
    });

    it('follows the start time again when a new range is started after a 12-hour range was loaded', async () => {
      const page = await setup(`${withTimes} time-format="12"`);
      page.root.value = { start: '2024-03-10 09:00 AM', end: '2024-03-12 02:00 PM' };
      await page.waitForChanges();
      expect(internals(page).internalAmPm).toBe('PM');
      const changes = listen(page, 'tk-change');

      click(dayCell(page, 20));
      await page.waitForChanges();

      expect(internals(page).internalSelectedDates).toEqual({ start: d(2024, 3, 20), end: null });
      expect(internals(page).internalStartTime).toEqual({ hour: 9, minute: 0 });
      expect(internals(page).internalAmPm).toBe('AM');
      expect(page.root.shadowRoot.querySelector('.tk-datepicker-ampm-toggle').getAttribute('value')).toBe('AM');
      expect(changes).toEqual([{ start: '2024-03-20 09:00 AM', end: undefined }]);

      click(dayCell(page, 25));
      await page.waitForChanges();

      // the end is picked, so the toggle governs (and shows) the end time again
      expect(internals(page).internalEndTime).toEqual({ hour: 9, minute: 0 });
      expect(internals(page).internalAmPm).toBe('AM');
    });

    it('gives date-only range ends the current time', async () => {
      pinClock('2024-03-15T22:21:00');
      const page = await setup(withTimes);
      page.root.value = { start: '2024-03-10', end: '2024-03-12' };
      await page.waitForChanges();

      expect(internals(page).internalSelectedDates).toEqual({ start: d(2024, 3, 10), end: d(2024, 3, 12) });
      expect(internals(page).internalStartTime).toEqual({ hour: 22, minute: 21 });
      expect(internals(page).internalEndTime).toEqual({ hour: 22, minute: 21 });
      expect(internals(page).inputValue).toBe('2024-03-10 22:21 - 2024-03-12 22:21');
    });

    it('gives a fresh range start the current time and drops the end time', async () => {
      const page = await setup(`${withTimes} default-date="2024-03"`);
      const changes = listen(page, 'tk-change');

      click(dayCell(page, 10));
      await page.waitForChanges();

      expect(internals(page).internalStartTime).toEqual({ hour: expect.any(Number), minute: expect.any(Number) });
      expect(internals(page).internalEndTime).toBeNull();
      expect(changes).toEqual([{ start: expect.stringMatching(/^2024-03-10 \d{2}:\d{2}$/), end: undefined }]);
    });

    it('copies the start time onto the end when the second click completes the range', async () => {
      const page = await setup(withTimes);
      page.root.value = { start: '2024-03-10 09:15' };
      await page.waitForChanges();
      const changes = listen(page, 'tk-change');

      click(dayCell(page, 12));
      await page.waitForChanges();

      expect(internals(page).internalEndTime).toEqual({ hour: 9, minute: 15 });
      expect(changes).toEqual([{ start: '2024-03-10 09:15', end: '2024-03-12 09:15' }]);
    });

    it('keeps the popup open after completing a range so the times can still be adjusted', async () => {
      const page = await setup(`show-time-picker="true" default-date="2024-03"`);
      click(input(page));
      await page.waitForChanges();

      await pickRange(page, 10, 12);

      expect(internals(page).isOpen).toBe(true);
    });

    it('swaps the ends when the end time is moved before the start on the same day', async () => {
      const page = await setup(withTimes);
      page.root.value = { start: '2024-03-10 09:00', end: '2024-03-10 09:00' };
      await page.waitForChanges();
      const changes = listen(page, 'tk-change');

      tkClick(childByTestId(page, 'timepicker-hours-decrease'));
      await page.waitForChanges();

      expect(changes).toEqual([{ start: '2024-03-10 08:00', end: '2024-03-10 09:00' }]);
      expect(internals(page).internalStartTime).toEqual({ hour: 8, minute: 0 });
      expect(internals(page).internalEndTime).toEqual({ hour: 9, minute: 0 });
      expect(internals(page).inputValue).toBe('2024-03-10 08:00 - 2024-03-10 09:00');
    });

    it('moves the start time along when the second click lands before the start', async () => {
      const page = await setup(withTimes);
      page.root.value = { start: '2024-03-15 10:00' };
      await page.waitForChanges();
      const changes = listen(page, 'tk-change');

      click(dayCell(page, 10));
      await page.waitForChanges();

      expect(internals(page).internalSelectedDates).toEqual({ start: d(2024, 3, 10), end: d(2024, 3, 15) });
      expect(changes).toEqual([{ start: '2024-03-10 10:00', end: '2024-03-15 10:00' }]);
    });
  });
});
