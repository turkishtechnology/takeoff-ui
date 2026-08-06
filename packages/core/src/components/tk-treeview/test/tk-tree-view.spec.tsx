import { newSpecPage } from '@stencil/core/testing';
import { TkTreeView } from '../tk-tree-view';
import { TkCheckbox } from '../../tk-checkbox/tk-checkbox';

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
      // Only the first click changes the highlighted item, the branch holds it from then on, so the
      // two toggles after it expand and collapse without re-announcing an active item that never changed.
      expect(emitted).toEqual(['a']);
    });

    it('does not restructure the stepper columns on a leaf click when the trigger is icon', async () => {
      const page = await setupTree(`<tk-tree-view mode="stepper" toggle-trigger="icon"></tk-tree-view>`);

      branchToggleIcon(page).click();
      await page.waitForChanges();
      expect(page.root.querySelectorAll('.column').length).toBe(2);

      // the root level leaf has no arrow, so clicking it must only highlight
      const rootLeaf = page.root.querySelectorAll('.column')[0].querySelector('.node.file > .tk-tree-view.label') as HTMLElement;
      rootLeaf.click();
      await page.waitForChanges();

      expect(page.root.querySelectorAll('.column').length).toBe(2);
      expect(page.root.querySelector('.node.file').classList.contains('selected')).toBe(true);
    });

    it('still collapses the stepper columns on a leaf click with the item trigger', async () => {
      const page = await setupTree(`<tk-tree-view mode="stepper" expand-all></tk-tree-view>`);

      expect(page.root.querySelectorAll('.column').length).toBe(2);

      const rootLeaf = page.root.querySelectorAll('.column')[0].querySelector('.node.file > .tk-tree-view.label') as HTMLElement;
      rootLeaf.click();
      await page.waitForChanges();

      expect(page.root.querySelectorAll('.column').length).toBe(1);
    });

    // Clicking the highlighted item again removes the highlight, but only where highlighting is the
    // whole effect of the click. A branch with the item trigger toggles instead, so it keeps the
    // highlight rather than blinking it on and off on alternating clicks.
    it('clears the highlight when the highlighted item is clicked again and the trigger is icon', async () => {
      const page = await setupTree(`<tk-tree-view expand-all toggle-trigger="icon"></tk-tree-view>`);

      branchLabel(page).click();
      await page.waitForChanges();
      expect(branchNode(page).classList.contains('selected')).toBe(true);

      branchLabel(page).click();
      await page.waitForChanges();

      expect(page.root.querySelector('.node.selected')).toBeNull();
      expect(branchNode(page).classList.contains('expanded')).toBe(true);
    });

    it('clears the highlight when a highlighted leaf is clicked again in either trigger mode', async () => {
      for (const attr of ['expand-all', 'expand-all toggle-trigger="icon"']) {
        const page = await setupTree(`<tk-tree-view ${attr}></tk-tree-view>`);
        const leaf = () => page.root.querySelector('.node.file > .tk-tree-view.label') as HTMLElement;

        leaf().click();
        await page.waitForChanges();
        expect(page.root.querySelector('.node.file').classList.contains('selected')).toBe(true);

        leaf().click();
        await page.waitForChanges();
        expect(page.root.querySelector('.node.selected')).toBeNull();
      }
    });

    it('keeps the highlight on a branch clicked again with the item trigger', async () => {
      const page = await setupTree(`<tk-tree-view toggle-trigger="item"></tk-tree-view>`);

      const states: string[] = [];
      for (let i = 0; i < 4; i++) {
        branchLabel(page).click();
        await page.waitForChanges();
        states.push(`${branchNode(page).classList.contains('expanded')}/${branchNode(page).classList.contains('selected')}`);
      }

      expect(states).toEqual(['true/true', 'false/true', 'true/true', 'false/true']);
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

    // tk-item-click reports a change of the highlighted item. The arrow keeps toggling the branch it
    // is already on, so it must not keep re-announcing an active item that never changed.
    it('does not emit tk-item-click when the arrow toggles an already highlighted branch', async () => {
      const page = await setupTree(`<tk-tree-view toggle-trigger="icon"></tk-tree-view>`);

      const clicked: string[] = [];
      page.root.addEventListener('tk-item-click', (e: Event) => clicked.push((e as CustomEvent).detail.key));

      branchLabel(page).click();
      await page.waitForChanges();

      for (let i = 0; i < 3; i++) {
        branchToggleIcon(page).click();
        await page.waitForChanges();
      }

      expect(clicked).toEqual(['a']);
      // the toggling itself still works, only the redundant event is gone. The label click with the
      // icon trigger only highlights, so three arrow clicks from collapsed leave the branch open.
      expect(branchNode(page).classList.contains('expanded')).toBe(true);
      expect(branchNode(page).classList.contains('selected')).toBe(true);
    });

    // While isInitialLoad is set the expandedKeys items render highlighted without holding
    // highlightedPath, so the first click on one of them is a real change and still has to emit.
    it('emits tk-item-click on the first click of an item highlighted only by expandedKeys', async () => {
      const page = await setupTree(`<tk-tree-view></tk-tree-view>`);
      page.root.expandedKeys = ['a'];
      await page.waitForChanges();
      expect(branchNode(page).classList.contains('selected')).toBe(true);

      const clicked: string[] = [];
      page.root.addEventListener('tk-item-click', (e: Event) => clicked.push((e as CustomEvent).detail.key));

      branchLabel(page).click();
      await page.waitForChanges();

      expect(clicked).toEqual(['a']);
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

    // A prop driven collapse is not a click, so it only hides the highlighted row. Re-expanding the
    // branch brings the highlight back, which keeps clicks the single thing that moves it.
    it('keeps the highlight when expandedKeys hides the highlighted item in controlled mode', async () => {
      const page = await setupTree(`<tk-tree-view></tk-tree-view>`);
      page.root.expandedKeys = ['a'];
      await page.waitForChanges();

      // select the child leaf, then collapse its parent from the outside
      (page.root.querySelector('.node.directory .node.file > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();

      page.root.expandedKeys = [];
      await page.waitForChanges();

      expect(branchNode(page).classList.contains('expanded')).toBe(false);
      // the highlighted leaf is hidden but still highlighted, so it returns when A reopens
      expect(page.root.querySelector('.node.selected')).toBeNull();

      page.root.expandedKeys = ['a'];
      await page.waitForChanges();
      expect(page.root.querySelector('.node.file').classList.contains('selected')).toBe(true);
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

    it('toggles the selection through the select-all checkbox tk-change event', async () => {
      const page = await newSpecPage({
        components: [TkTreeView],
        html: `<tk-tree-view selectable select-all></tk-tree-view>`,
      });
      page.root.items = treeItems;
      await page.waitForChanges();

      const checkbox = page.root.querySelector('.select-all tk-checkbox');
      checkbox.dispatchEvent(new CustomEvent('tk-change', { detail: true }));
      await page.waitForChanges();

      expect(page.root.value).toEqual(['a', 'a1', 'a2', 'b']);
    });

    it('does not trigger the row handler when the select-all checkbox itself is clicked', async () => {
      const page = await newSpecPage({
        components: [TkTreeView],
        html: `<tk-tree-view selectable select-all></tk-tree-view>`,
      });
      page.root.items = treeItems;
      await page.waitForChanges();

      (page.root.querySelector('.select-all tk-checkbox') as HTMLElement).click();
      await page.waitForChanges();

      expect(page.root.value).toBeUndefined();
    });

    it('ignores select-all clicks when the tree is disabled', async () => {
      const page = await newSpecPage({
        components: [TkTreeView],
        html: `<tk-tree-view selectable select-all disabled></tk-tree-view>`,
      });
      page.root.items = treeItems;
      await page.waitForChanges();

      const emitted: string[][] = [];
      page.root.addEventListener('tk-change', (e: Event) => emitted.push((e as CustomEvent<string[]>).detail));

      (page.root.querySelector('.select-all') as HTMLElement).click();
      await page.waitForChanges();

      expect(page.root.value).toBeUndefined();
      expect(emitted).toEqual([]);
    });
  });

  describe('controlled mode (expandedKeys)', () => {
    const deepItems = [
      {
        key: 'root1',
        label: 'Root 1',
        children: [
          {
            key: 'child1',
            label: 'Child 1',
            children: [
              { key: 'leaf1', label: 'Leaf 1' },
              { key: 'leaf2', label: 'Leaf 2' },
            ],
          },
          { key: 'leaf3', label: 'Leaf 3' },
        ],
      },
      { key: 'root2', label: 'Root 2', children: [{ key: 'leaf4', label: 'Leaf 4' }] },
    ];

    const setupDeepTree = async (html: string) => {
      const page = await newSpecPage({ components: [TkTreeView], html });
      page.root.items = deepItems;
      await page.waitForChanges();
      return page;
    };

    it('expands all ancestors of a nested expanded key', async () => {
      const page = await setupDeepTree(`<tk-tree-view></tk-tree-view>`);

      page.root.expandedKeys = ['child1'];
      await page.waitForChanges();

      expect(page.root.querySelectorAll('.node.directory.expanded')).toHaveLength(2);
      expect(page.root.textContent).toContain('Leaf 1');
    });

    it('logs invalid keys given to expandedKeys', async () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      try {
        const page = await setupDeepTree(`<tk-tree-view></tk-tree-view>`);

        page.root.expandedKeys = ['ghost'];
        await page.waitForChanges();

        expect(errorSpy).toHaveBeenCalledWith('Invalid keys given to expandedKeys prop:', ['ghost']);
      } finally {
        errorSpy.mockRestore();
      }
    });

    it('initializes expansion from expandedKeys when the items arrive later', async () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      try {
        const page = await newSpecPage({ components: [TkTreeView], html: `<tk-tree-view></tk-tree-view>` });
        page.root.expandedKeys = ['child1', 'bogus'];
        await page.waitForChanges();

        page.root.items = deepItems;
        await page.waitForChanges();

        expect(page.root.querySelectorAll('.node.directory.expanded')).toHaveLength(2);
        expect(errorSpy).toHaveBeenCalledWith('Invalid keys given to expandedKeys prop:', ['bogus']);
      } finally {
        errorSpy.mockRestore();
      }
    });

    it('only honors the first expanded key in stepper mode', async () => {
      const page = await setupDeepTree(`<tk-tree-view mode="stepper"></tk-tree-view>`);

      page.root.expandedKeys = ['root1', 'root2'];
      await page.waitForChanges();

      expect(page.root.querySelectorAll('.column')).toHaveLength(2);
      const rootNodes = page.root.querySelectorAll('.column')[0].querySelectorAll('.node.directory');
      expect(rootNodes[0].classList.contains('expanded')).toBe(true);
      expect(rootNodes[1].classList.contains('expanded')).toBe(false);

      // itemsChanged re-runs the controlled initialization with the same stepper rule
      page.root.items = [...deepItems];
      await page.waitForChanges();

      expect(page.root.querySelectorAll('.column')).toHaveLength(2);
    });

    it('emits tk-expand-change instead of expanding on a branch click in controlled basic mode', async () => {
      const page = await setupDeepTree(`<tk-tree-view></tk-tree-view>`);
      page.root.expandedKeys = [];
      await page.waitForChanges();

      const emitted: string[][] = [];
      page.root.addEventListener('tk-expand-change', (e: Event) => emitted.push((e as CustomEvent<string[]>).detail));

      (page.root.querySelector('.node.directory > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();

      expect(emitted).toEqual([['root1']]);
      expect(page.root.querySelector('.node.directory.expanded')).toBeNull();
    });

    it('emits the collapsed key set when an expanded branch is clicked in controlled basic mode', async () => {
      const page = await setupDeepTree(`<tk-tree-view></tk-tree-view>`);
      page.root.expandedKeys = ['child1'];
      await page.waitForChanges();

      const emitted: string[][] = [];
      page.root.addEventListener('tk-expand-change', (e: Event) => emitted.push((e as CustomEvent<string[]>).detail));

      // collapse the outer branch, its descendant expansion must be dropped as well
      (page.root.querySelector('.node.directory > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();

      expect(emitted).toEqual([[]]);
      expect(page.root.querySelectorAll('.node.directory.expanded')).toHaveLength(2);
    });

    it('emits tk-expand-change on a branch click in controlled stepper mode', async () => {
      const page = await setupDeepTree(`<tk-tree-view mode="stepper"></tk-tree-view>`);
      page.root.expandedKeys = [];
      await page.waitForChanges();

      const emitted: string[][] = [];
      page.root.addEventListener('tk-expand-change', (e: Event) => emitted.push((e as CustomEvent<string[]>).detail));

      (page.root.querySelector('.node.directory > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();

      expect(emitted).toEqual([['root1']]);
      expect(page.root.querySelectorAll('.column')).toHaveLength(1);
    });

    it('emits an empty key set when the expanded branch is clicked in controlled stepper mode', async () => {
      const page = await setupDeepTree(`<tk-tree-view mode="stepper"></tk-tree-view>`);
      page.root.expandedKeys = ['root1'];
      await page.waitForChanges();

      expect(page.root.querySelectorAll('.column')).toHaveLength(2);

      const emitted: string[][] = [];
      page.root.addEventListener('tk-expand-change', (e: Event) => emitted.push((e as CustomEvent<string[]>).detail));

      (page.root.querySelector('.node.directory > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();

      expect(emitted).toEqual([[]]);
      expect(page.root.querySelectorAll('.column')).toHaveLength(2);
    });

    it('emits the parent chain when a leaf is clicked in controlled stepper mode', async () => {
      const page = await setupDeepTree(`<tk-tree-view mode="stepper"></tk-tree-view>`);
      page.root.expandedKeys = ['root1'];
      await page.waitForChanges();

      const emitted: string[][] = [];
      page.root.addEventListener('tk-expand-change', (e: Event) => emitted.push((e as CustomEvent<string[]>).detail));

      // Leaf 3 lives in the second column under root1
      const secondColumn = page.root.querySelectorAll('.column')[1];
      (secondColumn.querySelector('.node.file > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();

      expect(emitted).toEqual([['root1']]);
    });
  });

  describe('stepper mode', () => {
    const deepItems = [
      {
        key: 'root1',
        label: 'Root 1',
        children: [
          {
            key: 'child1',
            label: 'Child 1',
            children: [{ key: 'leaf1', label: 'Leaf 1' }],
          },
          { key: 'leaf3', label: 'Leaf 3' },
        ],
      },
      { key: 'root2', label: 'Root 2', children: [{ key: 'leaf4', label: 'Leaf 4' }] },
    ];

    const setupStepper = async (html: string) => {
      const page = await newSpecPage({ components: [TkTreeView], html });
      page.root.items = deepItems;
      await page.waitForChanges();
      return page;
    };

    it('collapses the expanded branch and its columns when it is clicked again', async () => {
      const page = await setupStepper(`<tk-tree-view mode="stepper"></tk-tree-view>`);

      const rootLabel = () => page.root.querySelector('.node.directory > .tk-tree-view.label') as HTMLElement;
      rootLabel().click();
      await page.waitForChanges();
      expect(page.root.querySelectorAll('.column')).toHaveLength(2);

      rootLabel().click();
      await page.waitForChanges();

      expect(page.root.querySelectorAll('.column')).toHaveLength(1);
    });

    it('keeps only the parent chain of a clicked leaf expanded', async () => {
      const page = await setupStepper(`<tk-tree-view mode="stepper"></tk-tree-view>`);

      // expand root1, then child1: three columns are open
      (page.root.querySelector('.node.directory > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();
      (page.root.querySelectorAll('.column')[1].querySelector('.node.directory > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();
      expect(page.root.querySelectorAll('.column')).toHaveLength(3);

      // clicking Leaf 3 next to child1 closes the third column
      (page.root.querySelectorAll('.column')[1].querySelector('.node.file > .tk-tree-view.label') as HTMLElement).click();
      await page.waitForChanges();

      expect(page.root.querySelectorAll('.column')).toHaveLength(2);
    });

    it('applies containerStyle and stepStyle in stepper mode', async () => {
      const page = await setupStepper(`<tk-tree-view mode="stepper"></tk-tree-view>`);

      page.root.containerStyle = { width: '400px' };
      page.root.stepStyle = { minWidth: '120px' };
      await page.waitForChanges();

      expect((page.root.querySelector('.tk-tree-view.stepper') as HTMLElement).style.width).toBe('400px');
      expect((page.root.querySelector('.tk-tree-view.column') as HTMLElement).style.minWidth).toBe('120px');
    });
  });

  describe('checkbox selection', () => {
    const deepItems = [
      {
        key: 'root1',
        label: 'Root 1',
        children: [
          {
            key: 'child1',
            label: 'Child 1',
            children: [
              { key: 'leaf1', label: 'Leaf 1' },
              { key: 'leaf2', label: 'Leaf 2' },
            ],
          },
          { key: 'leaf3', label: 'Leaf 3' },
        ],
      },
      { key: 'root2', label: 'Root 2', children: [{ key: 'leaf4', label: 'Leaf 4' }] },
    ];

    const setupSelectable = async (html: string) => {
      const page = await newSpecPage({ components: [TkTreeView, TkCheckbox], html });
      page.root.items = deepItems;
      await page.waitForChanges();
      return page;
    };

    it('selects the branch and all descendants with the all strategy', async () => {
      const page = await setupSelectable(`<tk-tree-view selectable></tk-tree-view>`);

      const emitted: string[][] = [];
      page.root.addEventListener('tk-change', (e: Event) => emitted.push((e as CustomEvent<string[]>).detail));

      const rootCheckbox = page.root.querySelector('.node.directory tk-checkbox');
      rootCheckbox.dispatchEvent(new CustomEvent('tk-change', { detail: true }));
      await page.waitForChanges();

      expect(page.root.value).toEqual(['root1', 'child1', 'leaf1', 'leaf2', 'leaf3']);
      expect(emitted).toEqual([['root1', 'child1', 'leaf1', 'leaf2', 'leaf3']]);
    });

    it('deselects the branch and all descendants with the all strategy', async () => {
      const page = await setupSelectable(`<tk-tree-view selectable></tk-tree-view>`);

      const rootCheckbox = () => page.root.querySelector('.node.directory tk-checkbox');
      rootCheckbox().dispatchEvent(new CustomEvent('tk-change', { detail: true }));
      await page.waitForChanges();

      rootCheckbox().dispatchEvent(new CustomEvent('tk-change', { detail: false }));
      await page.waitForChanges();

      expect(page.root.value).toEqual([]);
    });

    it('selects only leaf descendants with the leaf strategy', async () => {
      const page = await setupSelectable(`<tk-tree-view selectable selection-strategy="leaf"></tk-tree-view>`);

      const rootCheckbox = page.root.querySelector('.node.directory tk-checkbox');
      rootCheckbox.dispatchEvent(new CustomEvent('tk-change', { detail: true }));
      await page.waitForChanges();

      expect(page.root.value).toEqual(['leaf1', 'leaf2', 'leaf3']);
    });

    it('drops non-leaf keys from the value under the leaf strategy', async () => {
      const page = await setupSelectable(`<tk-tree-view selectable selection-strategy="leaf"></tk-tree-view>`);
      page.root.value = ['root1', 'leaf4'];
      await page.waitForChanges();

      const rootCheckbox = page.root.querySelector('.node.directory tk-checkbox');
      rootCheckbox.dispatchEvent(new CustomEvent('tk-change', { detail: true }));
      await page.waitForChanges();

      expect(page.root.value).toEqual(['leaf4', 'leaf1', 'leaf2', 'leaf3']);
    });

    it('deselects leaf descendants with the leaf strategy', async () => {
      const page = await setupSelectable(`<tk-tree-view selectable selection-strategy="leaf"></tk-tree-view>`);
      page.root.value = ['leaf1', 'leaf2', 'leaf3', 'leaf4'];
      await page.waitForChanges();

      const rootCheckbox = page.root.querySelector('.node.directory tk-checkbox');
      rootCheckbox.dispatchEvent(new CustomEvent('tk-change', { detail: false }));
      await page.waitForChanges();

      expect(page.root.value).toEqual(['leaf4']);
    });

    it('marks the parent chain indeterminate when only one leaf is selected', async () => {
      const page = await setupSelectable(`<tk-tree-view selectable expand-all></tk-tree-view>`);
      page.root.value = ['leaf1'];
      await page.waitForChanges();

      const checkboxes = page.root.querySelectorAll('tk-checkbox');
      // render order: root1, child1, leaf1, leaf2, leaf3, root2, leaf4
      expect(checkboxes[0].indeterminate).toBe(true);
      expect(checkboxes[1].indeterminate).toBe(true);
      expect(checkboxes[2].value).toBe(true);
      expect(checkboxes[3].value).toBe(false);
    });

    it('marks a branch checked when all of its children are selected', async () => {
      const page = await setupSelectable(`<tk-tree-view selectable expand-all></tk-tree-view>`);
      page.root.value = ['child1', 'leaf1', 'leaf2', 'leaf3'];
      await page.waitForChanges();

      const checkboxes = page.root.querySelectorAll('tk-checkbox');
      expect(checkboxes[0].value).toBe(true);
      expect(checkboxes[1].value).toBe(true);
    });

    it('marks a directly selected childless-selection branch with the all strategy', async () => {
      const page = await setupSelectable(`<tk-tree-view selectable expand-all></tk-tree-view>`);
      page.root.value = ['root1'];
      await page.waitForChanges();

      const checkboxes = page.root.querySelectorAll('tk-checkbox');
      expect(checkboxes[0].value).toBe(true);
      expect(checkboxes[0].indeterminate).toBe(false);
    });

    it('ignores direct branch selection with the leaf strategy', async () => {
      const page = await setupSelectable(`<tk-tree-view selectable selection-strategy="leaf" expand-all></tk-tree-view>`);
      page.root.value = ['root1', 'leaf1'];
      await page.waitForChanges();

      const checkboxes = page.root.querySelectorAll('tk-checkbox');
      // tk-checkbox nulls its value while indeterminate, so checked must not be true
      expect(checkboxes[0].value).toBeFalsy();
      expect(checkboxes[0].indeterminate).toBe(true);
      // root2 subtree has no selection at all
      expect(checkboxes[5].value).toBe(false);
      expect(checkboxes[5].indeterminate).toBe(false);
    });

    it('does not toggle the branch when the checkbox itself is clicked', async () => {
      const page = await setupSelectable(`<tk-tree-view selectable></tk-tree-view>`);

      const emitted: string[] = [];
      page.root.addEventListener('tk-item-click', (e: Event) => emitted.push((e as CustomEvent).detail.key));

      (page.root.querySelector('.node.directory tk-checkbox') as HTMLElement).click();
      await page.waitForChanges();

      expect(page.root.querySelector('.node.directory.expanded')).toBeNull();
      expect(emitted).toEqual([]);
    });

    it('shows the selected count badge and hides it for zero when showZeroCountBadges is false', async () => {
      const page = await setupSelectable(`<tk-tree-view selectable></tk-tree-view>`);
      page.root.showZeroCountBadges = false;
      await page.waitForChanges();

      expect(page.root.querySelector('.node tk-badge')).toBeNull();

      page.root.value = ['leaf3'];
      await page.waitForChanges();

      expect(page.root.querySelector('.node tk-badge')).toBeTruthy();
    });
  });

  describe('watchers and rendering options', () => {
    it('re-initializes the expansion when the mode changes', async () => {
      const page = await setupTree(`<tk-tree-view expand-all></tk-tree-view>`);

      expect(branchNode(page).classList.contains('expanded')).toBe(true);

      page.root.mode = 'stepper';
      await page.waitForChanges();

      expect(page.root.querySelectorAll('.column').length).toBeGreaterThan(1);
    });

    it('expands every branch when expandAll becomes true after load', async () => {
      const page = await setupTree(`<tk-tree-view></tk-tree-view>`);

      expect(branchNode(page).classList.contains('expanded')).toBe(false);

      page.root.expandAll = true;
      await page.waitForChanges();

      expect(branchNode(page).classList.contains('expanded')).toBe(true);
    });

    it('ignores clicks when the whole tree is disabled', async () => {
      const page = await setupTree(`<tk-tree-view disabled></tk-tree-view>`);

      const emitted: string[] = [];
      page.root.addEventListener('tk-item-click', (e: Event) => emitted.push((e as CustomEvent).detail.key));

      branchLabel(page).click();
      await page.waitForChanges();

      expect(branchNode(page).classList.contains('expanded')).toBe(false);
      expect(emitted).toEqual([]);
    });

    it('renders branch and leaf icons when configured', async () => {
      const page = await setupTree(`<tk-tree-view expand-all branch-icon="folder" leaf-icon="description"></tk-tree-view>`);

      expect(page.root.querySelector('.node.directory tk-icon[icon="folder"]')).toBeTruthy();
      expect(page.root.querySelector('.node.file tk-icon[icon="description"]')).toBeTruthy();
    });

    it('applies badgeOptions to the children count badge', async () => {
      const page = await setupTree(`<tk-tree-view></tk-tree-view>`);

      page.root.badgeOptions = { type: 'filled', variant: 'primary', rounded: false, icon: 'star' };
      await page.waitForChanges();

      const badge = page.root.querySelector('tk-badge');
      expect(badge.getAttribute('type')).toBe('filled');
      expect(badge.getAttribute('variant')).toBe('primary');
      expect(badge.getAttribute('icon')).toBe('star');
    });

    it('uses the default badge appearance without badgeOptions', async () => {
      const page = await setupTree(`<tk-tree-view></tk-tree-view>`);

      const badge = page.root.querySelector('tk-badge');
      expect(badge.getAttribute('type')).toBe('filledlight');
      expect(badge.getAttribute('variant')).toBe('neutral');
    });

    it('hides the children count badge when showBadge is false', async () => {
      const page = await setupTree(`<tk-tree-view></tk-tree-view>`);
      page.root.showBadge = false;
      await page.waitForChanges();

      expect(page.root.querySelector('tk-badge')).toBeNull();
    });

    it('applies containerStyle in basic mode', async () => {
      const page = await setupTree(`<tk-tree-view></tk-tree-view>`);
      page.root.containerStyle = { maxHeight: '200px' };
      await page.waitForChanges();

      expect((page.root.querySelector('.tk-tree-view.basic') as HTMLElement).style.maxHeight).toBe('200px');
    });

    it('renders nothing without items', async () => {
      const page = await newSpecPage({ components: [TkTreeView], html: `<tk-tree-view></tk-tree-view>` });

      expect(page.root.querySelector('.tk-tree-view')).toBeNull();
    });
  });
});
