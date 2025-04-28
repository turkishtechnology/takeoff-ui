import { Component, h, Prop, Element, Fragment } from '@stencil/core';
import { ComponentInterface } from '@stencil/core';
import classNames from 'classnames';
import { TimelineItem } from './interfaces';
/**
 * Timeline component to display a sequence of events.
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

  render() {
    const hostClasses = classNames('tk-timeline', `tk-timeline-${this.orientation}`);

    return (
      <div class={hostClasses}>
        <ul class="tk-timeline-items">{this.items.map((item, index) => this.renderTimelineItem(item, index))}</ul>
      </div>
    );
  }
}
