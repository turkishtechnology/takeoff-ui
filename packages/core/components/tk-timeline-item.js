import { p as proxyCustomElement, H, h, d as Host } from './p-B4rZamdt.js';

const tkTimelineItemScss = ':host{display:block}';

const TkTimelineItem$1 = /*@__PURE__*/ proxyCustomElement(
  class TkTimelineItem extends H {
    constructor() {
      super();
      this.__registerHost();
    }
    componentDidLoad() {
      // Timeline item parent'a slot ismi ata
      const timeline = this.el.closest('tk-timeline');
      if (timeline) {
        const siblings = Array.from(timeline.querySelectorAll('tk-timeline-item'));
        const index = siblings.indexOf(this.el);
        this.el.slot = `item-${index}`;
      }
    }
    render() {
      return h(Host, { key: '490f218155417cf446313054b25eceb39e9c9c8b' }, h('slot', { key: '168504511627baac5284d5f2a5ff7b45e1f8a9b9' }));
    }
    get el() {
      return this;
    }
    static get style() {
      return tkTimelineItemScss;
    }
  },
  [4, 'tk-timeline-item'],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-timeline-item'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-timeline-item':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkTimelineItem$1);
        }
        break;
    }
  });
}

const TkTimelineItem = TkTimelineItem$1;
const defineCustomElement = defineCustomElement$1;

export { TkTimelineItem, defineCustomElement };
//# sourceMappingURL=tk-timeline-item.js.map

//# sourceMappingURL=tk-timeline-item.js.map
