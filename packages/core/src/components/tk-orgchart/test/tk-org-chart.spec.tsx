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

import { newSpecPage } from '@stencil/core/testing';
import { TkOrgChart } from '../tk-org-chart';

describe('tk-org-chart', () => {
  it('renders the org chart container with an accessibility label', async () => {
    const page = await newSpecPage({
      components: [TkOrgChart],
      html: `<tk-org-chart></tk-org-chart>`,
    });

    page.root.accessibilityLabel = 'Org chart';
    page.root.data = [{ id: 1, name: 'CEO' }];
    await page.waitForChanges();

    expect(page.root.querySelector('.tk-org-chart-container')?.getAttribute('aria-label')).toBe('Org chart');
  });
});
