import { p as proxyCustomElement, H, h, d as Host } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$2 } from './p-75KyitY6.js';

const tkAccordionItemCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}.tk-accordion-item{margin:10px auto}.tk-accordion-item .header{display:flex;justify-content:space-between;align-items:center;cursor:pointer;color:var(--text-darkest)}.tk-accordion-item .header .tk-accordion-item-icon-collapse{color:var(--primary-base)}.tk-accordion-item .title{flex-grow:1}.tk-accordion-item .icon{transition:transform 0.3s;margin-bottom:-5px}.tk-accordion-item.grouped{gap:10px;border-radius:var(--accordion-base-radius);border:1px solid var(--border-light);background:var(--static-light)}.tk-accordion-item.grouped .header{border-radius:var(--accordion-base-radius)}.tk-accordion-item.grouped .header:hover{background:var(--background-lightest)}.tk-accordion-item.grouped.open .header{border-radius:var(--accordion-base-radius) var(--accordion-base-radius) 0 0}.tk-accordion-item.grouped .content{color:var(--text-dark);max-height:0;transition:max-height 0.2s ease-out, opacity 0.2s ease-out;opacity:0;padding-top:5px;display:none}.tk-accordion-item.grouped .content.open{max-height:100%;opacity:1;display:block}.tk-accordion-item.grouped.base .header{font-size:14px;font-weight:400;line-height:var(--desktop-body-s-line-height);gap:var(--accordion-base-gap);padding:var(--accordion-base-v-padding) var(--accordion-base-h-padding)}.tk-accordion-item.grouped.base .content{padding:0 var(--accordion-base-v-padding) var(--accordion-base-h-padding)}.tk-accordion-item.grouped.large .header{font-size:16px;font-weight:400;line-height:var(--desktop-body-m-base-line-height);padding:var(--accordion-large-v-padding) var(--accordion-large-h-padding);gap:var(--accordion-large-gap)}.tk-accordion-item.grouped.large .content{padding:0 var(--accordion-large-v-padding) var(--accordion-large-h-padding)}.tk-accordion-item.divided .header{gap:10px;border-radius:var(--accordion-base-radius);border:1px solid var(--border-light);background:var(--static-light)}.tk-accordion-item.divided .header:hover{background:var(--background-lightest)}.tk-accordion-item.divided .content{color:var(--text-dark);border-radius:var(--accordion-base-radius);border:1px solid var(--border-light);background:var(--background-lightest);max-height:0;transition:max-height 0.2s ease-out, opacity 0.2s ease-out;opacity:0;display:none}.tk-accordion-item.divided .content.open{margin-top:6px;max-height:100%;opacity:1;display:block}.tk-accordion-item.divided.base .header{padding:var(--accordion-base-v-padding) var(--accordion-base-h-padding);gap:var(--accordion-base-gap);font-size:14px;font-weight:400;line-height:var(--desktop-body-s-line-height)}.tk-accordion-item.divided.base .content{padding:var(--accordion-base-v-padding) var(--accordion-base-h-padding);font-size:var(--desktop-body-xs-size);font-style:normal;font-weight:300;line-height:var(--desktop-body-xs-line-height)}.tk-accordion-item.divided.large{padding:var(--accordion-large-v-padding) var(--accordion-large-h-padding);gap:var(--accordion-large-gap)}.tk-accordion-item.divided.large .header{font-size:16px;font-weight:400;line-height:var(--desktop-body-m-large-line-height)}.tk-accordion-item.divided.large .content{padding:var(--accordion-large-v-padding) var(--accordion-large-h-padding);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:300;line-height:var(--desktop-body-s-line-height)}';

const TkAccordionItem$1 = /*@__PURE__*/ proxyCustomElement(
  class TkAccordionItem extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.type = 'grouped';
      this.arrowPosition = 'right';
      this.hideArrows = false;
      this.hasHeaderSlot = false;
      /**
       * Sets if the accordion is active.
       * @defaultValue false
       */
      this.active = false;
      /**
       * Sets size for the component.
       * @defaultValue 'base'
       */
      this.size = 'base';
    }
    componentWillLoad() {
      this.parentEl = this.el.closest('tk-accordion');
      if (this.parentEl) {
        this.type = this.parentEl.type;
        this.arrowPosition = this.parentEl.arrowPosition;
        this.expandIcon = this.parentEl.expandIcon;
        this.collapseIcon = this.parentEl.collapseIcon;
        this.hideArrows = this.parentEl.hideArrows;
      }
      this.hasHeaderSlot = !!this.el.querySelector(':scope > [slot="header"]');
    }
    createIcon() {
      if (this.hideArrows) return null;
      let _renderIcon;
      if (this.active) {
        _renderIcon = this.collapseIcon;
      } else {
        _renderIcon = this.expandIcon;
      }
      const icon = h(
        'tk-icon',
        Object.assign(
          {},
          getIconElementProps(_renderIcon, { class: classNames({ 'tk-accordion-item-icon-collapse': this.active }), variant: null, size: 'large' }, 'outlined', 'span'),
        ),
      );
      return h('span', { class: 'icon' }, icon);
    }
    createHeader() {
      if (this.hasHeaderSlot) {
        return h('slot', { name: 'header' });
      }
      return this.header || '';
    }
    render() {
      const rootClasses = classNames('tk-accordion-item', this.size, this.type, {
        open: this.active,
      });
      const icon = h('tk-icon', Object.assign({ key: '800e9c76aa5a87d5a53bd236fc2b45efa3302597' }, getIconElementProps(this.icon, { variant: 'neutral', sign: true })));
      return h(
        Host,
        { key: '5ec9e53c253c72edfc19d0c330723226db28edf4' },
        h(
          'div',
          { key: '78ad024da7e0bbb1a78c06fba677bb02c5b6c18b', class: rootClasses },
          h(
            'div',
            { key: '917d8d905c6bf788dc923bf789cfe83b599a0945', class: 'header', onClick: this.toggleItem },
            this.arrowPosition === 'left' && this.createIcon(),
            icon,
            h('span', { key: '54c5b677137ed0278954a702a18bb768b18038aa', class: 'title' }, this.createHeader()),
            this.arrowPosition === 'right' && this.createIcon(),
          ),
          h(
            'div',
            { key: '2fef44306aa38f2a870bc5932cd7056c9ca84029', class: `content ${this.active ? 'open' : ''}` },
            h('slot', { key: '8fbc5919ea6a93efd13bc893adf910b496aea215', name: 'content' }),
          ),
        ),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkAccordionItemCss;
    }
  },
  [
    1,
    'tk-accordion-item',
    {
      active: [4],
      itemKey: [513, 'item-key'],
      header: [1],
      toggleItem: [16, 'toggle-item'],
      size: [1],
      icon: [1],
      type: [32],
      arrowPosition: [32],
      expandIcon: [32],
      collapseIcon: [32],
      hideArrows: [32],
      hasHeaderSlot: [32],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-accordion-item', 'tk-icon'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-accordion-item':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkAccordionItem$1);
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
    }
  });
}

const TkAccordionItem = TkAccordionItem$1;
const defineCustomElement = defineCustomElement$1;

export { TkAccordionItem, defineCustomElement };
//# sourceMappingURL=tk-accordion-item.js.map

//# sourceMappingURL=tk-accordion-item.js.map
