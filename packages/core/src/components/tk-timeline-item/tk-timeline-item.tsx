import { Component, h, Element, Host } from '@stencil/core';
import { ComponentInterface } from '@stencil/core';

/**
 * The TimelineItem component for custom timeline content.
 * This component is used within the `tk-timeline` component to represent individual items in a timeline.
 * It automatically assigns a slot name based on its index within the parent timeline.
 * * @react `import { TkTimelineItem } from '@takeoff-ui/react'`
 * * @vue `import { TkTimelineItem } from '@takeoff-ui/vue'`
 * * @angular `import { TkTimelineItem } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-timeline-item',
  styleUrl: 'tk-timeline-item.scss',
  shadow: false,
})
export class TkTimelineItem implements ComponentInterface {
  @Element() el!: HTMLElement;

  componentDidLoad() {
    // Timeline item parent'a slot ismi ata
    const timeline = this.el.closest('tk-timeline');
    if (timeline) {
      const siblings = Array.from(timeline.querySelectorAll('tk-timeline-item'));
      const index = siblings.indexOf(this.el as any);
      this.el.slot = `item-${index}`;
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
