import { p as proxyCustomElement, H, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkDividerScss =
  ":host {\n  display: block;\n}\n\n.tk-divider {\n  &.tk-divider-horizontal {\n    margin: 16px 0;\n    border-top: var(--spacing-px) solid var(--background-light);\n\n    &:has(.tk-divider-content) {\n      border-top: 0 !important;\n    }\n\n    .tk-divider-content {\n      display: flex;\n      align-items: center;\n\n      color: var(--text-base);\n      font-family: var(--desktop-body-2xs-font, Geologica);\n      font-size: var(--desktop-body-2xs-size, 11px);\n      font-style: normal;\n      font-weight: 400;\n      line-height: var(--line-height-xxs-normal, 16px);\n\n      &::before {\n        flex: 1 1 0%;\n        height: 1px;\n        content: '';\n        border-top: var(--spacing-px) solid var(--background-light);\n        margin-right: 8px;\n      }\n\n      &::after {\n        flex: 1 1 0%;\n        content: '';\n        border-top: var(--spacing-px) solid var(--background-light);\n        margin-left: 8px;\n      }\n    }\n  }\n\n  &.tk-divider-vertical {\n    position: relative;\n    display: flex;\n    justify-content: center;\n    min-height: 100%;\n    margin: 0 16px;\n\n    &::before {\n      content: '';\n      position: absolute;\n      display: block;\n      height: 100%;\n      inset-block-start: 0;\n      inset-inline-start: 50%;\n      border-inline-start: var(--spacing-px) solid var(--background-light);\n      box-sizing: border-box;\n    }\n  }\n}\n";

const TkDivider = /*@__PURE__*/ proxyCustomElement(
  class TkDivider extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      /**
       * Controls the orientation of the divider component.
       * @defaultValue horizontal
       */
      this.orientation = 'horizontal';
    }
    componentWillLoad() {
      this.hasDefaultSlot = Array.from(this.el.childNodes).some(node => {
        var _a;
        return (
          (node.nodeType === Node.ELEMENT_NODE && !node.hasAttribute('slot')) ||
          (node.nodeType === Node.TEXT_NODE && ((_a = node.textContent) === null || _a === void 0 ? void 0 : _a.trim().length) > 0)
        );
      });
    }
    getRootStyles() {
      const styles = {};
      if (this.my) {
        const space = typeof this.my === 'number' ? `${this.my}px` : this.my;
        styles.marginTop = space;
        styles.marginBottom = space;
      }
      if (this.mx) {
        const space = typeof this.mx === 'number' ? `${this.mx}px` : this.mx;
        styles.marginLeft = space;
        styles.marginRight = space;
      }
      return styles;
    }
    render() {
      return h(
        'div',
        {
          'key': '7f743a962aff4c2e7dd6080b9c63cc21d013dc51',
          'class': classNames('tk-divider', `tk-divider-${this.orientation}`),
          'role': 'separator',
          'aria-orientation': this.orientation,
          'style': this.getRootStyles(),
        },
        this.hasDefaultSlot &&
          h('div', { key: '2b03b4b4c97e5f438dd81b060b33361846ee4670', class: 'tk-divider-content' }, h('slot', { key: 'ab7ba8b8a5fff132cf05e0aa48a618c6b9bfb5a0' })),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkDividerScss;
    }
  },
  [
    1,
    'tk-divider',
    {
      orientation: [1],
      mx: [8],
      my: [8],
      hasDefaultSlot: [32],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-divider'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-divider':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkDivider);
        }
        break;
    }
  });
}

export { TkDivider as T, defineCustomElement as d };
//# sourceMappingURL=p-BnDnaPri.js.map

//# sourceMappingURL=p-BnDnaPri.js.map
