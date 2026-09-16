jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
  isNil: (value: unknown) => value === null || value === undefined,
}));

// uuid v14 ships pure ESM which Jest can't transform from node_modules; stub it for the suite.
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkInput } from '../tk-input';

const render = async (html: string): Promise<SpecPage> => newSpecPage({ components: [TkInput], html });

const nativeInputOf = (page: SpecPage) => page.root.querySelector('input') as HTMLInputElement;

const listen = (page: SpecPage, eventName: string) => {
  const spy = jest.fn();
  page.root.addEventListener(eventName, (e: Event) => spy((e as CustomEvent).detail));
  return spy;
};

// The value prop type does not admit plain objects, but chipLabelKey reads them at runtime.
const objectValue = (value: Record<string, string>) => value as unknown as HTMLTkInputElement['value'];

describe('tk-input rendering and native attribute passthrough', () => {
  it('passes name, placeholder, min, max and step down to the native input', async () => {
    const page = await render(`<tk-input mode="number" name="qty" placeholder="Amount" min="1" max="9" step="0.5"></tk-input>`);
    const input = nativeInputOf(page);

    expect(input.getAttribute('name')).toBe('qty');
    expect(input.getAttribute('placeholder')).toBe('Amount');
    expect(input.getAttribute('min')).toBe('1');
    expect(input.getAttribute('max')).toBe('9');
    expect(input.getAttribute('step')).toBe('0.5');
    expect(input.getAttribute('type')).toBe('number');
    expect(input.getAttribute('autocomplete')).toBe('off');
  });

  it('renders an empty placeholder when none is given', async () => {
    const page = await render(`<tk-input></tk-input>`);
    expect(nativeInputOf(page).getAttribute('placeholder')).toBe('');
  });

  it('moves a host tabindex onto the native input so the field is not tabbed twice', async () => {
    const page = await render(`<tk-input tabindex="3"></tk-input>`);

    expect(page.root.hasAttribute('tabindex')).toBe(false);
    expect(nativeInputOf(page).getAttribute('tabindex')).toBe('3');
  });

  it('applies the size class to the container', async () => {
    const page = await render(`<tk-input size="large"></tk-input>`);
    expect(page.root.querySelector('.tk-input-container').classList.contains('large')).toBe(true);
  });

  it('reflects readonly, disabled and invalid as aria attributes and native state', async () => {
    const page = await render(`<tk-input readonly="true" disabled="true" invalid="true"></tk-input>`);
    const container = page.root.querySelector('.tk-input-container');

    expect(container.hasAttribute('aria-readonly')).toBe(true);
    expect(container.hasAttribute('aria-disabled')).toBe(true);
    expect(container.hasAttribute('aria-invalid')).toBe(true);
    expect(nativeInputOf(page).hasAttribute('disabled')).toBe(true);
    expect(nativeInputOf(page).hasAttribute('readonly')).toBe(true);

    const plain = await render(`<tk-input></tk-input>`);
    const plainContainer = plain.root.querySelector('.tk-input-container');
    expect(plainContainer.hasAttribute('aria-readonly')).toBe(false);
    expect(plainContainer.hasAttribute('aria-disabled')).toBe(false);
    expect(plainContainer.hasAttribute('aria-invalid')).toBe(false);
    expect(nativeInputOf(plain).hasAttribute('disabled')).toBe(false);
    expect(nativeInputOf(plain).hasAttribute('readonly')).toBe(false);
  });

  it('renders no label element when neither a label prop nor a label slot is given', async () => {
    const page = await render(`<tk-input></tk-input>`);
    expect(page.root.querySelector('label')).toBeNull();
  });

  it('renders the label without an asterisk by default', async () => {
    const page = await render(`<tk-input label="Name"></tk-input>`);
    const label = page.root.querySelector('label.label');

    expect(label.textContent).toBe('Name');
    expect(label.querySelector('.asterisk')).toBeNull();
    expect(label.getAttribute('for')).toBe(nativeInputOf(page).getAttribute('id'));
  });

  it('focuses the native input when the label is clicked instead of letting the browser do it', async () => {
    const page = await render(`<tk-input label="Name"></tk-input>`);
    const focus = jest.spyOn(nativeInputOf(page), 'focus');
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });

    page.root.querySelector('label').dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(focus).toHaveBeenCalledTimes(1);
  });

  it('renders a prefix with a divider', async () => {
    const page = await render(`<tk-input pre="https://" size="small"></tk-input>`);
    const prefix = page.root.querySelector('.tk-input-prefix-container');

    expect(prefix.classList.contains('small')).toBe(true);
    expect(prefix.querySelector('.tk-input-prefix-text').textContent).toBe('https://');
    expect(prefix.querySelector('.tk-input-divider')).not.toBeNull();
  });

  it('renders a string icon on the left by default and on the right when asked', async () => {
    const left = await render(`<tk-input icon="search"></tk-input>`);
    const control = left.root.querySelector('.tk-input');
    expect(control.firstElementChild.tagName).toBe('TK-ICON');
    expect(control.firstElementChild.getAttribute('icon')).toBe('search');

    const right = await render(`<tk-input icon="search" icon-position="right"></tk-input>`);
    const icons = Array.from(right.root.querySelectorAll('.tk-input tk-icon'));
    expect(icons).toHaveLength(1);
    expect(right.root.querySelector('.tk-input').lastElementChild.getAttribute('icon')).toBe('search');
  });

  it('renders both icons of a multi-icon config around the input', async () => {
    const page = await newSpecPage({
      components: [TkInput],
      template: () => <tk-input icon={{ left: 'search', right: { name: 'close' } }} dataTestid="field"></tk-input>,
    });

    expect(page.root.querySelector('tk-icon[data-testid="field-left-icon"]').getAttribute('icon')).toBe('search');
    expect(page.root.querySelector('tk-icon[data-testid="field-right-icon"]').getAttribute('icon')).toBe('close');
  });

  it('shows a loading spinner sized down from the input size', async () => {
    for (const [size, spinnerSize] of [
      ['large', 'small'],
      ['base', 'xsmall'],
      ['small', 'xxsmall'],
    ]) {
      const page = await render(`<tk-input loading="true" size="${size}"></tk-input>`);
      expect(page.root.querySelector('tk-spinner').getAttribute('size')).toBe(spinnerSize);
    }
    const idle = await render(`<tk-input></tk-input>`);
    expect(idle.root.querySelector('tk-spinner')).toBeNull();
  });

  it('renders the hint text with an info icon', async () => {
    const page = await render(`<tk-input hint="Optional field"></tk-input>`);
    const hint = page.root.querySelector('.tk-hint-wrapper');

    expect(hint.textContent).toContain('Optional field');
    expect(hint.classList.contains('error')).toBe(false);
    expect(hint.querySelector('tk-icon').getAttribute('icon')).toBe('info');
  });

  it('renders the error message over the hint with an error icon', async () => {
    const page = await render(`<tk-input hint="Optional field" error="Required" invalid="true"></tk-input>`);
    const hint = page.root.querySelector('.tk-hint-wrapper');

    expect(hint.textContent).toContain('Required');
    expect(hint.textContent).not.toContain('Optional field');
    expect(hint.classList.contains('error')).toBe(true);
    expect(hint.classList.contains('invalid')).toBe(true);
    expect(hint.querySelector('tk-icon').getAttribute('icon')).toBe('error');
  });

  it('renders no hint wrapper without hint or error', async () => {
    const page = await render(`<tk-input></tk-input>`);
    expect(page.root.querySelector('.tk-hint-wrapper')).toBeNull();
  });

  it('shows the label of an object value using chipLabelKey', async () => {
    const page = await newSpecPage({
      components: [TkInput],
      template: () => <tk-input chipLabelKey="name" value={objectValue({ name: 'Ada' })}></tk-input>,
    });

    expect(nativeInputOf(page).value).toBe('Ada');
  });

  it('rewrites the field when an object value is replaced by another object', async () => {
    const page = await newSpecPage({
      components: [TkInput],
      template: () => <tk-input chipLabelKey="name" value={objectValue({ name: 'Ada' })}></tk-input>,
    });

    page.root.value = { name: 'Grace' };
    await page.waitForChanges();

    expect(nativeInputOf(page).value).toBe('Grace');
  });

  it('sets the data-testid on every rendered part', async () => {
    const page = await render(`<tk-input data-testid="f" label="L" pre="P" hint="H" loading="true"></tk-input>`);
    for (const suffix of ['container', 'label', 'control', 'prefix', 'prefix-text', 'prefix-divider', 'native-input', 'hint', 'hint-text']) {
      expect(page.root.querySelector(`[data-testid="f-${suffix}"]`)).not.toBeNull();
    }
  });
});

describe('tk-input focus, blur and value events', () => {
  it('emits tk-change with the typed text and updates the value prop', async () => {
    const page = await render(`<tk-input></tk-input>`);
    const change = listen(page, 'tk-change');
    const input = nativeInputOf(page);

    input.value = 'hello';
    input.dispatchEvent(new Event('input'));

    expect(change).toHaveBeenCalledWith('hello');
    expect(page.root.value).toBe('hello');
  });

  it('does not emit tk-change when the typed value equals the current one', async () => {
    const page = await render(`<tk-input value="same"></tk-input>`);
    const change = listen(page, 'tk-change');
    const input = nativeInputOf(page);

    input.value = 'same';
    input.dispatchEvent(new Event('input'));

    expect(change).not.toHaveBeenCalled();
  });

  it('adds the focus class and emits tk-focus on focus, then removes it and emits tk-blur on blur', async () => {
    const page = await render(`<tk-input></tk-input>`);
    const focus = listen(page, 'tk-focus');
    const blur = listen(page, 'tk-blur');
    const input = nativeInputOf(page);
    const container = () => page.root.querySelector('.tk-input-container');

    input.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    expect(container().classList.contains('focus')).toBe(true);
    expect(focus).toHaveBeenCalledTimes(1);

    input.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    expect(container().classList.contains('focus')).toBe(false);
    expect(blur).toHaveBeenCalledTimes(1);
  });

  it('focuses the native input through setFocus()', async () => {
    const page = await render(`<tk-input></tk-input>`);
    const focus = jest.spyOn(nativeInputOf(page), 'focus');

    await page.root.setFocus();

    expect(focus).toHaveBeenCalledTimes(1);
  });

  it('writes a programmatic value into the native input', async () => {
    const page = await render(`<tk-input value="a"></tk-input>`);

    page.root.value = 'b';
    await page.waitForChanges();

    expect(nativeInputOf(page).value).toBe('b');
  });

  it('clears the value and emits tk-change on a form reset', async () => {
    const page = await render(`<tk-input value="draft"></tk-input>`);
    const change = listen(page, 'tk-change');

    page.rootInstance.formResetCallback();
    await page.waitForChanges();

    expect(page.root.value).toBeNull();
    expect(change).toHaveBeenCalledWith(null);
    expect(nativeInputOf(page).value).toBe('');
  });
});

describe('tk-input clear button', () => {
  const clearButtonOf = (page: SpecPage) => page.root.querySelector('tk-icon.tk-input-clear-button');

  it('is hidden until there is a value, and hidden when not clearable', async () => {
    const empty = await render(`<tk-input clearable="true"></tk-input>`);
    expect(clearButtonOf(empty)).toBeNull();

    const notClearable = await render(`<tk-input value="x"></tk-input>`);
    expect(clearButtonOf(notClearable)).toBeNull();

    const filled = await render(`<tk-input clearable="true" value="x"></tk-input>`);
    expect(clearButtonOf(filled)).not.toBeNull();
    expect(clearButtonOf(filled).getAttribute('icon')).toBe('close');
    expect(clearButtonOf(filled).getAttribute('tabindex')).toBe('0');
  });

  it('appears once text is typed', async () => {
    const page = await render(`<tk-input clearable="true"></tk-input>`);
    const input = nativeInputOf(page);

    input.value = 'x';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(clearButtonOf(page)).not.toBeNull();
  });

  it('clears the value and emits tk-change and tk-clear-click on click', async () => {
    const page = await render(`<tk-input clearable="true" value="x"></tk-input>`);
    const change = listen(page, 'tk-change');
    const clear = listen(page, 'tk-clear-click');
    const click = new MouseEvent('click', { bubbles: true });
    const stop = jest.spyOn(click, 'stopPropagation');

    clearButtonOf(page).dispatchEvent(click);
    await page.waitForChanges();

    expect(page.root.value).toBeNull();
    expect(change).toHaveBeenCalledWith(null);
    expect(clear).toHaveBeenCalledTimes(1);
    expect(stop).toHaveBeenCalled();
    expect(clearButtonOf(page)).toBeNull();
  });

  it('clears on Enter but not on other keys', async () => {
    const page = await render(`<tk-input clearable="true" value="x"></tk-input>`);
    const clear = listen(page, 'tk-clear-click');

    clearButtonOf(page).dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    expect(clear).not.toHaveBeenCalled();
    expect(page.root.value).toBe('x');

    const enter = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
    clearButtonOf(page).dispatchEvent(enter);
    await page.waitForChanges();

    expect(enter.defaultPrevented).toBe(true);
    expect(clear).toHaveBeenCalledTimes(1);
    expect(page.root.value).toBeNull();
  });

  it('is hidden on a readonly input', async () => {
    const page = await render(`<tk-input clearable="true" readonly="true" value="x"></tk-input>`);
    expect(clearButtonOf(page)).toBeNull();
  });

  it('is shown but inert on a disabled input', async () => {
    const page = await render(`<tk-input clearable="true" disabled="true" value="x"></tk-input>`);
    const clear = listen(page, 'tk-clear-click');
    const button = clearButtonOf(page);

    expect(button.classList.contains('disabled')).toBe(true);
    expect(button.getAttribute('tabindex')).toBe('-1');

    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(clear).not.toHaveBeenCalled();
    expect(page.root.value).toBe('x');
  });

  it('is shown for a chips input only when it holds chips', async () => {
    const page = await render(`<tk-input mode="chips" clearable="true"></tk-input>`);
    expect(clearButtonOf(page)).toBeNull();

    page.root.value = ['a'];
    await page.waitForChanges();
    expect(clearButtonOf(page)).not.toBeNull();

    page.root.value = [];
    await page.waitForChanges();
    expect(clearButtonOf(page)).toBeNull();
  });
});

describe('tk-input driven by tk-select', () => {
  it('makes the native input read-only for a non-editable select', async () => {
    const page = await render(`<tk-input class="tk-select-input"></tk-input>`);
    expect(nativeInputOf(page).hasAttribute('readonly')).toBe(true);
  });

  it('keeps the native input editable for an editable select', async () => {
    const page = await render(`<tk-input class="tk-select-input editable-select"></tk-input>`);
    expect(nativeInputOf(page).hasAttribute('readonly')).toBe(false);
  });

  it('makes the native input read-only for a readonly select even when editable', async () => {
    const page = await render(`<tk-input class="tk-select-input editable-select readonly-select"></tk-input>`);
    expect(nativeInputOf(page).hasAttribute('readonly')).toBe(true);
  });
});
