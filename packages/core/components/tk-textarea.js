import { p as proxyCustomElement, H, c as createEvent, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { v as v4 } from './p-BF0_OXTe.js';

const tkTextareaScss =
  ':host {\n  display: block;\n}\n\n.tk-textarea-container {\n  display: flex;\n  align-items: flex-start;\n  flex-direction: column;\n  gap: var(--input-external-label-large-container-gap);\n  width: 100%;\n\n  .label {\n    color: var(--text-darkest);\n    font-weight: 400;\n\n    .asterisk {\n      color: var(--states-danger-base);\n      font-size: var(--desktop-label-s-size);\n      font-weight: 300;\n      line-height: var(--desktop-label-s-line-height);\n    }\n  }\n\n  .tk-textarea {\n    display: flex;\n    gap: var(--spacing-xs);\n    position: relative;\n    align-items: center;\n    border: 1px solid var(--border-light);\n    border-radius: var(--spacing-m-base);\n    background-color: var(--static-light);\n    // width: 100%;\n    width: -webkit-fill-available;\n\n    textarea {\n      outline: none;\n      border: none;\n      background-color: transparent;\n      color: var(--text-darkest);\n      padding: 0px;\n      width: 100%;\n      line-height: var(--desktop-body-m-base-line-height);\n      resize: vertical;\n\n      &::placeholder {\n        color: var(--text-sub-base);\n      }\n    }\n\n    &:hover:not(.tk-textarea-container[aria-disabled] .tk-textarea) {\n      background-color: var(--background-lightest);\n    }\n\n    .counter {\n      position: absolute;\n      right: 28px;\n      bottom: 6px;\n      color: var(--text-base);\n      line-height: var(--desktop-label-s-line-height);\n      font-size: var(--desktop-label-s-size);\n      font-weight: 400;\n\n      &.maxed {\n        color: var(--states-danger-base);\n      }\n    }\n  }\n\n  .hint {\n    color: var(--text-base);\n    line-height: var(--desktop-label-s-line-height);\n    font-size: var(--desktop-label-s-size);\n    font-weight: 300;\n    display: flex;\n    align-items: center;\n    gap: var(--spacing-m-base);\n\n    & i {\n      font-size: var(--size-base);\n      width: var(--size-base);\n      height: var(--size-base);\n      color: var(--icon-base);\n    }\n    &.error {\n      color: var(--states-danger-base);\n      i {\n        color: var(--states-danger-base);\n      }\n    }\n  }\n\n  &.large {\n    & .label {\n      font-size: var(--desktop-label-l-size);\n      line-height: var(--desktop-label-l-line-height);\n      padding: var(--input-external-label-large-label-v-padding) var(--input-external-label-large-label-h-padding);\n    }\n\n    & .tk-textarea {\n      padding: var(--input-external-label-large-input-v-padding) var(--input-external-label-large-input-h-padding);\n\n      & textarea {\n        font-family: var(--desktop-body-m-base-font);\n        font-size: var(--desktop-body-m-base-size);\n        line-height: var(--desktop-body-m-base-line-height);\n      }\n    }\n  }\n\n  &.base {\n    & .label {\n      font-size: var(--desktop-label-m-base-size);\n      line-height: var(--desktop-label-m-base-line-height);\n      padding: var(--input-external-label-base-label-v-padding) var(--input-external-label-base-label-h-padding);\n    }\n\n    & .tk-textarea {\n      padding: var(--input-external-label-base-input-v-padding) var(--input-external-label-base-input-h-padding);\n\n      & textarea {\n        font-family: var(--desktop-body-s-font);\n        font-size: var(--desktop-body-s-size);\n        line-height: var(--desktop-body-s-line-height);\n      }\n    }\n  }\n\n  &.small {\n    & .label {\n      font-size: var(--desktop-label-s-size);\n      line-height: var(--desktop-label-s-line-height);\n      padding: var(--input-external-label-small-label-v-padding) var(--input-external-label-small-label-h-padding);\n    }\n\n    & .tk-textarea {\n      padding: var(--input-external-label-small-input-v-padding) var(--input-external-label-small-input-h-padding);\n\n      & textarea {\n        font-family: var(--desktop-body-xs-font);\n        font-size: var(--desktop-body-xs-size);\n        line-height: var(--desktop-body-xs-line-height);\n      }\n    }\n  }\n\n  &.focus .tk-textarea {\n    border: var(--spacing-px) solid var(--states-info-base);\n  }\n\n  &[aria-disabled] {\n    & .label,\n    & .hint,\n    .tk-textarea textarea {\n      color: var(--text-sub-base);\n      pointer-events: none;\n      &.error {\n        color: var(--states-danger-base);\n      }\n    }\n\n    .tk-textarea {\n      background-color: var(--background-lightest);\n    }\n  }\n\n  &[aria-readonly] {\n    & .label,\n    & .hint {\n      color: var(--text-sub-base);\n      &.error {\n        color: var(--states-danger-base);\n      }\n    }\n\n    .tk-textarea {\n      background-color: var(--background-lightest);\n    }\n  }\n\n  &[aria-invalid] {\n    & .tk-textarea {\n      border-color: var(--states-danger-base);\n      background-color: var(--background-lightest);\n    }\n\n    & .hint,\n    & .hint i {\n      color: var(--states-danger-base);\n    }\n  }\n}\n';

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
      return tkTextareaScss;
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
