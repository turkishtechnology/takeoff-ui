import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { v as v4 } from './p-BF0_OXTe.js';

const tkRadioScss =
  'tk-radio {\n  display: inline-block;\n}\n\n.tk-radio-container {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n  gap: var(--spacing-s);\n  color: var(--text-darkest);\n  font-size: var(--size-sm);\n  font-weight: var(--weight-medium);\n  cursor: pointer;\n  user-select: none;\n\n  &.right {\n    flex-direction: row-reverse;\n  }\n\n  &.width-description {\n    align-items: start;\n  }\n\n  input {\n    margin: 0;\n    appearance: none;\n    outline: none;\n    display: none;\n  }\n\n  .mask {\n    width: 20px;\n    min-width: 20px;\n    height: 20px;\n    background-color: var(--static-light);\n    border: 2px solid var(--border-light);\n    border-radius: var(--radius-full);\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    padding: 2px;\n\n    div {\n      display: none;\n      width: 12px;\n      height: 12px;\n      color: var(--static-light);\n      border-radius: var(--radius-full);\n      background-color: var(--states-info-base);\n    }\n  }\n\n  .tk-radio-text-holder {\n    .tk-radio-description {\n      color: var(--text-base);\n      font-size: var(--size-xs);\n      font-weight: var(--weight-regular);\n    }\n  }\n\n  &:hover {\n    .mask {\n      background-color: var(--background-lightest);\n    }\n  }\n\n  input:focus-visible + .mask {\n    border-color: var(--states-info-base);\n    background-color: var(--static-light);\n  }\n\n  input:checked + .mask {\n    border-color: var(--states-info-lightest);\n    background-color: var(--static-light);\n\n    div {\n      display: block;\n    }\n  }\n\n  &:hover input:checked + .mask {\n    border-color: var(--states-info-light);\n    background-color: var(--states-info-lightest);\n  }\n}\n\ntk-radio[aria-disabled],\ntk-radio[disabled] {\n  .tk-radio-container {\n    color: var(--text-sub-base);\n\n    input + .mask {\n      border: 2px solid var(--border-light);\n      background-color: var(--background-light);\n\n      div {\n        background-color: var(--background-sub-base);\n      }\n    }\n  }\n}\n\ntk-radio[aria-invalid] {\n  .tk-radio-container {\n    .mask {\n      border: 2px solid var(--states-danger-base);\n      background: var(--static-light);\n    }\n\n    input:checked + .mask {\n      border-color: var(--states-danger-light);\n\n      div {\n        background-color: var(--states-danger-base);\n      }\n    }\n  }\n}\n';

const TkRadio = /*@__PURE__*/ proxyCustomElement(
  class TkRadio extends H {
    constructor() {
      super();
      this.__registerHost();
      this.tkChange = createEvent(this, 'tk-change', 7);
      this.internals = this.attachInternals();
      /**
       * Controls if radio has custom content.
       * @defaultValue false
       */
      this.hasContentSlot = false;
      /**
       * Disables the radio button if true.
       * @defaultValue false
       */
      this.disabled = false;
      /**
       * Indicates whether the input is in an invalid state
       * @defaultValue false
       */
      this.invalid = false;
      /**
       * Marks the radio button as checked or unchecked.
       * @defaultValue false
       */
      this.checked = false;
      this.uniqueId = v4();
      // radio group ile birlikte kullanımlarda diğer radio ya tıklandığı durumda kendini false yapmaya ihtiyaç olmadığı için bu işlemi radio group tarafında yapıldığı için outside click eventi atanmasına gerek yoktur.
      if (!this.el.closest('tk-radio-group')) {
        this.windowClickHandler = this.handleWindowClick.bind(this);
      }
    }
    componentWillLoad() {
      this.hasContentSlot = !!this.el.querySelector('[slot="content"]');
      this.parentEl = this.el.closest('tk-radio-group');
      if (this.parentEl && !this.position) {
        this.position = this.parentEl.position;
      }
    }
    componentDidRender() {
      this.bindWindowClickListener();
    }
    disconnectedCallback() {
      this.unbindWindowClickListener();
    }
    bindWindowClickListener() {
      window.addEventListener('click', this.windowClickHandler);
    }
    unbindWindowClickListener() {
      window.removeEventListener('click', this.windowClickHandler);
    }
    handleWindowClick(event) {
      var _a, _b;
      let clickedElement = event.target;
      if (clickedElement.tagName !== 'TK-RADIO') {
        clickedElement = clickedElement.closest('tk-radio');
      }
      if (
        ((_a = clickedElement === null || clickedElement === void 0 ? void 0 : clickedElement.getAttribute('name')) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
        (clickedElement === null || clickedElement === void 0 ? void 0 : clickedElement.getAttribute('name')) == this.name &&
        ((_b = clickedElement === null || clickedElement === void 0 ? void 0 : clickedElement.getAttribute('data-tk-radio-id')) === null || _b === void 0 ? void 0 : _b.length) >
          0 &&
        (clickedElement === null || clickedElement === void 0 ? void 0 : clickedElement.getAttribute('data-tk-radio-id')) !== this.uniqueId
      ) {
        this.checked = false;
      }
    }
    handleInputChange() {
      if (!this.disabled) {
        this.checked = true;
        this.tkChange.emit(this.value);
      }
    }
    render() {
      const labelClass = classNames('tk-radio-container', this.position, {
        'disabled': this.disabled,
        'width-description': !!this.description,
      });
      return h(
        Host,
        { 'key': '28cae0e22737ef11039ea9202820b2f8a039f62e', 'data-tk-radio-id': this.uniqueId },
        h(
          'label',
          { 'key': '0b2ee0004481f0708df4395075eb0f4afb2533c5', 'class': labelClass, 'aria-disabled': this.disabled, 'aria-invalid': this.invalid },
          h('input', {
            key: '6298e32e88c24d0062f2acb6bd2775dd4ac5afb2',
            type: 'radio',
            name: this.name,
            value: this.value,
            checked: this.checked,
            disabled: this.disabled,
            onChange: () => this.handleInputChange(),
          }),
          h('div', { key: 'df5a1259cff7f844c4ee7bc2d14c56a1af89fc71', class: 'mask' }, h('div', { key: '9a31a3aad7135e398a9594c562185d05915bf184' })),
          this.hasContentSlot
            ? h('slot', { name: 'content' })
            : h('div', { class: 'tk-radio-text-holder' }, h('div', { class: 'tk-radio-label' }, this.label), h('div', { class: 'tk-radio-description' }, this.description)),
        ),
      );
    }
    static get formAssociated() {
      return true;
    }
    get el() {
      return this;
    }
    static get style() {
      return tkRadioScss;
    }
  },
  [
    68,
    'tk-radio',
    {
      disabled: [4],
      description: [1],
      invalid: [4],
      label: [1],
      position: [1],
      checked: [1028],
      name: [513],
      value: [8],
      hasContentSlot: [32],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-radio'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-radio':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkRadio);
        }
        break;
    }
  });
}

export { TkRadio as T, defineCustomElement as d };
//# sourceMappingURL=p-Cwk3hEyG.js.map

//# sourceMappingURL=p-Cwk3hEyG.js.map
