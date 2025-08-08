import { p as proxyCustomElement, H, h, d as Host } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$2 } from './p-DrRHtkyE.js';

const tkAccordionItemScss =
  '.tk-accordion-item {\n  margin: 10px auto;\n\n  .header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    cursor: pointer;\n    color: var(--text-darkest);\n\n    .tk-accordion-item-icon-collapse {\n      color: var(--primary-base);\n    }\n  }\n\n  .title {\n    flex-grow: 1;\n  }\n\n  .icon {\n    transition: transform 0.3s;\n    margin-bottom: -5px;\n  }\n\n  &.grouped {\n    gap: 10px;\n    border-radius: var(--accordion-base-radius);\n    border: 1px solid var(--border-light);\n    background: var(--static-light);\n\n    .header {\n      border-radius: var(--accordion-base-radius);\n\n      &:hover {\n        background: var(--background-lightest);\n      }\n    }\n\n    &.open .header {\n      border-radius: var(--accordion-base-radius) var(--accordion-base-radius) 0 0;\n    }\n\n    .content {\n      color: var(--text-dark);\n      max-height: 0;\n      transition:\n        max-height 0.2s ease-out,\n        opacity 0.2s ease-out;\n      opacity: 0;\n      padding-top: 5px;\n      display: none;\n\n      &.open {\n        max-height: 100%;\n        opacity: 1;\n        display: block;\n      }\n    }\n\n    &.base {\n      .header {\n        font-size: 14px;\n        font-weight: 400;\n        line-height: var(--desktop-body-s-line-height);\n        gap: var(--accordion-base-gap);\n        padding: var(--accordion-base-v-padding) var(--accordion-base-h-padding);\n      }\n\n      .content {\n        padding: 0 var(--accordion-base-v-padding) var(--accordion-base-h-padding);\n      }\n    }\n\n    &.large {\n      .header {\n        font-size: 16px;\n        font-weight: 400;\n        line-height: var(--desktop-body-m-base-line-height);\n        padding: var(--accordion-large-v-padding) var(--accordion-large-h-padding);\n        gap: var(--accordion-large-gap);\n      }\n\n      .content {\n        padding: 0 var(--accordion-large-v-padding) var(--accordion-large-h-padding);\n      }\n    }\n  }\n\n  &.divided {\n    .header {\n      gap: 10px;\n      border-radius: var(--accordion-base-radius);\n      border: 1px solid var(--border-light);\n      background: var(--static-light);\n\n      &:hover {\n        background: var(--background-lightest);\n      }\n    }\n\n    .content {\n      color: var(--text-dark);\n      border-radius: var(--accordion-base-radius);\n      border: 1px solid var(--border-light);\n      background: var(--background-lightest);\n      max-height: 0;\n      transition:\n        max-height 0.2s ease-out,\n        opacity 0.2s ease-out;\n      opacity: 0;\n      display: none;\n\n      &.open {\n        margin-top: 6px;\n        max-height: 100%;\n        opacity: 1;\n        display: block;\n      }\n    }\n\n    &.base {\n      .header {\n        padding: var(--accordion-base-v-padding) var(--accordion-base-h-padding);\n        gap: var(--accordion-base-gap);\n        font-size: 14px;\n        font-weight: 400;\n        line-height: var(--desktop-body-s-line-height);\n      }\n\n      .content {\n        padding: var(--accordion-base-v-padding) var(--accordion-base-h-padding);\n        font-size: var(--desktop-body-xs-size);\n        font-style: normal;\n        font-weight: 300;\n        line-height: var(--desktop-body-xs-line-height);\n      }\n    }\n\n    &.large {\n      padding: var(--accordion-large-v-padding) var(--accordion-large-h-padding);\n      gap: var(--accordion-large-gap);\n\n      .header {\n        font-size: 16px;\n        font-weight: 400;\n        line-height: var(--desktop-body-m-large-line-height);\n      }\n\n      .content {\n        padding: var(--accordion-large-v-padding) var(--accordion-large-h-padding);\n        font-size: var(--desktop-body-s-size);\n        font-style: normal;\n        font-weight: 300;\n        line-height: var(--desktop-body-s-line-height);\n      }\n    }\n  }\n}\n';

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
      return tkAccordionItemScss;
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
