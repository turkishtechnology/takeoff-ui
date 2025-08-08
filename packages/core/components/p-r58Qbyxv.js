import { p as proxyCustomElement, H, c as createEvent, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$1 } from './p-DrRHtkyE.js';

const tkChipsScss =
  ":host {\n  display: inline-flex;\n}\n\n.tk-chips {\n  font-family: 'Geologica', sans-serif;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: var(--chips-large-radius, 6px);\n  border-width: 0px;\n  background-color: var(--static-Light, #fff);\n\n  &.removable {\n    cursor: pointer;\n  }\n\n  &.disabled {\n    color: var(--text-sub-base, #cacfd8) !important;\n    background-color: var(--frames-light) !important;\n\n    &.avatar,\n    &.outlined {\n      border: 1px solid var(--border-sub-base, #cacfd8) !important;\n      background-color: var(--static-Light, #fff) !important;\n    }\n\n    &:active {\n      box-shadow: none !important;\n    }\n  }\n\n  &:active {\n    box-shadow: var(--secondary-focus);\n  }\n\n  &.primary {\n    color: var(--primary-base, #c90019);\n\n    &:active {\n      box-shadow: var(--primary-focus);\n    }\n\n    &.filled {\n      color: var(--text-lightest);\n      background-color: var(--primary-base);\n\n      &:hover {\n        background-color: var(--primary-dark, #b70017);\n      }\n    }\n\n    &.outlined {\n      border: 1px solid var(--primary-base);\n\n      &:hover {\n        background-color: var(--primary-lightest, #fae6e8);\n      }\n    }\n\n    &.filledlight {\n      background-color: var(--primary-light, #eeb0b8);\n      color: var(--primary-base);\n    }\n\n    &.avatar {\n      border: 1px solid var(--primary-base, #c90019);\n\n      &:hover {\n        background-color: var(--primary-lightest, #fae6e8);\n      }\n    }\n  }\n\n  &.secondary {\n    color: var(--secondary-darkest);\n\n    &.filled {\n      background-color: var(--secondary-darkest);\n      color: var(--text-lightest);\n\n      &:hover {\n        background-color: var(--secondary-dark, #607083);\n      }\n    }\n\n    &.outlined {\n      border: 1px solid var(--secondary-darkest);\n\n      &:hover {\n        background-color: var(--secondary-lightest, #f2f3f5);\n      }\n    }\n\n    &.filledlight {\n      background-color: var(--secondary-light);\n      color: var(--secondary-darkest);\n\n      &:hover {\n        color: var(--secondary-dark);\n        background-color: var(--secondary-light, #dadee3);\n      }\n    }\n\n    &.avatar {\n      border: 1px solid var(--secondary-darkest, #34404f);\n\n      &:hover {\n        background-color: var(--secondary-lightest, #dadee3);\n      }\n    }\n  }\n\n  &.neutral {\n    color: var(--text-darkest);\n\n    &.filled {\n      background-color: var(--background-darkest);\n      color: var(--text-lightest, #f9fafc);\n\n      &:hover {\n        background-color: var(--background-dark, #525866);\n      }\n    }\n\n    &.outlined {\n      border: 1px solid var(--background-darkest);\n\n      &:hover {\n        background-color: var(--background-lightest, #f9fafc);\n      }\n    }\n\n    &.filledlight {\n      background-color: var(--icon-lightest);\n\n      &:hover {\n        color: var(--text-dark);\n      }\n    }\n\n    &.avatar {\n      border: 1px solid var(--background-darkest, #222530);\n\n      &:hover {\n        background-color: var(--background-lightest, #f9fafc);\n      }\n    }\n  }\n\n  &.info {\n    color: var(--states-info-dark, #295bac);\n\n    &.filled {\n      color: var(--text-lightest, #f9fafc);\n      background-color: var(--states-info-dark);\n\n      &:hover {\n        background-color: var(--states-info-darkest);\n      }\n    }\n\n    &.outlined {\n      border: 1px solid var(--states-info-dark, #295bac);\n\n      &:hover {\n        background-color: var(--states-info-lightest, #d0e1fd);\n      }\n    }\n\n    &.filledlight {\n      background-color: var(--states-info-lightest, #d0e1fd);\n\n      &:hover {\n        color: var(--states-info-darkest, #183462);\n      }\n    }\n\n    &.avatar {\n      border: 1px solid var(--states-info-dark, #295bac);\n\n      &:hover {\n        background-color: var(--states-info-lightest, #d0e1fd);\n      }\n    }\n  }\n\n  &.success {\n    color: var(--states-success-dark, #188a42);\n\n    &.filled {\n      color: var(--text-lightest, #f9fafc);\n      background-color: var(--states-success-dark, #188a42);\n\n      &:hover {\n        background-color: var(--states-success-darkest, #0e4f26);\n      }\n    }\n\n    &.outlined {\n      border: 1px solid var(--states-success-dark, #188a42);\n\n      &:hover {\n        background-color: var(--states-success-lightest, #caf1d8);\n      }\n    }\n\n    &.filledlight {\n      background-color: var(--states-success-lightest, #caf1d8);\n\n      &:hover {\n        color: var(--states-success-darkest, #0e4f26);\n      }\n    }\n\n    &.avatar {\n      border: 1px solid var(--states-success-dark, #188a42);\n\n      &:hover {\n        background-color: var(--states-success-lightest, #caf1d8);\n      }\n    }\n  }\n\n  &.danger {\n    color: var(--states-danger-dark, #b32b23);\n\n    &.filled {\n      color: var(--text-lightest, #f9fafc);\n      background-color: var(--states-danger-dark, #b32b23);\n\n      &:hover {\n        background-color: var(--states-danger-darkest, #661814);\n      }\n    }\n\n    &.outlined {\n      border: 1px solid var(--states-danger-dark, #b32b23);\n\n      &:hover {\n        background-color: var(--states-danger-lightest, #ffd0ce);\n      }\n    }\n\n    &.filledlight {\n      background-color: var(--states-danger-lightest, #ffd0ce);\n\n      &:hover {\n        color: var(--states-danger-darkest, #661814);\n      }\n    }\n\n    &.avatar {\n      border: 1px solid var(--states-danger-dark, #b32b23);\n\n      &:hover {\n        background-color: var(--states-danger-lightest, #ffd0ce);\n      }\n    }\n  }\n\n  &.warning {\n    color: var(--states-warning-dark, #c79807);\n\n    &.filled {\n      background-color: var(--states-warning-dark, #c79807);\n      color: var(--text-lightest, #f9fafc);\n\n      &:hover {\n        background-color: var(--states-warning-lightest, #f6de95);\n      }\n    }\n\n    &.outlined {\n      border: 1px solid var(--states-warning-dark, #c79807);\n\n      &:hover {\n        background-color: var(--states-warning-lightest, #f6de95);\n      }\n    }\n\n    &.filledlight {\n      background-color: var(--states-warning-lightest, #f6de95);\n\n      &:hover {\n        color: var(--states-warning-darkest, #816204);\n      }\n    }\n\n    &.avatar {\n      border: 1px solid var(--states-warning-dark, #c79807);\n\n      &:hover {\n        background-color: var(--states-warning-lightest, #f6de95);\n      }\n    }\n  }\n\n  &.verified {\n    color: var(--states-verified-dark, #609af8);\n\n    &.filled {\n      color: var(--text-lightest, #f9fafc);\n      background-color: var(--states-verified-dark, #609af8);\n\n      &:hover {\n        background-color: var(--states-verified-darkest, #3b82f6);\n      }\n    }\n\n    &.outlined {\n      border: 1px solid var(--states-verified-dark, #609af8);\n\n      &:hover {\n        background-color: var(--states-verified-lightest, #d0e1fd);\n      }\n    }\n\n    &.filledlight {\n      background-color: var(--states-verified-lightest, #d0e1fd);\n\n      &:hover {\n        color: var(--states-verified-darkest, #3b82f6);\n      }\n    }\n\n    &.avatar {\n      border: 1px solid var(--states-verified-dark, #609af8);\n\n      &:hover {\n        background-color: var(--states-verified-lightest, #d0e1fd);\n      }\n    }\n  }\n\n  &.small {\n    padding: calc(var(--chips-small-v-padding, 1px) - 1px) var(--chips-small-h-padding, 4px);\n    font-size: var(--desktop-body-xs-size, 12px);\n    font-style: normal;\n    font-weight: 400;\n    line-height: var(--desktop-body-xs-line-height, 18px);\n    gap: 2px;\n\n    i {\n      font-size: 14px;\n    }\n  }\n\n  &.base {\n    padding: calc(var(--chips-base-v-padding - 1, 2px) - 1px) var(--chips-base-h-padding, 6px);\n    font-size: var(--desktop-body-s-size, 14px);\n    font-style: normal;\n    font-weight: 400;\n    line-height: var(--desktop-body-s-line-height, 20px);\n    gap: 4px;\n\n    i {\n      font-size: 16px;\n    }\n  }\n\n  &.large {\n    padding: calc(var(--chips-large-v-padding, 4px) - 2px) var(--chips-large-h-padding, 8px);\n    font-size: var(--desktop-body-s-size, 14px);\n    font-style: normal;\n    font-weight: 400;\n    line-height: var(--desktop-body-s-line-height, 20px);\n    gap: 6px;\n\n    i {\n      font-size: 20px;\n    }\n  }\n}\n";

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
      return tkChipsScss;
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
//# sourceMappingURL=p-r58Qbyxv.js.map

//# sourceMappingURL=p-r58Qbyxv.js.map
