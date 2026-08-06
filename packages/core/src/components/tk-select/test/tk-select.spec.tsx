jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
  // the component also calls some() with primitive single-select values; lodash tolerates that
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
import { TkSelect } from '../tk-select';
import { TkInput } from '../../tk-input/tk-input';
import { floatingElementAutoUpdate } from '../../../utils/position-utils';

type TkSelectTestInstance = {
  inputRef: HTMLTkInputElement;
};

const objectOptions = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Three', value: 3 },
];

const groupedOptions = [
  {
    label: 'Group A',
    options: [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ],
  },
  {
    label: 'Group B',
    options: [{ label: 'Three', value: 3 }],
  },
];

// mock-doc elements do not implement scrollIntoView, which keyboard navigation relies on
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

const activeIndex = (page: SpecPage) => page.root.querySelector('.dropdown-item[data-active="true"]')?.getAttribute('data-option-index');

const keydown = (page: SpecPage, key: string) => instanceOf(page).handleInputKeydown({ key, preventDefault: jest.fn() });

describe('tk-select', () => {
  it('passes the selected label into the input', async () => {
    const page = await newSpecPage({
      components: [TkSelect, TkInput],
      html: `<tk-select></tk-select>`,
    });

    page.root.options = ['One', 'Two'];
    page.root.value = 'Two';
    await page.waitForChanges();

    expect((page.rootInstance as unknown as TkSelectTestInstance).inputRef.value).toBe('Two');
  });

  describe('rendering', () => {
    it('forwards label, hint, error and size to the inner input', async () => {
      const page = await createSelect('label="Country" hint="Pick one" error="Required" invalid="true" show-asterisk="true" size="small"');
      const input = page.root.querySelector('tk-input') as any;

      expect(input.label).toBe('Country');
      expect(input.hint).toBe('Pick one');
      expect(input.error).toBe('Required');
      expect(input.invalid).toBe(true);
      expect(input.showAsterisk).toBe(true);
      expect(page.root.querySelector('.tk-select-container').classList.contains('small')).toBe(true);
      expect(page.root.textContent).toContain('Required');
    });

    it('resolves object option labels through optionValueKey and nested optionLabelKey', async () => {
      const page = await createSelect('option-value-key="value"', { options: objectOptions });
      page.root.value = 2;
      await page.waitForChanges();
      expect(instanceOf(page).inputRef.value).toBe('Two');

      const nestedPage = await createSelect('option-label-key="meta.name" option-value-key="id"', {
        options: [
          { id: 'a', meta: { name: 'Alpha' } },
          { id: 'b', meta: { name: 'Beta' } },
        ],
      });
      nestedPage.root.value = 'b';
      await nestedPage.waitForChanges();
      expect(instanceOf(nestedPage).inputRef.value).toBe('Beta');
    });

    it('matches object values by deep equality when no optionValueKey is set', async () => {
      const page = await createSelect('', { options: objectOptions });
      page.root.value = { label: 'Three', value: 3 };
      await page.waitForChanges();
      expect(instanceOf(page).inputRef.value).toBe('Three');
    });

    it('clears the input when the value does not match any option', async () => {
      const page = await createSelect('option-value-key="value"', { options: objectOptions });
      page.root.value = 99;
      await page.waitForChanges();
      expect(instanceOf(page).inputRef.value).toBe(null);
    });

    it('toggles the chevron icon and clears the placeholder when a value is set', async () => {
      const page = await createSelect('placeholder="Choose"', { options: ['One', 'Two'] });
      const input = () => page.root.querySelector('tk-input') as any;

      expect(input().placeholder).toBe('Choose');
      expect(input().icon.right).toBe('keyboard_arrow_down');

      page.root.value = 'One';
      await page.waitForChanges();
      expect(input().placeholder).toBe('');

      await openSelect(page);
      expect(input().icon.right).toBe('keyboard_arrow_up');
    });

    it('marks the inner input as a table input when used inside a table', async () => {
      const page = await newSpecPage({
        components: [TkSelect, TkInput],
        html: `<tk-select class="tk-table-select"></tk-select>`,
      });
      expect(page.root.querySelector('tk-input').classList.contains('tk-table-input')).toBe(true);
    });

    it('sets the native input readonly in readonly mode', async () => {
      const page = await createSelect('readonly="true"', { options: ['One'] });
      expect(page.root.querySelector('input').getAttribute('readonly')).toBe('true');
    });
  });

  describe('dropdown open/close', () => {
    it('renders the panel, emits tk-open and activates the first item', async () => {
      const page = await createSelect('', { options: ['A', 'B', 'C'] });
      const opens = listen(page, 'tk-open');

      await openSelect(page);

      expect(page.root.querySelector('.tk-select-panel')).toBeTruthy();
      expect(dropdownItems(page)).toHaveLength(3);
      expect(opens).toHaveLength(1);
      expect(activeIndex(page)).toBe('0');
    });

    it('closes via the close() method and emits tk-close', async () => {
      const page = await createSelect('', { options: ['A'] });
      await openSelect(page);
      const closes = listen(page, 'tk-close');

      await page.root.close();
      await page.waitForChanges();

      expect(instanceOf(page).isOpen).toBe(false);
      expect(closes).toHaveLength(1);
      expect(page.root.querySelector('.tk-select-panel')).toBeNull();
    });

    it('closes the dropdown when the component becomes disabled', async () => {
      const page = await createSelect('', { options: ['A'] });
      await openSelect(page);

      page.root.disabled = true;
      await page.waitForChanges();

      expect(instanceOf(page).isOpen).toBe(false);
    });

    it('shows the empty message when there are no options', async () => {
      const page = await createSelect('empty-message="Nothing found"', { options: [] });
      await openSelect(page);
      expect(page.root.querySelector('.dropdown-item-holder').textContent).toContain('Nothing found');
    });

    it('prefers the empty-data slot over the empty message', async () => {
      const page = await newSpecPage({
        components: [TkSelect, TkInput],
        html: `<tk-select><span slot="empty-data">Nothing here</span></tk-select>`,
      });
      page.root.options = [];
      await page.waitForChanges();
      await openSelect(page);

      expect(instanceOf(page).hasEmptyDataSlot).toBe(true);
      expect(page.root.querySelector('.dropdown-item-holder').textContent).not.toContain('No options available');
    });

    it('renders a spinner instead of options while loading', async () => {
      const page = await createSelect('loading="true"', { options: ['A', 'B'] });
      await openSelect(page);

      expect(page.root.querySelector('.tk-select-panel tk-spinner')).toBeTruthy();
      expect(dropdownItems(page)).toHaveLength(0);
    });

    it('renders panelTopHtml content from a string or an element', async () => {
      const page = await createSelect('', { options: ['A'] });
      page.root.panelTopHtml = () => '<b>Top content</b>';
      await openSelect(page);
      expect(page.root.querySelector('.dropdown-item-top').innerHTML).toContain('Top content');

      const elementPage = await createSelect('', { options: ['A'] });
      elementPage.root.panelTopHtml = () => {
        const el = elementPage.doc.createElement('span');
        el.textContent = 'Element top';
        return el;
      };
      await openSelect(elementPage);
      expect(elementPage.root.querySelector('.dropdown-item-top').textContent).toContain('Element top');
    });

    it('renders custom option content with optionHtml', async () => {
      const page = await createSelect('', { options: objectOptions, optionValueKey: 'value' });
      page.root.optionHtml = (item: any) => `<em class="custom-option">${item.label}</em>`;
      await openSelect(page);
      expect(dropdownItems(page)[0].querySelector('em.custom-option')).toBeTruthy();

      const multiplePage = await createSelect('multiple="true"', { options: objectOptions, optionValueKey: 'value' });
      multiplePage.root.optionHtml = (item: any) => `<em>${item.label}</em>`;
      await openSelect(multiplePage);
      expect(dropdownItems(multiplePage)[0].querySelector('.multiple-option-content em')).toBeTruthy();
      expect(dropdownItems(multiplePage)[0].querySelector('tk-checkbox')).toBeTruthy();

      // the row checkbox swallows its own change events instead of toggling twice
      dropdownItems(multiplePage)[0]
        .querySelector('tk-checkbox')
        .dispatchEvent(new CustomEvent('tk-change', { detail: true }));
      expect(multiplePage.root.value).toBeUndefined();
    });

    it('closes when clicking outside of the select', async () => {
      const page = await createSelect('', { options: ['A'] });
      await openSelect(page);

      page.doc.body.click();
      await page.waitForChanges();

      expect(instanceOf(page).isOpen).toBe(false);
    });

    it('cleans up the floating listeners when the component is removed', async () => {
      const page = await createSelect('', { options: ['A'] });
      await openSelect(page);
      const cleanup = (floatingElementAutoUpdate as jest.Mock).mock.results.slice(-1)[0].value;

      page.root.remove();

      expect(cleanup).toHaveBeenCalled();
    });

    it('sizes the dropdown according to dropdownWidthMode', async () => {
      const matchParentPage = await createSelect('', { options: ['A'] });
      await openSelect(matchParentPage);
      let call = (floatingElementAutoUpdate as jest.Mock).mock.calls.slice(-1)[0];
      const matchParentFloating = matchParentPage.doc.createElement('div');
      call[3].size.apply({ rects: { reference: { width: 120 } }, elements: { floating: matchParentFloating } });
      expect(matchParentFloating.style.width).toBe('120px');

      const fixedPage = await createSelect('dropdown-width-mode="300px"', { options: ['A'] });
      await openSelect(fixedPage);
      call = (floatingElementAutoUpdate as jest.Mock).mock.calls.slice(-1)[0];
      const fixedFloating = fixedPage.doc.createElement('div');
      call[3].size.apply({ rects: { reference: { width: 120 } }, elements: { floating: fixedFloating } });
      expect(fixedFloating.style.width).toBe('300px');

      const autoPage = await createSelect('dropdown-width-mode="auto"', { options: ['A'] });
      await openSelect(autoPage);
      call = (floatingElementAutoUpdate as jest.Mock).mock.calls.slice(-1)[0];
      const autoFloating = autoPage.doc.createElement('div');
      call[3].size.apply({ rects: { reference: { width: 120 } }, elements: { floating: autoFloating } });
      expect(autoFloating.style.width).toBe('');
    });
  });

  describe('single selection', () => {
    it('selects an option on click, emits tk-change and closes the dropdown', async () => {
      const page = await createSelect('option-value-key="value"', { options: objectOptions });
      const changes = listen(page, 'tk-change');
      await openSelect(page);

      dropdownItems(page)[1].click();
      await page.waitForChanges();

      expect(changes).toEqual([2]);
      expect(page.root.value).toBe(2);
      expect(instanceOf(page).isOpen).toBe(false);
      expect(instanceOf(page).inputRef.value).toBe('Two');

      await openSelect(page);
      expect(dropdownItems(page)[1].getAttribute('data-selected')).toBe('true');
    });

    it('uses the whole option object as value when no optionValueKey is set', async () => {
      const page = await createSelect('', { options: objectOptions });
      await openSelect(page);

      dropdownItems(page)[0].click();
      await page.waitForChanges();

      expect(page.root.value).toEqual({ label: 'One', value: 1 });
      expect(instanceOf(page).inputRef.value).toBe('One');
    });

    it('ignores clicks on disabled options', async () => {
      const page = await createSelect('option-value-key="value"', {
        options: objectOptions,
        optionDisabled: (item: any) => item.value === 1,
      });
      await openSelect(page);

      expect(dropdownItems(page)[0].classList.contains('disabled')).toBe(true);
      dropdownItems(page)[0].click();
      await page.waitForChanges();

      expect(page.root.value).toBeUndefined();
      expect(instanceOf(page).isOpen).toBe(true);
    });

    it('ignores clicks in readonly mode', async () => {
      const page = await createSelect('readonly="true"', { options: ['A', 'B'] });
      await openSelect(page);

      dropdownItems(page)[0].click();
      await page.waitForChanges();

      expect(page.root.value).toBeUndefined();
    });
  });

  describe('multiple selection', () => {
    it('toggles values on item clicks and keeps the dropdown open', async () => {
      const page = await createSelect('multiple="true" option-value-key="value"', { options: objectOptions });
      const changes = listen(page, 'tk-change');
      await openSelect(page);

      dropdownItems(page)[0].click();
      await page.waitForChanges();
      expect(page.root.value).toEqual([1]);
      expect(dropdownItems(page)[0].getAttribute('data-selected')).toBe('true');

      dropdownItems(page)[1].click();
      await page.waitForChanges();
      expect(page.root.value).toEqual([1, 2]);
      expect(instanceOf(page).isOpen).toBe(true);

      dropdownItems(page)[0].click();
      await page.waitForChanges();
      expect(page.root.value).toEqual([2]);

      expect(changes).toEqual([[1], [1, 2], [2]]);
    });

    it('stores option objects when no optionValueKey is set', async () => {
      const page = await createSelect('multiple="true"', { options: objectOptions });
      await openSelect(page);

      dropdownItems(page)[2].click();
      await page.waitForChanges();

      expect(page.root.value).toEqual([{ label: 'Three', value: 3 }]);
    });

    it('drops unknown values but keeps custom values when allowCustomValue is set', async () => {
      const strictPage = await createSelect('multiple="true" option-value-key="value"', { options: objectOptions });
      strictPage.root.value = [1, 99];
      await strictPage.waitForChanges();
      expect(instanceOf(strictPage).inputRef.value).toEqual([{ label: 'One', value: 1 }]);

      const customPage = await createSelect('multiple="true" allow-custom-value="true" option-value-key="value"', { options: objectOptions });
      customPage.root.value = [1, 'custom'];
      await customPage.waitForChanges();
      expect(instanceOf(customPage).inputRef.value).toEqual([{ label: 'One', value: 1 }, 'custom']);
    });

    it('resolves chip objects back to their values in handleInputChange', async () => {
      const page = await createSelect('multiple="true" option-value-key="value"', { options: objectOptions });
      const changes = listen(page, 'tk-change');

      await instanceOf(page).handleInputChange([objectOptions[0], objectOptions[2]]);
      expect(page.root.value).toEqual([1, 3]);

      await instanceOf(page).handleInputChange(['raw']);
      expect(page.root.value).toEqual(['raw']);

      await instanceOf(page).handleInputChange(null);
      expect(page.root.value).toEqual([]);

      expect(changes).toEqual([[1, 3], ['raw'], []]);
    });

    it('collapses overflowing chips into a +N indicator', async () => {
      const page = await createSelect('multiple="true" visible-item-count="2" option-value-key="value"', { options: objectOptions });
      page.root.value = [1, 2, 3];
      await page.waitForChanges();

      const display = instanceOf(page).inputRef.value as any[];
      expect(display).toHaveLength(3);
      expect(display[0]).toEqual({ label: 'One', value: 1 });
      expect(display[1]).toEqual({ label: 'Two', value: 2 });
      expect(display[2]).toMatchObject({ __isOthersIndicator: true, label: '+1', removable: false });
    });

    it('removes the right value when a chip is removed while the +N indicator is shown', async () => {
      const page = await createSelect('multiple="true" visible-item-count="2" option-value-key="value"', { options: objectOptions });
      page.root.value = [1, 2, 3];
      await page.waitForChanges();

      const display = instanceOf(page).inputRef.value as any[];
      // the user removed the first visible chip; tk-input reports the remaining display chips
      await instanceOf(page).handleInputChange([display[1], display[2]]);

      expect(page.root.value).toEqual([2, 3]);
    });

    it('prioritizes predefined options over custom values when collapsing chips', async () => {
      const page = await createSelect('multiple="true" allow-custom-value="true" visible-item-count="2" option-value-key="value"', { options: objectOptions });
      page.root.value = ['custom', 1, 2];
      await page.waitForChanges();

      const display = instanceOf(page).inputRef.value as any[];
      expect(display[0]).toEqual({ label: 'One', value: 1 });
      expect(display[1]).toEqual({ label: 'Two', value: 2 });
      expect(display[2]).toMatchObject({ __isOthersIndicator: true, label: '+1' });
    });

    it('collapses and removes chips without an optionValueKey', async () => {
      const page = await createSelect('multiple="true" allow-custom-value="true" visible-item-count="1"', { options: objectOptions });
      page.root.value = ['custom', objectOptions[0]];
      await page.waitForChanges();

      const display = instanceOf(page).inputRef.value as any[];
      expect(display[0]).toEqual(objectOptions[0]);
      expect(display[1]).toMatchObject({ __isOthersIndicator: true, label: '+1' });

      const removalPage = await createSelect('multiple="true" visible-item-count="2"', { options: objectOptions });
      removalPage.root.value = [objectOptions[0], objectOptions[1], objectOptions[2]];
      await removalPage.waitForChanges();

      const removalDisplay = instanceOf(removalPage).inputRef.value as any[];
      await instanceOf(removalPage).handleInputChange([removalDisplay[1], removalDisplay[2]]);
      expect(removalPage.root.value).toEqual([objectOptions[1], objectOptions[2]]);
    });

    it('flags pointerdown on options and isolates checkbox events', async () => {
      const page = await createSelect('multiple="true" select-all="true"', { options: ['A', 'B'] });
      await openSelect(page);
      const inst = instanceOf(page);
      const selectAllRow = page.root.querySelector('.dropdown-item[data-option-index="-1"]') as HTMLElement;
      const optionRow = page.root.querySelector('.dropdown-item[data-option-index="0"]') as HTMLElement;

      optionRow.dispatchEvent(new Event('pointerdown'));
      expect(inst.isItemClickFlag).toBe(true);
      inst.isItemClickFlag = false;

      selectAllRow.dispatchEvent(new Event('pointerdown'));
      expect(inst.isItemClickFlag).toBe(true);
      inst.isItemClickFlag = false;

      optionRow.querySelector('tk-checkbox').dispatchEvent(new CustomEvent('tk-change', { detail: true }));
      selectAllRow.querySelector('tk-checkbox').dispatchEvent(new CustomEvent('tk-change', { detail: true }));
      expect(page.root.value).toBeUndefined();

      // a click on the checkbox is prevented but still bubbles to the row and toggles the option
      (optionRow.querySelector('tk-checkbox') as HTMLElement).click();
      await page.waitForChanges();
      expect(page.root.value).toEqual(['A']);

      // same for the select-all checkbox, which completes the selection
      (page.root.querySelector('.dropdown-item[data-option-index="-1"] tk-checkbox') as HTMLElement).click();
      await page.waitForChanges();
      expect(page.root.value).toEqual(['A', 'B']);
    });
  });

  describe('select all', () => {
    it('selects and deselects every enabled option through the select-all row', async () => {
      const page = await createSelect('multiple="true" select-all="true" option-value-key="value"', {
        options: objectOptions,
        optionDisabled: (item: any) => item.value === 3,
      });
      const changes = listen(page, 'tk-change');
      const selectAllEvents = listen(page, 'tk-select-all');
      await openSelect(page);

      const selectAllRow = page.root.querySelector('.dropdown-item[data-option-index="-1"]') as HTMLElement;
      expect(selectAllRow.textContent).toContain('All');

      selectAllRow.click();
      await page.waitForChanges();
      expect(page.root.value).toEqual([1, 2]);
      expect(selectAllEvents).toContain(true);

      (page.root.querySelector('.dropdown-item[data-option-index="-1"]') as HTMLElement).click();
      await page.waitForChanges();
      expect(page.root.value).toEqual([]);
      expect(selectAllEvents).toContain(false);

      expect(changes).toEqual([[1, 2], []]);
    });

    it('keeps custom values and clears the filter input when selecting all', async () => {
      const page = await createSelect('multiple="true" select-all="true" allow-custom-value="true" option-value-key="value"', { options: objectOptions });
      page.root.value = [99];
      await page.waitForChanges();

      await instanceOf(page).handleSelectAllClick();
      await page.waitForChanges();

      expect(page.root.value).toEqual([1, 2, 3, 99]);
    });

    it('does nothing in readonly mode', async () => {
      const page = await createSelect('multiple="true" select-all="true" readonly="true" option-value-key="value"', { options: objectOptions });
      await instanceOf(page).handleSelectAllClick();
      expect(page.root.value).toBeUndefined();
    });

    it('emits tk-select-all from the value watcher', async () => {
      const page = await createSelect('multiple="true" select-all="true" option-value-key="value"', { options: objectOptions });
      const selectAllEvents = listen(page, 'tk-select-all');

      page.root.value = [1, 2, 3];
      await page.waitForChanges();
      page.root.value = [1];
      await page.waitForChanges();

      expect(selectAllEvents).toEqual([true, false]);
    });

    it('tracks select-all completeness with object values', async () => {
      const page = await createSelect('multiple="true" select-all="true"', { options: objectOptions });
      const selectAllEvents = listen(page, 'tk-select-all');

      page.root.value = objectOptions.slice();
      await page.waitForChanges();

      expect(selectAllEvents).toEqual([true]);
    });

    it('collapses the selection into a single select-all chip and clears it on removal', async () => {
      const page = await createSelect('multiple="true" select-all="true" show-select-all-chip="true" select-all-label="Hepsi" option-value-key="value"', {
        options: objectOptions,
      });
      page.root.value = [1, 2, 3];
      await page.waitForChanges();

      expect(instanceOf(page).inputRef.value).toEqual([{ __isAllIndicator: true, label: 'Hepsi', removable: true }]);

      const changes = listen(page, 'tk-change');
      await instanceOf(page).handleInputChange([]);

      expect(page.root.value).toEqual([]);
      expect(changes).toEqual([[]]);
    });
  });

  describe('grouped options', () => {
    it('renders groups with sequential option indexes and resolves values across groups', async () => {
      const page = await createSelect('option-value-key="value"', { options: groupedOptions });
      await openSelect(page);

      expect(page.root.querySelectorAll('.dropdown-group')).toHaveLength(2);
      const groupLabels = Array.from(page.root.querySelectorAll('.dropdown-group-label label')).map(el => el.textContent);
      expect(groupLabels).toEqual(['Group A', 'Group B']);

      const items = dropdownItems(page);
      expect(items.map(item => item.getAttribute('data-option-index'))).toEqual(['0', '1', '2']);

      items[2].click();
      await page.waitForChanges();
      expect(page.root.value).toBe(3);
      expect(instanceOf(page).inputRef.value).toBe('Three');
    });

    it('filters grouped options and drops empty groups', async () => {
      const page = await createSelect('option-value-key="value"', { options: groupedOptions });

      await instanceOf(page).setRenderOptions('thr');
      await page.waitForChanges();

      expect(instanceOf(page).renderOptions).toEqual([{ label: 'Group B', options: [{ label: 'Three', value: 3 }] }]);
    });
  });

  describe('filtering', () => {
    it('filters options through handleInputChange and restores them on empty text', async () => {
      const page = await createSelect('', { options: ['Alpha', 'Beta', 'Betamax'] });
      await openSelect(page);

      await instanceOf(page).handleInputChange('beta');
      await page.waitForChanges();
      expect(dropdownItems(page)).toHaveLength(2);

      const changes = listen(page, 'tk-change');
      await instanceOf(page).handleInputChange('');
      await page.waitForChanges();
      expect(dropdownItems(page)).toHaveLength(3);
      expect(changes).toEqual([null]);
    });

    it('uses a custom filter function when provided', async () => {
      const page = await createSelect('', { options: ['Alpha', 'Beta'] });
      const customFilter = jest.fn(async (_text: string, options: any[]) => options.filter(option => option === 'Beta'));
      page.root.filter = customFilter;

      await instanceOf(page).handleInputChange('anything');

      expect(customFilter).toHaveBeenCalledWith('anything', ['Alpha', 'Beta']);
      expect(instanceOf(page).renderOptions).toEqual(['Beta']);
    });

    it('debounces filtering when filterDebounceDelay is set', async () => {
      const page = await createSelect('filter-debounce-delay="50"', { options: ['Alpha', 'Beta'] });
      const inst = instanceOf(page);
      jest.useFakeTimers();

      try {
        inst.handleInputChange('al');
        inst.handleInputChange('be');
        expect(inst.renderOptions).toEqual(['Alpha', 'Beta']);

        jest.advanceTimersByTime(60);
        await Promise.resolve();
        await Promise.resolve();

        expect(inst.renderOptions).toEqual(['Beta']);
      } finally {
        jest.useRealTimers();
      }
    });

    it('filters through the native input in multiple editable mode', async () => {
      const page = await createSelect('multiple="true" editable="true"', { options: ['Alpha', 'Beta'] });
      const nativeInput = page.root.querySelector('input') as HTMLInputElement;

      nativeInput.value = 'al';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      await page.waitForChanges();

      expect(instanceOf(page).renderOptions).toEqual(['Alpha']);

      // blur restores the full option list for multiple editable selects
      await instanceOf(page).handleInputBlur();
      expect(instanceOf(page).renderOptions).toEqual(['Alpha', 'Beta']);

      // selecting an item clears the filter text kept in the native input
      await openSelect(page);
      dropdownItems(page)[0].click();
      await page.waitForChanges();
      expect(page.root.value).toEqual(['Alpha']);
    });
  });

  describe('keyboard navigation', () => {
    it('opens the dropdown with Enter or arrow keys when closed', async () => {
      const page = await createSelect('', { options: ['A', 'B'] });

      await keydown(page, 'Enter');
      await page.waitForChanges();
      expect(instanceOf(page).isOpen).toBe(true);

      instanceOf(page).isOpen = false;
      await page.waitForChanges();
      await keydown(page, 'ArrowDown');
      await page.waitForChanges();
      expect(instanceOf(page).isOpen).toBe(true);
    });

    it('does not open when disabled', async () => {
      const page = await createSelect('disabled="true"', { options: ['A'] });
      await keydown(page, 'Enter');
      await page.waitForChanges();
      expect(instanceOf(page).isOpen).toBe(false);
    });

    it('moves the active item with the arrow keys and wraps around', async () => {
      const page = await createSelect('', { options: ['A', 'B', 'C'] });
      await openSelect(page);
      expect(activeIndex(page)).toBe('0');

      await keydown(page, 'ArrowDown');
      expect(activeIndex(page)).toBe('1');

      await keydown(page, 'ArrowUp');
      expect(activeIndex(page)).toBe('0');

      await keydown(page, 'ArrowUp');
      expect(activeIndex(page)).toBe('2');

      await keydown(page, 'ArrowDown');
      expect(activeIndex(page)).toBe('0');
    });

    it('skips disabled options while navigating', async () => {
      const page = await createSelect('option-value-key="value"', {
        options: objectOptions,
        optionDisabled: (item: any) => item.value === 2,
      });
      await openSelect(page);
      expect(activeIndex(page)).toBe('0');

      await keydown(page, 'ArrowDown');
      expect(activeIndex(page)).toBe('2');
    });

    it('includes the select-all row in keyboard navigation', async () => {
      const page = await createSelect('multiple="true" select-all="true"', { options: ['A', 'B'] });
      await openSelect(page);
      expect(activeIndex(page)).toBe('0');

      await keydown(page, 'ArrowUp');
      expect(activeIndex(page)).toBe('-1');

      await keydown(page, 'ArrowUp');
      expect(activeIndex(page)).toBe('1');
    });

    it('selects the active item with Enter and closes with Escape or Tab', async () => {
      const page = await createSelect('', { options: ['A', 'B'] });
      const changes = listen(page, 'tk-change');
      await openSelect(page);

      await keydown(page, 'ArrowDown');
      await keydown(page, 'Enter');
      await page.waitForChanges();

      expect(page.root.value).toBe('B');
      expect(changes).toContain('B');
      expect(instanceOf(page).isOpen).toBe(false);

      await openSelect(page);
      await keydown(page, 'Escape');
      await page.waitForChanges();
      expect(instanceOf(page).isOpen).toBe(false);

      await openSelect(page);
      await keydown(page, 'Tab');
      await page.waitForChanges();
      expect(instanceOf(page).isOpen).toBe(false);
    });

    it('re-emits the typed value before selecting on Enter in custom multiple mode', async () => {
      // mock-doc does not define InputEvent, which the Enter handler dispatches
      (global as any).InputEvent = (global as any).InputEvent || CustomEvent;
      const page = await createSelect('multiple="true" allow-custom-value="true"', { options: ['Alpha'] });
      await openSelect(page);

      await keydown(page, 'ArrowDown');
      await keydown(page, 'Enter');
      await page.waitForChanges();

      expect(page.root.value).toEqual(['Alpha']);
    });
  });

  describe('input interactions', () => {
    const pathEvent = (path: any[]) => ({ composedPath: () => path });
    const chevron = { tagName: 'TK-ICON', icon: 'keyboard_arrow_down', classList: { contains: () => false } };
    const inputArea = { classList: { contains: (cls: string) => cls === 'tk-input' } };

    it('wires the inner input events to its handlers', async () => {
      const page = await createSelect('', { options: ['Alpha', 'Beta'] });
      const input = page.root.querySelector('tk-input');

      input.dispatchEvent(new CustomEvent('tk-change', { detail: 'beta' }));
      await page.waitForChanges();
      expect(instanceOf(page).renderOptions).toEqual(['Beta']);

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();
      expect(instanceOf(page).isOpen).toBe(true);

      // a real click inside the input control keeps the dropdown open
      (page.root.querySelector('.tk-input') as HTMLElement).click();
      await page.waitForChanges();
      expect(instanceOf(page).isOpen).toBe(true);

      input.dispatchEvent(new CustomEvent('tk-blur'));
      await page.waitForChanges();

      page.root.value = 'Alpha';
      await page.waitForChanges();
      const changes = listen(page, 'tk-change');
      input.dispatchEvent(new CustomEvent('tk-clear-click'));
      expect(page.root.value).toBe(null);
      expect(changes).toEqual([null]);
    });

    it('toggles the dropdown from the chevron and opens it from the input area', async () => {
      const page = await createSelect('', { options: ['A'] });
      const inst = instanceOf(page);

      inst.handleInputClick(pathEvent([chevron]));
      await page.waitForChanges();
      expect(inst.isOpen).toBe(true);

      inst.handleInputClick(pathEvent([chevron]));
      await page.waitForChanges();
      expect(inst.isOpen).toBe(false);

      inst.handleInputClick(pathEvent([inputArea]));
      await page.waitForChanges();
      expect(inst.isOpen).toBe(true);

      // clicking the input area again keeps it open
      inst.handleInputClick(pathEvent([inputArea]));
      await page.waitForChanges();
      expect(inst.isOpen).toBe(true);
    });

    it('ignores clicks on the clear buttons and any click while disabled', async () => {
      const page = await createSelect('', { options: ['A'] });
      const inst = instanceOf(page);

      inst.handleInputClick(pathEvent([{ classList: { contains: (cls: string) => cls === 'tk-input-clear-button' } }]));
      expect(inst.isOpen).toBe(false);

      inst.handleInputClick(pathEvent([{ classList: { contains: (cls: string) => cls === 'tk-chips-clear-button' } }]));
      expect(inst.isOpen).toBe(false);

      page.root.disabled = true;
      await page.waitForChanges();
      inst.handleInputClick(pathEvent([inputArea]));
      expect(inst.isOpen).toBe(false);
    });

    it('clears an editable input on blur when the text matches no option', async () => {
      const page = await createSelect('editable="true"', { options: ['Alpha', 'Beta'] });
      const changes = listen(page, 'tk-change');
      const nativeInput = page.root.querySelector('input') as HTMLInputElement;

      nativeInput.value = 'garbage';
      await instanceOf(page).handleInputBlur();

      expect(page.root.value).toBe(null);
      expect(instanceOf(page).inputRef.value).toBe(null);
      expect(changes).toEqual([null]);
    });

    it('keeps the value on blur when the text matches the selection', async () => {
      const page = await createSelect('editable="true"', { options: ['Alpha', 'Beta'] });
      page.root.value = 'Alpha';
      await page.waitForChanges();
      const nativeInput = page.root.querySelector('input') as HTMLInputElement;

      nativeInput.value = 'Alpha';
      await instanceOf(page).handleInputBlur();
      expect(page.root.value).toBe('Alpha');

      // empty input is left untouched as well
      nativeInput.value = '';
      await instanceOf(page).handleInputBlur();
      expect(page.root.value).toBe('Alpha');
    });

    it('skips blur handling for item clicks and non-editable selects', async () => {
      const page = await createSelect('editable="true"', { options: ['Alpha'] });
      const inst = instanceOf(page);

      inst.isItemClickFlag = true;
      await inst.handleInputBlur();
      expect(inst.isItemClickFlag).toBe(false);

      const plainPage = await createSelect('', { options: ['Alpha'] });
      await instanceOf(plainPage).handleInputBlur();
      expect(plainPage.root.value).toBeUndefined();
    });

    it('clears the value from the clear button but keeps disabled selections', async () => {
      const page = await createSelect('', { options: ['A'] });
      page.root.value = 'A';
      await page.waitForChanges();
      const changes = listen(page, 'tk-change');

      instanceOf(page).handleInputClearClick();
      expect(page.root.value).toBe(null);
      expect(changes).toEqual([null]);

      const multiplePage = await createSelect('multiple="true" option-value-key="value"', {
        options: objectOptions,
        optionDisabled: (item: any) => item.value === 3,
      });
      multiplePage.root.value = [1, 3];
      await multiplePage.waitForChanges();

      instanceOf(multiplePage).handleInputClearClick();
      expect(multiplePage.root.value).toEqual([3]);
    });
  });

  describe('custom values', () => {
    it('turns on editing and accepts typed values with allowCustomValue', async () => {
      const page = await createSelect('allow-custom-value="true"', { options: ['Alpha'] });
      expect(page.root.editable).toBe(true);

      const changes = listen(page, 'tk-change');
      await instanceOf(page).handleInputChange('Custom entry');

      expect(page.root.value).toBe('Custom entry');
      expect(changes).toContain('Custom entry');

      page.root.value = 'Another';
      await page.waitForChanges();
      expect(instanceOf(page).inputRef.value).toBe('Another');

      page.root.value = null;
      await page.waitForChanges();
      expect(instanceOf(page).inputRef.value).toBe(null);
    });
  });

  describe('value handling and form integration', () => {
    it('updates renderOptions when options change and ignores equal arrays', async () => {
      const page = await createSelect('', { options: ['A'] });
      const inst = instanceOf(page);

      page.root.options = ['A', 'B'];
      await page.waitForChanges();
      expect(inst.renderOptions).toEqual(['A', 'B']);

      const previousRenderOptions = inst.renderOptions;
      page.root.options = ['A', 'B'].slice();
      await page.waitForChanges();
      expect(inst.renderOptions).toBe(previousRenderOptions);
    });

    it('resolves the selected label once the options arrive after the value', async () => {
      const page = await createSelect('option-value-key="value"');
      page.root.value = 2;
      await page.waitForChanges();
      expect(instanceOf(page).inputRef.value).toBe(null);

      page.root.options = objectOptions;
      await page.waitForChanges();
      expect(instanceOf(page).inputRef.value).toBe('Two');
    });

    it('applies an initial value set through the attribute on load', async () => {
      const page = await newSpecPage({
        components: [TkSelect, TkInput],
        html: `<tk-select value="A"></tk-select>`,
      });
      page.root.options = ['A', 'B'];
      await page.waitForChanges();

      expect(instanceOf(page).inputRef.value).toBe('A');
    });

    it('clears the input for unknown values when no filter function is available', async () => {
      const page = await createSelect('', { options: ['A'] });
      page.root.filter = null;
      page.root.value = 'missing';
      await page.waitForChanges();

      expect(instanceOf(page).inputRef.value).toBe(null);
    });

    it('resets the value on form reset but keeps disabled selections', async () => {
      const page = await createSelect('', { options: ['A'] });
      page.root.value = 'A';
      await page.waitForChanges();
      const changes = listen(page, 'tk-change');

      instanceOf(page).formResetCallback();
      expect(page.root.value).toBe(null);
      expect(changes).toEqual([null]);

      const multiplePage = await createSelect('multiple="true" option-value-key="value"', {
        options: objectOptions,
        optionDisabled: (item: any) => item.value === 2,
      });
      multiplePage.root.value = [1, 2];
      await multiplePage.waitForChanges();

      instanceOf(multiplePage).formResetCallback();
      expect(multiplePage.root.value).toEqual([2]);
    });

    it('exposes option helpers that tolerate null and mixed inputs', async () => {
      const page = await createSelect('', { options: objectOptions, optionValueKey: 'value' });
      const inst = instanceOf(page);

      expect(inst.getOptionLabel(null)).toBe('');
      expect(inst.getOptionLabel({ label: null, value: 1 })).toBe('');
      expect(inst.getOptionLabel('plain')).toBe('plain');
      expect(inst.getOptionValue('plain')).toBe('plain');

      page.root.value = 2;
      await page.waitForChanges();
      expect(inst.getSelectedItem()).toEqual({ label: 'Two', value: 2 });

      // mixed primitive/object options cannot be resolved
      const mixedPage = await createSelect('', { options: ['a', { label: 'b' }] });
      mixedPage.root.value = 'a';
      await mixedPage.waitForChanges();
      expect(instanceOf(mixedPage).getSelectedItem()).toBe(null);
    });
  });
});
