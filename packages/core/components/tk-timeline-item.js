import { p as proxyCustomElement, H, h, d as Host } from './p-F5eU3Bfi.js';

const tkTimelineItemCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}';

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
      return tkTimelineItemCss;
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
