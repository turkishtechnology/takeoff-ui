import { Component, h, Prop, State, Event, EventEmitter, Element, Watch, Method, Fragment, ComponentInterface } from '@stencil/core';
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { HSVA, parseColorToHsva, hsvaToCss, hsvaToHex, hsvaToRgb, rgbToHsva } from '../../utils/color-utils';
import { ClickOutsideMixin } from '../../utils/clickoutside-mixin';

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
  private triggerRef?: HTMLElement;
  private triggerInputRef?: HTMLInputElement;
  private panelRef?: HTMLDivElement;
  private cleanupAuto?: () => void;
  private isDragging = false;
  private currentDragHandler?: (e: MouseEvent) => void;
  private tempInputVal: string | null = null;
  private saturationAreaRef?: HTMLElement;
  private hueSliderRef?: HTMLElement;
  private alphaSliderRef?: HTMLElement;
  private pendingValue: HSVA | null = null;
  private clickOutsideMixin?: ClickOutsideMixin;

  @State() isOpen: boolean = false;
  @State() internalHSVA: HSVA = { h: 0, s: 0, v: 0, a: 1 };
  @State() currentFormat: 'hex' | 'rgba' = 'hex';
  @State() hasHeaderSlot: boolean = false;
  @State() hasHeaderActionsSlot: boolean = false;
  @State() hasFooterSlot: boolean = false;
  @State() hasFooterActionsSlot: boolean = false;
  @State() isTriggerFocused: boolean = false;
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
  @Prop() panelTitle: string = 'Color Picker';

  /**
   * Displays a red asterisk (*) next to the label for visual emphasis.
   * @defaultValue false
   */
  @Prop() showAsterisk: boolean = false;

  /**
   * The type of trigger to display
   * - 'input': Full input with editable text field, circular color preview, and chevron
   * - 'input-compact': Compact trigger with only circular color preview and chevron
   * - 'item': Item style with square color preview and text, no chevron
   * @defaultValue 'input'
   */
  @Prop() triggerType: 'input' | 'input-compact' | 'item' = 'input';

  /**
   * Disables the color picker
   * @defaultValue false
   */
  @Prop() disabled: boolean = false;

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
   * @defaultValue true
   */
  @Prop() showCloseButton: boolean = true;

  @Watch('isOpen')
  isOpenChanged(newVal: boolean) {
    if (newVal) {
      this.tkOpen.emit();
    } else {
      this.tkClose.emit();
    }
  }

  /**
   * Emitted when the color value changes (during interaction)
   */
  @Event({ eventName: 'tk-input' }) tkInput: EventEmitter<string>;

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

    this.clickOutsideMixin = new ClickOutsideMixin({
      referenceElement: this.el,
      handler: this.handleClickOutside,
      disabled: !this.isOpen || this.inline || this.preventDismiss,
    });
  }

  componentDidUpdate() {
    this.clickOutsideMixin?.updateConfig({ disabled: !this.isOpen || this.inline || this.preventDismiss });

    if (this.isOpen && this.triggerRef && this.panelRef) {
      if (!this.cleanupAuto) {
        this.cleanupAuto = autoUpdate(this.triggerRef, this.panelRef, () => this.updatePanelPosition(), { elementResize: false });
      }
    } else {
      if (this.cleanupAuto) {
        this.cleanupAuto();
        this.cleanupAuto = undefined;
      }
    }
  }

  disconnectedCallback() {
    this.clickOutsideMixin?.disconnectedCallback();

    if (this.cleanupAuto) {
      this.cleanupAuto();
      this.cleanupAuto = undefined;
    }
    this.stopDragging();
  }

  /**
   * Opens the color picker panel
   */
  @Method()
  async open() {
    if (!this.disabled && !this.inline) {
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
   * Sets the color value programmatically
   * @param color - Color string in any supported format
   */
  @Method()
  async setValue(color: string) {
    this.value = color;
    this.internalHSVA = parseColorToHsva(color);
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
    if (this.disabled || this.inline) return;

    if (!this.isOpen) {
      this.pendingValue = { ...this.internalHSVA };
    }
    this.isOpen = !this.isOpen;
  };

  private updatePanelPosition() {
    if (!this.triggerRef || !this.panelRef) return;
    computePosition(this.triggerRef, this.panelRef, { placement: 'bottom-end', middleware: [offset(4), flip(), shift({ padding: 5 })] }).then(({ x, y }) => {
      Object.assign(this.panelRef!.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  /**
   * Updates internal HSVA state with partial values
   */
  private updateColor(partial: Partial<HSVA>) {
    this.internalHSVA = { ...this.internalHSVA, ...partial };
  }

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
      this.emitInput();
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
    this.emitInput();
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
    this.emitInput();
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
    this.emitInput();
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
      this.emitInput();
    } else if (type === 'a') {
      const a = Math.max(0, Math.min(100, Number(val))) / 100;
      this.updateColor({ a });
      this.emitInput();
    } else {
      this.handleRgbChange(type as 'r' | 'g' | 'b', val);
    }
  };

  private handlePresetSelect(color: string) {
    this.internalHSVA = parseColorToHsva(color);
    this.emitInput();
  }

  private handleEyeDropper = async () => {
    if (!window.EyeDropper) return;

    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      this.internalHSVA = parseColorToHsva(result.sRGBHex);
      this.emitInput();
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

  private emitInput() {
    const css = hsvaToCss(this.internalHSVA, this.currentFormat);
    this.tkInput.emit(css);
  }

  private handleTriggerFocus = () => {
    this.isTriggerFocused = true;
  };

  private handleTriggerBlur = () => {
    this.isTriggerFocused = false;
  };

  private handleTriggerKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleTriggerClick(e as unknown as MouseEvent);
    }
  };

  private handleTriggerInputFocus = () => {
    this.isTriggerInputFocused = true;
    this.isTriggerFocused = true;
    const colorCss = hsvaToCss(this.internalHSVA, this.currentFormat);
    this.triggerInputValue = colorCss;
  };

  private handleTriggerInputBlur = () => {
    this.isTriggerInputFocused = false;
    this.isTriggerFocused = false;
    // Apply the typed value on blur
    this.applyTriggerInputValue();
  };

  private handleTriggerInputChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.triggerInputValue = input.value;
  };

  private handleTriggerInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.applyTriggerInputValue();
      this.triggerInputRef?.blur();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      // Reset to current color value
      const colorCss = hsvaToCss(this.internalHSVA, this.currentFormat);
      this.triggerInputValue = colorCss;
      this.triggerInputRef?.blur();
    }
  };

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

  private handleTriggerChevronClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (this.disabled || this.inline) return;

    if (!this.isOpen) {
      this.pendingValue = { ...this.internalHSVA };
    }
    this.isOpen = !this.isOpen;
  };

  private createEyedropperButton() {
    return <tk-button variant="neutral" type="outlined" size="small" icon="colorize" onTk-click={this.handleEyeDropper} disabled={this.disabled} />;
  }

  private createColorPreview() {
    return <div class="tk-color-picker-preview-box" style={{ backgroundColor: hsvaToCss(this.internalHSVA, this.currentFormat) }} />;
  }

  private renderTrigger() {
    if (this.inline) return null;

    const colorCss = hsvaToCss(this.internalHSVA, this.currentFormat);
    const displayValue = this.isTriggerInputFocused ? this.triggerInputValue : colorCss;

    // Render based on trigger type
    switch (this.triggerType) {
      case 'input-compact':
        return this.createInputCompactTrigger(colorCss);
      case 'item':
        return this.createItemTrigger(colorCss);
      case 'input':
      default:
        return this.createInputTrigger(colorCss, displayValue);
    }
  }

  private createInputTrigger(colorCss: string, displayValue: string) {
    const triggerClasses = classNames('tk-color-picker-trigger', 'tk-color-picker-trigger-input', {
      'tk-color-picker-trigger-disabled': this.disabled,
      'tk-color-picker-trigger-focused': this.isTriggerFocused || this.isOpen,
    });

    return (
      <div class="tk-color-picker-trigger-wrapper">
        {this.label && (
          <div class="tk-color-picker-label">
            <span class="tk-color-picker-label-text">{this.label}</span>
            {this.showAsterisk && <span class="tk-color-picker-required">*</span>}
          </div>
        )}
        <div
          class={triggerClasses}
          ref={el => (this.triggerRef = el as HTMLElement)}
          role="combobox"
          aria-expanded={this.isOpen}
          aria-haspopup="dialog"
          aria-disabled={this.disabled}
        >
          <div class="tk-color-picker-input-content">
            <div class="tk-color-picker-color-preview-wrapper">
              <div class="tk-color-picker-color-preview">
                <div class="tk-color-picker-color-preview-inner" style={{ backgroundColor: colorCss }} />
              </div>
            </div>
            <input
              type="text"
              class="tk-color-picker-trigger-input-field"
              ref={el => (this.triggerInputRef = el as HTMLInputElement)}
              value={displayValue}
              disabled={this.disabled}
              onFocus={this.handleTriggerInputFocus}
              onBlur={this.handleTriggerInputBlur}
              onInput={this.handleTriggerInputChange}
              onKeyDown={this.handleTriggerInputKeyDown}
            />
          </div>
          <div class="tk-color-picker-trigger-chevron" onClick={this.handleTriggerChevronClick} tabIndex={this.disabled ? -1 : 0} onKeyDown={this.handleTriggerKeyDown}>
            <tk-icon icon={this.isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} size="large" class="tk-color-picker-trigger-icon" color="var(--icon-base)" />
          </div>
        </div>
      </div>
    );
  }

  private createInputCompactTrigger(colorCss: string) {
    const triggerClasses = classNames('tk-color-picker-trigger', 'tk-color-picker-trigger-compact', {
      'tk-color-picker-trigger-disabled': this.disabled,
      'tk-color-picker-trigger-focused': this.isTriggerFocused || this.isOpen,
    });

    return (
      <div class="tk-color-picker-trigger-wrapper tk-color-picker-trigger-wrapper-compact">
        <div
          class={triggerClasses}
          ref={el => (this.triggerRef = el as HTMLElement)}
          onClick={this.handleTriggerClick}
          onFocus={this.handleTriggerFocus}
          onBlur={this.handleTriggerBlur}
          onKeyDown={this.handleTriggerKeyDown}
          tabIndex={this.disabled ? -1 : 0}
          role="combobox"
          aria-expanded={this.isOpen}
          aria-haspopup="dialog"
          aria-disabled={this.disabled}
        >
          <div class="tk-color-picker-color-preview-wrapper">
            <div class="tk-color-picker-color-preview">
              <div class="tk-color-picker-color-preview-inner" style={{ backgroundColor: colorCss }} />
            </div>
          </div>
          <tk-icon icon={this.isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} size="xlarge" class="tk-color-picker-trigger-icon" color="var(--icon-base)" />
        </div>
      </div>
    );
  }

  private createItemTrigger(colorCss: string) {
    const triggerClasses = classNames('tk-color-picker-trigger', 'tk-color-picker-trigger-item', {
      'tk-color-picker-trigger-disabled': this.disabled,
      'tk-color-picker-trigger-focused': this.isTriggerFocused || this.isOpen,
    });

    return (
      <div class="tk-color-picker-trigger-wrapper tk-color-picker-trigger-wrapper-item">
        <div
          class={triggerClasses}
          ref={el => (this.triggerRef = el as HTMLElement)}
          onClick={this.handleTriggerClick}
          onFocus={this.handleTriggerFocus}
          onBlur={this.handleTriggerBlur}
          onKeyDown={this.handleTriggerKeyDown}
          tabIndex={this.disabled ? -1 : 0}
          role="combobox"
          aria-expanded={this.isOpen}
          aria-haspopup="dialog"
          aria-disabled={this.disabled}
        >
          <div class="tk-color-picker-color-preview-square">
            <div class="tk-color-picker-color-preview-inner" style={{ backgroundColor: colorCss }} />
          </div>
          <span class="tk-color-picker-value-text">{colorCss}</span>
        </div>
      </div>
    );
  }

  private createSaturation() {
    const { h: hue, s, v } = this.internalHSVA;

    return (
      <div class="tk-color-picker-saturation-container" style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }} onMouseDown={this.handleSaturationMouseDown}>
        <div class="tk-color-picker-saturation-white" />
        <div class="tk-color-picker-saturation-black" />
        <div
          class="tk-color-picker-saturation-pointer"
          style={{
            left: `${s}%`,
            top: `${100 - v}%`,
          }}
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
      <div class={classNames('tk-color-picker-sliders', { 'tk-color-picker-sliders-vertical-layout': isHorizontalLayout })}>
        <div class={`${sliderClass} tk-color-picker-hue`} ref={el => (this.hueSliderRef = el as HTMLElement)} onMouseDown={this.handleHueMouseDown}>
          <div class="tk-color-picker-slider-thumb" style={isHorizontalLayout ? { top: `${huePercent}%`, left: '50%' } : { left: `${huePercent}%`, top: '50%' }}>
            <div class="tk-color-picker-slider-thumb-inner" />
          </div>
        </div>

        {this.showAlphaSlider && (
          <div class={sliderClass} ref={el => (this.alphaSliderRef = el as HTMLElement)} onMouseDown={this.handleAlphaMouseDown}>
            <div class="tk-color-picker-alpha-bg" />
            <div
              class="tk-color-picker-alpha-overlay"
              style={{ background: `linear-gradient(${isHorizontalLayout ? 'to bottom' : 'to right'}, transparent, ${hsvaToHex(this.internalHSVA)})` }}
            />
            <div
              class="tk-color-picker-slider-thumb"
              style={isHorizontalLayout ? { top: `${this.internalHSVA.a * 100}%`, left: '50%' } : { left: `${this.internalHSVA.a * 100}%`, top: '50%' }}
            >
              <div class="tk-color-picker-slider-thumb-inner" />
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
      />
    );
  }

  private createInputs() {
    const { r, g, b } = hsvaToRgb(this.internalHSVA.h, this.internalHSVA.s, this.internalHSVA.v);

    return (
      <div class="tk-color-picker-inputs">
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
          />
        )}
        <div class="tk-color-picker-input-fields">
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
              />
              {this.createAlphaInput()}
            </Fragment>
          )}
          {this.currentFormat === 'rgba' && (
            <div class="tk-color-picker-rgb-inputs">
              <tk-input
                class="tk-color-picker-rgb-input"
                size="small"
                value={r.toString()}
                disabled={this.disabled}
                onTk-change={(e: CustomEvent) => (this.tempInputVal = e.detail)}
                onTk-blur={() => this.handleInputBlur('r')}
              />
              <tk-input
                class="tk-color-picker-rgb-input"
                size="small"
                value={g.toString()}
                disabled={this.disabled}
                onTk-change={(e: CustomEvent) => (this.tempInputVal = e.detail)}
                onTk-blur={() => this.handleInputBlur('g')}
              />
              <tk-input
                class="tk-color-picker-rgb-input"
                size="small"
                value={b.toString()}
                disabled={this.disabled}
                onTk-change={(e: CustomEvent) => (this.tempInputVal = e.detail)}
                onTk-blur={() => this.handleInputBlur('b')}
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
      <div class="tk-color-picker-presets">
        {this.presets.map(color => (
          <div class="tk-color-picker-preset" style={{ backgroundColor: color }} onClick={() => this.handlePresetSelect(color)} />
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
        <div class={footerClasses}>
          <slot name="footer-actions" />
        </div>
      );
    }

    // No footer by default - footer is entirely slot-based
    return null;
  }

  private createPanelHeader() {
    if (this.hasHeaderSlot) {
      return <slot name="header" />;
    }

    const headerClasses = classNames('tk-color-picker-panel-header', `tk-color-picker-panel-header-${this.headerType}`);

    return (
      <div class={headerClasses}>
        <span class="tk-color-picker-title">{this.panelTitle}</span>
        {this.hasHeaderActionsSlot ? (
          <slot name="header-actions" />
        ) : (
          !this.inline &&
          this.showCloseButton && <tk-button class="tk-color-picker-close" variant="neutral" type="text" size="small" icon="close" onClick={this.handleCloseClick} />
        )}
      </div>
    );
  }

  private createPanelBody() {
    if (this.orientation === 'horizontal') {
      return (
        <div class="tk-color-picker-body-horizontal">
          <div class="tk-color-picker-controls-side">
            {this.createColorPreview()}
            {this.createSliders()}
            {this.createEyedropperButton()}
          </div>
          <div class="tk-color-picker-saturation-wrapper">{this.createSaturation()}</div>
        </div>
      );
    }

    return (
      <div class="tk-color-picker-body-vertical">
        {this.createSaturation()}
        <div class="tk-color-picker-controls-bottom">
          <div class="tk-color-picker-eyedropper-row">
            {this.createEyedropperButton()}
            {this.createSliders()}
            {this.createColorPreview()}
          </div>
          {this.createInputs()}
        </div>
      </div>
    );
  }

  private renderPanel() {
    const panelCls = classNames('tk-color-picker-panel', {
      'tk-color-picker-panel-inline': this.inline,
      'tk-color-picker-panel-horizontal': this.orientation === 'horizontal',
    });

    return (
      <div class={panelCls} ref={el => (this.panelRef = el as HTMLDivElement)} data-tk-id={this.uniqueId}>
        {this.createPanelHeader()}
        <div class="tk-color-picker-panel-body">
          {this.createPanelBody()}
          {this.createPresets()}
        </div>
        {this.createFooter()}
      </div>
    );
  }

  render() {
    const rootClasses = classNames('tk-color-picker', {
      'tk-color-picker-inline': this.inline,
      'tk-color-picker-horizontal': this.orientation === 'horizontal',
      'tk-color-picker-disabled': this.disabled,
    });

    return (
      <div class={rootClasses}>
        {this.renderTrigger()}
        {(this.isOpen || this.inline) && this.renderPanel()}
      </div>
    );
  }
}
