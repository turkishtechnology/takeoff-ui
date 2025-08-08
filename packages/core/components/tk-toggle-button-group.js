import { p as proxyCustomElement, H, c as createEvent, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkToggleButtonGroupScss =
  '.tk-toggle-button-group {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  padding: 4px;\n  align-self: stretch;\n  background: var(--static-Light, #fff);\n  border-radius: 12px;\n\n  &.light {\n    border: 1px solid var(--border-light, #e1e4ea);\n    background: var(--background-lightest, #f9fafc);\n  }\n\n  &.divided {\n    border: 1px solid var(--border-light, #e1e4ea);\n  }\n\n  &.horizontal {\n    flex-direction: row;\n\n    &.rounded {\n      border-radius: 999px;\n    }\n  }\n\n  &.vertical {\n    flex-direction: column;\n\n    &.rounded {\n      border-radius: 24px;\n    }\n  }\n}\n';

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
      return tkToggleButtonGroupScss;
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
