import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

@Component({
  tag: 'tk-color-picker',
  styleUrl: 'tk-color-picker.scss',
  shadow: true,
})
export class TkColorPicker {
  private uniqueId: string;
  private inputRef?: HTMLTkInputElement;
  private panelRef?: HTMLDivElement;
  private windowClickHandler: (event: MouseEvent) => void;
  private cleanup;

  @Element() el: HTMLTkColorPickerElement;

  constructor() {
    this.uniqueId = uuidv4();
    this.windowClickHandler = this.handleWindowClick.bind(this);
  }

  @State() hasTriggerSlot: boolean;
  @State() formatSelectValue: any;
  @State() isOpen: boolean = false;
  @Watch('isOpen')
  isOpenChanged(newValue: boolean) {
      if (!this.inline) {
        if (newValue) {
        }
      }
  }
  
  /**
   * The value representing the selected color
   */
  @Prop() value: string;

  /**
   * Whether to display inline panel
   * @defaultValue false
   */
  @Prop() inline: boolean = false;

  componentWillLoad() {
    this.hasTriggerSlot = !!this.el.querySelector('[slot="trigger"]');
  }

  componentDidUpdate() {
    if (this.isOpen) {
      if (this.inputRef && this.panelRef) {
        this.cleanup = autoUpdate(this.inputRef.querySelector('.tk-color-picker-trigger'), this.panelRef, () => this.updatePosition(), {
          animationFrame: true,
        });
      }
      this.bindWindowClickListener();
    } else {
      this.cleanup && this.cleanup();
      this.unbindWindowClickListener();
    }
  }

  private updatePosition() {
    if (this.inputRef && this.panelRef) {
      computePosition(this.inputRef?.querySelector('.tk-color-picker-trigger'), this.panelRef, {
        strategy: 'fixed',
        placement: 'bottom-start',
        middleware: [offset(4), flip(), shift({ padding: 5 })],
      }).then(({ x, y }) => {
        Object.assign(this.panelRef.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
  }

  private bindWindowClickListener() {
    window.addEventListener('click', this.windowClickHandler);
  }

  private unbindWindowClickListener() {
    window.removeEventListener('click', this.windowClickHandler);
  }
  private handleWindowClick(event: MouseEvent) {
    const isInnerClicked = event.composedPath().some(item => item == this.el);
    if (!isInnerClicked) {
      // this.isOpen = false;
      this.unbindWindowClickListener();
    }
  }

  private handleTriggerClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.inline) {
      return;
    }
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unbindWindowClickListener();
    } else {
      this.bindWindowClickListener();
    }
  }

  private renderTrigger() {
    const triggerClasses = classNames("tk-color-picker-trigger");

    if (this.hasTriggerSlot) return <slot name="trigger"></slot>;

    return (  
      <div class={triggerClasses} onClick={(e) => this.handleTriggerClick(e)}>
        <div class="tk-color-picker-color-preview">
          <div class="tk-color-picker-color-preview-inner"></div>
          <tk-divider orientation='vertical'></tk-divider>
        </div>
        <div class="tk-color-picker-trigger-text">
          <span>#000000</span>
        </div>
      </div>
    );
  };

  private renderPanel() {
    if (!this.isOpen && !this.inline) return null;

    const panelClasses = classNames('tk-color-picker-panel', {
      'tk-color-picker-panel-inline': this.inline,
      'tk-color-picker-panel-overlay': !this.inline,
    });

    return (
      <div
        class={panelClasses}
        ref={el => (this.panelRef = el as HTMLDivElement)}
        role={!this.inline ? 'dialog' : null}
        aria-modal="true"
        data-tk-color-picker-id={this.uniqueId}
      >
        <div class="tk-color-picker-panel-header">
          <span class="tk-color-picker-panel-header-title">Color Picker</span>
          <button class="tk-color-picker-panel-close" onClick={() => this.isOpen = false}>
            <tk-icon icon="x" size="small"></tk-icon>
          </button>
        </div>
        <div class="tk-color-picker-panel-body">
          <div class="tk-color-picker-saturation" style={{ backgroundColor: 'hsl(200, 100%, 50%)' }}>
            <div class="tk-color-picker-saturation-white"></div>
            <div class="tk-color-picker-saturation-black"></div>
            <div class="tk-color-picker-saturation-pointer" style={{ left: '50%', top: '30%' }}></div>
          </div>

          <div class="tk-color-picker-controls">
            <div class="tk-color-picker-sliders">
              <button class="tk-color-picker-eyedropper">
                <tk-icon iconType='outlined' variant='neutral' icon="colorize" size="small"></tk-icon>
              </button>

              <div class="tk-color-picker-slider-group">
                <div class="tk-color-picker-slider tk-color-picker-hue">
                  <div class="tk-color-picker-slider-thumb" style={{ left: '55%' }}></div>
                </div>
                <div class="tk-color-picker-slider tk-color-picker-alpha">
                  <div class="tk-color-picker-slider-thumb" style={{ left: '100%' }}></div>
                </div>
              </div>

              <div class="tk-color-picker-preview">
                <div class="tk-color-picker-preview-color" style={{ backgroundColor: '#326FD1' }}></div>
              </div>
            </div>

            <div class="tk-color-picker-inputs">
              <tk-select
                class="tk-color-picker-format-select"
                size="small"
                label="Key Value Select"
                value={this.formatSelectValue}
                optionValueKey="symbol"
                on-Tk-change={(e)=>{
                  this.formatSelectValue = e.detail;
                }}
                options={[
                  { value: 'rgb', label: 'RGB' },
                  { value: 'hex', label: 'HEX' },
                  { value: 'hsl', label: 'HSL' },
                ]}
              />

              <div class="tk-color-picker-input-group">
                <tk-input mode='number' size='small' value={229} onTk-change={(e) => {console.log(e)}} />
                <tk-input mode='number' size='small' value={229} onTk-change={(e) => {console.log(e)}} />
                <tk-input mode='number' size='small' value={229} onTk-change={(e) => {console.log(e)}} />
                <tk-input mode='number' size='small' value={229} onTk-change={(e) => {console.log(e)}} />
              </div>

             <tk-input
                class="tk-color-picker-alpha-input"
                mode="number"
                size="small"
                value="100"
              />
            </div>
          </div>
        </div>

        <div class="tk-color-picker-presets">
          <div class="tk-color-picker-presets-grid">
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#326FD1' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#C79807' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#A45E3C' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#119C8D' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#EDBBA3' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#ABC9FB' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#D0E1FD' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#FF6259' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#717784' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#85B2F9' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#EAD6FD' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#EDBBA3' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#85B2F9' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#326FD1' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#C79807' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#A45E3C' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#119C8D' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#EDBBA3' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#EAD6FD' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#EDBBA3' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#ABC9FB' }}></div>
            <div class="tk-color-picker-preset" style={{ backgroundColor: '#D0E1FD' }}></div>
          </div>
        </div>

        <div class="tk-color-picker-panel-footer">
          <div class="tk-color-picker-footer-actions">
            <tk-button size="small" type="text" variant='neutral'>Cancel</tk-button>
            <tk-button size="small">Apply</tk-button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const rootClasses = classNames('tk-color-picker', {
      'tk-color-picker-inline': this.inline,
      'tk-color-picker-overlay': !this.inline,
    });

    return (
      <div class={rootClasses}>
        {this.renderTrigger()}
        {this.renderPanel()}
      </div>
    );
  }
}