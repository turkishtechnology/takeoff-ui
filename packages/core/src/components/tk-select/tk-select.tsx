import { AttachInternals, Component, ComponentInterface, Element, Event, EventEmitter, Fragment, Prop, State, Watch, h } from '@stencil/core';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { computePosition, flip, shift, offset, size, autoUpdate } from '@floating-ui/dom';
import _ from 'lodash';
import { IChipOptions } from '../tk-chips/interfaces';
import { IIconOptions } from '../../global/interfaces/IIconOptions';
import { addDialogScrollListener, removeDialogScrollListener } from '../../utils/dialog-utils';
import { getNestedValue } from '../../utils/object-utils';
import { applyStyles } from '../../utils/style-utils';
import { ClickOutsideMixin } from '../../utils/clickoutside-mixin';

/**
 * TkSelect component description.
 * @slot empty-data - Set how the dropdown will appear when there is no data
 * @react `import { TkSelect } from '@takeoff-ui/react'`
 * @vue `import { TkSelect } from '@takeoff-ui/vue'`
 * @angular `import { TkSelect } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-select',
  styleUrl: 'tk-select.scss',
  formAssociated: true,
})
export class TkSelect implements ComponentInterface {
  private hasEmptyDataSlot: boolean = false;
  private selectedItem: any;
  private inputRef?: HTMLTkInputElement;
  private nativeInputRef?: HTMLInputElement;
  private panelRef?: HTMLDivElement;
  private uniqueId = uuidv4();
  private filterDebounceTimeout;
  private boundRunFilterForMultiple: (event: Event) => void;
  private cleanup;
  private isItemClickFlag = false;
  private clickOutsideMixin?: ClickOutsideMixin;
  private innerOptions = [];
  private refSelectAll: HTMLTkCheckboxElement;

  @Element() el!: HTMLTkSelectElement;

  @AttachInternals() internals: ElementInternals;

  constructor() {
    this.boundRunFilterForMultiple = this.runFilterForMultiple.bind(this);
  }

  @State() hasFocus = false;
  @State() renderOptions: any[];
  @State() isOpen: boolean = false;

  /**
   * The key to use for option group names.
   * Required if grouped options are used.
   */
  @Prop() groupNameKey: string = 'label';

  /**
   * The key to use for accessing grouped options array.
   * Required if grouped options are used.
   */
  @Prop() groupOptionsKey: string = 'options';

  /**
   * Represents whether the options are fethecd from service or not.
   * If true renders spinner in options dropdown.
   */
  @Prop() loading: boolean = false;

  /**
   * Enables users to enter custom values that are not part of the predefined options.
   * @defaultValue false
   */
  @Prop() allowCustomValue: boolean = false;

  /**
   * Indicates whether the input can be cleared
   * @defaultValue false
   */
  @Prop() clearable: boolean = false;

  /**
   * The icon displayed in the select box.
   */
  @Prop() icon: string | IIconOptions;
  /**
   * If `true`, the user cannot interact with the input.
   * @defaultValue false
   */
  @Prop() disabled = false;

  /**
   * Determines the width of the dropdown. Accepts values like 'match-parent', 'auto', or a specific width in '300px'.
   * @defaultValue match-parent
   */
  @Prop() dropdownWidthMode: 'match-parent' | 'auto' | string = 'match-parent';

  /**
   * This property determines whether the input field within the select box is editable.
   * @defaultValue false
   */
  @Prop() editable: boolean = false;

  /**
   * This is the error message that will be displayed.
   */
  @Prop() error: string;

  /**
   * The message to display when there is no data available.
   */
  @Prop() emptyMessage: string = 'No options available';

  /**
   *  Function used to filter current options based on the input value. Comes with a default filter function, but can be overridden with a custom function.
   */
  @Prop() filter: Function = this.defaultFilter;

  /**
   * Sets the delay (in ms) before triggering the filter function.
   */
  @Prop() filterDebounceDelay: number = 0;

  /**
   * Provided a hint or additional information about the input.
   */
  @Prop() hint: string;

  /**
   * Indicates whether the input is in an invalid state
   * @defaultValue false
   */
  @Prop() invalid: boolean = false;

  /**
   * Defines the label for the element.
   */
  @Prop() label: string;

  /**
   * If `true` the user can make multiple selections.
   */
  @Prop() multiple: boolean;

  /**
   * The number of items to show in the collapsed select before listing `+N others`.
   */
  @Prop() visibleItemCount: number;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string;

  /**
   * Placeholder text displayed when the input is empty.
   */
  @Prop() placeholder?: string | null;

  /**
   * If `true`, the user cannot modify the value.
   * @defaultValue false
   */
  @Prop() readonly: boolean = false;

  /**
   * Sets size for the component.
   * @defaultValue base
   */
  @Prop() size: 'large' | 'base' | 'small' = 'base';

  /**
   * Displays a red asterisk (*) next to the label for visual emphasis.
   */
  @Prop() showAsterisk: boolean = false;

  /**
   * Sets options for all chips rendered in multiple selection mode.
   */
  @Prop() chipOptions: IChipOptions;

  /**
   * Provides a function to customize the panel top content.
   */
  @Prop() panelTopHtml: Function;

  /**
   * The list of options to be displayed in the select box.
   */
  @Prop() options: any[];
  @Watch('options')
  protected optionsChanged(newValue: any[], oldValue: any[]) {
    if (_.isEqual(newValue, oldValue)) return;

    this.renderOptions = this.options?.length > 0 ? [...this.options] : [];

    this.setValue();
  }

  /**
   * Provides a function to customize the options.
   */
  @Prop() optionHtml: Function;

  /**
   * The key to use for option labels
   * @defaultValue label
   */
  @Prop() optionLabelKey: string = 'label';

  /**
   * The key to use for option values
   * @defaultValue value
   */
  @Prop() optionValueKey: string;

  /**
   * If true enables selectAll option
   *  @defaultValue false
   */
  @Prop() selectAll: boolean = false;

  /**
   * Sets the label of the selectAll option
   *  @defaultValue 'All'
   */
  @Prop() selectAllLabel: string = 'All';

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: any | any[];

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged(newValue: any, oldValue: any) {
    if (_.isEqual(newValue, oldValue)) return;
    this.setValue();
    if (this.multiple && this.selectAll) {
      const newValues = Array.isArray(newValue) ? newValue : [];
      this.tkSelectAll.emit(this.isAllSelected(newValues));
    }
  }

  /**
   * Emitted when the value has changed.
   */
  @Event({ eventName: 'tk-change' }) tkChange!: EventEmitter<any>;

  /**
   * Emitted when the selectAll option is changed
   */
  @Event({ eventName: 'tk-select-all' }) tkSelectAll!: EventEmitter<boolean>;

  componentWillLoad(): void {
    this.hasEmptyDataSlot = !!this.el.querySelector('[slot="empty-data"]');
    if (this.isGrouped()) {
      this.innerOptions = this.options.flatMap(group => group[this.groupOptionsKey]);
    } else {
      this.innerOptions = this.options;
    }

    this.renderOptions = this.options?.length > 0 ? [...this.options] : [];
  }

  componentDidRender(): void {
    // multiple durumda chips li input çalıştığı için ve tk-input value olarak chips leri geri döndürdüğü için
    // tk-input'un içindeki inputa yazılan değerlerin filtering için çalışabilmesini sağlamak için yapılmıştır.
    if (this.readonly) {
      const nativeInput = this.inputRef?.querySelector('input');
      if (nativeInput) {
        nativeInput.setAttribute('readonly', 'true');
      }
    }
    if (this.multiple && this.editable) {
      this.nativeInputRef?.removeEventListener('input', this.boundRunFilterForMultiple);
      this.nativeInputRef?.addEventListener('input', this.boundRunFilterForMultiple);
    }
  }

  /**
   * Click outside handler implementation - called by the mixin
   */
  private closeHandler = (e: Event): void => {
    if (e.composedPath().includes(this.el)) {
      return;
    }
    this.isOpen = false;
  };

  componentDidLoad(): void {
    this.internals?.form?.addEventListener('reset', () => {
      this.handleFormReset();
    });

    this.nativeInputRef = this.inputRef.querySelector('input');

    this.clickOutsideMixin = new ClickOutsideMixin({
      referenceElement: this.el,
      handler: this.closeHandler,
      disabled: this.disabled || this.readonly || !this.isOpen,
    });

    addDialogScrollListener(this.el, this.closeHandler);

    if (this.allowCustomValue) {
      this.editable = true;
    }

    if (this.value) {
      this.setValue();
    }
  }

  componentDidUpdate() {
    this.nativeInputRef = this.inputRef.querySelector('input');

    // Update click outside mixin configuration based on current state
    this.clickOutsideMixin?.updateConfig({
      disabled: this.disabled || this.readonly || !this.isOpen,
    });

    if (this.isOpen) {
      if (this.inputRef && this.panelRef) {
        this.cleanup = autoUpdate(this.inputRef.querySelector('.tk-input'), this.panelRef, () => this.updatePosition(), {
          animationFrame: true,
        });
        if (this.value?.length > 0 && !this.isAllSelected(this.value)) {
          this.refSelectAll.indeterminate = true;
        }
      }
    } else {
      this.panelRef?.remove();
      this.cleanup && this.cleanup();
    }
  }

  private isGrouped(): boolean {
    return this.options?.length > 0 && this.options[0]?.[this.groupOptionsKey];
  }

  disconnectedCallback() {
    this.internals?.form?.removeEventListener('reset', this.handleFormReset.bind(this));
    removeDialogScrollListener(this.el);

    // Call mixin's disconnectedCallback for cleanup
    this.clickOutsideMixin?.disconnectedCallback();
  }

  formResetCallback() {
    this.handleFormReset();
  }

  private async runFilterForMultiple() {
    this.renderOptions = await this.filter(this.nativeInputRef.value, this.options);
  }

  private async defaultFilter(text: string, options: any[]) {
    if (!text) {
      return [...this.options];
    }

    if (this.isGrouped()) {
      return options
        .map(group => ({
          ...group,
          [this.groupOptionsKey]: group[this.groupOptionsKey].filter(option => this.getOptionLabel(option).toLowerCase().includes(text.toLowerCase())),
        }))
        .filter(group => group[this.groupOptionsKey].length > 0);
    } else {
      return options.filter(item => this.getOptionLabel(item).toLowerCase().indexOf(text.toLowerCase()) > -1);
    }
  }

  private updatePosition() {
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
                applyStyles(elements.floating, {
                  width: `${rects.reference.width}px`,
                });
              } else if (dropdownWidthMode !== 'auto' && dropdownWidthMode.length > 0) {
                applyStyles(elements.floating, {
                  width: dropdownWidthMode,
                });
              }
            },
          }),
        ],
      }).then(({ x, y }) => {
        applyStyles(this.panelRef, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
  }
  private isOptionSelected(valueArr: any[], optionValue: any): boolean {
    if (typeof optionValue === 'object' && !Array.isArray(optionValue) && optionValue !== null) {
      return valueArr.some(v => _.isEqual(v, optionValue));
    } else {
      return valueArr.includes(optionValue);
    }
  }

  private isAllSelected(valueArr?: any[]): boolean {
    const arr = Array.isArray(valueArr) ? valueArr : Array.isArray(this.value) ? this.value : [];
    const optionValues = this.innerOptions.map(opt => this.getOptionValue(opt));
    return optionValues.length > 0 && optionValues.every(val => this.isOptionSelected(arr, val));
  }

  private getOptionLabel(item: any): string {
    if (typeof item === 'object' && item !== null) {
      const label = getNestedValue(item, this.optionLabelKey);

      return label != null ? String(label) : '';
    }
    return item != null ? String(item) : '';
  }

  private getOptionValue(item: any): any {
    if (typeof item === 'object' && item !== null) {
      if (this.optionValueKey?.length > 0) {
        return getNestedValue(item, this.optionValueKey);
      } else {
        return item;
      }
    } else {
      return item;
    }
  }

  private getDisplayValueForMultiple(selectedItems: any[]): any[] {
    if (!this.visibleItemCount || selectedItems.length <= this.visibleItemCount) {
      return selectedItems;
    }

    // When allowCustomValue is true, prioritize predefined options over custom values
    if (this.allowCustomValue) {
      // Separate predefined options from custom values
      const predefinedItems = selectedItems.filter(item => {
        return this.innerOptions.some(opt => {
          if (this.optionValueKey) {
            return this.getOptionValue(opt) === this.getOptionValue(item);
          } else {
            return _.isEqual(opt, item);
          }
        });
      });

      const customItems = selectedItems.filter(item => {
        return !this.innerOptions.some(opt => {
          if (this.optionValueKey) {
            return this.getOptionValue(opt) === this.getOptionValue(item);
          } else {
            return _.isEqual(opt, item);
          }
        });
      });

      // Take predefined items first, then custom items if there's room
      const visibleItems = [...predefinedItems.slice(0, this.visibleItemCount), ...customItems.slice(0, Math.max(0, this.visibleItemCount - predefinedItems.length))];

      if (selectedItems.length > this.visibleItemCount) {
        const remainingCount = selectedItems.length - this.visibleItemCount;
        const othersIndicator = {
          __isOthersIndicator: true,
          label: `+${remainingCount}`,
          removable: false,
        };
        return [...visibleItems, othersIndicator];
      }

      return visibleItems;
    }

    // Original logic for when allowCustomValue is false
    const visibleItems = selectedItems.slice(0, this.visibleItemCount);
    const remainingCount = selectedItems.length - this.visibleItemCount;
    const othersIndicator = {
      __isOthersIndicator: true,
      label: `+${remainingCount}`,
      removable: false,
    };

    return [...visibleItems, othersIndicator];
  }

  private async setRenderOptions(value) {
    this.renderOptions = await this.filter(value, this.options);
  }

  private getSelectedItem() {
    if (this.renderOptions?.length > 0) {
      let searchOptions = this.renderOptions;
      if (this.isGrouped()) {
        searchOptions = this.renderOptions.flatMap(group => group[this.groupOptionsKey] || []);
      }

      if (typeof this.value != 'object' && searchOptions?.every(item => typeof item != 'object')) {
        // value ve her bir option object değilse. Yani bu primitive tiplerle çalışan bir selectbox ise

        return searchOptions.find(item => item == this.value);
      } else if (searchOptions?.every(item => typeof item === 'object')) {
        if (this.optionValueKey?.length > 0) {
          return searchOptions.find(item => this.getOptionValue(item) == this.value);
        } else {
          return searchOptions.find(item => _.isEqual(item, this.value));
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  private setValue() {
    if (!this.inputRef) return;

    // Handle multiple selection case
    if (this.multiple) {
      // Ensure value is always an array
      const currentValue = Array.isArray(this.value) ? this.value : [];

      this.selectedItem = currentValue
        .map(val => {
          let found;
          if (this.optionValueKey) {
            found = this.innerOptions.find(opt => this.getOptionValue(opt) === val);
          } else {
            found = this.innerOptions.find(opt => _.isEqual(opt, val));
          }
          if (found !== undefined) return found;
          if (this.allowCustomValue) return val;
          return null;
        })
        .filter(val => val !== null && val !== undefined);

      // Apply visible item count logic for display
      const displayValue = this.getDisplayValueForMultiple(this.selectedItem);
      this.inputRef.value = displayValue;
      if (currentValue.length > 0 && !this.isAllSelected(currentValue)) {
        this.refSelectAll.indeterminate = true;
      }
      return;
    }

    // Handle single selection case
    if (this.editable && this.allowCustomValue) {
      // For editable with custom values, show the value directly
      this.inputRef.value = this.value ? this.getOptionLabel(this.value) : null;
      return;
    }

    // Find the selected item based on value type
    if (typeof this.value !== 'object' && this.innerOptions?.every(item => typeof item !== 'object')) {
      // Handle primitive values
      this.selectedItem = this.innerOptions?.find(item => item === this.value);
    } else if (this.optionValueKey?.length > 0) {
      // Handle object values with optionValueKey
      this.selectedItem = this.innerOptions?.find(item => this.getOptionValue(item) === this.value);
    } else {
      // Handle object values without optionValueKey
      this.selectedItem = this.innerOptions?.find(item => _.isEqual(item, this.value));
    }

    // Set input value based on selection state
    if (this.selectedItem) {
      if (this.multiple) {
        this.inputRef.value = this.selectedItem;
      } else {
        const label = this.getOptionLabel(this.selectedItem);
        this.inputRef.value = label;
      }
    } else {
      if (this.filter) {
        this.selectedItem = this.getSelectedItem();
        if (this.selectedItem) {
          if (this.multiple) {
            this.inputRef.value = this.selectedItem;
          } else {
            this.inputRef.value = this.getOptionLabel(this.selectedItem);
          }
        } else {
          this.inputRef.value = null;
        }
      } else {
        this.inputRef.value = null;
      }
    }
  }

  private scrollItem(item: HTMLDivElement) {
    item.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }

  private handleFormReset() {
    this.value = null;
    this.tkChange.emit(null);
  }

  private async handleSelectAllClick() {
    if (this.readonly) return;
    this.isItemClickFlag = true;
    if (this.multiple) {
      let tmpValue;
      const checking = this.isAllSelected();
      if (checking) {
        // Deselect all
        tmpValue = [];
        this.tkSelectAll.emit(false);
      } else {
        //optionsdaki değerleri almak için
        const optionValues = this.innerOptions.map(opt => this.getOptionValue(opt));
        // allowcustom trueyken optionsda olmayan valueların eklenmesi için
        const customValues = Array.isArray(this.value) ? this.value?.filter(val => !this.isOptionSelected(optionValues, val)) : [];
        // Select all (optionValue + custom values)
        tmpValue = [...optionValues, ...customValues];
        this.tkSelectAll.emit(true);
      }
      // filtreleme ardında yapılan seçimden sonra filtrelem için kullandığımız tk-input içerisindeki native inputu temizleme işlemi
      if (this.multiple && this.editable) {
        this.nativeInputRef.value = null;
        this.renderOptions = await this.filter(null, this.options);
      }
      // Prevent adding 'all' item to value
      this.inputRef.value = [...tmpValue];
      this.value = [...tmpValue];
      this.tkChange.emit([...tmpValue]);
    }
  }

  private async handleItemClick(item) {
    if (this.readonly) return;
    this.isItemClickFlag = true;
    if (this.multiple) {
      const tmpValue = Array.isArray(this.value) ? [...this.value] : [];

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

  private async handleInputChange(value) {
    if (this.multiple) {
      if (value == null) {
        this.value = [];
      } else {
        const incomingChips = Array.isArray(value) ? value : [value];

        // Filter out the "others" indicator
        const validChips = incomingChips.filter(val => !(typeof val === 'object' && val !== null && val.__isOthersIndicator));

        // When visibleItemCount is active and we have reordered display, we need to handle removals carefully
        if (this.visibleItemCount && this.selectedItem && this.selectedItem.length > this.visibleItemCount) {
          // Get the current display value (what the user sees)
          const currentDisplayValue = this.getDisplayValueForMultiple(this.selectedItem);
          const currentValidDisplayChips = currentDisplayValue.filter(val => !(typeof val === 'object' && val !== null && val.__isOthersIndicator));

          // Find which chip was removed by comparing the arrays
          const removedChip = currentValidDisplayChips.find(
            displayChip =>
              !validChips.some(validChip => {
                if (this.optionValueKey && typeof displayChip === 'object' && typeof validChip === 'object') {
                  return this.getOptionValue(displayChip) === this.getOptionValue(validChip);
                }
                return _.isEqual(displayChip, validChip);
              }),
          );

          if (removedChip) {
            // Remove the chip from the actual value array (not the display array)
            const currentValue = Array.isArray(this.value) ? [...this.value] : [];
            const removedValue = this.optionValueKey && typeof removedChip === 'object' ? this.getOptionValue(removedChip) : removedChip;

            const updatedValue = currentValue.filter(val => {
              if (this.optionValueKey && typeof removedChip === 'object') {
                return val !== removedValue;
              }
              return !_.isEqual(val, removedValue);
            });

            this.value = updatedValue;
            this.tkChange.emit(this.value);
            return;
          }
        }

        // Normal case: no visibleItemCount or no reordering needed
        const resolvedValues = validChips.map(val => {
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

  private handleInputClick() {
    if (!this.isOpen && !this.disabled) {
      this.hasFocus = true;
      this.isOpen = true;
    }
  }

  private async handleInputBlur() {
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
        this.inputRef.value = null;
        this.tkChange.emit(null);
        this.renderOptions = await this.filter(null, this.options);
      } else {
        this.isItemClickFlag = false;
      }
    }
  }

  private async handleInputKeydown(e) {
    // Prevent default behavior for accessibility keys
    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
      e.preventDefault();
    }

    // Handle keyboard shortcuts when dropdown is closed
    if (!this.isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        // Enter, Arrow Up/Down: Open dropdown
        if (!this.disabled && !this.readonly) {
          this.hasFocus = true;
          this.isOpen = true;
        }
        return;
      }
    }

    // Handle keyboard shortcuts when dropdown is open
    if (this.isOpen) {
      if (e.key === 'Escape') {
        // Escape: Close dropdown without selecting
        this.isOpen = false;
        this.hasFocus = false;
        return;
      }
      if (e.key === 'ArrowDown') {
        const activeItem: HTMLDivElement = this.el.querySelector('.dropdown-item[data-active="true"]');
        const activeIndex = Number(activeItem?.getAttribute('data-option-index'));
        if (activeItem) {
          const newActiveItem: HTMLDivElement = this.el.querySelector(`.dropdown-item[data-option-index='${activeIndex + 1}']`);
          if (newActiveItem) {
            activeItem.setAttribute('data-active', 'false');
            newActiveItem.setAttribute('data-active', 'true');
            this.scrollItem(newActiveItem);
          }
        } else {
          const firstItem: HTMLDivElement = this.el.querySelector(`.dropdown-item[data-option-index='0']`);
          if (firstItem) {
            firstItem.setAttribute('data-active', 'true');
            this.scrollItem(firstItem);
          }
        }
        return;
      }

      if (e.key === 'ArrowUp') {
        const activeItem: HTMLDivElement = this.el.querySelector('.dropdown-item[data-active="true"]');
        const activeIndex = Number(activeItem?.getAttribute('data-option-index'));
        if (activeItem) {
          const newActiveItem: HTMLDivElement = this.el.querySelector(`.dropdown-item[data-option-index='${activeIndex - 1}']`);
          if (newActiveItem) {
            activeItem.setAttribute('data-active', 'false');
            newActiveItem.setAttribute('data-active', 'true');
            this.scrollItem(newActiveItem);
          }
        } else {
          const firstItem: HTMLDivElement = this.el.querySelector(`.dropdown-item[data-option-index='0']`);
          if (firstItem) {
            firstItem.setAttribute('data-active', 'true');
            this.scrollItem(firstItem);
          }
        }
        return;
      }

      if (e.key === 'Enter') {
        const activeItem: HTMLDivElement = this.el.querySelector('.dropdown-item[data-active="true"]');
        if (this.multiple && this.editable && this.allowCustomValue) {
          this.nativeInputRef.dispatchEvent(new InputEvent('input', { bubbles: true }));
        }
        if (activeItem) {
          activeItem.click();
        }
        return;
      }
    }

    // Handle Tab key
    if (e.key === 'Tab') {
      this.hasFocus = false;
      this.isOpen = false;
    }
  }

  private handleInputClearClick() {
    this.value = null;
    this.tkChange.emit(null);
    this.selectAll && this.multiple && this.isAllSelected() && this.tkSelectAll.emit(false);
  }

  private createOptionItem(options: any[], startIndex: number = 0) {
    return options?.map((item, index) => {
      let itemProps = {};
      let children;
      const checking = _.some(this.value, itemValue => _.isEqual(itemValue, this.getOptionValue(item)));
      if (this.multiple) {
        if (this.optionHtml != undefined) {
          children = (
            <Fragment>
              <tk-checkbox value={checking} onTk-change={e => e.stopPropagation()} onClick={e => e.preventDefault()}></tk-checkbox>
              <div class="multiple-option-content" innerHTML={this.optionHtml(item)}></div>
            </Fragment>
          );
        } else {
          children = (
            <Fragment>
              <tk-checkbox value={checking} onTk-change={e => e.stopPropagation()} onClick={e => e.preventDefault()}></tk-checkbox>
              <div>{this.getOptionLabel(item)}</div>
            </Fragment>
          );
        }
      } else {
        if (this.optionHtml != undefined) {
          itemProps = { innerHTML: this.optionHtml(item) };
        } else {
          itemProps = { innerHTML: this.getOptionLabel(item) };
        }
      }

      return (
        <div
          class={classNames('dropdown-item', { multiple: this.multiple })}
          data-option-index={startIndex + index}
          data-selected={this.multiple && checking ? 'true' : this.value == item ? 'true' : 'false'}
          onClick={() => this.handleItemClick(item)}
          {...itemProps}
        >
          {children}
        </div>
      );
    });
  }

  private createSelectAllOption() {
    if (this.selectAll && this.multiple) {
      const checking = this.isAllSelected();
      return (
        <div>
          <div
            class={classNames('dropdown-item', { multiple: this.multiple })}
            data-selected={this.multiple && checking ? 'true' : 'false'}
            onClick={() => this.handleSelectAllClick()}
            data-option-index="-1"
          >
            <tk-checkbox
              ref={el => (this.refSelectAll = el)}
              indeterminate={!this.isAllSelected() && this.selectedItem?.length > 0}
              value={checking}
              onTk-change={e => e.stopPropagation()}
              onClick={e => e.preventDefault()}
            ></tk-checkbox>
            <div>{this.selectAllLabel}</div>
          </div>
          <tk-divider my={1} style={{ margin: '4px' }} />
        </div>
      );
    }
  }

  private createOptions() {
    if (this.isGrouped()) {
      let currentIndex = 0;
      return this.renderOptions.map(group => {
        const groupItems = this.createOptionItem(group[this.groupOptionsKey], currentIndex);
        currentIndex += group[this.groupOptionsKey]?.length || 0;
        return (
          <div class="dropdown-group">
            <div class="dropdown-group-label">
              <label>{group[this.groupNameKey]}</label>
              <div class="line"></div>
            </div>
            {groupItems}
          </div>
        );
      });
    } else {
      return this.createOptionItem(this.renderOptions);
    }
  }

  private renderInput() {
    return (
      <tk-input
        ref={el => (this.inputRef = el as HTMLTkInputElement)}
        class={classNames('tk-select-input', {
          'editable-select': this.editable,
          'tk-table-input': this.el.classList.contains('tk-table-select'),
          'multiple-select': this.multiple,
          'allow-custom-value-select': this.allowCustomValue,
        })}
        label={this.label}
        size={this.size}
        showAsterisk={this.showAsterisk}
        hint={this.hint}
        placeholder={this.value?.length > 0 ? '' : this.placeholder}
        invalid={this.invalid}
        error={this.error}
        icon={{ left: this.icon, right: this.isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
        mode={this.multiple ? 'chips' : 'text'}
        chipLabelKey={this.optionLabelKey}
        readonly={this.readonly}
        disabled={this.disabled}
        clearable={this.clearable}
        chipOptions={this.chipOptions}
        aria-describedby="dropdown"
        aria-expanded={!!this.isOpen}
        onClick={() => this.handleInputClick()}
        onTk-change={e => {
          e.stopPropagation();
          this.handleInputChange(e.detail);
        }}
        onTk-blur={() => setTimeout(() => this.handleInputBlur(), 150)}
        onTk-clear-click={() => this.handleInputClearClick()}
        onKeyDown={e => this.handleInputKeydown(e)}
      ></tk-input>
    );
  }

  private renderDropdown() {
    if (!this.isOpen) return null;
    return (
      <div class="tk-select-panel" ref={el => (this.panelRef = el as HTMLDivElement)} data-tk-select-id={this.uniqueId}>
        <div class="dropdown-item-holder">
          {this.loading ? (
            <tk-spinner size={this.size}></tk-spinner>
          ) : this.renderOptions?.length > 0 ? (
            <Fragment>
              {this.panelTopHtml && (
                <div
                  class="dropdown-item-top"
                  ref={el => {
                    if (el) {
                      const htmlContent = this.panelTopHtml();
                      if (htmlContent instanceof HTMLElement) {
                        el.innerHTML = '';
                        el.appendChild(htmlContent);
                      } else {
                        el.innerHTML = htmlContent;
                      }
                    }
                  }}
                ></div>
              )}

              {this.createSelectAllOption()}
              {this.createOptions()}
            </Fragment>
          ) : this.hasEmptyDataSlot ? (
            <slot name="empty-data"></slot>
          ) : (
            this.emptyMessage
          )}
        </div>
      </div>
    );
  }

  render() {
    const rootClasses = classNames('tk-select-container', this.size, { focus: this.hasFocus });

    return (
      <div aria-readonly={this.readonly} aria-disabled={this.disabled} aria-invalid={this.invalid} class={rootClasses}>
        {this.renderInput()}
        {this.renderDropdown()}
      </div>
    );
  }
}
