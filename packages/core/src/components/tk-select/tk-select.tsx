import { AttachInternals, Component, ComponentInterface, Element, Event, EventEmitter, Fragment, Method, Prop, State, Watch, h } from '@stencil/core';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { isEqual, some, remove } from 'lodash-es';
import { IChipOptions } from '../tk-chips/types';
import { IIconOptions } from '../../global/interfaces/IIconOptions';
import { getNestedValue } from '../../utils/object-utils';
import { applyStyles } from '../../utils/style-utils';
import { ClickOutsideMixin } from '../../utils/clickoutside-mixin';
import { floatingElementAutoUpdate } from '../../utils/position-utils';

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
  private flatOptions = [];

  @Element() el!: HTMLTkSelectElement;

  @AttachInternals() internals: ElementInternals;

  constructor() {
    this.boundRunFilterForMultiple = this.runFilterForMultiple.bind(this);
  }

  @State() renderOptions: any[];
  @State() isOpen: boolean = false;
  @Watch('isOpen')
  isOpenChanged(newValue: boolean) {
    if (newValue) this.tkOpen.emit();
    else this.tkClose.emit();
  }

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
  @Watch('disabled')
  protected disabledChanged(newValue: boolean) {
    if (newValue) this.isOpen = false;
  }

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
    if (isEqual(newValue, oldValue)) return;

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
   * A function to determine whether an option should be disabled.
   */
  @Prop() optionDisabled: Function;

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: any | any[];

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged(newValue: any, oldValue: any) {
    if (isEqual(newValue, oldValue)) return;
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

  /**
   * Emitted when the select is opened
   */
  @Event({ eventName: 'tk-open', bubbles: false }) tkOpen!: EventEmitter<void>;

  /**
   * Emitted when the select is closed
   */
  @Event({ eventName: 'tk-close', bubbles: false }) tkClose!: EventEmitter<void>;

  componentWillLoad(): void {
    this.hasEmptyDataSlot = !!this.el.querySelector('[slot="empty-data"]');
    this.setFlatOptions();

    this.renderOptions = this.options?.length > 0 ? [...this.options] : [];
  }

  componentDidLoad(): void {
    this.internals?.form?.addEventListener('reset', () => {
      this.handleFormReset();
    });

    this.nativeInputRef = this.inputRef.querySelector('input');

    const tkInputArea = this.inputRef.querySelector('.tk-input') as HTMLElement;
    this.clickOutsideMixin = new ClickOutsideMixin({
      referenceElement: tkInputArea ?? this.el,
      handler: this.closeHandler,
      disabled: this.disabled || this.readonly || !this.isOpen,
    });

    if (this.allowCustomValue) {
      this.editable = true;
    }

    if (this.value !== undefined && this.value !== null) {
      this.setValue();
    }
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

  componentDidUpdate() {
    this.nativeInputRef = this.inputRef.querySelector('input');

    // Update click outside mixin configuration based on current state
    this.clickOutsideMixin?.updateConfig({
      disabled: this.disabled || this.readonly || !this.isOpen,
      ignoredElements: this.panelRef ? [this.panelRef] : [],
    });

    if (this.isOpen) {
      if (this.inputRef && this.panelRef) {
        // Clean up old floating UI listeners before setting up new ones
        this.cleanup?.();
        this.updatePosition();
        this.setFlatOptions();
        // Panel açıldığında ilk itemin active olmasını sağlamak için
        const activeItem = this.el.querySelector('.dropdown-item[data-active]') as HTMLDivElement;
        if (!activeItem && !this.allowCustomValue) {
          const firstEnabledIndex = this.getNextEnabledItemIndex(-1, 'down');
          if (firstEnabledIndex !== null) {
            const firstItem = this.el.querySelector(`.dropdown-item[data-option-index="${firstEnabledIndex}"]`) as HTMLDivElement;
            firstItem?.setAttribute('data-active', 'true');
          }
        }
      }
    } else {
      // Remove floating UI listeners when select closes
      this.cleanup?.();
      // Clear reference to allow garbage collection
      this.cleanup = null;
      this.panelRef?.remove();
    }
  }

  disconnectedCallback() {
    // Clean up floating UI listeners on component unmount
    this.cleanup?.();
    // Clear reference to allow garbage collection
    this.cleanup = null;
    this.internals?.form?.removeEventListener('reset', this.handleFormReset.bind(this));

    // Call mixin's disconnectedCallback for cleanup
    this.clickOutsideMixin?.disconnectedCallback();
  }

  formResetCallback() {
    this.handleFormReset();
  }

  /**
   * Closes the select dropdown;
   */
  @Method()
  async close() {
    this.isOpen = false;
  }

  private updatePosition() {
    const dropdownWidthMode = this.dropdownWidthMode;
    const tkInputRootEl = this.inputRef.querySelector('.tk-input') as HTMLElement;
    this.cleanup = floatingElementAutoUpdate(tkInputRootEl, this.panelRef, undefined, {
      placement: 'bottom-start',
      size: {
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
      },
    });
  }

  /**
   * Click outside handler implementation - called by the mixin
   */
  private closeHandler = (): void => {
    this.isOpen = false;
  };

  private isGrouped(): boolean {
    return this.options?.length > 0 && this.options[0]?.[this.groupOptionsKey];
  }

  private setFlatOptions(): void {
    if (this.isGrouped()) {
      this.flatOptions = this.options.flatMap(group => group[this.groupOptionsKey]);
    } else {
      this.flatOptions = this.options;
    }
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

  private isOptionSelected(valueArr: any[], optionValue: any): boolean {
    if (typeof optionValue === 'object' && !Array.isArray(optionValue) && optionValue !== null) {
      return valueArr.some(v => isEqual(v, optionValue));
    } else {
      return valueArr.includes(optionValue);
    }
  }

  //edited to omit disabled options from select all check
  private isAllSelected(valueArr?: any[]): boolean {
    let arr;
    if (Array.isArray(valueArr)) {
      arr = valueArr;
    } else if (Array.isArray(this.value?.filter?.(item => !this.optionDisabled?.(item)))) {
      arr = this.value;
    } else {
      arr = [];
    }
    const optionValues = this.flatOptions.filter(item => !this.optionDisabled?.(item)).map(opt => this.getOptionValue(opt));
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
        return this.flatOptions.some(opt => {
          if (this.optionValueKey) {
            return this.getOptionValue(opt) === this.getOptionValue(item);
          } else {
            return isEqual(opt, item);
          }
        });
      });

      const customItems = selectedItems.filter(item => {
        return !this.flatOptions.some(opt => {
          if (this.optionValueKey) {
            return this.getOptionValue(opt) === this.getOptionValue(item);
          } else {
            return isEqual(opt, item);
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
          return searchOptions.find(item => isEqual(item, this.value));
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

    this.setFlatOptions();

    // Handle multiple selection case
    if (this.multiple) {
      // Ensure value is always an array
      const currentValue = Array.isArray(this.value) ? this.value : [];

      this.selectedItem = currentValue
        .map(val => {
          let found;
          if (this.optionValueKey) {
            found = this.flatOptions.find(opt => this.getOptionValue(opt) === val);
          } else {
            found = this.flatOptions.find(opt => isEqual(opt, val));
          }
          if (found !== undefined) return found;
          if (this.allowCustomValue) return val;
          return null;
        })
        .filter(val => val !== null && val !== undefined);

      // Apply visible item count logic for display
      const displayValue = this.getDisplayValueForMultiple(this.selectedItem);
      this.inputRef.value = displayValue;
      return;
    }

    // Handle single selection case
    if (this.editable && this.allowCustomValue) {
      // For editable with custom values, show the value directly
      if (this.value !== undefined && this.value !== null) {
        this.inputRef.value = this.getOptionLabel(this.value);
      } else {
        this.inputRef.value = null;
      }
      return;
    }

    // Find the selected item based on value type
    if (typeof this.value !== 'object' && this.flatOptions?.every(item => typeof item !== 'object')) {
      // Handle primitive values
      this.selectedItem = this.flatOptions?.find(item => item === this.value);
    } else if (this.optionValueKey?.length > 0) {
      // Handle object values with optionValueKey
      this.selectedItem = this.flatOptions?.find(item => this.getOptionValue(item) === this.value);
    } else {
      // Handle object values without optionValueKey
      this.selectedItem = this.flatOptions?.find(item => isEqual(item, this.value));
    }

    // Set input value based on selection state
    if (this.selectedItem !== null && this.selectedItem !== undefined) {
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

  private getNextEnabledItemIndex(currentIndex: number, direction: 'up' | 'down', visited: number = 0): number | null {
    const totalItems = this.flatOptions.length;
    const maxSteps = this.selectAll && this.multiple ? totalItems + 1 : totalItems;

    if (visited >= maxSteps) return null;

    const startIndex = this.selectAll && this.multiple ? -1 : 0;
    const endIndex = totalItems - 1;

    let nextIndex = direction === 'down' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex > endIndex) {
      nextIndex = startIndex;
    } else if (nextIndex < startIndex) {
      nextIndex = endIndex;
    }
    if (nextIndex === -1 && this.selectAll && this.multiple) {
      return -1;
    }

    const item = this.flatOptions[nextIndex];
    const isDisabled = this.optionDisabled ? this.optionDisabled(item) : false;
    if (isDisabled) return this.getNextEnabledItemIndex(nextIndex, direction, visited + 1);
    else return nextIndex;
  }

  private navigateToItem(direction: 'up' | 'down') {
    const activeItem = this.el.querySelector('.dropdown-item[data-active="true"]') as HTMLDivElement;
    const activeIndex = activeItem ? Number(activeItem.getAttribute('data-option-index')) : null;

    // activeindex varsa o indexten başlayarak yönüne göre sonraki enabled itemi bul, yoksa aşağı yönünde ilk enabled itemi bul
    const nextIndex = activeIndex !== null ? this.getNextEnabledItemIndex(activeIndex, direction) : this.getNextEnabledItemIndex(-1, 'down');

    if (nextIndex !== null) {
      const newActiveItem = this.el.querySelector(`.dropdown-item[data-option-index='${nextIndex}']`) as HTMLDivElement;
      if (newActiveItem) {
        activeItem?.setAttribute('data-active', 'false');
        newActiveItem.setAttribute('data-active', 'true');
        this.scrollItem(newActiveItem);
      }
    }
  }

  private handleFormReset() {
    if (this.multiple && this.optionDisabled && Array.isArray(this.value)) {
      this.value = this.value.filter(item => this.optionDisabled(item));
    } else {
      this.value = null;
    }
    this.tkChange.emit(this.value);
  }

  private async handleSelectAllClick() {
    if (this.readonly) return;
    if (this.multiple) {
      let tmpValue;
      const checking = this.isAllSelected();
      if (checking) {
        // Deselect all
        tmpValue = this.value.filter(item => this.optionDisabled?.(item));
        this.tkSelectAll.emit(false);
      } else {
        //optionsdaki değerleri almak için
        const optionValues = this.flatOptions.filter(item => !this.optionDisabled?.(item)).map(opt => this.getOptionValue(opt));
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
    this.isItemClickFlag = false;
  }

  private async handleItemClick(item) {
    if (this.readonly || this.optionDisabled?.(item)) return;
    if (this.multiple) {
      const tmpValue = Array.isArray(this.value) ? [...this.value] : [];

      const tmpItem = this.getOptionValue(item);

      if (some(tmpValue, itemValue => isEqual(itemValue, this.getOptionValue(tmpItem)))) {
        // tıklanan item zaten seçili ise seçimi kaldırır
        remove(tmpValue, itemValue => isEqual(itemValue, tmpItem));
      } else {
        // tıklanan item seçili değilse ekler
        tmpValue.push(tmpItem);
      }

      // filtreleme ardında yapılan seçimden sonra filtrelem için kullandığımız tk-input içerisindeki native inputu temizleme işlemi
      if (this.multiple && this.editable) {
        this.nativeInputRef.value = null;
      }

      this.inputRef.value = [...tmpValue];
      this.value = [...tmpValue];
      this.tkChange.emit([...tmpValue]);
    } else {
      this.value = this.getOptionValue(item);
      this.tkChange.emit(this.getOptionValue(item));
      this.isOpen = false;
    }

    // seçim yapıldıktan sonra eğer filtreleme yapılarak bir seçim yapıldıysa eski filtreleme sonuçlarının tutulmaması ve tüm listesinin optionlarda render edilebilmesi için yapılmıştır.
    this.renderOptions = await this.filter(null, this.options);
    this.isItemClickFlag = false;
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
                return isEqual(displayChip, validChip);
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
              return !isEqual(val, removedValue);
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
      if (value === '') {
        this.value = null;
        this.tkChange.emit(null);
      }
    }
  }

  private handleInputClick(e) {
    if (this.disabled || this.readonly) return;

    const path = e.composedPath();
    const isClearButton = path.some(el => el.classList?.contains('tk-input-clear-button'));
    const isChevron = path.some((el: any) => el.tagName === 'TK-ICON' && (el.icon === 'keyboard_arrow_up' || el.icon === 'keyboard_arrow_down'));
    const isChipsClearButton = path.some((el: any) => el.classList?.contains('tk-chips-clear-button'));
    const isInputElement = path.some((el: Element) => (el as Element).classList?.contains('tk-input'));

    if (isClearButton || isChipsClearButton) return;

    if (isChevron) {
      this.isOpen = !this.isOpen;
      return;
    }

    if (isInputElement && !this.isOpen) {
      this.isOpen = true;
    }
  }

  private async handleInputBlur() {
    // item click'den geldiğinde blur çalıştırma
    if (this.isItemClickFlag) {
      this.isItemClickFlag = false;
      return;
    }

    if (!this.editable) return;

    // filtreleme ardında yapılan seçimden sonra filtrelem için kullandığımız tk-input içerisindeki native inputu temizleme işlemi
    if (this.multiple) {
      this.nativeInputRef.value = null;
    }

    if (!this.multiple && !this.allowCustomValue) {
      const selectedItem = this.getSelectedItem();
      const inputValue = this.nativeInputRef.value;

      if (!inputValue) return;

      // custom value'ya izin verilmiyor ise inputu boşalt
      if (
        // seçili item yok ise ama inutda bir değer var ise
        (!selectedItem && inputValue) ||
        // seçili item var ise ama inputta yazar değer seçili item ile uyuşmuyor ise
        (selectedItem && this.getOptionLabel(selectedItem) != inputValue)
      ) {
        this.value = null;
        this.inputRef.value = null;
        this.tkChange.emit(null);
      }
    }

    this.renderOptions = await this.filter(null, this.options);
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
        return;
      }
      if (e.key === 'ArrowDown') {
        this.navigateToItem('down');
        return;
      }

      if (e.key === 'ArrowUp') {
        this.navigateToItem('up');
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
      this.isOpen = false;
    }
  }

  private handleInputClearClick() {
    if (this.multiple && this.optionDisabled && Array.isArray(this.value)) {
      this.value = this.value.filter(item => this.optionDisabled(item));
    } else {
      this.value = null;
    }
    this.tkChange.emit(this.value);
    this.selectAll && this.multiple && this.isAllSelected() && this.tkSelectAll.emit(false);
  }

  private createOptionItem(options: any[], startIndex: number = 0) {
    return options?.map((item, index) => {
      const isDisabled = this.optionDisabled ? this.optionDisabled?.(item) : false;
      let itemProps = {};
      let children;
      const checking = some(this.value, itemValue => isEqual(itemValue, this.getOptionValue(item)));
      if (this.multiple) {
        if (this.optionHtml != undefined) {
          children = (
            <Fragment>
              <tk-checkbox value={checking} disabled={isDisabled} onTk-change={e => e.stopPropagation()} onClick={e => e.preventDefault()}></tk-checkbox>
              <div class="multiple-option-content" innerHTML={this.optionHtml(item)}></div>
            </Fragment>
          );
        } else {
          children = (
            <Fragment>
              <tk-checkbox value={checking} disabled={isDisabled} onTk-change={e => e.stopPropagation()} onClick={e => e.preventDefault()}></tk-checkbox>
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
          class={classNames('dropdown-item', { multiple: this.multiple }, { disabled: isDisabled })}
          data-option-index={startIndex + index}
          data-selected={this.multiple && checking ? 'true' : this.value === this.getOptionValue(item) ? 'true' : 'false'}
          onPointerDown={() => (this.isItemClickFlag = true)}
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
      const isIndeterminate = !this.isAllSelected() && this.value?.length > 0;
      const checking = this.isAllSelected();
      return (
        <div>
          <div
            class={classNames('dropdown-item', { multiple: this.multiple })}
            data-selected={this.multiple && checking ? 'true' : 'false'}
            onPointerDown={() => (this.isItemClickFlag = true)}
            onClick={() => this.handleSelectAllClick()}
            data-option-index="-1"
          >
            <tk-checkbox
              indeterminate={isIndeterminate}
              value={isIndeterminate ? null : checking}
              onTk-change={e => e.stopPropagation()}
              onClick={e => e.preventDefault()}
            ></tk-checkbox>
            <div>{this.selectAllLabel}</div>
          </div>
          <tk-divider my={1} style={{ margin: '6px 4px 0px' }} />
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
          'readonly-select': this.readonly,
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
        loading={this.loading}
        clearable={this.clearable}
        chipOptions={this.chipOptions}
        chipDisabled={this.optionDisabled}
        aria-describedby="dropdown"
        aria-expanded={!!this.isOpen}
        onClick={e => this.handleInputClick(e)}
        onTk-change={e => {
          e.stopPropagation();
          this.handleInputChange(e.detail);
        }}
        onTk-blur={() => this.handleInputBlur()}
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
          ) : (
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
              {this.renderOptions?.length > 0 ? (
                <Fragment>
                  {this.createSelectAllOption()}
                  {this.createOptions()}
                </Fragment>
              ) : this.hasEmptyDataSlot ? (
                <slot name="empty-data"></slot>
              ) : (
                this.emptyMessage
              )}
            </Fragment>
          )}
        </div>
      </div>
    );
  }

  render() {
    const rootClasses = classNames('tk-select-container', this.size);

    return (
      <div aria-readonly={this.readonly} aria-disabled={this.disabled} aria-invalid={this.invalid} class={rootClasses}>
        {this.renderInput()}
        {this.renderDropdown()}
      </div>
    );
  }
}
