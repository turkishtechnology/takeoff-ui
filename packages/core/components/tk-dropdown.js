import { p as proxyCustomElement, H, c as createEvent, h } from './p-F5eU3Bfi.js';
import { a as autoUpdate, c as computePosition, o as offset, f as flip, s as shift } from './p-B0XocndT.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { v as v4 } from './p-BF0_OXTe.js';

const tkDropdownCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}tk-dropdown{display:inline-block}.tk-dropdown-container{position:relative}.tk-dropdown-container .tk-dropdown-panel{position:absolute;top:0;left:0;z-index:800;width:max-content;max-height:300px;overflow-y:auto;border-radius:16px;border:1px solid var(--border-light);background:var(--static-light);box-shadow:var(--effect-1-default-sm)}.tk-dropdown-container .tk-dropdown-panel .tk-dropdown-item-holder{margin:8px}.tk-dropdown-container .tk-dropdown-panel .tk-dropdown-item-holder .tk-dropdown-group-label{display:flex;align-items:center;gap:16px;color:var(--text-dark);font-size:var(--desktop-body-xs-size);padding:0px 8px}.tk-dropdown-container .tk-dropdown-panel .tk-dropdown-item-holder .tk-dropdown-group-label label{white-space:nowrap}.tk-dropdown-container .tk-dropdown-panel .tk-dropdown-item-holder .tk-dropdown-group-label .line{width:100%;height:1px;background-color:var(--background-light)}.tk-dropdown-container .tk-dropdown-panel .tk-dropdown-item-holder .tk-dropdown-item{color:var(--text-darkest);border-radius:8px;padding:var(--dropdown-items-basic-base-v-padding) var(--dropdown-items-basic-base-h-padding, 8px)}.tk-dropdown-container .tk-dropdown-panel .tk-dropdown-item-holder .tk-dropdown-item.left{text-align:left}.tk-dropdown-container .tk-dropdown-panel .tk-dropdown-item-holder .tk-dropdown-item.center{text-align:center}.tk-dropdown-container .tk-dropdown-panel .tk-dropdown-item-holder .tk-dropdown-item.right{text-align:right}.tk-dropdown-container .tk-dropdown-panel .tk-dropdown-item-holder .tk-dropdown-item:hover,.tk-dropdown-container .tk-dropdown-panel .tk-dropdown-item-holder .tk-dropdown-item[data-active=true]{cursor:pointer;background:var(--background-lightest)}.tk-dropdown-container .tk-dropdown-panel .tk-dropdown-item-holder .tk-dropdown-item.disabled{color:var(--text-dark);pointer-events:none}.tk-dropdown-container.large .tk-dropdown-item-holder .tk-dropdown-item{font-size:var(--desktop-body-m-base-size)}.tk-dropdown-container.base .tk-dropdown-item-holder .tk-dropdown-item{font-size:var(--desktop-body-s-size)}.tk-dropdown-container.small .tk-dropdown-item-holder .tk-dropdown-item{font-size:var(--desktop-body-xs-size)}';

const TkDropdown$1 = /*@__PURE__*/ proxyCustomElement(
  class TkDropdown extends H {
    constructor() {
      super();
      this.__registerHost();
      this.tkItemClick = createEvent(this, 'tk-item-click', 7);
      this.hasEmptyDataSlot = false;
      this.isOpen = false;
      /**
       * The disabled status.
       * @defaultValue false
       */
      this.disabled = false;
      /**
       * The message to display when there is no data available.
       */
      this.emptyMessage = 'No options available';
      /**
       * The key to use for option labels
       * @defaultValue label
       */
      this.optionLabelKey = 'label';
      /**
       * The key to use for option values
       * @defaultValue value
       */
      this.optionValueKey = 'value';
      /**
       * The key to use for group names when options are grouped
       * @defaultValue groupName
       */
      this.groupNameKey = 'groupName';
      /**
       * The key to use for grouped options array
       * @defaultValue options
       */
      this.groupOptionsKey = 'options';
      /**
       * Indicates the alignment of options.
       * @defaultValue left
       */
      this.optionsAlign = 'left';
      /**
       * Sets the position of the tooltip.
       * @defaultValue 'right'
       */
      this.position = 'bottom';
      this.uniqueId = v4();
      this.windowClickHandler = this.handleWindowClick.bind(this);
    }
    componentWillLoad() {
      this.hasEmptyDataSlot = !!this.el.querySelector('[slot="empty-data"]');
      this.triggerRef = this.el.querySelector('[slot="trigger"]');
      if (this.triggerRef && !this.disabled) {
        this.triggerRef.style.cursor = 'pointer';
        this.triggerRef.addEventListener('click', () => {
          this.isOpen = !this.isOpen;
        });
      }
    }
    componentDidUpdate() {
      if (this.isOpen) {
        this.cleanup = autoUpdate(this.triggerRef, this.panelRef, () => this.updatePosition(), {
          animationFrame: true,
        });
        this.bindWindowClickListener();
      } else {
        this.cleanup && this.cleanup();
        this.unbindWindowClickListener();
      }
    }
    disconnectedCallback() {
      this.unbindWindowClickListener();
    }
    updatePosition() {
      if (this.triggerRef && this.panelRef) {
        computePosition(this.triggerRef, this.panelRef, {
          placement: this.position,
          middleware: [offset(4), flip(), shift({ padding: 5 })],
        }).then(({ x, y }) => {
          Object.assign(this.panelRef.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        });
      }
    }
    isGrouped() {
      var _a;
      return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.length) > 0 && this.options[0].hasOwnProperty(this.groupNameKey);
    }
    getOptionLabel(item) {
      return typeof item === 'object' ? item[this.optionLabelKey] : item;
    }
    bindWindowClickListener() {
      window.addEventListener('click', this.windowClickHandler);
    }
    unbindWindowClickListener() {
      window.removeEventListener('click', this.windowClickHandler);
    }
    handleWindowClick(event) {
      const isInnerClicked = event.composedPath().some(item => item == this.el);
      if (!isInnerClicked) {
        this.isOpen = false;
        this.unbindWindowClickListener();
      }
    }
    handleItemClick(item) {
      this.isOpen = false;
      this.tkItemClick.emit(item);
    }
    createOptionItem(options) {
      return options === null || options === void 0
        ? void 0
        : options.map((item, index) => {
            let optionItem;
            if (this.optionHtml != undefined) {
              optionItem = this.optionHtml(item);
            } else {
              optionItem = this.getOptionLabel(item);
            }
            return h('div', {
              'class': classNames('tk-dropdown-item', this.optionsAlign, { disabled: item === null || item === void 0 ? void 0 : item.disabled }),
              'data-option-index': index,
              'data-active': index == 0 ? 'true' : 'false',
              'onClick': () => this.handleItemClick(item),
              'innerHTML': optionItem,
            });
          });
    }
    createOptions() {
      var _a;
      if (this.isGrouped()) {
        return (_a = this.options) === null || _a === void 0
          ? void 0
          : _a.map(group => {
              return h(
                'div',
                { class: 'tk-dropdown-group' },
                h('div', { class: 'tk-dropdown-group-label' }, h('label', null, group[this.groupNameKey]), h('div', { class: 'line' })),
                this.createOptionItem(group[this.groupOptionsKey]),
              );
            });
      } else {
        return this.createOptionItem(this.options);
      }
    }
    renderDropdown() {
      var _a;
      if (!this.isOpen) return null;
      return h(
        'div',
        { 'class': 'tk-dropdown-panel', 'ref': el => (this.panelRef = el), 'data-tk-dropdown-id': this.uniqueId },
        h(
          'div',
          { class: 'tk-dropdown-item-holder' },
          ((_a = this.options) === null || _a === void 0 ? void 0 : _a.length) > 0
            ? this.createOptions()
            : this.hasEmptyDataSlot
              ? h('slot', { name: 'empty-data' })
              : this.emptyMessage,
        ),
      );
    }
    render() {
      const rootClasses = classNames('tk-dropdown-container');
      return h(
        'div',
        { 'key': '93fdd451e36f41948be29ffbec3f49a80a2292b6', 'class': rootClasses, 'data-tk-dropdown-id': this.uniqueId },
        h('slot', { key: '30c581b6eda8d4f45ba749df1f0eb5f857597015', name: 'trigger' }),
        this.renderDropdown(),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkDropdownCss;
    }
  },
  [
    4,
    'tk-dropdown',
    {
      disabled: [4],
      emptyMessage: [1, 'empty-message'],
      optionHtml: [16, 'option-html'],
      optionLabelKey: [1, 'option-label-key'],
      optionValueKey: [1, 'option-value-key'],
      groupNameKey: [1, 'group-name-key'],
      groupOptionsKey: [1, 'group-options-key'],
      options: [16],
      optionsAlign: [1, 'options-align'],
      position: [1],
      isOpen: [32],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-dropdown'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-dropdown':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkDropdown$1);
        }
        break;
    }
  });
}

const TkDropdown = TkDropdown$1;
const defineCustomElement = defineCustomElement$1;

export { TkDropdown, defineCustomElement };
//# sourceMappingURL=tk-dropdown.js.map

//# sourceMappingURL=tk-dropdown.js.map
