import { Component, h, Prop, Element, Fragment, State } from '@stencil/core';
import { ComponentInterface } from '@stencil/core';
import classNames from 'classnames';
import { TimelineItem } from './types';
import { getDataTestId } from '../../utils/test-id-utils';

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

  private mutationObserver: MutationObserver;

  @State() slottedItemsCount: number = 0;

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

  /**
   * Sets the data-testid attribute on the root container element.
   */
  @Prop({ reflect: true }) dataTestid?: string;

  connectedCallback() {
    // MutationObserver ile DOM değişikliklerini izle
    if (typeof window !== 'undefined') {
      this.mutationObserver = new MutationObserver(() => {
        this.updateSlottedItemsCount();
      });

      this.mutationObserver.observe(this.el, {
        childList: true,
        subtree: true,
      });
    }
  }

  componentDidLoad() {
    this.updateSlottedItemsCount();
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private updateSlottedItemsCount() {
    const newCount = this.el.querySelectorAll('tk-timeline-item').length;
    if (newCount !== this.slottedItemsCount) {
      this.slottedItemsCount = newCount;
    }
  }

  private determineContentPlacement(index: number): 'start' | 'end' {
    if (!this.alternate) {
      return 'end';
    }
    const isEvenItem = index % 2 === 0;
    return isEvenItem ? 'end' : 'start';
  }

  private createItemContent(item: TimelineItem, index: number) {
    return (
      <Fragment>
        <div class="tk-timeline-item-content-inner" data-testid={getDataTestId(this.dataTestid, 'item-content', index.toString())}>
          {item.title && (
            <div class="tk-timeline-item-title" data-testid={getDataTestId(this.dataTestid, 'item-title', index.toString())}>
              {item.title}
            </div>
          )}
          {item.description && (
            <div class="tk-timeline-item-description" data-testid={getDataTestId(this.dataTestid, 'item-description', index.toString())}>
              {item.description}
            </div>
          )}
        </div>
        {item.date && (
          <div class="tk-timeline-item-date" data-testid={getDataTestId(this.dataTestid, 'item-date', index.toString())}>
            {item.date}
          </div>
        )}
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
      <li class={itemClasses} data-testid={getDataTestId(this.dataTestid, 'item', index.toString())}>
        <div class="tk-timeline-item-content tk-timeline-item-content-start" data-testid={getDataTestId(this.dataTestid, 'item-start', index.toString())}>
          {contentPlacement === 'start' && this.createItemContent(item, index)}
        </div>
        <div class="tk-timeline-item-separator" data-testid={getDataTestId(this.dataTestid, 'item-separator', index.toString())}>
          <div class="tk-timeline-item-point" data-testid={getDataTestId(this.dataTestid, 'item-point', index.toString())}></div>
          <div class="tk-timeline-item-connector" data-testid={getDataTestId(this.dataTestid, 'item-connector', index.toString())}></div>
        </div>
        <div class="tk-timeline-item-content tk-timeline-item-content-end" data-testid={getDataTestId(this.dataTestid, 'item-end', index.toString())}>
          {contentPlacement === 'end' && this.createItemContent(item, index)}
        </div>
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
        <li class={itemClasses} data-testid={getDataTestId(this.dataTestid, 'item', index.toString())}>
          <div class="tk-timeline-item-content tk-timeline-item-content-start" data-testid={getDataTestId(this.dataTestid, 'item-start', index.toString())}>
            {contentPlacement === 'start' && <slot name={`item-${index}`}></slot>}
          </div>
          <div class="tk-timeline-item-separator" data-testid={getDataTestId(this.dataTestid, 'item-separator', index.toString())}>
            <div class="tk-timeline-item-point" data-testid={getDataTestId(this.dataTestid, 'item-point', index.toString())}></div>
            <div class="tk-timeline-item-connector" data-testid={getDataTestId(this.dataTestid, 'item-connector', index.toString())}></div>
          </div>
          <div class="tk-timeline-item-content tk-timeline-item-content-end" data-testid={getDataTestId(this.dataTestid, 'item-end', index.toString())}>
            {contentPlacement === 'end' && <slot name={`item-${index}`}></slot>}
          </div>
        </li>
      );
    });
  }

  render() {
    const hostClasses = classNames('tk-timeline', `tk-timeline-${this.orientation}`);
    const hasSlottedItems = this.slottedItemsCount > 0;

    return (
      <div class={hostClasses} data-testid={getDataTestId(this.dataTestid, 'container')}>
        <ul class="tk-timeline-items" data-testid={getDataTestId(this.dataTestid, 'items')}>
          {hasSlottedItems ? <Fragment>{this.renderSlottedTimelineItems()}</Fragment> : this.items.map((item, index) => this.renderTimelineItem(item, index))}
        </ul>
      </div>
    );
  }
}
