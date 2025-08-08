import { p as proxyCustomElement, H, c as createEvent, h } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkRadioGroupCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}tk-radio-group{display:block}.tk-radio-group-container{display:flex;align-items:flex-start;flex-direction:column;gap:4px}.tk-radio-group-container label{font-size:var(--size-sm);font-weight:400;color:var(--text-darkest);line-height:var(--desktop-body-s-line-height);padding:var(--input-external-label-base-label-v-padding) var(--input-external-label-base-label-h-padding)}.tk-radio-group-container label .asterisk{color:var(--states-danger-base);font-size:var(--desktop-label-s-size);font-weight:300;line-height:var(--desktop-label-s-line-height)}.tk-radio-group-container .tk-radio-holder{display:flex;flex-direction:row;gap:8px}.tk-radio-group-container .tk-radio-holder.spread{width:100%}.tk-radio-group-container .tk-radio-holder.spread tk-radio{flex:1}.tk-radio-group-container .tk-radio-holder.card tk-radio{border-radius:var(--radius-m-base);border:1px solid var(--border-light)}.tk-radio-group-container .tk-radio-holder.card tk-radio:hover{background-color:var(--background-lightest)}.tk-radio-group-container .tk-radio-holder.card tk-radio .tk-radio-container{padding:var(--card-radio-container-v-padding) var(--card-radio-container-h-padding)}.tk-radio-group-container.vertical .tk-radio-holder{flex-direction:column}';

const TkRadioGroup$1 = /*@__PURE__*/ proxyCustomElement(
  class TkRadioGroup extends H {
    constructor() {
      super();
      this.__registerHost();
      this.tkChange = createEvent(this, 'tk-change', 7);
      this.internals = this.attachInternals();
      /**
       * The direction of the radio buttons.
       */
      this.direction = 'horizontal';
      /**
       * Indicates whether the input is in an invalid state
       * @defaultValue false
       */
      this.invalid = false;
      /**
       * Determines the position of the radio group and label.
       */
      this.position = 'left';
      /**
       * Displays a red asterisk (*) next to the label for visual emphasis.
       */
      this.showAsterisk = false;
      /**
       * Determines whether the radios will spread evenly across the horizontal space.
       */
      this.spread = false;
      /**
       * Determines the appearance types of radios.
       */
      this.type = 'default';
    }
    invalidChanged() {
      var _a;
      if (((_a = this.slottedItems) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        this.slottedItems.forEach(item => {
          item.invalid = this.invalid;
        });
      }
    }
    /**
     * Watches for changes in the selected value and emits a custom event when the value changes.
     */
    valueChanged() {
      this.updateTkRadio();
    }
    componentWillLoad() {
      this.slottedItems = this.el.querySelectorAll('tk-radio');
      if (this.slottedItems.length > 0) {
        this.slottedItems.forEach(item => {
          item.addEventListener('tk-change', e => {
            e.stopPropagation();
            this.handleChange(e);
          });
          item.checked = this.value == item.value;
          item.invalid = this.invalid;
        });
      }
    }
    formResetCallback() {
      this.handleFormReset();
    }
    updateTkRadio() {
      if (this.slottedItems.length > 0) {
        this.slottedItems.forEach(item => {
          item.checked = this.value == item.value;
        });
      }
    }
    handleFormReset() {
      this.value = null;
      this.tkChange.emit(this.value);
      this.updateTkRadio();
    }
    handleChange(e) {
      this.value = e.detail;
      this.tkChange.emit(this.value);
      this.updateTkRadio();
    }
    render() {
      var _a;
      let _label;
      const rootClasses = classNames('tk-radio-group-container', {
        vertical: this.direction === 'vertical',
      });
      if (((_a = this.label) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        const asterisk = h('span', { key: '81bfe535a4650bf910502f87f14418a0c04b969d', class: 'asterisk' }, '*');
        _label = h('label', { key: '25126bafe9067581c97d64f20bf91e2e3076f77b', class: 'label' }, this.label, this.showAsterisk && asterisk);
      }
      return h(
        'div',
        { key: 'f0904447ad9a4e11dd1ce06bc15f4f6c8bd3ed26', class: rootClasses },
        _label,
        h(
          'div',
          { key: 'c337e91375e7d578c26c5c1302d944f117b624a8', class: classNames('tk-radio-holder', this.type, { spread: this.spread }) },
          this.slottedItems.length > 0 ? h('slot', null) : '',
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
        invalid: ['invalidChanged'],
        value: ['valueChanged'],
      };
    }
    static get style() {
      return tkRadioGroupCss;
    }
  },
  [
    68,
    'tk-radio-group',
    {
      label: [1],
      direction: [1],
      invalid: [4],
      position: [1],
      value: [1032],
      showAsterisk: [4, 'show-asterisk'],
      spread: [4],
      type: [1],
      slottedItems: [32],
    },
    undefined,
    {
      invalid: ['invalidChanged'],
      value: ['valueChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-radio-group'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-radio-group':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkRadioGroup$1);
        }
        break;
    }
  });
}

const TkRadioGroup = TkRadioGroup$1;
const defineCustomElement = defineCustomElement$1;

export { TkRadioGroup, defineCustomElement };
//# sourceMappingURL=tk-radio-group.js.map

//# sourceMappingURL=tk-radio-group.js.map
