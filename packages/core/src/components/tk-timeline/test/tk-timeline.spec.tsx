import { newSpecPage } from '@stencil/core/testing';
import { TkTimeline } from '../tk-timeline';
import { TkTimelineItem } from '../../tk-timeline-item/tk-timeline-item';

const originalMutationObserver = globalThis.MutationObserver;

class MockMutationObserver {
  static lastInstance: MockMutationObserver | undefined;
  private callback?: MutationCallback;

  constructor(callback?: MutationCallback) {
    this.callback = callback;
    MockMutationObserver.lastInstance = this;
  }
  observe() {}
  disconnect() {}
  takeRecords(): unknown[] {
    return [];
  }
  trigger() {
    this.callback?.([], this as unknown as MutationObserver);
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

  it('alternates item placement when alternate is true', async () => {
    const page = await newSpecPage({
      components: [TkTimeline],
      html: `<tk-timeline></tk-timeline>`,
    });

    page.root.items = [{ title: 'One' }, { title: 'Two' }, { title: 'Three' }];
    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll('li.tk-timeline-item');
    expect(items[0].classList.contains('tk-timeline-item-placement-end')).toBe(true);
    expect(items[1].classList.contains('tk-timeline-item-placement-start')).toBe(true);
    expect(items[2].classList.contains('tk-timeline-item-placement-end')).toBe(true);
    expect(items[0].classList.contains('tk-timeline-item-first')).toBe(true);
    expect(items[2].classList.contains('tk-timeline-item-last')).toBe(true);
    expect(items[0].querySelector('.tk-timeline-item-content-start')).toBeTruthy();
  });

  it('does not render start content wrappers when alternate is false', async () => {
    const page = await newSpecPage({
      components: [TkTimeline],
      html: `<tk-timeline></tk-timeline>`,
    });

    page.root.alternate = false;
    page.root.items = [{ title: 'One' }, { title: 'Two' }];
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('.tk-timeline-item-content-start')).toBeNull();
  });

  it('renders title, description and date only when provided', async () => {
    const page = await newSpecPage({
      components: [TkTimeline],
      html: `<tk-timeline></tk-timeline>`,
    });

    page.root.items = [{ title: 'Full', description: 'Details', date: '2026-01-01' }, { title: 'Only title' }];
    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll('li.tk-timeline-item');
    expect(items[0].querySelector('.tk-timeline-item-title').textContent).toBe('Full');
    expect(items[0].querySelector('.tk-timeline-item-description').textContent).toBe('Details');
    expect(items[0].querySelector('.tk-timeline-item-date').textContent).toBe('2026-01-01');
    expect(items[1].querySelector('.tk-timeline-item-description')).toBeNull();
    expect(items[1].querySelector('.tk-timeline-item-date')).toBeNull();
  });

  it('applies the orientation class on the container', async () => {
    const page = await newSpecPage({
      components: [TkTimeline],
      html: `<tk-timeline orientation="vertical"></tk-timeline>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-timeline-vertical')).toBeTruthy();
  });

  it('applies data-testid attributes to generated items', async () => {
    const page = await newSpecPage({
      components: [TkTimeline],
      html: `<tk-timeline data-testid="tl"></tk-timeline>`,
    });

    page.root.items = [{ title: 'One', description: 'Desc', date: 'Today' }];
    await page.waitForChanges();

    const shadowRoot = page.root.shadowRoot;
    expect(shadowRoot.querySelector('[data-testid="tl-container"]')).toBeTruthy();
    expect(shadowRoot.querySelector('[data-testid="tl-items"]')).toBeTruthy();
    expect(shadowRoot.querySelector('[data-testid="tl-item-0"]')).toBeTruthy();
    expect(shadowRoot.querySelector('[data-testid="tl-item-title-0"]')).toBeTruthy();
    expect(shadowRoot.querySelector('[data-testid="tl-item-description-0"]')).toBeTruthy();
    expect(shadowRoot.querySelector('[data-testid="tl-item-date-0"]')).toBeTruthy();
    expect(shadowRoot.querySelector('[data-testid="tl-item-point-0"]')).toBeTruthy();
    expect(shadowRoot.querySelector('[data-testid="tl-item-connector-0"]')).toBeTruthy();
  });

  it('renders slotted tk-timeline-item children with named slots', async () => {
    const page = await newSpecPage({
      components: [TkTimeline, TkTimelineItem],
      html: `<tk-timeline><tk-timeline-item>First</tk-timeline-item><tk-timeline-item>Second</tk-timeline-item></tk-timeline>`,
    });
    await page.waitForChanges();

    const listItems = page.root.shadowRoot.querySelectorAll('li.tk-timeline-item');
    expect(listItems).toHaveLength(2);
    expect(listItems[0].classList.contains('tk-timeline-item-placement-end')).toBe(true);
    expect(listItems[1].classList.contains('tk-timeline-item-placement-start')).toBe(true);

    const slottedItems = page.root.querySelectorAll('tk-timeline-item');
    expect(slottedItems[0].getAttribute('data-index')).toBe('0');
    expect(slottedItems[1].getAttribute('data-index')).toBe('1');
    expect(slottedItems[0].getAttribute('data-class')).toBe('tk-timeline-item-0');
    expect(page.root.shadowRoot.querySelector('slot[name="item-0"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('slot[name="item-1"]')).toBeTruthy();
  });

  it('renders slotted items at the end placement when alternate is false', async () => {
    const page = await newSpecPage({
      components: [TkTimeline, TkTimelineItem],
      html: `<tk-timeline alternate="false"><tk-timeline-item>First</tk-timeline-item><tk-timeline-item>Second</tk-timeline-item></tk-timeline>`,
    });
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelectorAll('li.tk-timeline-item-placement-end')).toHaveLength(2);
    expect(page.root.shadowRoot.querySelector('.tk-timeline-item-content-start')).toBeNull();
  });

  it('updates the rendered items when the mutation observer reports new children', async () => {
    const page = await newSpecPage({
      components: [TkTimeline, TkTimelineItem],
      html: `<tk-timeline><tk-timeline-item>First</tk-timeline-item></tk-timeline>`,
    });
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelectorAll('li.tk-timeline-item')).toHaveLength(1);

    const newItem = page.doc.createElement('tk-timeline-item');
    newItem.textContent = 'Second';
    page.root.appendChild(newItem);

    MockMutationObserver.lastInstance.trigger();
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelectorAll('li.tk-timeline-item')).toHaveLength(2);
  });

  it('disconnects the mutation observer on disconnectedCallback', async () => {
    const page = await newSpecPage({
      components: [TkTimeline],
      html: `<tk-timeline></tk-timeline>`,
    });

    const observer = MockMutationObserver.lastInstance;
    const disconnectSpy = jest.spyOn(observer, 'disconnect');

    page.root.remove();
    await page.waitForChanges();

    expect(disconnectSpy).toHaveBeenCalled();
  });
});
