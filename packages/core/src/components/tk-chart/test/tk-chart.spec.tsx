jest.mock('lodash-es', () => ({
  merge: (...items: Record<string, unknown>[]) => Object.assign({}, ...items),
}));

jest.mock('chart.js/auto', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((_ctx: unknown, config: Record<string, unknown>) => ({
    config,
    data: config.data,
    options: config.options,
    update: jest.fn(),
    destroy: jest.fn(),
    toBase64Image: jest.fn(() => 'data:image/png;base64,chart'),
  })),
}));

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import Chart from 'chart.js/auto';
import { TkChart } from '../tk-chart';

interface MockChart {
  config: { type: string; data: unknown; options: Record<string, unknown>; plugins: unknown[] };
  data: unknown;
  options: Record<string, unknown>;
  update: jest.Mock;
  destroy: jest.Mock;
  toBase64Image: jest.Mock;
}

const ChartMock = Chart as unknown as jest.Mock;
const chartAt = (index: number): MockChart => ChartMock.mock.results[index].value;
const latestChart = (): MockChart => ChartMock.mock.results.slice(-1)[0].value;
const setup = async (html = `<tk-chart></tk-chart>`) => newSpecPage({ components: [TkChart], html });
const containerOf = (page: SpecPage) => page.root.querySelector('.tk-chart-container') as HTMLElement;
const sampleData = { labels: ['A', 'B'], datasets: [{ data: [1, 2] }] };

describe('tk-chart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uses the accessibility label on the canvas', async () => {
    const page = await newSpecPage({
      components: [TkChart],
      html: `<tk-chart></tk-chart>`,
    });

    page.root.data = { labels: ['A'], datasets: [{ data: [1] }] };
    page.root.accessibilityLabel = 'Revenue chart';
    await page.waitForChanges();

    expect(page.root.querySelector('canvas')?.getAttribute('aria-label')).toBe('Revenue chart');
  });

  describe('rendering', () => {
    it('renders a bar chart container with a generic image label by default', async () => {
      const page = await setup();
      const canvas = page.root.querySelector('canvas');

      expect(containerOf(page).classList.contains('tk-chart-bar')).toBe(true);
      expect(canvas.getAttribute('role')).toBe('img');
      expect(canvas.getAttribute('aria-label')).toBe('Chart');
    });

    it('falls back to the chart title from options for the accessibility label', async () => {
      const page = await setup();

      page.root.options = { plugins: { title: { text: 'Sales by region' } } };
      await page.waitForChanges();

      expect(page.root.querySelector('canvas').getAttribute('aria-label')).toBe('Sales by region');
    });

    it('sizes the container from the width and height props', async () => {
      const page = await setup(`<tk-chart width="50%" height="320"></tk-chart>`);

      expect(containerOf(page).style.width).toBe('50%');
      expect(containerOf(page).style.height).toBe('320px');
    });

    it('reflects the chart type in the container class', async () => {
      const page = await setup(`<tk-chart type="doughnut"></tk-chart>`);

      expect(containerOf(page).classList.contains('tk-chart-doughnut')).toBe(true);
    });
  });

  describe('chart creation', () => {
    it('creates a Chart.js instance on the canvas context with type, data and plugins', async () => {
      const plugin = { id: 'custom' };
      const page = await newSpecPage({ components: [TkChart], html: `<tk-chart type="pie"></tk-chart>` });
      // props set through attributes are strings, so wire the object props and rebuild via a type change
      page.root.data = sampleData;
      page.root.plugins = [plugin];
      page.root.type = 'bar';
      await page.waitForChanges();

      expect(ChartMock).toHaveBeenLastCalledWith(expect.objectContaining({ context: '2d' }), expect.objectContaining({ type: 'bar', data: sampleData, plugins: [plugin] }));
    });

    it('applies the bar chart defaults when no options are given', async () => {
      await setup();

      expect(latestChart().config.options).toMatchObject({ responsive: true, maintainAspectRatio: false, indexAxis: 'x' });
    });

    it.each([
      ['horizontal-bar', { indexAxis: 'y' }],
      ['pie', { cutout: '0%' }],
      ['doughnut', { cutout: '50%' }],
    ])('applies the %s defaults', async (type, expected) => {
      await setup(`<tk-chart type="${type}"></tk-chart>`);

      expect(latestChart().config.type).toBe(type);
      expect(latestChart().config.options).toMatchObject({ responsive: true, ...expected });
    });

    it('applies only the shared defaults for a type without its own preset', async () => {
      await setup(`<tk-chart type="line"></tk-chart>`);

      expect(latestChart().config.options).toMatchObject({ responsive: true });
      expect(latestChart().config.options).not.toHaveProperty('indexAxis');
      expect(latestChart().config.options).not.toHaveProperty('cutout');
    });

    it('lets user options override the defaults', async () => {
      const page = await setup();

      page.root.options = { responsive: false, animation: false };
      await page.waitForChanges();

      expect(latestChart().options).toMatchObject({ responsive: false, animation: false, indexAxis: 'x' });
    });

    it('does not create a chart when the canvas has no 2d context', async () => {
      const page = await setup();
      const canvas = page.root.querySelector('canvas');
      canvas.getContext = () => null;

      page.root.type = 'pie';
      await page.waitForChanges();

      expect(ChartMock).toHaveBeenCalledTimes(1);
      await expect(page.root.getChart()).resolves.toBeUndefined();
    });
  });

  describe('prop updates', () => {
    it('pushes new data into the chart and redraws it', async () => {
      const page = await setup();
      const chart = latestChart();

      page.root.data = sampleData;
      await page.waitForChanges();

      expect(chart.data).toBe(sampleData);
      expect(chart.update).toHaveBeenCalledTimes(1);
    });

    it('re-merges options with the defaults and redraws when options change', async () => {
      const page = await setup();
      const chart = latestChart();

      page.root.options = { plugins: { legend: { display: true } } };
      await page.waitForChanges();

      expect(chart.options).toMatchObject({ indexAxis: 'x', plugins: { legend: { display: true } } });
      expect(chart.update).toHaveBeenCalledTimes(1);
    });

    it('destroys and rebuilds the chart with the new type when type changes', async () => {
      const page = await setup();
      const original = chartAt(0);

      page.root.type = 'pie';
      await page.waitForChanges();

      expect(original.destroy).toHaveBeenCalledTimes(1);
      expect(ChartMock).toHaveBeenCalledTimes(2);
      expect(latestChart().config.type).toBe('pie');
      expect(latestChart().config.options).toMatchObject({ cutout: '0%' });
      expect(containerOf(page).classList.contains('tk-chart-pie')).toBe(true);
      await expect(page.root.getChart()).resolves.toBe(latestChart());
    });
  });

  describe('public methods', () => {
    it('getChart() exposes the Chart.js instance', async () => {
      const page = await setup();

      await expect(page.root.getChart()).resolves.toBe(latestChart());
    });

    it('getCanvas() returns the rendered canvas element', async () => {
      const page = await setup();

      await expect(page.root.getCanvas()).resolves.toBe(page.root.querySelector('canvas'));
    });

    it('getBase64Image() returns the chart image data url', async () => {
      const page = await setup();

      await expect(page.root.getBase64Image()).resolves.toBe('data:image/png;base64,chart');
      expect(latestChart().toBase64Image).toHaveBeenCalledTimes(1);
    });

    it('refresh() redraws the chart', async () => {
      const page = await setup();

      await page.root.refresh();

      expect(latestChart().update).toHaveBeenCalledTimes(1);
    });

    it('getBase64Image() and refresh() are safe once the chart is gone', async () => {
      const page = await setup();
      const chart = latestChart();
      page.root.remove();
      await page.waitForChanges();

      await expect(page.root.getBase64Image()).resolves.toBeUndefined();
      await expect(page.root.refresh()).resolves.toBeUndefined();
      expect(chart.update).not.toHaveBeenCalled();
    });
  });

  describe('teardown', () => {
    it('destroys the chart and drops the instance when the element is removed', async () => {
      const page = await setup();
      const chart = latestChart();

      page.root.remove();
      await page.waitForChanges();

      expect(chart.destroy).toHaveBeenCalledTimes(1);
      await expect(page.root.getChart()).resolves.toBeUndefined();
    });
  });
});
