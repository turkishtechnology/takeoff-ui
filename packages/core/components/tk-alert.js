import { p as proxyCustomElement, H, h, F as Fragment } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$4 } from './p-D_-4qiry.js';
import { d as defineCustomElement$3 } from './p-DrRHtkyE.js';
import { d as defineCustomElement$2 } from './p-Dz92n4WS.js';

const tkAlertScss =
  ':host {\n  display: block;\n}\n\n.tk-alert-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--toast-base-gap);\n  border-radius: var(--toast-base-radius);\n  box-shadow: var(--effect-1-default-lg);\n  padding: var(--toast-base-v-padding) var(--toast-base-h-padding);\n  border-width: 1px;\n  border-style: solid;\n\n  &.tk-alert-alignment-center {\n    align-items: center;\n  }\n  &.tk-alert-alignment-start {\n    align-items: flex-start;\n  }\n  &.tk-alert-alignment-end {\n    align-items: flex-end;\n  }\n\n  .tk-alert-content {\n    display: flex;\n    justify-content: flex-start;\n    flex-direction: column;\n    gap: var(--toast-base-content-gap);\n    width: 100%;\n\n    &.message-content {\n      justify-content: center;\n    }\n  }\n\n  .tk-alert-content {\n    .tk-alert-header {\n      font-size: var(--desktop-body-s-size);\n      font-weight: 400;\n      line-height: 20px;\n    }\n\n    .tk-alert-message {\n      font-size: var(--desktop-body-xs-size);\n      font-weight: 300;\n      line-height: 18px;\n    }\n  }\n\n  &.success {\n    border-color: var(--states-success-base);\n\n    &.filled {\n      background-color: var(--states-success-base);\n    }\n\n    &.filledlight {\n      background-color: var(--states-success-light);\n    }\n\n    &.outlined {\n      background-color: var(--background-lightest);\n    }\n\n    &.gradient {\n      background: var(--gradient-success-gradient-tozero, linear-gradient(270deg, rgba(202, 241, 216, 0) 89%, #a0e6ba 100%));\n    }\n  }\n\n  &.info {\n    border-color: var(--states-info-base);\n\n    &.filled {\n      background-color: var(--states-info-base);\n    }\n\n    &.filledlight {\n      background-color: var(--states-info-light);\n    }\n\n    &.outlined {\n      background-color: var(--background-lightest);\n    }\n\n    &.gradient {\n      background: var(--gradient-info-gradient-tozero, linear-gradient(270deg, rgba(208, 225, 253, 0) 89%, #abc9fb 100%));\n    }\n  }\n\n  &.danger {\n    border-color: var(--states-danger-base);\n\n    &.filled {\n      background-color: var(--states-danger-base);\n    }\n\n    &.filledlight {\n      background-color: var(--states-danger-light);\n    }\n\n    &.outlined {\n      background-color: var(--background-lightest);\n    }\n\n    &.gradient {\n      background: var(--gradient-danger-gradinet-tozero, linear-gradient(270deg, rgba(255, 208, 206, 0) 89%, #ff8780 100%));\n    }\n  }\n\n  &.warning {\n    border-color: var(--states-warning-base);\n\n    &.filled {\n      background-color: var(--states-warning-base);\n    }\n\n    &.filledlight {\n      background-color: var(--states-warning-light);\n    }\n\n    &.outlined {\n      background-color: var(--background-lightest);\n    }\n\n    &.gradient {\n      background: var(--gradient-warning-gradient-tozero, linear-gradient(270deg, rgba(246, 222, 149, 0) 89%, #f2d066 100%));\n    }\n  }\n\n  &.neutral {\n    border-color: var(--border-sub-base);\n\n    &.filled {\n      background-color: var(--background-sub-base);\n\n      .tk-alert-content {\n        .tk-alert-header {\n          color: var(--text-darkest);\n        }\n\n        .tk-alert-message {\n          color: var(--text-dark);\n        }\n      }\n    }\n\n    &.filledlight {\n      background-color: var(--background-light);\n    }\n\n    &.outlined {\n      background-color: var(--background-lightest);\n    }\n\n    &.gradient {\n      background: var(--gradient-gradient-gray, linear-gradient(270deg, rgba(202, 207, 216, 0) 89%, #cacfd8 100%));\n    }\n  }\n\n  &.filled {\n    .tk-alert-content {\n      .tk-alert-header {\n        color: var(--text-lightest);\n      }\n\n      .tk-alert-message {\n        color: var(--text-lightest);\n      }\n    }\n  }\n\n  &.filledlight,\n  &.outlined,\n  &.gradient {\n    .tk-alert-content {\n      .tk-alert-header {\n        color: var(--text-darkest);\n      }\n\n      .tk-alert-message {\n        color: var(--text-dark);\n      }\n    }\n  }\n}\n';

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
      return tkAlertScss;
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
