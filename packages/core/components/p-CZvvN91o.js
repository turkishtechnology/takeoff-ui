import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { v as v4 } from './p-BF0_OXTe.js';

const tkRadioCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}tk-radio{display:inline-block}.tk-radio-container{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:var(--spacing-s);color:var(--text-darkest);font-size:var(--size-sm);font-weight:var(--weight-medium);cursor:pointer;user-select:none}.tk-radio-container.right{flex-direction:row-reverse}.tk-radio-container.width-description{align-items:start}.tk-radio-container input{margin:0;appearance:none;outline:none;display:none}.tk-radio-container .mask{width:20px;min-width:20px;height:20px;background-color:var(--static-light);border:2px solid var(--border-light);border-radius:var(--radius-full);box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:2px}.tk-radio-container .mask div{display:none;width:12px;height:12px;color:var(--static-light);border-radius:var(--radius-full);background-color:var(--states-info-base)}.tk-radio-container .tk-radio-text-holder .tk-radio-description{color:var(--text-base);font-size:var(--size-xs);font-weight:var(--weight-regular)}.tk-radio-container:hover .mask{background-color:var(--background-lightest)}.tk-radio-container input:focus-visible+.mask{border-color:var(--states-info-base);background-color:var(--static-light)}.tk-radio-container input:checked+.mask{border-color:var(--states-info-lightest);background-color:var(--static-light)}.tk-radio-container input:checked+.mask div{display:block}.tk-radio-container:hover input:checked+.mask{border-color:var(--states-info-light);background-color:var(--states-info-lightest)}tk-radio[aria-disabled] .tk-radio-container,tk-radio[disabled] .tk-radio-container{color:var(--text-sub-base)}tk-radio[aria-disabled] .tk-radio-container input+.mask,tk-radio[disabled] .tk-radio-container input+.mask{border:2px solid var(--border-light);background-color:var(--background-light)}tk-radio[aria-disabled] .tk-radio-container input+.mask div,tk-radio[disabled] .tk-radio-container input+.mask div{background-color:var(--background-sub-base)}tk-radio[aria-invalid] .tk-radio-container .mask{border:2px solid var(--states-danger-base);background:var(--static-light)}tk-radio[aria-invalid] .tk-radio-container input:checked+.mask{border-color:var(--states-danger-light)}tk-radio[aria-invalid] .tk-radio-container input:checked+.mask div{background-color:var(--states-danger-base)}';

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
      return tkRadioCss;
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
//# sourceMappingURL=p-CZvvN91o.js.map

//# sourceMappingURL=p-CZvvN91o.js.map
