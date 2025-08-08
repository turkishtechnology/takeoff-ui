import { p as proxyCustomElement, H, c as createEvent, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkToggleScss =
  ':host {\n  display: inline-block;\n  user-select: none;\n}\n\n.tk-toggle {\n  label {\n    display: flex;\n    align-items: center;\n    gap: var(--basic-radio-container-gap);\n  }\n\n  &.tk-toggle-xlarge {\n    .tk-toggle-input-container {\n      width: 60px;\n      height: 32px;\n\n      .tk-toggle-thumb {\n        width: 28px;\n        height: 28px;\n\n        .tk-toggle-thumb-icon {\n          font-size: 20px;\n          width: 20px;\n          height: 20px;\n        }\n      }\n\n      .tk-toggle-input:checked + .tk-toggle-thumb {\n        transform: translateX(28px);\n      }\n    }\n  }\n\n  &.tk-toggle-large {\n    .tk-toggle-input-container {\n      width: 52px;\n      height: 28px;\n\n      .tk-toggle-thumb {\n        width: 24px;\n        height: 24px;\n\n        .tk-toggle-thumb-icon {\n          font-size: 20px;\n          width: 20px;\n          height: 20px;\n        }\n      }\n\n      .tk-toggle-input:checked + .tk-toggle-thumb {\n        transform: translateX(24px);\n      }\n    }\n  }\n\n  &.tk-toggle-base {\n    .tk-toggle-input-container {\n      width: 44px;\n      height: 24px;\n\n      .tk-toggle-thumb {\n        width: 20px;\n        height: 20px;\n\n        .tk-toggle-thumb-icon {\n          font-size: 16px;\n          width: 16px;\n          height: 16px;\n        }\n      }\n\n      .tk-toggle-input:checked + .tk-toggle-thumb {\n        transform: translateX(20px);\n      }\n    }\n  }\n\n  &.tk-toggle-small {\n    .tk-toggle-input-container {\n      width: 36px;\n      height: 20px;\n\n      .tk-toggle-thumb {\n        width: 16px;\n        height: 16px;\n\n        .tk-toggle-thumb-icon {\n          font-size: 12px;\n          width: 12px;\n          height: 12px;\n        }\n      }\n\n      .tk-toggle-input:checked + .tk-toggle-thumb {\n        transform: translateX(16px);\n      }\n    }\n  }\n\n  &.tk-toggle-xsmall {\n    .tk-toggle-input-container {\n      width: 28px;\n      height: 16px;\n\n      .tk-toggle-thumb {\n        width: 12px;\n        height: 12px;\n\n        .tk-toggle-thumb-icon {\n          font-size: 8px;\n          width: 8px;\n          height: 8px;\n        }\n      }\n\n      .tk-toggle-input:checked + .tk-toggle-thumb {\n        transform: translateX(12px);\n      }\n    }\n  }\n\n  .tk-toggle-input-container {\n    position: relative;\n    background: var(--background-light);\n    border-radius: 30px;\n    transition: background-color 0.3s ease;\n    cursor: pointer;\n\n    &:has(.tk-toggle-input:disabled) {\n      border: 1px solid var(--border-light);\n      background: var(--static-light);\n\n      .tk-toggle-input {\n        cursor: not-allowed;\n      }\n\n      .tk-toggle-thumb {\n        background: var(--background-light);\n        box-shadow: none;\n      }\n    }\n\n    &:has(.tk-toggle-input:hover:not(.tk-toggle-input:disabled):not(.tk-toggle-input:checked)) {\n      background: var(--background-sub-base);\n    }\n  }\n\n  .tk-toggle-input {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n    margin: 0;\n    z-index: 200;\n\n    &:checked + .tk-toggle-thumb {\n      transform: translateX(28px);\n\n      .tk-toggle-thumb-icon {\n        display: flex;\n      }\n    }\n\n    &:disabled + .tk-toggle-thumb {\n      background-color: var(--background-light);\n\n      .tk-toggle-thumb-icon {\n        color: var(--icon-lightest);\n      }\n    }\n  }\n\n  .tk-toggle-thumb {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    top: 2px;\n    left: 2px;\n    transition:\n      transform 0.3s ease,\n      background-color 0.3s ease;\n    border-radius: var(--radius-full);\n    background: var(--background-lightest);\n    box-shadow: var(--effect-1-default-base);\n\n    .tk-toggle-thumb-icon {\n      display: none;\n    }\n  }\n\n  &:not(.tk-toggle-disabled) {\n    &.tk-toggle-info {\n      .tk-toggle-input-container:has(.tk-toggle-input:checked) {\n        background-color: var(--states-info-base);\n\n        .tk-toggle-thumb-icon {\n          color: var(--states-info-dark);\n        }\n      }\n\n      .tk-toggle-input:hover:checked + .tk-toggle-thumb {\n        background-color: var(--states-info-lightest);\n      }\n    }\n\n    &.tk-toggle-success {\n      .tk-toggle-input-container:has(.tk-toggle-input:checked) {\n        background-color: var(--states-success-base);\n\n        .tk-toggle-thumb-icon {\n          color: var(--states-success-dark);\n        }\n      }\n\n      .tk-toggle-input:hover:checked + .tk-toggle-thumb {\n        background-color: var(--states-success-lightest);\n      }\n    }\n\n    .tk-toggle-input-container:has(.tk-toggle-input:focus-visible) {\n      outline: 2px solid var(--states-info-base);\n      outline-offset: 2px;\n    }\n\n    &.tk-toggle-invalid {\n      .tk-toggle-input-container {\n        border: 1px solid var(--states-danger-base);\n\n        &:has(.tk-toggle-input:checked) {\n          background-color: var(--states-danger-base);\n\n          .tk-toggle-thumb {\n            background: var(--background-lightest);\n          }\n\n          .tk-toggle-thumb-icon {\n            color: var(--states-danger-base);\n          }\n        }\n      }\n    }\n  }\n\n  .tk-toggle-label {\n    color: var(--text-darkest);\n\n    font-family: var(--desktop-body-s-font);\n    font-size: var(--desktop-body-s-size);\n    font-style: normal;\n    font-weight: 400;\n    line-height: var(--desktop-body-s-line-height);\n    /* 142.857% */\n  }\n\n  &.tk-toggle-disabled {\n    .tk-toggle-label {\n      color: var(--text-sub-base);\n    }\n  }\n}\n';

const TkToggle$1 = /*@__PURE__*/ proxyCustomElement(
  class TkToggle extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkChange = createEvent(this, 'tk-change', 7);
      this.internals = this.attachInternals();
      /**
       * The internal checked state of the toggle.
       * @defaultValue false
       */
      this.checked = false;
      /**
       * The aria-labelledby attribute of the toggle.
       * @defaultValue null
       */
      this.ariaLabelledby = null;
      /**
       * Whether the toggle is disabled.
       * @defaultValue false
       */
      this.disabled = false;
      /**
       * Specifies a material icon name to be displayed.
       * @defaultValue check
       */
      this.icon = 'check';
      /**
       * The ID of the input element.
       * @defaultValue ''
       */
      this.inputId = '';
      /**
       * The name attribute of the toggle.
       * @defaultValue null
       */
      this.name = null;
      /**
       * Whether to show the icon in the toggle.
       * @defaultValue true
       */
      this.showIcon = true;
      /**
       * Sets size for the component.
       * @defaultValue base
       */
      this.size = 'base';
      /**
       * The type of the toggle.
       * @defaultValue info
       */
      this.variant = 'info';
      /**
       * Whether the toggle is in an invalid state.
       * @defaultValue false
       */
      this.invalid = false;
      /**
       * The current state of the toggle.
       * @defaultValue false
       */
      this.value = false;
      this.handleInputChange = event => {
        if (!this.disabled) {
          const target = event.target;
          this.value = target.checked;
          this.checked = target.checked;
          this.tkChange.emit(this.checked);
        }
      };
    }
    valueChanged(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checked = newValue;
      }
    }
    componentWillLoad() {
      this.checked = this.value;
      // If the tk-toggle has a tabindex attribute we get the value
      // and pass it down to the native input, then remove it from the
      // tk-toggle to avoid causing tabbing twice on the same element
      if (this.el.hasAttribute('tabindex')) {
        const tabindex = Number(this.el.getAttribute('tabindex'));
        this.tabindex = tabindex !== null ? tabindex : undefined;
        this.el.removeAttribute('tabindex');
      }
      this.hasDefaultSlot = Array.from(this.el.childNodes).some(node => {
        var _a;
        return (
          (node.nodeType === Node.ELEMENT_NODE && !node.hasAttribute('slot')) ||
          (node.nodeType === Node.TEXT_NODE && ((_a = node.textContent) === null || _a === void 0 ? void 0 : _a.trim().length) > 0)
        );
      });
    }
    formResetCallback() {
      this.handleFormReset();
    }
    /**
     * Returns the native `<input>` element used under the hood.
     */
    getInputElement() {
      return Promise.resolve(this.nativeInput);
    }
    handleFormReset() {
      this.value = false;
      this.checked = false;
      this.invalid = false;
      this.tkChange.emit(this.value);
    }
    renderInput() {
      return h('input', {
        'id': this.inputId,
        'ref': input => (this.nativeInput = input),
        'class': 'tk-toggle-input',
        'type': 'checkbox',
        'role': 'switch',
        'disabled': this.disabled,
        'checked': this.checked,
        'onChange': this.handleInputChange,
        'tabIndex': this.tabindex,
        'aria-checked': this.checked.toString(),
        'aria-disabled': this.disabled,
        'aria-invalid': this.invalid || undefined,
        'aria-label': this.name,
        'aria-labelledby': this.ariaLabelledby,
      });
    }
    render() {
      const rootClasses = classNames('tk-toggle', `tk-toggle-${this.size}`, `tk-toggle-${this.variant}`, {
        'tk-toggle-disabled': this.disabled,
        'tk-toggle-invalid': this.invalid,
      });
      return h(
        'div',
        { key: '5ab02f31986832728ed48d5693680b7af3564678', class: rootClasses },
        h(
          'label',
          { key: '74dccb8b8f652a7e87f775a06f72677213e2f95d', htmlFor: this.inputId },
          h(
            'div',
            { key: '4722c1a85539e85a76ccc3a8310c243cb26b71b7', class: 'tk-toggle-input-container' },
            this.renderInput(),
            h(
              'span',
              { key: '66907d87fb9f43af947b88cf63be8e40c50409ec', class: 'tk-toggle-thumb' },
              this.showIcon && h('span', { key: '3dd73da88c803b2941f3a1a475b58362b87defba', class: 'material-symbols-outlined tk-toggle-thumb-icon' }, this.icon),
            ),
          ),
          this.hasDefaultSlot ? h('slot', null) : this.label && h('span', { class: 'tk-toggle-label' }, this.label),
        ),
      );
    }
    static get formAssociated() {
      return true;
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        value: ['valueChanged'],
      };
    }
    static get style() {
      return tkToggleScss;
    }
  },
  [
    65,
    'tk-toggle',
    {
      ariaLabelledby: [1, 'aria-labelledby'],
      disabled: [4],
      icon: [1],
      inputId: [1, 'input-id'],
      name: [1],
      label: [1],
      showIcon: [4, 'show-icon'],
      size: [1],
      variant: [1],
      invalid: [4],
      value: [1028],
      hasDefaultSlot: [32],
      checked: [32],
      getInputElement: [64],
    },
    undefined,
    {
      value: ['valueChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-toggle'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-toggle':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkToggle$1);
        }
        break;
    }
  });
}

const TkToggle = TkToggle$1;
const defineCustomElement = defineCustomElement$1;

export { TkToggle, defineCustomElement };
//# sourceMappingURL=tk-toggle.js.map

//# sourceMappingURL=tk-toggle.js.map
