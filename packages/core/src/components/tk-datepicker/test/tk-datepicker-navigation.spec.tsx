// uuid v14 is ESM-only and Jest does not transform node_modules, so importing the component
// under test would fail to parse. The component only uses it for a per-instance DOM id.
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

// floating-ui needs real layout APIs that the spec environment lacks.
jest.mock('../../../utils/position-utils', () => ({
  floatingElementAutoUpdate: jest.fn(() => jest.fn()),
}));

import { Component, Method, Prop, h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { format } from 'date-fns';
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

type DatepickerInternals = {
  isOpen: boolean;
  currentMonth: Date;
  internalSelectedDates: { start: Date | null; end: Date | null };
};

const setup = async (attrs = '', innerHtml = '') =>
  newSpecPage({
    components: [TkDatePicker, MockTkInput],
    html: `<tk-datepicker data-testid="dp" ${attrs}>${innerHtml}</tk-datepicker>`,
  });

/** Array props cannot be passed through HTML attributes, so those fixtures are built from a template. */
const setupWithProps = async (props: Record<string, unknown>) =>
  newSpecPage({
    components: [TkDatePicker, MockTkInput],
    template: () => h('tk-datepicker', { dataTestid: 'dp', inline: true, ...props }),
  });

const internals = (page: SpecPage) => page.rootInstance as unknown as DatepickerInternals;
const byTestId = (page: SpecPage, id: string) => page.root.shadowRoot.querySelector(`[data-testid="dp-${id}"]`) as HTMLElement | null;
// Test ids handed to unregistered Stencil children (tk-button, tk-toggle-button) land as a lowercased attribute.
const childByTestId = (page: SpecPage, id: string) => page.root.shadowRoot.querySelector(`[datatestid="dp-${id}"]`) as HTMLElement | null;
const dayCell = (page: SpecPage, year: number, month: number, day: number) => byTestId(page, `day-cell-${year}-${month}-${day}`);
const headerText = (page: SpecPage) => `${byTestId(page, 'header-month').textContent} ${byTestId(page, 'header-year').textContent}`;
const weekdayLabels = (page: SpecPage) => Array.from(page.root.shadowRoot.querySelectorAll('.tk-datepicker-week-day')).map(el => el.textContent);

const click = (el: Element, init: MouseEventInit = {}) => el.dispatchEvent(new MouseEvent('click', { bubbles: true, ...init }));
const tkClick = (el: Element) => el.dispatchEvent(new CustomEvent('tk-click', { bubbles: true }));
const listen = (page: SpecPage, eventName: string) => {
  const details: unknown[] = [];
  page.root.addEventListener(eventName, (e: Event) => details.push((e as CustomEvent).detail));
  return details;
};

describe('tk-datepicker navigation and calendar rendering', () => {
  describe('header', () => {
    it('shows the month name and year of the visible month', async () => {
      const page = await setup(`inline="true" value="2024-03-15"`);

      expect(headerText(page)).toBe('March 2024');
    });

    it('steps to the next and previous month from the chevron buttons', async () => {
      const page = await setup(`inline="true" value="2024-03-15"`);

      tkClick(childByTestId(page, 'next-month-button'));
      await page.waitForChanges();
      expect(headerText(page)).toBe('April 2024');
      expect(dayCell(page, 2024, 4, 30)).toBeTruthy();

      tkClick(childByTestId(page, 'prev-month-button'));
      await page.waitForChanges();
      expect(headerText(page)).toBe('March 2024');
    });

    it('rolls the year over when stepping past December', async () => {
      const page = await setup(`inline="true" value="2024-12-15"`);

      tkClick(childByTestId(page, 'next-month-button'));
      await page.waitForChanges();

      expect(headerText(page)).toBe('January 2025');
    });

    it('steps a whole year from the double-chevron buttons in the day view', async () => {
      const page = await setup(`inline="true" value="2024-03-15"`);

      tkClick(childByTestId(page, 'next-year-button'));
      await page.waitForChanges();
      expect(headerText(page)).toBe('March 2025');

      tkClick(childByTestId(page, 'prev-year-button'));
      await page.waitForChanges();
      expect(headerText(page)).toBe('March 2024');
    });

    it.each([
      ['primary', 'white'],
      ['dark', 'white'],
      ['light', 'neutral'],
      ['basic', 'neutral'],
    ])('uses the %s header style with %s navigation buttons', async (headerType, variant) => {
      const page = await setup(`inline="true" header-type="${headerType}"`);

      expect(byTestId(page, 'header').classList.contains(`tk-datepicker-header-${headerType}`)).toBe(true);
      expect(childByTestId(page, 'next-month-button').getAttribute('variant')).toBe(variant);
    });

    it('disables navigation while loading and shows a spinner instead of the calendar', async () => {
      const page = await setup(`inline="true" loading="true"`);

      expect(byTestId(page, 'loading')).toBeTruthy();
      expect(byTestId(page, 'table')).toBeNull();
      expect(childByTestId(page, 'next-month-button').hasAttribute('disabled')).toBe(true);
      expect(byTestId(page, 'header-month').classList.contains('disabled')).toBe(true);

      click(byTestId(page, 'header-month'));
      await page.waitForChanges();

      expect(byTestId(page, 'body').classList.contains('tk-datepicker-months-view')).toBe(false);
    });
  });

  describe('month and year views', () => {
    it('opens the month grid from the month label and highlights the visible month', async () => {
      const page = await setup(`inline="true" value="2024-03-15"`);

      click(byTestId(page, 'header-month'));
      await page.waitForChanges();

      expect(byTestId(page, 'body').classList.contains('tk-datepicker-months-view')).toBe(true);
      expect(byTestId(page, 'months')).toBeTruthy();
      expect(byTestId(page, 'days')).toBeNull();
      expect(byTestId(page, 'month-option-2').classList.contains('selected')).toBe(true);
      expect(byTestId(page, 'month-option-3').classList.contains('selected')).toBe(false);
    });

    it('picks a month and returns to the day view', async () => {
      const page = await setup(`inline="true" value="2024-03-15"`);
      click(byTestId(page, 'header-month'));
      await page.waitForChanges();

      click(byTestId(page, 'month-option-5'));
      await page.waitForChanges();

      expect(headerText(page)).toBe('June 2024');
      expect(byTestId(page, 'days')).toBeTruthy();
      expect(dayCell(page, 2024, 6, 30)).toBeTruthy();
    });

    it('opens a twelve-year block from the year label and highlights the visible year', async () => {
      const page = await setup(`inline="true" value="2024-03-15"`);

      click(byTestId(page, 'header-year'));
      await page.waitForChanges();

      expect(byTestId(page, 'body').classList.contains('tk-datepicker-years-view')).toBe(true);
      const years = Array.from(page.root.shadowRoot.querySelectorAll('.tk-datepicker-year')).map(el => el.textContent);
      expect(years).toEqual(['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027']);
      expect(byTestId(page, 'year-2024').classList.contains('selected')).toBe(true);
    });

    it('jumps twelve years at a time with the double chevrons in the year view', async () => {
      const page = await setup(`inline="true" value="2024-03-15"`);
      click(byTestId(page, 'header-year'));
      await page.waitForChanges();

      tkClick(childByTestId(page, 'next-year-button'));
      await page.waitForChanges();
      expect(byTestId(page, 'year-2028')).toBeTruthy();
      expect(byTestId(page, 'year-2039')).toBeTruthy();
      expect(byTestId(page, 'year-2024')).toBeNull();

      tkClick(childByTestId(page, 'prev-year-button'));
      await page.waitForChanges();
      expect(byTestId(page, 'year-2024')).toBeTruthy();
    });

    it('selects a year and continues to the month grid for that year', async () => {
      const page = await setup(`inline="true" value="2024-03-15"`);
      click(byTestId(page, 'header-year'));
      await page.waitForChanges();

      click(byTestId(page, 'year-2020'));
      await page.waitForChanges();

      expect(byTestId(page, 'months')).toBeTruthy();
      expect(byTestId(page, 'header-year').textContent).toBe('2020');

      click(byTestId(page, 'month-option-0'));
      await page.waitForChanges();
      expect(headerText(page)).toBe('January 2020');
      expect(dayCell(page, 2020, 1, 31)).toBeTruthy();
    });
  });

  describe('calendar grid', () => {
    it('pads the first and last week with adjacent-month days', async () => {
      const page = await setup(`inline="true" value="2024-02-15" first-day-of-week-index="0"`);

      // February 2024 starts on a Thursday: three January days lead in and three March days trail.
      const rows = page.root.shadowRoot.querySelectorAll('.tk-datepicker-days tr');
      expect(rows.length).toBe(5);
      expect(rows[0].querySelectorAll('td').length).toBe(7);
      expect(dayCell(page, 2024, 1, 29).classList.contains('adjacent-month')).toBe(true);
      expect(dayCell(page, 2024, 1, 31).classList.contains('adjacent-month')).toBe(true);
      expect(dayCell(page, 2024, 2, 1).classList.contains('adjacent-month')).toBe(false);
      expect(dayCell(page, 2024, 3, 3).classList.contains('adjacent-month')).toBe(true);
      expect(dayCell(page, 2024, 3, 4)).toBeNull();
    });

    it('lays the week out from the configured first day', async () => {
      const mondayFirst = await setup(`inline="true" first-day-of-week-index="0"`);
      expect(weekdayLabels(mondayFirst)).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);

      const sundayFirst = await setup(`inline="true" first-day-of-week-index="6" value="2024-03-15"`);
      expect(weekdayLabels(sundayFirst)).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
      // With Sunday first, March 2024 needs five leading February days and spills into a sixth row.
      expect(dayCell(sundayFirst, 2024, 2, 25).classList.contains('adjacent-month')).toBe(true);
      expect(sundayFirst.root.shadowRoot.querySelectorAll('.tk-datepicker-days tr').length).toBe(6);
    });

    it('falls back to Monday and warns for an out-of-range first day index', async () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const page = await setup(`inline="true" first-day-of-week-index="7"`);

      expect(weekdayLabels(page)[0]).toBe('Mon');
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('Invalid firstDayOfWeekIndex'));
      warn.mockRestore();
    });

    it('localizes weekday and month labels', async () => {
      const page = await setup(`inline="true" locale="de" value="2024-03-15" first-day-of-week-index="0"`);

      expect(weekdayLabels(page)[0]).toMatch(/^Mo/);
      expect(byTestId(page, 'header-month').textContent).toBe('März');
    });

    it('marks today unless it is selected', async () => {
      const today = new Date();
      const key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

      const unselected = await setup(`inline="true"`);
      expect(byTestId(unselected, `day-cell-${key}`).classList.contains('today')).toBe(true);

      const selected = await setup(`inline="true" value="${format(today, 'yyyy-MM-dd')}"`);
      const cell = byTestId(selected, `day-cell-${key}`);
      expect(cell.classList.contains('selected')).toBe(true);
      expect(cell.classList.contains('today')).toBe(false);
    });

    it('renders every day as disabled and ignores clicks when the picker is disabled', async () => {
      const page = await setup(`inline="true" disabled="true" value="2024-03-15"`);
      const changes = listen(page, 'tk-change');

      expect(dayCell(page, 2024, 3, 20).classList.contains('disabled')).toBe(true);
      expect(childByTestId(page, 'prev-month-button').hasAttribute('disabled')).toBe(true);
      expect(byTestId(page, 'header-year').classList.contains('disabled')).toBe(true);

      click(dayCell(page, 2024, 3, 20));
      await page.waitForChanges();

      expect(changes).toEqual([]);
      expect(dayCell(page, 2024, 3, 15).classList.contains('selected')).toBe(true);
    });

    it('marks days readonly and ignores clicks when the picker is readonly', async () => {
      const page = await setup(`inline="true" readonly="true" value="2024-03-15"`);
      const changes = listen(page, 'tk-change');

      expect(dayCell(page, 2024, 3, 20).classList.contains('readonly')).toBe(true);

      click(dayCell(page, 2024, 3, 20));
      await page.waitForChanges();

      expect(changes).toEqual([]);
      expect(dayCell(page, 2024, 3, 20).classList.contains('selected')).toBe(false);
    });
  });

  describe('date restrictions', () => {
    it('only enables the allowed dates and drops entries that do not match the format', async () => {
      const page = await setupWithProps({ allowedDates: ['2024-05-20', '2024-03-15', 'not-a-date'] });
      const changes = listen(page, 'tk-change');

      expect(page.root.allowedDates).toEqual(['2024-05-20', '2024-03-15']);
      // The calendar opens on the month of the earliest allowed date.
      expect(headerText(page)).toBe('March 2024');
      expect(dayCell(page, 2024, 3, 15).classList.contains('disabled')).toBe(false);
      expect(dayCell(page, 2024, 3, 16).classList.contains('disabled')).toBe(true);

      click(dayCell(page, 2024, 3, 16));
      await page.waitForChanges();
      expect(changes).toEqual([]);

      click(dayCell(page, 2024, 3, 15));
      await page.waitForChanges();
      expect(changes).toEqual(['2024-03-15']);
    });

    it('disables the listed dates and drops entries that do not match the format', async () => {
      const page = await setupWithProps({ disabledDates: ['2024-03-16', 'garbage'], value: '2024-03-15' });

      expect(page.root.disabledDates).toEqual(['2024-03-16']);
      expect(dayCell(page, 2024, 3, 16).classList.contains('disabled')).toBe(true);
      expect(dayCell(page, 2024, 3, 17).classList.contains('disabled')).toBe(false);
    });

    it('disables the configured weekdays', async () => {
      const page = await setupWithProps({ disabledWeekDays: [0, 6], value: '2024-03-15' });

      expect(dayCell(page, 2024, 3, 16).classList.contains('disabled')).toBe(true);
      expect(dayCell(page, 2024, 3, 17).classList.contains('disabled')).toBe(true);
      expect(dayCell(page, 2024, 3, 18).classList.contains('disabled')).toBe(false);
    });

    it('opens on the first month that still has a selectable day when the current month is fully disabled', async () => {
      const now = new Date();
      const firstOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const page = await setupWithProps({
        disabledDates: [format(now, 'yyyy-MM-dd')],
        minDate: format(firstOfNextMonth, 'yyyy-MM-dd'),
      });

      expect(internals(page).currentMonth.getMonth()).toBe(firstOfNextMonth.getMonth());
      expect(internals(page).currentMonth.getFullYear()).toBe(firstOfNextMonth.getFullYear());
    });

    it('stops searching after twelve months when nothing is selectable', async () => {
      const now = new Date();
      const page = await setupWithProps({ disabledDates: ['2099-05-05'], minDate: '2099-01-01', maxDate: '2098-01-01' });

      expect(internals(page).currentMonth.getFullYear()).toBe(now.getFullYear() + 1);
      expect(internals(page).currentMonth.getMonth()).toBe(now.getMonth());
    });

    it('disables days outside min and max and keeps the boundaries selectable', async () => {
      const page = await setup(`inline="true" value="2024-03-15" min-date="2024-03-10" max-date="2024-03-20"`);

      expect(dayCell(page, 2024, 3, 9).classList.contains('disabled')).toBe(true);
      expect(dayCell(page, 2024, 3, 10).classList.contains('disabled')).toBe(false);
      expect(dayCell(page, 2024, 3, 20).classList.contains('disabled')).toBe(false);
      expect(dayCell(page, 2024, 3, 21).classList.contains('disabled')).toBe(true);
    });
  });

  describe('defaultDate', () => {
    it.each([
      ['2030-06', 'June 2030'],
      ['06/2030', 'June 2030'],
      ['2030.06', 'June 2030'],
    ])('opens on %s', async (defaultDate, expected) => {
      const page = await setup(`inline="true" default-date="${defaultDate}"`);

      expect(headerText(page)).toBe(expected);
    });

    it('opens on the current month of a bare year', async () => {
      const page = await setup(`inline="true" default-date="2030"`);
      const currentMonthName = new Date().toLocaleString('en', { month: 'long' });

      expect(headerText(page)).toBe(`${currentMonthName} 2030`);
    });

    it('opens on a bare month of the current year', async () => {
      const page = await setup(`inline="true" default-date="06"`);

      expect(headerText(page)).toBe(`June ${new Date().getFullYear()}`);
    });

    it.each(['2030-13', '13-2030', '00', 'nope'])('ignores the unusable default date %s', async defaultDate => {
      const page = await setup(`inline="true" default-date="${defaultDate}"`);
      const now = new Date();

      expect(headerText(page)).toBe(`${now.toLocaleString('en', { month: 'long' })} ${now.getFullYear()}`);
    });

    it('prefers the selected value over defaultDate for the visible month', async () => {
      const page = await setup(`inline="true" default-date="2030-06" value="2024-03-15"`);

      expect(headerText(page)).toBe('March 2024');
    });
  });

  describe('footer', () => {
    it('wraps footer actions in the styled footer', async () => {
      const page = await setup(`inline="true" footer-type="divided"`, `<button slot="footer-actions">Apply</button>`);

      const footer = byTestId(page, 'footer');
      expect(footer.classList.contains('tk-datepicker-footer-divided')).toBe(true);
      expect(footer.querySelector('slot[name="footer-actions"]')).toBeTruthy();
      expect(byTestId(page, 'panel').classList.contains('tk-datepicker-panel-with-footer')).toBe(true);
    });

    it('renders a custom footer slot without the default wrapper', async () => {
      const page = await setup(`inline="true"`, `<div slot="footer">custom</div>`);

      expect(byTestId(page, 'footer')).toBeNull();
      expect(page.root.shadowRoot.querySelector('slot[name="footer"]')).toBeTruthy();
      expect(byTestId(page, 'panel').classList.contains('tk-datepicker-panel-with-footer')).toBe(true);
    });

    it('renders no footer when no slot is provided', async () => {
      const page = await setup(`inline="true"`);

      expect(byTestId(page, 'footer')).toBeNull();
      expect(page.root.shadowRoot.querySelector('slot')).toBeNull();
      expect(byTestId(page, 'panel').classList.contains('tk-datepicker-panel-with-footer')).toBe(false);
    });
  });

  describe('panel open and close', () => {
    it('renders the inline panel without a dialog role and the popup panel as a dialog', async () => {
      const inline = await setup(`inline="true"`);
      expect(byTestId(inline, 'panel').getAttribute('role')).toBeNull();
      expect(byTestId(inline, 'panel').classList.contains('tk-datepicker-panel-inline')).toBe(true);
      expect(inline.root.shadowRoot.querySelector('tk-input')).toBeNull();

      const popup = await setup();
      expect(byTestId(popup, 'panel')).toBeNull();
      click(popup.root.shadowRoot.querySelector('tk-input'));
      await popup.waitForChanges();
      expect(byTestId(popup, 'panel').getAttribute('role')).toBe('dialog');
    });

    it('returns to the selected month when the panel is reopened', async () => {
      const page = await setup(`value="2024-03-15"`);
      const input = page.root.shadowRoot.querySelector('tk-input');

      click(input);
      await page.waitForChanges();
      tkClick(childByTestId(page, 'next-month-button'));
      await page.waitForChanges();
      expect(headerText(page)).toBe('April 2024');

      await page.root.closePanel();
      await page.waitForChanges();
      click(input);
      await page.waitForChanges();

      expect(headerText(page)).toBe('March 2024');
    });

    it('returns to the day view when the panel is reopened', async () => {
      const page = await setup(`value="2024-03-15"`);
      const input = page.root.shadowRoot.querySelector('tk-input');

      click(input);
      await page.waitForChanges();
      click(byTestId(page, 'header-month'));
      await page.waitForChanges();
      expect(byTestId(page, 'months')).toBeTruthy();

      await page.root.closePanel();
      await page.waitForChanges();
      click(input);
      await page.waitForChanges();

      expect(byTestId(page, 'months')).toBeNull();
      expect(byTestId(page, 'days')).toBeTruthy();
    });

    it('closes on a click outside but not on a click inside the panel', async () => {
      const page = await setup(`mode="range" default-date="2024-03"`);
      click(page.root.shadowRoot.querySelector('tk-input'));
      await page.waitForChanges();

      // The first click of a range keeps the panel open, so a click inside must not be treated as outside.
      click(dayCell(page, 2024, 3, 10), { composed: true });
      await page.waitForChanges();
      expect(internals(page).isOpen).toBe(true);

      const outside = document.createElement('div');
      document.body.appendChild(outside);
      click(outside, { composed: true });
      await page.waitForChanges();

      expect(internals(page).isOpen).toBe(false);
      expect(byTestId(page, 'panel')).toBeNull();
      outside.remove();
    });

    it('lets Enter trigger a focused header control instead of closing the panel', async () => {
      const page = await setup(`value="2024-03-15"`);
      click(page.root.shadowRoot.querySelector('tk-input'));
      await page.waitForChanges();

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true, cancelable: true });
      childByTestId(page, 'prev-month-button').dispatchEvent(event);
      await page.waitForChanges();

      expect(internals(page).isOpen).toBe(true);
      expect(event.defaultPrevented).toBe(false);
    });
  });
});
