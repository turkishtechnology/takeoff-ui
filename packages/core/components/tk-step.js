import { p as proxyCustomElement, H, h, d as Host } from './p-F5eU3Bfi.js';

const tkStepCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}';

const TkStep$1 = /*@__PURE__*/ proxyCustomElement(
  class TkStep extends H {
    constructor() {
      super();
      this.__registerHost();
      /**
       * Indicates if the step has been completed.
       */
      this.complete = false;
      /**
       * Indicates if the step has encountered an error.
       */
      this.error = false;
      /**
       * Indicates if the step is currently active.
       */
      this.isActive = false;
      /**
       * Whether the step is clickable.
       */
      this.isClickable = true;
      /**
       * Controls the label position of the step.
       * @defaultValue 'non-flip'
       */
      this.labelPosition = 'non-flip';
      /**
       * Controls the step mode of the stepper component.
       * @defaultValue 'basic'
       */
      this.stepMode = 'basic';
      /**
       * Indicates if the step is disabled (cannot be selected or interacted with).
       */
      this.disabled = false;
    }
    render() {
      return h(Host, { key: 'e850069a1832293b72f04b1d6684926eec40b0e1' }, h('slot', { key: '3b4b763bb63691a9508953f3f578a7ac9efe9ec1' }));
    }
    get el() {
      return this;
    }
    static get style() {
      return tkStepCss;
    }
  },
  [
    4,
    'tk-step',
    {
      header: [1],
      subheader: [1],
      icon: [1],
      completeIcon: [1, 'complete-icon'],
      activeIcon: [1, 'active-icon'],
      inactiveIcon: [1, 'inactive-icon'],
      errorIcon: [1, 'error-icon'],
      complete: [4],
      error: [4],
      isActive: [4, 'is-active'],
      index: [2],
      isClickable: [4, 'is-clickable'],
      labelPosition: [1, 'label-position'],
      stepMode: [1, 'step-mode'],
      disabled: [4],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-step'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-step':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkStep$1);
        }
        break;
    }
  });
}

const TkStep = TkStep$1;
const defineCustomElement = defineCustomElement$1;

export { TkStep, defineCustomElement };
//# sourceMappingURL=tk-step.js.map

//# sourceMappingURL=tk-step.js.map
