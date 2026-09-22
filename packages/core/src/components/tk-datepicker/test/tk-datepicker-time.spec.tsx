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
  inputValue: string;
  internalAmPm: 'AM' | 'PM';
  internalSelectedDates: { start: Date | null; end: Date | null };
  internalStartTime: Time;
  internalEndTime: Time;
};

const setup = async (attrs = '') =>
  newSpecPage({
    components: [TkDatePicker, MockTkInput],
    html: `<tk-datepicker data-testid="dp" ${attrs}></tk-datepicker>`,
  });

const internals = (page: SpecPage) => page.rootInstance as unknown as DatepickerInternals;
const byTestId = (page: SpecPage, id: string) => page.root.shadowRoot.querySelector(`[data-testid="dp-${id}"]`) as HTMLElement | null;
const childByTestId = (page: SpecPage, id: string) => page.root.shadowRoot.querySelector(`[datatestid="dp-${id}"]`) as HTMLElement | null;
const input = (page: SpecPage) => page.root.shadowRoot.querySelector('tk-input') as HTMLElement;
const dayCell = (page: SpecPage, year: number, month: number, day: number) => byTestId(page, `day-cell-${year}-${month}-${day}`);
const hourCell = (page: SpecPage, hour: number) => byTestId(page, `timepicker-hour-${hour}`);
const minuteCell = (page: SpecPage, minute: number) => byTestId(page, `timepicker-minute-${minute}`);
const stepper = (page: SpecPage, name: 'hours-increase' | 'hours-decrease' | 'minutes-increase' | 'minutes-decrease') => childByTestId(page, `timepicker-${name}`);
const toggle = (page: SpecPage) => page.root.shadowRoot.querySelector('.tk-datepicker-ampm-toggle') as HTMLElement | null;
const visibleHours = (page: SpecPage) =>
  Array.from(byTestId(page, 'timepicker-hours').querySelectorAll('.tk-datepicker-timepicker-value:not(.tk-datepicker-timepicker-value-empty)')).map(el => el.textContent);
const visibleMinutes = (page: SpecPage) =>
  Array.from(byTestId(page, 'timepicker-minutes').querySelectorAll('.tk-datepicker-timepicker-value:not(.tk-datepicker-timepicker-value-empty)')).map(el => el.textContent);
const d = (year: number, month: number, day: number) => new Date(year, month - 1, day);

const click = (el: Element) => el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
const tkClick = (el: Element) => el.dispatchEvent(new CustomEvent('tk-click', { bubbles: true }));
// The AM/PM control is a nested toggle group whose own tk-change would cross the shadow boundary if not stopped.
const setAmPm = (page: SpecPage, value: 'AM' | 'PM') => toggle(page).dispatchEvent(new CustomEvent('tk-change', { detail: value, bubbles: true, composed: true }));
const listen = (page: SpecPage, eventName: string) => {
  const details: unknown[] = [];
  page.root.addEventListener(eventName, (e: Event) => details.push((e as CustomEvent).detail));
  return details;
};

// The parse debounce is scheduled through the mock window's own setTimeout, which Jest's fake timers
// cannot intercept, so the typing tests wait out the 300ms for real.
const typeAndSettle = async (page: SpecPage, text: string) => {
  input(page).dispatchEvent(new CustomEvent('tk-change', { detail: text }));
  input(page).dispatchEvent(new Event('input'));
  await new Promise(resolve => setTimeout(resolve, 320));
  await page.waitForChanges();
};

const openPanel = async (page: SpecPage) => {
  click(input(page));
  await page.waitForChanges();
};

describe('tk-datepicker time selection', () => {
  describe('single mode with the time picker', () => {
    // Monday-first keeps March 2024 at five rows so the option window stays at four entries.
    const inlineWith = (value: string, extra = '') => setup(`inline="true" show-time-picker="true" first-day-of-week-index="0" value="${value}" ${extra}`);

    it('highlights the hour and minute from the value and shows the neighbouring options', async () => {
      const page = await inlineWith('2024-03-15 10:30');

      expect(hourCell(page, 10).classList.contains('selected')).toBe(true);
      expect(minuteCell(page, 30).classList.contains('selected')).toBe(true);
      expect(visibleHours(page)).toEqual(['08', '09', '10', '11']);
      expect(visibleMinutes(page)).toEqual(['28', '29', '30', '31']);
      expect(internals(page).inputValue).toBe('2024-03-15 10:30');
    });

    it('picks an hour from the list and emits the date with the new time', async () => {
      const page = await inlineWith('2024-03-15 10:30');
      const changes = listen(page, 'tk-change');

      click(hourCell(page, 11));
      await page.waitForChanges();

      expect(changes).toEqual(['2024-03-15 11:30']);
      expect(hourCell(page, 11).classList.contains('selected')).toBe(true);
      expect(internals(page).inputValue).toBe('2024-03-15 11:30');
    });

    it('picks a minute from the list', async () => {
      const page = await inlineWith('2024-03-15 10:30');
      const changes = listen(page, 'tk-change');

      click(minuteCell(page, 31));
      await page.waitForChanges();

      expect(changes).toEqual(['2024-03-15 10:31']);
      expect(minuteCell(page, 31).classList.contains('selected')).toBe(true);
    });

    it('steps the hour and minute with the arrow buttons', async () => {
      const page = await inlineWith('2024-03-15 10:30');
      const changes = listen(page, 'tk-change');

      tkClick(stepper(page, 'hours-increase'));
      await page.waitForChanges();
      tkClick(stepper(page, 'minutes-decrease'));
      await page.waitForChanges();
      tkClick(stepper(page, 'hours-decrease'));
      await page.waitForChanges();
      tkClick(stepper(page, 'minutes-increase'));
      await page.waitForChanges();

      expect(changes).toEqual(['2024-03-15 11:30', '2024-03-15 11:29', '2024-03-15 10:29', '2024-03-15 10:30']);
    });

    it('stops at the ends of the hour and minute lists', async () => {
      const latest = await inlineWith('2024-03-15 23:59');
      expect(stepper(latest, 'hours-increase').hasAttribute('disabled')).toBe(true);
      expect(stepper(latest, 'minutes-increase').hasAttribute('disabled')).toBe(true);
      tkClick(stepper(latest, 'hours-increase'));
      tkClick(stepper(latest, 'minutes-increase'));
      await latest.waitForChanges();
      expect(internals(latest).internalStartTime).toEqual({ hour: 23, minute: 59 });

      const earliest = await inlineWith('2024-03-15 00:00');
      expect(stepper(earliest, 'hours-decrease').hasAttribute('disabled')).toBe(true);
      expect(stepper(earliest, 'minutes-decrease').hasAttribute('disabled')).toBe(true);
      tkClick(stepper(earliest, 'hours-decrease'));
      tkClick(stepper(earliest, 'minutes-decrease'));
      await earliest.waitForChanges();
      expect(internals(earliest).internalStartTime).toEqual({ hour: 0, minute: 0 });
    });

    it('offers hours in hourStep increments and snaps to the nearest one', async () => {
      const page = await inlineWith('2024-03-15 10:00', 'hour-step="6"');
      const changes = listen(page, 'tk-change');

      expect(visibleHours(page)).toEqual(['00', '06', '12', '18']);
      expect(hourCell(page, 12).classList.contains('selected')).toBe(true);

      tkClick(stepper(page, 'hours-increase'));
      await page.waitForChanges();

      expect(changes).toEqual(['2024-03-15 18:00']);
    });

    it('offers minutes in minuteStep increments', async () => {
      const page = await inlineWith('2024-03-15 10:30', 'minute-step="15"');
      const changes = listen(page, 'tk-change');

      expect(visibleMinutes(page)).toEqual(['00', '15', '30', '45']);

      tkClick(stepper(page, 'minutes-decrease'));
      await page.waitForChanges();

      expect(changes).toEqual(['2024-03-15 10:15']);
    });

    it('shows fewer or more options to match a four or six week calendar', async () => {
      // February 2021 fits in exactly four Monday-first rows.
      const fourWeeks = await setup(`inline="true" show-time-picker="true" first-day-of-week-index="0" value="2021-02-15 10:30"`);
      expect(byTestId(fourWeeks, 'timepicker-body').classList.contains('tk-datepicker-timepicker-body-4-weeks')).toBe(true);
      expect(visibleHours(fourWeeks)).toEqual(['09', '10', '11']);

      // March 2024 with a Sunday start spills into a sixth row.
      const sixWeeks = await setup(`inline="true" show-time-picker="true" first-day-of-week-index="6" value="2024-03-15 10:30"`);
      expect(byTestId(sixWeeks, 'timepicker-body').classList.contains('tk-datepicker-timepicker-body-6-weeks')).toBe(true);
      expect(visibleHours(sixWeeks)).toEqual(['08', '09', '10', '11', '12']);
    });

    it('disables hours and minutes outside the min and max time', async () => {
      const atMin = await inlineWith('2024-03-15 09:00', 'min-time="09:00" max-time="17:00"');
      const changes = listen(atMin, 'tk-change');

      expect(hourCell(atMin, 8).classList.contains('disabled')).toBe(true);
      expect(hourCell(atMin, 9).classList.contains('disabled')).toBe(false);
      expect(stepper(atMin, 'hours-decrease').hasAttribute('disabled')).toBe(true);
      expect(stepper(atMin, 'hours-increase').hasAttribute('disabled')).toBe(false);

      click(hourCell(atMin, 8));
      await atMin.waitForChanges();
      expect(changes).toEqual([]);

      const atMax = await inlineWith('2024-03-15 17:00', 'min-time="09:00" max-time="17:00"');
      expect(hourCell(atMax, 18).classList.contains('disabled')).toBe(true);
      expect(stepper(atMax, 'hours-increase').hasAttribute('disabled')).toBe(true);
      expect(minuteCell(atMax, 1).classList.contains('disabled')).toBe(true);
      expect(stepper(atMax, 'minutes-increase').hasAttribute('disabled')).toBe(true);
    });

    it('gives a newly picked day the current time and keeps the popup open for time changes', async () => {
      const page = await setup(`show-time-picker="true" default-date="2024-03"`);
      const changes = listen(page, 'tk-change');
      await openPanel(page);

      click(dayCell(page, 2024, 3, 20));
      await page.waitForChanges();

      expect(changes).toEqual([expect.stringMatching(/^2024-03-20 \d{2}:\d{2}$/)]);
      expect(internals(page).internalStartTime).toEqual({ hour: expect.any(Number), minute: expect.any(Number) });
      expect(internals(page).isOpen).toBe(true);

      await page.root.apply();
      await page.waitForChanges();
      expect(internals(page).isOpen).toBe(true);
    });

    it('selects today when the time is stepped before a day is picked', async () => {
      const page = await setup(`inline="true" show-time-picker="true"`);
      const changes = listen(page, 'tk-change');
      const today = new Date();

      tkClick(stepper(page, 'hours-increase'));
      await page.waitForChanges();

      expect(internals(page).internalSelectedDates.start).toEqual(d(today.getFullYear(), today.getMonth() + 1, today.getDate()));
      const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      expect(changes).toEqual([expect.stringMatching(new RegExp(`^${todayKey} \\d{2}:\\d{2}$`))]);
      expect(byTestId(page, `day-cell-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`).classList.contains('selected')).toBe(true);
    });

    it('keeps the chosen time when switching to another day', async () => {
      const page = await inlineWith('2024-03-15 10:30');
      const changes = listen(page, 'tk-change');

      click(dayCell(page, 2024, 3, 20));
      await page.waitForChanges();

      expect(changes).toEqual(['2024-03-20 10:30']);
    });

    it('defers time changes until apply() in apply-button mode', async () => {
      const page = await inlineWith('2024-03-15 10:30', 'allow-apply-button="true"');
      const changes = listen(page, 'tk-change');

      tkClick(stepper(page, 'hours-increase'));
      await page.waitForChanges();
      expect(changes).toEqual([]);
      expect(hourCell(page, 11).classList.contains('selected')).toBe(true);

      await page.root.apply();
      await page.waitForChanges();
      expect(changes).toEqual(['2024-03-15 11:30']);
    });

    it('ignores time changes while disabled or readonly', async () => {
      const disabled = await inlineWith('2024-03-15 10:30', 'disabled="true"');
      const disabledChanges = listen(disabled, 'tk-change');
      expect(hourCell(disabled, 11).classList.contains('disabled')).toBe(true);
      expect(stepper(disabled, 'hours-increase').hasAttribute('disabled')).toBe(true);
      click(hourCell(disabled, 11));
      click(minuteCell(disabled, 31));
      await disabled.waitForChanges();
      expect(disabledChanges).toEqual([]);

      const readonly = await inlineWith('2024-03-15 10:30', 'readonly="true"');
      const readonlyChanges = listen(readonly, 'tk-change');
      click(minuteCell(readonly, 31));
      await readonly.waitForChanges();
      expect(readonlyChanges).toEqual([]);
    });

    it('setToday() selects today with a step-aligned time', async () => {
      const page = await setup(`inline="true" show-time-picker="true" hour-step="6" minute-step="15"`);

      await page.root.setToday();
      await page.waitForChanges();

      const today = new Date();
      expect(internals(page).internalSelectedDates.start).toEqual(d(today.getFullYear(), today.getMonth() + 1, today.getDate()));
      const time = internals(page).internalStartTime;
      expect(time.hour % 6).toBe(0);
      expect(time.minute % 15).toBe(0);
      expect(internals(page).internalEndTime).toBeNull();
    });

    it('setToday() picks the meridiem that matches the current hour in 12-hour mode', async () => {
      const page = await setup(`inline="true" show-time-picker="true" time-format="12"`);

      await page.root.setToday();
      await page.waitForChanges();

      expect(internals(page).internalAmPm).toBe(new Date().getHours() >= 12 ? 'PM' : 'AM');
    });

    it('gives a date-only value the current time', async () => {
      pinClock('2024-03-15T22:21:00');
      const page = await inlineWith('2024-03-15');

      expect(internals(page).internalSelectedDates.start).toEqual(d(2024, 3, 15));
      expect(internals(page).internalStartTime).toEqual({ hour: 22, minute: 21 });
      expect(internals(page).inputValue).toBe('2024-03-15 22:21');
      expect(hourCell(page, 22).classList.contains('selected')).toBe(true);
    });

    it('warns when the min and max time leave no selectable slot', async () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

      await setup(`inline="true" show-time-picker="true" min-time="18:00" max-time="09:00"`);

      expect(warn).toHaveBeenCalledWith('TkDatepicker: No valid time slots available for the current configuration.');
      warn.mockRestore();
    });
  });

  describe('12-hour mode', () => {
    // Loads a 24-hour value and then switches to the 12-hour format so the fixtures can stay in 24-hour notation.
    const twelveHour = async (value24: string, extra = '') => {
      const page = await setup(`inline="true" show-time-picker="true" first-day-of-week-index="0" value="${value24}" ${extra}`);
      page.root.timeFormat = '12';
      await page.waitForChanges();
      return page;
    };

    it('loads a 12-hour PM value with the PM toggle', async () => {
      const page = await setup(`inline="true" show-time-picker="true" time-format="12" first-day-of-week-index="0" value="2024-03-15 02:30 PM"`);

      expect(internals(page).internalAmPm).toBe('PM');
      expect(internals(page).internalStartTime).toEqual({ hour: 14, minute: 30 });
      expect(toggle(page).getAttribute('value')).toBe('PM');
      expect(hourCell(page, 2).classList.contains('selected')).toBe(true);

      const changes = listen(page, 'tk-change');
      tkClick(stepper(page, 'hours-increase'));
      await page.waitForChanges();

      expect(changes).toEqual(['2024-03-15 03:30 PM']);
    });

    it('loads a date-only value with the meridiem of the current time', async () => {
      pinClock('2024-03-15T22:21:00');
      const page = await setup(`inline="true" show-time-picker="true" time-format="12" value="2024-03-15"`);

      expect(internals(page).internalStartTime).toEqual({ hour: 22, minute: 21 });
      expect(internals(page).internalAmPm).toBe('PM');
      expect(internals(page).inputValue).toBe('2024-03-15 10:21 PM');
    });

    it('lists 12-hour labels around the selected hour', async () => {
      const page = await twelveHour('2024-03-15 14:30');

      expect(internals(page).internalAmPm).toBe('PM');
      expect(internals(page).internalStartTime).toEqual({ hour: 14, minute: 30 });
      expect(toggle(page).getAttribute('value')).toBe('PM');
      expect(hourCell(page, 2).classList.contains('selected')).toBe(true);
      expect(visibleHours(page)).toEqual(['01', '02', '03']);
      expect(byTestId(page, 'timepicker-hours-value-empty-0')).toBeTruthy();
    });

    it('converts the time when the meridiem toggle changes without leaking the toggle event', async () => {
      const page = await twelveHour('2024-03-15 14:30');
      const changes = listen(page, 'tk-change');

      setAmPm(page, 'AM');
      await page.waitForChanges();
      expect(internals(page).internalStartTime).toEqual({ hour: 2, minute: 30 });
      expect(internals(page).inputValue).toBe('2024-03-15 02:30 AM');

      setAmPm(page, 'PM');
      await page.waitForChanges();
      expect(internals(page).internalStartTime).toEqual({ hour: 14, minute: 30 });

      expect(changes).toEqual(['2024-03-15 02:30 AM', '2024-03-15 02:30 PM']);
    });

    it('does nothing when the toggle re-selects the current meridiem', async () => {
      const page = await twelveHour('2024-03-15 14:30');
      const changes = listen(page, 'tk-change');

      setAmPm(page, 'PM');
      await page.waitForChanges();

      expect(changes).toEqual([]);
    });

    it('ignores the toggle while disabled', async () => {
      const page = await twelveHour('2024-03-15 14:30', 'disabled="true"');

      setAmPm(page, 'AM');
      await page.waitForChanges();

      expect(internals(page).internalAmPm).toBe('PM');
      expect(internals(page).internalStartTime).toEqual({ hour: 14, minute: 30 });
    });

    it('steps hours within the 12-hour list while keeping the meridiem', async () => {
      const page = await twelveHour('2024-03-15 14:30');
      const changes = listen(page, 'tk-change');

      tkClick(stepper(page, 'hours-increase'));
      await page.waitForChanges();
      tkClick(stepper(page, 'hours-decrease'));
      await page.waitForChanges();

      expect(changes).toEqual(['2024-03-15 03:30 PM', '2024-03-15 02:30 PM']);
    });

    it('stops at 12 and 1 in the 12-hour list', async () => {
      const noon = await twelveHour('2024-03-15 12:30');
      expect(stepper(noon, 'hours-increase').hasAttribute('disabled')).toBe(true);
      tkClick(stepper(noon, 'hours-increase'));
      await noon.waitForChanges();
      expect(internals(noon).internalStartTime).toEqual({ hour: 12, minute: 30 });

      const one = await twelveHour('2024-03-15 01:30');
      expect(stepper(one, 'hours-decrease').hasAttribute('disabled')).toBe(true);
      tkClick(stepper(one, 'hours-decrease'));
      await one.waitForChanges();
      expect(internals(one).internalStartTime).toEqual({ hour: 1, minute: 30 });
    });

    it('takes the default time from the clock when a day is picked in 12-hour mode', async () => {
      pinClock('2024-03-15T22:21:00');
      const page = await setup(`inline="true" show-time-picker="true" time-format="12" default-date="2024-03"`);

      click(dayCell(page, 2024, 3, 15));
      await page.waitForChanges();

      expect(internals(page).internalStartTime).toEqual({ hour: 22, minute: 21 });
    });

    it('syncs the meridiem with a PM default time when a day is first picked', async () => {
      pinClock('2024-03-15T22:21:00');
      const page = await setup(`inline="true" show-time-picker="true" time-format="12" default-date="2024-03"`);
      expect(internals(page).internalAmPm).toBe('PM');
      expect(toggle(page).getAttribute('value')).toBe('PM');
      const changes = listen(page, 'tk-change');

      click(dayCell(page, 2024, 3, 15));
      await page.waitForChanges();

      expect(internals(page).internalStartTime).toEqual({ hour: 22, minute: 21 });
      expect(internals(page).internalAmPm).toBe('PM');
      expect(changes).toEqual(['2024-03-15 10:21 PM']);
    });

    it('picks an hour from the list in the current meridiem', async () => {
      const page = await twelveHour('2024-03-15 14:30');
      const changes = listen(page, 'tk-change');

      click(hourCell(page, 3));
      await page.waitForChanges();

      expect(changes).toEqual(['2024-03-15 03:30 PM']);
      expect(internals(page).internalStartTime).toEqual({ hour: 15, minute: 30 });
    });

    it('locks the meridiem when minTime or maxTime pins it', async () => {
      const afternoon = await twelveHour('2024-03-15 14:30', 'min-time="01:00 PM"');
      expect(internals(afternoon).internalAmPm).toBe('PM');
      expect(childByTestId(afternoon, 'timepicker-am').hasAttribute('disabled')).toBe(true);
      expect(childByTestId(afternoon, 'timepicker-pm').hasAttribute('disabled')).toBe(false);

      const morning = await twelveHour('2024-03-15 08:30', 'max-time="11:00 AM"');
      expect(internals(morning).internalAmPm).toBe('AM');
      expect(childByTestId(morning, 'timepicker-pm').hasAttribute('disabled')).toBe(true);
    });

    it('applies a bound without a meridiem in the current meridiem', async () => {
      const page = await twelveHour('2024-03-15 09:30', 'min-time="09:00"');

      expect(hourCell(page, 8).classList.contains('disabled')).toBe(true);
      expect(hourCell(page, 9).classList.contains('disabled')).toBe(false);
      expect(stepper(page, 'hours-decrease').hasAttribute('disabled')).toBe(true);
    });

    it('adds the meridiem toggle and 12-hour placeholder when switching from 24-hour format', async () => {
      const page = await setup(`show-time-picker="true" value="2024-03-15 14:30"`);
      await openPanel(page);
      expect(toggle(page)).toBeNull();
      expect(input(page).getAttribute('placeholder')).toBe('YYYY-MM-DD HH:MM');

      page.root.timeFormat = '12';
      await page.waitForChanges();

      expect(toggle(page).getAttribute('value')).toBe('PM');
      expect(hourCell(page, 2).classList.contains('selected')).toBe(true);
      expect(input(page).getAttribute('placeholder')).toBe('YYYY-MM-DD HH:MM A');
    });

    it.each([
      ['basic', 'basic', 'text', 'primary'],
      ['light', 'light', 'text', 'primary'],
      ['divided', 'divided', 'text', 'primary'],
      ['primary', 'divided', 'filled', 'primary'],
      ['dark', 'divided', 'filled', 'neutral'],
    ])('styles the meridiem toggle for the %s header', async (headerType, groupType, buttonType, variant) => {
      const page = await twelveHour('2024-03-15 14:30', `header-type="${headerType}"`);

      expect(toggle(page).getAttribute('type')).toBe(groupType);
      expect(childByTestId(page, 'timepicker-am').getAttribute('type')).toBe(buttonType);
      expect(childByTestId(page, 'timepicker-am').getAttribute('variant')).toBe(variant);
    });
  });

  describe('time panel styling', () => {
    it.each(['dark', 'primary'])('applies the %s header style to the time panel', async headerType => {
      const page = await setup(`inline="true" show-time-picker="true" value="2024-03-15 10:30" header-type="${headerType}"`);

      expect(byTestId(page, 'timepicker-header').classList.contains(`tk-datepicker-timepicker-header-${headerType}`)).toBe(true);
      expect(byTestId(page, 'timepicker-body').classList.contains(`tk-datepicker-timepicker-body-${headerType}`)).toBe(true);
      expect(hourCell(page, 10).classList.contains(`tk-datepicker-timepicker-value-${headerType}`)).toBe(true);
      expect(byTestId(page, 'timepicker-hours-separator-top').classList.contains(`tk-datepicker-timepicker-separator-${headerType}`)).toBe(true);
      expect(stepper(page, 'hours-increase').getAttribute('variant')).toBe('white');
    });

    it('uses neutral controls for the basic header', async () => {
      const page = await setup(`inline="true" show-time-picker="true" value="2024-03-15 10:30"`);

      expect(byTestId(page, 'timepicker-body').classList.contains('tk-datepicker-timepicker-body-basic')).toBe(false);
      expect(hourCell(page, 10).classList.contains('tk-datepicker-timepicker-value-dark')).toBe(false);
      expect(stepper(page, 'hours-increase').getAttribute('variant')).toBe('neutral');
    });
  });

  describe('time-only mode', () => {
    it('renders only the time panel and shows the value as a time', async () => {
      const page = await setup(`inline="true" time-only="true" value="14:30"`);

      expect(byTestId(page, 'panel').querySelector('.tk-datepicker-timepicker-panel-only')).toBeTruthy();
      expect(byTestId(page, 'header')).toBeNull();
      expect(byTestId(page, 'days')).toBeNull();
      expect(internals(page).inputValue).toBe('14:30');
      expect(internals(page).internalStartTime).toEqual({ hour: 14, minute: 30 });
      expect(internals(page).internalSelectedDates).toEqual({ start: null, end: null });
      expect(hourCell(page, 14).classList.contains('selected')).toBe(true);
    });

    it('loads a 12-hour PM value with the PM toggle without emitting a change', async () => {
      pinClock('2024-03-15T09:00:00');
      const changes: unknown[] = [];
      const page = await newSpecPage({
        components: [TkDatePicker, MockTkInput],
        template: () =>
          h('tk-datepicker', { 'inline': true, 'timeOnly': true, 'timeFormat': '12', 'value': '02:00 PM', 'onTk-change': (e: CustomEvent) => changes.push(e.detail) }),
      });

      expect(changes).toEqual([]);
      expect(internals(page).internalAmPm).toBe('PM');
      expect(internals(page).internalStartTime).toEqual({ hour: 14, minute: 0 });
      expect(internals(page).inputValue).toBe('02:00 PM');
      expect(toggle(page).getAttribute('value')).toBe('PM');
    });

    it('emits a time string when an hour or minute is picked', async () => {
      const page = await setup(`inline="true" time-only="true" value="14:30"`);
      const changes = listen(page, 'tk-change');

      click(hourCell(page, 15));
      await page.waitForChanges();
      click(minuteCell(page, 31));
      await page.waitForChanges();

      expect(changes).toEqual(['15:30', '15:31']);
      expect(internals(page).inputValue).toBe('15:31');
    });

    it('steps the time with the arrow buttons', async () => {
      const page = await setup(`inline="true" time-only="true" value="14:30"`);
      const changes = listen(page, 'tk-change');

      tkClick(stepper(page, 'minutes-increase'));
      await page.waitForChanges();
      tkClick(stepper(page, 'hours-decrease'));
      await page.waitForChanges();

      expect(changes).toEqual(['14:31', '13:31']);
    });

    it('starts from the current time when stepping with nothing set', async () => {
      const page = await setup(`inline="true" time-only="true"`);
      const changes = listen(page, 'tk-change');

      tkClick(stepper(page, 'hours-increase'));
      await page.waitForChanges();

      expect(changes).toEqual([expect.stringMatching(/^\d{2}:\d{2}$/)]);
      expect(internals(page).internalStartTime).not.toBeNull();
    });

    it('continues from typed text that has not been parsed yet when stepping', async () => {
      const page = await setup(`time-only="true"`);
      const changes = listen(page, 'tk-change');
      input(page).dispatchEvent(new CustomEvent('tk-change', { detail: '08:15' }));
      await openPanel(page);
      expect(internals(page).internalStartTime).toBeNull();

      tkClick(stepper(page, 'minutes-increase'));
      await page.waitForChanges();

      expect(changes).toEqual(['08:16']);
      expect(input(page).getAttribute('value')).toBe('08:16');
    });

    it('accepts a typed time', async () => {
      const page = await setup(`time-only="true"`);
      const changes = listen(page, 'tk-change');

      await typeAndSettle(page, '16:45');

      expect(changes).toEqual(['16:45']);
      expect(internals(page).internalStartTime).toEqual({ hour: 16, minute: 45 });
      expect(input(page).hasAttribute('invalid')).toBe(false);
    });

    it('flags a typed time it cannot parse', async () => {
      const page = await setup(`time-only="true"`);
      const changes = listen(page, 'tk-change');
      const invalids = listen(page, 'tk-invalid');

      await typeAndSettle(page, '25:99');

      expect(invalids).toEqual([{ message: 'Invalid time format', value: '25:99' }]);
      expect(changes).toEqual([undefined]);
      expect(input(page).hasAttribute('invalid')).toBe(true);
    });

    it('rejects a typed time outside the min and max time', async () => {
      const page = await setup(`time-only="true" min-time="09:00" max-time="17:00"`);
      const changes = listen(page, 'tk-change');
      const invalids = listen(page, 'tk-invalid');

      await typeAndSettle(page, '08:00');

      expect(changes).toEqual([undefined]);
      expect(invalids).toEqual([]);
      expect(input(page).hasAttribute('invalid')).toBe(true);
      expect(internals(page).internalStartTime).toBeNull();
    });

    it('clears the time when the text is deleted', async () => {
      const page = await setup(`time-only="true" value="14:30"`);
      const changes = listen(page, 'tk-change');

      await typeAndSettle(page, '');

      expect(changes).toEqual([undefined]);
      expect(internals(page).internalStartTime).toBeNull();
    });

    it('holds typed and invalid times back in apply-button mode', async () => {
      const page = await setup(`time-only="true" allow-apply-button="true"`);
      const changes = listen(page, 'tk-change');
      const invalids = listen(page, 'tk-invalid');

      await typeAndSettle(page, 'nope');
      expect(invalids).toEqual([]);

      await typeAndSettle(page, '16:45');
      expect(changes).toEqual([]);

      await page.root.apply();
      await page.waitForChanges();
      expect(changes).toEqual(['16:45']);
      expect(page.root.value).toBe('16:45');
    });

    it('applies null when no time has been chosen', async () => {
      const page = await setup(`time-only="true" allow-apply-button="true"`);
      const changes = listen(page, 'tk-change');

      await page.root.apply();
      await page.waitForChanges();

      expect(changes).toEqual([null]);
    });

    it('interprets typed 12-hour text without a meridiem using the current toggle', async () => {
      const page = await setup(`time-only="true" value="14:00"`);
      page.root.timeFormat = '12';
      await page.waitForChanges();
      const changes = listen(page, 'tk-change');
      expect(internals(page).internalAmPm).toBe('PM');

      await typeAndSettle(page, '11:00');
      await typeAndSettle(page, '14:30');

      expect(changes).toEqual(['11:00 PM', '02:30 PM']);
    });

    it('converts the time when the meridiem toggle changes', async () => {
      const page = await setup(`inline="true" time-only="true" value="14:30"`);
      page.root.timeFormat = '12';
      await page.waitForChanges();
      const changes = listen(page, 'tk-change');

      setAmPm(page, 'AM');
      await page.waitForChanges();

      expect(changes).toEqual(['02:30 AM']);
      expect(internals(page).inputValue).toBe('02:30 AM');
    });

    it('resyncs the meridiem and reformats the text on blur', async () => {
      const page = await setup(`time-only="true" time-format="12"`);
      await typeAndSettle(page, '14:30');
      expect(internals(page).internalAmPm).toBe('AM');

      input(page).dispatchEvent(new CustomEvent('tk-blur'));
      await page.waitForChanges();

      expect(internals(page).internalAmPm).toBe('PM');
      expect(input(page).getAttribute('value')).toBe('02:30 PM');
    });

    it('lets keystrokes through even when the mask is disabled', async () => {
      const page = await setup(`time-only="true" disable-mask="true"`);

      const keydown = new KeyboardEvent('keydown', { key: '1', cancelable: true });
      input(page).dispatchEvent(keydown);

      expect(keydown.defaultPrevented).toBe(false);
    });

    it('closes the popup on Enter once a time is set', async () => {
      const page = await setup(`time-only="true" value="14:30"`);
      await openPanel(page);

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
      await page.waitForChanges();

      expect(internals(page).isOpen).toBe(false);
    });

    it('clears the time from the clear button', async () => {
      const page = await setup(`time-only="true" clearable="true" value="14:30"`);
      const changes = listen(page, 'tk-change');

      input(page).dispatchEvent(new CustomEvent('tk-clear-click'));
      await page.waitForChanges();

      expect(changes).toEqual([null]);
      expect(input(page).getAttribute('value')).toBe('');
      expect(internals(page).internalStartTime).toBeNull();
    });
  });
});
