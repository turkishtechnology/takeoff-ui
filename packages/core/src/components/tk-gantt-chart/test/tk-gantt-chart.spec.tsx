import { newSpecPage } from '@stencil/core/testing';
import { TkGanttChart } from '../tk-gantt-chart';

describe('tk-gantt-chart', () => {
  it('renders the empty state when there are no tasks', async () => {
    const page = await newSpecPage({
      components: [TkGanttChart],
      html: `<tk-gantt-chart></tk-gantt-chart>`,
    });

    expect(page.root.shadowRoot.querySelector('[data-testid="gantt-empty"]')).toBeTruthy();
  });
});
