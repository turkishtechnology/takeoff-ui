jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
  isNil: (value: unknown) => value === null || value === undefined,
  some: (items: unknown, predicate: (item: unknown) => boolean) => (Array.isArray(items) ? items.some(predicate) : false),
  remove: (items: unknown[], predicate: (item: unknown) => boolean) => {
    const removed: unknown[] = [];
    for (let i = items.length - 1; i >= 0; i--) {
      if (predicate(items[i])) {
        removed.unshift(items[i]);
        items.splice(i, 1);
      }
    }
    return removed;
  },
}));

// floating-ui needs real layout APIs that the spec environment lacks; the select only
// consumes the returned cleanup function, so a no-op factory stands in for autoUpdate.
jest.mock('../../../utils/position-utils', () => ({
  floatingElementAutoUpdate: jest.fn(() => jest.fn()),
}));

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TkSelect } from '../tk-select';
import { TkInput } from '../../tk-input/tk-input';

const objectOptions = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Three', value: 3 },
];

beforeAll(() => {
  (Element.prototype as any).scrollIntoView = jest.fn();
});

const createSelect = async (attrs = '', props: Record<string, any> = {}) => {
  const page = await newSpecPage({
    components: [TkSelect, TkInput],
    html: `<tk-select ${attrs}></tk-select>`,
  });
  Object.assign(page.root, props);
  await page.waitForChanges();
  return page;
};

const instanceOf = (page: SpecPage) => page.rootInstance as any;

const openSelect = async (page: SpecPage) => {
  instanceOf(page).isOpen = true;
  await page.waitForChanges();
};

const listen = (page: SpecPage, eventName: string) => {
  const details: any[] = [];
  page.root.addEventListener(eventName, (e: Event) => details.push((e as CustomEvent).detail));
  return details;
};

const dropdownItems = (page: SpecPage) => Array.from(page.root.querySelectorAll('.dropdown-item')) as HTMLElement[];

describe('tk-select options handling', () => {
  it('renders the options that are present when the component loads', async () => {
    const page = await newSpecPage({
      components: [TkSelect, TkInput],
      template: () => <tk-select options={['A', 'B']} value="B"></tk-select>,
    });
    await page.waitForChanges();

    expect(instanceOf(page).renderOptions).toEqual(['A', 'B']);
    expect(instanceOf(page).inputRef.value).toBe('B');

    await openSelect(page);
    expect(dropdownItems(page)).toHaveLength(2);
  });

  it('empties the dropdown when the options are cleared or removed', async () => {
    const page = await createSelect('', { options: ['A', 'B'] });

    page.root.options = [];
    await page.waitForChanges();
    expect(instanceOf(page).renderOptions).toEqual([]);

    await openSelect(page);
    expect(page.root.querySelector('.dropdown-item-holder').textContent).toContain('No options available');

    await page.root.close();
    page.root.options = null;
    await page.waitForChanges();
    expect(instanceOf(page).renderOptions).toEqual([]);

    await openSelect(page);
    expect(page.root.querySelectorAll('.dropdown-item')).toHaveLength(0);
    expect(page.root.querySelector('.dropdown-item-holder').textContent).toContain('No options available');
  });

  it('clears the input when a value is set while there are no options', async () => {
    const page = await createSelect('', { options: [] });

    page.root.value = 'missing';
    await page.waitForChanges();

    expect(instanceOf(page).inputRef.value).toBe(null);
  });

  it('clears the input when an object value is used with primitive options', async () => {
    const page = await createSelect('', { options: ['a', 'b'] });

    page.root.value = { x: 1 };
    await page.waitForChanges();

    expect(instanceOf(page).inputRef.value).toBe(null);
  });

  it('matches a primitive value loosely against the options when the types differ', async () => {
    const page = await createSelect('', { options: [1, 2, 3] });

    page.root.value = '2';
    await page.waitForChanges();

    expect(instanceOf(page).inputRef.value).toBe('2');
  });

  it('matches a loosely typed value across grouped options through optionValueKey', async () => {
    const grouped = [
      { label: 'Group A', options: [{ label: 'One', value: 1 }] },
      { label: 'Group B', options: [{ label: 'Two', value: 2 }] },
    ];
    const page = await createSelect('option-value-key="value"', { options: grouped });

    page.root.value = '2';
    await page.waitForChanges();

    expect(instanceOf(page).inputRef.value).toBe('Two');
  });

  it('renders a group without an options list as an empty group', async () => {
    const grouped = [{ label: 'Group A', options: [{ label: 'One', value: 1 }] }, { label: 'Group B' }];
    const page = await createSelect('option-value-key="value"', { options: grouped });
    await openSelect(page);

    expect(page.root.querySelectorAll('.dropdown-group')).toHaveLength(2);
    expect(dropdownItems(page)).toHaveLength(1);
    expect(page.root.querySelectorAll('.dropdown-group-label label')[1].textContent).toBe('Group B');
  });

  it('tolerates null entries in the option list', async () => {
    const page = await createSelect('', { options: [null, 'A'] });
    await openSelect(page);

    const items = dropdownItems(page);
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toBe('');
    expect(items[1].textContent).toBe('A');
  });

  it('renders an empty top panel when panelTopHtml returns nothing', async () => {
    const page = await createSelect('', { options: ['A'] });
    page.root.panelTopHtml = () => null;
    await openSelect(page);

    const top = page.root.querySelector('.dropdown-item-top');
    expect(top).toBeTruthy();
    expect(top.textContent).toBe('');
  });
});

describe('tk-select value watcher', () => {
  it('ignores a value update that is deeply equal to the current one', async () => {
    const page = await createSelect('multiple="true" select-all="true" option-value-key="value"', { options: objectOptions });
    const selectAllEvents = listen(page, 'tk-select-all');

    page.root.value = [1, 2, 3];
    await page.waitForChanges();
    expect(selectAllEvents).toEqual([true]);

    page.root.value = [1, 2, 3];
    await page.waitForChanges();
    expect(selectAllEvents).toEqual([true]);
  });

  it('reports select-all as false when a non array value is set in multiple mode', async () => {
    const page = await createSelect('multiple="true" select-all="true" option-value-key="value"', { options: objectOptions });
    page.root.value = [1, 2, 3];
    await page.waitForChanges();
    const selectAllEvents = listen(page, 'tk-select-all');

    page.root.value = null;
    await page.waitForChanges();

    expect(selectAllEvents).toEqual([false]);
    expect(instanceOf(page).inputRef.value).toEqual([]);
  });
});

describe('tk-select multiple chip changes', () => {
  it('wraps a single chip value into an array', async () => {
    const page = await createSelect('multiple="true"', { options: ['A', 'B'] });
    const changes = listen(page, 'tk-change');

    await instanceOf(page).handleInputChange('A');

    expect(page.root.value).toEqual(['A']);
    expect(changes).toEqual([['A']]);
  });

  it('clears the selection when the chips input reports null', async () => {
    const page = await createSelect('multiple="true"', { options: ['A', 'B'] });
    page.root.value = ['A'];
    await page.waitForChanges();
    const changes = listen(page, 'tk-change');

    await instanceOf(page).handleInputChange(null);

    expect(page.root.value).toEqual([]);
    expect(changes).toEqual([[]]);
  });

  it('keeps the selection while the collapsed select-all chip is still present', async () => {
    const page = await createSelect('multiple="true" select-all="true" show-select-all-chip="true" option-value-key="value"', {
      options: objectOptions,
    });
    page.root.value = [1, 2, 3];
    await page.waitForChanges();
    const changes = listen(page, 'tk-change');

    await instanceOf(page).handleInputChange({ __isAllIndicator: true, label: 'All', removable: true });
    expect(page.root.value).toEqual([1, 2, 3]);
    expect(changes).toEqual([]);

    await instanceOf(page).handleInputChange(null);
    expect(page.root.value).toEqual([]);
    expect(changes).toEqual([[]]);
  });

  it('keeps disabled selections when the select-all chip is removed', async () => {
    const page = await createSelect('multiple="true" select-all="true" show-select-all-chip="true" option-value-key="value"', {
      options: objectOptions,
      optionDisabled: (item: any) => item.value === 3,
    });
    page.root.value = [1, 2, 3];
    await page.waitForChanges();
    expect(instanceOf(page).inputRef.value[0].__isAllIndicator).toBe(true);

    await instanceOf(page).handleInputChange([]);

    expect(page.root.value).toEqual([3]);
  });
});

describe('tk-select select all and clearing', () => {
  it('reports select-all as cleared when the clear button empties a full selection', async () => {
    const page = await createSelect('multiple="true" select-all="true" option-value-key="value" clearable="true"', { options: objectOptions });
    page.root.value = [1, 2, 3];
    await page.waitForChanges();
    const selectAllEvents = listen(page, 'tk-select-all');
    const changes = listen(page, 'tk-change');

    instanceOf(page).handleInputClearClick();

    expect(selectAllEvents).toEqual([false]);
    expect(changes).toEqual([null]);
    expect(page.root.value).toBe(null);
  });

  it('keeps disabled option objects on form reset without an optionValueKey', async () => {
    const page = await createSelect('multiple="true"', {
      options: objectOptions,
      optionDisabled: (item: any) => item.value === 3,
    });
    page.root.value = [objectOptions[0], objectOptions[2]];
    await page.waitForChanges();
    const changes = listen(page, 'tk-change');

    instanceOf(page).formResetCallback();

    expect(page.root.value).toEqual([{ label: 'Three', value: 3 }]);
    expect(changes).toEqual([[{ label: 'Three', value: 3 }]]);
  });
});

describe('tk-select option rows', () => {
  it('prevents the checkbox default and swallows its change in custom html multiple rows', async () => {
    const page = await createSelect('multiple="true" option-value-key="value"', { options: objectOptions });
    page.root.optionHtml = (item: any) => `<em>${item.label}</em>`;
    await openSelect(page);
    const changes = listen(page, 'tk-change');

    const checkbox = dropdownItems(page)[0].querySelector('tk-checkbox');
    const click = new MouseEvent('click', { cancelable: true });
    checkbox.dispatchEvent(click);
    expect(click.defaultPrevented).toBe(true);

    checkbox.dispatchEvent(new CustomEvent('tk-change', { detail: true, bubbles: true }));
    await page.waitForChanges();
    expect(changes).toEqual([]);
    expect(page.root.value).toBeUndefined();

    // a click on the checkbox bubbles to the row, which is what toggles the option
    checkbox.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(page.root.value).toEqual([1]);
    expect(changes).toEqual([[1]]);
  });
});

describe('tk-select without a registered tk-input', () => {
  const pathEvent = (path: any[]) => ({ composedPath: () => path });

  it('falls back to the host for outside click detection and still toggles from the chevron', async () => {
    const page = await newSpecPage({
      components: [TkSelect],
      html: `<tk-select></tk-select>`,
    });
    page.root.options = ['A'];
    await page.waitForChanges();
    const inst = instanceOf(page);
    expect(inst.nativeInputRef).toBeNull();

    inst.handleInputClick(pathEvent([{ tagName: 'TK-ICON', icon: 'keyboard_arrow_down', classList: { contains: () => false } }]));
    await page.waitForChanges();
    expect(inst.isOpen).toBe(true);
    expect(page.root.querySelector('.tk-select-panel')).toBeTruthy();

    page.doc.body.click();
    await page.waitForChanges();
    expect(inst.isOpen).toBe(false);
  });

  it('ignores clicks whose path carries elements without a class list', async () => {
    const page = await createSelect('', { options: ['A'] });
    const inst = instanceOf(page);

    inst.handleInputClick(pathEvent([{}, page.doc]));
    await page.waitForChanges();

    expect(inst.isOpen).toBe(false);
  });

  it('can be removed before the dropdown was ever opened', async () => {
    const page = await createSelect('', { options: ['A'] });
    const inst = instanceOf(page);

    expect(() => page.root.remove()).not.toThrow();
    expect(inst.cleanup).toBeNull();
  });
});

describe('tk-select aria state', () => {
  it('renders aria-expanded and the container state flags as "true"/"false" strings', async () => {
    const page = await createSelect('readonly="true" invalid="true"', { options: ['A'] });
    const inst = instanceOf(page);
    const expanded = () => page.root.querySelector('[aria-expanded]').getAttribute('aria-expanded');
    const container = page.root.querySelector('[aria-readonly]');

    expect(expanded()).toBe('false');
    expect(container.getAttribute('aria-readonly')).toBe('true');
    expect(container.getAttribute('aria-invalid')).toBe('true');
    expect(container.getAttribute('aria-disabled')).toBe('false');

    inst.isOpen = true;
    await page.waitForChanges();

    expect(expanded()).toBe('true');
  });
});
