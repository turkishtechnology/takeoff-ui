jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
}));

import { newSpecPage } from '@stencil/core/testing';
import { TkToggleButton } from '../tk-toggle-button';
import { TkToggleButtonGroup } from '../tk-toggle-button-group';

describe('tk-toggle-button-group', () => {
  it('selects the child whose value matches the group value', async () => {
    const page = await newSpecPage({
      components: [TkToggleButtonGroup, TkToggleButton],
      html: `<tk-toggle-button-group value="b"><tk-toggle-button value="a" label="A"></tk-toggle-button><tk-toggle-button value="b" label="B"></tk-toggle-button></tk-toggle-button-group>`,
    });

    expect(page.root.querySelectorAll('tk-toggle-button')[1].selected).toBe(true);
  });

  it('updates the group value and emits tk-change when a child is toggled', async () => {
    const page = await newSpecPage({
      components: [TkToggleButtonGroup, TkToggleButton],
      html: `<tk-toggle-button-group value="a"><tk-toggle-button value="a" label="A"></tk-toggle-button><tk-toggle-button value="b" label="B"></tk-toggle-button></tk-toggle-button-group>`,
    });

    const emitted: any[] = [];
    page.root.addEventListener('tk-change', (e: Event) => emitted.push((e as CustomEvent).detail));

    const buttons = page.root.querySelectorAll('tk-toggle-button');
    (buttons[1].shadowRoot.querySelector('button') as HTMLButtonElement).click();
    await page.waitForChanges();

    expect(page.root.value).toBe('b');
    expect(emitted).toEqual(['b']);
    expect(buttons[0].selected).toBe(false);
    expect(buttons[1].selected).toBe(true);
  });

  it('updates the selection and emits tk-change when the value prop changes', async () => {
    const page = await newSpecPage({
      components: [TkToggleButtonGroup, TkToggleButton],
      html: `<tk-toggle-button-group><tk-toggle-button value="a" label="A"></tk-toggle-button><tk-toggle-button value="b" label="B"></tk-toggle-button></tk-toggle-button-group>`,
    });

    const emitted: any[] = [];
    page.root.addEventListener('tk-change', (e: Event) => emitted.push((e as CustomEvent).detail));

    page.root.value = 'a';
    await page.waitForChanges();

    expect(page.root.querySelectorAll('tk-toggle-button')[0].selected).toBe(true);
    expect(emitted).toEqual(['a']);
  });

  it('propagates rounded to the slotted buttons when the rounded prop changes', async () => {
    const page = await newSpecPage({
      components: [TkToggleButtonGroup, TkToggleButton],
      html: `<tk-toggle-button-group><tk-toggle-button value="a" label="A"></tk-toggle-button></tk-toggle-button-group>`,
    });

    page.root.rounded = true;
    await page.waitForChanges();

    expect(page.root.querySelector('tk-toggle-button').rounded).toBe(true);
  });

  it('clears the selection of a disabled slotted button', async () => {
    const page = await newSpecPage({
      components: [TkToggleButtonGroup, TkToggleButton],
      html: `<tk-toggle-button-group><tk-toggle-button value="a" label="A"></tk-toggle-button><tk-toggle-button value="b" label="B"></tk-toggle-button></tk-toggle-button-group>`,
    });

    const buttons = page.root.querySelectorAll('tk-toggle-button');
    buttons[0].disabled = true;
    buttons[0].selected = true;

    page.root.value = 'b';
    await page.waitForChanges();

    expect(buttons[0].selected).toBe(false);
    expect(buttons[0].value).toBeUndefined();
    expect(buttons[1].selected).toBe(true);
  });

  it('registers newly slotted buttons on slotchange', async () => {
    const page = await newSpecPage({
      components: [TkToggleButtonGroup, TkToggleButton],
      html: `<tk-toggle-button-group rounded><tk-toggle-button value="a" label="A"></tk-toggle-button></tk-toggle-button-group>`,
    });

    const newButton = page.doc.createElement('tk-toggle-button');
    newButton.value = 'b';
    page.root.appendChild(newButton);
    await page.waitForChanges();

    const slot = page.root.shadowRoot.querySelector('slot');
    slot.dispatchEvent(new Event('slotchange'));
    await page.waitForChanges();

    expect(newButton.rounded).toBe(true);
  });

  it('applies type and direction classes on the container', async () => {
    const page = await newSpecPage({
      components: [TkToggleButtonGroup, TkToggleButton],
      html: `<tk-toggle-button-group type="divided" direction="vertical"><tk-toggle-button value="a" label="A"></tk-toggle-button></tk-toggle-button-group>`,
    });

    const container = page.root.shadowRoot.querySelector('.tk-toggle-button-group');
    expect(container.classList.contains('divided')).toBe(true);
    expect(container.classList.contains('vertical')).toBe(true);
    expect(container.classList.contains('horizontal')).toBe(false);
  });

  it('handles a value change without any slotted buttons', async () => {
    const page = await newSpecPage({
      components: [TkToggleButtonGroup],
      html: `<tk-toggle-button-group></tk-toggle-button-group>`,
    });

    const emitted: any[] = [];
    page.root.addEventListener('tk-change', (e: Event) => emitted.push((e as CustomEvent).detail));

    page.root.value = 'a';
    await page.waitForChanges();

    expect(emitted).toEqual(['a']);
    expect(page.root.shadowRoot.querySelector('.tk-toggle-button-group')).toBeTruthy();
  });

  it('applies the data-testid attribute on the container', async () => {
    const page = await newSpecPage({
      components: [TkToggleButtonGroup, TkToggleButton],
      html: `<tk-toggle-button-group data-testid="group"><tk-toggle-button value="a" label="A"></tk-toggle-button></tk-toggle-button-group>`,
    });

    expect(page.root.shadowRoot.querySelector('[data-testid="group-container"]')).toBeTruthy();
  });
});
