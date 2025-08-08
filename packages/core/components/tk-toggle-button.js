import { p as proxyCustomElement, H, c as createEvent, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$2 } from './p-DrRHtkyE.js';

const tkToggleButtonScss =
  ":host {\n  display: flex;\n  width: 100%;\n}\n\n.tk-toggle-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 1 0 auto;\n\n  border: 0px;\n  height: 32px;\n  padding: 10px 12px;\n  gap: 6px;\n  cursor: pointer;\n  border-radius: var(--radius-m-base, 8px);\n\n  background-color: transparent;\n\n  &.neutral {\n    &.filled {\n      &.selected {\n        background-color: var(--neutral-800);\n      }\n    }\n\n    &.outlined {\n      &.selected {\n        background-color: var(--neutral-50);\n        border: 1px solid var(--neutral-300);\n      }\n    }\n\n    &.text {\n      &.selected {\n        background-color: var(--static-light);\n      }\n    }\n\n    &.raised {\n      &.selected {\n        background-color: var(--neutral-800);\n        border: 1px solid var(--static-black);\n      }\n    }\n\n    &.filled-light {\n      &.selected {\n        background-color: var(--neutral-200);\n      }\n    }\n\n    &.filled.selected,\n    &.raised.selected {\n      .tk-toggle-button-label {\n        color: var(--neutral-50);\n      }\n      .tk-toggle-button-icon {\n        color: var(--neutral-50);\n      }\n    }\n\n    &.outlined.selected,\n    &.text.selected,\n    &.filled-light.selected {\n      .tk-toggle-button-label {\n        color: var(--neutral-800);\n      }\n      .tk-toggle-button-icon {\n        color: var(--neutral-800);\n      }\n    }\n  }\n\n  &.primary {\n    &.filled {\n      &.selected {\n        background-color: var(--primary-500);\n      }\n    }\n\n    &.outlined {\n      &.selected {\n        background-color: var(--neutral-50);\n        border: 1px solid var(--primary-300);\n      }\n    }\n\n    &.text {\n      &.selected {\n        background-color: var(--static-light);\n      }\n    }\n\n    &.raised {\n      &.selected {\n        background-color: var(--primary-500);\n        border: 1px solid var(--primary-sub-base);\n      }\n    }\n\n    &.filled-light {\n      &.selected {\n        background-color: var(--primary-50);\n      }\n    }\n\n    &.filled.selected,\n    &.raised.selected {\n      .tk-toggle-button-label {\n        color: var(--static-white);\n      }\n      .tk-toggle-button-icon {\n        color: var(--static-white);\n      }\n    }\n\n    &.outlined.selected,\n    &.text.selected,\n    &.filled-light.selected {\n      .tk-toggle-button-label {\n        color: var(--primary-500);\n      }\n      .tk-toggle-button-icon {\n        color: var(--primary-500);\n      }\n    }\n  }\n\n  .tk-toggle-button-label {\n    color: var(--text-base);\n    font-family: var(--body-m-base-font, 'Geologica', sans-serif);\n    font-weight: 400;\n    font-style: normal;\n\n    &.large {\n      line-height: var(--body-m-base-line-height, 24px);\n      font-size: var(--body-m-base-size, 16px);\n    }\n\n    &.base {\n      line-height: var(--body-m-base-line-height, 20px);\n      font-size: var(--body-m-base-size, 14px);\n    }\n\n    &.small {\n      line-height: var(--body-m-base-line-height, 28px);\n      font-size: var(--body-m-base-size, 12px);\n    }\n  }\n\n  .tk-toggle-button-icon {\n    display: flex;\n    flex-shrink: 0;\n    align-items: center;\n    justify-content: center;\n    color: var(--text-base);\n\n    &.small {\n      width: 20px;\n      height: 20px;\n    }\n\n    &.base {\n      width: 24px;\n      height: 24px;\n    }\n\n    &.large {\n      width: 24px;\n      height: 24px;\n    }\n  }\n\n  &.small {\n    height: 24px;\n  }\n\n  &.base {\n    height: 32px;\n  }\n\n  &.large {\n    height: 40px;\n    padding: 12px 14px;\n    gap: 8px;\n  }\n\n  &.rounded {\n    border-radius: 999px;\n  }\n\n  &:hover {\n    .tk-toggle-button-icon,\n    .tk-toggle-button-label {\n      color: var(--text-darkest);\n    }\n  }\n  &.disabled {\n    .tk-toggle-button-icon,\n    .tk-toggle-button-label {\n      color: var(--text-sub-base);\n    }\n  }\n}\n";

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
      return tkToggleButtonScss;
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
