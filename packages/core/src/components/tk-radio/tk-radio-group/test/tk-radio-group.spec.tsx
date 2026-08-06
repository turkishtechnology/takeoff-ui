jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
}));

import { newSpecPage } from '@stencil/core/testing';
import { TkRadioGroup } from '../tk-radio-group';
import { TkRadio } from '../../tk-radio';

describe('tk-radio-group', () => {
  it('marks the radio matching the current value as checked', async () => {
    const page = await newSpecPage({
      components: [TkRadioGroup, TkRadio],
      html: `<tk-radio-group value="b"><tk-radio label="A" value="a"></tk-radio><tk-radio label="B" value="b"></tk-radio></tk-radio-group>`,
    });

    page.rootInstance.handleSlotChange();
    await page.waitForChanges();

    expect(page.root.querySelectorAll('tk-radio')[1].checked).toBe(true);
  });

  it('updates checked radios when the value prop changes', async () => {
    const page = await newSpecPage({
      components: [TkRadioGroup, TkRadio],
      html: `<tk-radio-group value="b"><tk-radio label="A" value="a"></tk-radio><tk-radio label="B" value="b"></tk-radio></tk-radio-group>`,
    });

    page.rootInstance.handleSlotChange();
    await page.waitForChanges();

    page.root.value = 'a';
    await page.waitForChanges();

    const radios = page.root.querySelectorAll('tk-radio');
    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBe(false);
  });

  it('updates the value and emits tk-change when a radio is selected', async () => {
    const page = await newSpecPage({
      components: [TkRadioGroup, TkRadio],
      html: `<tk-radio-group><tk-radio label="A" value="a"></tk-radio><tk-radio label="B" value="b"></tk-radio></tk-radio-group>`,
    });

    page.rootInstance.handleSlotChange();
    await page.waitForChanges();

    const spy = jest.fn();
    page.root.addEventListener('tk-change', spy);

    const radios = page.root.querySelectorAll('tk-radio');
    radios[0].querySelector('input').dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(page.root.value).toBe('a');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe('a');
    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBe(false);
  });

  it('clears the selection and emits tk-change on form reset', async () => {
    const page = await newSpecPage({
      components: [TkRadioGroup, TkRadio],
      html: `<tk-radio-group value="a"><tk-radio label="A" value="a"></tk-radio><tk-radio label="B" value="b"></tk-radio></tk-radio-group>`,
    });

    page.rootInstance.handleSlotChange();
    await page.waitForChanges();

    const spy = jest.fn();
    page.root.addEventListener('tk-change', spy);

    page.rootInstance.formResetCallback();
    await page.waitForChanges();

    expect(page.root.value).toBeNull();
    expect(spy.mock.calls[0][0].detail).toBeNull();

    const radios = page.root.querySelectorAll('tk-radio');
    expect(radios[0].checked).toBe(false);
    expect(radios[1].checked).toBe(false);
  });

  it('propagates invalid to slotted radios when it changes', async () => {
    const page = await newSpecPage({
      components: [TkRadioGroup, TkRadio],
      html: `<tk-radio-group><tk-radio label="A" value="a"></tk-radio><tk-radio label="B" value="b"></tk-radio></tk-radio-group>`,
    });

    page.rootInstance.handleSlotChange();
    await page.waitForChanges();

    page.root.invalid = true;
    await page.waitForChanges();

    const radios = page.root.querySelectorAll('tk-radio');
    expect(radios[0].invalid).toBe(true);
    expect(radios[1].invalid).toBe(true);
  });

  it('handles the invalid watcher before any slotted items are registered', async () => {
    const page = await newSpecPage({
      components: [TkRadioGroup],
      html: `<tk-radio-group></tk-radio-group>`,
    });

    expect(() => {
      page.root.invalid = true;
    }).not.toThrow();
    await page.waitForChanges();
  });

  it('applies spread, card type and group name to slotted radios', async () => {
    const page = await newSpecPage({
      components: [TkRadioGroup, TkRadio],
      html: `<tk-radio-group spread type="card" name="fruits"><tk-radio label="A" value="a"></tk-radio><tk-radio label="B" value="b" name="own"></tk-radio></tk-radio-group>`,
    });

    page.rootInstance.handleSlotChange();
    await page.waitForChanges();

    const radios = page.root.querySelectorAll('tk-radio');
    expect(radios[0].style.flex).toBe('1');
    expect(radios[0].getAttribute('data-type')).toBe('card');
    expect(radios[0].name).toBe('fruits');
    expect(radios[1].name).toBe('own');

    const holder = page.root.shadowRoot.querySelector('.tk-radio-holder');
    expect(holder.classList.contains('card')).toBe(true);
    expect(holder.classList.contains('spread')).toBe(true);
  });

  it('passes the group position down to slotted radios', async () => {
    const page = await newSpecPage({
      components: [TkRadioGroup, TkRadio],
      html: `<tk-radio-group position="right"><tk-radio label="A" value="a"></tk-radio></tk-radio-group>`,
    });

    page.rootInstance.handleSlotChange();
    await page.waitForChanges();

    const container = page.root.querySelector('.tk-radio-container') as HTMLElement;
    expect(container.classList.contains('right')).toBe(true);
  });

  it('renders the label with an asterisk when showAsterisk is set', async () => {
    const page = await newSpecPage({
      components: [TkRadioGroup],
      html: `<tk-radio-group label="Choose one" show-asterisk></tk-radio-group>`,
    });

    const label = page.root.shadowRoot.querySelector('.label');
    expect(label.textContent).toContain('Choose one');
    expect(label.querySelector('.asterisk')).toBeTruthy();
  });

  it('renders hint and error messages', async () => {
    const hintPage = await newSpecPage({
      components: [TkRadioGroup],
      html: `<tk-radio-group hint="Pick one"></tk-radio-group>`,
    });

    const hint = hintPage.root.shadowRoot.querySelector('.tk-hint-wrapper');
    expect(hint).toBeTruthy();
    expect(hint.textContent).toContain('Pick one');

    const errorPage = await newSpecPage({
      components: [TkRadioGroup],
      html: `<tk-radio-group invalid error="Required"></tk-radio-group>`,
    });

    const error = errorPage.root.shadowRoot.querySelector('.tk-hint-wrapper');
    expect(error.classList.contains('error')).toBe(true);
    expect(error.textContent).toContain('Required');
  });

  it('applies the vertical direction class', async () => {
    const page = await newSpecPage({
      components: [TkRadioGroup],
      html: `<tk-radio-group direction="vertical"></tk-radio-group>`,
    });

    const container = page.root.shadowRoot.querySelector('.tk-radio-group-container');
    expect(container.classList.contains('vertical')).toBe(true);
  });

  it('applies semantic data-testid attributes', async () => {
    const page = await newSpecPage({
      components: [TkRadioGroup],
      html: `<tk-radio-group data-testid="my-group" label="Choose"></tk-radio-group>`,
    });

    expect(page.root.shadowRoot.querySelector('[data-testid="my-group-container"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[data-testid="my-group-holder"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[data-testid="my-group-label"]')).toBeTruthy();
  });
});
