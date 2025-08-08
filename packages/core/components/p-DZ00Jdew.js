import { p as proxyCustomElement, H, c as createEvent, h, F as Fragment } from './p-CsLMRZQo.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { a as autoUpdate, c as computePosition, o as offset, f as flip, s as shift, d as size } from './p-B0XocndT.js';
import { _ } from './p-BVf-UonN.js';
import { d as defineCustomElement$6 } from './p-DFQnxT5R.js';
import { d as defineCustomElement$5 } from './p-DOZWa_LM.js';
import { d as defineCustomElement$4 } from './p-C3H0tZoE.js';
import { d as defineCustomElement$3 } from './p-vR69rcDp.js';
import { d as defineCustomElement$2 } from './p-BL_nUTNW.js';
import { d as defineCustomElement$1 } from './p-CEvspPP4.js';
import { v as v4 } from './p-BF0_OXTe.js';

const tkSelectCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}tk-select{display:block}.tk-select-container .tk-select-panel{position:fixed;max-height:320px;overflow-y:auto;border-radius:16px;border:1px solid var(--border-light);background:var(--static-light);z-index:800;box-shadow:var(--effect-1-default-sm)}.tk-select-container .tk-select-panel .dropdown-item-holder{margin:8px}.tk-select-container .tk-select-panel .dropdown-item-holder .dropdown-group-label{display:flex;align-items:center;gap:16px;color:var(--text-dark);font-size:var(--desktop-body-xs-size);padding:0px 8px}.tk-select-container .tk-select-panel .dropdown-item-holder .dropdown-group-label label{white-space:nowrap}.tk-select-container .tk-select-panel .dropdown-item-holder .dropdown-group-label .line{width:100%;height:1px;background-color:var(--background-light)}.tk-select-container .tk-select-panel .dropdown-item-holder .dropdown-item{color:var(--text-darkest);border-radius:8px;padding:var(--dropdown-items-basic-base-v-padding) var(--dropdown-items-basic-base-h-padding, 8px)}.tk-select-container .tk-select-panel .dropdown-item-holder .dropdown-item.multiple{display:flex;align-items:center;gap:8px}.tk-select-container .tk-select-panel .dropdown-item-holder .dropdown-item:hover{cursor:pointer;background:var(--background-lightest)}.tk-select-container .tk-select-panel .dropdown-item-holder .dropdown-item[data-active=true]{cursor:pointer;background:var(--background-light)}.tk-select-container .tk-select-panel .dropdown-item-holder .dropdown-item[data-selected=true]{cursor:pointer;background:var(--states-info-light)}.tk-select-container .tk-select-panel::-webkit-scrollbar{width:6px;background:var(--background-lightest);opacity:1}.tk-select-container .tk-select-panel::-webkit-scrollbar-track{border-radius:2px;background:var(--background-lightest);opacity:1}.tk-select-container .tk-select-panel::-webkit-scrollbar-thumb{border-radius:3px;background:var(--secondary-sub-base);opacity:1}.tk-select-container.large .dropdown-item-holder .dropdown-item{font-size:var(--desktop-body-m-base-size)}.tk-select-container.base .dropdown-item-holder .dropdown-item{font-size:var(--desktop-body-s-size)}.tk-select-container.small .dropdown-item-holder .dropdown-item{font-size:var(--desktop-body-xs-size)}';

const TkSelect = /*@__PURE__*/ proxyCustomElement(
  class TkSelect extends H {
    constructor() {
      super();
      this.__registerHost();
      this.tkChange = createEvent(this, 'tk-change', 7);
      this.internals = this.attachInternals();
      this.hasEmptyDataSlot = false;
      this.isItemClickFlag = false;
      this.hasFocus = false;
      this.isOpen = false;
      /**
       * The key to use for option group names.
       * Required if grouped options are used.
       */
      this.groupNameKey = 'label';
      /**
       * The key to use for accessing grouped options array.
       * Required if grouped options are used.
       */
      this.groupOptionsKey = 'options';
      /**
       * Represents whether the options are fethecd from service or not.
       * If true renders spinner in options dropdown.
       */
      this.loading = false;
      /**
       * Enables users to enter custom values that are not part of the predefined options.
       * @defaultValue false
       */
      this.allowCustomValue = false;
      /**
       * Indicates whether the input can be cleared
       * @defaultValue false
       */
      this.clearable = false;
      /**
       * If `true`, the user cannot interact with the input.
       * @defaultValue false
       */
      this.disabled = false;
      /**
       * Determines the width of the dropdown. Accepts values like 'match-parent', 'auto', or a specific width in '300px'.
       * @defaultValue match-parent
       */
      this.dropdownWidthMode = 'match-parent';
      /**
       * This property determines whether the input field within the select box is editable.
       * @defaultValue false
       */
      this.editable = false;
      /**
       * The message to display when there is no data available.
       */
      this.emptyMessage = 'No options available';
      /**
       *  Function used to filter current options based on the input value. Comes with a default filter function, but can be overridden with a custom function.
       */
      this.filter = this.defaultFilter;
      /**
       * Sets the delay (in ms) before triggering the filter function.
       */
      this.filterDebounceDelay = 0;
      /**
       * Indicates whether the input is in an invalid state
       * @defaultValue false
       */
      this.invalid = false;
      /**
       * If `true`, the user cannot modify the value.
       * @defaultValue false
       */
      this.readonly = false;
      /**
       * Sets size for the component.
       * @defaultValue base
       */
      this.size = 'base';
      /**
       * Displays a red asterisk (*) next to the label for visual emphasis.
       */
      this.showAsterisk = false;
      /**
       * The key to use for option labels
       * @defaultValue label
       */
      this.optionLabelKey = 'label';
      this.uniqueId = v4();
      this.windowClickHandler = this.handleWindowClick.bind(this);
      this.boundRunFilterForMultiple = this.runFilterForMultiple.bind(this);
    }
    optionsChanged(newValue, oldValue) {
      var _a;
      if (_.isEqual(newValue, oldValue)) return;
      this.renderOptions = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.length) > 0 ? [...this.options] : [];
      this.setValue();
    }
    /**
     * Update the native input element when the value changes
     */
    valueChanged(newValue, oldValue) {
      if (_.isEqual(newValue, oldValue)) return;
      this.setValue();
    }
    componentWillLoad() {
      var _a;
      this.hasEmptyDataSlot = !!this.el.querySelector('[slot="empty-data"]');
      this.renderOptions = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.length) > 0 ? [...this.options] : [];
    }
    componentDidRender() {
      var _a, _b;
      // multiple durumda chips li input çalıştığı için ve tk-input value olarak chips leri geri döndürdüğü için
      // tk-input'un içindeki inputa yazılan değerlerin filtering için çalışabilmesini sağlamak için yapılmıştır.
      if (this.multiple && this.editable) {
        (_a = this.nativeInputRef) === null || _a === void 0 ? void 0 : _a.removeEventListener('input', this.boundRunFilterForMultiple);
        (_b = this.nativeInputRef) === null || _b === void 0 ? void 0 : _b.addEventListener('input', this.boundRunFilterForMultiple);
      }
    }
    componentDidLoad() {
      var _a, _b, _c, _d;
      (_b = (_a = this.internals) === null || _a === void 0 ? void 0 : _a.form) === null || _b === void 0
        ? void 0
        : _b.addEventListener('reset', () => {
            this.handleFormReset();
          });
      this.nativeInputRef = this.inputRef.querySelector('input');
      // dialog içerisindek kullanıldığında dialog içerisinde scroll olduğunda panelin kapanması için yapıldı.
      this.dialogRef = this.el.closest('tk-dialog');
      (_d = (_c = this.dialogRef) === null || _c === void 0 ? void 0 : _c.querySelector('.tk-dialog-content')) === null || _d === void 0
        ? void 0
        : _d.addEventListener('scroll', this.handleDialogScroll.bind(this));
      if (this.allowCustomValue) {
        this.editable = true;
      }
      if (this.value) {
        this.setValue();
      }
    }
    componentDidUpdate() {
      var _a;
      this.nativeInputRef = this.inputRef.querySelector('input');
      if (this.isOpen) {
        if (this.inputRef && this.panelRef) {
          this.cleanup = autoUpdate(this.inputRef.querySelector('.tk-input'), this.panelRef, () => this.updatePosition(), {
            animationFrame: true,
          });
        }
        this.bindWindowClickListener();
      } else {
        (_a = this.panelRef) === null || _a === void 0 ? void 0 : _a.remove();
        this.cleanup && this.cleanup();
        this.unbindWindowClickListener();
      }
    }
    isGrouped() {
      var _a, _b;
      return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.length) > 0 && ((_b = this.options[0]) === null || _b === void 0 ? void 0 : _b[this.groupOptionsKey]);
    }
    disconnectedCallback() {
      var _a, _b, _c, _d;
      (_b = (_a = this.internals) === null || _a === void 0 ? void 0 : _a.form) === null || _b === void 0
        ? void 0
        : _b.removeEventListener('reset', this.handleFormReset.bind(this));
      this.unbindWindowClickListener();
      (_d = (_c = this.dialogRef) === null || _c === void 0 ? void 0 : _c.querySelector('.tk-dialog-content')) === null || _d === void 0
        ? void 0
        : _d.removeEventListener('scroll', this.handleDialogScroll.bind(this));
    }
    formResetCallback() {
      this.handleFormReset();
    }
    async runFilterForMultiple() {
      this.renderOptions = await this.filter(this.nativeInputRef.value, this.options);
    }
    async defaultFilter(text, options) {
      if (!text) {
        return [...this.options];
      }
      return options.filter(item => this.getOptionLabel(item).toLowerCase().indexOf(text.toLowerCase()) > -1);
    }
    updatePosition() {
      const tkInputRootEl = this.inputRef.querySelector('.tk-input');
      const dropdownWidthMode = this.dropdownWidthMode;
      if (tkInputRootEl && this.panelRef) {
        computePosition(tkInputRootEl, this.panelRef, {
          strategy: 'fixed',
          placement: 'bottom-start',
          middleware: [
            offset(4),
            flip(),
            shift({ padding: 5 }),
            size({
              apply({ rects, elements }) {
                if (dropdownWidthMode === 'match-parent') {
                  Object.assign(elements.floating.style, {
                    width: `${rects.reference.width}px`,
                  });
                } else if (dropdownWidthMode !== 'auto' && dropdownWidthMode.length > 0) {
                  Object.assign(elements.floating.style, {
                    width: dropdownWidthMode,
                  });
                }
              },
            }),
          ],
        }).then(({ x, y }) => {
          Object.assign(this.panelRef.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        });
      }
    }
    getOptionLabel(item) {
      return typeof item === 'object' ? this.getNestedValue(item, this.optionLabelKey) : item;
    }
    getOptionValue(item) {
      var _a;
      if (typeof item === 'object') {
        if (((_a = this.optionValueKey) === null || _a === void 0 ? void 0 : _a.length) > 0) {
          return this.getNestedValue(item, this.optionValueKey);
        } else {
          return item;
        }
      } else {
        return item;
      }
    }
    async setRenderOptions(value) {
      if (this.isGrouped()) {
        this.renderOptions = this.options
          .map(group =>
            Object.assign(Object.assign({}, group), {
              [this.groupOptionsKey]: group[this.groupOptionsKey].filter(option =>
                this.getOptionLabel(option)
                  .toLowerCase()
                  .includes((value === null || value === void 0 ? void 0 : value.toLowerCase()) || ''),
              ),
            }),
          )
          .filter(group => group[this.groupOptionsKey].length > 0);
      } else {
        this.renderOptions = await this.filter(value, this.options);
      }
    }
    getSelectedItem() {
      var _a, _b, _c, _d;
      if (((_a = this.renderOptions) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        if (typeof this.value != 'object' && ((_b = this.renderOptions) === null || _b === void 0 ? void 0 : _b.every(item => typeof item != 'object'))) {
          // value ve her bir option object değilse. Yani bu primitive tiplerle çalışan bir selectbox ise
          return this.renderOptions.find(item => item == this.value);
        } else if ((_c = this.renderOptions) === null || _c === void 0 ? void 0 : _c.every(item => typeof item === 'object')) {
          if (((_d = this.optionValueKey) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            return this.renderOptions.find(item => this.getOptionValue(item) == this.value);
          } else {
            return this.renderOptions.find(item => _.isEqual(item, this.value));
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
    setValue() {
      var _a;
      if (!this.inputRef) return;
      let innerOptions = [];
      if (this.isGrouped()) {
        innerOptions = this.options.flatMap(group => group[this.groupOptionsKey]);
      } else {
        innerOptions = this.options;
      }
      // Handle multiple selection case
      if (this.multiple) {
        // Ensure value is always an array
        const currentValue = Array.isArray(this.value) ? this.value : [];
        this.selectedItem = currentValue
          .map(val => {
            let found;
            if (this.optionValueKey) {
              found = innerOptions.find(opt => this.getOptionValue(opt) === val);
            } else {
              found = innerOptions.find(opt => _.isEqual(opt, val));
            }
            if (found !== undefined) return found;
            if (this.allowCustomValue) return val;
            return null;
          })
          .filter(val => val !== null && val !== undefined);
        this.inputRef.value = this.selectedItem;
        return;
      }
      // Handle single selection case
      if (this.editable && this.allowCustomValue) {
        // For editable with custom values, show the value directly
        this.inputRef.value = this.value ? this.getOptionLabel(this.value) : null;
        return;
      }
      // Find the selected item based on value type
      if (typeof this.value !== 'object' && innerOptions.every(item => typeof item !== 'object')) {
        // Handle primitive values
        this.selectedItem = innerOptions.find(item => item === this.value);
      } else if (((_a = this.optionValueKey) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        // Handle object values with optionValueKey
        this.selectedItem = innerOptions.find(item => this.getOptionValue(item) === this.value);
      } else {
        // Handle object values without optionValueKey
        this.selectedItem = innerOptions.find(item => _.isEqual(item, this.value));
      }
      // Set input value based on selection state
      if (this.selectedItem) {
        this.inputRef.value = this.selectedItem;
      } else {
        this.inputRef.value = null;
      }
    }
    getNestedValue(obj, path) {
      return path.split('.').reduce((acc, key) => {
        return acc && acc[key] !== undefined ? acc[key] : undefined;
      }, obj);
    }
    scrollItem(item) {
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
    bindWindowClickListener() {
      window.addEventListener('click', this.windowClickHandler);
    }
    unbindWindowClickListener() {
      window.removeEventListener('click', this.windowClickHandler);
    }
    // dialog contentindeki scroll'u dinleyip scroll olduğunda panelin kapanması için yapıldı
    handleDialogScroll() {
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
    handleFormReset() {
      this.value = null;
      this.tkChange.emit(null);
    }
    handleWindowClick(event) {
      const isInnerClicked = event.composedPath().some(item => item == this.el);
      if (!isInnerClicked) {
        this.isOpen = false;
        this.unbindWindowClickListener();
      }
    }
    async handleItemClick(item) {
      this.isItemClickFlag = true;
      if (this.multiple) {
        let tmpValue = Array.isArray(this.value) ? [...this.value] : [];
        const tmpItem = this.getOptionValue(item);
        if (_.some(tmpValue, itemValue => _.isEqual(itemValue, this.getOptionValue(tmpItem)))) {
          // tıklanan item zaten seçili ise seçimi kaldırır
          _.remove(tmpValue, itemValue => _.isEqual(itemValue, tmpItem));
        } else {
          // tıklanan item seçili değilse ekler
          tmpValue.push(tmpItem);
        }
        // filtreleme ardında yapılan seçimden sonra filtrelem için kullandığımız tk-input içerisindeki native inputu temizleme işlemi
        if (this.multiple && this.editable) {
          this.nativeInputRef.value = null;
          this.renderOptions = await this.filter(null, this.options);
        }
        this.inputRef.value = [...tmpValue];
        this.value = [...tmpValue];
        this.tkChange.emit([...tmpValue]);
      } else {
        this.value = this.getOptionValue(item);
        this.tkChange.emit(this.getOptionValue(item));
        this.isOpen = false;
      }
    }
    async handleInputChange(value) {
      if (this.multiple) {
        if (value == null) {
          this.value = [];
        } else {
          const resolvedValues = (Array.isArray(value) ? value : [value]).map(val => {
            if (typeof val === 'object' && val !== null && this.optionValueKey) {
              return this.getOptionValue(val);
            }
            return val;
          });
          this.value = resolvedValues;
        }
        this.tkChange.emit(this.value);
      } else {
        // this.isOpen = true;
        if (this.editable && this.allowCustomValue) {
          this.value = value;
          this.tkChange.emit(value);
        }
        // hızlıca inputda arama yapılırsa verilen filterDebounceDelay süresi içinde
        // tekrar inputda değişiklik yapılırsa sadece bir defa filtre fonksiyonu çalıştırma için yapıldı.
        if (this.filterDebounceDelay > 0) {
          clearTimeout(this.filterDebounceTimeout);
          this.filterDebounceTimeout = setTimeout(async () => {
            await this.setRenderOptions(value);
          }, this.filterDebounceDelay);
        } else {
          await this.setRenderOptions(value);
        }
      }
    }
    handleInputClick() {
      if (!this.isOpen && !this.disabled) {
        this.hasFocus = true;
        this.isOpen = true;
        this.bindWindowClickListener();
      }
    }
    async handleInputBlur() {
      if (this.multiple) return;
      if (this.editable && !this.allowCustomValue) {
        const selectedItem = this.getSelectedItem();
        const inputValue = this.nativeInputRef.value;
        if (!inputValue) return;
        // custom value'ya izin verilmiyor ise inputu boşalt
        if (
          !this.isItemClickFlag &&
          // seçili item yok ise ama inutda bir değer var ise
          ((!selectedItem && inputValue) ||
            // seçili item var ise ama inputta yazar değer seçili item ile uyuşmuyor ise
            (selectedItem && this.getOptionLabel(selectedItem) != inputValue))
        ) {
          this.value = null;
          this.tkChange.emit(null);
          this.renderOptions = await this.filter(null, this.options);
        } else {
          this.isItemClickFlag = false;
        }
      }
    }
    async handleInputKeydown(e) {
      if (e.key == 'ArrowDown') {
        const activeItem = this.el.querySelector('.dropdown-item[data-active="true"]');
        const activeIndex = Number(activeItem === null || activeItem === void 0 ? void 0 : activeItem.getAttribute('data-option-index'));
        if (activeItem) {
          const newActiveItem = this.el.querySelector(`.dropdown-item[data-option-index='${activeIndex + 1}']`);
          if (newActiveItem) {
            activeItem.setAttribute('data-active', 'false');
            newActiveItem.setAttribute('data-active', 'true');
            this.scrollItem(newActiveItem);
          }
        } else {
          const newActiveItem = this.el.querySelector(`.dropdown-item[data-option-index='0']`);
          if (newActiveItem) {
            newActiveItem.setAttribute('data-active', 'true');
            this.scrollItem(newActiveItem);
          }
        }
      } else if (e.key == 'ArrowUp') {
        const activeItem = this.el.querySelector('.dropdown-item[data-active="true"]');
        const activeIndex = Number(activeItem === null || activeItem === void 0 ? void 0 : activeItem.getAttribute('data-option-index'));
        if (activeItem) {
          const newActiveItem = this.el.querySelector(`.dropdown-item[data-option-index='${activeIndex - 1}']`);
          if (newActiveItem) {
            activeItem.setAttribute('data-active', 'false');
            newActiveItem.setAttribute('data-active', 'true');
            this.scrollItem(newActiveItem);
          }
        } else {
          const newActiveItem = this.el.querySelector(`.dropdown-item[data-option-index='0']`);
          if (newActiveItem) {
            newActiveItem.setAttribute('data-active', 'true');
            this.scrollItem(newActiveItem);
          }
        }
      } else if (e.key == 'Enter') {
        const activeItem = this.el.querySelector('.dropdown-item[data-active="true"]');
        if (this.multiple && this.editable && this.allowCustomValue) {
          this.nativeInputRef.dispatchEvent(new InputEvent('input', { bubbles: true }));
        }
        activeItem === null || activeItem === void 0 ? void 0 : activeItem.click();
      } else if (e.key == 'Tab') {
        this.hasFocus = false;
        this.isOpen = false;
      }
    }
    handleInputClearClick() {
      this.value = null;
      this.tkChange.emit(null);
    }
    createOptionItem(options) {
      return options === null || options === void 0
        ? void 0
        : options.map((item, index) => {
            let itemProps = {};
            let children;
            let checking = _.some(this.value, itemValue => _.isEqual(itemValue, this.getOptionValue(item)));
            if (this.multiple) {
              if (this.optionHtml != undefined) {
                children = h(
                  Fragment,
                  null,
                  h('tk-checkbox', { 'value': checking, 'onTk-change': e => e.stopPropagation(), 'onClick': e => e.preventDefault() }),
                  h('div', { innerHTML: this.optionHtml(item) }),
                );
              } else {
                children = h(
                  Fragment,
                  null,
                  h('tk-checkbox', { 'value': checking, 'onTk-change': e => e.stopPropagation(), 'onClick': e => e.preventDefault() }),
                  h('div', null, this.getOptionLabel(item)),
                );
              }
            } else {
              if (this.optionHtml != undefined) {
                itemProps = { innerHTML: this.optionHtml(item) };
              } else {
                itemProps = { innerHTML: this.getOptionLabel(item) };
              }
            }
            return h(
              'div',
              Object.assign(
                {
                  'class': classNames('dropdown-item', { multiple: this.multiple }),
                  'data-option-index': index,
                  'data-selected': this.multiple && checking ? 'true' : this.value == item ? 'true' : 'false',
                  'onClick': () => this.handleItemClick(item),
                },
                itemProps,
              ),
              children,
            );
          });
    }
    createOptions() {
      if (this.isGrouped()) {
        return this.renderOptions.map(group =>
          h(
            'div',
            { class: 'dropdown-group' },
            h('div', { class: 'dropdown-group-label' }, h('label', null, group[this.groupNameKey]), h('div', { class: 'line' })),
            this.createOptionItem(group[this.groupOptionsKey]),
          ),
        );
      } else {
        return this.createOptionItem(this.renderOptions);
      }
    }
    renderInput() {
      var _a;
      return h('tk-input', {
        'ref': el => (this.inputRef = el),
        'class': classNames('tk-select-input', {
          'editable-select': this.editable,
          'tk-table-input': this.el.classList.contains('tk-table-select'),
          'multiple-select': this.multiple,
          'allow-custom-value-select': this.allowCustomValue,
        }),
        'label': this.label,
        'size': this.size,
        'showAsterisk': this.showAsterisk,
        'hint': this.hint,
        'placeholder': ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) > 0 ? '' : this.placeholder,
        'invalid': this.invalid,
        'error': this.error,
        'icon': 'keyboard_arrow_down',
        'iconPosition': 'right',
        'mode': this.multiple ? 'chips' : 'text',
        'chipLabelKey': this.optionLabelKey,
        'readonly': this.readonly,
        'disabled': this.disabled,
        'clearable': this.clearable,
        'chipOptions': this.chipOptions,
        'aria-describedby': 'dropdown',
        'aria-expanded': !!this.isOpen,
        'onClick': () => this.handleInputClick(),
        'onTk-change': e => {
          e.stopPropagation();
          this.handleInputChange(e.detail);
        },
        'onTk-blur': () => setTimeout(() => this.handleInputBlur(), 150),
        'onTk-clear-click': () => this.handleInputClearClick(),
        'onKeyDown': e => this.handleInputKeydown(e),
      });
    }
    renderDropdown() {
      var _a;
      if (!this.isOpen) return null;
      return h(
        'div',
        { 'class': 'tk-select-panel', 'ref': el => (this.panelRef = el), 'data-tk-select-id': this.uniqueId },
        h(
          'div',
          { class: 'dropdown-item-holder' },
          this.loading
            ? h('tk-spinner', { size: this.size })
            : ((_a = this.renderOptions) === null || _a === void 0 ? void 0 : _a.length) > 0
              ? this.createOptions()
              : this.hasEmptyDataSlot
                ? h('slot', { name: 'empty-data' })
                : this.emptyMessage,
        ),
      );
    }
    render() {
      const rootClasses = classNames('tk-select-container', this.size, { focus: this.hasFocus });
      return h(
        'div',
        { 'key': 'fc5784aa3b80ef1ec1e63c6c179858884543478a', 'aria-readonly': this.readonly, 'aria-disabled': this.disabled, 'aria-invalid': this.invalid, 'class': rootClasses },
        this.renderInput(),
        this.renderDropdown(),
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
        options: ['optionsChanged'],
        value: ['valueChanged'],
      };
    }
    static get style() {
      return tkSelectCss;
    }
  },
  [
    68,
    'tk-select',
    {
      groupNameKey: [1, 'group-name-key'],
      groupOptionsKey: [1, 'group-options-key'],
      loading: [4],
      allowCustomValue: [4, 'allow-custom-value'],
      clearable: [4],
      disabled: [4],
      dropdownWidthMode: [1, 'dropdown-width-mode'],
      editable: [4],
      error: [1],
      emptyMessage: [1, 'empty-message'],
      filter: [16],
      filterDebounceDelay: [2, 'filter-debounce-delay'],
      hint: [1],
      invalid: [4],
      label: [1],
      multiple: [4],
      name: [1],
      placeholder: [1],
      readonly: [4],
      size: [1],
      showAsterisk: [4, 'show-asterisk'],
      chipOptions: [16, 'chip-options'],
      options: [16],
      optionHtml: [16, 'option-html'],
      optionLabelKey: [1, 'option-label-key'],
      optionValueKey: [1, 'option-value-key'],
      value: [1032],
      hasFocus: [32],
      renderOptions: [32],
      isOpen: [32],
    },
    undefined,
    {
      options: ['optionsChanged'],
      value: ['valueChanged'],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-select', 'tk-button', 'tk-checkbox', 'tk-chips', 'tk-icon', 'tk-input', 'tk-spinner'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-select':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkSelect);
        }
        break;
      case 'tk-button':
        if (!customElements.get(tagName)) {
          defineCustomElement$6();
        }
        break;
      case 'tk-checkbox':
        if (!customElements.get(tagName)) {
          defineCustomElement$5();
        }
        break;
      case 'tk-chips':
        if (!customElements.get(tagName)) {
          defineCustomElement$4();
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$3();
        }
        break;
      case 'tk-input':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
      case 'tk-spinner':
        if (!customElements.get(tagName)) {
          defineCustomElement$1();
        }
        break;
    }
  });
}

export { TkSelect as T, defineCustomElement as d };
//# sourceMappingURL=p-DZ00Jdew.js.map

//# sourceMappingURL=p-DZ00Jdew.js.map
