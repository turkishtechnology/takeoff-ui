// uuid v14 is ESM-only and Jest does not transform node_modules, so importing the component
// under test would fail to parse. The component only uses it for a per-instance DOM id.
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

import { Component, Method, Prop, h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TkDatePicker } from '../tk-datepicker';

@Component({
  tag: 'tk-input',
})
class MockTkInput {
  @Prop() showAsterisk: boolean;

  // The datepicker reaches for `.tk-input` when positioning the panel and calls setFocus() when
  // closing, so the mock has to provide both for any test that opens the panel.
  @Method()
  async setFocus() {
    /* no-op */
  }

  render() {
    return h('div', { class: { 'tk-input': true } }, this.showAsterisk ? '*' : '');
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

  it.each(['small', 'base', 'large'])('applies the %s size class to the panel', async size => {
    const page = await newSpecPage({
      components: [TkDatePicker, MockTkInput],
      html: `<tk-datepicker inline="true" size="${size}" data-testid="calendar"></tk-datepicker>`,
    });

    expect(page.root.shadowRoot.querySelector('[data-testid="calendar-panel"]')?.classList.contains(`tk-datepicker-panel-${size}`)).toBe(true);
    const expectedButtonSize = size === 'small' ? 'small' : 'base';
    expect(Array.from(page.root.shadowRoot.querySelectorAll('tk-button')).every(button => button.getAttribute('size') === expectedButtonSize)).toBe(true);
  });

  describe('keyboard dismissal', () => {
    /** Opens the panel and gives it a selected date, mirroring a user picking a day. */
    const openWith = async (attrs = '', { withSelection = true } = {}) => {
      const page = await newSpecPage({
        components: [TkDatePicker, MockTkInput],
        html: `<tk-datepicker ${attrs}></tk-datepicker>`,
      });
      const instance = page.rootInstance as any;
      if (withSelection) {
        instance.internalSelectedDates = { start: new Date(2026, 0, 15), end: null };
      }
      instance.isOpen = true;
      await page.waitForChanges();
      return { page, instance };
    };

    // Dispatched on document (not the host) because focus falls back to <body> after a user
    // clicks a non-focusable day cell — the case a panel-scoped listener would miss.
    const pressOnDocument = (key: string) => {
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, composed: true });
      document.dispatchEvent(event);
      return event;
    };

    it('closes the panel on Escape', async () => {
      const { instance } = await openWith();

      pressOnDocument('Escape');

      expect(instance.isOpen).toBe(false);
    });

    it('closes the panel on Escape even in apply-button mode', async () => {
      const { instance } = await openWith('allow-apply-button="true"');

      pressOnDocument('Escape');

      expect(instance.isOpen).toBe(false);
    });

    it('closes the panel on Enter once a date is selected', async () => {
      const { instance } = await openWith();

      pressOnDocument('Enter');

      expect(instance.isOpen).toBe(false);
    });

    it('keeps the panel open on Enter when nothing is selected', async () => {
      const { instance } = await openWith('', { withSelection: false });

      pressOnDocument('Enter');

      expect(instance.isOpen).toBe(true);
    });

    it('keeps the panel open on Enter in apply-button mode so Apply stays the confirm action', async () => {
      const { instance } = await openWith('allow-apply-button="true"');

      pressOnDocument('Enter');

      expect(instance.isOpen).toBe(true);
    });

    it('keeps the panel open on Enter until a range has both ends', async () => {
      const { page, instance } = await openWith('mode="range"');

      pressOnDocument('Enter');
      expect(instance.isOpen).toBe(true);

      instance.internalSelectedDates = { start: new Date(2026, 0, 15), end: new Date(2026, 0, 20) };
      await page.waitForChanges();
      pressOnDocument('Enter');

      expect(instance.isOpen).toBe(false);
    });

    it('leaves Escape available to the host page once closed', async () => {
      const { instance } = await openWith();

      pressOnDocument('Escape');
      const afterClose = pressOnDocument('Escape');

      expect(instance.isOpen).toBe(false);
      // Listener is detached on close, so a surrounding overlay still receives the keystroke.
      expect(afterClose.defaultPrevented).toBe(false);
    });

    it('ignores keystrokes aimed at unrelated elements on the page', async () => {
      const { instance } = await openWith();
      // The handler treats "focus fell back to body/root" as its own, so an unrelated keystroke is
      // only distinguishable when something else genuinely holds focus. The spec DOM never reports
      // an activeElement, so drive the handler with a path that resolves outside the datepicker.
      const outside = document.createElement('input');
      document.body.appendChild(outside);
      const event = Object.assign(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }), {
        composedPath: () => [outside, document.body],
      });
      // The spec DOM does not implement activeElement, so define it for the duration of the test.
      Object.defineProperty(document, 'activeElement', { value: outside, configurable: true });

      instance.handleDocumentKeyDown(event);

      expect(instance.isOpen).toBe(true);
      delete (document as any).activeElement;
      outside.remove();
    });

    it('does not act on keystrokes in inline mode', async () => {
      const { instance } = await openWith('inline="true"');

      pressOnDocument('Escape');

      expect(instance.isOpen).toBe(true);
    });

    it('stops responding to keystrokes once the panel closes', async () => {
      const { page, instance } = await openWith();

      instance.isOpen = false;
      await page.waitForChanges();
      // Reopening state directly would re-attach; instead confirm the detached listener is inert
      // by asserting a keystroke cannot revive or act on the closed panel.
      const event = pressOnDocument('Escape');

      expect(instance.isOpen).toBe(false);
      expect(event.defaultPrevented).toBe(false);
    });

    it('stops responding to keystrokes after the component is removed while open', async () => {
      const { instance } = await openWith();

      instance.disconnectedCallback();
      const event = pressOnDocument('Escape');

      // Listener was removed on teardown, so the keystroke passes through untouched.
      expect(event.defaultPrevented).toBe(false);
    });
  });
});
