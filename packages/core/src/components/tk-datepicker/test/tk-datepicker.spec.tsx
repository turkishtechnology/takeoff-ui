import { Component, Prop, h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TkDatePicker } from '../tk-datepicker';

@Component({
  tag: 'tk-input',
})
class MockTkInput {
  @Prop() showAsterisk: boolean;

  render() {
    return h('div', null, this.showAsterisk ? '*' : '');
  }
}

describe('tk-datepicker', () => {
  it('passes the required marker to its input when configured', async () => {
    const page = await newSpecPage({
      components: [TkDatePicker, MockTkInput],
      html: `<tk-datepicker label="Start date" show-asterisk="true"></tk-datepicker>`,
    });

    expect(page.root.shadowRoot.querySelector('tk-input')?.showAsterisk).toBe(true);
  });

  it('uses stable numeric data-testid suffixes for localized weekday and month labels', async () => {
    const page = await newSpecPage({
      components: [TkDatePicker, MockTkInput],
      html: `<tk-datepicker inline="true" locale="tr-TR" data-testid="calendar"></tk-datepicker>`,
    });

    const weekdayIds = Array.from(page.root.shadowRoot.querySelectorAll('[data-testid^="calendar-week-cell-"]')).map(el => el.getAttribute('data-testid'));

    expect(weekdayIds).toContain('calendar-week-cell-0');
    expect(weekdayIds).toContain('calendar-week-cell-6');
    expect(weekdayIds.some(id => id?.includes('Pzt') || id?.includes('Çar'))).toBe(false);

    (page.rootInstance as any).currentView = 'months';
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('[data-testid="calendar-month-option-0"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[data-testid="calendar-month-option-11"]')).toBeTruthy();
  });
});
