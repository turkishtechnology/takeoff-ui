import { Component, h, Prop, Element, Fragment } from '@stencil/core';
import { ComponentInterface } from '@stencil/core';
import classNames from 'classnames';
import { TimelineItem } from './interfaces';

/**
 * The `TkTimeline` is a component that displays a vertical or horizontal timeline of events.
 * The `TkTimelineItem` is a helper component used to create customized content within the `TkTimeline` component.
 * @react `import { TkTimeline, TkTimelineItem } from '@takeoff-ui/react'`
 * @vue `import { TkTimeline, TkTimelineItem } from '@takeoff-ui/vue'`
 * @angular `import { TkTimeline, TkTimelineItem } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-timeline',
  styleUrl: 'tk-timeline.scss',
  shadow: true,
})
export class TkTimeline implements ComponentInterface {
  @Element() el: HTMLTkTimelineElement;

  /**
   * An array of objects representing the items to display on the timeline.
   * Each object should have at least a `title`. `description` and `date` are optional.
   */
  @Prop() items: TimelineItem[] = [];

  /**
   * The orientation of the timeline.
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Whether to alternate the position of timeline items relative to the line.
   */
  @Prop() alternate: boolean = true;

  private determineContentPlacement(index: number): 'start' | 'end' {
    if (!this.alternate) {
      return 'end';
    }
    const isEvenItem = index % 2 === 0;
    return isEvenItem ? 'end' : 'start';
  }

  private createItemContent(item: TimelineItem) {
    return (
      <Fragment>
        <div class="tk-timeline-item-content-inner">
          {item.title && <div class="tk-timeline-item-title">{item.title}</div>}
          {item.description && <div class="tk-timeline-item-description">{item.description}</div>}
        </div>
        {item.date && <div class="tk-timeline-item-date">{item.date}</div>}
      </Fragment>
    );
  }

  private renderTimelineItem(item: TimelineItem, index: number) {
    const contentPlacement = this.determineContentPlacement(index);
    const isFirst = index === 0;
    const isLast = index === this.items.length - 1;
    const itemClasses = classNames('tk-timeline-item', `tk-timeline-item-placement-${contentPlacement}`, {
      'tk-timeline-item-first': isFirst,
      'tk-timeline-item-last': isLast,
      'tk-timeline-item-alternate': this.alternate,
    });

    return (
      <li class={itemClasses}>
        <div class="tk-timeline-item-content tk-timeline-item-content-start">{contentPlacement === 'start' && this.createItemContent(item)}</div>
        <div class="tk-timeline-item-separator">
          <div class="tk-timeline-item-point"></div>
          <div class="tk-timeline-item-connector"></div>
        </div>
        <div class="tk-timeline-item-content tk-timeline-item-content-end">{contentPlacement === 'end' && this.createItemContent(item)}</div>
      </li>
    );
  }

  private renderSlottedTimelineItems() {
    const timelineItems = Array.from(this.el.querySelectorAll('tk-timeline-item'));

    return timelineItems.map((item, index) => {
      const contentPlacement = this.determineContentPlacement(index);
      const isFirst = index === 0;
      const isLast = index === timelineItems.length - 1;
      const itemClasses = classNames('tk-timeline-item', `tk-timeline-item-placement-${contentPlacement}`, {
        'tk-timeline-item-first': isFirst,
        'tk-timeline-item-last': isLast,
        'tk-timeline-item-alternate': this.alternate,
      });

      // Set attributes on the timeline item for styling purposes
      item.setAttribute('data-class', `tk-timeline-item-${index}`);
      item.setAttribute('data-index', index.toString());

      return (
        <li class={itemClasses}>
          <div class="tk-timeline-item-content tk-timeline-item-content-start">{contentPlacement === 'start' && <slot name={`item-${index}`}></slot>}</div>
          <div class="tk-timeline-item-separator">
            <div class="tk-timeline-item-point"></div>
            <div class="tk-timeline-item-connector"></div>
          </div>
          <div class="tk-timeline-item-content tk-timeline-item-content-end">{contentPlacement === 'end' && <slot name={`item-${index}`}></slot>}</div>
        </li>
      );
    });
  }

  private hasSlottedContent(): boolean {
    return this.el.querySelectorAll('tk-timeline-item').length > 0;
  }

  render() {
    const hostClasses = classNames('tk-timeline', `tk-timeline-${this.orientation}`);
    const hasSlottedItems = this.hasSlottedContent();

    return (
      <div class={hostClasses}>
        <ul class="tk-timeline-items">
          {hasSlottedItems ? <Fragment>{this.renderSlottedTimelineItems()}</Fragment> : this.items.map((item, index) => this.renderTimelineItem(item, index))}
        </ul>
      </div>
    );
  }
}
