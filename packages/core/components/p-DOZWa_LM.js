import { p as proxyCustomElement, H, c as createEvent, h } from './p-CsLMRZQo.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { v as v4 } from './p-BF0_OXTe.js';

const tkCheckboxCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}tk-checkbox{display:inline-block}.tk-checkbox-container.card{border-radius:var(--radius-m-base);border:1px solid var(--border-light);background:var(--static-Light);gap:var(--card-radio-container-gap);padding:var(--card-radio-container-v-padding) var(--card-radio-container-h-padding)}.tk-checkbox-container.card:hover{background-color:var(--background-lightest)}.tk-checkbox-container.card .mask{align-self:center}.tk-checkbox-container label{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:var(--spacing-s);color:var(--text-darkest);font-size:var(--size-sm);cursor:pointer;user-select:none}.tk-checkbox-container label input[type=checkbox]{margin:0;appearance:none;outline:none;display:none}.tk-checkbox-container label .mask{display:flex;align-items:center;justify-content:center;width:20px;height:20px;background-color:var(--static-light);border:2px solid var(--border-light);border-radius:var(--radius-s);box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:2px}.tk-checkbox-container label .mask i{visibility:hidden;font-size:12px;color:var(--static-light);border-radius:var(--radius-xs);background-color:var(--states-info-base)}.tk-checkbox-container label .tk-checkbox-text-holder .tk-checkbox-description{color:var(--text-base);font-size:var(--size-xs);font-weight:var(--weight-regular)}.tk-checkbox-container:hover label .mask{background-color:var(--background-lightest)}.tk-checkbox-container label input:focus-visible+.mask{border-color:var(--states-info-base);background-color:var(--static-light)}.tk-checkbox-container label input:checked+.mask,.tk-checkbox-container label input:indeterminate+.mask{border-color:var(--states-info-light);background-color:var(--static-light)}.tk-checkbox-container label input:checked+.mask i,.tk-checkbox-container label input:indeterminate+.mask i{visibility:visible}.tk-checkbox-container label:hover input:checked+.mask,.tk-checkbox-container label:hover input:indeterminate+.mask{border-color:var(--states-info-sub-base);background-color:var(--states-info-light)}.tk-checkbox-container[aria-disabled] label,.tk-checkbox-container[disabled] label{color:var(--text-sub-base)}.tk-checkbox-container[aria-disabled] label input+.mask,.tk-checkbox-container[disabled] label input+.mask{border:2px solid var(--border-light);background-color:var(--background-light)}.tk-checkbox-container[aria-disabled] label input+.mask i,.tk-checkbox-container[disabled] label input+.mask i{background-color:var(--background-sub-base)}.tk-checkbox-container[aria-invalid] label .mask{border:2px solid var(--states-danger-base);background:var(--static-light)}.tk-checkbox-container[aria-invalid] label input:checked+.mask,.tk-checkbox-container[aria-invalid] label input:indeterminate+.mask{border-color:var(--states-danger-light)}.tk-checkbox-container[aria-invalid] label input:checked+.mask i,.tk-checkbox-container[aria-invalid] label input:indeterminate+.mask i{background-color:var(--states-danger-base)}.tk-checkbox-container[aria-invalid] label:hover input:checked+.mask,.tk-checkbox-container[aria-invalid] label:hover input:indeterminate+.mask{border-color:var(--states-danger-sub-base);background-color:var(--states-danger-light)}';

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
      return tkCheckboxCss;
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
//# sourceMappingURL=p-DOZWa_LM.js.map

//# sourceMappingURL=p-DOZWa_LM.js.map
