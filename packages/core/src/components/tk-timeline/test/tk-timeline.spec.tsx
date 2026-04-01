import { newSpecPage } from '@stencil/core/testing';
import { TkTimeline } from '../tk-timeline';

const originalMutationObserver = globalThis.MutationObserver;

class MockMutationObserver {
  constructor() {}
  observe() {}
  disconnect() {}
  takeRecords(): unknown[] {
    return [];
  }
}

describe('tk-timeline', () => {
  beforeAll(() => {
    (globalThis as typeof globalThis & { MutationObserver: typeof MutationObserver }).MutationObserver = MockMutationObserver as unknown as typeof MutationObserver;
  });

  afterAll(() => {
    (globalThis as typeof globalThis & { MutationObserver: typeof MutationObserver }).MutationObserver = originalMutationObserver;
  });

  it('renders all generated items at the end placement when alternate is false', async () => {
    const page = await newSpecPage({
      components: [TkTimeline],
      html: `<tk-timeline></tk-timeline>`,
    });

    page.root.alternate = false;
    page.root.items = [{ title: 'Start' }, { title: 'End' }];
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelectorAll('.tk-timeline-item-placement-end')).toHaveLength(2);
  });
});
