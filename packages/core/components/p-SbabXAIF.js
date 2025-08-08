import { p as proxyCustomElement, H, h } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$1 } from './p-75KyitY6.js';

const tkBreadcrumbItemCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}.tk-breadcrumb-item{cursor:pointer}.tk-breadcrumb-item .tk-breadcrumb-link{display:flex;justify-content:center;align-items:center;gap:2px;text-decoration:none}.tk-breadcrumb-item .tk-breadcrumb-link .tk-breadcrumb-item-label{color:var(--text-sub-base);font-family:var(--desktop-label-s-font);font-size:var(--desktop-label-m-base-size);font-style:normal;font-weight:400;line-height:var(--desktop-label-m-base-line-height);}.tk-breadcrumb-item .tk-breadcrumb-link .tk-breadcrumb-item-icon{color:var(--icon-sub-base);font-size:var(--basic-item-icon-size);width:var(--basic-item-icon-size);height:var(--basic-item-icon-size)}.tk-breadcrumb-item.tk-breadcrumb-item-current .tk-breadcrumb-item-icon{color:var(--icon-dark)}.tk-breadcrumb-item.tk-breadcrumb-item-current .tk-breadcrumb-item-label{color:var(--text-dark)}.tk-breadcrumb-item:hover:not(.tk-breadcrumb-item-current):not(:active) .tk-breadcrumb-item-label{font-family:var(--desktop-label-underline-m-base-font);font-size:var(--desktop-label-underline-m-base-size);line-height:var(--desktop-label-underline-m-base-line-height);text-decoration-line:underline;text-decoration-style:solid;text-decoration-skip-ink:none;text-decoration-thickness:auto;text-underline-offset:auto;text-underline-position:from-font}.tk-breadcrumb-basic .tk-breadcrumb-item:hover .tk-breadcrumb-item-icon,.tk-breadcrumb-basic .tk-breadcrumb-item:active .tk-breadcrumb-item-icon{color:var(--icon-dark)}.tk-breadcrumb-basic .tk-breadcrumb-item:hover .tk-breadcrumb-item-label,.tk-breadcrumb-basic .tk-breadcrumb-item:active .tk-breadcrumb-item-label{color:var(--text-dark)}.tk-breadcrumb-outlined .tk-breadcrumb-item{padding:var(--backgrounded-item-v-padding) 10px var(--backgrounded-item-v-padding) 6px;gap:var(--backgrounded-item-gap);border-radius:8px;border:var(--spacing-px) solid var(--border-light);background:var(--static-light)}.tk-breadcrumb-outlined .tk-breadcrumb-item.tk-breadcrumb-item-icon-only{padding:var(--backgrounded-item-v-padding, 2px) 4px}.tk-breadcrumb-outlined .tk-breadcrumb-item .tk-breadcrumb-item-icon{font-size:var(--backgrounded-item-icon-size);width:var(--backgrounded-item-icon-size);height:var(--backgrounded-item-icon-size)}.tk-breadcrumb-outlined .tk-breadcrumb-item.tk-breadcrumb-item-current{border:var(--spacing-px) solid var(--border-sub-base);background:var(--background-lightest)}.tk-breadcrumb-outlined .tk-breadcrumb-item:hover .tk-breadcrumb-item-label{color:var(--text-dark)}.tk-breadcrumb-outlined .tk-breadcrumb-item:active .tk-breadcrumb-item-label{color:var(--text-darkest)}.tk-breadcrumb-outlined .tk-breadcrumb-item:hover,.tk-breadcrumb-outlined .tk-breadcrumb-item:active{border:var(--spacing-px) solid var(--border-sub-base);background:var(--background-lightest)}.tk-breadcrumb-outlined .tk-breadcrumb-item:hover .tk-breadcrumb-item-icon,.tk-breadcrumb-outlined .tk-breadcrumb-item:active .tk-breadcrumb-item-icon{color:var(--icon-dark)}';

const TkBreadcrumbItem = /*@__PURE__*/ proxyCustomElement(
  class TkBreadcrumbItem extends H {
    constructor() {
      super();
      this.__registerHost();
      /**
       * Whether the item is an external url
       * @defaultValue false
       */
      this.isExternal = false;
      /**
       * Indicates if the item is the last one
       */
      this.isCurrent = false;
    }
    render() {
      const rootClasses = classNames('tk-breadcrumb-item', {
        'tk-breadcrumb-item-current': this.isCurrent,
        'tk-breadcrumb-item-icon-only': !this.label,
      });
      const linkProps = Object.assign({ href: this.href }, this.isExternal && { target: '_blank', rel: 'noopener noreferrer' });
      const icon = h(
        'tk-icon',
        Object.assign({ key: '4033ad457a886fcc075cd1c9acc7a6bbb037f7fb' }, getIconElementProps(this.icon, { class: 'tk-breadcrumb-item-icon', variant: null }, undefined, 'span')),
      );
      return h(
        'li',
        { 'key': '41c36ab17db591681bc0cd1cc21083389d4a1b43', 'class': rootClasses, 'aria-current': this.isCurrent ? 'page' : null },
        h(
          'a',
          Object.assign({ key: '63468485e6a93f480f0cecb72457093383a95b61', class: 'tk-breadcrumb-link' }, linkProps, { tabindex: this.isCurrent ? -1 : 0 }),
          icon,
          this.label &&
            h(
              'span',
              { key: '5a63a779505901eb363d4998448ca9a43eb3bed3', class: 'tk-breadcrumb-item-label' },
              h('slot', { key: '7551c74756a3c3b114e51740b134f7ed269bab2d' }, this.label),
            ),
        ),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkBreadcrumbItemCss;
    }
  },
  [
    4,
    'tk-breadcrumb-item',
    {
      href: [1],
      icon: [1],
      label: [1],
      isExternal: [4, 'is-external'],
      isCurrent: [4, 'is-current'],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-breadcrumb-item', 'tk-icon'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-breadcrumb-item':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkBreadcrumbItem);
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$1();
        }
        break;
    }
  });
}

export { TkBreadcrumbItem as T, defineCustomElement as d };
//# sourceMappingURL=p-SbabXAIF.js.map

//# sourceMappingURL=p-SbabXAIF.js.map
