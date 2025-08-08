import { p as proxyCustomElement, H, c as createEvent, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { d as defineCustomElement$2 } from './p-DrRHtkyE.js';

const tkSliderScss =
  '.tk-slider{display:flex;flex-direction:column;gap:var(--slider-gap, 8px)}.tk-slider-label{display:flex;padding:var(--external-label-large-label-v-padding, 0px) 4px;align-items:center;align-self:stretch;font-family:var(--label-s-font, Geologica);font-size:var(--label-m-base-size, 14px);font-style:normal;font-weight:400;line-height:var(--label-m-base-line-height, 20px);color:var(--text-primary, #1e1e1e)}.tk-slider-disabled .tk-slider-label{color:var(--text-sub-base, #99a0ae)}.tk-slider-label .asterisk{color:var(--states-danger-base, #c90019);margin-left:4px;font-size:14px}.tk-slider-track-wrapper{position:relative;height:6px;background:var(--background-light, #e1e4ea);border-radius:8px;display:flex;flex-direction:column;align-items:flex-start;gap:var(--slider-content-gap, 10px);align-self:stretch;padding:var(--slider-v-padding, 0px) var(--slider-h-padding, 0px)}.tk-slider-track{position:relative;width:100%;height:100%}.tk-slider-fill{position:absolute;height:6px;background:var(--primary-base, #c90019);border-radius:8px;top:0}.tk-slider-disabled .tk-slider-fill{background:var(--background-sub-base, #cacfd8)}.tk-slider-thumb{display:flex;justify-content:center;align-items:center;position:absolute;top:50%;left:0;transform:translate(-50%, -50%);width:16px;height:16px;border-radius:50%;border:1px solid var(--static-Light, #fff);background:var(--primary-base, #c90019);z-index:2;cursor:pointer;transition:box-shadow 0.2s ease}.tk-slider-thumb svg{width:8px;height:8px;display:block;transform:scale(1.2);transform-origin:center}.tk-slider-thumb svg circle{fill:white}.tk-slider-thumb-active{background:white;border:1px solid var(--primary-base, #c90019)}.tk-slider-thumb-active svg circle{fill:var(--primary-base, #c90019)}.tk-slider-thumb-disabled{background:var(--background-sub-base, #cacfd8);cursor:not-allowed}.tk-slider-thumb-disabled svg circle{fill:white}.tk-slider-thumb-active{box-shadow:0 0 0 2px var(--primary-base, #c90019)}.tk-slider-labels{display:flex;justify-content:space-between;flex-direction:row;width:100%;font-size:11px;line-height:16px;color:var(--text-base, #6b7280);text-transform:uppercase;font-family:var(--subheading-2xs-font, Geologica);font-weight:400}.tk-slider-labels-disabled{color:var(--text-light, #cacfd8)}.tk-slider-ticks{display:flex;padding:4px var(--slider-h-padding, 8px);flex-direction:column;align-items:center;align-self:stretch;width:100%}.tk-slider-tick-track{display:flex;height:8px;justify-content:space-between;align-items:flex-end;align-self:stretch;width:100%}.tk-slider-tick{width:2px;height:8px;border-radius:4px;background:var(--background-sub-base, #cacfd8)}.tk-slider-tooltip{position:absolute;top:160%;left:50%;transform:translateX(-50%);background:#191c22;color:white;padding:4px 8px;font-size:12px;font-family:var(--subheading-xs-font, Geologica);font-weight:400;border-radius:6px;white-space:nowrap;box-shadow:0 2px 6px rgba(0, 0, 0, 0.2);z-index:3}.tk-slider-tooltip-arrow{position:absolute;top:-4px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid #191c22}.tk-slider-hint,.tk-slider-error{display:flex;align-items:center;gap:6px;font-family:var(--subheading-xs-font, Geologica);font-size:12px;font-weight:400;line-height:16px;margin-top:4px}.tk-slider-hint{color:var(--text-base, #6b7280)}.tk-slider-error{color:var(--states-danger-base, #c90019)}.tk-slider-hint i,.tk-slider-error i{font-size:16px;color:inherit}';

const TkSlider$1 = /*@__PURE__*/ proxyCustomElement(
  class TkSlider extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkChange = createEvent(this, 'tkChange', 7);
      /** The minimum value the slider can take */
      this.min = 0;
      /** The maximum value the slider can take */
      this.max = 100;
      /** The increment step for the slider value (e.g., step = 5 → 0, 5, 10, ...) */
      this.step = 1;
      /** Whether the slider is disabled (non-interactive if true) */
      this.disabled = false;
      /** Whether the slider operates in range mode (true) or single value mode (false) */
      this.range = false;
      /** Current value of the slider. If `range` is true, it should be [min, max] */
      this.value = 0;
      /** Whether the bottom label/tick section should be visible */
      this.rangeVisibility = true;
      /**
       * The type of visual indicator shown below the track.
       * 'labels' shows min/max values, 'ticks' shows evenly spaced tick marks
       */
      this.type = 'labels';
      /** Whether to show a red asterisk next to the label (typically for required fields) */
      this.showAsterisk = false;
      /** Marks the slider as invalid; used to apply error styling */
      this.invalid = false;
      this.draggingThumb = null;
      this.handlePointerMove = e => {
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
        if (this.range) {
          this.tkChange.emit([this.currentMin, this.currentMax]);
        } else {
          this.tkChange.emit(this.currentMin);
        }
      };
      this.handlePointerUp = () => {
        this.draggingThumb = null;
        document.removeEventListener('pointermove', this.handlePointerMove);
        document.removeEventListener('pointerup', this.handlePointerUp);
      };
    }
    componentWillLoad() {
      if (this.range && Array.isArray(this.value)) {
        const sorted = [...this.value].sort((a, b) => a - b);
        this.currentMin = sorted[0];
        this.currentMax = sorted[1];
      } else if (typeof this.value === 'number') {
        this.currentMin = this.clamp(this.value);
      }
    }
    getPercentage(value) {
      return ((value - this.min) / (this.max - this.min)) * 100;
    }
    handlePointerDown(thumb) {
      if (this.disabled) return;
      this.draggingThumb = thumb;
      document.addEventListener('pointermove', this.handlePointerMove);
      document.addEventListener('pointerup', this.handlePointerUp);
    }
    clamp(value) {
      return Math.max(this.min, Math.min(this.max, value));
    }
    render() {
      const minPercent = this.getPercentage(this.currentMin);
      const maxPercent = this.range ? this.getPercentage(this.currentMax) : 0;
      const isMinActive = this.draggingThumb === 'min';
      const isMaxActive = this.draggingThumb === 'max';
      return h(
        'div',
        { key: '890aa5f61d741fed400403d5c921fa5f8c98bff7', class: `tk-slider ${this.disabled ? 'tk-slider-disabled' : ''}` },
        this.label &&
          h(
            'label',
            { key: 'fb8ed7ea30c7c02ab05b0b8ae29852da4f67d06b', class: 'tk-slider-label' },
            this.label,
            this.showAsterisk && h('span', { key: 'c21d0821dfbc302c1de1979f607ce9ddf923c6a5', class: 'asterisk' }, '*'),
          ),
        h(
          'div',
          { key: 'be2296a16f1e1953c522fd68e20d6c14aaf64eaf', class: 'tk-slider-track-wrapper' },
          h(
            'div',
            { key: 'd022e00c787e411b7963afaf0ae6f687b5d8799f', class: 'tk-slider-track', ref: el => (this.trackRef = el) },
            this.range
              ? h('div', {
                  class: 'tk-slider-fill',
                  style: {
                    left: `${minPercent}%`,
                    width: `${maxPercent - minPercent}%`,
                  },
                })
              : h('div', { class: 'tk-slider-fill', style: { width: `${minPercent}%` } }),
            h(
              'div',
              {
                key: '82c70cb625bff2f9511709ca71fe2c46e643cf11',
                class: classNames('tk-slider-thumb', {
                  'tk-slider-thumb-disabled': this.disabled,
                  'tk-slider-thumb-active': isMinActive,
                }),
                style: { left: `${minPercent}%` },
                onPointerDown: !this.disabled ? () => this.handlePointerDown('min') : undefined,
              },
              !this.disabled &&
                (isMinActive || this.draggingThumb === 'min') &&
                h(
                  'div',
                  { key: '4b5e3a70139c5b4af42fcea7cb634eab7b71354b', class: 'tk-slider-tooltip' },
                  this.currentMin,
                  h('div', { key: '725bd6ef91fc90925f067e28bb629c873c95ecc4', class: 'tk-slider-tooltip-arrow' }),
                ),
              h(
                'svg',
                { key: '4594730e0b3f42e190a4384911147a4ee25b03bb', xmlns: 'http://www.w3.org/2000/svg', width: '8', height: '8' },
                h('circle', { key: 'ea8a9b5acc7d745a66e46014425f4f572a57df87', cx: '4', cy: '4', r: '4' }),
              ),
            ),
            this.range &&
              h(
                'div',
                {
                  key: 'a81bd9703f499d9f948146ea78e7fdb2ff1334d5',
                  class: classNames('tk-slider-thumb', {
                    'tk-slider-thumb-disabled': this.disabled,
                    'tk-slider-thumb-active': isMaxActive,
                  }),
                  style: { left: `${maxPercent}%` },
                  onPointerDown: !this.disabled ? () => this.handlePointerDown('max') : undefined,
                },
                !this.disabled &&
                  (isMaxActive || this.draggingThumb === 'max') &&
                  h(
                    'div',
                    { key: '4d6960fc76cd074d810cfd5b4803446d9c9b7684', class: 'tk-slider-tooltip' },
                    this.currentMax,
                    h('div', { key: '9ab00cb6c193e13e7cedecfc112806c3c67e2232', class: 'tk-slider-tooltip-arrow' }),
                  ),
                h(
                  'svg',
                  { key: '6bbe54a27ff5a1fa329f534011d7777236430f6c', xmlns: 'http://www.w3.org/2000/svg', width: '8', height: '8' },
                  h('circle', { key: 'dccc61255dc560978453f614ee1adaaf24a49836', cx: '4', cy: '4', r: '4' }),
                ),
              ),
          ),
        ),
        this.type === 'labels' &&
          this.rangeVisibility &&
          h(
            'div',
            { key: 'bd066cb61616ef39b9ea0885ea8f4168f3694f77', class: 'tk-slider-labels' },
            h('span', { key: 'b9fdf9b0964db4eddef0bd16775b2e561a78f7d0' }, this.min),
            h('span', { key: '5133b56c429f984688daa9ba39e272be44baf64f' }, this.max),
          ),
        this.type === 'ticks' &&
          h(
            'div',
            { key: 'f49d5ff91bcbba855ca78bafcde4acf6e1c7a8f1', class: 'tk-slider-ticks' },
            h(
              'div',
              { key: '35e2c978368e4b35756cb1c4ae5b9fc2ea874b1e', class: 'tk-slider-tick-track' },
              Array.from({ length: Math.floor((this.max - this.min) / this.step) + 1 }).map((_, index) => h('div', { key: index, class: 'tk-slider-tick' })),
            ),
          ),
        (this.hint || (this.invalid && this.error)) &&
          h(
            'div',
            { key: '933e3ae102c094b7d0e6f117c100192d25b333ad', class: classNames('tk-slider-hint', { 'tk-slider-error': this.invalid }) },
            h('tk-icon', { key: 'ffba4e64c7b9266aacbc72956d60a18807ca786a', icon: 'info', size: 'small' }),
            h('span', { key: '79618035b7376034c6e02a497ba012ca56d1b24a' }, this.invalid ? this.error : this.hint),
          ),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkSliderScss;
    }
  },
  [
    1,
    'tk-slider',
    {
      label: [1],
      min: [2],
      max: [2],
      step: [2],
      disabled: [4],
      range: [4],
      value: [2],
      rangeVisibility: [4, 'range-visibility'],
      type: [1],
      showAsterisk: [4, 'show-asterisk'],
      invalid: [4],
      error: [1],
      hint: [1],
      currentMin: [32],
      currentMax: [32],
      draggingThumb: [32],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-slider', 'tk-icon'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-slider':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkSlider$1);
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
    }
  });
}

const TkSlider = TkSlider$1;
const defineCustomElement = defineCustomElement$1;

export { TkSlider, defineCustomElement };
//# sourceMappingURL=tk-slider.js.map

//# sourceMappingURL=tk-slider.js.map
