import { p as proxyCustomElement, H, c as createEvent, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkStepperScss =
  ":host {\n  display: block;\n}\n\n.tk-stepper {\n  display: flex;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  font-family: 'Geologica';\n  text-align: initial;\n  list-style: none;\n  box-sizing: border-box;\n\n  &.tk-stepper-horizontal {\n    flex-direction: row;\n    overflow-x: auto;\n\n    .tk-step-item {\n      flex: 1;\n\n      &:last-child {\n        flex: none;\n      }\n\n      .tk-step {\n        .tk-step-sign {\n          margin-inline-start: 40px;\n          margin-inline-end: 8px;\n          vertical-align: top;\n        }\n\n        .tk-step-rail {\n          position: absolute;\n          top: calc(28px / 2);\n          font-size: 0px;\n          width: calc(100% - 48px);\n          padding: 0 24px;\n          inset-inline-start: 0;\n          margin-inline-start: calc(32px / 2 + 40px);\n\n          &::after {\n            content: '';\n            display: inline-block;\n            height: 2px;\n            width: 100%;\n            background-color: var(--border-light);\n            border-radius: var(--radius-full);\n          }\n        }\n\n        .tk-step-content {\n          display: flex;\n          width: calc((32px / 2 + 40px) * 2);\n          margin-top: var(--stepper-items-content-gap);\n          text-align: center;\n          flex-direction: column;\n          align-items: center;\n          flex-shrink: 0;\n        }\n      }\n    }\n  }\n\n  &.tk-stepper-vertical {\n    flex-direction: column;\n    align-items: flex-start;\n\n    .tk-step-item {\n      display: block;\n      flex: 1 0 auto;\n      padding-inline-start: 0;\n      overflow: visible;\n\n      &:last-child {\n        flex: none;\n      }\n\n      .tk-step {\n        display: flex;\n        flex-direction: row;\n        align-items: flex-start;\n\n        .tk-step-sign {\n          float: left;\n          margin-inline-end: 8px;\n        }\n\n        .tk-step-rail {\n          position: absolute;\n          top: 0px;\n          font-size: 0px;\n          height: calc(100% - 48px);\n          padding: 40px 0;\n          width: 2px;\n          inset-inline-start: calc(30px / 2);\n\n          &::after {\n            content: '';\n            display: inline-block;\n            width: 2px;\n            height: 100%;\n            background-color: var(--border-light);\n            border-radius: var(--radius-full);\n          }\n        }\n\n        .tk-step-content {\n          display: block;\n          min-height: calc(32px * 2.5);\n          overflow: hidden;\n        }\n      }\n    }\n  }\n\n  .tk-step-item {\n    position: relative;\n    display: inline-block;\n    vertical-align: top;\n    overflow: visible;\n\n    &:last-child {\n      .tk-step-rail {\n        display: none;\n      }\n    }\n\n    .tk-step-container {\n      outline: none;\n\n      .tk-step {\n        cursor: pointer;\n\n        .tk-step-sign {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          width: 28px;\n          height: 28px;\n          border: 2px solid var(--border-light);\n          background-color: var(--static-white);\n          border-radius: var(--radius-full);\n          text-align: center;\n\n          .tk-step-icon,\n          .tk-step-number,\n          .tk-step-icon-error,\n          svg {\n            position: relative;\n            line-height: 1;\n            font-size: var(--size-xl);\n            width: 20px;\n            height: 20px;\n          }\n\n          .tk-step-icon-dot svg {\n            width: 12px;\n            height: 12px;\n          }\n\n          .tk-step-icon-complete svg {\n            width: 14px;\n            height: 12px;\n          }\n        }\n\n        .tk-step-rail::after {\n          transition: background-color 0.2s ease-in-out;\n        }\n\n        .tk-step-content {\n          .tk-step-header {\n            color: var(--text-dark);\n            font-family: var(--desktop-family-body);\n            font-size: var(--desktop-size-sm);\n            font-weight: var(--desktop-weight-medium);\n            line-height: var(--desktop-line-height-sm-normal);\n          }\n\n          .tk-step-subheader {\n            color: var(--text-base);\n            font-family: var(--desktop-family-body);\n            font-size: var(--desktop-size-xs, 12px);\n            font-weight: var(--desktop-weight-regular, 400);\n            line-height: var(--desktop-line-height-xs-normal, 1.5);\n          }\n        }\n\n        &.tk-step-disabled {\n          cursor: not-allowed;\n        }\n\n        &:not(.tk-step-disabled) {\n          &.tk-step-active {\n            .tk-step-sign {\n              border-color: var(--primary-base);\n              background-color: var(--primary-base);\n              color: var(--static-white);\n\n              .tk-step-icon,\n              svg {\n                color: var(--static-white);\n              }\n            }\n\n            .tk-step-header {\n              color: var(--text-darkest);\n            }\n          }\n\n          &.tk-step-inactive {\n            .tk-step-sign {\n              border-color: var(--border-light);\n              color: var(--border-light);\n\n              svg circle {\n                fill: var(--border-light);\n              }\n            }\n          }\n\n          &.tk-step-completed {\n            .tk-step-sign {\n              border-color: var(--primary-base);\n              color: var(--primary-base);\n\n              .tk-step-icon {\n                color: var(--primary-base);\n              }\n            }\n\n            .tk-step-rail::after {\n              background-color: var(--primary-base);\n            }\n          }\n\n          &.tk-step-error {\n            .tk-step-sign {\n              border-color: var(--states-danger-base);\n              color: var(--states-danger-base);\n              background: var(--states-danger-base);\n\n              .tk-step-icon {\n                color: var(--static-light);\n              }\n\n              svg path {\n                fill: var(--static-light);\n              }\n            }\n\n            .tk-step-content {\n              .tk-step-header {\n                color: var(--states-danger-base);\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n";

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
      return tkStepperScss;
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
