import { p as proxyCustomElement, H, c as createEvent, h } from './p-CsLMRZQo.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$1 } from './p-vR69rcDp.js';

const tkChipsCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:inline-flex}.tk-chips{font-family:"Geologica", sans-serif;display:inline-flex;align-items:center;justify-content:center;border-radius:var(--chips-large-radius, 6px);border-width:0px;background-color:var(--static-Light, #fff)}.tk-chips.removable{cursor:pointer}.tk-chips.disabled{color:var(--text-sub-base, #cacfd8) !important;background-color:var(--frames-light) !important}.tk-chips.disabled.avatar,.tk-chips.disabled.outlined{border:1px solid var(--border-sub-base, #cacfd8) !important;background-color:var(--static-Light, #fff) !important}.tk-chips.disabled:active{box-shadow:none !important}.tk-chips:active{box-shadow:var(--secondary-focus)}.tk-chips.primary{color:var(--primary-base, #c90019)}.tk-chips.primary:active{box-shadow:var(--primary-focus)}.tk-chips.primary.filled{color:var(--text-lightest);background-color:var(--primary-base)}.tk-chips.primary.filled:hover{background-color:var(--primary-dark, #b70017)}.tk-chips.primary.outlined{border:1px solid var(--primary-base)}.tk-chips.primary.outlined:hover{background-color:var(--primary-lightest, #fae6e8)}.tk-chips.primary.filledlight{background-color:var(--primary-light, #eeb0b8);color:var(--primary-base)}.tk-chips.primary.avatar{border:1px solid var(--primary-base, #c90019)}.tk-chips.primary.avatar:hover{background-color:var(--primary-lightest, #fae6e8)}.tk-chips.secondary{color:var(--secondary-darkest)}.tk-chips.secondary.filled{background-color:var(--secondary-darkest);color:var(--text-lightest)}.tk-chips.secondary.filled:hover{background-color:var(--secondary-dark, #607083)}.tk-chips.secondary.outlined{border:1px solid var(--secondary-darkest)}.tk-chips.secondary.outlined:hover{background-color:var(--secondary-lightest, #f2f3f5)}.tk-chips.secondary.filledlight{background-color:var(--secondary-light);color:var(--secondary-darkest)}.tk-chips.secondary.filledlight:hover{color:var(--secondary-dark);background-color:var(--secondary-light, #dadee3)}.tk-chips.secondary.avatar{border:1px solid var(--secondary-darkest, #34404f)}.tk-chips.secondary.avatar:hover{background-color:var(--secondary-lightest, #dadee3)}.tk-chips.neutral{color:var(--text-darkest)}.tk-chips.neutral.filled{background-color:var(--background-darkest);color:var(--text-lightest, #f9fafc)}.tk-chips.neutral.filled:hover{background-color:var(--background-dark, #525866)}.tk-chips.neutral.outlined{border:1px solid var(--background-darkest)}.tk-chips.neutral.outlined:hover{background-color:var(--background-lightest, #f9fafc)}.tk-chips.neutral.filledlight{background-color:var(--icon-lightest)}.tk-chips.neutral.filledlight:hover{color:var(--text-dark)}.tk-chips.neutral.avatar{border:1px solid var(--background-darkest, #222530)}.tk-chips.neutral.avatar:hover{background-color:var(--background-lightest, #f9fafc)}.tk-chips.info{color:var(--states-info-dark, #295bac)}.tk-chips.info.filled{color:var(--text-lightest, #f9fafc);background-color:var(--states-info-dark)}.tk-chips.info.filled:hover{background-color:var(--states-info-darkest)}.tk-chips.info.outlined{border:1px solid var(--states-info-dark, #295bac)}.tk-chips.info.outlined:hover{background-color:var(--states-info-lightest, #d0e1fd)}.tk-chips.info.filledlight{background-color:var(--states-info-lightest, #d0e1fd)}.tk-chips.info.filledlight:hover{color:var(--states-info-darkest, #183462)}.tk-chips.info.avatar{border:1px solid var(--states-info-dark, #295bac)}.tk-chips.info.avatar:hover{background-color:var(--states-info-lightest, #d0e1fd)}.tk-chips.success{color:var(--states-success-dark, #188a42)}.tk-chips.success.filled{color:var(--text-lightest, #f9fafc);background-color:var(--states-success-dark, #188a42)}.tk-chips.success.filled:hover{background-color:var(--states-success-darkest, #0e4f26)}.tk-chips.success.outlined{border:1px solid var(--states-success-dark, #188a42)}.tk-chips.success.outlined:hover{background-color:var(--states-success-lightest, #caf1d8)}.tk-chips.success.filledlight{background-color:var(--states-success-lightest, #caf1d8)}.tk-chips.success.filledlight:hover{color:var(--states-success-darkest, #0e4f26)}.tk-chips.success.avatar{border:1px solid var(--states-success-dark, #188a42)}.tk-chips.success.avatar:hover{background-color:var(--states-success-lightest, #caf1d8)}.tk-chips.danger{color:var(--states-danger-dark, #b32b23)}.tk-chips.danger.filled{color:var(--text-lightest, #f9fafc);background-color:var(--states-danger-dark, #b32b23)}.tk-chips.danger.filled:hover{background-color:var(--states-danger-darkest, #661814)}.tk-chips.danger.outlined{border:1px solid var(--states-danger-dark, #b32b23)}.tk-chips.danger.outlined:hover{background-color:var(--states-danger-lightest, #ffd0ce)}.tk-chips.danger.filledlight{background-color:var(--states-danger-lightest, #ffd0ce)}.tk-chips.danger.filledlight:hover{color:var(--states-danger-darkest, #661814)}.tk-chips.danger.avatar{border:1px solid var(--states-danger-dark, #b32b23)}.tk-chips.danger.avatar:hover{background-color:var(--states-danger-lightest, #ffd0ce)}.tk-chips.warning{color:var(--states-warning-dark, #c79807)}.tk-chips.warning.filled{background-color:var(--states-warning-dark, #c79807);color:var(--text-lightest, #f9fafc)}.tk-chips.warning.filled:hover{background-color:var(--states-warning-lightest, #f6de95)}.tk-chips.warning.outlined{border:1px solid var(--states-warning-dark, #c79807)}.tk-chips.warning.outlined:hover{background-color:var(--states-warning-lightest, #f6de95)}.tk-chips.warning.filledlight{background-color:var(--states-warning-lightest, #f6de95)}.tk-chips.warning.filledlight:hover{color:var(--states-warning-darkest, #816204)}.tk-chips.warning.avatar{border:1px solid var(--states-warning-dark, #c79807)}.tk-chips.warning.avatar:hover{background-color:var(--states-warning-lightest, #f6de95)}.tk-chips.verified{color:var(--states-verified-dark, #609af8)}.tk-chips.verified.filled{color:var(--text-lightest, #f9fafc);background-color:var(--states-verified-dark, #609af8)}.tk-chips.verified.filled:hover{background-color:var(--states-verified-darkest, #3b82f6)}.tk-chips.verified.outlined{border:1px solid var(--states-verified-dark, #609af8)}.tk-chips.verified.outlined:hover{background-color:var(--states-verified-lightest, #d0e1fd)}.tk-chips.verified.filledlight{background-color:var(--states-verified-lightest, #d0e1fd)}.tk-chips.verified.filledlight:hover{color:var(--states-verified-darkest, #3b82f6)}.tk-chips.verified.avatar{border:1px solid var(--states-verified-dark, #609af8)}.tk-chips.verified.avatar:hover{background-color:var(--states-verified-lightest, #d0e1fd)}.tk-chips.small{padding:calc(var(--chips-small-v-padding, 1px) - 1px) var(--chips-small-h-padding, 4px);font-size:var(--desktop-body-xs-size, 12px);font-style:normal;font-weight:400;line-height:var(--desktop-body-xs-line-height, 18px);gap:2px}.tk-chips.small i{font-size:14px}.tk-chips.base{padding:calc(var(--chips-base-v-padding-1, 2px) - 1px) var(--chips-base-h-padding, 6px);font-size:var(--desktop-body-s-size, 14px);font-style:normal;font-weight:400;line-height:var(--desktop-body-s-line-height, 20px);gap:4px}.tk-chips.base i{font-size:16px}.tk-chips.large{padding:calc(var(--chips-large-v-padding, 4px) - 2px) var(--chips-large-h-padding, 8px);font-size:var(--desktop-body-s-size, 14px);font-style:normal;font-weight:400;line-height:var(--desktop-body-s-line-height, 20px);gap:6px}.tk-chips.large i{font-size:20px}';

const TkChips = /*@__PURE__*/ proxyCustomElement(
  class TkChips extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkRemove = createEvent(this, 'tk-remove', 7);
      /**
       * The disabled status.
       * @defaultValue false
       */
      this.disabled = false;
      /**
       * This field specifies the design type of the component.
       * @defaultValue filled
       */
      this.type = 'filled';
      /**
       * This property determines whether the chip component is removable.
       * @defaultValue false
       */
      this.removable = false;
      /**
       * Determines whether the chip automatically removes itself when the close button is clicked.
       * @defaultValue true
       */
      this.autoSelfDestroy = true;
      /**
       * Sets size for the component.
       * @defaultValue 'base'
       */
      this.size = 'base';
      /**
       * The variant of the chip for styling.
       * @defaultValue 'primary'
       */
      this.variant = 'primary';
    }
    componentWillLoad() {
      if (this.value == null) this.value = this.label;
    }
    handleClick() {
      var _a;
      this.tkRemove.emit(this.value);
      if (this.autoSelfDestroy) (_a = this.el) === null || _a === void 0 ? void 0 : _a.remove();
    }
    render() {
      const rootClasses = classNames('tk-chips', this.variant, this.size, this.type, {
        removable: this.removable,
        disabled: this.disabled,
      });
      const icon = this.icon && h('tk-icon', Object.assign({ key: '7088517fb5fb55e2338c92358e8bdb8d574b1469' }, getIconElementProps(this.icon, { variant: null })));
      return h(
        'div',
        { key: '04a19b5b00c43b09c4d54df2dd1bc1abe7df21c5', class: rootClasses },
        icon,
        this.label,
        this.removable && h('i', { key: 'd0437032cff240de343578a26b92e4acdeeacaeb', onClick: () => this.handleClick(), class: 'material-symbols-outlined' }, 'close'),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkChipsCss;
    }
  },
  [
    1,
    'tk-chips',
    {
      disabled: [4],
      type: [1],
      icon: [1],
      label: [1],
      removable: [4],
      autoSelfDestroy: [4, 'auto-self-destroy'],
      size: [1],
      variant: [1],
      value: [8],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-chips', 'tk-icon'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-chips':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkChips);
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

export { TkChips as T, defineCustomElement as d };
//# sourceMappingURL=p-C3H0tZoE.js.map

//# sourceMappingURL=p-C3H0tZoE.js.map
