import { Component, h, Prop, State, Event, EventEmitter, Element, Watch, Method, Fragment, ComponentInterface } from '@stencil/core';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { HSVA, parseColorToHsva, hsvaToCss, hsvaToHex, hsvaToRgb, rgbToHsva } from './color-utils';
import { ClickOutsideMixin } from '../../utils/clickoutside-mixin';
import { floatingElementAutoUpdate } from '../../utils/position-utils';
import { getDataTestidAttribute } from '../../utils/test-id-utils';

declare global {
  interface Window {
    EyeDropper?: {
      new (): { open: () => Promise<{ sRGBHex: string }> };
    };
  }
}

/**
 * The `TkColorPicker` component provides a color selection interface with various input formats.
 * It supports HEX and RGB color formats with an optional alpha channel.
 * @slot header - Custom header template (replaces default header completely).
 * @slot header-actions - Custom actions template for header (replaces close button).
 * @slot footer - Custom footer template (replaces default footer container).
 * @slot footer-actions - Custom actions template for footer layout with styled container.
 * @react `import { TkColorPicker } from '@takeoff-ui/react'`
 * @vue `import { TkColorPicker } from '@takeoff-ui/vue'`
 * @angular `import { TkColorPicker } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-color-picker',
  styleUrl: 'tk-color-picker.scss',
  shadow: true,
})
export class TkColorPicker implements ComponentInterface {
  @Element() el: HTMLTkColorPickerElement;

  private uniqueId = uuidv4();
  private inputRef?: HTMLTkInputElement;
  private panelRef?: HTMLDivElement;
  private cleanup;
  private isDragging = false;
  private currentDragHandler?: (e: MouseEvent) => void;
  private tempInputVal: string | null = null;
  private saturationAreaRef?: HTMLElement;
  private hueSliderRef?: HTMLElement;
  private alphaSliderRef?: HTMLElement;
  private pendingValue: HSVA | null = null;
  private clickOutsideMixin?: ClickOutsideMixin;

  @State() isOpen: boolean = false;
  @Watch('isOpen')
  isOpenChanged(newVal: boolean) {
    if (newVal) {
      this.tkOpen.emit();
    } else {
      this.tkClose.emit();
    }
  }
  @State() internalHSVA: HSVA = { h: 0, s: 0, v: 0, a: 1 };
  @State() currentFormat: 'hex' | 'rgba' = 'hex';
  @State() hasHeaderSlot: boolean = false;
  @State() hasHeaderActionsSlot: boolean = false;
  @State() hasFooterSlot: boolean = false;
  @State() hasFooterActionsSlot: boolean = false;
  @State() triggerInputValue: string = '';
  @State() isTriggerInputFocused: boolean = false;

  /**
   * The current color value (supports HEX and RGB formats)
   */
  @Prop({ mutable: true }) value: string = '';
  @Watch('value')
  valueChanged(newVal: string) {
    if (this.isDragging) return;
    this.internalHSVA = parseColorToHsva(newVal);
  }

  /**
   * Label text displayed above the trigger input
   */
  @Prop() label: string;

  /**
   * Title displayed in the panel header
   * @defaultValue 'Color Picker'
   */
  @Prop() header: string;

  /**
   * Displays a red asterisk (*) next to the label for visual emphasis.
   * @defaultValue false
   */
  @Prop() showAsterisk: boolean = false;

  /**
   * If `true`, the user cannot modify the value.
   * @defaultValue false
   */
  @Prop() readonly: boolean = false;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string;

  /**
   * Indicates whether the input is in an invalid state
   * @defaultValue false
   */
  @Prop() invalid: boolean = false;

  /**
   * This is the error message that will be displayed.
   */
  @Prop() error: string;

  /**
   * Provided a hint or additional information about the input.
   */
  @Prop() hint: string;

  /**
   * Placeholder text displayed when the input is empty.
   */
  @Prop() placeholder?: string | null;

  /**
   * Disables the color picker
   * @defaultValue false
   */
  @Prop() disabled: boolean = false;
  @Watch('disabled')
  protected disabledChanged(newValue: boolean) {
    if (newValue) this.isOpen = false;
  }

  /**
   * Sets size for the component.
   * @defaultValue base
   */
  @Prop() size: 'large' | 'base' | 'small' = 'base';

  /**
   * Displays the picker inline without trigger
   * @defaultValue false
   */
  @Prop() inline: boolean = false;

  /**
   * Panel layout orientation
   * @defaultValue 'vertical'
   */
  @Prop() orientation: 'vertical' | 'horizontal' = 'vertical';

  /**
   * Color format for display and output
   * @defaultValue 'hex'
   */
  @Prop() format: 'hex' | 'rgba' = 'hex';

  /**
   * Array of preset color values
   */
  @Prop() presets: string[] = ['#326FD1', '#C79807', '#A45E3C', '#119C8D', '#EDBBA3', '#ABC9FB', '#D0E1FD', '#FF6259', '#717784', '#85B2F9', '#EAD6FD'];

  /**
   * Controls whether the header is shown
   * @defaultValue false
   */
  @Prop() showHeader: boolean = false;

  /**
   * Shows/hides the alpha slider
   * @defaultValue true
   */
  @Prop() showAlphaSlider: boolean = true;

  /**
   * Shows/hides the preset colors section
   * @defaultValue true
   */
  @Prop() showPresets: boolean = true;

  /**
   * Shows/hides the format selector
   * @defaultValue true
   */
  @Prop() showFormatSelector: boolean = true;

  /**
   * The type of the header styling
   * @defaultValue 'basic'
   */
  @Prop() headerType: 'basic' | 'divided' | 'light' | 'dark' | 'primary' = 'basic';

  /**
   * The type of the footer styling
   * @defaultValue 'basic'
   */
  @Prop() footerType: 'basic' | 'divided' | 'light' = 'basic';

  /**
   * Prevents the panel from being dismissed by clicking outside.
   * Use with footer actions (Apply/Cancel buttons) for controlled closing.
   * @defaultValue false
   */
  @Prop() preventDismiss: boolean = false;

  /**
   * Controls whether the close button is shown in the header.
   * Set to false when using footer actions for controlled closing.
   * @defaultValue false
   */
  @Prop() showCloseButton: boolean = false;

  /**
   * Sets the data-testid attribute on the root container element.
   */
  @Prop({ reflect: true }) dataTestid?: string;

  /**
   * Emitted when the color is applied/confirmed
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<string>;

  /**
   * Emitted when the panel opens
   */
  @Event({ eventName: 'tk-open' }) tkOpen: EventEmitter<void>;

  /**
   * Emitted when the panel closes
   */
  @Event({ eventName: 'tk-close' }) tkClose: EventEmitter<void>;

  /**
   * Emitted when the apply button is clicked
   */
  @Event({ eventName: 'tk-apply' }) tkApply: EventEmitter<string>;

  /**
   * Emitted when the cancel button is clicked
   */
  @Event({ eventName: 'tk-cancel' }) tkCancel: EventEmitter<void>;

  componentWillLoad() {
    this.internalHSVA = parseColorToHsva(this.value || '#000000');
    this.currentFormat = this.format === 'hex' || this.format === 'rgba' ? this.format : 'hex';
    this.hasHeaderSlot = !!this.el.querySelector(':scope > [slot="header"]');
    this.hasHeaderActionsSlot = !!this.el.querySelector(':scope > [slot="header-actions"]');
    this.hasFooterSlot = !!this.el.querySelector(':scope > [slot="footer"]');
    this.hasFooterActionsSlot = !!this.el.querySelector(':scope > [slot="footer-actions"]');
  }

  componentDidLoad() {
    const tkInputArea = this.inputRef?.querySelector('.tk-input') as HTMLElement;
    this.clickOutsideMixin = new ClickOutsideMixin({
      referenceElement: tkInputArea || this.el,
      handler: this.handleClickOutside,
      disabled: !this.isOpen || this.disabled || this.readonly || this.inline || this.preventDismiss,
    });
  }

  componentDidUpdate() {
    this.clickOutsideMixin?.updateConfig({
      disabled: !this.isOpen || this.disabled || this.readonly || this.inline || this.preventDismiss,
      ignoredElements: this.panelRef ? [this.panelRef] : [],
    });

    if (this.isOpen && this.inputRef && this.panelRef) {
      // Clean up old floating UI listeners before setting up new ones
      this.cleanup?.();
      this.updatePosition();
    } else {
      // Remove floating UI listeners when dropdown closes
      this.cleanup?.();
      // Clear reference to allow garbage collection
      this.cleanup = null;
    }
  }

  disconnectedCallback() {
    this.clickOutsideMixin?.disconnectedCallback();

    // Clean up floating UI listeners on component unmount
    this.cleanup?.();
    // Clear reference to allow garbage collection
    this.cleanup = null;
    this.stopDragging();
  }

  /**
   * Opens the color picker panel
   */
  @Method()
  async open() {
    if (!this.disabled && !this.readonly && !this.inline) {
      this.pendingValue = { ...this.internalHSVA };
      this.isOpen = true;
    }
  }

  /**
   * Closes the color picker panel
   */
  @Method()
  async close() {
    this.isOpen = false;
  }

  /**
   * Gets the current color value in the specified format
   * @param format - Output format (defaults to current format)
   */
  @Method()
  async getValue(format?: 'hex' | 'rgba'): Promise<string> {
    return hsvaToCss(this.internalHSVA, format || this.currentFormat);
  }

  /**
   * Applies the current color selection and closes the panel
   * Use this method in custom footer actions
   */
  @Method()
  async apply() {
    this.handleApply();
  }

  /**
   * Cancels the color selection, reverts to previous value, and closes the panel
   * Use this method in custom footer actions
   */
  @Method()
  async cancel() {
    this.handleCancel();
  }

  private startDragging(handler: (e: MouseEvent) => void, initialEvent: MouseEvent) {
    this.isDragging = true;
    this.currentDragHandler = handler;
    handler(initialEvent);
    document.addEventListener('mousemove', this.handleDocumentMouseMove);
    document.addEventListener('mouseup', this.handleDocumentMouseUp);
  }

  private stopDragging() {
    this.isDragging = false;
    this.currentDragHandler = undefined;
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
  }

  private updatePosition() {
    const inputEl = this.inputRef.querySelector('.tk-input') as HTMLElement;
    this.cleanup = floatingElementAutoUpdate(inputEl, this.panelRef, undefined, {
      placement: 'bottom-end',
    });
  }

  /**
   * Updates internal HSVA state with partial values
   */
  private updateColor(partial: Partial<HSVA>) {
    this.internalHSVA = { ...this.internalHSVA, ...partial };
  }

  private applyTriggerInputValue() {
    if (!this.triggerInputValue) return;

    const parsed = parseColorToHsva(this.triggerInputValue);
    // Check if parsed successfully (not all zeros unless input was black)
    if (parsed.h !== 0 || parsed.s !== 0 || parsed.v !== 0 || this.triggerInputValue.toLowerCase().includes('000')) {
      this.internalHSVA = parsed;
      const newValue = hsvaToCss(this.internalHSVA, this.currentFormat);
      this.value = newValue;
      this.tkChange.emit(newValue);
    }
  }

  private handleDocumentMouseMove = (e: MouseEvent) => {
    if (this.isDragging && this.currentDragHandler) {
      e.preventDefault();
      this.currentDragHandler(e);
    }
  };

  private handleDocumentMouseUp = () => {
    this.stopDragging();
  };

  private handleClickOutside = (_: MouseEvent) => {
    this.handleApply();
  };

  private handleTriggerClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (this.disabled || this.readonly || this.inline) return;

    if (!this.isOpen) {
      this.pendingValue = { ...this.internalHSVA };
      this.isOpen = true;
    }
  };

  private handleSaturationPointer = (e: MouseEvent) => {
    if (!this.saturationAreaRef) return;
    const rect = this.saturationAreaRef.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    this.updateColor({
      s: Math.round(x * 100),
      v: Math.round((1 - y) * 100),
    });
  };

  private handleSaturationMouseDown = (e: MouseEvent) => {
    this.saturationAreaRef = e.currentTarget as HTMLElement;
    this.startDragging(ev => {
      this.handleSaturationPointer(ev);
    }, e);
  };

  private handleHueChange = (e: MouseEvent) => {
    if (!this.hueSliderRef) return;
    const rect = this.hueSliderRef.getBoundingClientRect();
    const isVerticalSlider = this.hueSliderRef.classList.contains('tk-color-picker-slider-vertical');

    let percent: number;
    if (isVerticalSlider) {
      percent = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    } else {
      percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    }

    this.updateColor({ h: percent * 360 });
  };

  private handleHueMouseDown = (e: MouseEvent) => {
    this.hueSliderRef = e.currentTarget as HTMLElement;
    this.startDragging(this.handleHueChange, e);
  };

  private handleAlphaChange = (e: MouseEvent) => {
    if (!this.alphaSliderRef) return;
    const rect = this.alphaSliderRef.getBoundingClientRect();
    const isVerticalSlider = this.alphaSliderRef.classList.contains('tk-color-picker-slider-vertical');

    let percent: number;
    if (isVerticalSlider) {
      percent = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    } else {
      percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    }

    this.updateColor({ a: percent });
  };

  private handleAlphaMouseDown = (e: MouseEvent) => {
    this.alphaSliderRef = e.currentTarget as HTMLElement;
    this.startDragging(this.handleAlphaChange, e);
  };

  private handleRgbChange = (component: 'r' | 'g' | 'b', value: string) => {
    const val = Math.max(0, Math.min(255, parseInt(value) || 0));
    const { r, g, b } = hsvaToRgb(this.internalHSVA.h, this.internalHSVA.s, this.internalHSVA.v);

    let newR = r;
    let newG = g;
    let newB = b;

    if (component === 'r') newR = val;
    if (component === 'g') newG = val;
    if (component === 'b') newB = val;

    const newHsva = rgbToHsva(newR, newG, newB, this.internalHSVA.a);
    // Preserve hue when color becomes achromatic (gray/black/white)
    if (newHsva.s === 0 || newHsva.v === 0) {
      newHsva.h = this.internalHSVA.h;
    }
    this.internalHSVA = newHsva;
  };

  private handleInputBlur = (type: 'hex' | 'r' | 'g' | 'b' | 'a') => {
    if (this.tempInputVal === null) return;

    const val = String(this.tempInputVal);
    this.tempInputVal = null;

    if (type === 'hex') {
      const newHsva = parseColorToHsva('#' + val);
      // Preserve hue when color becomes achromatic
      if (newHsva.s === 0 || newHsva.v === 0) {
        newHsva.h = this.internalHSVA.h;
      }
      this.internalHSVA = newHsva;
    } else if (type === 'a') {
      const a = Math.max(0, Math.min(100, Number(val))) / 100;
      this.updateColor({ a });
    } else {
      this.handleRgbChange(type as 'r' | 'g' | 'b', val);
    }
  };

  private handlePresetSelect(color: string) {
    this.internalHSVA = parseColorToHsva(color);
  }

  private handleEyeDropper = async () => {
    if (!window.EyeDropper) return;

    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      this.internalHSVA = parseColorToHsva(result.sRGBHex);
    } catch {
      // User canceled or browser does not support
    }
  };

  private handleFormatChange = (e: CustomEvent) => {
    this.currentFormat = e.detail;
    e.stopPropagation();
  };

  private handleApply = () => {
    const colorValue = hsvaToCss(this.internalHSVA, this.currentFormat);
    this.value = colorValue;
    this.pendingValue = null;
    this.tkApply.emit(colorValue);
    this.tkChange.emit(colorValue);
    this.isOpen = false;
  };

  private handleCancel = () => {
    if (this.pendingValue) {
      this.internalHSVA = this.pendingValue;
      this.pendingValue = null;
    }
    this.tkCancel.emit();
    this.isOpen = false;
  };

  private handleCloseClick = () => {
    this.handleCancel();
  };

  private handleTriggerInputFocus = () => {
    this.isTriggerInputFocused = true;
    // Only set triggerInputValue if there's an actual value
    // If value is empty, keep triggerInputValue empty so user can type from scratch
    this.triggerInputValue = this.value || '';
  };

  private handleTriggerInputBlur = () => {
    this.isTriggerInputFocused = false;
    // Apply the typed value on blur
    this.applyTriggerInputValue();
  };

  private handleTriggerInputChange = (e: CustomEvent) => {
    const input = e.detail;
    this.triggerInputValue = input.value;
  };

  private handleTriggerInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.applyTriggerInputValue();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      // Reset to current color value
      const colorCss = hsvaToCss(this.internalHSVA, this.currentFormat);
      this.triggerInputValue = colorCss;
    }
  };

  private createEyedropperButton() {
    return (
      <tk-button
        variant="neutral"
        type="outlined"
        size="small"
        icon="colorize"
        onTk-click={this.handleEyeDropper}
        disabled={this.disabled}
        {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'eyedropper')}
      />
    );
  }

  private createColorPreview() {
    return (
      <div
        class="tk-color-picker-preview-box"
        style={{ backgroundColor: hsvaToCss(this.internalHSVA, this.currentFormat) }}
        {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'preview')}
      />
    );
  }

  private createSaturation() {
    const { h: hue, s, v } = this.internalHSVA;

    return (
      <div
        class="tk-color-picker-saturation-container"
        style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
        onMouseDown={this.handleSaturationMouseDown}
        {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'saturation')}
      >
        <div class="tk-color-picker-saturation-white" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'white')} />
        <div class="tk-color-picker-saturation-black" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'black')} />
        <div
          class="tk-color-picker-saturation-pointer"
          style={{
            left: `${s}%`,
            top: `${100 - v}%`,
          }}
          {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'pointer')}
        />
      </div>
    );
  }

  private createSliders() {
    const isHorizontalLayout = this.orientation === 'horizontal';
    const sliderClass = classNames('tk-color-picker-slider', {
      'tk-color-picker-slider-vertical': isHorizontalLayout,
    });

    const huePercent = (this.internalHSVA.h / 360) * 100;

    return (
      <div
        class={classNames('tk-color-picker-sliders', { 'tk-color-picker-sliders-vertical-layout': isHorizontalLayout })}
        {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'sliders')}
      >
        <div
          class={`${sliderClass} tk-color-picker-hue`}
          ref={el => (this.hueSliderRef = el as HTMLElement)}
          onMouseDown={this.handleHueMouseDown}
          {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'hue')}
        >
          <div
            class="tk-color-picker-slider-thumb"
            style={isHorizontalLayout ? { top: `${huePercent}%`, left: '50%' } : { left: `${huePercent}%`, top: '50%' }}
            {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'thumb')}
          >
            <div class="tk-color-picker-slider-thumb-inner" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'inner')} />
          </div>
        </div>

        {this.showAlphaSlider && (
          <div
            class={sliderClass}
            ref={el => (this.alphaSliderRef = el as HTMLElement)}
            onMouseDown={this.handleAlphaMouseDown}
            {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'alpha')}
          >
            <div class="tk-color-picker-alpha-bg" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'slider')} />
            <div
              class="tk-color-picker-alpha-overlay"
              style={{ background: `linear-gradient(${isHorizontalLayout ? 'to bottom' : 'to right'}, transparent, ${hsvaToHex(this.internalHSVA)})` }}
              {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'overlay')}
            />
            <div
              class="tk-color-picker-slider-thumb"
              style={isHorizontalLayout ? { top: `${this.internalHSVA.a * 100}%`, left: '50%' } : { left: `${this.internalHSVA.a * 100}%`, top: '50%' }}
              {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'thumb')}
            >
              <div class="tk-color-picker-slider-thumb-inner" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'inner')} />
            </div>
          </div>
        )}
      </div>
    );
  }

  private createAlphaInput() {
    if (!this.showAlphaSlider) return null;

    return (
      <tk-input
        class="tk-color-picker-alpha-input"
        mode="number"
        size="small"
        min="0"
        max="100"
        value={(this.internalHSVA.a * 100).toFixed(0)}
        disabled={this.disabled}
        onTk-change={(e: CustomEvent) => (this.tempInputVal = e.detail)}
        onTk-blur={() => this.handleInputBlur('a')}
        {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'alpha-input')}
      />
    );
  }

  private createInputs() {
    const { r, g, b } = hsvaToRgb(this.internalHSVA.h, this.internalHSVA.s, this.internalHSVA.v);

    return (
      <div class="tk-color-picker-inputs" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'inputs')}>
        {this.showFormatSelector && (
          <tk-select
            class="tk-color-picker-format-select"
            size="small"
            value={this.currentFormat}
            optionValueKey="value"
            disabled={this.disabled}
            options={[
              { value: 'hex', label: 'HEX' },
              { value: 'rgba', label: 'RGB' },
            ]}
            onTk-change={this.handleFormatChange}
            {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'format-select')}
          />
        )}
        <div class="tk-color-picker-input-fields" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'input-fields')}>
          {this.currentFormat === 'hex' && (
            <Fragment>
              <tk-input
                class="tk-color-picker-hex-input"
                size="small"
                icon="tag"
                iconPosition="left"
                value={hsvaToHex(this.internalHSVA).replace('#', '')}
                disabled={this.disabled}
                onTk-change={(e: CustomEvent) => (this.tempInputVal = e.detail)}
                onTk-blur={() => this.handleInputBlur('hex')}
                {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'hex')}
              />
              {this.createAlphaInput()}
            </Fragment>
          )}
          {this.currentFormat === 'rgba' && (
            <div class="tk-color-picker-rgb-inputs" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'rgb')}>
              <tk-input
                class="tk-color-picker-rgb-input"
                size="small"
                value={r.toString()}
                disabled={this.disabled}
                onTk-change={(e: CustomEvent) => (this.tempInputVal = e.detail)}
                onTk-blur={() => this.handleInputBlur('r')}
                {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'red')}
              />
              <tk-input
                class="tk-color-picker-rgb-input"
                size="small"
                value={g.toString()}
                disabled={this.disabled}
                onTk-change={(e: CustomEvent) => (this.tempInputVal = e.detail)}
                onTk-blur={() => this.handleInputBlur('g')}
                {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'green')}
              />
              <tk-input
                class="tk-color-picker-rgb-input"
                size="small"
                value={b.toString()}
                disabled={this.disabled}
                onTk-change={(e: CustomEvent) => (this.tempInputVal = e.detail)}
                onTk-blur={() => this.handleInputBlur('b')}
                {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'blue')}
              />
              {this.createAlphaInput()}
            </div>
          )}
        </div>
      </div>
    );
  }

  private createPresets() {
    if (!this.showPresets || !this.presets?.length) return null;

    return (
      <div class="tk-color-picker-presets" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'presets')}>
        {this.presets.map((color, index) => (
          <div
            class="tk-color-picker-preset"
            style={{ backgroundColor: color }}
            onClick={() => this.handlePresetSelect(color)}
            {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'preset')}
          />
        ))}
      </div>
    );
  }

  private createFooter() {
    if (this.hasFooterSlot) {
      return <slot name="footer" />;
    }

    if (this.hasFooterActionsSlot) {
      const footerClasses = classNames('tk-color-picker-panel-footer', `tk-color-picker-panel-footer-${this.footerType}`);
      return (
        <div class={footerClasses} {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'footer-actions-container')}>
          <slot name="footer-actions" />
        </div>
      );
    }

    // No footer by default - footer is entirely slot-based
    return null;
  }

  private createPanelHeader() {
    if (!this.showHeader) return null;

    if (this.hasHeaderSlot) {
      return <slot name="header" />;
    } else {
      const headerClasses = classNames('tk-color-picker-panel-header', `tk-color-picker-panel-header-${this.headerType}`);

      return (
        <div class={headerClasses} {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'header')}>
          <span class="tk-color-picker-title" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'title')}>
            {this.header}
          </span>
          {this.hasHeaderActionsSlot ? (
            <slot name="header-actions" />
          ) : (
            !this.inline &&
            this.showCloseButton && (
              <tk-button
                variant="neutral"
                type="text"
                size="small"
                icon="close"
                onClick={this.handleCloseClick}
                {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'close')}
              />
            )
          )}
        </div>
      );
    }
  }

  private createPanelBody() {
    if (this.orientation === 'horizontal') {
      return (
        <Fragment>
          <div class="tk-color-picker-body-horizontal" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'body-horizontal')}>
            <div class="tk-color-picker-controls-side" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'controls-side')}>
              {this.createColorPreview()}
              {this.createSliders()}
              {this.createEyedropperButton()}
            </div>
            <div class="tk-color-picker-saturation-wrapper" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'saturation-wrapper')}>
              {this.createSaturation()}
            </div>
          </div>
          {this.createInputs()}
          {this.createPresets()}
        </Fragment>
      );
    }

    return (
      <Fragment>
        <div class="tk-color-picker-body-vertical" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'body-vertical')}>
          {this.createSaturation()}
          <div class="tk-color-picker-controls-bottom" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'controls-bottom')}>
            <div class="tk-color-picker-eyedropper-row" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'eyedropper-row')}>
              {this.createEyedropperButton()}
              {this.createSliders()}
              {this.createColorPreview()}
            </div>
            {this.createInputs()}
          </div>
        </div>
        {this.createPresets()}
      </Fragment>
    );
  }

  private renderInput() {
    if (this.inline) return null;

    const displayValue = this.isTriggerInputFocused ? this.triggerInputValue : this.value;
    const iconColor = this.value || '#000000';

    return (
      <tk-input
        ref={el => (this.inputRef = el as HTMLTkInputElement)}
        label={this.label}
        readonly={this.readonly}
        disabled={this.disabled}
        invalid={this.invalid}
        error={this.error}
        hint={this.hint}
        showAsterisk={this.showAsterisk}
        name={this.name}
        size={this.size}
        placeholder={this.placeholder}
        icon={{
          left: {
            name: 'circle',
            color: iconColor,
            style: 'outlined',
            fill: true,
          },
          right: this.isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down',
        }}
        value={displayValue}
        aria-describedby="dropdown"
        aria-expanded={this.isOpen}
        onClick={this.handleTriggerClick}
        onTk-focus={this.handleTriggerInputFocus}
        onTk-blur={this.handleTriggerInputBlur}
        onTk-change={this.handleTriggerInputChange}
        onKeyDown={this.handleTriggerInputKeyDown}
        {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'trigger-input')}
      ></tk-input>
    );
  }

  private renderPanel() {
    const panelCls = classNames('tk-color-picker-panel', {
      'tk-color-picker-panel-inline': this.inline,
      'tk-color-picker-panel-horizontal': this.orientation === 'horizontal',
    });

    return (
      <div class={panelCls} ref={el => (this.panelRef = el as HTMLDivElement)} data-tk-id={this.uniqueId} {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'panel')}>
        {this.createPanelHeader()}
        <div class="tk-color-picker-panel-body" {...getDataTestidAttribute(this.dataTestid, 'color-picker', 'body')}>
          {this.createPanelBody()}
        </div>
        {this.createFooter()}
      </div>
    );
  }

  render() {
    const rootClasses = classNames('tk-color-picker', {
      'tk-color-picker-inline': this.inline,
      'tk-color-picker-horizontal': this.orientation === 'horizontal',
    });

    return (
      <div class={rootClasses} {...getDataTestidAttribute(this.dataTestid, 'color-picker')}>
        {this.renderInput()}
        {(this.isOpen || this.inline) && this.renderPanel()}
      </div>
    );
  }
}
