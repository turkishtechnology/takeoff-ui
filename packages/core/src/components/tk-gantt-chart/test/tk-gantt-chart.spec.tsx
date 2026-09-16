import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkGanttChart } from '../tk-gantt-chart';
import { IGanttTask } from '../types';

// Local-time strings: `toDateOnly` normalises to local midnight, so a bare '2024-01-10'
// (parsed as UTC) would shift a day west of Greenwich.
const iso = (year: number, month: number, day: number) => `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00`;

const task = (id: string, start: string, end: string, extra: Partial<IGanttTask> = {}): IGanttTask => ({ id, name: id, startDate: start, endDate: end, ...extra }) as IGanttTask;

const JAN_TASKS = [task('a', iso(2024, 1, 10), iso(2024, 1, 20))];

const setup = async (tasks: IGanttTask[] = [], props: Record<string, unknown> = {}) => {
  const page = await newSpecPage({
    components: [TkGanttChart],
    html: `<tk-gantt-chart data-testid="gantt"></tk-gantt-chart>`,
  });

  Object.assign(page.root, { tasks, ...props });
  await page.waitForChanges();

  return page;
};

const shadow = (page: SpecPage) => page.root.shadowRoot;
const testid = (page: SpecPage, id: string) => shadow(page).querySelector(`[data-testid="gantt-${id}"]`);
const allTestids = (page: SpecPage, id: string) => Array.from(shadow(page).querySelectorAll(`[data-testid^="gantt-${id}"]`));

describe('tk-gantt-chart', () => {
  // mock-doc predates Element#replaceChildren, which the component uses to mount a custom
  // task bar or tooltip node. Real browsers have had it since 2020.
  beforeAll(() => {
    const proto = Object.getPrototypeOf(document.createElement('div'));
    if (!proto.replaceChildren) {
      proto.replaceChildren = function (...nodes: Node[]) {
        while (this.firstChild) this.removeChild(this.firstChild);
        nodes.forEach(node => this.appendChild(node));
      };
    }
  });

  describe('empty state', () => {
    it('renders the empty state when there are no tasks', async () => {
      const page = await setup();

      expect(testid(page, 'empty')).toBeTruthy();
      expect(testid(page, 'empty-text').textContent).toBe('No tasks to display');
    });

    it('renders no panel or timeline when empty', async () => {
      const page = await setup();

      expect(testid(page, 'panel')).toBeNull();
      expect(testid(page, 'timeline')).toBeNull();
    });

    it('applies containerStyle', async () => {
      const page = await setup([], { containerStyle: { height: '400px' } });

      expect((testid(page, 'container') as HTMLElement).style.height).toBe('400px');
    });
  });

  describe('view type', () => {
    it.each([
      ['weekly', iso(2024, 1, 1), iso(2024, 1, 10)],
      ['monthly', iso(2024, 1, 1), iso(2024, 2, 20)],
      ['quarterly', iso(2024, 1, 1), iso(2024, 6, 30)],
      ['yearly', iso(2024, 1, 1), iso(2026, 1, 1)],
    ])('auto-fits to %s from the task span', async (expected, start, end) => {
      const page = await setup([task('a', start, end)]);

      expect((page.rootInstance as any).computedViewType).toBe(expected);
    });

    it('prefers an explicit viewType over auto-fit', async () => {
      const page = await setup(JAN_TASKS, { viewType: 'yearly' });

      expect((page.rootInstance as any).computedViewType).toBe('yearly');
    });

    it('recomputes when the tasks change', async () => {
      const page = await setup(JAN_TASKS);
      expect((page.rootInstance as any).computedViewType).toBe('weekly');

      page.root.tasks = [task('b', iso(2024, 1, 1), iso(2026, 1, 1))];
      await page.waitForChanges();

      expect((page.rootInstance as any).computedViewType).toBe('yearly');
    });

    it('recomputes when the viewType prop changes', async () => {
      const page = await setup(JAN_TASKS);

      page.root.viewType = 'quarterly';
      await page.waitForChanges();

      expect((page.rootInstance as any).computedViewType).toBe('quarterly');
    });
  });

  describe('panel', () => {
    it('renders the default columns as header cells', async () => {
      const page = await setup(JAN_TASKS);

      expect(testid(page, 'panel-header-cell-name')).toBeTruthy();
      expect(testid(page, 'panel-header-cell-startDate')).toBeTruthy();
      expect(testid(page, 'panel-header-cell-endDate')).toBeTruthy();
    });

    it('renders a row per visible task', async () => {
      const page = await setup(JAN_TASKS);

      expect(testid(page, 'panel-row-a')).toBeTruthy();
      expect(testid(page, 'panel-cell-content-a-name').textContent).toBe('a');
    });

    it('hides the panel when hidePanel is set', async () => {
      const page = await setup(JAN_TASKS, { hidePanel: true });

      expect(testid(page, 'panel')).toBeNull();
      expect(testid(page, 'timeline')).toBeTruthy();
    });

    it('applies panelWidth and rowHeight', async () => {
      const page = await setup(JAN_TASKS, { panelWidth: 200, rowHeight: 60 });

      expect((testid(page, 'panel') as HTMLElement).style.width).toBe('200px');
      expect((testid(page, 'panel-row-a') as HTMLElement).style.height).toBe('60px');
    });

    it('renders custom column html', async () => {
      const page = await setup(JAN_TASKS, {
        columns: [{ field: 'name', header: 'Task', html: (t: IGanttTask) => `<b>${t.name}</b>` }],
      });

      expect(testid(page, 'panel-cell-content-a-name').innerHTML).toBe('<b>a</b>');
    });

    it('indents child rows by depth', async () => {
      const page = await setup([task('parent', iso(2024, 1, 10), iso(2024, 1, 20), { children: [task('child', iso(2024, 1, 11), iso(2024, 1, 12))] })]);

      (page.rootInstance as any).expandedIds = new Set(['parent']);
      await page.waitForChanges();

      expect((testid(page, 'panel-cell-parent-name') as HTMLElement).style.paddingLeft).toBe('8px');
      expect((testid(page, 'panel-cell-child-name') as HTMLElement).style.paddingLeft).toBe('28px');
    });
  });

  describe('expanding rows', () => {
    const tree = [task('parent', iso(2024, 1, 10), iso(2024, 1, 20), { children: [task('child', iso(2024, 1, 11), iso(2024, 1, 12))] })];

    it('renders an expand button only for tasks with children', async () => {
      const page = await setup([...tree, task('leaf', iso(2024, 1, 10), iso(2024, 1, 11))]);

      expect(testid(page, 'panel-expand-button-parent')).toBeTruthy();
      expect(testid(page, 'panel-expand-button-leaf')).toBeNull();
    });

    it('hides children until the row is expanded', async () => {
      const page = await setup(tree);
      expect(testid(page, 'panel-row-child')).toBeNull();

      (testid(page, 'panel-expand-button-parent') as HTMLElement).click();
      await page.waitForChanges();

      expect(testid(page, 'panel-row-child')).toBeTruthy();
    });

    it('collapses again on a second click', async () => {
      const page = await setup(tree);

      (testid(page, 'panel-expand-button-parent') as HTMLElement).click();
      await page.waitForChanges();
      (testid(page, 'panel-expand-button-parent') as HTMLElement).click();
      await page.waitForChanges();

      expect(testid(page, 'panel-row-child')).toBeNull();
    });

    it('marks the expand button open while expanded', async () => {
      const page = await setup(tree);

      (testid(page, 'panel-expand-button-parent') as HTMLElement).click();
      await page.waitForChanges();

      expect(testid(page, 'panel-expand-button-parent').classList.contains('tk-gantt-chart-expand-btn-open')).toBe(true);
    });

    it('emits tk-task-toggle with the new state', async () => {
      const page = await setup(tree);
      const onToggle = jest.fn();
      page.root.addEventListener('tk-task-toggle', onToggle);

      (testid(page, 'panel-expand-button-parent') as HTMLElement).click();
      await page.waitForChanges();

      expect(onToggle.mock.calls[0][0].detail.expanded).toBe(true);
      expect(onToggle.mock.calls[0][0].detail.task.id).toBe('parent');

      (testid(page, 'panel-expand-button-parent') as HTMLElement).click();
      await page.waitForChanges();

      expect(onToggle.mock.calls[1][0].detail.expanded).toBe(false);
    });
  });

  describe('timeline headers', () => {
    it('renders both header layers', async () => {
      const page = await setup(JAN_TASKS, { viewType: 'monthly' });

      expect(testid(page, 'timeline-primary')).toBeTruthy();
      expect(testid(page, 'timeline-secondary')).toBeTruthy();
    });

    it('renders one secondary cell per day in the monthly view', async () => {
      const page = await setup(JAN_TASKS, { viewType: 'monthly' });

      expect(allTestids(page, 'timeline-secondary-cell')).toHaveLength(31);
    });

    it('marks weekend header cells', async () => {
      const page = await setup(JAN_TASKS, { viewType: 'monthly' });
      const weekendCells = allTestids(page, 'timeline-secondary-cell').filter(c => c.classList.contains('tk-gantt-chart-timeline-header-cell-weekend'));

      expect(weekendCells).toHaveLength(8);
    });

    it('leaves weekend header cells unmarked when highlighting is off', async () => {
      const page = await setup(JAN_TASKS, { viewType: 'monthly', highlightWeekends: false });
      const weekendCells = allTestids(page, 'timeline-secondary-cell').filter(c => c.classList.contains('tk-gantt-chart-timeline-header-cell-weekend'));

      expect(weekendCells).toHaveLength(0);
    });

    it('marks holiday header cells', async () => {
      const page = await setup(JAN_TASKS, { viewType: 'monthly', holidays: [{ date: iso(2024, 1, 3), label: 'Holiday' }] });
      const holidayCells = allTestids(page, 'timeline-secondary-cell').filter(c => c.classList.contains('tk-gantt-chart-timeline-header-cell-holiday'));

      expect(holidayCells).toHaveLength(1);
    });

    it('switches the secondary header to week numbers', async () => {
      const page = await setup(JAN_TASKS, { viewType: 'monthly', secondaryHeaderMode: 'weeks', locale: 'en-US' });
      const labels = allTestids(page, 'timeline-secondary-cell').map(c => c.textContent);

      expect(labels.every(l => l.startsWith('W'))).toBe(true);
    });
  });

  describe('timeline body', () => {
    it('highlights weekend columns', async () => {
      const page = await setup(JAN_TASKS, { viewType: 'monthly' });

      expect(allTestids(page, 'column-highlight')).toHaveLength(8);
    });

    it('highlights holiday columns alongside weekends', async () => {
      const page = await setup(JAN_TASKS, { viewType: 'monthly', holidays: [{ date: iso(2024, 1, 3) }] });

      expect(allTestids(page, 'column-highlight')).toHaveLength(9);
    });

    it('renders no highlights when both weekends and holidays are off', async () => {
      const page = await setup(JAN_TASKS, { viewType: 'monthly', highlightWeekends: false });

      expect(allTestids(page, 'column-highlight')).toHaveLength(0);
    });

    it('renders a today indicator by default', async () => {
      const page = await setup(JAN_TASKS);

      expect(testid(page, 'indicator-today')).toBeTruthy();
      expect(testid(page, 'indicator-label-today').textContent).toBe('Today');
    });

    it('omits the today indicator when disabled', async () => {
      const page = await setup(JAN_TASKS, { showTodayIndicator: false });

      expect(testid(page, 'indicator-today')).toBeNull();
    });

    it('renders custom indicators', async () => {
      const page = await setup(JAN_TASKS, {
        showTodayIndicator: false,
        indicators: [{ date: iso(2024, 1, 15), label: 'Freeze', color: '#ff0000', lineStyle: 'dashed' }],
      });
      const indicator = testid(page, 'indicator-custom-0') as HTMLElement;

      expect(indicator).toBeTruthy();
      expect(indicator.classList.contains('tk-gantt-chart-indicator-dashed')).toBe(true);
      expect(testid(page, 'indicator-label-custom-0').textContent).toBe('Freeze');
    });

    it('renders an unlabelled indicator without a label node', async () => {
      const page = await setup(JAN_TASKS, { showTodayIndicator: false, indicators: [{ date: iso(2024, 1, 15) }] });

      expect(testid(page, 'indicator-custom-0')).toBeTruthy();
      expect(testid(page, 'indicator-label-custom-0')).toBeNull();
    });
  });

  describe('task bars', () => {
    it('renders a bar per task with its label', async () => {
      const page = await setup(JAN_TASKS);

      expect(testid(page, 'task-bar-a')).toBeTruthy();
      expect(testid(page, 'task-bar-label-a').textContent).toBe('a');
    });

    it('positions and sizes the bar from the timeline start', async () => {
      const page = await setup([task('a', iso(2024, 1, 3), iso(2024, 1, 5))], { viewType: 'monthly' });
      const bar = testid(page, 'task-bar-a') as HTMLElement;

      expect(bar.style.left).toBe('48px');
      expect(bar.style.width).toBe('72px');
    });

    it('renders a progress fill when progress is set', async () => {
      const page = await setup([task('a', iso(2024, 1, 10), iso(2024, 1, 20), { progress: 40 })]);

      expect((testid(page, 'task-bar-progress-a') as HTMLElement).style.width).toBe('40%');
    });

    it('clamps progress above 100', async () => {
      const page = await setup([task('a', iso(2024, 1, 10), iso(2024, 1, 20), { progress: 150 })]);

      expect((testid(page, 'task-bar-progress-a') as HTMLElement).style.width).toBe('100%');
    });

    it('renders no progress fill for zero or missing progress', async () => {
      const zero = await setup([task('a', iso(2024, 1, 10), iso(2024, 1, 20), { progress: 0 })]);
      expect(testid(zero, 'task-bar-progress-a')).toBeNull();

      const missing = await setup(JAN_TASKS);
      expect(testid(missing, 'task-bar-progress-a')).toBeNull();
    });

    it('renders one bar per segment instead of a single bar', async () => {
      const page = await setup([
        task('a', iso(2024, 1, 10), iso(2024, 1, 20), {
          segments: [
            { startDate: iso(2024, 1, 10), endDate: iso(2024, 1, 12), label: 'phase 1' },
            { startDate: iso(2024, 1, 15), endDate: iso(2024, 1, 18), label: 'phase 2' },
          ],
        } as Partial<IGanttTask>),
      ]);

      expect(testid(page, 'task-bar-a')).toBeNull();
      expect(testid(page, 'task-bar-a-segment-0')).toBeTruthy();
      expect(testid(page, 'task-bar-label-a-segment-1').textContent).toBe('phase 2');
      expect(testid(page, 'task-bar-a-segment-0').classList.contains('tk-gantt-chart-task-bar-segment')).toBe(true);
    });

    it('prefers a segment progress over the task progress', async () => {
      const page = await setup([
        task('a', iso(2024, 1, 10), iso(2024, 1, 20), {
          progress: 10,
          segments: [{ startDate: iso(2024, 1, 10), endDate: iso(2024, 1, 12), progress: 80 }],
        } as Partial<IGanttTask>),
      ]);

      expect((testid(page, 'task-bar-progress-a-segment-0') as HTMLElement).style.width).toBe('80%');
    });

    it('emits tk-task-click with the clicked task', async () => {
      const page = await setup(JAN_TASKS);
      const onClick = jest.fn();
      page.root.addEventListener('tk-task-click', onClick);

      (testid(page, 'task-bar-a') as HTMLElement).click();

      expect(onClick.mock.calls[0][0].detail.id).toBe('a');
    });

    it('renders a custom task bar from an html string', async () => {
      const page = await setup(JAN_TASKS, { taskBarHtml: (t: IGanttTask) => `<em>${t.name}</em>` });

      expect(testid(page, 'task-bar-a')).toBeNull();
      expect(testid(page, 'custom-task-bar-a').innerHTML).toBe('<em>a</em>');
    });

    it('renders a custom task bar from an element', async () => {
      const node = document.createElement('span');
      node.textContent = 'node bar';
      const page = await setup(JAN_TASKS, { taskBarHtml: () => node });

      expect(testid(page, 'custom-task-bar-a').textContent).toBe('node bar');
    });

    it('emits tk-task-click from a custom bar too', async () => {
      const page = await setup(JAN_TASKS, { taskBarHtml: () => '<em>x</em>' });
      const onClick = jest.fn();
      page.root.addEventListener('tk-task-click', onClick);

      (testid(page, 'custom-task-bar-trigger-a') as HTMLElement).click();

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('tooltips', () => {
    it('renders the default tooltip with start and end dates', async () => {
      const page = await setup(JAN_TASKS, { locale: 'en-US' });

      expect(testid(page, 'tooltip-title-a').textContent).toBe('a');
      expect(testid(page, 'tooltip-start-a').textContent).toContain('2024');
      expect(testid(page, 'tooltip-end-a').textContent).toContain('2024');
    });

    it('adds a progress row only when progress is set', async () => {
      const withProgress = await setup([task('a', iso(2024, 1, 10), iso(2024, 1, 20), { progress: 30 })]);
      expect(testid(withProgress, 'tooltip-progress-a').textContent).toContain('30');

      const without = await setup(JAN_TASKS);
      expect(testid(without, 'tooltip-progress-a')).toBeNull();
    });

    it('renders a custom tooltip from an html string', async () => {
      const page = await setup(JAN_TASKS, { tooltipHtml: (t: IGanttTask) => `<b>${t.name}</b>` });

      expect(testid(page, 'custom-tooltip-a').innerHTML).toBe('<b>a</b>');
      expect(testid(page, 'tooltip-title-a')).toBeNull();
    });

    it('renders a custom tooltip from an element', async () => {
      const node = document.createElement('span');
      node.textContent = 'node tip';
      const page = await setup(JAN_TASKS, { tooltipHtml: () => node });

      expect(testid(page, 'custom-tooltip-a').textContent).toBe('node tip');
    });
  });

  describe('scroll syncing', () => {
    it('mirrors timeline scrolling onto the panel', async () => {
      const page = await setup(JAN_TASKS);
      const instance = page.rootInstance as any;

      instance.panelRef = { scrollTop: 0 };
      instance.handleTimelineScroll({ target: { scrollTop: 120 } });

      expect(instance.panelRef.scrollTop).toBe(120);
    });

    it('mirrors panel scrolling onto the timeline', async () => {
      const page = await setup(JAN_TASKS);
      const instance = page.rootInstance as any;

      instance.timelineRef = { scrollTop: 0 };
      instance.handlePanelScroll({ target: { scrollTop: 80 } });

      expect(instance.timelineRef.scrollTop).toBe(80);
    });

    it('ignores scrolling when the counterpart is missing', async () => {
      const page = await setup(JAN_TASKS);
      const instance = page.rootInstance as any;

      instance.panelRef = null;
      instance.timelineRef = null;

      expect(() => instance.handleTimelineScroll({ target: { scrollTop: 10 } })).not.toThrow();
      expect(() => instance.handlePanelScroll({ target: { scrollTop: 10 } })).not.toThrow();
    });
  });

  describe('data-testid', () => {
    it('emits no test ids when the prop is absent', async () => {
      const page = await newSpecPage({ components: [TkGanttChart], html: `<tk-gantt-chart></tk-gantt-chart>` });

      page.root.tasks = JAN_TASKS;
      await page.waitForChanges();

      expect(shadow(page).querySelectorAll('[data-testid]')).toHaveLength(0);
    });
  });
});
