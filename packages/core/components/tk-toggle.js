import { p as proxyCustomElement, H, c as createEvent, h } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkToggleCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:inline-block;user-select:none}.tk-toggle label{display:flex;align-items:center;gap:var(--basic-radio-container-gap)}.tk-toggle.tk-toggle-xlarge .tk-toggle-input-container{width:60px;height:32px}.tk-toggle.tk-toggle-xlarge .tk-toggle-input-container .tk-toggle-thumb{width:28px;height:28px}.tk-toggle.tk-toggle-xlarge .tk-toggle-input-container .tk-toggle-thumb .tk-toggle-thumb-icon{font-size:20px;width:20px;height:20px}.tk-toggle.tk-toggle-xlarge .tk-toggle-input-container .tk-toggle-input:checked+.tk-toggle-thumb{transform:translateX(28px)}.tk-toggle.tk-toggle-large .tk-toggle-input-container{width:52px;height:28px}.tk-toggle.tk-toggle-large .tk-toggle-input-container .tk-toggle-thumb{width:24px;height:24px}.tk-toggle.tk-toggle-large .tk-toggle-input-container .tk-toggle-thumb .tk-toggle-thumb-icon{font-size:20px;width:20px;height:20px}.tk-toggle.tk-toggle-large .tk-toggle-input-container .tk-toggle-input:checked+.tk-toggle-thumb{transform:translateX(24px)}.tk-toggle.tk-toggle-base .tk-toggle-input-container{width:44px;height:24px}.tk-toggle.tk-toggle-base .tk-toggle-input-container .tk-toggle-thumb{width:20px;height:20px}.tk-toggle.tk-toggle-base .tk-toggle-input-container .tk-toggle-thumb .tk-toggle-thumb-icon{font-size:16px;width:16px;height:16px}.tk-toggle.tk-toggle-base .tk-toggle-input-container .tk-toggle-input:checked+.tk-toggle-thumb{transform:translateX(20px)}.tk-toggle.tk-toggle-small .tk-toggle-input-container{width:36px;height:20px}.tk-toggle.tk-toggle-small .tk-toggle-input-container .tk-toggle-thumb{width:16px;height:16px}.tk-toggle.tk-toggle-small .tk-toggle-input-container .tk-toggle-thumb .tk-toggle-thumb-icon{font-size:12px;width:12px;height:12px}.tk-toggle.tk-toggle-small .tk-toggle-input-container .tk-toggle-input:checked+.tk-toggle-thumb{transform:translateX(16px)}.tk-toggle.tk-toggle-xsmall .tk-toggle-input-container{width:28px;height:16px}.tk-toggle.tk-toggle-xsmall .tk-toggle-input-container .tk-toggle-thumb{width:12px;height:12px}.tk-toggle.tk-toggle-xsmall .tk-toggle-input-container .tk-toggle-thumb .tk-toggle-thumb-icon{font-size:8px;width:8px;height:8px}.tk-toggle.tk-toggle-xsmall .tk-toggle-input-container .tk-toggle-input:checked+.tk-toggle-thumb{transform:translateX(12px)}.tk-toggle .tk-toggle-input-container{position:relative;background:var(--background-light);border-radius:30px;transition:background-color 0.3s ease;cursor:pointer}.tk-toggle .tk-toggle-input-container:has(.tk-toggle-input:disabled){border:1px solid var(--border-light);background:var(--static-light)}.tk-toggle .tk-toggle-input-container:has(.tk-toggle-input:disabled) .tk-toggle-input{cursor:not-allowed}.tk-toggle .tk-toggle-input-container:has(.tk-toggle-input:disabled) .tk-toggle-thumb{background:var(--background-light);box-shadow:none}.tk-toggle .tk-toggle-input-container:has(.tk-toggle-input:hover:not(.tk-toggle-input:disabled):not(.tk-toggle-input:checked)){background:var(--background-sub-base)}.tk-toggle .tk-toggle-input{position:absolute;width:100%;height:100%;opacity:0;cursor:pointer;margin:0;z-index:200}.tk-toggle .tk-toggle-input:checked+.tk-toggle-thumb{transform:translateX(28px)}.tk-toggle .tk-toggle-input:checked+.tk-toggle-thumb .tk-toggle-thumb-icon{display:flex}.tk-toggle .tk-toggle-input:disabled+.tk-toggle-thumb{background-color:var(--background-light)}.tk-toggle .tk-toggle-input:disabled+.tk-toggle-thumb .tk-toggle-thumb-icon{color:var(--icon-lightest)}.tk-toggle .tk-toggle-thumb{display:flex;justify-content:center;align-items:center;position:absolute;top:2px;left:2px;transition:transform 0.3s ease, background-color 0.3s ease;border-radius:var(--radius-full);background:var(--background-lightest);box-shadow:var(--effect-1-default-base)}.tk-toggle .tk-toggle-thumb .tk-toggle-thumb-icon{display:none}.tk-toggle:not(.tk-toggle-disabled).tk-toggle-info .tk-toggle-input-container:has(.tk-toggle-input:checked){background-color:var(--states-info-base)}.tk-toggle:not(.tk-toggle-disabled).tk-toggle-info .tk-toggle-input-container:has(.tk-toggle-input:checked) .tk-toggle-thumb-icon{color:var(--states-info-dark)}.tk-toggle:not(.tk-toggle-disabled).tk-toggle-info .tk-toggle-input:hover:checked+.tk-toggle-thumb{background-color:var(--states-info-lightest)}.tk-toggle:not(.tk-toggle-disabled).tk-toggle-success .tk-toggle-input-container:has(.tk-toggle-input:checked){background-color:var(--states-success-base)}.tk-toggle:not(.tk-toggle-disabled).tk-toggle-success .tk-toggle-input-container:has(.tk-toggle-input:checked) .tk-toggle-thumb-icon{color:var(--states-success-dark)}.tk-toggle:not(.tk-toggle-disabled).tk-toggle-success .tk-toggle-input:hover:checked+.tk-toggle-thumb{background-color:var(--states-success-lightest)}.tk-toggle:not(.tk-toggle-disabled) .tk-toggle-input-container:has(.tk-toggle-input:focus-visible){outline:2px solid var(--states-info-base);outline-offset:2px}.tk-toggle:not(.tk-toggle-disabled).tk-toggle-invalid .tk-toggle-input-container{border:1px solid var(--states-danger-base)}.tk-toggle:not(.tk-toggle-disabled).tk-toggle-invalid .tk-toggle-input-container:has(.tk-toggle-input:checked){background-color:var(--states-danger-base)}.tk-toggle:not(.tk-toggle-disabled).tk-toggle-invalid .tk-toggle-input-container:has(.tk-toggle-input:checked) .tk-toggle-thumb{background:var(--background-lightest)}.tk-toggle:not(.tk-toggle-disabled).tk-toggle-invalid .tk-toggle-input-container:has(.tk-toggle-input:checked) .tk-toggle-thumb-icon{color:var(--states-danger-base)}.tk-toggle .tk-toggle-label{color:var(--text-darkest);font-family:var(--desktop-body-s-font);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:400;line-height:var(--desktop-body-s-line-height);}.tk-toggle.tk-toggle-disabled .tk-toggle-label{color:var(--text-sub-base)}';

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
      return tkToggleCss;
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
