import { Component, h, Prop, State, Event, Element, EventEmitter } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'tk-slider',
  styleUrl: 'tk-slider.scss',
  shadow: true,
})
export class TkSlider {
  @Element() el: HTMLElement;

  @Prop() label?: string;
  @Prop() min: number = 0;
  @Prop() max: number = 100;
  @Prop() step: number = 1;
  @Prop() disabled: boolean = false;
  @Prop() range: boolean = false;
  @Prop() value: number | [number, number] = 0;
  @Prop() rangeVisibility: boolean = true;
  @Prop() type: 'labels' | 'ticks' = 'labels';
  @Prop() showAsterisk: boolean = false;
  @Prop() invalid: boolean = false;
  @Prop() error?: string;
  @Prop() hint?: string;

  @State() private currentMin: number;
  @State() private currentMax: number;
  @State() private draggingThumb: 'min' | 'max' | null = null;

  @Event() tkChange: EventEmitter<number | [number, number]>;

  private trackRef: HTMLDivElement;

  componentWillLoad() {
    if (this.range && Array.isArray(this.value)) {
      const sorted = [...this.value].sort((a, b) => a - b);
      this.currentMin = sorted[0];
      this.currentMax = sorted[1];
    } else if (typeof this.value === 'number') {
      this.currentMin = this.clamp(this.value);
    }
  }

  private getPercentage(value: number): number {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  private handleMouseDown(thumb: 'min' | 'max') {
    if (this.disabled) return;
    this.draggingThumb = thumb;
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.draggingThumb || !this.trackRef) return;
    const rect = this.trackRef.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const value = this.clamp(this.min + percent * (this.max - this.min));
    const snapped = Math.round(value / this.step) * this.step;

    if (this.draggingThumb === 'min') {
      if (snapped > this.currentMax) {
        this.currentMin = this.currentMax;
        this.currentMax = snapped;
        this.draggingThumb = 'max';
      } else {
        this.currentMin = snapped;
      }
    } else {
      if (snapped < this.currentMin) {
        this.currentMax = this.currentMin;
        this.currentMin = snapped;
        this.draggingThumb = 'min';
      } else {
        this.currentMax = snapped;
      }
    }

    this.emitChange();
  };

  private handleMouseUp = () => {
    this.draggingThumb = null;
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  private emitChange() {
    if (this.range) {
      this.tkChange.emit([this.currentMin, this.currentMax]);
    } else {
      this.tkChange.emit(this.currentMin);
    }
  }

  private clamp(value: number): number {
    return Math.max(this.min, Math.min(this.max, value));
  }

  render() {
    const minPercent = this.getPercentage(this.currentMin);
    const maxPercent = this.range ? this.getPercentage(this.currentMax) : 0;
    const isMinActive = this.draggingThumb === 'min';
    const isMaxActive = this.draggingThumb === 'max';

    return (
      <div class={`tk-slider ${this.disabled ? 'tk-slider-disabled' : ''}`}>
        {this.label && (
          <label class="tk-slider-label">
            {this.label}
            {this.showAsterisk ? <span class="asterisk">*</span> : null}
          </label>
        )}
        <div class="tk-slider-track-wrapper">
          <div class="tk-slider-track" ref={el => (this.trackRef = el)}>
            {this.range ? (
              <div
                class="tk-slider-fill"
                style={{
                  left: `${minPercent}%`,
                  width: `${maxPercent - minPercent}%`,
                }}
              ></div>
            ) : (
              <div class="tk-slider-fill" style={{ width: `${minPercent}%` }}></div>
            )}

            <div
              class={['tk-slider-thumb', this.disabled && 'tk-slider-thumb-disabled', isMinActive && 'tk-slider-thumb-active'].filter(Boolean).join(' ')}
              style={{ left: `${minPercent}%` }}
              onMouseDown={!this.disabled ? () => this.handleMouseDown('min') : undefined}
              onMouseEnter={() => (this.draggingThumb = 'min')}
              onMouseLeave={() => (this.draggingThumb = null)}
            >
              {!this.disabled && (isMinActive || this.draggingThumb === 'min') && (
                <div class="tk-slider-tooltip">
                  {this.currentMin}
                  <div class="tk-slider-tooltip-arrow"></div>
                </div>
              )}

              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8">
                <circle cx="4" cy="4" r="4" />
              </svg>
            </div>

            {this.range && (
              <div
                class={['tk-slider-thumb', this.disabled && 'tk-slider-thumb-disabled', isMaxActive && 'tk-slider-thumb-active'].filter(Boolean).join(' ')}
                style={{ left: `${maxPercent}%` }}
                onMouseDown={!this.disabled ? () => this.handleMouseDown('max') : undefined}
                onMouseEnter={() => (this.draggingThumb = 'max')}
                onMouseLeave={() => (this.draggingThumb = null)}
              >
                {!this.disabled && (isMaxActive || this.draggingThumb === 'max') && (
                  <div class="tk-slider-tooltip">
                    {this.currentMax}
                    <div class="tk-slider-tooltip-arrow"></div>
                  </div>
                )}

                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {this.type === 'labels' && this.rangeVisibility && (
          <div class="tk-slider-labels">
            <span>{this.min}</span>
            <span>{this.max}</span>
          </div>
        )}

        {this.type === 'ticks' && (
          <div class="tk-slider-ticks">
            <div class="tk-slider-tick-track">
              {Array.from({ length: Math.floor((this.max - this.min) / this.step) + 1 }).map((_, index) => (
                <div key={index} class="tk-slider-tick"></div>
              ))}
            </div>
          </div>
        )}

        {(this.hint || (this.invalid && this.error)) && (
          <div class={classNames('tk-slider-hint', { 'tk-slider-error': this.invalid })}>
            <tk-icon icon="info" size="small" />
            <span>{this.invalid ? this.error : this.hint}</span>
          </div>
        )}
      </div>
    );
  }
}
