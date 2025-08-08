import { p as proxyCustomElement, H, c as createEvent, h } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkToggleButtonGroupCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}.tk-toggle-button-group{display:flex;align-items:center;gap:8px;width:100%;padding:4px;align-self:stretch;background:var(--static-Light, #fff);border-radius:12px}.tk-toggle-button-group.light{border:1px solid var(--border-light, #e1e4ea);background:var(--background-lightest, #f9fafc)}.tk-toggle-button-group.divided{border:1px solid var(--border-light, #e1e4ea)}.tk-toggle-button-group.horizontal{flex-direction:row}.tk-toggle-button-group.horizontal.rounded{border-radius:999px}.tk-toggle-button-group.vertical{flex-direction:column}.tk-toggle-button-group.vertical.rounded{border-radius:24px}';

const TkToggleButtonGroup$1 = /*@__PURE__*/ proxyCustomElement(
  class TkToggleButtonGroup extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkChange = createEvent(this, 'tk-change', 7);
      /**
       * The value type of the toggle button group.
       */
      this.type = 'basic';
      /**
       * The value of the rounded toggle button group.
       */
      this.rounded = false;
      /**
       * The direction of the toggle button group.
       */
      this.direction = 'horizontal';
    }
    roundedChanged() {
      this.updateSlottedItems();
    }
    valueChanged() {
      this.updateSelected();
      this.tkChange.emit(this.value);
    }
    componentWillLoad() {
      this.updateSlottedItems();
    }
    updateSlottedItems() {
      this.slottedItems = this.el.querySelectorAll('tk-toggle-button');
      this.updateSelected();
      this.slottedItems.forEach(item => {
        item.rounded = this.rounded;
        item.addEventListener('tk-toggle', this.handleToggle.bind(this));
      });
    }
    updateSelected() {
      var _a;
      if (((_a = this.slottedItems) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        this.slottedItems.forEach(item => {
          if (item.disabled) {
            if (item.selected) {
              item.selected = false;
              item.value = undefined;
            }
            return;
          }
          item.selected = this.value == item.value;
        });
      }
    }
    handleToggle(e) {
      const { value } = e.detail;
      this.value = value;
      this.updateSelected();
    }
    render() {
      const groupClasses = classNames('tk-toggle-button-group', this.type, {
        rounded: this.rounded,
        vertical: this.direction === 'vertical',
        horizontal: this.direction === 'horizontal',
      });
      return h(
        'div',
        { key: 'f036baf1df58423ec7ca43f3680eafa4e15ba2cf', class: groupClasses },
        h('slot', { key: '288a0c8318e216df46d9ce842b0ee6455a83e94b', onSlotchange: () => this.updateSlottedItems() }),
      );
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        rounded: ['roundedChanged'],
        value: ['valueChanged'],
      };
    }
    static get style() {
      return tkToggleButtonGroupCss;
    }
  },
  [
    1,
    'tk-toggle-button-group',
    {
      type: [1],
      rounded: [4],
      value: [1032],
      direction: [1],
      slottedItems: [32],
    },
    undefined,
    {
      rounded: ['roundedChanged'],
      value: ['valueChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-toggle-button-group'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-toggle-button-group':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkToggleButtonGroup$1);
        }
        break;
    }
  });
}

const TkToggleButtonGroup = TkToggleButtonGroup$1;
const defineCustomElement = defineCustomElement$1;

export { TkToggleButtonGroup, defineCustomElement };
//# sourceMappingURL=tk-toggle-button-group.js.map

//# sourceMappingURL=tk-toggle-button-group.js.map
