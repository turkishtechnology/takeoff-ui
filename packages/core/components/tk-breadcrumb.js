import { p as proxyCustomElement, H, h, F as Fragment } from './p-CsLMRZQo.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$3 } from './p-DquuPHrA.js';
import { d as defineCustomElement$2 } from './p-vR69rcDp.js';

const tkBreadcrumbCss =
  '@charset "UTF-8";@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}.tk-breadcrumb{display:flex;align-items:center;overflow-x:auto}.tk-breadcrumb::-webkit-scrollbar{display:none}.tk-breadcrumb .tk-breadcrumb-list{margin:0;padding:0;list-style-type:none;display:flex;align-items:center;justify-content:center;flex-wrap:nowrap;gap:var(--breadcrumb-container-gap)}.tk-breadcrumb .tk-breadcrumb-list .tk-breadcrumb-separator{display:flex;width:var(--breadcrumb-symbol-size);height:var(--breadcrumb-symbol-size);justify-content:center;align-items:center}.tk-breadcrumb .tk-breadcrumb-list .tk-breadcrumb-separator .tk-breadcrumb-dot-separator::before{content:"•"}.tk-breadcrumb .tk-breadcrumb-list .tk-breadcrumb-separator .tk-breadcrumb-slash-separator::before{content:"/"}.tk-breadcrumb .tk-breadcrumb-list .tk-breadcrumb-separator .tk-breadcrumb-vertical-separator::before{content:"|"}.tk-breadcrumb .tk-breadcrumb-list .tk-breadcrumb-separator .tk-breadcrumb-separator-icon{color:var(--icon-sub-base);font-size:1rem}';

const TkBreadcrumb$1 = /*@__PURE__*/ proxyCustomElement(
  class TkBreadcrumb extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.hasSlottedItems = false;
      /**
       * Type of separator to use between breadcrumb items
       * @default 'icon'
       */
      this.separator = 'icon';
      /**
       * Icon to use as separator when separator is set to 'icon'
       * @default 'chevron_right'
       */
      this.separatorIcon = 'chevron_right';
      /**
       * Defines the visual style of the component, possible values are 'basic' and 'outlined'.
       * @default 'basic'
       */
      this.type = 'basic';
    }
    componentWillLoad() {
      this.hasSlottedItems = !!this.el.querySelector('tk-breadcrumb-item');
    }
    getBreadcrumbItemProps(item, index) {
      var _a, _b;
      const { label, href, isExternal, icon } = item;
      return {
        key: index,
        label,
        href,
        icon,
        isExternal,
        isCurrent: index === ((_b = (_a = this.model) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) - 1,
      };
    }
    renderSeparator() {
      const separatorClasses = classNames('tk-breadcrumb-separator-icon', {
        'material-symbols-outlined': this.separator === 'icon',
        'tk-breadcrumb-dot-separator': this.separator === 'dot',
        'tk-breadcrumb-slash-separator': this.separator === 'slash',
        'tk-breadcrumb-vertical-separator': this.separator === 'vertical',
      });
      if (this.separator === 'icon') {
        return h('tk-icon', Object.assign({}, getIconElementProps(this.separatorIcon, { class: separatorClasses, variant: null }, undefined, 'span')));
      }
      return h('span', { class: separatorClasses });
    }
    render() {
      var _a;
      const rootClasses = classNames('tk-breadcrumb', `tk-breadcrumb-${this.type}`);
      return h(
        'nav',
        { 'key': 'dbc04089aae56e328c9d9f8f962c2a36dfc118f3', 'class': rootClasses, 'aria-label': 'breadcrumb' },
        h(
          'ol',
          { key: 'ed5ec521fcb9a48e03f59a218c5e8c6ace455205', class: 'tk-breadcrumb-list' },
          this.hasSlottedItems
            ? h('slot', null)
            : (_a = this.model) === null || _a === void 0
              ? void 0
              : _a.map((item, index) =>
                  h(
                    Fragment,
                    null,
                    h('tk-breadcrumb-item', Object.assign({}, this.getBreadcrumbItemProps(item, index))),
                    index < this.model.length - 1 && h('li', { class: 'tk-breadcrumb-separator' }, this.renderSeparator()),
                  ),
                ),
        ),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkBreadcrumbCss;
    }
  },
  [
    1,
    'tk-breadcrumb',
    {
      model: [16],
      separator: [1],
      separatorIcon: [1, 'separator-icon'],
      type: [1],
      hasSlottedItems: [32],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-breadcrumb', 'tk-breadcrumb-item', 'tk-icon'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-breadcrumb':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkBreadcrumb$1);
        }
        break;
      case 'tk-breadcrumb-item':
        if (!customElements.get(tagName)) {
          defineCustomElement$3();
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

const TkBreadcrumb = TkBreadcrumb$1;
const defineCustomElement = defineCustomElement$1;

export { TkBreadcrumb, defineCustomElement };
//# sourceMappingURL=tk-breadcrumb.js.map

//# sourceMappingURL=tk-breadcrumb.js.map
