jest.mock('lodash-es', () => ({
  merge: (...items: Record<string, unknown>[]) => Object.assign({}, ...items),
}));

jest.mock('d3-org-chart', () => ({
  OrgChart: jest.fn().mockImplementation(() => {
    const chain = {
      container: jest.fn(() => chain),
      data: jest.fn(() => chain),
      layout: jest.fn(() => chain),
      initialExpandLevel: jest.fn(() => chain),
      nodeWidth: jest.fn(() => chain),
      nodeHeight: jest.fn(() => chain),
      nodeButtonWidth: jest.fn(() => chain),
      nodeButtonHeight: jest.fn(() => chain),
      nodeButtonX: jest.fn(() => chain),
      childrenMargin: jest.fn(() => chain),
      compact: jest.fn(() => chain),
      nodeContent: jest.fn(() => chain),
      buttonContent: jest.fn(() => chain),
      onNodeClick: jest.fn(() => chain),
      layoutBindings: jest.fn((value?: unknown) => {
        if (value) return chain;
        return { top: {} };
      }),
      render: jest.fn(() => chain),
      fit: jest.fn(),
      addNode: jest.fn(),
    };
    return chain;
  }),
}));

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkOrgChart } from '../tk-org-chart';

const setup = async (html = `<tk-org-chart></tk-org-chart>`) => newSpecPage({ components: [TkOrgChart], html });

const instanceOf = (page: SpecPage) => page.rootInstance as any;
const chartOf = (page: SpecPage) => instanceOf(page).orgChartInstance;

describe('tk-org-chart', () => {
  it('renders the org chart container with an accessibility label', async () => {
    const page = await setup();

    page.root.accessibilityLabel = 'Org chart';
    page.root.data = [{ id: 1, name: 'CEO' }];
    await page.waitForChanges();

    expect(page.root.querySelector('.tk-org-chart-container')?.getAttribute('aria-label')).toBe('Org chart');
  });

  describe('accessibility label', () => {
    it('falls back to the options title', async () => {
      const page = await setup();

      page.root.options = { title: { text: 'Team tree' } };
      await page.waitForChanges();

      expect(page.root.querySelector('.tk-org-chart-container')?.getAttribute('aria-label')).toBe('Team tree');
    });

    it('falls back to a generic label', async () => {
      const page = await setup();

      expect(page.root.querySelector('.tk-org-chart-container')?.getAttribute('aria-label')).toBe('Organization Chart');
    });

    it('marks the container as an image for assistive technology', async () => {
      const page = await setup();

      expect(page.root.querySelector('.tk-org-chart-container')?.getAttribute('role')).toBe('img');
    });
  });

  describe('data normalisation', () => {
    it('passes a flat array through untouched', async () => {
      const page = await setup();
      const flat = [
        { id: 1, name: 'CEO' },
        { id: 2, parentId: 1, name: 'CTO' },
      ];

      expect(instanceOf(page).normaliseData(flat)).toEqual(flat);
    });

    it('copies rather than aliasing the input array', async () => {
      const page = await setup();
      const flat = [{ id: 1, name: 'CEO' }];

      expect(instanceOf(page).normaliseData(flat)).not.toBe(flat);
    });

    it('flattens a nested tree and assigns parent ids', async () => {
      const page = await setup();
      const tree = {
        id: 1,
        name: 'CEO',
        children: [
          { id: 2, name: 'CTO' },
          { id: 3, name: 'CFO', children: [{ id: 4, name: 'Accountant' }] },
        ],
      };

      const result = instanceOf(page).normaliseData(tree);

      expect(result.map((n: any) => [n.id, n.parentId])).toEqual([
        [1, null],
        [2, 1],
        [3, 1],
        [4, 3],
      ]);
    });

    it('generates ids when the tree has none', async () => {
      const page = await setup();
      const tree = { name: 'CEO', children: [{ name: 'CTO' }] };

      const result = instanceOf(page).normaliseData(tree);

      expect(result).toHaveLength(2);
      expect(result[0].parentId).toBeNull();
      expect(result[1].parentId).toBe(result[0].id);
    });

    it('drops the children key from flattened nodes but keeps other fields', async () => {
      const page = await setup();
      const result = instanceOf(page).normaliseData({ id: 1, name: 'CEO', title: 'Boss', children: [{ id: 2, name: 'CTO' }] });

      expect(result[0]).toMatchObject({ id: 1, name: 'CEO', title: 'Boss', parentId: null });
    });

    it('handles an array of trees', async () => {
      const page = await setup();
      const result = instanceOf(page).normaliseData([{ name: 'A', children: [{ name: 'A1' }] }, { name: 'B' }]);

      expect(result).toHaveLength(3);
      expect(result.filter((n: any) => n.parentId === null)).toHaveLength(2);
    });

    it('returns an empty array for empty input', async () => {
      const page = await setup();

      expect(instanceOf(page).normaliseData([])).toEqual([]);
    });

    it('wraps a plain object without children', async () => {
      const page = await setup();

      expect(instanceOf(page).normaliseData({ id: 1, name: 'Solo' })).toEqual([{ id: 1, name: 'Solo' }]);
    });
  });

  describe('needsNormalising', () => {
    it.each([
      ['an array with ids and no children', [{ id: 1 }], false],
      ['an array whose first entry has children', [{ id: 1, children: [] }], true],
      ['an array whose first entry has no id', [{ name: 'x' }], true],
      ['an empty array', [], false],
      ['an object with children', { children: [] }, true],
      ['an object without children', { id: 1 }, false],
    ])('reports %s', async (_label, value, expected) => {
      const page = await setup();

      expect(instanceOf(page).needsNormalising(value)).toBe(expected);
    });
  });

  describe('chart wiring', () => {
    it('builds the chart against the container on load', async () => {
      const page = await setup();
      const chart = chartOf(page);

      expect(chart).toBeTruthy();
      expect(chart.container).toHaveBeenCalledWith(page.root.querySelector('.tk-org-chart-container'));
      expect(chart.render).toHaveBeenCalled();
    });

    it('feeds normalised data to the chart', async () => {
      const page = await setup();

      page.root.data = [{ id: 1, name: 'CEO', children: [{ id: 2, name: 'CTO' }] }];
      await page.waitForChanges();

      const lastData = chartOf(page).data.mock.calls.slice(-1)[0][0];

      expect(lastData.map((n: any) => n.id)).toEqual([1, 2]);
    });

    it('re-renders when the data prop changes', async () => {
      const page = await setup();
      const before = chartOf(page).render.mock.calls.length;

      page.root.data = [{ id: 1, name: 'CEO' }];
      await page.waitForChanges();

      expect(chartOf(page).render.mock.calls.length).toBeGreaterThan(before);
    });

    it('overrides the top layout diagonal with an orthogonal path', async () => {
      const page = await setup();
      const bindings = chartOf(page)
        .layoutBindings.mock.calls.filter((c: unknown[]) => c.length > 0)
        .slice(-1)[0][0];

      expect(bindings.top.diagonal({ x: 0, y: 0 }, { x: 10, y: 20 })).toBe('M 0 0 L 0 10 L 10 10 L 10 20');
    });
  });

  describe('options', () => {
    it('merges options into internalOptions', async () => {
      const page = await setup();

      page.root.options = { nodeWidth: 200 };
      await page.waitForChanges();

      expect(instanceOf(page).internalOptions).toMatchObject({ nodeWidth: 200 });
    });

    it('starts with an empty option set', async () => {
      const page = await setup();

      expect(instanceOf(page).internalOptions).toEqual({});
    });
  });

  describe('methods', () => {
    it('getOrgChart() exposes the underlying instance', async () => {
      const page = await setup();

      await expect(page.root.getOrgChart()).resolves.toBe(chartOf(page));
    });

    it('refresh() re-renders the chart', async () => {
      const page = await setup();
      const before = chartOf(page).render.mock.calls.length;

      await page.root.refresh();

      expect(chartOf(page).render.mock.calls.length).toBeGreaterThan(before);
    });

    it('addNode() forwards to the chart', async () => {
      const page = await setup();
      const node = { id: 9, parentId: 1, name: 'New' };

      await page.root.addNode(node);

      expect(chartOf(page).addNode).toHaveBeenCalledWith(node);
    });

    it('fit() forwards to the chart', async () => {
      const page = await setup();

      await page.root.fit();

      expect(chartOf(page).fit).toHaveBeenCalled();
    });

    it('addNode() and fit() are no-ops once the instance is gone', async () => {
      const page = await setup();
      instanceOf(page).orgChartInstance = undefined;

      await expect(page.root.addNode({ id: 1 })).resolves.toBeUndefined();
      await expect(page.root.fit()).resolves.toBeUndefined();
    });
  });

  describe('node click', () => {
    it('re-emits a node click as tk-node-click', async () => {
      const page = await setup();
      const onClick = jest.fn();
      page.root.addEventListener('tk-node-click', onClick);

      const handler = chartOf(page).onNodeClick.mock.calls[0][0];
      handler({ data: { id: 1, name: 'CEO' } });

      expect(onClick.mock.calls[0][0].detail.data.name).toBe('CEO');
    });
  });

  describe('node markup', () => {
    it('renders the name and title', async () => {
      const page = await setup();
      const html = instanceOf(page).defaultNodeHTML({ data: { name: 'Ada', title: 'CTO' } });

      expect(html).toContain('Ada');
      expect(html).toContain('CTO');
    });

    it('tolerates a missing title', async () => {
      const page = await setup();

      expect(() => instanceOf(page).defaultNodeHTML({ data: { name: 'Ada' } })).not.toThrow();
    });

    it('renders a collapse chevron in the button markup', async () => {
      const page = await setup();

      expect(instanceOf(page).defaultButtonHTML()).toContain('<svg');
    });
  });

  describe('collapsible buttons', () => {
    // Fake timers would also freeze Stencil's render queue and hang `waitForChanges`, so the
    // deferred button pass is driven by invoking the captured callback instead.
    const pendingButtonPass = (spy: jest.SpyInstance) => spy.mock.calls.find(call => call[1] === 350)?.[0] as () => void;

    it('blanks the button content when collapsing is disabled', async () => {
      const page = await setup();

      page.root.collapsible = false;
      await page.waitForChanges();

      const buttonContent = chartOf(page).buttonContent.mock.calls.slice(-1)[0][0];
      expect(buttonContent()).toBe('');
    });

    it('renders a button only for nodes that have children', async () => {
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      const page = await setup();

      page.root.collapsible = true;
      await page.waitForChanges();
      pendingButtonPass(setTimeoutSpy)();

      const buttonContent = chartOf(page).buttonContent.mock.calls.slice(-1)[0][0];

      expect(buttonContent({ node: { children: [{}] } })).toContain('<svg');
      expect(buttonContent({ node: {} })).toBe('');

      clearTimeout(instanceOf(page).buttonUpdateTimeout);
      setTimeoutSpy.mockRestore();
    });

    it('does not render buttons after the instance is gone', async () => {
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      const page = await setup();

      page.root.collapsible = true;
      await page.waitForChanges();

      const chart = chartOf(page);
      const callsBefore = chart.buttonContent.mock.calls.length;
      instanceOf(page).orgChartInstance = undefined;
      pendingButtonPass(setTimeoutSpy)();

      expect(chart.buttonContent.mock.calls.length).toBe(callsBefore);

      setTimeoutSpy.mockRestore();
    });
  });

  describe('teardown', () => {
    it('drops the chart instance on disconnect', async () => {
      const page = await setup();
      expect(chartOf(page)).toBeTruthy();

      page.root.remove();
      await page.waitForChanges();

      expect(chartOf(page)).toBeUndefined();
    });

    it('cancels a pending button update on disconnect', async () => {
      const clearSpy = jest.spyOn(global, 'clearTimeout');
      const page = await setup();

      page.root.collapsible = true;
      await page.waitForChanges();
      page.root.remove();
      await page.waitForChanges();

      expect(clearSpy).toHaveBeenCalled();
      expect(instanceOf(page).buttonUpdateTimeout).toBeUndefined();

      clearSpy.mockRestore();
    });
  });
});

describe('tk-org-chart layout', () => {
  type LayoutNode = { y?: number; height?: number; parent?: { y: number; height: number } };
  const bindingsPassedTo = (page: SpecPage) =>
    chartOf(page)
      .layoutBindings.mock.calls.filter((c: unknown[]) => c.length > 0)
      .map((c: unknown[]) => c[0] as { top: Record<string, (n: LayoutNode) => number> });
  const parentNode = { y: 100, height: 90, parent: { y: 100, height: 90 } };

  it('lays the tree out top-down, expanded and non-compact', async () => {
    const page = await setup();
    const chart = chartOf(page);

    expect(chart.layout).toHaveBeenCalledWith('top');
    expect(chart.compact).toHaveBeenCalledWith(false);
    expect(chart.initialExpandLevel).toHaveBeenCalledWith(Infinity);
  });

  it('sizes nodes, buttons and the gap between generations through accessors', async () => {
    const page = await setup();
    const chart = chartOf(page);
    const accessor = (name: string) => chart[name].mock.calls[0][0]();

    expect(accessor('nodeWidth')).toBe(160);
    expect(accessor('nodeHeight')).toBe(90);
    expect(accessor('nodeButtonWidth')).toBe(28.5);
    expect(accessor('nodeButtonHeight')).toBe(27);
    expect(accessor('nodeButtonX')).toBe(-14.25);
    expect(accessor('childrenMargin')).toBe(84);
  });

  it('renders each node through the default node template', async () => {
    const page = await setup();
    const nodeContent = chartOf(page).nodeContent.mock.calls[0][0];

    expect(nodeContent({ data: { name: 'Grace', title: 'Engineer' } })).toContain('Grace');
    expect(nodeContent({ data: { name: 'Grace', title: 'Engineer' } })).toContain('Engineer');
  });

  it('renders empty name and title cells instead of "undefined" for sparse nodes', async () => {
    const page = await setup();

    expect(instanceOf(page).defaultNodeHTML({ data: {} })).not.toContain('undefined');
  });

  it('renders the chevron button through the default button template on load', async () => {
    const page = await setup();
    const initialButtonContent = chartOf(page).buttonContent.mock.calls[0][0];

    expect(initialButtonContent()).toContain('<svg');
  });

  it('places expand buttons just below each node', async () => {
    const page = await setup();

    for (const binding of bindingsPassedTo(page)) {
      expect(binding.top.buttonY({ height: 90 })).toBe(117);
    }
  });

  it('starts parent links below the expand button and ends them just above the child when collapsible', async () => {
    const page = await setup();
    const collapsibleBindings = bindingsPassedTo(page).filter(b => b.top.linkY);

    expect(collapsibleBindings.length).toBeGreaterThan(0);
    for (const binding of collapsibleBindings) {
      expect(binding.top.linkParentY(parentNode)).toBe(100 + 90 + 27 + 14);
      expect(binding.top.linkY({ y: 300 })).toBe(296);
    }
  });

  it('applies the initial link geometry before the collapsible pass runs', async () => {
    const page = await setup();
    const initialBindings = bindingsPassedTo(page).find(b => b.top.diagonal);

    expect(initialBindings.top.buttonY({ height: 90 })).toBe(117);
    expect(initialBindings.top.linkParentY(parentNode)).toBe(100 + 90 + 27 + 14);
  });

  it('starts parent links directly at the node edge when collapsing is disabled', async () => {
    const page = await setup(`<tk-org-chart collapsible="false"></tk-org-chart>`);
    const [binding] = bindingsPassedTo(page);

    expect(binding.top.linkParentY(parentNode)).toBe(190);
    expect(binding.top.buttonY({ height: 90 })).toBe(117);
    expect(chartOf(page).buttonContent.mock.calls.slice(-1)[0][0]()).toBe('');
  });

  it('refresh() is a no-op once the chart instance is gone', async () => {
    const page = await setup();
    const chart = chartOf(page);
    page.root.remove();
    await page.waitForChanges();
    const dataCalls = chart.data.mock.calls.length;

    await expect(page.root.refresh()).resolves.toBeUndefined();

    expect(chart.data.mock.calls.length).toBe(dataCalls);
  });
});
