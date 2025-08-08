import { p as proxyCustomElement, H, h, F as Fragment } from './p-CsLMRZQo.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$4 } from './p-DFQnxT5R.js';
import { d as defineCustomElement$3 } from './p-vR69rcDp.js';
import { d as defineCustomElement$2 } from './p-CEvspPP4.js';

const tkAlertCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}.tk-alert-container{display:flex;justify-content:space-between;align-items:center;gap:var(--toast-base-gap);border-radius:var(--toast-base-radius);box-shadow:var(--effect-1-default-lg);padding:var(--toast-base-v-padding) var(--toast-base-h-padding);border-width:1px;border-style:solid}.tk-alert-container.tk-alert-alignment-center{align-items:center}.tk-alert-container.tk-alert-alignment-start{align-items:flex-start}.tk-alert-container.tk-alert-alignment-end{align-items:flex-end}.tk-alert-container .tk-alert-content{display:flex;justify-content:flex-start;flex-direction:column;gap:var(--toast-base-content-gap);width:100%}.tk-alert-container .tk-alert-content.message-content{justify-content:center}.tk-alert-container .tk-alert-content .tk-alert-header{font-size:var(--desktop-body-s-size);font-weight:400;line-height:20px}.tk-alert-container .tk-alert-content .tk-alert-message{font-size:var(--desktop-body-xs-size);font-weight:300;line-height:18px}.tk-alert-container.success{border-color:var(--states-success-base)}.tk-alert-container.success.filled{background-color:var(--states-success-base)}.tk-alert-container.success.filledlight{background-color:var(--states-success-light)}.tk-alert-container.success.outlined{background-color:var(--background-lightest)}.tk-alert-container.success.gradient{background:var(--gradient-success-gradient-tozero, linear-gradient(270deg, rgba(202, 241, 216, 0) 89%, #a0e6ba 100%))}.tk-alert-container.info{border-color:var(--states-info-base)}.tk-alert-container.info.filled{background-color:var(--states-info-base)}.tk-alert-container.info.filledlight{background-color:var(--states-info-light)}.tk-alert-container.info.outlined{background-color:var(--background-lightest)}.tk-alert-container.info.gradient{background:var(--gradient-info-gradient-tozero, linear-gradient(270deg, rgba(208, 225, 253, 0) 89%, #abc9fb 100%))}.tk-alert-container.danger{border-color:var(--states-danger-base)}.tk-alert-container.danger.filled{background-color:var(--states-danger-base)}.tk-alert-container.danger.filledlight{background-color:var(--states-danger-light)}.tk-alert-container.danger.outlined{background-color:var(--background-lightest)}.tk-alert-container.danger.gradient{background:var(--gradient-danger-gradinet-tozero, linear-gradient(270deg, rgba(255, 208, 206, 0) 89%, #ff8780 100%))}.tk-alert-container.warning{border-color:var(--states-warning-base)}.tk-alert-container.warning.filled{background-color:var(--states-warning-base)}.tk-alert-container.warning.filledlight{background-color:var(--states-warning-light)}.tk-alert-container.warning.outlined{background-color:var(--background-lightest)}.tk-alert-container.warning.gradient{background:var(--gradient-warning-gradient-tozero, linear-gradient(270deg, rgba(246, 222, 149, 0) 89%, #f2d066 100%))}.tk-alert-container.neutral{border-color:var(--border-sub-base)}.tk-alert-container.neutral.filled{background-color:var(--background-sub-base)}.tk-alert-container.neutral.filled .tk-alert-content .tk-alert-header{color:var(--text-darkest)}.tk-alert-container.neutral.filled .tk-alert-content .tk-alert-message{color:var(--text-dark)}.tk-alert-container.neutral.filledlight{background-color:var(--background-light)}.tk-alert-container.neutral.outlined{background-color:var(--background-lightest)}.tk-alert-container.neutral.gradient{background:var(--gradient-gradient-gray, linear-gradient(270deg, rgba(202, 207, 216, 0) 89%, #cacfd8 100%))}.tk-alert-container.filled .tk-alert-content .tk-alert-header{color:var(--text-lightest)}.tk-alert-container.filled .tk-alert-content .tk-alert-message{color:var(--text-lightest)}.tk-alert-container.filledlight .tk-alert-content .tk-alert-header,.tk-alert-container.outlined .tk-alert-content .tk-alert-header,.tk-alert-container.gradient .tk-alert-content .tk-alert-header{color:var(--text-darkest)}.tk-alert-container.filledlight .tk-alert-content .tk-alert-message,.tk-alert-container.outlined .tk-alert-content .tk-alert-message,.tk-alert-container.gradient .tk-alert-content .tk-alert-message{color:var(--text-dark)}';

const TkAlert$1 = /*@__PURE__*/ proxyCustomElement(
  class TkAlert extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.hasRightActionSlot = false;
      this.hasFooterActionSlot = false;
      this.hasContentSlot = false;
      /**
       * Defines the visual variant of the alert.
       * @defaultValue 'neutral'
       */
      this.variant = 'neutral';
      /**
       * Size of the icon displayed in the alert ('small', 'base', or 'large').
       * @defaultValue 'base'
       */
      this.iconSize = 'large';
      /**
       * Alignment of the alert content ('start', 'center', or 'end').
       * @defaultValue 'center'
       */
      this.alignItems = 'center';
      /**
       * This field specifies the design type of the component.
       * @defaultValue filled
       */
      this.type = 'filled';
      /**
       * The alert can be closed by the user.
       * @defaultValue false
       */
      this.removable = false;
    }
    handleCloseButtonClick() {
      this.el.remove();
    }
    renderIcon() {
      let iconValue = this.icon;
      if (iconValue == undefined) {
        if (this.variant == 'success') iconValue = 'check_circle';
        else if (this.variant == 'info') iconValue = 'info';
        else if (this.variant == 'danger') iconValue = 'error';
        else if (this.variant == 'warning') iconValue = 'warning';
      }
      return h('tk-icon', Object.assign({ fill: true }, getIconElementProps(iconValue, { variant: this.variant, sign: true, size: this.iconSize }, 'rounded', 'i')));
    }
    renderContent() {
      var _a, _b, _c;
      let header, message;
      if (((_a = this.header) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        header = h('div', { class: 'tk-alert-header' }, this.header);
      }
      if (typeof this.message == 'string') {
        message = h('div', { class: 'tk-alert-message' }, this.message);
      } else if ((_b = this.message) === null || _b === void 0 ? void 0 : _b.every(item => typeof item === 'string')) {
        message = h('div', { class: 'tk-alert-message-holder' }, (_c = this.message) === null || _c === void 0 ? void 0 : _c.map(m => h('div', { class: 'tk-alert-message' }, m)));
      }
      return h(
        'div',
        { class: classNames('tk-alert-content', !this.header && 'message-content') },
        h('div', null, header, message),
        this.hasFooterActionSlot && h('slot', { name: 'footer-action' }),
      );
    }
    renderCloseButton() {
      if (!this.removable) return null;
      const buttonVariant = this.type == 'filled' ? 'white' : 'neutral';
      return h('tk-button', { 'icon': 'close', 'size': 'small', 'variant': buttonVariant, 'type': 'text', 'onTk-click': () => this.handleCloseButtonClick() });
    }
    render() {
      this.hasContentSlot = !!this.el.querySelector('[slot="content"]');
      this.hasRightActionSlot = !!this.el.querySelector('[slot="right-action"]');
      this.hasFooterActionSlot = !!this.el.querySelector('[slot="footer-action"]');
      const rootClasses = classNames('tk-alert-container', this.variant, this.type, `tk-alert-alignment-${this.alignItems}`);
      const icon = this.renderIcon();
      const content = this.renderContent();
      const closeButton = this.renderCloseButton();
      return h(
        'div',
        { key: 'd6271d622b395cc36bf9de48a35c8a1360898df1', class: rootClasses },
        this.hasContentSlot ? h('slot', { name: 'content' }) : h(Fragment, null, icon, content),
        this.hasRightActionSlot && h('slot', { key: '7963ed4b8fc842c467420a7368448471fdc0111f', name: 'right-action' }),
        closeButton,
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkAlertCss;
    }
  },
  [
    1,
    'tk-alert',
    {
      variant: [1],
      header: [1],
      message: [1],
      icon: [1],
      iconSize: [1, 'icon-size'],
      alignItems: [1, 'align-items'],
      type: [1],
      removable: [4],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-alert', 'tk-button', 'tk-icon', 'tk-spinner'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-alert':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkAlert$1);
        }
        break;
      case 'tk-button':
        if (!customElements.get(tagName)) {
          defineCustomElement$4();
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$3();
        }
        break;
      case 'tk-spinner':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
    }
  });
}

const TkAlert = TkAlert$1;
const defineCustomElement = defineCustomElement$1;

export { TkAlert, defineCustomElement };
//# sourceMappingURL=tk-alert.js.map

//# sourceMappingURL=tk-alert.js.map
