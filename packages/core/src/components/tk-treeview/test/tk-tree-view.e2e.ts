import { newE2EPage } from '@stencil/core/testing';

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
  it('expands a branch when it is clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-tree-view></tk-tree-view>');
    await page.$eval('tk-tree-view', el => {
      (el as HTMLTkTreeViewElement).items = [{ key: 'root', label: 'Root', children: [{ key: 'child', label: 'Child' }] }];
    });
    await page.waitForChanges();

    const rootLabel = await page.find('tk-tree-view .tk-tree-view.label');

    await rootLabel.click();
    await page.waitForChanges();

    const textNodes = await page.findAll('tk-tree-view .tk-tree-view.text');

    expect(textNodes[1].textContent).toBe('Child');
  });

  describe('selectAll', () => {
    it('heads the first stepper column and selects everything from there', async () => {
      const page = await newE2EPage();
      await page.setContent('<tk-tree-view mode="stepper" selectable select-all></tk-tree-view>');
      await page.$eval(
        'tk-tree-view',
        (el: HTMLTkTreeViewElement, items) => {
          el.items = items as any;
        },
        treeItems,
      );
      await page.waitForChanges();

      const layout = await page.$eval('tk-tree-view', (el: HTMLElement) => {
        const column = el.querySelector('.column');
        const row = el.querySelector('.select-all');
        const columnBox = column.getBoundingClientRect();
        const rows = Array.from(column.querySelectorAll('.select-all, .tk-tree-view.label')).map(r => r.getBoundingClientRect());
        return {
          firstChild: column.firstElementChild === row,
          nestedRoots: column.querySelectorAll('.select-all-group > .node').length,
          fitsColumn: rows.every(r => r.left >= columnBox.left && r.right <= columnBox.right),
        };
      });
      expect(layout).toEqual({ firstChild: true, nestedRoots: treeItems.length, fitsColumn: true });

      const changeSpy = await page.spyOnEvent('tk-change');
      await (await page.find('tk-tree-view .select-all')).click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(await page.$eval('tk-tree-view', (el: HTMLTkTreeViewElement) => el.value)).toEqual(['a', 'a1', 'a2', 'b']);

      await (await page.find('tk-tree-view .select-all')).click();
      await page.waitForChanges();

      expect(await page.$eval('tk-tree-view', (el: HTMLTkTreeViewElement) => el.value)).toEqual([]);
    });

    it('selects all keys with default all strategy when select-all row is clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<tk-tree-view selectable select-all></tk-tree-view>');
      await page.$eval(
        'tk-tree-view',
        (el: HTMLTkTreeViewElement, items) => {
          el.items = items as any;
        },
        treeItems,
      );
      await page.waitForChanges();

      const changeSpy = await page.spyOnEvent('tk-change');
      const selectAllRow = await page.find('tk-tree-view .select-all');
      await selectAllRow.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEvent();
      const value = await page.$eval('tk-tree-view', (el: HTMLTkTreeViewElement) => el.value);
      expect(value).toContain('a');
      expect(value).toContain('a1');
      expect(value).toContain('a2');
      expect(value).toContain('b');
    });

    it('selects only leaf keys with leaf strategy when select-all row is clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<tk-tree-view selectable select-all selection-strategy="leaf"></tk-tree-view>');
      await page.$eval(
        'tk-tree-view',
        (el: HTMLTkTreeViewElement, items) => {
          el.items = items as any;
        },
        treeItems,
      );
      await page.waitForChanges();

      const selectAllRow = await page.find('tk-tree-view .select-all');
      await selectAllRow.click();
      await page.waitForChanges();

      const value = await page.$eval('tk-tree-view', (el: HTMLTkTreeViewElement) => el.value);
      expect(value).not.toContain('a');
      expect(value).toContain('a1');
      expect(value).toContain('a2');
      expect(value).toContain('b');
    });

    it('deselects all items when select-all row is clicked twice', async () => {
      const page = await newE2EPage();
      await page.setContent('<tk-tree-view selectable select-all></tk-tree-view>');
      await page.$eval(
        'tk-tree-view',
        (el: HTMLTkTreeViewElement, items) => {
          el.items = items as any;
        },
        treeItems,
      );
      await page.waitForChanges();

      const changeSpy = await page.spyOnEvent('tk-change');
      const selectAllRow = await page.find('tk-tree-view .select-all');
      await selectAllRow.click();
      await page.waitForChanges();
      await selectAllRow.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventDetail([]);
      const value = await page.$eval('tk-tree-view', (el: HTMLTkTreeViewElement) => el.value);
      expect(value).toEqual([]);
    });

    it('applies size class to select-all row', async () => {
      const page = await newE2EPage();
      await page.setContent('<tk-tree-view selectable select-all size="small"></tk-tree-view>');
      await page.$eval(
        'tk-tree-view',
        (el: HTMLTkTreeViewElement, items) => {
          el.items = items as any;
        },
        treeItems,
      );
      await page.waitForChanges();

      const selectAllRow = await page.find('tk-tree-view .select-all');
      expect(selectAllRow).toHaveClass('small');
    });
  });
});
