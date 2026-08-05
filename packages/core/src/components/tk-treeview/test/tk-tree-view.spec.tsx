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

const setupTree = async (html: string) => {
  const page = await newSpecPage({ components: [TkTreeView], html });
  page.root.items = treeItems;
  await page.waitForChanges();
  return page;
};

const branchNode = (page: Awaited<ReturnType<typeof setupTree>>) => page.root.querySelector('.node.directory');
const branchLabel = (page: Awaited<ReturnType<typeof setupTree>>) => page.root.querySelector('.node.directory > .tk-tree-view.label') as HTMLElement;
// the arrow icon is the first tk-icon of a branch label, the fixture sets no branchIcon
const branchToggleIcon = (page: Awaited<ReturnType<typeof setupTree>>) => page.root.querySelector('.node.directory > .tk-tree-view.label > tk-icon') as HTMLElement;

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

  describe('toggleTrigger', () => {
    it('collapses the branch when the item is clicked with the default trigger', async () => {
      const page = await setupTree(`<tk-tree-view expand-all></tk-tree-view>`);

      expect(branchNode(page).classList.contains('expanded')).toBe(true);

      branchLabel(page).click();
      await page.waitForChanges();

      expect(branchNode(page).classList.contains('expanded')).toBe(false);
    });

    it('expands the branch when the item is clicked with the default trigger', async () => {
      const page = await setupTree(`<tk-tree-view></tk-tree-view>`);

      branchLabel(page).click();
      await page.waitForChanges();

      expect(branchNode(page).classList.contains('expanded')).toBe(true);
    });

    it('does not collapse the branch when the item is clicked and the trigger is icon', async () => {
      const page = await setupTree(`<tk-tree-view expand-all toggle-trigger="icon"></tk-tree-view>`);

      branchLabel(page).click();
      await page.waitForChanges();

      expect(branchNode(page).classList.contains('expanded')).toBe(true);
    });

    it('does not expand the branch when the item is clicked and the trigger is icon', async () => {
      const page = await setupTree(`<tk-tree-view toggle-trigger="icon"></tk-tree-view>`);

      branchLabel(page).click();
      await page.waitForChanges();

      expect(branchNode(page).classList.contains('expanded')).toBe(false);
    });

    it('highlights the branch and emits tk-item-click when the item is clicked and the trigger is icon', async () => {
      const page = await setupTree(`<tk-tree-view expand-all toggle-trigger="icon"></tk-tree-view>`);

      const clicked: string[] = [];
      page.root.addEventListener('tk-item-click', (e: Event) => clicked.push((e as CustomEvent).detail.key));

      // highlight the child leaf first, then click its parent branch
      (page.root.querySelector('.node.directory .node.file > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();

      branchLabel(page).click();
      await page.waitForChanges();

      expect(clicked).toEqual(['a1', 'a']);
      expect(branchNode(page).classList.contains('selected')).toBe(true);
    });

    it('collapses the branch when the arrow icon is clicked and the trigger is icon', async () => {
      const page = await setupTree(`<tk-tree-view expand-all toggle-trigger="icon"></tk-tree-view>`);

      branchToggleIcon(page).click();
      await page.waitForChanges();

      expect(branchNode(page).classList.contains('expanded')).toBe(false);
    });

    it('expands the branch when the arrow icon is clicked and the trigger is icon', async () => {
      const page = await setupTree(`<tk-tree-view toggle-trigger="icon"></tk-tree-view>`);

      branchToggleIcon(page).click();
      await page.waitForChanges();

      expect(branchNode(page).classList.contains('expanded')).toBe(true);
    });

    // The highlight follows the last clicked item, so collapsing A takes it away from B1 even
    // though B1 lives in a different subtree and stays visible.
    it('moves the highlight to the collapsed branch even when the highlight is outside its subtree', async () => {
      const page = await newSpecPage({ components: [TkTreeView], html: `<tk-tree-view expand-all></tk-tree-view>` });
      page.root.items = [
        { key: 'a', label: 'A', children: [{ key: 'a1', label: 'A1' }] },
        { key: 'b', label: 'B', children: [{ key: 'b1', label: 'B1' }] },
      ];
      await page.waitForChanges();

      const branches = page.root.querySelectorAll('.node.directory');
      (branches[1].querySelector('.node.file > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();

      const emitted: string[] = [];
      page.root.addEventListener('tk-item-click', (e: Event) => emitted.push((e as CustomEvent).detail.key));

      (page.root.querySelector('.node.directory > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();

      const nodes = page.root.querySelectorAll('.node.directory');
      expect(nodes[0].classList.contains('selected')).toBe(true);
      expect(nodes[1].querySelector('.node.file').classList.contains('selected')).toBe(false);
      expect(emitted).toEqual(['a']);
    });

    // The reported issue: highlighting a child leaf and then clicking its parent collapsed the tree
    // and left nothing highlighted. With the icon trigger the parent takes the highlight instead.
    it('moves the highlight to the parent without collapsing when a child leaf was highlighted', async () => {
      const page = await setupTree(`<tk-tree-view expand-all toggle-trigger="icon"></tk-tree-view>`);

      const childLeaf = page.root.querySelector('.node.directory .node.file') as HTMLElement;
      (childLeaf.querySelector('.tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();
      expect(childLeaf.classList.contains('selected')).toBe(true);

      branchLabel(page).click();
      await page.waitForChanges();

      expect(branchNode(page).classList.contains('expanded')).toBe(true);
      expect(branchNode(page).classList.contains('selected')).toBe(true);
      expect((page.root.querySelector('.node.directory .node.file') as HTMLElement).classList.contains('selected')).toBe(false);
    });

    // Expanding a branch highlights it, so collapsing has to keep that highlight. Otherwise one
    // control would highlight the branch on one click and clear it on the next, and the clearing
    // half would be silent because no event is emitted for it.
    it.each([
      ['icon', 'toggle-trigger="icon"'],
      ['item', ''],
    ])('keeps the branch highlighted across repeated toggles with the %s trigger', async (trigger: string, attr: string) => {
      const page = await setupTree(`<tk-tree-view ${attr}></tk-tree-view>`);
      const toggle = () => (trigger === 'icon' ? branchToggleIcon(page) : branchLabel(page));

      const emitted: string[] = [];
      page.root.addEventListener('tk-item-click', (e: Event) => emitted.push((e as CustomEvent).detail.key));

      const states: string[] = [];
      for (let i = 0; i < 3; i++) {
        toggle().click();
        await page.waitForChanges();
        states.push(`${branchNode(page).classList.contains('expanded')}/${branchNode(page).classList.contains('selected')}`);
      }

      expect(states).toEqual(['true/true', 'false/true', 'true/true']);
      expect(emitted).toEqual(['a', 'a', 'a']);
    });

    it('moves the highlight to the collapsed branch when the collapse hides the highlighted item', async () => {
      const page = await setupTree(`<tk-tree-view expand-all></tk-tree-view>`);

      (page.root.querySelector('.node.directory .node.file > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();

      branchLabel(page).click();
      await page.waitForChanges();

      expect(branchNode(page).classList.contains('expanded')).toBe(false);
      expect(branchNode(page).classList.contains('selected')).toBe(true);
    });

    it('keeps the arrow icon neutral while the branch is expanded but not highlighted', async () => {
      const page = await setupTree(`<tk-tree-view expand-all></tk-tree-view>`);

      expect(branchNode(page).classList.contains('expanded')).toBe(true);
      expect(branchNode(page).classList.contains('selected')).toBe(false);
      expect(branchToggleIcon(page).getAttribute('variant')).toBe('neutral');
    });

    it('renders the arrow icon with the primary variant once the branch is highlighted', async () => {
      const page = await setupTree(`<tk-tree-view></tk-tree-view>`);
      expect(branchToggleIcon(page).getAttribute('variant')).toBe('neutral');

      branchLabel(page).click();
      await page.waitForChanges();

      expect(branchNode(page).classList.contains('selected')).toBe(true);
      expect(branchToggleIcon(page).getAttribute('variant')).toBe('primary');
    });

    it('handles an arrow icon click exactly once with the default trigger', async () => {
      const page = await setupTree(`<tk-tree-view></tk-tree-view>`);

      const clicked: string[] = [];
      page.root.addEventListener('tk-item-click', (e: Event) => clicked.push((e as CustomEvent).detail.key));

      // no handler on the icon, the click has to reach the label exactly once
      branchToggleIcon(page).click();
      await page.waitForChanges();

      expect(clicked).toEqual(['a']);
      expect(branchNode(page).classList.contains('expanded')).toBe(true);
    });

    it('handles an arrow icon click exactly once when the trigger is icon', async () => {
      const page = await setupTree(`<tk-tree-view toggle-trigger="icon"></tk-tree-view>`);

      const clicked: string[] = [];
      page.root.addEventListener('tk-item-click', (e: Event) => clicked.push((e as CustomEvent).detail.key));

      // the icon handler stops propagation, the label handler must not run as well
      branchToggleIcon(page).click();
      await page.waitForChanges();

      expect(clicked).toEqual(['a']);
      expect(branchNode(page).classList.contains('expanded')).toBe(true);
    });

    it('ignores an arrow icon click on a disabled item', async () => {
      const page = await newSpecPage({ components: [TkTreeView], html: `<tk-tree-view toggle-trigger="icon"></tk-tree-view>` });
      page.root.items = [{ key: 'a', label: 'A', disabled: true, children: [{ key: 'a1', label: 'A1' }] }];
      await page.waitForChanges();

      const clicked: string[] = [];
      page.root.addEventListener('tk-item-click', (e: Event) => clicked.push((e as CustomEvent).detail.key));

      branchToggleIcon(page).click();
      await page.waitForChanges();

      expect(clicked).toEqual([]);
      expect(branchNode(page).classList.contains('expanded')).toBe(false);
    });

    it('clears the highlight when expandedKeys hides the highlighted item in controlled mode', async () => {
      const page = await setupTree(`<tk-tree-view></tk-tree-view>`);
      page.root.expandedKeys = ['a'];
      await page.waitForChanges();

      // select the child leaf, then collapse its parent from the outside
      (page.root.querySelector('.node.directory .node.file > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();

      page.root.expandedKeys = [];
      await page.waitForChanges();

      expect(branchNode(page).classList.contains('expanded')).toBe(false);
      expect(page.root.querySelector('.node.selected')).toBeNull();
    });
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
