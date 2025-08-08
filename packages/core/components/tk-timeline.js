import { p as proxyCustomElement, H, h, F as Fragment } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkTimelineScss =
  ":host {\n  display: block;\n}\n\n.tk-timeline {\n  position: relative;\n  width: 100%;\n  height: 100%;\n\n  .tk-timeline-items {\n    position: relative;\n    display: flex;\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    margin: 0;\n    list-style: none;\n\n    .tk-timeline-item {\n      position: relative;\n      display: flex;\n      gap: 4px;\n\n      .tk-timeline-item-content {\n        display: flex;\n        flex-direction: column;\n        flex: 1;\n        width: 100%;\n        gap: var(--spacing-xs);\n        box-sizing: border-box;\n\n        .tk-timeline-item-content-inner {\n          display: flex;\n          flex-direction: column;\n\n          .tk-timeline-item-title {\n            font-family: var(--desktop-body-s-font);\n            font-size: var(--desktop-body-s-size);\n            font-weight: var(--desktop-body-s-line-weight);\n            line-height: var(--desktop-body-s-line-height);\n            color: var(--text-dark);\n          }\n\n          .tk-timeline-item-description {\n            font-family: var(--desktop-body-xs-font);\n            font-size: var(--desktop-body-xs-size);\n            font-weight: var(--weight-regular);\n            line-height: var(--desktop-body-xs-line-height);\n            color: var(--text-base);\n          }\n        }\n\n        .tk-timeline-item-date {\n          font-family: var(--desktop-body-2xs-font);\n          font-size: var(--desktop-body-2xs-size);\n          font-weight: var(--desktop-body-2xs-line-weight);\n          line-height: var(--desktop-body-2xs-line-height);\n          color: var(--text-light);\n        }\n      }\n\n      .tk-timeline-item-separator {\n        display: flex;\n        z-index: 100;\n\n        .tk-timeline-item-point {\n          width: 10px;\n          height: 10px;\n          background-color: var(--primary-base);\n          border: 1px solid var(--primary-base);\n          border-radius: 8px;\n          margin: 5px;\n          padding: 5px;\n          box-sizing: border-box;\n          position: relative;\n          z-index: 200;\n          flex-shrink: 0;\n\n          &::after {\n            content: '';\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            transform: translate(-50%, -50%);\n            width: 4px;\n            height: 4px;\n            background-color: var(--static-light);\n            border-radius: var(--radius-full);\n          }\n        }\n\n        .tk-timeline-item-connector {\n          background-color: var(--border-light);\n          z-index: 100;\n        }\n      }\n\n      &.tk-timeline-item-last .tk-timeline-item-connector {\n        display: none;\n      }\n    }\n  }\n\n  &.tk-timeline-horizontal {\n    .tk-timeline-items {\n      flex-direction: row;\n      align-items: stretch;\n      padding: 0 var(--spacing-l);\n    }\n\n    .tk-timeline-item {\n      flex-direction: column;\n      flex: 1;\n      padding: 0;\n      min-width: 100px;\n\n      .tk-timeline-item-content {\n        text-align: left;\n        padding-left: 8px;\n        padding-right: 24px;\n        min-height: 20px;\n        height: 100%;\n        align-items: flex-start;\n\n        &.tk-timeline-item-content-start {\n          justify-content: flex-end;\n        }\n\n        &.tk-timeline-item-content-end {\n          justify-content: flex-start;\n        }\n      }\n\n      .tk-timeline-item-separator {\n        flex-direction: row;\n        align-items: center;\n        width: 100%;\n        flex-shrink: 0;\n      }\n\n      .tk-timeline-item-connector {\n        width: 100%;\n        height: 1px;\n        transform: translateY(-50%);\n      }\n\n      &:not(.tk-timeline-item-alternate) {\n        .tk-timeline-item-content-start {\n          min-height: 0;\n          padding: 0;\n\n          .tk-timeline-item-content-details {\n            visibility: hidden;\n          }\n        }\n      }\n    }\n  }\n\n  &.tk-timeline-vertical {\n    .tk-timeline-items {\n      flex-direction: column;\n      width: 100%;\n      align-items: stretch;\n    }\n\n    .tk-timeline-item {\n      flex-direction: row;\n      align-items: stretch;\n      position: relative;\n\n      .tk-timeline-item-content {\n        padding-bottom: 24px;\n\n        &.tk-timeline-item-content-start {\n          text-align: right;\n          justify-content: flex-end;\n          align-items: flex-end;\n        }\n\n        &.tk-timeline-item-content-end {\n          text-align: left;\n          justify-content: flex-start;\n          align-items: flex-start;\n        }\n      }\n\n      .tk-timeline-item-separator {\n        flex-direction: column;\n        align-items: center;\n        flex-shrink: 0;\n        box-sizing: border-box;\n      }\n\n      .tk-timeline-item-content-end {\n        text-align: left;\n        align-items: flex-start;\n        justify-content: flex-start;\n      }\n\n      .tk-timeline-item-connector {\n        width: 1px;\n        z-index: 100;\n        height: 100%;\n        transform: translateX(-50%);\n      }\n    }\n  }\n}\n";

const TkTimeline$1 = /*@__PURE__*/ proxyCustomElement(
  class TkTimeline extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.slottedItemsCount = 0;
      /**
       * An array of objects representing the items to display on the timeline.
       * Each object should have at least a `title`. `description` and `date` are optional.
       */
      this.items = [];
      /**
       * The orientation of the timeline.
       */
      this.orientation = 'horizontal';
      /**
       * Whether to alternate the position of timeline items relative to the line.
       */
      this.alternate = true;
    }
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
    updateSlottedItemsCount() {
      const newCount = this.el.querySelectorAll('tk-timeline-item').length;
      if (newCount !== this.slottedItemsCount) {
        this.slottedItemsCount = newCount;
      }
    }
    determineContentPlacement(index) {
      if (!this.alternate) {
        return 'end';
      }
      const isEvenItem = index % 2 === 0;
      return isEvenItem ? 'end' : 'start';
    }
    createItemContent(item) {
      return h(
        Fragment,
        null,
        h(
          'div',
          { class: 'tk-timeline-item-content-inner' },
          item.title && h('div', { class: 'tk-timeline-item-title' }, item.title),
          item.description && h('div', { class: 'tk-timeline-item-description' }, item.description),
        ),
        item.date && h('div', { class: 'tk-timeline-item-date' }, item.date),
      );
    }
    renderTimelineItem(item, index) {
      const contentPlacement = this.determineContentPlacement(index);
      const isFirst = index === 0;
      const isLast = index === this.items.length - 1;
      const itemClasses = classNames('tk-timeline-item', `tk-timeline-item-placement-${contentPlacement}`, {
        'tk-timeline-item-first': isFirst,
        'tk-timeline-item-last': isLast,
        'tk-timeline-item-alternate': this.alternate,
      });
      return h(
        'li',
        { class: itemClasses },
        h('div', { class: 'tk-timeline-item-content tk-timeline-item-content-start' }, contentPlacement === 'start' && this.createItemContent(item)),
        h('div', { class: 'tk-timeline-item-separator' }, h('div', { class: 'tk-timeline-item-point' }), h('div', { class: 'tk-timeline-item-connector' })),
        h('div', { class: 'tk-timeline-item-content tk-timeline-item-content-end' }, contentPlacement === 'end' && this.createItemContent(item)),
      );
    }
    renderSlottedTimelineItems() {
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
        return h(
          'li',
          { class: itemClasses },
          h('div', { class: 'tk-timeline-item-content tk-timeline-item-content-start' }, contentPlacement === 'start' && h('slot', { name: `item-${index}` })),
          h('div', { class: 'tk-timeline-item-separator' }, h('div', { class: 'tk-timeline-item-point' }), h('div', { class: 'tk-timeline-item-connector' })),
          h('div', { class: 'tk-timeline-item-content tk-timeline-item-content-end' }, contentPlacement === 'end' && h('slot', { name: `item-${index}` })),
        );
      });
    }
    render() {
      const hostClasses = classNames('tk-timeline', `tk-timeline-${this.orientation}`);
      const hasSlottedItems = this.slottedItemsCount > 0;
      return h(
        'div',
        { key: '4cb3322e25743daa6ea280921efa86c0d4183a08', class: hostClasses },
        h(
          'ul',
          { key: '5d76577816147976c3b24044b01ddab84b734ebd', class: 'tk-timeline-items' },
          hasSlottedItems ? h(Fragment, null, this.renderSlottedTimelineItems()) : this.items.map((item, index) => this.renderTimelineItem(item, index)),
        ),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkTimelineScss;
    }
  },
  [
    1,
    'tk-timeline',
    {
      items: [16],
      orientation: [1],
      alternate: [4],
      slottedItemsCount: [32],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-timeline'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-timeline':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkTimeline$1);
        }
        break;
    }
  });
}

const TkTimeline = TkTimeline$1;
const defineCustomElement = defineCustomElement$1;

export { TkTimeline, defineCustomElement };
//# sourceMappingURL=tk-timeline.js.map

//# sourceMappingURL=tk-timeline.js.map
