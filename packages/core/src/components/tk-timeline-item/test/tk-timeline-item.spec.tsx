import { newSpecPage } from '@stencil/core/testing';
import { TkTimelineItem } from '../tk-timeline-item';

describe('tk-timeline-item', () => {
  it('assigns a slot name based on its index in the parent timeline', () => {
    const instance = new TkTimelineItem();
    const timelineItem = { slot: '', closest: jest.fn() };
    const timeline = { querySelectorAll: jest.fn(() => [timelineItem]) };

    timelineItem.closest.mockReturnValue(timeline);
    Object.defineProperty(instance, 'el', { value: timelineItem });

    instance.componentDidLoad();

    expect(timelineItem.slot).toBe('item-0');
  });

  it('renders slotted content', async () => {
    const page = await newSpecPage({
      components: [TkTimelineItem],
      html: `<tk-timeline-item>Custom content</tk-timeline-item>`,
    });

    expect(page.root.textContent).toContain('Custom content');
  });

  it('does not assign a slot name when there is no parent timeline', async () => {
    const page = await newSpecPage({
      components: [TkTimelineItem],
      html: `<tk-timeline-item>Orphan</tk-timeline-item>`,
    });

    expect(page.root.slot).toBeFalsy();
  });

  it('assigns index based slot names to each sibling in a timeline', async () => {
    const page = await newSpecPage({
      components: [TkTimelineItem],
      html: `<tk-timeline><tk-timeline-item>First</tk-timeline-item><tk-timeline-item>Second</tk-timeline-item></tk-timeline>`,
    });

    const items = page.body.querySelectorAll('tk-timeline-item');
    expect(items[0].slot).toBe('item-0');
    expect(items[1].slot).toBe('item-1');
  });
});
