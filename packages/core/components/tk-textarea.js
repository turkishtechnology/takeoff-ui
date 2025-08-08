import { p as proxyCustomElement, H, c as createEvent, h } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { v as v4 } from './p-BF0_OXTe.js';

const tkTextareaCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}.tk-textarea-container{display:flex;align-items:flex-start;flex-direction:column;gap:var(--input-external-label-large-container-gap);width:100%}.tk-textarea-container .label{color:var(--text-darkest);font-weight:400}.tk-textarea-container .label .asterisk{color:var(--states-danger-base);font-size:var(--desktop-label-s-size);font-weight:300;line-height:var(--desktop-label-s-line-height)}.tk-textarea-container .tk-textarea{display:flex;gap:var(--spacing-xs);position:relative;align-items:center;border:1px solid var(--border-light);border-radius:var(--spacing-m-base);background-color:var(--static-light);width:-webkit-fill-available}.tk-textarea-container .tk-textarea textarea{outline:none;border:none;background-color:transparent;color:var(--text-darkest);padding:0px;width:100%;line-height:var(--desktop-body-m-base-line-height);resize:vertical}.tk-textarea-container .tk-textarea textarea::placeholder{color:var(--text-sub-base)}.tk-textarea-container .tk-textarea:hover:not(.tk-textarea-container[aria-disabled] .tk-textarea){background-color:var(--background-lightest)}.tk-textarea-container .tk-textarea .counter{position:absolute;right:28px;bottom:6px;color:var(--text-base);line-height:var(--desktop-label-s-line-height);font-size:var(--desktop-label-s-size);font-weight:400}.tk-textarea-container .tk-textarea .counter.maxed{color:var(--states-danger-base)}.tk-textarea-container .hint{color:var(--text-base);line-height:var(--desktop-label-s-line-height);font-size:var(--desktop-label-s-size);font-weight:300;display:flex;align-items:center;gap:var(--spacing-m-base)}.tk-textarea-container .hint i{font-size:var(--size-base);width:var(--size-base);height:var(--size-base);color:var(--icon-base)}.tk-textarea-container .hint.error{color:var(--states-danger-base)}.tk-textarea-container .hint.error i{color:var(--states-danger-base)}.tk-textarea-container.large .label{font-size:var(--desktop-label-l-size);line-height:var(--desktop-label-l-line-height);padding:var(--input-external-label-large-label-v-padding) var(--input-external-label-large-label-h-padding)}.tk-textarea-container.large .tk-textarea{padding:var(--input-external-label-large-input-v-padding) var(--input-external-label-large-input-h-padding)}.tk-textarea-container.large .tk-textarea textarea{font-family:var(--desktop-body-m-base-font);font-size:var(--desktop-body-m-base-size);line-height:var(--desktop-body-m-base-line-height)}.tk-textarea-container.base .label{font-size:var(--desktop-label-m-base-size);line-height:var(--desktop-label-m-base-line-height);padding:var(--input-external-label-base-label-v-padding) var(--input-external-label-base-label-h-padding)}.tk-textarea-container.base .tk-textarea{padding:var(--input-external-label-base-input-v-padding) var(--input-external-label-base-input-h-padding)}.tk-textarea-container.base .tk-textarea textarea{font-family:var(--desktop-body-s-font);font-size:var(--desktop-body-s-size);line-height:var(--desktop-body-s-line-height)}.tk-textarea-container.small .label{font-size:var(--desktop-label-s-size);line-height:var(--desktop-label-s-line-height);padding:var(--input-external-label-small-label-v-padding) var(--input-external-label-small-label-h-padding)}.tk-textarea-container.small .tk-textarea{padding:var(--input-external-label-small-input-v-padding) var(--input-external-label-small-input-h-padding)}.tk-textarea-container.small .tk-textarea textarea{font-family:var(--desktop-body-xs-font);font-size:var(--desktop-body-xs-size);line-height:var(--desktop-body-xs-line-height)}.tk-textarea-container.focus .tk-textarea{border:var(--spacing-px) solid var(--states-info-base)}.tk-textarea-container[aria-disabled] .label,.tk-textarea-container[aria-disabled] .hint,.tk-textarea-container[aria-disabled] .tk-textarea textarea{color:var(--text-sub-base);pointer-events:none}.tk-textarea-container[aria-disabled] .label.error,.tk-textarea-container[aria-disabled] .hint.error,.tk-textarea-container[aria-disabled] .tk-textarea textarea.error{color:var(--states-danger-base)}.tk-textarea-container[aria-disabled] .tk-textarea{background-color:var(--background-lightest)}.tk-textarea-container[aria-readonly] .label,.tk-textarea-container[aria-readonly] .hint{color:var(--text-sub-base)}.tk-textarea-container[aria-readonly] .label.error,.tk-textarea-container[aria-readonly] .hint.error{color:var(--states-danger-base)}.tk-textarea-container[aria-readonly] .tk-textarea{background-color:var(--background-lightest)}.tk-textarea-container[aria-invalid] .tk-textarea{border-color:var(--states-danger-base);background-color:var(--background-lightest)}.tk-textarea-container[aria-invalid] .hint,.tk-textarea-container[aria-invalid] .hint i{color:var(--states-danger-base)}';

const TkTextarea$1 = /*@__PURE__*/ proxyCustomElement(
  class TkTextarea extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkInput = createEvent(this, 'tk-input', 7);
      this.tkChange = createEvent(this, 'tk-change', 7);
      this.tkBlur = createEvent(this, 'tk-blur', 7);
      this.tkFocus = createEvent(this, 'tk-focus', 7);
      this.internals = this.attachInternals();
      this.uniqueId = v4();
      this.hasFocus = false;
      this.passwordStrength = 0;
      this.charCount = 0;
      /**
       * If `true`, the user cannot interact with the input.
       */
      this.disabled = false;
      /**
       * Indicates whether the input is in an invalid state
       * @defaultValue false
       */
      this.invalid = false;
      /**
       * Represents the rows value of the component
       * @defaultValue 3
       */
      this.rows = 3;
      /**
       * If `true`, the user cannot modify the value.
       */
      this.readonly = false;
      /**
       * Sets size for the component.
       */
      this.size = 'base';
      /**
       * Displays a red asterisk (*) next to the label for visual emphasis.
       */
      this.showAsterisk = false;
      /**
       * The value of the input.
       */
      this.value = '';
      this.updateCharCount = () => {
        if (this.maxLength) {
          this.charCount = this.value.toString().trim().length;
        }
      };
      this.handleInput = ev => {
        const input = ev.target;
        this.value = (input === null || input === void 0 ? void 0 : input.value) || '';
        this.tkInput.emit(ev);
      };
      this.handleBlur = () => {
        this.hasFocus = false;
        this.tkBlur.emit();
      };
      this.handleFocus = () => {
        this.hasFocus = true;
        this.tkFocus.emit();
      };
    }
    /**
     * Update the native input element when the value changes
     */
    valueChanged() {
      this.tkChange.emit(this.value);
      this.updateCharCount();
    }
    componentWillLoad() {
      // If the tk-input has a tabindex attribute we get the value
      // and pass it down to the native input, then remove it from the
      // tk-input to avoid causing tabbing twice on the same element
      if (this.el.hasAttribute('tabindex')) {
        const tabindex = this.el.getAttribute('tabindex');
        this.tabindex = tabindex !== null ? tabindex : undefined;
        this.el.removeAttribute('tabindex');
      }
    }
    componentDidLoad() {
      this.nativeInput = this.el.shadowRoot.querySelector('textarea');
    }
    formResetCallback() {
      this.handleFormReset();
    }
    /**
     * Sets focus on the specified `tk-input`. Use this method instead of the global
     * `input.focus()`.
     */
    async setFocus() {
      var _a;
      (_a = this.nativeInput) === null || _a === void 0 ? void 0 : _a.focus();
    }
    handleFormReset() {
      this.value = null;
      this.nativeInput.value = null;
      this.tkChange.emit(this.value);
    }
    renderLabel() {
      var _a;
      let label;
      if (((_a = this.label) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        const asterisk = h('span', { class: 'asterisk' }, '*');
        label = h('label', { class: 'label' }, this.label, this.showAsterisk ? asterisk : '');
      }
      return label;
    }
    renderHintError() {
      var _a, _b;
      let hint;
      if (((_a = this.hint) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        hint = h('span', { class: 'hint' }, h('i', { class: 'material-symbols-outlined' }, 'info'), this.hint);
      }
      if (((_b = this.error) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        hint = h('span', { class: 'hint error' }, h('i', { class: 'material-symbols-outlined' }, 'info'), this.error);
      }
      return hint;
    }
    render() {
      const rootClasses = classNames('tk-textarea-container', this.size, { focus: this.hasFocus });
      let counter;
      const counterClasses = classNames('counter', this.charCount == this.maxLength && 'maxed');
      if (this.maxLength) {
        counter = h('span', { key: 'fa77acfa682bcba1d519003f2df695a490c17662', class: counterClasses }, this.charCount, '/', this.maxLength);
      }
      return h(
        'div',
        { 'key': '85d32c0518148bf2260b6298f19342f27913b1d8', 'aria-readonly': this.readonly, 'aria-disabled': this.disabled, 'aria-invalid': this.invalid, 'class': rootClasses },
        this.renderLabel(),
        h(
          'label',
          { key: 'dc6da2c2656a217ac91cba5a78b38ce3dca3c514', class: 'tk-textarea', htmlFor: this.uniqueId },
          h('textarea', {
            key: '7fa8597d1b40c5bcfd3e806838214c9b8c7e584b',
            id: this.uniqueId,
            ref: el => (this.nativeInput = el),
            disabled: this.disabled,
            autoComplete: 'off',
            name: this.name,
            rows: this.rows,
            maxLength: this.maxLength,
            placeholder: this.placeholder || '',
            readOnly: this.readonly,
            tabindex: this.tabindex,
            onInput: this.handleInput,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            value: this.value,
          }),
          counter,
        ),
        this.renderHintError(),
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
      return tkTextareaCss;
    }
  },
  [
    65,
    'tk-textarea',
    {
      disabled: [4],
      invalid: [4],
      error: [1],
      hint: [1],
      label: [1],
      name: [1],
      placeholder: [1],
      rows: [2],
      readonly: [4],
      size: [1],
      showAsterisk: [4, 'show-asterisk'],
      maxLength: [2, 'max-length'],
      value: [1032],
      hasFocus: [32],
      passwordStrength: [32],
      charCount: [32],
      setFocus: [64],
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
  const components = ['tk-textarea'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-textarea':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkTextarea$1);
        }
        break;
    }
  });
}

const TkTextarea = TkTextarea$1;
const defineCustomElement = defineCustomElement$1;

export { TkTextarea, defineCustomElement };
//# sourceMappingURL=tk-textarea.js.map

//# sourceMappingURL=tk-textarea.js.map
