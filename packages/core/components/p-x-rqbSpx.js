import { p as proxyCustomElement, H, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$1 } from './p-DrRHtkyE.js';

const tkBreadcrumbItemScss =
  '.tk-breadcrumb-item {\n  cursor: pointer;\n\n  .tk-breadcrumb-link {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 2px;\n    text-decoration: none;\n\n    .tk-breadcrumb-item-label {\n      color: var(--text-sub-base);\n      font-family: var(--desktop-label-s-font);\n      font-size: var(--desktop-label-m-base-size);\n      font-style: normal;\n      font-weight: 400;\n      line-height: var(--desktop-label-m-base-line-height);\n      /* 142.857% */\n    }\n\n    .tk-breadcrumb-item-icon {\n      color: var(--icon-sub-base);\n      font-size: var(--basic-item-icon-size);\n      width: var(--basic-item-icon-size);\n      height: var(--basic-item-icon-size);\n    }\n  }\n\n  &.tk-breadcrumb-item-current {\n    .tk-breadcrumb-item-icon {\n      color: var(--icon-dark);\n    }\n\n    .tk-breadcrumb-item-label {\n      color: var(--text-dark);\n    }\n  }\n\n  &:hover {\n    &:not(.tk-breadcrumb-item-current):not(:active) {\n      .tk-breadcrumb-item-label {\n        font-family: var(--desktop-label-underline-m-base-font);\n        font-size: var(--desktop-label-underline-m-base-size);\n        line-height: var(--desktop-label-underline-m-base-line-height);\n        /* 142.857% */\n        text-decoration-line: underline;\n        text-decoration-style: solid;\n        text-decoration-skip-ink: none;\n        text-decoration-thickness: auto;\n        text-underline-offset: auto;\n        text-underline-position: from-font;\n      }\n    }\n  }\n}\n\n.tk-breadcrumb-basic {\n  .tk-breadcrumb-item {\n    &:hover,\n    &:active {\n      .tk-breadcrumb-item-icon {\n        color: var(--icon-dark);\n      }\n\n      .tk-breadcrumb-item-label {\n        color: var(--text-dark);\n      }\n    }\n  }\n}\n\n.tk-breadcrumb-outlined {\n  .tk-breadcrumb-item {\n    padding: var(--backgrounded-item-v-padding) 10px var(--backgrounded-item-v-padding) 6px;\n    gap: var(--backgrounded-item-gap);\n    border-radius: 8px;\n    border: var(--spacing-px) solid var(--border-light);\n    background: var(--static-light);\n\n    &.tk-breadcrumb-item-icon-only {\n      padding: var(--backgrounded-item-v-padding, 2px) 4px;\n    }\n\n    .tk-breadcrumb-item-icon {\n      font-size: var(--backgrounded-item-icon-size);\n      width: var(--backgrounded-item-icon-size);\n      height: var(--backgrounded-item-icon-size);\n    }\n\n    &.tk-breadcrumb-item-current {\n      border: var(--spacing-px) solid var(--border-sub-base);\n      background: var(--background-lightest);\n    }\n\n    &:hover {\n      .tk-breadcrumb-item-label {\n        color: var(--text-dark);\n      }\n    }\n\n    &:active {\n      .tk-breadcrumb-item-label {\n        color: var(--text-darkest);\n      }\n    }\n\n    &:hover,\n    &:active {\n      .tk-breadcrumb-item-icon {\n        color: var(--icon-dark);\n      }\n\n      border: var(--spacing-px) solid var(--border-sub-base);\n      background: var(--background-lightest);\n    }\n  }\n}\n';

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
      return tkBreadcrumbItemScss;
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
//# sourceMappingURL=p-x-rqbSpx.js.map

//# sourceMappingURL=p-x-rqbSpx.js.map
