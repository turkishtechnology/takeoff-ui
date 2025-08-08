import { p as proxyCustomElement, H, c as createEvent, h } from './p-CsLMRZQo.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkStepperCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}.tk-stepper{display:flex;width:100%;margin:0;padding:0;font-family:"Geologica";text-align:initial;list-style:none;box-sizing:border-box}.tk-stepper.tk-stepper-horizontal{flex-direction:row;overflow-x:auto}.tk-stepper.tk-stepper-horizontal .tk-step-item{flex:1}.tk-stepper.tk-stepper-horizontal .tk-step-item:last-child{flex:none}.tk-stepper.tk-stepper-horizontal .tk-step-item .tk-step .tk-step-sign{margin-inline-start:40px;margin-inline-end:8px;vertical-align:top}.tk-stepper.tk-stepper-horizontal .tk-step-item .tk-step .tk-step-rail{position:absolute;top:14px;font-size:0px;width:calc(100% - 48px);padding:0 24px;inset-inline-start:0;margin-inline-start:56px}.tk-stepper.tk-stepper-horizontal .tk-step-item .tk-step .tk-step-rail::after{content:"";display:inline-block;height:2px;width:100%;background-color:var(--border-light);border-radius:var(--radius-full)}.tk-stepper.tk-stepper-horizontal .tk-step-item .tk-step .tk-step-content{display:flex;width:112px;margin-top:var(--stepper-items-content-gap);text-align:center;flex-direction:column;align-items:center;flex-shrink:0}.tk-stepper.tk-stepper-vertical{flex-direction:column;align-items:flex-start}.tk-stepper.tk-stepper-vertical .tk-step-item{display:block;flex:1 0 auto;padding-inline-start:0;overflow:visible}.tk-stepper.tk-stepper-vertical .tk-step-item:last-child{flex:none}.tk-stepper.tk-stepper-vertical .tk-step-item .tk-step{display:flex;flex-direction:row;align-items:flex-start}.tk-stepper.tk-stepper-vertical .tk-step-item .tk-step .tk-step-sign{float:left;margin-inline-end:8px}.tk-stepper.tk-stepper-vertical .tk-step-item .tk-step .tk-step-rail{position:absolute;top:0px;font-size:0px;height:calc(100% - 48px);padding:40px 0;width:2px;inset-inline-start:15px}.tk-stepper.tk-stepper-vertical .tk-step-item .tk-step .tk-step-rail::after{content:"";display:inline-block;width:2px;height:100%;background-color:var(--border-light);border-radius:var(--radius-full)}.tk-stepper.tk-stepper-vertical .tk-step-item .tk-step .tk-step-content{display:block;min-height:80px;overflow:hidden}.tk-stepper .tk-step-item{position:relative;display:inline-block;vertical-align:top;overflow:visible}.tk-stepper .tk-step-item:last-child .tk-step-rail{display:none}.tk-stepper .tk-step-item .tk-step-container{outline:none}.tk-stepper .tk-step-item .tk-step-container .tk-step{cursor:pointer}.tk-stepper .tk-step-item .tk-step-container .tk-step .tk-step-sign{display:flex;justify-content:center;align-items:center;width:28px;height:28px;border:2px solid var(--border-light);background-color:var(--static-white);border-radius:var(--radius-full);text-align:center}.tk-stepper .tk-step-item .tk-step-container .tk-step .tk-step-sign .tk-step-icon,.tk-stepper .tk-step-item .tk-step-container .tk-step .tk-step-sign .tk-step-number,.tk-stepper .tk-step-item .tk-step-container .tk-step .tk-step-sign .tk-step-icon-error,.tk-stepper .tk-step-item .tk-step-container .tk-step .tk-step-sign svg{position:relative;line-height:1;font-size:var(--size-xl);width:20px;height:20px}.tk-stepper .tk-step-item .tk-step-container .tk-step .tk-step-sign .tk-step-icon-dot svg{width:12px;height:12px}.tk-stepper .tk-step-item .tk-step-container .tk-step .tk-step-sign .tk-step-icon-complete svg{width:14px;height:12px}.tk-stepper .tk-step-item .tk-step-container .tk-step .tk-step-rail::after{transition:background-color 0.2s ease-in-out}.tk-stepper .tk-step-item .tk-step-container .tk-step .tk-step-content .tk-step-header{color:var(--text-dark);font-family:var(--desktop-family-body);font-size:var(--desktop-size-sm);font-weight:var(--desktop-weight-medium);line-height:var(--desktop-line-height-sm-normal)}.tk-stepper .tk-step-item .tk-step-container .tk-step .tk-step-content .tk-step-subheader{color:var(--text-base);font-family:var(--desktop-family-body);font-size:var(--desktop-size-xs, 12px);font-weight:var(--desktop-weight-regular, 400);line-height:var(--desktop-line-height-xs-normal, 1.5)}.tk-stepper .tk-step-item .tk-step-container .tk-step.tk-step-disabled{cursor:not-allowed}.tk-stepper .tk-step-item .tk-step-container .tk-step:not(.tk-step-disabled).tk-step-active .tk-step-sign{border-color:var(--primary-base);background-color:var(--primary-base);color:var(--static-white)}.tk-stepper .tk-step-item .tk-step-container .tk-step:not(.tk-step-disabled).tk-step-active .tk-step-sign .tk-step-icon,.tk-stepper .tk-step-item .tk-step-container .tk-step:not(.tk-step-disabled).tk-step-active .tk-step-sign svg{color:var(--static-white)}.tk-stepper .tk-step-item .tk-step-container .tk-step:not(.tk-step-disabled).tk-step-active .tk-step-header{color:var(--text-darkest)}.tk-stepper .tk-step-item .tk-step-container .tk-step:not(.tk-step-disabled).tk-step-inactive .tk-step-sign{border-color:var(--border-light);color:var(--border-light)}.tk-stepper .tk-step-item .tk-step-container .tk-step:not(.tk-step-disabled).tk-step-inactive .tk-step-sign svg circle{fill:var(--border-light)}.tk-stepper .tk-step-item .tk-step-container .tk-step:not(.tk-step-disabled).tk-step-completed .tk-step-sign{border-color:var(--primary-base);color:var(--primary-base)}.tk-stepper .tk-step-item .tk-step-container .tk-step:not(.tk-step-disabled).tk-step-completed .tk-step-sign .tk-step-icon{color:var(--primary-base)}.tk-stepper .tk-step-item .tk-step-container .tk-step:not(.tk-step-disabled).tk-step-completed .tk-step-rail::after{background-color:var(--primary-base)}.tk-stepper .tk-step-item .tk-step-container .tk-step:not(.tk-step-disabled).tk-step-error .tk-step-sign{border-color:var(--states-danger-base);color:var(--states-danger-base);background:var(--states-danger-base)}.tk-stepper .tk-step-item .tk-step-container .tk-step:not(.tk-step-disabled).tk-step-error .tk-step-sign .tk-step-icon{color:var(--static-light)}.tk-stepper .tk-step-item .tk-step-container .tk-step:not(.tk-step-disabled).tk-step-error .tk-step-sign svg path{fill:var(--static-light)}.tk-stepper .tk-step-item .tk-step-container .tk-step:not(.tk-step-disabled).tk-step-error .tk-step-content .tk-step-header{color:var(--states-danger-base)}';

const TkStepper$1 = /*@__PURE__*/ proxyCustomElement(
  class TkStepper extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkStepChange = createEvent(this, 'tk-step-change', 7);
      this.tkStepClick = createEvent(this, 'tk-step-click', 7);
      this.mutationObserver = null;
      this.steps = [];
      /**
       * Controls if the tabs component is controlled.
       * @defaultValue false
       */
      this.controlled = false;
      /**
       * Controls the orientation of the stepper component.
       * @defaultValue 'horizontal'
       */
      this.orientation = 'horizontal';
      /**
       * Controls the step mode of the stepper component.
       * @defaultValue 'basic'
       */
      this.stepMode = 'basic';
      /**
       * Whether the steps follow a linear progression (can only navigate to the next step when current step is completed).
       * @defaultValue false
       */
      this.linear = false;
      /**
       * Currently active step index
       * @defaultValue 0
       */
      this.active = 0;
      /**
       * Whether to show completed steps with the complete state.
       * If false, completed steps will appear as just passed and not with complete styling.
       * @defaultValue true
       */
      this.showCompleteState = true;
      /**
       * The style attribute of container element
       */
      this.containerStyle = null;
      /**
       * The style attribute of content elements
       */
      this.contentStyle = null;
      /**
       * The style attribute of step sign elements
       */
      this.signStyle = null;
      this.handleStepClick = index => {
        const step = this.steps[index];
        const status = step.disabled ? 'disabled' : step.error ? 'error' : step.complete ? 'completed' : step.isActive ? 'active' : 'inactive';
        this.tkStepClick.emit({ index, status });
        this.setActive(index);
      };
    }
    activeChanged(newValue) {
      this.updateStepsState(newValue);
    }
    showCompleteStateChanged() {
      this.updateStepsState(this.active);
    }
    componentWillLoad() {
      this.initializeSteps();
    }
    componentDidLoad() {
      this.setupMutationObserver();
    }
    disconnectedCallback() {
      var _a;
      (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    /**
     * Sets the active step index.
     * @param index - The index of the step to set as active.
     */
    async setActive(index) {
      if (index >= 0 && index < this.steps.length && this.canStepBeSelected(index) && index !== this.active) {
        if (!this.controlled) {
          this.active = index;
        }
        this.tkStepChange.emit(index);
      }
    }
    setupMutationObserver() {
      this.mutationObserver = new MutationObserver(() => {
        this.initializeSteps();
      });
      this.mutationObserver.observe(this.el, { childList: true, subtree: true });
    }
    initializeSteps() {
      const stepElements = this.el.querySelectorAll('tk-step');
      this.steps = Array.from(stepElements).map((step, index) => ({
        header: step.header || '',
        subheader: step.subheader,
        icon: step.icon,
        completeIcon: step.completeIcon,
        activeIcon: step.activeIcon,
        inactiveIcon: step.inactiveIcon,
        errorIcon: step.errorIcon,
        complete: this.showCompleteState && index < this.active && !step.error,
        error: step.error,
        isActive: index === this.active,
        disabled: step.disabled || false,
        isClickable: step.isClickable !== undefined ? step.isClickable : true,
      }));
    }
    updateStepsState(activeStep) {
      this.steps = this.steps.map((step, index) =>
        Object.assign(Object.assign({}, step), { complete: this.showCompleteState && index < activeStep && !step.error, isActive: index === activeStep }),
      );
    }
    canStepBeSelected(targetIndex) {
      const targetStep = this.steps[targetIndex];
      if (!targetStep || targetStep.disabled || !targetStep.isClickable) return false;
      if (!this.linear) return true;
      if (targetIndex < this.active) return true;
      if (targetIndex === this.active + 1) {
        const currentStep = this.steps[this.active];
        return !(currentStep === null || currentStep === void 0 ? void 0 : currentStep.error) && !(currentStep === null || currentStep === void 0 ? void 0 : currentStep.disabled);
      }
      return false;
    }
    getIconElement(icon) {
      const iconClasses = 'tk-step-icon';
      let iconProps;
      if (typeof icon === 'string') {
        iconProps = {
          class: classNames('material-symbols-outlined', iconClasses),
        };
      } else {
        const { style = 'outlined', fill, color } = icon;
        iconProps = {
          class: classNames(`material-symbols-${style}`, iconClasses, { fill: fill }),
          style: { color },
        };
      }
      const iconName = typeof icon === 'string' ? icon : icon.name;
      return h('i', Object.assign({}, iconProps), iconName);
    }
    createStepIcon(step, index) {
      if (step.disabled) {
        return this.createDefaultInactiveIcon();
      }
      if (step.icon) {
        return this.getIconElement(step.icon);
      }
      if (step.error) {
        return step.errorIcon ? this.getIconElement(step.errorIcon) : this.errorIcon ? this.getIconElement(this.errorIcon) : this.createDefaultErrorIcon();
      }
      if (step.complete) {
        return step.completeIcon ? this.getIconElement(step.completeIcon) : this.completeIcon ? this.getIconElement(this.completeIcon) : this.createDefaultCompleteIcon();
      }
      if (this.stepMode === 'number') {
        return h('span', { class: 'tk-step-number' }, index + 1);
      }
      if (step.isActive) {
        return step.activeIcon ? this.getIconElement(step.activeIcon) : this.activeIcon ? this.getIconElement(this.activeIcon) : this.createDefaultActiveIcon();
      }
      return step.inactiveIcon ? this.getIconElement(step.inactiveIcon) : this.inactiveIcon ? this.getIconElement(this.inactiveIcon) : this.createDefaultInactiveIcon();
    }
    createDefaultErrorIcon() {
      return h(
        'span',
        { class: 'tk-step-icon-error' },
        h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20', fill: 'none' },
          h('path', {
            d: 'M15.25 4.75843C14.925 4.43343 14.4 4.43343 14.075 4.75843L9.99998 8.8251L5.92498 4.7501C5.59998 4.4251 5.07498 4.4251 4.74998 4.7501C4.42498 5.0751 4.42498 5.6001 4.74998 5.9251L8.82498 10.0001L4.74998 14.0751C4.42498 14.4001 4.42498 14.9251 4.74998 15.2501C5.07498 15.5751 5.59998 15.5751 5.92498 15.2501L9.99998 11.1751L14.075 15.2501C14.4 15.5751 14.925 15.5751 15.25 15.2501C15.575 14.9251 15.575 14.4001 15.25 14.0751L11.175 10.0001L15.25 5.9251C15.5666 5.60843 15.5666 5.0751 15.25 4.75843Z',
            fill: 'var(--static-light)',
          }),
        ),
      );
    }
    createDefaultCompleteIcon() {
      return h(
        'span',
        { class: 'tk-step-icon-complete' },
        h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '14', height: '12', viewBox: '0 0 14 12', fill: 'none' },
          h('path', {
            d: 'M4.32922 9.22925L1.43755 6.33758C1.11255 6.01258 0.587549 6.01258 0.262549 6.33758C-0.0624512 6.66258 -0.0624512 7.18758 0.262549 7.51258L3.74588 10.9959C4.07088 11.3209 4.59588 11.3209 4.92088 10.9959L13.7376 2.17925C14.0626 1.85425 14.0626 1.32925 13.7376 1.00425C13.4126 0.679248 12.8875 0.679248 12.5625 1.00425L4.32922 9.22925Z',
            fill: 'var(--primary-base)',
          }),
        ),
      );
    }
    createDefaultActiveIcon() {
      return h(
        'span',
        { class: 'tk-step-icon-dot' },
        h('svg', { width: '12', height: '12', viewBox: '0 0 12 12', fill: 'none' }, h('circle', { cx: '6', cy: '6', r: '6', fill: 'var(--static-white)' })),
      );
    }
    createDefaultInactiveIcon() {
      return h(
        'span',
        { class: 'tk-step-icon-dot' },
        h('svg', { width: '12', height: '12', viewBox: '0 0 12 12', fill: 'none' }, h('circle', { cx: '6', cy: '6', r: '6', fill: 'var(--border-light)' })),
      );
    }
    createStepSign(step, index) {
      return h('span', { 'class': 'tk-step-sign', 'aria-hidden': 'true', 'style': this.signStyle }, this.createStepIcon(step, index));
    }
    renderSteps() {
      return this.steps.map((step, index) => {
        const status = step.disabled ? 'disabled' : step.error ? 'error' : step.complete ? 'completed' : step.isActive ? 'active' : 'inactive';
        const isClickable = this.canStepBeSelected(index);
        const containerClasses = 'tk-step-container';
        const stepClasses = classNames('tk-step', `tk-step-${status}`, {
          'tk-step-clickable': isClickable && !step.disabled,
          'tk-step-disabled': step.disabled,
        });
        const contentClasses = 'tk-step-content';
        return h(
          'li',
          {
            'role': 'tab',
            'class': 'tk-step-item',
            'tabIndex': step.isClickable && !step.disabled ? 0 : -1,
            'onClick': () => this.handleStepClick(index),
            'aria-label': step.header,
            'aria-selected': step.isActive,
            'aria-disabled': !this.canStepBeSelected(index),
          },
          h(
            'div',
            { 'class': containerClasses, 'data-index': index, 'data-clickable': step.isClickable && !step.disabled },
            h(
              'div',
              { class: stepClasses },
              h('div', { class: 'tk-step-rail' }),
              this.createStepSign(step, index),
              h(
                'div',
                { class: contentClasses, style: this.contentStyle },
                h('div', { class: 'tk-step-header' }, step.header),
                step.subheader && h('div', { class: 'tk-step-subheader' }, step.subheader),
              ),
            ),
          ),
        );
      });
    }
    render() {
      const rootClasses = classNames('tk-stepper', `tk-stepper-${this.orientation}`, `tk-stepper-${this.stepMode}`, {
        'tk-stepper-linear': this.linear,
      });
      return h(
        'div',
        { 'key': 'c8cacfcd8ce9d378d244ff83e34679ac141a1665', 'class': rootClasses, 'style': this.containerStyle, 'role': 'tablist', 'aria-orientation': this.orientation },
        this.renderSteps(),
      );
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        active: ['activeChanged'],
        showCompleteState: ['showCompleteStateChanged'],
      };
    }
    static get style() {
      return tkStepperCss;
    }
  },
  [
    1,
    'tk-stepper',
    {
      controlled: [4],
      orientation: [1],
      stepMode: [1, 'step-mode'],
      linear: [4],
      active: [2],
      showCompleteState: [4, 'show-complete-state'],
      completeIcon: [1, 'complete-icon'],
      activeIcon: [1, 'active-icon'],
      inactiveIcon: [1, 'inactive-icon'],
      errorIcon: [1, 'error-icon'],
      containerStyle: [8, 'container-style'],
      contentStyle: [8, 'content-style'],
      signStyle: [8, 'sign-style'],
      steps: [32],
      setActive: [64],
    },
    undefined,
    {
      active: ['activeChanged'],
      showCompleteState: ['showCompleteStateChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-stepper'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-stepper':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkStepper$1);
        }
        break;
    }
  });
}

const TkStepper = TkStepper$1;
const defineCustomElement = defineCustomElement$1;

export { TkStepper, defineCustomElement };
//# sourceMappingURL=tk-stepper.js.map

//# sourceMappingURL=tk-stepper.js.map
