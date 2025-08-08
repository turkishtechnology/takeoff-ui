import { p as proxyCustomElement, H, c as createEvent, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkRadioGroupScss =
  'tk-radio-group {\n  display: block;\n}\n\n.tk-radio-group-container {\n  display: flex;\n  align-items: flex-start;\n  flex-direction: column;\n  gap: 4px;\n\n  label {\n    font-size: var(--size-sm);\n    font-weight: 400;\n    color: var(--text-darkest);\n    line-height: var(--desktop-body-s-line-height);\n    padding: var(--input-external-label-base-label-v-padding) var(--input-external-label-base-label-h-padding);\n\n    .asterisk {\n      color: var(--states-danger-base);\n      font-size: var(--desktop-label-s-size);\n      font-weight: 300;\n      line-height: var(--desktop-label-s-line-height);\n    }\n  }\n\n  .tk-radio-holder {\n    display: flex;\n    flex-direction: row;\n    gap: 8px;\n\n    &.spread {\n      width: 100%;\n\n      tk-radio {\n        flex: 1;\n      }\n    }\n\n    &.card {\n      tk-radio {\n        border-radius: var(--radius-m-base);\n        border: 1px solid var(--border-light);\n\n        &:hover {\n          background-color: var(--background-lightest);\n        }\n\n        .tk-radio-container {\n          padding: var(--card-radio-container-v-padding) var(--card-radio-container-h-padding);\n        }\n      }\n    }\n  }\n\n  &.vertical {\n    .tk-radio-holder {\n      flex-direction: column;\n    }\n  }\n}\n';

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
      return tkRadioGroupScss;
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
