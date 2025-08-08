import { p as proxyCustomElement, H, c as createEvent, h } from './p-F5eU3Bfi.js';

const tkAccordionCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}.tk-accordion{display:block}';

const TkAccordion$1 = /*@__PURE__*/ proxyCustomElement(
  class TkAccordion extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkAccordionItemSelected = createEvent(this, 'tkAccordionItemSelected', 7);
      this.internalActiveIndex = [];
      /**
       * Allows multiple accordion items to be expanded simultaneously.
       * @defaultValue false
       */
      this.allowMultiple = false;
      /**
       * Sets the position of opening and closing chevrons.
       * @defaultValue 'right'
       */
      this.arrowPosition = 'right';
      /**
       * Sets the expand icon
       * @defaultValue 'keyboard_arrow_down'
       */
      this.expandIcon = 'keyboard_arrow_down';
      /**
       * Sets the collapse icon
       * @defaultValue 'keyboard_arrow_up'
       */
      this.collapseIcon = 'keyboard_arrow_up';
      /**
       * Whether to hide the arrow icons.
       * @defaultValue false
       */
      this.hideArrows = false;
      /**
       * Sets accordion style for the component.
       * @defaultValue 'grouped'
       */
      this.type = 'grouped';
    }
    activeIndexChanged() {
      const normalized = this.normalizeActiveIndex();
      if (JSON.stringify(normalized) !== JSON.stringify(this.internalActiveIndex)) {
        this.internalActiveIndex = normalized;
        this.updateItems();
      }
    }
    componentDidLoad() {
      this.internalActiveIndex = this.normalizeActiveIndex();
      this.updateItems();
    }
    normalizeActiveIndex() {
      if (this.activeIndex === undefined || this.activeIndex === null) return [];
      if (Array.isArray(this.activeIndex)) {
        if (!this.allowMultiple) {
          const lastItem = this.activeIndex[this.activeIndex.length - 1];
          return lastItem !== undefined ? [lastItem] : [];
        }
        return this.activeIndex;
      }
      return [this.activeIndex];
    }
    isIndexActive(index) {
      return this.internalActiveIndex.map(String).includes(String(index));
    }
    toggleItem(index) {
      const isActive = this.isIndexActive(index);
      if (this.allowMultiple) {
        const currentActive = [...this.internalActiveIndex];
        const newActive = isActive ? currentActive.filter(i => String(i) !== String(index)) : [...currentActive, index];
        this.internalActiveIndex = newActive;
      } else {
        this.internalActiveIndex = isActive ? [] : [index];
      }
      this.tkAccordionItemSelected.emit({
        index,
        active: !isActive,
      });
      this.updateItems();
    }
    updateItems() {
      const items = Array.from(this.el.querySelectorAll('tk-accordion-item')).filter(child => child.parentElement === this.el);
      items.forEach((item, index) => {
        const itemKey = item.getAttribute('item-key') !== null ? item.getAttribute('item-key') : String(index);
        item.active = this.isIndexActive(itemKey);
        item.toggleItem = () => this.toggleItem(itemKey);
      });
    }
    render() {
      return h('div', { key: 'f62ba4a5c662034b5d0472443b43e5c4e3a9ce91', class: 'tk-accordion' }, h('slot', { key: 'e4944b5879f70f8eb717f2004a2ae6994d8672ef' }));
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        activeIndex: ['activeIndexChanged'],
      };
    }
    static get style() {
      return tkAccordionCss;
    }
  },
  [
    1,
    'tk-accordion',
    {
      activeIndex: [1032, 'active-index'],
      allowMultiple: [4, 'allow-multiple'],
      arrowPosition: [1, 'arrow-position'],
      expandIcon: [1, 'expand-icon'],
      collapseIcon: [1, 'collapse-icon'],
      hideArrows: [4, 'hide-arrows'],
      type: [1],
      internalActiveIndex: [32],
    },
    undefined,
    {
      activeIndex: ['activeIndexChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-accordion'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-accordion':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkAccordion$1);
        }
        break;
    }
  });
}

const TkAccordion = TkAccordion$1;
const defineCustomElement = defineCustomElement$1;

export { TkAccordion, defineCustomElement };
//# sourceMappingURL=tk-accordion.js.map

//# sourceMappingURL=tk-accordion.js.map
