import { p as proxyCustomElement, H, h } from './p-CsLMRZQo.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkIconCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}tk-icon{display:inline-flex}.tk-icon{display:inline-flex;align-items:center;justify-content:center}.tk-icon.tk-icon-xsmall{font-size:var(--size-xs)}.tk-icon.tk-icon-small{font-size:var(--size-sm)}.tk-icon.tk-icon-base{font-size:var(--size-base)}.tk-icon.tk-icon-medium{font-size:var(--size-xl)}.tk-icon.tk-icon-large{font-size:var(--size-2xl)}.tk-icon.tk-icon-xlarge{font-size:var(--size-3xl)}.tk-icon.tk-icon-xxlarge{font-size:var(--size-4xl)}.tk-icon.tk-icon-primary{color:var(--primary-dark)}.tk-icon.tk-icon-secondary{color:var(--secondary-dark)}.tk-icon.tk-icon-neutral{color:var(--background-dark)}.tk-icon.tk-icon-info{color:var(--states-info-dark)}.tk-icon.tk-icon-success{color:var(--states-success-dark)}.tk-icon.tk-icon-danger{color:var(--states-danger-dark)}.tk-icon.tk-icon-warning{color:var(--states-warning-dark)}.tk-icon.tk-icon-white{color:var(--secondary-sub-base)}.tk-icon.tk-icon-sign{background-color:var(--background-lightest)}.tk-icon.tk-icon-sign.tk-icon-xsmall{border:1px solid;border-radius:var(--radius-xs);padding:1px}.tk-icon.tk-icon-sign.tk-icon-small{border:1px solid;border-radius:var(--radius-s);padding:2px}.tk-icon.tk-icon-sign.tk-icon-base{border:1px solid;border-radius:var(--radius-m-base);padding:4px}.tk-icon.tk-icon-sign.tk-icon-medium{border:1px solid;border-radius:var(--radius-m-base);padding:4px}.tk-icon.tk-icon-sign.tk-icon-large{border:1px solid;border-radius:var(--radius-l);padding:6px}.tk-icon.tk-icon-sign.tk-icon-xlarge{border:1px solid;border-radius:var(--radius-l);padding:6px}.tk-icon.tk-icon-sign.tk-icon-xxlarge{border:1px solid;border-radius:var(--radius-l);padding:8px}.tk-icon.tk-icon-sign.tk-icon-primary{border-color:var(--primary-sub-base)}.tk-icon.tk-icon-sign.tk-icon-secondary{border-color:var(--secondary-sub-base)}.tk-icon.tk-icon-sign.tk-icon-neutral{border-color:var(--background-sub-base)}.tk-icon.tk-icon-sign.tk-icon-info{border-color:var(--states-info-sub-base)}.tk-icon.tk-icon-sign.tk-icon-success{border-color:var(--states-success-sub-base)}.tk-icon.tk-icon-sign.tk-icon-danger{border-color:var(--states-danger-sub-base)}.tk-icon.tk-icon-sign.tk-icon-warning{border-color:var(--states-warning-sub-base)}.tk-icon.tk-icon-sign.tk-icon-white{border-color:var(--secondary-light)}';

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
      return tkIconCss;
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
//# sourceMappingURL=p-vR69rcDp.js.map

//# sourceMappingURL=p-vR69rcDp.js.map
