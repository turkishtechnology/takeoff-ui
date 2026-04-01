jest.mock('lodash-es', () => ({
  merge: (...items: Record<string, unknown>[]) => Object.assign({}, ...items),
}));

jest.mock('chart.js/auto', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    update: jest.fn(),
    destroy: jest.fn(),
    toBase64Image: jest.fn(),
  })),
}));

import { newSpecPage } from '@stencil/core/testing';
import { TkChart } from '../tk-chart';

describe('tk-chart', () => {
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
});
