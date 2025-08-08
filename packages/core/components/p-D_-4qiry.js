import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$2 } from './p-DrRHtkyE.js';
import { d as defineCustomElement$1 } from './p-Dz92n4WS.js';

const tkButtonScss =
  ":host {\n  display: inline-block;\n}\n\n:host(.full-width) {\n  width: 100%;\n\n  .tk-button {\n    width: 100%;\n  }\n}\n\n.tk-button {\n  font-family: 'Geologica', sans-serif;\n  font-weight: 400;\n  line-height: var(--desktop-body-m-base-line-height);\n  transition: all 200ms cubic-bezier(0.17, 0.67, 0.83, 0.67);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  outline: none;\n\n  &.primary {\n    border: 0px;\n    color: var(--static-white);\n\n    &.filled {\n      background-color: var(--primary-base);\n\n      &:hover {\n        background-color: var(--primary-darkest);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--primary-base);\n        box-shadow: var(--primary-focus);\n      }\n\n      &:disabled {\n        background-color: var(--frames-sub-base);\n      }\n    }\n\n    &.outlined {\n      background-color: transparent;\n      color: var(--primary-base);\n      border: 1px solid var(--primary-base);\n\n      &:hover {\n        background-color: var(--primary-lightest);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--overlay-white-lightest);\n        box-shadow: var(--primary-focus);\n      }\n\n      &:disabled {\n        color: var(--text-sub-base);\n        border: 1px solid var(--border-sub-base);\n      }\n    }\n\n    &.text {\n      background-color: transparent;\n      color: var(--primary-base);\n\n      &:hover {\n        background-color: var(--primary-lightest);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--primary-lightest);\n        box-shadow: var(--primary-focus);\n      }\n\n      &:disabled {\n        background-color: transparent;\n        color: var(--text-sub-base);\n      }\n    }\n\n    &.link {\n      color: var(--primary-base);\n\n      &:hover {\n        color: var(--primary-dark);\n        cursor: pointer;\n      }\n    }\n  }\n\n  &.secondary {\n    border: 0px;\n    color: var(--text-lightest);\n\n    &.filled {\n      background-color: var(--secondary-darkest);\n\n      &:hover {\n        background-color: var(--secondary-dark);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--secondary-darkest);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        background-color: var(--frames-sub-base);\n        color: var(--text-lightest);\n      }\n    }\n\n    &.outlined {\n      background-color: transparent;\n      color: var(--secondary-base);\n      border: 1px solid var(--secondary-base);\n\n      &:hover {\n        background-color: var(--secondary-lightest);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--overlay-white-lightest);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        color: var(--text-sub-base);\n        border-color: var(--border-sub-base);\n      }\n    }\n\n    &.text {\n      background-color: transparent;\n      color: var(--secondary-base);\n\n      &:hover {\n        background-color: var(--secondary-lightest);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--secondary-lightest);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        background-color: transparent;\n        color: var(--text-sub-base);\n      }\n    }\n\n    &.link {\n      color: var(--secondary-dark);\n\n      &:hover {\n        color: var(--secondary-darkest);\n        cursor: pointer;\n      }\n    }\n  }\n\n  &.neutral {\n    border: 0px;\n    color: var(--text-lightest);\n\n    &.filled {\n      background-color: var(--frames-base);\n\n      .tk-button-icon {\n        color: var(--icon-lightest);\n      }\n\n      &:hover {\n        background-color: var(--frames-darkest);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--frames-base);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        background-color: var(--frames-sub-base);\n      }\n    }\n\n    &.outlined {\n      background-color: transparent;\n      color: var(--text-darkest);\n      border: 1px solid var(--border-sub-base);\n\n      .tk-button-icon {\n        color: var(--icon-darkest);\n      }\n\n      &:hover {\n        background-color: var(--frames-lightest);\n        border: 1px solid var(--border-base);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--overlay-white-lightest);\n        border: 1px solid var(--border-base);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        color: var(--text-sub-base);\n        border-color: var(--border-sub-base);\n\n        .tk-button-icon {\n          color: var(--icon-sub-base);\n        }\n      }\n    }\n\n    &.text {\n      background-color: transparent;\n      color: var(--text-darkest);\n\n      .tk-button-icon {\n        color: var(--icon-darkest);\n      }\n\n      &:hover {\n        background-color: var(--frames-lightest);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--frames-lightest);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        background-color: transparent;\n        color: var(--text-sub-base);\n\n        .tk-button-icon {\n          color: var(--icon-sub-base);\n        }\n      }\n    }\n\n    &.link {\n      color: var(--text-dark);\n\n      &:hover {\n        color: var(--text-darkest);\n        cursor: pointer;\n      }\n    }\n  }\n\n  &.info {\n    border: 0px;\n    color: var(--text-lightest);\n\n    &.filled {\n      background-color: var(--states-info-dark);\n\n      .tk-button-icon {\n        color: var(--icon-lightest);\n      }\n\n      &:hover {\n        background-color: var(--states-info-darkest);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--states-info-base);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        background-color: var(--states-info-sub-base);\n      }\n    }\n\n    &.outlined {\n      background-color: transparent;\n      color: var(--states-info-dark);\n      border: 1px solid var(--states-info-dark);\n\n      &:hover {\n        background-color: var(--states-info-light);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--overlay-white-lightest);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        color: var(--states-info-light);\n        border: 1px solid var(--states-info-light);\n      }\n    }\n\n    &.text {\n      background-color: transparent;\n      color: var(--states-info-dark);\n\n      &:hover {\n        background-color: var(--states-info-light);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--states-info-light);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        background-color: transparent;\n        color: var(--states-info-light);\n      }\n    }\n\n    &.link {\n      color: var(--states-info-dark);\n\n      &:hover {\n        color: var(--states-info-darkest);\n        cursor: pointer;\n      }\n    }\n  }\n\n  &.success {\n    border: 0px;\n    color: var(--text-lightest);\n\n    &.filled {\n      background-color: var(--states-success-dark);\n\n      .tk-button-icon {\n        color: var(--icon-lightest);\n      }\n\n      &:hover {\n        background-color: var(--states-success-darkest);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--states-success-dark);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        background-color: var(--states-success-sub-base);\n      }\n    }\n\n    &.outlined {\n      background-color: transparent;\n      color: var(--states-success-dark);\n      border: 1px solid var(--states-success-dark);\n\n      &:hover {\n        background-color: var(--states-success-light);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--overlay-white-lightest);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        color: var(--states-success-light);\n        border: 1px solid var(--states-success-light);\n      }\n    }\n\n    &.text {\n      background-color: transparent;\n      color: var(--states-success-dark);\n\n      &:hover {\n        background-color: var(--states-success-light);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--states-success-light);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        background-color: transparent;\n        color: var(--states-success-light);\n      }\n    }\n\n    &.link {\n      color: var(--states-success-dark);\n\n      &:hover {\n        color: var(--states-success-darkest);\n        cursor: pointer;\n      }\n    }\n  }\n\n  &.danger {\n    border: 0px;\n    color: var(--states-danger-dark);\n\n    &.filled {\n      background-color: var(--states-danger-dark);\n      color: var(--text-lightest);\n\n      .tk-button-icon {\n        color: var(--icon-lightest);\n      }\n\n      &:hover {\n        background-color: var(--states-danger-darkest);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--states-danger-dark);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        background-color: var(--states-danger-light);\n      }\n    }\n\n    &.outlined {\n      background-color: transparent;\n      border: 1px solid var(--states-danger-dark);\n\n      &:hover {\n        background-color: var(--states-danger-light);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--overlay-white-lightest);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        color: var(--states-danger-light);\n        border: 1px solid var(--states-danger-light);\n      }\n    }\n\n    &.text {\n      background-color: transparent;\n\n      &:hover {\n        background-color: var(--states-danger-light);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--states-danger-light);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        background-color: transparent;\n        color: var(--states-danger-light);\n      }\n    }\n\n    &.link {\n      color: var(--states-danger-dark);\n\n      &:hover {\n        color: var(--states-danger-darkest);\n        cursor: pointer;\n      }\n    }\n  }\n\n  &.warning {\n    border: 0px;\n    color: var(--states-warning-dark);\n\n    &.filled {\n      background-color: var(--states-warning-dark);\n      color: var(--text-lightest);\n\n      .tk-button-icon {\n        color: var(--icon-lightest);\n      }\n\n      &:hover {\n        background-color: var(--states-warning-darkest);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--states-warning-dark);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        background-color: var(--states-warning-sub-base);\n      }\n    }\n\n    &.outlined {\n      background-color: transparent;\n      border: 1px solid var(--states-warning-dark);\n\n      &:hover {\n        background-color: var(--states-warning-light);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--overlay-white-light);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        color: var(--states-warning-light);\n        border: 1px solid var(--states-warning-light);\n      }\n    }\n\n    &.text {\n      background-color: transparent;\n\n      &:hover {\n        background-color: var(--states-warning-light);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--states-warning-light);\n        box-shadow: var(--secondary-focus);\n      }\n\n      &:disabled {\n        background-color: transparent;\n        color: var(--states-warning-light);\n      }\n    }\n\n    &.link {\n      color: var(--states-warning-dark);\n\n      &:hover {\n        color: var(--states-warning-darkest);\n        cursor: pointer;\n      }\n    }\n  }\n\n  &.white {\n    border: 0px;\n    box-shadow: var(--secondary-focus);\n\n    &.filled {\n      background-color: var(--static-light);\n      color: var(--text-darkest);\n\n      .tk-button-icon {\n        color: var(--icon-darkest);\n      }\n\n      &:hover {\n        background-color: var(--background-lightest);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--static-light);\n      }\n\n      &:disabled {\n        background-color: var(--static-light);\n        color: var(--text-lightest);\n      }\n    }\n\n    &.outlined {\n      background-color: transparent;\n      color: var(--static-light);\n      border: 1px solid var(--static-light);\n\n      &:hover {\n        background-color: var(--overlay-white-light);\n        cursor: pointer;\n      }\n\n      &:focus-visible {\n        background-color: var(--overlay-white-lightest);\n      }\n\n      &:disabled {\n        color: var(--text-sub-base);\n        border-color: var(--border-sub-base);\n      }\n    }\n\n    &.text {\n      background-color: transparent;\n      color: var(--static-light);\n      box-shadow: none;\n\n      &:hover {\n        color: var(--text-dark);\n        background-color: var(--overlay-white-light);\n        cursor: pointer;\n      }\n    }\n\n    &.link {\n      color: var(--text-lightest);\n\n      &:hover {\n        color: var(--text-light);\n        cursor: pointer;\n      }\n    }\n  }\n\n  &:disabled {\n    cursor: not-allowed;\n    pointer-events: none;\n  }\n\n  &.reverse {\n    flex-direction: row-reverse;\n  }\n\n  &.small {\n    height: 32px;\n    font-size: var(--desktop-body-xs-size);\n    border-radius: var(--button-sizes-small-radius);\n    padding: var(--button-sizes-small-v-padding) var(--button-sizes-small-h-padding);\n    gap: var(--button-sizes-small-gap);\n\n    &.rounded {\n      height: unset;\n      border-radius: 100%;\n      padding: var(--fab-button-sizes-small-v-padding) var(--fab-button-sizes-small-h-padding);\n    }\n\n    i {\n      font-size: var(--button-sizes-small-icon-size);\n      width: var(--button-sizes-small-icon-size);\n      height: var(--button-sizes-small-icon-size);\n      line-height: unset;\n    }\n    &.icon-only {\n      padding: var(--sizes-small-full-padding, 6px);\n    }\n  }\n\n  &.base {\n    height: 40px;\n    font-size: var(--desktop-body-s-size);\n    border-radius: var(--button-sizes-base-radius);\n    padding: var(--button-sizes-base-v-padding) var(--button-sizes-base-h-padding);\n    gap: var(--button-sizes-base-gap);\n\n    &.rounded {\n      height: unset;\n      border-radius: 100%;\n      padding: var(--fab-button-sizes-base-v-padding) var(--fab-button-sizes-base-h-padding);\n    }\n\n    i {\n      font-size: var(--button-sizes-base-icon-size);\n      width: var(--button-sizes-base-icon-size);\n      height: var(--button-sizes-base-icon-size);\n      line-height: unset;\n    }\n    &.icon-only {\n      padding: var(--sizes-base-full-padding, 8px);\n    }\n  }\n\n  &.large {\n    height: 48px;\n    font-size: var(--desktop-body-m-base-size);\n    border-radius: var(--button-sizes-large-radius);\n    padding: var(--button-sizes-large-v-padding) var(--button-sizes-large-h-padding);\n    gap: var(--button-sizes-large-gap);\n\n    &.rounded {\n      height: unset;\n      border-radius: 100%;\n      padding: var(--fab-button-sizes-large-v-padding) var(--fab-button-sizes-large-h-padding);\n    }\n\n    i {\n      font-size: var(--button-sizes-large-icon-size);\n      width: var(--button-sizes-large-icon-size);\n      height: var(--button-sizes-large-icon-size);\n      line-height: unset;\n    }\n    &.icon-only {\n      padding: var(--sizes-large-full-padding, 12px);\n    }\n  }\n\n  &.link {\n    padding: 0;\n    background-color: transparent;\n    text-decoration: none;\n\n    &.underline span {\n      text-decoration: underline;\n    }\n\n    &:disabled {\n      color: var(--text-sub-base);\n    }\n\n    &.small {\n      height: 18px;\n\n      i {\n        font-size: var(--link-button-sizes-small-icon-size);\n        width: var(--link-button-sizes-small-icon-size);\n        height: var(--link-button-sizes-small-icon-size);\n      }\n    }\n\n    &.base {\n      height: 20px;\n\n      i {\n        font-size: var(--link-button-sizes-base-icon-size);\n        width: var(--link-button-sizes-base-icon-size);\n        height: var(--link-button-sizes-base-icon-size);\n      }\n    }\n\n    &.large {\n      height: 24px;\n\n      i {\n        font-size: var(--link-button-sizes-large-icon-size);\n        width: var(--link-button-sizes-large-icon-size);\n        height: var(--link-button-sizes-large-icon-size);\n      }\n    }\n  }\n\n  i {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n}\n";

const TkButton = /*@__PURE__*/ proxyCustomElement(
  class TkButton extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkClick = createEvent(this, 'tk-click', 7);
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
       * Label text displayed inside the button.
       */
      this.label = '';
      /**
       * Sets size for the component.
       * @defaultValue 'base'
       */
      this.size = 'base';
      /**
       * Sets the button type.
       * @defaultValue 'button'
       */
      this.mode = 'button';
      /**
       * Determines the button's variant for different styles.
       */
      this.variant = 'primary';
    }
    componentWillLoad() {
      if (this.mode == 'link') {
        this.type = null;
      }
    }
    handleClick(e) {
      if (this.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      this.tkClick.emit(e);
      if (this.mode === 'submit') {
        const form = this.el.closest('form');
        if (form) {
          form.requestSubmit();
        }
      } else if (this.mode === 'reset') {
        const form = this.el.closest('form');
        if (form) {
          form.reset();
        }
      }
    }
    render() {
      var _a;
      const rootClasses = classNames(
        'tk-button',
        this.type,
        {
          'loading': this.loading && !this.disabled,
          'reverse': this.icon && this.iconPosition == 'right',
          'rounded': this.rounded && this.icon && (this.label == '' || this.label == null || this.label.length <= 0),
          'link': this.mode == 'link',
          'underline': this.underline,
          'icon-only': (this.label == '' || this.label == null || this.label.length <= 0) && this.icon,
        },
        [this.variant],
        [this.size],
      );
      let icon;
      const spinnerElement = h('tk-spinner', {
        key: '5f98c33058b7ad23361b1942cf485e2539c621c5',
        size: this.size === 'large' ? 'small' : this.size === 'base' ? 'xsmall' : 'xxsmall',
      });
      if (this.loading) {
        icon = spinnerElement;
      } else if (this.icon) {
        icon = h('tk-icon', Object.assign({ key: 'b839c92010a917ce31fb27ae8f4897945c370a04' }, getIconElementProps(this.icon, { class: 'tk-button-icon', variant: null })));
      }
      let Tag;
      let props;
      if (this.mode == 'link') {
        Tag = 'a';
        props = { href: this.href, target: this.target };
      } else {
        Tag = 'button';
        props = { type: this.type };
      }
      let label;
      if (((_a = this.label) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        label = h('span', { key: 'a2a44ecc7469ec757f07bdd915fb40db2dfc9f58' }, this.label);
      }
      return h(
        Host,
        { key: 'a71a5292f75b07582166fd468110f5854531386e', class: { 'full-width': this.fullWidth } },
        h(
          Tag,
          Object.assign({ key: 'c9bafb40d46801a0c94901359884c77d3aae531e', class: rootClasses }, props, { disabled: this.disabled, onClick: e => this.handleClick(e) }),
          icon,
          label,
        ),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkButtonScss;
    }
  },
  [
    1,
    'tk-button',
    {
      disabled: [4],
      fullWidth: [4, 'full-width'],
      type: [1025],
      icon: [1],
      iconPosition: [1, 'icon-position'],
      href: [1],
      target: [1],
      underline: [4],
      label: [1],
      loading: [4],
      rounded: [4],
      size: [1],
      mode: [1],
      variant: [1],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-button', 'tk-icon', 'tk-spinner'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-button':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkButton);
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
      case 'tk-spinner':
        if (!customElements.get(tagName)) {
          defineCustomElement$1();
        }
        break;
    }
  });
}

export { TkButton as T, defineCustomElement as d };
//# sourceMappingURL=p-D_-4qiry.js.map

//# sourceMappingURL=p-D_-4qiry.js.map
