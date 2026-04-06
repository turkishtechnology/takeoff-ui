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
});
