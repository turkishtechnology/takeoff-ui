import { p as proxyCustomElement, H, c as createEvent, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { v as v4 } from './p-BF0_OXTe.js';

const tkCheckboxScss =
  "tk-checkbox {\n  display: inline-block;\n}\n\n.tk-checkbox-container {\n  &.card {\n    border-radius: var(--radius-m-base);\n    border: 1px solid var(--border-light);\n    background: var(--static-Light);\n    gap: var(--card-radio-container-gap);\n    padding: var(--card-radio-container-v-padding) var(--card-radio-container-h-padding);\n\n    &:hover {\n      background-color: var(--background-lightest);\n    }\n    .mask {\n      align-self: center;\n    }\n  }\n  label {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    gap: var(--spacing-s);\n    color: var(--text-darkest);\n    font-size: var(--size-sm);\n    cursor: pointer;\n    user-select: none;\n\n    input[type='checkbox'] {\n      margin: 0;\n      appearance: none;\n      outline: none;\n      display: none;\n    }\n\n    .mask {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 20px;\n      height: 20px;\n      background-color: var(--static-light);\n      border: 2px solid var(--border-light);\n      border-radius: var(--radius-s);\n      box-sizing: border-box;\n      -moz-box-sizing: border-box;\n      -webkit-box-sizing: border-box;\n      padding: 2px;\n\n      i {\n        visibility: hidden;\n        font-size: 12px;\n        color: var(--static-light);\n        border-radius: var(--radius-xs);\n        background-color: var(--states-info-base);\n      }\n    }\n    .tk-checkbox-text-holder {\n      .tk-checkbox-description {\n        color: var(--text-base);\n        font-size: var(--size-xs);\n        font-weight: var(--weight-regular);\n      }\n    }\n  }\n\n  &:hover {\n    label {\n      .mask {\n        background-color: var(--background-lightest);\n      }\n    }\n  }\n\n  label input:focus-visible + .mask {\n    border-color: var(--states-info-base);\n    background-color: var(--static-light);\n  }\n\n  label input:checked + .mask,\n  label input:indeterminate + .mask {\n    border-color: var(--states-info-light);\n    background-color: var(--static-light);\n\n    i {\n      visibility: visible;\n    }\n  }\n\n  label:hover input:checked + .mask,\n  label:hover input:indeterminate + .mask {\n    border-color: var(--states-info-sub-base);\n    background-color: var(--states-info-light);\n  }\n\n  &[aria-disabled],\n  &[disabled] {\n    label {\n      color: var(--text-sub-base);\n\n      input + .mask {\n        border: 2px solid var(--border-light);\n        background-color: var(--background-light);\n\n        i {\n          background-color: var(--background-sub-base);\n        }\n      }\n    }\n  }\n\n  &[aria-invalid] {\n    label {\n      .mask {\n        border: 2px solid var(--states-danger-base);\n        background: var(--static-light);\n      }\n\n      input:checked + .mask,\n      input:indeterminate + .mask {\n        border-color: var(--states-danger-light);\n\n        i {\n          background-color: var(--states-danger-base);\n        }\n      }\n\n      &:hover {\n        input:checked + .mask,\n        input:indeterminate + .mask {\n          border-color: var(--states-danger-sub-base);\n          background-color: var(--states-danger-light);\n        }\n      }\n    }\n  }\n}\n";

const TkCheckbox = /*@__PURE__*/ proxyCustomElement(
  class TkCheckbox extends H {
    constructor() {
      super();
      this.__registerHost();
      this.tkChange = createEvent(this, 'tk-change', 7);
      this.internals = this.attachInternals();
      this.uniqueId = v4();
      /**
       * Controls if checkbox has custom content.
       * @defaultValue false
       */
      this.hasContentSlot = false;
      /**
       * If true, the user cannot interact with the checkbox.
       */
      this.disabled = false;
      /**
       * Indicates whether the input is in an invalid state
       * @defaultValue false
       */
      this.invalid = false;
      /**
       * Determines the appearance types of the checkbox.
       */
      this.type = 'default';
      /**
       * If true, the checkbox will be indeterminate.
       */
      this.indeterminate = false;
      /**
       * Sets the checkbox value
       */
      this.value = false;
    }
    indeterminateChanged(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.inputElement.indeterminate = newValue; // update the checkbox's indeterminate property
        if (newValue) this.value = null;
      }
    }
    valueChanged(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue !== null) {
          this.indeterminate = false;
        }
      }
    }
    componentWillLoad() {
      if (this.indeterminate) this.value = null;
      this.hasContentSlot = !!this.el.querySelector('[slot="content"]');
    }
    formResetCallback() {
      this.handleFormReset();
    }
    handleFormReset() {
      this.value = false;
      this.indeterminate = false;
      this.inputElement.checked = false;
      this.tkChange.emit(this.value);
    }
    handleChange() {
      if (!this.disabled) {
        if (this.inputElement.indeterminate) {
          this.value = null;
          this.indeterminate = false;
        } else {
          this.value = this.inputElement.checked;
        }
        this.tkChange.emit(this.value);
      }
    }
    renderInput() {
      return h('input', {
        id: this.uniqueId,
        type: 'checkbox',
        ref: el => (this.inputElement = el),
        checked: this.value,
        indeterminate: this.indeterminate,
        disabled: this.disabled,
        onChange: this.handleChange.bind(this),
        name: this.name,
      });
    }
    render() {
      return h(
        'div',
        {
          'key': '68c7a437f00bbd4071956ed9467d4896e5394ea3',
          'class': classNames('tk-checkbox-container', this.type),
          'aria-disabled': this.disabled,
          'aria-invalid': this.invalid,
        },
        h(
          'label',
          { key: 'c7c5821031585fddec812b5fe6edd0337a3c90d0', htmlFor: this.uniqueId },
          this.renderInput(),
          h(
            'div',
            { key: '2fb59c3dcc980e575970c2e1475227d69e6af648', class: 'mask' },
            h('i', { key: '544a7eb1cc574e6a2ce2e229f2b0457bd6ed39cd', class: 'material-symbols-outlined' }, this.indeterminate ? 'remove' : 'check'),
          ),
          this.hasContentSlot
            ? h('slot', { name: 'content' })
            : h(
                'div',
                { class: 'tk-checkbox-text-holder' },
                h('div', { class: 'tk-checkbox-label' }, this.label),
                h('div', { class: 'tk-checkbox-description' }, this.description),
              ),
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
        indeterminate: ['indeterminateChanged'],
        value: ['valueChanged'],
      };
    }
    static get style() {
      return tkCheckboxScss;
    }
  },
  [
    68,
    'tk-checkbox',
    {
      disabled: [4],
      description: [1],
      invalid: [4],
      label: [1],
      name: [1],
      type: [1],
      indeterminate: [1028],
      value: [1028],
      hasContentSlot: [32],
    },
    undefined,
    {
      indeterminate: ['indeterminateChanged'],
      value: ['valueChanged'],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-checkbox'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-checkbox':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkCheckbox);
        }
        break;
    }
  });
}

export { TkCheckbox as T, defineCustomElement as d };
//# sourceMappingURL=p-B2GrZHBf.js.map

//# sourceMappingURL=p-B2GrZHBf.js.map
