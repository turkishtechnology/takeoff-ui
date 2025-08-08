import { p as proxyCustomElement, H, h } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkDividerCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}.tk-divider.tk-divider-horizontal{margin:16px 0;border-top:var(--spacing-px) solid var(--background-light)}.tk-divider.tk-divider-horizontal:has(.tk-divider-content){border-top:0 !important}.tk-divider.tk-divider-horizontal .tk-divider-content{display:flex;align-items:center;color:var(--text-base);font-family:var(--desktop-body-2xs-font, Geologica);font-size:var(--desktop-body-2xs-size, 11px);font-style:normal;font-weight:400;line-height:var(--line-height-xxs-normal, 16px)}.tk-divider.tk-divider-horizontal .tk-divider-content::before{flex:1 1 0%;height:1px;content:"";border-top:var(--spacing-px) solid var(--background-light);margin-right:8px}.tk-divider.tk-divider-horizontal .tk-divider-content::after{flex:1 1 0%;content:"";border-top:var(--spacing-px) solid var(--background-light);margin-left:8px}.tk-divider.tk-divider-vertical{position:relative;display:flex;justify-content:center;min-height:100%;margin:0 16px}.tk-divider.tk-divider-vertical::before{content:"";position:absolute;display:block;height:100%;inset-block-start:0;inset-inline-start:50%;border-inline-start:var(--spacing-px) solid var(--background-light);box-sizing:border-box}';

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
      return tkDividerCss;
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
//# sourceMappingURL=p-QOLD8QYn.js.map

//# sourceMappingURL=p-QOLD8QYn.js.map
