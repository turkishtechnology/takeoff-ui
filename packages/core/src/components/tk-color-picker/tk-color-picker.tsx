import {
  Component,
  h,
  Prop,
  State,
  Event,
  EventEmitter,
  Element,
  Watch,
  Method,
} from '@stencil/core';
import { computePosition, flip, shift, offset, autoUpdate, AutoUpdateOptions } from '@floating-ui/dom';
import classNames from 'classnames';

interface HSLA {
  h: number;    // 0–360
  s: number;    // 0–1
  l: number;    // 0–1
  a: number;    // 0–1
}

@Component({
  tag: 'tk-color-picker',
  styleUrl: 'tk-color-picker.scss',
  shadow: true,
})
export class TkColorPicker {
  @Element() el: HTMLTkColorPickerElement;

  private uniqueId = crypto.randomUUID();
  private triggerRef?: HTMLElement;
  private panelRef?: HTMLDivElement;
  private cleanupAuto?: () => void;
  private isDragging = false;
  private currentDragHandler?: (e: MouseEvent) => void;

  @Prop() value: string = ''; // başlangıç rengi (hex, rgba, hsla vs)
  @Prop() inline: boolean = false;

  @Event({ eventName: 'tkChange' }) tkChange!: EventEmitter<string>;
  // (İstersen onChangeEnd gibi bir eventi de ekleyebilirsin)

  @State() isOpen: boolean = false;
  @State() internalHSLA: HSLA = { h: 0, s: 0, l: 0, a: 1 };
  @State() format: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' = 'hex';

  @Watch('value')
  valueChanged(newVal: string) {
    this.internalHSLA = this.parseColor(newVal);
  }

  @Watch('isOpen')
  isOpenChanged(newVal: boolean) {
    if (newVal) {
      this.bindWindowClick();
    } else {
      this.unbindWindowClick();
    }
  }

  componentWillLoad() {
    this.internalHSLA = this.parseColor(this.value || '#000000');
  }

  componentDidUpdate() {
    if (this.isOpen && this.triggerRef && this.panelRef) {
      this.cleanupAuto = autoUpdate(
        this.triggerRef,
        this.panelRef,
        () => this.updatePanelPosition(),
        { placement: 'bottom-start', middleware: [offset(4), flip(), shift({ padding: 5 })] } as AutoUpdateOptions
      );
    } else {
      this.cleanupAuto && this.cleanupAuto();
    }
  }

  disconnectedCallback() {
    this.unbindWindowClick();
    this.cleanupAuto && this.cleanupAuto();
    this.stopDragging();
  }

  private startDragging(handler: (e: MouseEvent) => void, initialEvent: MouseEvent) {
    this.isDragging = true;
    this.currentDragHandler = handler;

    // İlk tıklamada değeri güncelle
    handler(initialEvent);

    // Mouse move ve mouse up listener'ları ekle
    document.addEventListener('mousemove', this.onDocumentMouseMove);
    document.addEventListener('mouseup', this.onDocumentMouseUp);
  }

  private stopDragging() {
    this.isDragging = false;
    this.currentDragHandler = undefined;
    document.removeEventListener('mousemove', this.onDocumentMouseMove);
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
  }

  private onDocumentMouseMove = (e: MouseEvent) => {
    if (this.isDragging && this.currentDragHandler) {
      this.currentDragHandler(e);
    }
  };

  private onDocumentMouseUp = () => {
    this.stopDragging();
  };

  private bindWindowClick() {
    window.addEventListener('click', this.onWindowClick);
  }

  private unbindWindowClick() {
    window.removeEventListener('click', this.onWindowClick);
  }

  private onWindowClick = (e: MouseEvent) => {
    const path = e.composedPath();
    if (!path.includes(this.el)) {
      this.isOpen = false;
    }
  };

  private togglePanel = (e: MouseEvent) => {
    e.stopPropagation();
    if (this.inline) return;
    this.isOpen = !this.isOpen;
  };

  private updatePanelPosition() {
    computePosition(
      this.triggerRef!,
      this.panelRef!,
      { placement: 'bottom-start', middleware: [offset(4), flip(), shift({ padding: 5 })] }
    ).then(({ x, y }) => {
      Object.assign(this.panelRef!.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  // — Renk parse & dönüşüm fonksiyonları —

  private parseColor(input: string): HSLA {
    if (!input) return { h: 0, s: 0, l: 0, a: 1 };

    input = input.trim();

    // Hex
    if (input.startsWith('#')) {
      const hex = input.slice(1);
      let r = 0, g = 0, b = 0;
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
      } else if (hex.length === 8) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
        const aa = parseInt(hex.slice(6, 8), 16);
        const a = aa / 255;
        return this.rgbToHsla(r, g, b, a);
      }
      return this.rgbToHsla(r, g, b, 1);
    }

    // rgb(a)
    if (input.startsWith('rgb')) {
      const parts = input.match(/rgba?\(([^)]+)\)/);
      if (parts) {
        const comps = parts[1].split(',').map(x => x.trim());
        const r = Number(comps[0]);
        const g = Number(comps[1]);
        const b = Number(comps[2]);
        const a = comps.length === 4 ? Number(comps[3]) : 1;
        return this.rgbToHsla(r, g, b, a);
      }
    }

    // hsl(a)
    if (input.startsWith('hsl')) {
      const parts = input.match(/hsla?\(([^)]+)\)/);
      if (parts) {
        const comps = parts[1].split(',').map(x => x.trim());
        const h = Number(comps[0]);
        const s = Number(comps[1].replace('%', '')) / 100;
        const l = Number(comps[2].replace('%', '')) / 100;
        const a = comps.length === 4 ? Number(comps[3]) : 1;
        return { h, s, l, a };
      }
    }

    // fallback: siyah
    return { h: 0, s: 0, l: 0, a: 1 };
  }

  private hslaToCss(hsla: HSLA): string {
    const { h, s, l, a } = hsla;
    switch (this.format) {
      case 'hex':
        return this.hslaToHex(hsla);
      case 'hexa':
        return this.hslaToHexAlpha(hsla);
      case 'rgb':
        {
          const { r, g, b } = this.hslToRgb(h, s, l);
          return `rgb(${r}, ${g}, ${b})`;
        }
      case 'rgba':
        {
          const { r, g, b } = this.hslToRgb(h, s, l);
          return `rgba(${r}, ${g}, ${b}, ${a})`;
        }
      case 'hsl':
        return `hsl(${h.toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`;
      case 'hsla':
        return `hsla(${h.toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%, ${a.toFixed(2)})`;
      default:
        return this.hslaToHex(hsla);
    }
  }

  private hslaToHex(hsla: HSLA): string {
    const { r, g, b } = this.hslToRgb(hsla.h, hsla.s, hsla.l);
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  }

  private hslaToHexAlpha(hsla: HSLA): string {
    const hex = this.hslaToHex(hsla);
    const aa = Math.round(hsla.a * 255).toString(16).padStart(2, '0');
    return `${hex}${aa}`;
  }

  private rgbToHsla(r: number, g: number, b: number, a: number): HSLA {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    const l = (max + min) / 2;
    let s = 0;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h = h * 60;
    }

    return { h, s, l, a };
  }

  private hslToRgb(h: number, s: number, l: number) {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const hh = h / 60;
    const x = c * (1 - Math.abs((hh % 2) - 1));
    let r = 0, g = 0, b = 0;

    if (hh >= 0 && hh < 1) {
      r = c; g = x; b = 0;
    } else if (hh < 2) {
      r = x; g = c; b = 0;
    } else if (hh < 3) {
      r = 0; g = c; b = x;
    } else if (hh < 4) {
      r = 0; g = x; b = c;
    } else if (hh < 5) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }

    const m = l - c / 2;
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }

  // — Kullanıcı etkileşimleri: saturation, hue, alpha seçimleri —

  private saturationAreaRef?: HTMLElement;

  private handleSaturationPointer = (e: MouseEvent) => {
    if (!this.saturationAreaRef) return;
    const rect = this.saturationAreaRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const s = Math.max(0, Math.min(1, x / rect.width));
    const l = 1 - Math.max(0, Math.min(1, y / rect.height));
    this.internalHSLA = { ...this.internalHSLA, s, l };
    this.emitChange();
  };

  private handleSaturationMouseDown = (e: MouseEvent) => {
    this.saturationAreaRef = e.currentTarget as HTMLElement;
    this.startDragging(this.handleSaturationPointer, e);
  };

  private hueSliderRef?: HTMLElement;

  private handleHueChange = (e: MouseEvent) => {
    if (!this.hueSliderRef) return;
    const rect = this.hueSliderRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const h = Math.max(0, Math.min(1, x / rect.width)) * 360;
    this.internalHSLA = { ...this.internalHSLA, h };
    this.emitChange();
  };

  private handleHueMouseDown = (e: MouseEvent) => {
    this.hueSliderRef = e.currentTarget as HTMLElement;
    this.startDragging(this.handleHueChange, e);
  };

  private alphaSliderRef?: HTMLElement;

  private handleAlphaChange = (e: MouseEvent) => {
    if (!this.alphaSliderRef) return;
    const rect = this.alphaSliderRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const a = Math.max(0, Math.min(1, x / rect.width));
    this.internalHSLA = { ...this.internalHSLA, a };
    this.emitChange();
  };

  private handleAlphaMouseDown = (e: MouseEvent) => {
    this.alphaSliderRef = e.currentTarget as HTMLElement;
    this.startDragging(this.handleAlphaChange, e);
  };

  private selectPreset(color: string) {
    this.value = color;
    this.internalHSLA = this.parseColor(color);
    this.emitChange();
  }

  private emitChange() {
    const css = this.hslaToCss(this.internalHSLA);
    this.tkChange.emit(css);
  }

  // — Render parçaları —

  private renderTrigger() {
    if (this.inline) {
      return null;
    }
    return (
      <div
        class="tk-color-picker-trigger"
        ref={el => (this.triggerRef = el as HTMLElement)}
        onClick={this.togglePanel}
      >
        <div class="tk-color-picker-color-preview">
          <div
            class="tk-color-picker-color-preview-inner"
            style={{ backgroundColor: this.hslaToCss(this.internalHSLA) }}
          />
        </div>
        <div class="tk-color-picker-trigger-text">
          <span>{this.hslaToCss(this.internalHSLA)}</span>
        </div>
      </div>
    );
  }

  private renderPanel() {
    if (!this.isOpen && !this.inline) {
      return null;
    }
    const panelCls = classNames('tk-color-picker-panel', {
      'tk-color-picker-panel-inline': this.inline,
      'tk-color-picker-panel-overlay': !this.inline,
    });
    return (
      <div
        class={panelCls}
        ref={el => (this.panelRef = el as HTMLDivElement)}
        role={!this.inline ? 'dialog' : null}
        data-tk-color-picker-id={this.uniqueId}
      >
        <div class="tk-color-picker-panel-header">
          <span class="tk-color-picker-panel-header-title">Color Picker</span>
          <button
            class="tk-color-picker-panel-close"
            onClick={() => (this.isOpen = false)}
          >
            <tk-icon icon="x" size="small" />
          </button>
        </div>
        <div class="tk-color-picker-panel-body">
          <div
            class="tk-color-picker-saturation-container"
            style={{ backgroundColor: `hsl(${this.internalHSLA.h},100%,50%)` }}
            onMouseDown={e => this.handleSaturationMouseDown(e)}
          >
            <div class="tk-color-picker-saturation"></div>
            <div
              class="tk-color-picker-saturation-pointer"
              style={{
                left: `${this.internalHSLA.s * 100}%`,
                top: `${(1 - this.internalHSLA.l) * 100}%`,
              }}
            />
          </div>
          <div class="tk-color-picker-controls">
            <div class="tk-color-picker-sliders">
              <button class="tk-color-picker-eyedropper">
                <tk-icon iconType="outlined" variant="neutral" icon="colorize" size="small" />
              </button>

              <div class="tk-color-picker-slider-group">
                <div
                  class="tk-color-picker-slider tk-color-picker-hue"
                  onMouseDown={e => this.handleHueMouseDown(e)}
                >
                  <div
                    class="tk-color-picker-slider-thumb"
                    style={{ left: `${(this.internalHSLA.h / 360) * 100}%` }}
                  />
                </div>
                <div
                  class="tk-color-picker-slider"
                  onMouseDown={e => this.handleAlphaMouseDown(e)}
                >
                  <div
                    class="tk-color-picker-slider-overlay"
                    style={{
                      backgroundImage: `linear-gradient(45deg, #e0e0e0 25%, transparent 25%),
                      linear-gradient(-45deg, #e0e0e0 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, #e0e0e0 75%),
                      linear-gradient(-45deg, white 75%, #e0e0e0 75%)`,
                      backgroundSize: '8px 8px',
                      backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0',
                      insetInline: '-12px'
                    }}
                  />
                  <div
                    class="tk-color-picker-slider-overlay"
                    style={{
                      backgroundImage: `linear-gradient(90deg, transparent, ${this.hslaToHex(this.internalHSLA)})`,
                      insetInline: '-12px'
                    }}
                  />
                  <div
                    class="tk-color-picker-slider-overlay"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, .1) 0 0 0 1px inset, rgb(0, 0, 0, .15) 0 0 4px inset',
                      insetInline: '-12px'
                    }}
                  />

                  <div
                    class="tk-color-picker-slider-thumb"
                    style={{ left: `${this.internalHSLA.a * 100}%` }}
                  />
                </div>
              </div>

              <div class="tk-color-picker-preview">
                <div
                  class="tk-color-picker-preview-color"
                  style={{ backgroundColor: this.hslaToCss(this.internalHSLA) }}
                />
              </div>
            </div>

            <div class="tk-color-picker-inputs">
              <tk-select
                class="tk-color-picker-format-select"
                size="small"
                label="Format"
                value={this.format}
                optionValueKey="symbol"
                on-Tk-change={e => {
                  this.format = e.detail as any;
                }}
                options={[
                  { value: 'hex', label: 'HEX' },
                  { value: 'rgba', label: 'RGBA' },
                  { value: 'hsl', label: 'HSL' },
                ]}
              />
              <div class="tk-color-picker-input-group">
                {/* Gerekirse burada R / G / B ya da H / S / L inputları yönetebilirsin */}
              </div>
              <tk-input
                class="tk-color-picker-alpha-input"
                mode="number"
                size="small"
                value={(this.internalHSLA.a * 100).toFixed(0)}
                onTk-change={e => {
                  const aNum = Number(e.detail) / 100;
                  this.internalHSLA = { ...this.internalHSLA, a: Math.max(0, Math.min(1, aNum)) };
                  this.emitChange();
                }}
              />
            </div>
          </div>
        </div>

        <div class="tk-color-picker-presets">
          <div class="tk-color-picker-presets-grid">
            {['#326FD1', '#C79807', '#A45E3C', '#119C8D', '#EDBBA3', '#ABC9FB', '#D0E1FD', '#FF6259'].map(color => (
              <div
                class="tk-color-picker-preset"
                style={{ backgroundColor: color }}
                onClick={() => this.selectPreset(color)}
              />
            ))}
          </div>
        </div>

        <div class="tk-color-picker-panel-footer">
          <div class="tk-color-picker-footer-actions">
            <tk-button
              class="tk-color-picker-cancel"
              size="small"
              type="text"
              onTk-click={() => (this.isOpen = false)}
            >
              Cancel
            </tk-button>
            <tk-button
              class="tk-color-picker-apply"
              size="small"
              onTk-click={() => this.emitChange()}
            >
              Apply
            </tk-button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const rootCls = classNames('tk-color-picker', {
      'tk-color-picker-inline': this.inline,
      'tk-color-picker-slider-overlay': !this.inline,
    });

    return (
      <div class={rootCls}>
        {this.renderTrigger()}
        {this.renderPanel()}
      </div>
    );
  }

  @Method()
  async setValue(color: string) {
    this.value = color;
    this.internalHSLA = this.parseColor(color);
  }
}
