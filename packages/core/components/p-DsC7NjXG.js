import { p as proxyCustomElement, H, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$1 } from './p-DrRHtkyE.js';

const tkBadgeScss =
  ":host {\n  display: inline-flex;\n}\n\n.tk-badge-container.has-slot {\n  display: inline-flex;\n  position: relative;\n\n  .tk-badge {\n    position: absolute;\n    top: -8px;\n    right: -10px;\n\n    &.tk-badge.dot {\n      top: -3px;\n      right: -3px;\n    }\n  }\n\n  div {\n    display: inline-block !important;\n  }\n}\n\n.tk-badge-container {\n  display: inline-flex;\n\n  .tk-badge {\n    font-family: 'Geologica', sans-serif;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    outline: none;\n\n    span {\n      overflow: hidden;\n      white-space: nowrap;\n    }\n\n    &.primary {\n      border: 0px;\n      color: var(--primary-base);\n\n      &.filled {\n        color: var(--text-lightest);\n        background-color: var(--primary-base);\n      }\n\n      &.outlined {\n        background-color: transparent;\n        border: 1px solid var(--primary-base);\n      }\n\n      &.filledlight {\n        background-color: var(--primary-light);\n      }\n\n      &.text {\n        background-color: transparent;\n      }\n    }\n\n    &.secondary {\n      border: 0px;\n      color: var(--secondary-darkest);\n\n      &.filled {\n        color: var(--text-lightest);\n        background-color: var(--secondary-darkest);\n      }\n\n      &.outlined {\n        background-color: transparent;\n        border: 1px solid var(--secondary-base);\n      }\n\n      &.filledlight {\n        background-color: var(--secondary-light);\n      }\n\n      &.text {\n        background-color: transparent;\n      }\n    }\n\n    &.neutral {\n      border: 0px;\n      color: var(--text-darkest);\n\n      &.filled {\n        color: var(--text-lightest);\n        background-color: var(--background-darkest);\n      }\n\n      &.outlined {\n        background-color: transparent;\n        color: var(--text-darkest);\n        border: 1px solid var(--background-darkest);\n      }\n\n      &.filledlight {\n        background-color: var(--background-light);\n      }\n\n      &.text {\n        background-color: transparent;\n      }\n    }\n\n    &.info {\n      border: 0px;\n      color: var(--states-info-base);\n\n      &.filled {\n        color: var(--text-lightest);\n        background-color: var(--states-info-base);\n      }\n\n      &.outlined {\n        background-color: transparent;\n        border: 1px solid var(--states-info-base);\n      }\n\n      &.filledlight {\n        background-color: var(--states-info-light);\n      }\n\n      &.text {\n        background-color: transparent;\n      }\n    }\n\n    &.success {\n      border: 0px;\n      color: var(--states-success-dark);\n\n      &.filled {\n        color: var(--text-lightest);\n        background-color: var(--states-success-dark);\n      }\n\n      &.outlined {\n        background-color: transparent;\n        border: 1px solid var(--states-success-dark);\n      }\n\n      &.filledlight {\n        background-color: var(--states-success-light);\n      }\n\n      &.text {\n        background-color: transparent;\n      }\n    }\n\n    &.danger {\n      border: 0px;\n      color: var(--states-danger-dark);\n\n      &.filled {\n        color: var(--text-lightest);\n        background-color: var(--states-danger-dark);\n      }\n\n      &.outlined {\n        background-color: transparent;\n        border: 1px solid var(--states-danger-dark);\n      }\n\n      &.filledlight {\n        background-color: var(--states-danger-light);\n      }\n\n      &.text {\n        background-color: transparent;\n      }\n    }\n\n    &.warning {\n      border: 0px;\n      color: var(--states-warning-dark);\n\n      &.filled {\n        color: var(--text-lightest);\n        background-color: var(--states-warning-dark);\n      }\n\n      &.outlined {\n        background-color: transparent;\n        border: 1px solid var(--states-warning-dark);\n      }\n\n      &.filledlight {\n        background-color: var(--states-warning-light);\n      }\n\n      &.text {\n        background-color: transparent;\n      }\n    }\n\n    &.verified {\n      border: 0px;\n      color: var(--states-verified-dark);\n\n      &.filled {\n        color: var(--text-lightest);\n        background-color: var(--states-verified-dark);\n      }\n\n      &.outlined {\n        background-color: transparent;\n        border: 1px solid var(--states-verified-dark);\n      }\n\n      &.filledlight {\n        background-color: var(--states-verified-light);\n      }\n\n      &.text {\n        background-color: transparent;\n      }\n    }\n\n    &.purple {\n      border: 0px;\n      color: var(--text-lightest);\n\n      &.filled {\n        background-color: var(--purple-600);\n      }\n\n      &.outlined {\n        background-color: transparent;\n        color: var(--purple-600);\n        border: 1px solid var(--purple-600);\n      }\n\n      &.filledlight {\n        background-color: var(--purple-100);\n        color: var(--purple-600);\n      }\n\n      &.text {\n        background-color: transparent;\n        color: var(--purple-600);\n      }\n    }\n\n    &.cyan {\n      border: 0px;\n      color: var(--text-lightest);\n\n      &.filled {\n        background-color: var(--cyan-600);\n      }\n\n      &.outlined {\n        background-color: transparent;\n        color: var(--cyan-600);\n        border: 1px solid var(--cyan-600);\n      }\n\n      &.filledlight {\n        background-color: var(--cyan-100);\n        color: var(--cyan-600);\n      }\n\n      &.text {\n        background-color: transparent;\n        color: var(--cyan-600);\n      }\n    }\n\n    &.business {\n      border: 0px;\n      color: var(--text-lightest);\n\n      &.filled {\n        background-color: var(--business-600);\n      }\n\n      &.outlined {\n        background-color: transparent;\n        color: var(--business-600);\n        border: 1px solid var(--business-600);\n      }\n\n      &.filledlight {\n        background-color: var(--business-100);\n        color: var(--business-600);\n      }\n\n      &.text {\n        background-color: transparent;\n        color: var(--business-600);\n      }\n    }\n\n    &.small {\n      height: 16px;\n      line-height: var(--desktop-body-2xs-line-height);\n      /* 145.455% */\n      font-size: var(--desktop-body-2xs-size);\n      border-radius: var(--badge-small-basic-radius);\n      padding: var(--badge-small-basic-v-padding) var(--badge-small-basic-right-padding) var(--badge-small-basic-v-padding) var(--badge-small-basic-left-padding);\n      gap: 2;\n\n      i {\n        font-size: var(--badge-small-left-icon-icon-size);\n        width: var(--badge-small-left-icon-icon-size);\n        height: var(--badge-small-left-icon-icon-size);\n      }\n\n      &.icon-only,\n      &.count {\n        width: 16px;\n        height: 16px;\n        padding: var(--spacing-none);\n        gap: var(--badge-small-basic-gap);\n      }\n    }\n\n    &.base {\n      height: 20px;\n      line-height: var(--desktop-body-xs-line-height);\n      /* 150% */\n      font-size: var(--desktop-body-xs-size);\n      border-radius: var(--badge-base-basic-radius);\n      padding: var(--badge-base-basic-v-padding) var(--badge-base-basic-right-padding) var(--badge-base-basic-v-padding) var(--badge-base-basic-left-padding);\n      gap: 4px;\n\n      i {\n        font-size: var(--badge-base-left-icon-icon-size);\n        width: var(--badge-base-left-icon-icon-size);\n        height: var(--badge-base-left-icon-icon-size);\n      }\n\n      &.icon-only,\n      &.count {\n        width: 20px;\n        height: 20px;\n        padding: var(--spacing-none);\n        gap: var(--badge-base-basic-gap);\n      }\n    }\n\n    &.large {\n      height: 24px;\n      line-height: var(--desktop-body-xs-line-height);\n      /* 150% */\n      font-size: var(--desktop-body-xs-size);\n      border-radius: var(--badge-large-basic-radius);\n      padding: var(--badge-large-basic-v-padding) var(--badge-large-basic-right-padding) var(--badge-large-basic-v-padding) var(--badge-large-basic-left-padding);\n      gap: 6px;\n\n      i {\n        font-size: var(--badge-large-left-icon-icon-size);\n        width: var(--badge-large-left-icon-icon-size);\n        height: var(--badge-large-left-icon-icon-size);\n        line-height: unset;\n      }\n\n      &.icon-only,\n      &.count {\n        width: 24px;\n        height: 24px;\n        padding: var(--spacing-none);\n        gap: var(--badge-large-basic-gap);\n      }\n    }\n\n    &.reverse {\n      flex-direction: row-reverse;\n\n      &.small {\n        gap: var(--badge-small-right-icon-gap);\n        padding: var(--badge-small-right-icon-v-padding) var(--badge-small-right-icon-right-padding) var(--badge-small-right-icon-v-padding)\n          var(--badge-small-right-icon-left-padding);\n\n        i {\n          font-size: var(--badge-small-right-icon-icon-size);\n          width: var(--badge-small-right-icon-icon-size);\n          height: var(--badge-small-right-icon-icon-size);\n        }\n      }\n\n      &.base {\n        gap: var(--badge-base-right-icon-gap);\n        padding: var(--badge-base-right-icon-v-padding) var(--badge-base-right-icon-right-padding) var(--badge-base-right-icon-v-padding) var(--badge-base-right-icon-left-padding);\n\n        i {\n          font-size: var(--badge-base-right-icon-icon-size);\n          width: var(--badge-base-right-icon-icon-size);\n          height: var(--badge-base-right-icon-icon-size);\n        }\n      }\n\n      &.large {\n        gap: var(--badge-large-right-icon-gap);\n        padding: var(--badge-large-right-icon-v-padding) var(--badge-large-right-icon-right-padding) var(--badge-large-right-icon-v-padding)\n          var(--badge-large-right-icon-left-padding);\n\n        i {\n          font-size: var(--badge-large-right-icon-icon-size);\n          width: var(--badge-large-right-icon-icon-size);\n          height: var(--badge-large-right-icon-icon-size);\n        }\n      }\n    }\n\n    &.rounded {\n      border-radius: var(--radius-full);\n    }\n\n    &.icon-only {\n      gap: 0px;\n      padding: var(--spacing-none);\n    }\n\n    &.dot {\n      width: 6px;\n      height: 6px;\n      gap: 0px;\n      padding: var(--spacing-none);\n      border: none !important;\n\n      &.primary {\n        background-color: var(--primary-base);\n      }\n\n      &.secondary {\n        background-color: var(--secondary-darkest);\n      }\n\n      &.neutral {\n        background-color: var(--background-darkest);\n      }\n\n      &.info {\n        background-color: var(--states-info-base);\n      }\n\n      &.success {\n        background-color: var(--states-success-dark);\n      }\n\n      &.danger {\n        background-color: var(--states-danger-dark);\n      }\n\n      &.warning {\n        background-color: var(--states-warning-dark);\n      }\n\n      &.verified {\n        background-color: var(--states-verified-dark);\n      }\n\n      &.purple {\n        background-color: var(--purple-600);\n      }\n\n      &.cyan {\n        background-color: var(--cyan-600);\n      }\n\n      &.business {\n        background-color: var(--business-600);\n      }\n    }\n  }\n}\n";

const TkBadge = /*@__PURE__*/ proxyCustomElement(
  class TkBadge extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      /**
       * State to check if slot content exists.
       * @defaultValue false
       */
      this.hasSlot = false;
      /**
       * If true, shows a small dot on the badge.
       * @defaultValue false
       */
      this.dot = false;
      /**
       * This field specifies the design type of the component.
       * @defaultValue filled
       */
      this.type = 'filled';
      /**
       * Defines the position of the icon.
       * @defaultValue 'left'
       */
      this.iconPosition = 'left';
      /**
       * Makes the badge corners rounded.
       * @defaultValue false
       */
      this.rounded = false;
      /**
       * Sets size for the component.
       * @defaultValue 'base'
       */
      this.size = 'base';
      /**
       * Determines the badge's variant for different styles.
       * @defaultValue 'primary'
       */
      this.variant = 'primary';
    }
    componentDidLoad() {
      var _a, _b;
      this.hasSlot =
        ((_b = (_a = this.el.shadowRoot.querySelector('slot')) === null || _a === void 0 ? void 0 : _a.assignedNodes) === null || _b === void 0 ? void 0 : _b.call(_a).length) > 0;
    }
    isValidCount() {
      if (this.count === undefined || this.count === null) {
        return false;
      }
      if (this.count === 0 || this.count === '0') {
        return true;
      }
      // Handle other numeric strings and numbers
      const numericValue = Number(this.count);
      return !isNaN(numericValue);
    }
    renderContent() {
      let content;
      if (!this.dot) {
        const contentConfig = {
          label: {
            value: this.label,
            class: 'label',
          },
          count: {
            value: this.count,
            class: 'count',
          },
        };
        const type = this.label ? 'label' : this.isValidCount() ? 'count' : null;
        const { value = '', class: contentClass = '' } = contentConfig[type] || {};
        content = h('span', { class: contentClass }, value);
      }
      return content;
    }
    render() {
      const isCountOnly = this.isValidCount() && !this.label && !this.dot && !this.icon;
      const rootClasses = classNames('tk-badge-container', {
        'has-slot': this.hasSlot,
      });
      const badgeClasses = classNames('tk-badge', this.variant, this.size, this.type, {
        'rounded': this.rounded,
        'reverse': this.icon && this.iconPosition === 'right',
        'icon-only': this.icon && !this.label && !this.dot,
        'dot': this.dot,
        'count': isCountOnly,
      });
      const icon = !this.dot && this.icon && h('tk-icon', Object.assign({ key: '8418b92f06b6677c9a6165d77ecf1e2b6793b2d0' }, getIconElementProps(this.icon, { variant: null })));
      return h(
        'div',
        { key: 'b62b609295e3ffc176fe4006be6b6bdaabff83e1', class: rootClasses },
        h('slot', { key: '27788fb0a95adc776bc8c4a8dbecad4e9f5836e4' }),
        h('span', { key: 'ad9e539771b1005a8691aecefe3cc84f3146ddc0', class: badgeClasses }, icon, this.renderContent()),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkBadgeScss;
    }
  },
  [
    1,
    'tk-badge',
    {
      dot: [4],
      type: [1],
      icon: [1],
      iconPosition: [1, 'icon-position'],
      label: [1],
      count: [8],
      rounded: [4],
      size: [1],
      variant: [1],
      hasSlot: [32],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-badge', 'tk-icon'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-badge':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkBadge);
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

export { TkBadge as T, defineCustomElement as d };
//# sourceMappingURL=p-DsC7NjXG.js.map

//# sourceMappingURL=p-DsC7NjXG.js.map
