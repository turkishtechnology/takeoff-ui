import { p as proxyCustomElement, H, c as createEvent, h } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$2 } from './p-75KyitY6.js';

const tkToggleButtonCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:flex;width:100%}.tk-toggle-button{display:flex;align-items:center;justify-content:center;flex:1 0 auto;border:0px;height:32px;padding:10px 12px;gap:6px;cursor:pointer;border-radius:var(--radius-m-base, 8px);background-color:transparent}.tk-toggle-button.neutral.filled.selected{background-color:var(--neutral-800)}.tk-toggle-button.neutral.outlined.selected{background-color:var(--neutral-50);border:1px solid var(--neutral-300)}.tk-toggle-button.neutral.text.selected{background-color:var(--static-light)}.tk-toggle-button.neutral.raised.selected{background-color:var(--neutral-800);border:1px solid var(--static-black)}.tk-toggle-button.neutral.filled-light.selected{background-color:var(--neutral-200)}.tk-toggle-button.neutral.filled.selected .tk-toggle-button-label,.tk-toggle-button.neutral.raised.selected .tk-toggle-button-label{color:var(--neutral-50)}.tk-toggle-button.neutral.filled.selected .tk-toggle-button-icon,.tk-toggle-button.neutral.raised.selected .tk-toggle-button-icon{color:var(--neutral-50)}.tk-toggle-button.neutral.outlined.selected .tk-toggle-button-label,.tk-toggle-button.neutral.text.selected .tk-toggle-button-label,.tk-toggle-button.neutral.filled-light.selected .tk-toggle-button-label{color:var(--neutral-800)}.tk-toggle-button.neutral.outlined.selected .tk-toggle-button-icon,.tk-toggle-button.neutral.text.selected .tk-toggle-button-icon,.tk-toggle-button.neutral.filled-light.selected .tk-toggle-button-icon{color:var(--neutral-800)}.tk-toggle-button.primary.filled.selected{background-color:var(--primary-500)}.tk-toggle-button.primary.outlined.selected{background-color:var(--neutral-50);border:1px solid var(--primary-300)}.tk-toggle-button.primary.text.selected{background-color:var(--static-light)}.tk-toggle-button.primary.raised.selected{background-color:var(--primary-500);border:1px solid var(--primary-sub-base)}.tk-toggle-button.primary.filled-light.selected{background-color:var(--primary-50)}.tk-toggle-button.primary.filled.selected .tk-toggle-button-label,.tk-toggle-button.primary.raised.selected .tk-toggle-button-label{color:var(--static-white)}.tk-toggle-button.primary.filled.selected .tk-toggle-button-icon,.tk-toggle-button.primary.raised.selected .tk-toggle-button-icon{color:var(--static-white)}.tk-toggle-button.primary.outlined.selected .tk-toggle-button-label,.tk-toggle-button.primary.text.selected .tk-toggle-button-label,.tk-toggle-button.primary.filled-light.selected .tk-toggle-button-label{color:var(--primary-500)}.tk-toggle-button.primary.outlined.selected .tk-toggle-button-icon,.tk-toggle-button.primary.text.selected .tk-toggle-button-icon,.tk-toggle-button.primary.filled-light.selected .tk-toggle-button-icon{color:var(--primary-500)}.tk-toggle-button .tk-toggle-button-label{color:var(--text-base);font-family:var(--body-m-base-font, "Geologica", sans-serif);font-weight:400;font-style:normal}.tk-toggle-button .tk-toggle-button-label.large{line-height:var(--body-m-base-line-height, 24px);font-size:var(--body-m-base-size, 16px)}.tk-toggle-button .tk-toggle-button-label.base{line-height:var(--body-m-base-line-height, 20px);font-size:var(--body-m-base-size, 14px)}.tk-toggle-button .tk-toggle-button-label.small{line-height:var(--body-m-base-line-height, 28px);font-size:var(--body-m-base-size, 12px)}.tk-toggle-button .tk-toggle-button-icon{display:flex;flex-shrink:0;align-items:center;justify-content:center;color:var(--text-base)}.tk-toggle-button .tk-toggle-button-icon.small{width:20px;height:20px}.tk-toggle-button .tk-toggle-button-icon.base{width:24px;height:24px}.tk-toggle-button .tk-toggle-button-icon.large{width:24px;height:24px}.tk-toggle-button.small{height:24px}.tk-toggle-button.base{height:32px}.tk-toggle-button.large{height:40px;padding:12px 14px;gap:8px}.tk-toggle-button.rounded{border-radius:999px}.tk-toggle-button:hover .tk-toggle-button-icon,.tk-toggle-button:hover .tk-toggle-button-label{color:var(--text-darkest)}.tk-toggle-button.disabled .tk-toggle-button-icon,.tk-toggle-button.disabled .tk-toggle-button-label{color:var(--text-sub-base)}';

const TkToggleButton$1 = /*@__PURE__*/ proxyCustomElement(
  class TkToggleButton extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkToggle = createEvent(this, 'tk-toggle', 7);
      /**
       * Defines the position of the icon.
       * @defaultValue 'left'
       */
      this.iconPosition = 'left';
      /**
       * Label text displayed inside the button.
       */
      this.label = '';
      /**
       * Sets size for the component.
       * @defaultValue 'base'
       */
      this.size = 'base';
      /**
       * Determines the button's variant for different styles.
       */
      this.variant = 'neutral';
      /**
       * The value of the type toggle button.
       */
      this.type = 'filled';
      /**
       * Whether the button is selected.
       */
      this.selected = false;
      this.handleClick = e => {
        if (this.disabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        this.tkToggle.emit({ value: this.value, selected: !this.selected });
      };
    }
    renderIcon() {
      const iconClass = `tk-toggle-button-icon ${this.size}`;
      if (this.icon) {
        const iconProps = getIconElementProps(this.icon, { size: this.size, class: iconClass, variant: null });
        return h('tk-icon', Object.assign({}, iconProps));
      }
      return null;
    }
    renderLabel() {
      var _a;
      if (((_a = this.label) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        return h('span', { class: classNames('tk-toggle-button-label', this.size) }, this.label);
      }
      return null;
    }
    render() {
      const rootClasses = classNames('tk-toggle-button', this.variant, this.type, this.size, {
        rounded: this.rounded,
        selected: this.selected && !this.disabled,
        disabled: this.disabled,
      });
      return h(
        'button',
        { key: '79af404c24a9a2af27cdeb078aa71a15a9c9edf9', class: rootClasses, disabled: this.disabled, onClick: this.handleClick },
        this.iconPosition === 'left' && this.renderIcon(),
        this.renderLabel(),
        this.iconPosition === 'right' && this.renderIcon(),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkToggleButtonCss;
    }
  },
  [
    1,
    'tk-toggle-button',
    {
      disabled: [4],
      icon: [1],
      iconPosition: [1, 'icon-position'],
      label: [1],
      rounded: [4],
      size: [1],
      variant: [1],
      type: [1],
      value: [8],
      selected: [1540],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-toggle-button', 'tk-icon'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-toggle-button':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkToggleButton$1);
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

const TkToggleButton = TkToggleButton$1;
const defineCustomElement = defineCustomElement$1;

export { TkToggleButton, defineCustomElement };
//# sourceMappingURL=tk-toggle-button.js.map

//# sourceMappingURL=tk-toggle-button.js.map
