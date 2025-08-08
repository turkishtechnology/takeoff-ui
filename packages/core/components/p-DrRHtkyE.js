import { p as proxyCustomElement, H, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkIconScss =
  'tk-icon {\n  display: inline-flex;\n}\n\n.tk-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n\n  &.tk-icon-xsmall {\n    font-size: var(--size-xs);\n  }\n\n  &.tk-icon-small {\n    font-size: var(--size-sm);\n  }\n\n  &.tk-icon-base {\n    font-size: var(--size-base);\n  }\n\n  &.tk-icon-medium {\n    font-size: var(--size-xl);\n  }\n\n  &.tk-icon-large {\n    font-size: var(--size-2xl);\n  }\n\n  &.tk-icon-xlarge {\n    font-size: var(--size-3xl);\n  }\n\n  &.tk-icon-xxlarge {\n    font-size: var(--size-4xl);\n  }\n\n  &.tk-icon-primary {\n    color: var(--primary-dark);\n  }\n\n  &.tk-icon-secondary {\n    color: var(--secondary-dark);\n  }\n\n  &.tk-icon-neutral {\n    color: var(--background-dark);\n  }\n\n  &.tk-icon-info {\n    color: var(--states-info-dark);\n  }\n\n  &.tk-icon-success {\n    color: var(--states-success-dark);\n  }\n\n  &.tk-icon-danger {\n    color: var(--states-danger-dark);\n  }\n\n  &.tk-icon-warning {\n    color: var(--states-warning-dark);\n  }\n\n  &.tk-icon-white {\n    color: var(--secondary-sub-base);\n  }\n\n  &.tk-icon-sign {\n    background-color: var(--background-lightest);\n\n    &.tk-icon-xsmall {\n      border: 1px solid;\n      border-radius: var(--radius-xs);\n      padding: 1px;\n    }\n\n    &.tk-icon-small {\n      border: 1px solid;\n      border-radius: var(--radius-s);\n      padding: 2px;\n    }\n\n    &.tk-icon-base {\n      border: 1px solid;\n      border-radius: var(--radius-m-base);\n      padding: 4px;\n    }\n\n    &.tk-icon-medium {\n      border: 1px solid;\n      border-radius: var(--radius-m-base);\n      padding: 4px;\n    }\n\n    &.tk-icon-large {\n      border: 1px solid;\n      border-radius: var(--radius-l);\n      padding: 6px;\n    }\n\n    &.tk-icon-xlarge {\n      border: 1px solid;\n      border-radius: var(--radius-l);\n      padding: 6px;\n    }\n\n    &.tk-icon-xxlarge {\n      border: 1px solid;\n      border-radius: var(--radius-l);\n      padding: 8px;\n    }\n\n    &.tk-icon-primary {\n      border-color: var(--primary-sub-base);\n    }\n\n    &.tk-icon-secondary {\n      border-color: var(--secondary-sub-base);\n    }\n\n    &.tk-icon-neutral {\n      border-color: var(--background-sub-base);\n    }\n\n    &.tk-icon-info {\n      border-color: var(--states-info-sub-base);\n    }\n\n    &.tk-icon-success {\n      border-color: var(--states-success-sub-base);\n    }\n\n    &.tk-icon-danger {\n      border-color: var(--states-danger-sub-base);\n    }\n\n    &.tk-icon-warning {\n      border-color: var(--states-warning-sub-base);\n    }\n\n    &.tk-icon-white {\n      border-color: var(--secondary-light);\n    }\n  }\n}\n';

const TkIcon = /*@__PURE__*/ proxyCustomElement(
  class TkIcon extends H {
    constructor() {
      super();
      this.__registerHost();
      /**
       * Controls whether the icon is shown as a sign (previously 'card' type)
       * @defaultValue false
       */
      this.sign = false;
      /**
       * The variant of the icon.
       * @defaultValue 'primary'
       */
      this.variant = 'primary';
      /**
       * Sets size for the component.
       * @defaultValue 'base'
       */
      this.size = 'base';
      /**
       * Specifies the type of the icon to be displayed.
       */
      this.iconType = 'outlined';
      /**
       * The HTML tag to use for the icon element.
       * @defaultValue 'i'
       */
      this.iconTag = 'i';
      this.getIconStyles = () => {
        const style = {};
        if (this.color) {
          style.color = this.color;
        } else if (this.iconColor) {
          style.color = this.iconColor;
        }
        if (this.sign) {
          if (this.borderColor) {
            style.borderColor = this.borderColor;
          }
          if (this.backgroundColor) {
            style.backgroundColor = this.backgroundColor;
          }
        }
        return { style };
      };
    }
    render() {
      const iconClasses = classNames(`material-symbols-${this.iconType}`, 'tk-icon', this.variant && `tk-icon-${this.variant}`, `tk-icon-${this.size}`, {
        'tk-icon-sign': this.sign,
        'fill': this.fill,
      });
      const iconProps = Object.assign({ class: iconClasses }, this.getIconStyles());
      const IconTag = this.iconTag;
      const iconElement = h(IconTag, Object.assign({}, iconProps), this.icon);
      if (this.sign) {
        return h(
          'div',
          {
            class: 'tk-icon-sign-container',
            style: {
              borderColor: this.borderColor,
            },
          },
          iconElement,
        );
      }
      return iconElement;
    }
    get el() {
      return this;
    }
    static get style() {
      return tkIconScss;
    }
  },
  [
    0,
    'tk-icon',
    {
      sign: [4],
      variant: [1],
      size: [1],
      fill: [4],
      color: [1],
      iconColor: [1, 'icon-color'],
      borderColor: [1, 'border-color'],
      backgroundColor: [1, 'background-color'],
      icon: [1],
      iconType: [1, 'icon-type'],
      iconTag: [1, 'icon-tag'],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-icon'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkIcon);
        }
        break;
    }
  });
}

export { TkIcon as T, defineCustomElement as d };
//# sourceMappingURL=p-DrRHtkyE.js.map

//# sourceMappingURL=p-DrRHtkyE.js.map
