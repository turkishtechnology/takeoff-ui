jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
  isNil: (value: unknown) => value === null || value === undefined,
}));

// uuid v14 ships pure ESM which Jest can't transform from node_modules; stub it for the suite.
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkInput } from '../tk-input';

const render = async (html: string): Promise<SpecPage> => newSpecPage({ components: [TkInput], html });

const nativeInputOf = (page: SpecPage) => page.root.querySelector('input') as HTMLInputElement;

const listenChange = (page: SpecPage) => {
  const spy = jest.fn();
  page.root.addEventListener('tk-change', (e: Event) => spy((e as CustomEvent).detail));
  return spy;
};

const typeValue = (page: SpecPage, text: string) => {
  const input = nativeInputOf(page);
  input.value = text;
  input.dispatchEvent(new Event('input'));
};

const blur = async (page: SpecPage) => {
  nativeInputOf(page).dispatchEvent(new Event('blur'));
  await page.waitForChanges();
};

describe('tk-input number mode', () => {
  it('renders a native number input', async () => {
    const page = await render(`<tk-input mode="number"></tk-input>`);
    expect(nativeInputOf(page).getAttribute('type')).toBe('number');
  });

  it('emits the typed value as a number and null when the field is emptied', async () => {
    const page = await render(`<tk-input mode="number"></tk-input>`);
    const change = listenChange(page);

    typeValue(page, '12.5');
    expect(change).toHaveBeenLastCalledWith(12.5);
    expect(page.root.value).toBe(12.5);

    typeValue(page, '');
    expect(change).toHaveBeenLastCalledWith(null);
    expect(page.root.value).toBeNull();
  });

  it('raises the value to min on blur when it is below min', async () => {
    const page = await render(`<tk-input mode="number" min="5" max="10"></tk-input>`);
    const change = listenChange(page);

    typeValue(page, '3');
    await blur(page);

    expect(page.root.value).toBe('5');
    expect(change).toHaveBeenLastCalledWith('5');
  });

  it('lowers the value to max on blur when it exceeds max', async () => {
    const page = await render(`<tk-input mode="number" min="5" max="10"></tk-input>`);
    const change = listenChange(page);

    typeValue(page, '42');
    await blur(page);

    expect(page.root.value).toBe('10');
    expect(change).toHaveBeenLastCalledWith('10');
  });

  it('leaves an in-range value alone on blur', async () => {
    const page = await render(`<tk-input mode="number" min="5" max="10"></tk-input>`);
    const change = listenChange(page);

    typeValue(page, '7');
    change.mockClear();
    await blur(page);

    expect(page.root.value).toBe(7);
    expect(change).not.toHaveBeenCalled();
  });

  it('clamps against a single bound when only min or only max is set', async () => {
    const onlyMin = await render(`<tk-input mode="number" min="0"></tk-input>`);
    typeValue(onlyMin, '-1');
    await blur(onlyMin);
    expect(onlyMin.root.value).toBe('0');

    const onlyMax = await render(`<tk-input mode="number" max="100"></tk-input>`);
    typeValue(onlyMax, '250');
    await blur(onlyMax);
    expect(onlyMax.root.value).toBe('100');
  });

  it('does not clamp an empty field or an input without bounds on blur', async () => {
    const empty = await render(`<tk-input mode="number" min="5"></tk-input>`);
    const emptyChange = listenChange(empty);
    await blur(empty);
    expect(empty.root.value).toBeUndefined();
    expect(emptyChange).not.toHaveBeenCalled();

    const unbounded = await render(`<tk-input mode="number"></tk-input>`);
    typeValue(unbounded, '99999');
    await blur(unbounded);
    expect(unbounded.root.value).toBe(99999);
  });
});

describe('tk-input counter mode', () => {
  const decreaseOf = (page: SpecPage) => page.root.querySelector('tk-icon[icon="remove"]');
  const increaseOf = (page: SpecPage) => page.root.querySelector('tk-icon[icon="add"]');
  const click = async (icon: Element, page: SpecPage) => {
    icon.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();
  };

  it('renders a number input with decrease and increase buttons and the counter class', async () => {
    const page = await render(`<tk-input mode="counter" value="2"></tk-input>`);

    expect(nativeInputOf(page).getAttribute('type')).toBe('number');
    expect(page.root.querySelector('.tk-input-container').classList.contains('counter')).toBe(true);
    expect(decreaseOf(page).classList.contains('counter-icon')).toBe(true);
    expect(increaseOf(page).classList.contains('counter-icon')).toBe(true);
    expect(nativeInputOf(page).value).toBe('2');
  });

  it('ignores the icon prop so the counter buttons keep their place', async () => {
    const page = await render(`<tk-input mode="counter" icon="search"></tk-input>`);
    expect(page.root.querySelector('tk-icon[icon="search"]')).toBeNull();
  });

  it('increments and decrements the value by one and emits tk-change with a number', async () => {
    const page = await render(`<tk-input mode="counter" value="2"></tk-input>`);
    const change = listenChange(page);

    await click(increaseOf(page), page);
    expect(page.root.value).toBe(3);
    expect(change).toHaveBeenLastCalledWith(3);
    expect(nativeInputOf(page).value).toBe('3');

    await click(decreaseOf(page), page);
    await click(decreaseOf(page), page);
    expect(page.root.value).toBe(1);
    expect(change).toHaveBeenLastCalledWith(1);
  });

  it('starts counting up from min when the field is empty, or from zero without a min', async () => {
    const withMin = await render(`<tk-input mode="counter" min="10"></tk-input>`);
    await click(increaseOf(withMin), withMin);
    expect(withMin.root.value).toBe(11);

    const noMin = await render(`<tk-input mode="counter"></tk-input>`);
    await click(increaseOf(noMin), noMin);
    expect(noMin.root.value).toBe(1);
    await click(decreaseOf(noMin), noMin);
    await click(decreaseOf(noMin), noMin);
    expect(noMin.root.value).toBe(-1);
  });

  it('stops at max and min and does not emit when the value cannot move', async () => {
    const page = await render(`<tk-input mode="counter" min="0" max="2" value="2"></tk-input>`);
    const change = listenChange(page);

    await click(increaseOf(page), page);
    expect(page.root.value).toBe('2');
    expect(change).not.toHaveBeenCalled();

    page.root.value = 0;
    await page.waitForChanges();
    await click(decreaseOf(page), page);
    expect(page.root.value).toBe(0);
    expect(change).not.toHaveBeenCalled();
  });

  it('steps back into range from an out-of-range value', async () => {
    const above = await render(`<tk-input mode="counter" min="0" max="3" value="10"></tk-input>`);
    await click(decreaseOf(above), above);
    expect(above.root.value).toBe(2);

    const below = await render(`<tk-input mode="counter" min="0" max="3" value="-5"></tk-input>`);
    await click(increaseOf(below), below);
    expect(below.root.value).toBe(1);
  });

  it('marks the buttons disabled at the bounds and when the input is disabled', async () => {
    const atMin = await render(`<tk-input mode="counter" min="0" max="5" value="0"></tk-input>`);
    expect(decreaseOf(atMin).classList.contains('disabled')).toBe(true);
    expect(increaseOf(atMin).classList.contains('disabled')).toBe(false);

    const atMax = await render(`<tk-input mode="counter" min="0" max="5" value="5"></tk-input>`);
    expect(decreaseOf(atMax).classList.contains('disabled')).toBe(false);
    expect(increaseOf(atMax).classList.contains('disabled')).toBe(true);

    const disabled = await render(`<tk-input mode="counter" disabled="true" value="3"></tk-input>`);
    expect(decreaseOf(disabled).classList.contains('disabled')).toBe(true);
    expect(increaseOf(disabled).classList.contains('disabled')).toBe(true);
  });

  it('ignores button clicks while disabled', async () => {
    const page = await render(`<tk-input mode="counter" disabled="true" value="3"></tk-input>`);
    const change = listenChange(page);

    await click(increaseOf(page), page);
    await click(decreaseOf(page), page);

    expect(page.root.value).toBe('3');
    expect(change).not.toHaveBeenCalled();
  });

  it('shows the initial and programmatic values clamped into the range', async () => {
    const page = await render(`<tk-input mode="counter" min="0" max="3" value="7"></tk-input>`);
    expect(nativeInputOf(page).value).toBe('3');

    page.root.value = -4;
    await page.waitForChanges();
    expect(nativeInputOf(page).value).toBe('0');

    page.root.value = null;
    await page.waitForChanges();
    expect(nativeInputOf(page).value).toBe('');
  });

  it('clamps a typed value into the range on key up and clears the field when emptied', async () => {
    const page = await render(`<tk-input mode="counter" min="0" max="3"></tk-input>`);
    const input = nativeInputOf(page);

    input.value = '9';
    input.dispatchEvent(new KeyboardEvent('keyup', { key: '9' }));
    expect(input.value).toBe('3');

    input.value = '2';
    input.dispatchEvent(new KeyboardEvent('keyup', { key: '2' }));
    expect(input.value).toBe('2');

    input.value = '';
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Backspace' }));
    expect(input.value).toBe('');
  });

  it('clamps to the bounds as numbers on blur', async () => {
    const page = await render(`<tk-input mode="counter" min="1" max="3"></tk-input>`);
    const change = listenChange(page);

    typeValue(page, '0');
    await blur(page);
    expect(page.root.value).toBe(1);
    expect(change).toHaveBeenLastCalledWith(1);

    typeValue(page, '8');
    await blur(page);
    expect(page.root.value).toBe(3);
    expect(change).toHaveBeenLastCalledWith(3);
  });

  it('leaves key up alone outside counter mode', async () => {
    const page = await render(`<tk-input mode="number" max="3"></tk-input>`);
    const input = nativeInputOf(page);

    input.value = '9';
    input.dispatchEvent(new KeyboardEvent('keyup', { key: '9' }));

    expect(input.value).toBe('9');
  });
});
