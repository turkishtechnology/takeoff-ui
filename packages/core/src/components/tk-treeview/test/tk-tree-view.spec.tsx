import { newSpecPage } from '@stencil/core/testing';
import { TkTreeView } from '../tk-tree-view';

const treeItems = [
  {
    key: 'a',
    label: 'A',
    children: [
      { key: 'a1', label: 'A1' },
      { key: 'a2', label: 'A2' },
    ],
  },
  { key: 'b', label: 'B' },
];

describe('tk-tree-view', () => {
  it('renders a badge for branch child counts', async () => {
    const page = await newSpecPage({
      components: [TkTreeView],
      html: `<tk-tree-view></tk-tree-view>`,
    });

    page.root.items = [{ key: 'root', label: 'Root', children: [{ key: 'child', label: 'Child' }] }];
    await page.waitForChanges();

    expect(page.root.querySelector('tk-badge')).toBeTruthy();
  });

  describe('selectAll', () => {
    it('renders select-all row only when selectAll and selectable are true', async () => {
      const page = await newSpecPage({
        components: [TkTreeView],
        html: `<tk-tree-view selectable select-all></tk-tree-view>`,
      });
      page.root.items = treeItems;
      await page.waitForChanges();

      expect(page.root.querySelector('.select-all')).toBeTruthy();
    });

    it('does not render select-all row when selectable is false', async () => {
      const page = await newSpecPage({
        components: [TkTreeView],
        html: `<tk-tree-view select-all></tk-tree-view>`,
      });
      page.root.items = treeItems;
      await page.waitForChanges();

      expect(page.root.querySelector('.select-all')).toBeNull();
    });

    it('selects all keys with default all strategy when select-all row is clicked', async () => {
      const page = await newSpecPage({
        components: [TkTreeView],
        html: `<tk-tree-view selectable select-all></tk-tree-view>`,
      });
      page.root.items = treeItems;
      await page.waitForChanges();

      const emittedValues: string[][] = [];
      page.root.addEventListener('tk-change', (e: Event) => {
        emittedValues.push((e as CustomEvent<string[]>).detail);
      });

      const selectAllRow = page.root.querySelector('.select-all') as HTMLElement;
      selectAllRow.click();
      await page.waitForChanges();

      expect(page.root.value).toEqual(['a', 'a1', 'a2', 'b']);
      expect(emittedValues[0]).toEqual(['a', 'a1', 'a2', 'b']);
    });

    it('selects only leaf keys with leaf strategy when select-all row is clicked', async () => {
      const page = await newSpecPage({
        components: [TkTreeView],
        html: `<tk-tree-view selectable select-all selection-strategy="leaf"></tk-tree-view>`,
      });
      page.root.items = treeItems;
      await page.waitForChanges();

      const selectAllRow = page.root.querySelector('.select-all') as HTMLElement;
      selectAllRow.click();
      await page.waitForChanges();

      expect(page.root.value).toEqual(['a1', 'a2', 'b']);
    });

    it('deselects all keys when select-all row is clicked twice', async () => {
      const page = await newSpecPage({
        components: [TkTreeView],
        html: `<tk-tree-view selectable select-all></tk-tree-view>`,
      });
      page.root.items = treeItems;
      await page.waitForChanges();

      const emittedValues: string[][] = [];
      page.root.addEventListener('tk-change', (e: Event) => {
        emittedValues.push((e as CustomEvent<string[]>).detail);
      });

      const selectAllRow = page.root.querySelector('.select-all') as HTMLElement;
      selectAllRow.click();
      await page.waitForChanges();
      selectAllRow.click();
      await page.waitForChanges();

      expect(page.root.value).toEqual([]);
      expect(emittedValues[1]).toEqual([]);
    });

    it('renders select-all badge when items are selected and showBadge is true', async () => {
      const page = await newSpecPage({
        components: [TkTreeView],
        html: `<tk-tree-view selectable select-all></tk-tree-view>`,
      });
      page.root.items = treeItems;
      await page.waitForChanges();

      const selectAllRow = page.root.querySelector('.select-all') as HTMLElement;
      selectAllRow.click();
      await page.waitForChanges();

      expect(page.root.querySelector('.select-all tk-badge')).toBeTruthy();
    });

    it('renders select-all zero badge when showZeroCountBadges is true', async () => {
      const page = await newSpecPage({
        components: [TkTreeView],
        html: `<tk-tree-view selectable select-all></tk-tree-view>`,
      });
      page.root.items = treeItems;
      await page.waitForChanges();

      expect(page.root.querySelector('.select-all tk-badge')).toBeTruthy();
    });

    it('does not render select-all zero badge when showZeroCountBadges is false', async () => {
      const page = await newSpecPage({
        components: [TkTreeView],
        html: `<tk-tree-view selectable select-all></tk-tree-view>`,
      });
      page.root.items = treeItems;
      page.root.showZeroCountBadges = false;
      await page.waitForChanges();

      expect(page.root.querySelector('.select-all tk-badge')).toBeNull();
    });

    it('does not render select-all badge when showBadge is false', async () => {
      const page = await newSpecPage({
        components: [TkTreeView],
        html: `<tk-tree-view selectable select-all></tk-tree-view>`,
      });
      page.root.items = treeItems;
      page.root.showBadge = false;
      await page.waitForChanges();

      const selectAllRow = page.root.querySelector('.select-all') as HTMLElement;
      selectAllRow.click();
      await page.waitForChanges();

      expect(page.root.querySelector('.select-all tk-badge')).toBeNull();
    });
  });
});
