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

const setup = async (attrs = '') =>
  newSpecPage({
    components: [TkDatePicker, MockTkInput],
    html: `<tk-datepicker data-testid="dp" ${attrs}></tk-datepicker>`,
  });

const instanceOf = (page: SpecPage) => page.rootInstance as any;
const d = (year: number, month: number, day: number, hours = 0, minutes = 0) => new Date(year, month - 1, day, hours, minutes);

describe('tk-datepicker logic', () => {
  describe('normalizeDate', () => {
    it('strips the time portion', async () => {
      const page = await setup();
      const result = instanceOf(page).normalizeDate(d(2024, 3, 15, 13, 45));

      expect(result).toEqual(d(2024, 3, 15));
    });

    it('does not mutate the input', async () => {
      const page = await setup();
      const input = d(2024, 3, 15, 13, 45);
      instanceOf(page).normalizeDate(input);

      expect(input.getHours()).toBe(13);
    });
  });

  describe('format helpers', () => {
    it('formats a date with the configured dateFormat', async () => {
      const page = await setup(`date-format="dd.MM.yyyy"`);

      expect(instanceOf(page).formatDate(d(2024, 3, 15))).toBe('15.03.2024');
    });

    it('appends a 24-hour time pattern when the time picker is on', async () => {
      const page = await setup(`show-time-picker="true"`);

      expect(instanceOf(page).getFullDateTimeFormat()).toBe('yyyy-MM-dd HH:mm');
    });

    it('appends a 12-hour time pattern in 12h mode', async () => {
      const page = await setup(`show-time-picker="true" time-format="12"`);

      expect(instanceOf(page).getFullDateTimeFormat()).toBe('yyyy-MM-dd hh:mm a');
    });

    it('keeps a dateFormat that already carries a time pattern', async () => {
      const page = await setup(`show-time-picker="true" date-format="yyyy-MM-dd HH:mm"`);

      expect(instanceOf(page).getFullDateTimeFormat()).toBe('yyyy-MM-dd HH:mm');
    });

    it.each([
      ['24', 'HH:mm'],
      ['12', 'hh:mm a'],
    ])('uses the %s-hour time-only format', async (timeFormat, expected) => {
      const page = await setup(`time-format="${timeFormat}"`);

      expect(instanceOf(page).getOnlyTimeFormat()).toBe(expected);
    });

    it('returns an empty string when formatting a missing date', async () => {
      const page = await setup();

      expect(instanceOf(page).formatFullDateTime(null)).toBe('');
    });
  });

  describe('parseInputDate', () => {
    it('parses a value that matches the format exactly', async () => {
      const page = await setup();

      expect(instanceOf(page).parseInputDate('2024-03-15')).toEqual(d(2024, 3, 15));
    });

    it('rejects a value that does not round-trip', async () => {
      const page = await setup();

      expect(instanceOf(page).parseInputDate('2024-13-45')).toBeNull();
      expect(instanceOf(page).parseInputDate('not a date')).toBeNull();
      expect(instanceOf(page).parseInputDate('15.03.2024')).toBeNull();
    });

    it('honours a custom format', async () => {
      const page = await setup(`date-format="dd/MM/yyyy"`);

      expect(instanceOf(page).parseInputDate('15/03/2024')).toEqual(d(2024, 3, 15));
      expect(instanceOf(page).parseInputDate('2024-03-15')).toBeNull();
    });
  });

  describe('parseTimeString', () => {
    it('parses a 24-hour time', async () => {
      const page = await setup();
      const result = instanceOf(page).parseTimeString('14:30');

      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
    });

    it('parses a 12-hour time with a meridiem', async () => {
      const page = await setup(`time-format="12"`);
      const result = instanceOf(page).parseTimeString('02:30 PM');

      expect(result.getHours()).toBe(14);
    });

    it('returns null for an unparsable time', async () => {
      const page = await setup();

      expect(instanceOf(page).parseTimeString('nope')).toBeNull();
    });
  });

  describe('parseDefaultDate', () => {
    it.each([
      ['2024-03', 2024, 2],
      ['03-2024', 2024, 2],
      ['2024/03', 2024, 2],
      ['2024.03', 2024, 2],
    ])('resolves %s to a year and month', async (input, year, month) => {
      const page = await setup();
      const result = instanceOf(page).parseDefaultDate(input);

      expect(result.getFullYear()).toBe(year);
      expect(result.getMonth()).toBe(month);
    });

    it('resolves a bare year', async () => {
      const page = await setup();

      expect(instanceOf(page).parseDefaultDate('2024').getFullYear()).toBe(2024);
    });

    it('returns null for an unusable value', async () => {
      const page = await setup();

      expect(instanceOf(page).parseDefaultDate('garbage')).toBeNull();
      expect(instanceOf(page).parseDefaultDate(undefined)).toBeNull();
    });
  });

  describe('isDateDisabled', () => {
    it('disables dates before minDate and after maxDate', async () => {
      const page = await setup(`min-date="2024-03-10" max-date="2024-03-20"`);
      const instance = instanceOf(page);

      expect(instance.isDateDisabled(d(2024, 3, 9))).toBe(true);
      expect(instance.isDateDisabled(d(2024, 3, 10))).toBe(false);
      expect(instance.isDateDisabled(d(2024, 3, 15))).toBe(false);
      expect(instance.isDateDisabled(d(2024, 3, 20))).toBe(false);
      expect(instance.isDateDisabled(d(2024, 3, 21))).toBe(true);
    });

    it('treats allowedDates as a whitelist', async () => {
      const page = await setup();
      const instance = instanceOf(page);
      instance.allowedDates = ['2024-03-15', '2024-03-16'];

      expect(instance.isDateDisabled(d(2024, 3, 15))).toBe(false);
      expect(instance.isDateDisabled(d(2024, 3, 17))).toBe(true);
    });

    it('treats disabledDates as a blacklist', async () => {
      const page = await setup();
      const instance = instanceOf(page);
      instance.disabledDates = ['2024-03-15'];

      expect(instance.isDateDisabled(d(2024, 3, 15))).toBe(true);
      expect(instance.isDateDisabled(d(2024, 3, 16))).toBe(false);
    });

    it('disables configured weekdays', async () => {
      const page = await setup();
      const instance = instanceOf(page);
      instance.disabledWeekDays = [0, 6];

      expect(instance.isDateDisabled(d(2024, 3, 16))).toBe(true);
      expect(instance.isDateDisabled(d(2024, 3, 17))).toBe(true);
      expect(instance.isDateDisabled(d(2024, 3, 15))).toBe(false);
    });

    it('allows everything when no restriction is configured', async () => {
      const page = await setup();

      expect(instanceOf(page).isDateDisabled(d(2024, 3, 15))).toBe(false);
    });
  });

  describe('isMonthFullyDisabled', () => {
    it('reports a month outside the allowed range as fully disabled', async () => {
      const page = await setup(`min-date="2024-03-01" max-date="2024-03-31"`);

      expect(instanceOf(page).isMonthFullyDisabled(2024, 0)).toBe(true);
      expect(instanceOf(page).isMonthFullyDisabled(2024, 2)).toBe(false);
    });
  });

  describe('isToday', () => {
    it('recognises the current date', async () => {
      const page = await setup();
      const instance = instanceOf(page);

      expect(instance.isToday(new Date())).toBe(true);
      expect(instance.isToday(d(1999, 1, 1))).toBe(false);
    });
  });

  describe('getResolvedFirstDayIndex', () => {
    it.each([0, 1, 6])('honours an explicit index of %i', async index => {
      const page = await setup(`first-day-of-week-index="${index}"`);

      expect(instanceOf(page).getResolvedFirstDayIndex()).toBe(index);
    });

    it('falls back to 0 for an out-of-range index', async () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const page = await setup(`first-day-of-week-index="9"`);

      expect(instanceOf(page).getResolvedFirstDayIndex()).toBe(0);
      warn.mockRestore();
    });
  });

  describe('getFirstAvailableAllowedMonth', () => {
    it('returns the month of the earliest allowed date', async () => {
      const page = await setup();
      const instance = instanceOf(page);
      instance.allowedDates = ['2024-05-20', '2024-03-15', '2024-04-01'];

      const result = instance.getFirstAvailableAllowedMonth();

      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(2);
    });

    it('returns null when there are no allowed dates', async () => {
      const page = await setup();

      expect(instanceOf(page).getFirstAvailableAllowedMonth()).toBeNull();
    });
  });

  describe('mask options', () => {
    it('derives a date pattern and delimiter from the date format', async () => {
      const page = await setup(`date-format="dd/MM/yyyy"`);
      instanceOf(page).updateMaskOptions();

      expect(instanceOf(page).maskOptions).toEqual({ date: true, delimiter: '/', datePattern: ['d', 'm', 'Y'] });
    });

    it('reorders the date pattern to follow the format', async () => {
      const page = await setup(`date-format="yyyy-MM-dd"`);
      instanceOf(page).updateMaskOptions();

      expect(instanceOf(page).maskOptions.datePattern).toEqual(['Y', 'm', 'd']);
    });

    it('extends the mask with time blocks when the time picker is on', async () => {
      const page = await setup(`show-time-picker="true"`);
      instanceOf(page).updateMaskOptions();

      expect(instanceOf(page).maskOptions.blocks).toEqual([4, 2, 2, 2, 2]);
      expect(instanceOf(page).maskOptions.delimiters).toEqual(['-', '-', ' ', ':']);
    });

    it('switches to a time-only mask', async () => {
      const page = await setup(`time-only="true"`);
      instanceOf(page).updateMaskOptions();

      expect(instanceOf(page).maskOptions).toEqual({ time: true, timePattern: ['h', 'm'], timeFormat: '24' });
    });
  });

  describe('hasSelectedValue', () => {
    it('requires both ends in range mode', async () => {
      const page = await setup(`mode="range"`);
      const instance = instanceOf(page);

      instance.internalSelectedDates = { start: d(2024, 3, 15), end: null };
      expect(instance.hasSelectedValue()).toBe(false);

      instance.internalSelectedDates = { start: d(2024, 3, 15), end: d(2024, 3, 20) };
      expect(instance.hasSelectedValue()).toBe(true);
    });

    it('requires only a start in single mode', async () => {
      const page = await setup();
      const instance = instanceOf(page);

      expect(instance.hasSelectedValue()).toBe(false);

      instance.internalSelectedDates = { start: d(2024, 3, 15), end: null };
      expect(instance.hasSelectedValue()).toBe(true);
    });
  });

  describe('value handling', () => {
    it('adopts a string value into the selection and input', async () => {
      const page = await setup(`value="2024-03-15"`);

      expect(instanceOf(page).internalSelectedDates.start).toEqual(d(2024, 3, 15));
      expect(instanceOf(page).inputValue).toBe('2024-03-15');
    });

    it('adopts a range value', async () => {
      const page = await setup(`mode="range"`);

      page.root.value = { start: '2024-03-15', end: '2024-03-20' };
      await page.waitForChanges();

      expect(instanceOf(page).internalSelectedDates.start).toEqual(d(2024, 3, 15));
      expect(instanceOf(page).internalSelectedDates.end).toEqual(d(2024, 3, 20));
    });

    it('reacts to a later value change', async () => {
      const page = await setup(`value="2024-03-15"`);

      page.root.value = '2024-06-01';
      await page.waitForChanges();

      expect(instanceOf(page).internalSelectedDates.start).toEqual(d(2024, 6, 1));
    });

    it('moves the visible month to the selected date', async () => {
      const page = await setup(`value="2024-06-15"`);

      expect(instanceOf(page).currentMonth.getMonth()).toBe(5);
      expect(instanceOf(page).currentMonth.getFullYear()).toBe(2024);
    });
  });

  describe('navigation', () => {
    it('steps the visible month forwards and backwards', async () => {
      const page = await setup(`inline="true" value="2024-03-15"`);
      const instance = instanceOf(page);

      instance.handleMonthChange(1);
      expect(instance.currentMonth.getMonth()).toBe(3);

      instance.handleMonthChange(-1);
      expect(instance.currentMonth.getMonth()).toBe(2);
    });

    it('steps the visible year', async () => {
      const page = await setup(`inline="true" value="2024-03-15"`);
      const instance = instanceOf(page);

      instance.handleYearChange(1);
      expect(instance.currentMonth.getFullYear()).toBe(2025);

      instance.handleYearChange(-1);
      expect(instance.currentMonth.getFullYear()).toBe(2024);
    });

    it('switches the active view', async () => {
      const page = await setup(`inline="true"`);
      const instance = instanceOf(page);

      instance.handleViewChange({ stopPropagation: jest.fn() }, 'months');
      expect(instance.currentView).toBe('months');

      instance.handleViewChange({ stopPropagation: jest.fn() }, 'years');
      expect(instance.currentView).toBe('years');
    });

    it('selects a year and returns to the month view', async () => {
      const page = await setup(`inline="true" value="2024-03-15"`);
      const instance = instanceOf(page);

      instance.handleYearSelect({ stopPropagation: jest.fn() }, 2030);

      expect(instance.currentMonth.getFullYear()).toBe(2030);
    });
  });

  describe('selection', () => {
    it('selects a single date and emits', async () => {
      const page = await setup(`inline="true"`);
      const onChange = jest.fn();
      page.root.addEventListener('tk-change', onChange);

      instanceOf(page).handleDateClick(d(2024, 3, 15));
      await page.waitForChanges();

      expect(instanceOf(page).internalSelectedDates.start).toEqual(d(2024, 3, 15));
      expect(onChange).toHaveBeenCalled();
    });

    it('builds a range across two clicks', async () => {
      const page = await setup(`inline="true" mode="range"`);
      const instance = instanceOf(page);

      instance.handleDateClick(d(2024, 3, 15));
      await page.waitForChanges();
      expect(instance.internalSelectedDates.end).toBeFalsy();

      instance.handleDateClick(d(2024, 3, 20));
      await page.waitForChanges();

      expect(instance.internalSelectedDates.start).toEqual(d(2024, 3, 15));
      expect(instance.internalSelectedDates.end).toEqual(d(2024, 3, 20));
    });

    it('ignores a click on a disabled date', async () => {
      const page = await setup(`inline="true" min-date="2024-03-10"`);
      const instance = instanceOf(page);

      instance.handleDateClick(d(2024, 3, 1));
      await page.waitForChanges();

      expect(instance.internalSelectedDates.start).toBeFalsy();
    });

    it('tracks the hovered date while a range is open', async () => {
      const page = await setup(`inline="true" mode="range"`);
      const instance = instanceOf(page);

      instance.handleDateClick(d(2024, 3, 15));
      await page.waitForChanges();
      instance.handleDateHover(d(2024, 3, 18));

      expect(instance.hoverDate).toEqual(d(2024, 3, 18));
    });
  });

  describe('methods', () => {
    it('setToday() moves the selection to today', async () => {
      const page = await setup(`inline="true"`);

      await page.root.setToday();
      await page.waitForChanges();

      expect(instanceOf(page).isToday(instanceOf(page).internalSelectedDates.start)).toBe(true);
    });

    it('closePanel() closes an open panel', async () => {
      const page = await setup();
      instanceOf(page).isOpen = true;
      await page.waitForChanges();

      await page.root.closePanel();
      await page.waitForChanges();

      expect(instanceOf(page).isOpen).toBe(false);
    });

    it('apply() commits the selection and emits', async () => {
      const page = await setup(`allow-apply-button="true"`);
      const onChange = jest.fn();
      page.root.addEventListener('tk-change', onChange);

      instanceOf(page).internalSelectedDates = { start: d(2024, 3, 15), end: null };
      await page.root.apply();
      await page.waitForChanges();

      expect(onChange).toHaveBeenCalled();
      expect(page.root.value).toBeTruthy();
    });
  });

  describe('rendering', () => {
    it('renders the inline panel without opening', async () => {
      const page = await setup(`inline="true"`);

      expect(page.root.shadowRoot.querySelector('[data-testid="dp-panel"]')).toBeTruthy();
    });

    it('renders a day cell for a visible date', async () => {
      const page = await setup(`inline="true" value="2024-03-15"`);

      expect(page.root.shadowRoot.querySelector('[data-testid="dp-day-cell-2024-3-15"]')).toBeTruthy();
    });

    it('marks the selected day', async () => {
      const page = await setup(`inline="true" value="2024-03-15"`);
      const cell = page.root.shadowRoot.querySelector('[data-testid="dp-day-cell-2024-3-15"]');

      expect(cell.classList.contains('selected')).toBe(true);
    });

    it('marks disabled days', async () => {
      const page = await setup(`inline="true" value="2024-03-15" min-date="2024-03-10"`);
      const cell = page.root.shadowRoot.querySelector('[data-testid="dp-day-cell-2024-3-5"]');

      expect(cell.classList.contains('disabled')).toBe(true);
    });

    it('renders a loading spinner while loading', async () => {
      const page = await setup(`inline="true" loading="true"`);

      expect(page.root.shadowRoot.querySelector('[data-testid="dp-loading"]')).toBeTruthy();
    });

    it('renders the time picker when enabled', async () => {
      const page = await setup(`inline="true" show-time-picker="true"`);

      expect(page.root.shadowRoot.querySelector('[data-testid="dp-timepicker"]')).toBeTruthy();
    });

    it('renders an am/pm toggle only in 12-hour mode', async () => {
      // The toggle's test id is a Stencil prop on an unregistered child, so match on the class.
      const twelve = await setup(`inline="true" show-time-picker="true" time-format="12"`);
      expect(twelve.root.shadowRoot.querySelector('.tk-datepicker-ampm-toggle')).toBeTruthy();

      const twentyFour = await setup(`inline="true" show-time-picker="true"`);
      expect(twentyFour.root.shadowRoot.querySelector('.tk-datepicker-ampm-toggle')).toBeNull();
    });

    it('renders only the time picker in timeOnly mode', async () => {
      const page = await setup(`inline="true" time-only="true"`);

      expect(page.root.shadowRoot.querySelector('[data-testid="dp-timepicker"]')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('[data-testid="dp-days"]')).toBeNull();
    });
  });

  describe('time picker', () => {
    // The fixture carries a time component so the {hour, minute} state does not depend on the clock.
    const withTime = `inline="true" show-time-picker="true" value="2024-03-15 10:00"`;

    it('reads the time out of the value', async () => {
      const page = await setup(withTime);

      expect(instanceOf(page).internalStartTime).toEqual({ hour: 10, minute: 0 });
    });

    it('steps the hour up and down', async () => {
      const page = await setup(withTime);
      const instance = instanceOf(page);

      instance.handleIncreaseHour();
      expect(instance.internalStartTime.hour).toBe(11);

      instance.handleDecreaseHour();
      expect(instance.internalStartTime.hour).toBe(10);
    });

    it('steps the minute by minuteStep', async () => {
      const page = await setup(`inline="true" show-time-picker="true" minute-step="15" value="2024-03-15 10:00"`);
      const instance = instanceOf(page);

      instance.handleIncreaseMinute();

      expect(instance.internalStartTime.minute).toBe(15);
    });

    it('selects an hour directly', async () => {
      const page = await setup(withTime);
      const instance = instanceOf(page);

      instance.handleHourClick(18);

      expect(instance.internalStartTime.hour).toBe(18);
    });

    it('selects a minute directly', async () => {
      const page = await setup(withTime);
      const instance = instanceOf(page);

      instance.handleMinuteClick(42);

      expect(instance.internalStartTime.minute).toBe(42);
    });

    it('disables times outside the min/max window', async () => {
      const page = await setup(`inline="true" show-time-picker="true" min-time="09:00" max-time="17:00"`);
      const instance = instanceOf(page);

      expect(instance.isTimeDisabled(8, 0)).toBe(true);
      expect(instance.isTimeDisabled(12, 0)).toBe(false);
      expect(instance.isTimeDisabled(18, 0)).toBe(true);
    });
  });

  describe('clearing', () => {
    it('clears the selection and emits', async () => {
      const page = await setup(`clearable="true" value="2024-03-15"`);
      const onChange = jest.fn();
      page.root.addEventListener('tk-change', onChange);

      instanceOf(page).handleInputClearClick();
      await page.waitForChanges();

      expect(instanceOf(page).inputValue).toBe('');
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('slots', () => {
    it('detects footer slots', async () => {
      const page = await newSpecPage({
        components: [TkDatePicker, MockTkInput],
        html: `<tk-datepicker inline="true"><div slot="footer">f</div></tk-datepicker>`,
      });

      expect(instanceOf(page).hasFooterSlot).toBe(true);
      expect(instanceOf(page).hasFooterActionsSlot).toBe(false);
    });
  });
});
