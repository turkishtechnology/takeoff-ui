jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
  isNil: (value: unknown) => value === null || value === undefined,
}));

// uuid v14 ships pure ESM which Jest can't transform from node_modules; stub it for the suite.
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkInput } from '../tk-input';
import { TkChips } from '../../tk-chips/tk-chips';

const renderChips = async (attrs = '', value: unknown[] = ['Alpha', 'Beta', 'Gamma'], props: Record<string, unknown> = {}): Promise<SpecPage> => {
  const page = await newSpecPage({
    components: [TkInput, TkChips],
    html: `<tk-input mode="chips" ${attrs}></tk-input>`,
  });
  Object.assign(page.root, props);
  page.root.value = value;
  await page.waitForChanges();
  return page;
};

const nativeInputOf = (page: SpecPage) => page.root.querySelector('input') as HTMLInputElement;
const chipsOf = (page: SpecPage) => Array.from(page.root.querySelectorAll('tk-chips')) as HTMLTkChipsElement[];

const listenChange = (page: SpecPage) => {
  const spy = jest.fn();
  page.root.addEventListener('tk-change', (e: Event) => spy((e as CustomEvent).detail));
  return spy;
};

const pressKey = async (page: SpecPage, key: string) => {
  nativeInputOf(page).dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  await page.waitForChanges();
};

describe('tk-input chips mode', () => {
  it('renders one chip per value with the default look and the chips class on the container', async () => {
    const page = await renderChips();
    const chips = chipsOf(page);

    expect(page.root.querySelector('.tk-input-container').classList.contains('chips')).toBe(true);
    expect(chips.map(chip => chip.label)).toEqual(['Alpha', 'Beta', 'Gamma']);
    expect(chips.map(chip => chip.variant)).toEqual(['neutral', 'neutral', 'neutral']);
    expect(chips.map(chip => chip.type)).toEqual(['outlined', 'outlined', 'outlined']);
    expect(chips.map(chip => chip.size)).toEqual(['small', 'small', 'small']);
    expect(chips.every(chip => chip.removable)).toBe(true);
  });

  it('applies chipOptions to every chip', async () => {
    const page = await renderChips('', ['Alpha'], { chipOptions: { variant: 'primary', type: 'filled', size: 'base' } });
    const [chip] = chipsOf(page);

    expect(chip.variant).toBe('primary');
    expect(chip.type).toBe('filled');
    expect(chip.size).toBe('base');
  });

  it('labels object chips through chipLabelKey and indicator chips through their own label', async () => {
    const page = await renderChips('chip-label-key="name"', [{ name: 'Ada' }, { label: '+2 others', __isOthersIndicator: true }]);

    expect(chipsOf(page).map(chip => chip.label)).toEqual(['Ada', '+2 others']);
  });

  it('renders no chips for an empty list and keeps the native input empty', async () => {
    const page = await renderChips('', []);

    expect(chipsOf(page)).toHaveLength(0);
    expect(nativeInputOf(page).value).toBe('');
  });

  it('marks chips as non-removable when chipDisabled says so or the input is disabled', async () => {
    const page = await renderChips('', ['Alpha', 'Beta'], { chipDisabled: (item: string) => item === 'Beta' });
    expect(chipsOf(page).map(chip => chip.removable)).toEqual([true, false]);

    const disabled = await renderChips('disabled="true"');
    expect(chipsOf(disabled).every(chip => chip.removable)).toBe(false);
    expect(chipsOf(disabled).every(chip => chip.disabled)).toBe(true);
  });

  it('adds the typed text as a chip on Enter and clears the text field', async () => {
    const page = await renderChips('', ['Alpha']);
    const change = listenChange(page);
    const input = nativeInputOf(page);

    input.value = 'Beta';
    await pressKey(page, 'Enter');

    expect(page.root.value).toEqual(['Alpha', 'Beta']);
    expect(change).toHaveBeenLastCalledWith(['Alpha', 'Beta']);
    expect(input.value).toBe('');
    expect(chipsOf(page).map(chip => chip.label)).toEqual(['Alpha', 'Beta']);
  });

  it('ignores Enter on blank text', async () => {
    const page = await renderChips('', ['Alpha']);
    const change = listenChange(page);

    nativeInputOf(page).value = '   ';
    await pressKey(page, 'Enter');

    expect(page.root.value).toEqual(['Alpha']);
    expect(change).not.toHaveBeenCalled();
  });

  it('leaves Enter to a tk-select that does not allow custom values', async () => {
    const page = await renderChips('class="tk-select-input"', ['Alpha']);
    nativeInputOf(page).value = 'Beta';
    await pressKey(page, 'Enter');
    expect(page.root.value).toEqual(['Alpha']);

    const custom = await renderChips('class="tk-select-input allow-custom-value-select"', ['Alpha']);
    nativeInputOf(custom).value = 'Beta';
    await pressKey(custom, 'Enter');
    expect(custom.root.value).toEqual(['Alpha', 'Beta']);
  });

  it('does not emit tk-change while text is being typed', async () => {
    const page = await renderChips();
    const change = listenChange(page);
    const input = nativeInputOf(page);

    input.value = 'Del';
    input.dispatchEvent(new Event('input'));

    expect(change).not.toHaveBeenCalled();
    expect(page.root.value).toEqual(['Alpha', 'Beta', 'Gamma']);
  });

  it('removes a chip when its remove button fires tk-remove', async () => {
    const page = await renderChips();
    const change = listenChange(page);

    chipsOf(page)[1].dispatchEvent(new CustomEvent('tk-remove', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root.value).toEqual(['Alpha', 'Gamma']);
    expect(change).toHaveBeenLastCalledWith(['Alpha', 'Gamma']);
    expect(chipsOf(page).map(chip => chip.label)).toEqual(['Alpha', 'Gamma']);
  });

  it('keeps every chip on a readonly or disabled input', async () => {
    for (const attrs of ['readonly="true"', 'disabled="true"']) {
      const page = await renderChips(attrs);
      const change = listenChange(page);

      chipsOf(page)[0].dispatchEvent(new CustomEvent('tk-remove', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root.value).toEqual(['Alpha', 'Beta', 'Gamma']);
      expect(change).not.toHaveBeenCalled();
    }
  });

  it('keeps the disabled chips and drops the rest on a form reset', async () => {
    const page = await renderChips('', ['Alpha', 'Beta'], { chipDisabled: (item: string) => item === 'Beta' });
    const change = listenChange(page);

    page.rootInstance.formResetCallback();
    await page.waitForChanges();

    expect(page.root.value).toEqual(['Beta']);
    expect(change).toHaveBeenLastCalledWith(['Beta']);
  });

  it('clears every chip on a form reset without a chipDisabled rule', async () => {
    const page = await renderChips();

    page.rootInstance.formResetCallback();
    await page.waitForChanges();

    expect(page.root.value).toBeNull();
    expect(chipsOf(page)).toHaveLength(0);
  });

  it('hands the keyboard back to the text field on a mouse down inside the control', async () => {
    const page = await renderChips();

    await pressKey(page, 'ArrowLeft');
    expect(page.rootInstance.focusedChipIndex).toBe(2);

    page.root.querySelector('.tk-input').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.focusedChipIndex).toBeNull();
    expect(page.root.querySelector('.tk-input-container').classList.contains('chips-focus-active')).toBe(false);
  });

  it('restarts the walk from the edge when the focused chip stops being removable', async () => {
    const page = await renderChips();

    await pressKey(page, 'ArrowLeft');
    expect(page.rootInstance.focusedChipIndex).toBe(2);

    page.root.chipDisabled = (item: string) => item === 'Gamma';
    await page.waitForChanges();

    await pressKey(page, 'ArrowLeft');
    expect(page.rootInstance.focusedChipIndex).toBe(1);

    await pressKey(page, 'ArrowRight');
    await pressKey(page, 'ArrowRight');
    expect(page.rootInstance.focusedChipIndex).toBeNull();

    await pressKey(page, 'ArrowLeft');
    page.root.chipDisabled = (item: string) => item === 'Beta';
    await page.waitForChanges();
    await pressKey(page, 'ArrowRight');
    expect(page.rootInstance.focusedChipIndex).toBeNull();
  });

  it('drops the ring instead of removing anything when the focused chip stops being removable', async () => {
    const page = await renderChips();

    await pressKey(page, 'ArrowLeft');
    page.root.chipDisabled = (item: string) => item === 'Gamma';
    await page.waitForChanges();

    await pressKey(page, 'Backspace');

    expect(page.root.value).toEqual(['Alpha', 'Beta', 'Gamma']);
    expect(page.rootInstance.focusedChipIndex).toBeNull();
  });
});
