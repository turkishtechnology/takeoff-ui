import { Component, h, Prop, State, Event, EventEmitter, Element, Watch, Method, ComponentInterface } from '@stencil/core';
import classNames from 'classnames';
import { IStep, IStepClickDetail } from './interfaces';
import { IIconOptions } from '../../global/interfaces/IIconOptions';

/**
 * TkStepper component for managing a series of steps.
 * @react `import { TkStepper, TkStep } from '@takeoff-ui/react'`
 * @vue `import { TkStepper, TkStep } from '@takeoff-ui/vue'`
 * @angular `import { TkStepper, TkStep } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-stepper',
  styleUrl: 'tk-stepper.scss',
  shadow: true,
})
export class TkStepper implements ComponentInterface {
  private mutationObserver: MutationObserver | null = null;

  @Element() el: HTMLTkStepperElement;

  @State() private steps: IStep[] = [];

  /**
   * Controls if the tabs component is controlled.
   * @defaultValue false
   */
  @Prop() controlled: boolean = false;

  /**
   * Controls the orientation of the stepper component.
   * @defaultValue 'horizontal'
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Controls the step mode of the stepper component.
   * @defaultValue 'basic'
   */
  @Prop() stepMode: 'basic' | 'number' = 'basic';

  /**
   * Whether the steps follow a linear progression (can only navigate to the next step when current step is completed).
   * @defaultValue false
   */
  @Prop() linear: boolean = false;

  /**
   * Currently active step index
   * @defaultValue 0
   */
  @Prop() active: number = 0;
  @Watch('active')
  activeChanged(newValue: number) {
    this.updateStepsState(newValue);
  }

  /**
   * Whether to show completed steps with the complete state.
   * If false, completed steps will appear as just passed and not with complete styling.
   * @defaultValue true
   */
  @Prop() showCompleteState: boolean = true;
  @Watch('showCompleteState')
  showCompleteStateChanged() {
    this.updateStepsState(this.active);
  }

  /**
   * Specifies a material icon or icon options for completed steps.
   */
  @Prop() completeIcon: string | IIconOptions;

  /**
   * Specifies a material icon or icon options for active steps.
   */
  @Prop() activeIcon: string | IIconOptions;

  /**
   * Specifies a material icon or icon options for inactive steps.
   */
  @Prop() inactiveIcon: string | IIconOptions;

  /**
   * Specifies a material icon or icon options for error steps.
   */
  @Prop() errorIcon: string | IIconOptions;

  /**
   * The style attribute of container element
   */
  @Prop() containerStyle?: any = null;

  /**
   * The style attribute of content elements
   */
  @Prop() contentStyle?: any = null;

  /**
   * The style attribute of step sign elements
   */
  @Prop() signStyle?: any = null;

  /**
   * Emitted when the active step changes.
   */
  @Event({ eventName: 'tk-step-change' }) tkStepChange: EventEmitter<number>;

  /**
   * Emitted when a step is clicked.
   */
  @Event({ eventName: 'tk-step-click' }) tkStepClick: EventEmitter<IStepClickDetail>;

  componentWillLoad() {
    this.initializeSteps();
  }

  componentDidLoad() {
    this.setupMutationObserver();
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
  }

  /**
   * Sets the active step index.
   * @param index - The index of the step to set as active.
   */
  @Method()
  async setActive(index: number) {
    if (index >= 0 && index < this.steps.length && this.canStepBeSelected(index) && index !== this.active) {
      if (!this.controlled) {
        this.active = index;
      }

      this.tkStepChange.emit(index);
    }
  }

  private setupMutationObserver() {
    this.mutationObserver = new MutationObserver(() => {
      this.initializeSteps();
    });
    this.mutationObserver.observe(this.el, { childList: true, subtree: true });
  }

  private initializeSteps() {
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

  private updateStepsState(activeStep: number) {
    this.steps = this.steps.map((step, index) => ({
      ...step,
      complete: this.showCompleteState && index < activeStep && !step.error,
      isActive: index === activeStep,
    }));
  }

  private canStepBeSelected(targetIndex: number): boolean {
    const targetStep = this.steps[targetIndex];
    if (!targetStep || targetStep.disabled || !targetStep.isClickable) return false;

    if (!this.linear) return true;
    if (targetIndex < this.active) return true;
    if (targetIndex === this.active + 1) {
      const currentStep = this.steps[this.active];
      return !currentStep?.error && !currentStep?.disabled;
    }
    return false;
  }

  private getIconElement(icon: string | IIconOptions): JSX.Element {
    const iconClasses = 'tk-step-icon';
    let iconProps: { class: string } | { class: string; style: any };
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

    return <i {...iconProps}>{iconName}</i>;
  }

  private handleStepClick = (index: number) => {
    const step = this.steps[index];
    const status = step.disabled ? 'disabled' : step.error ? 'error' : step.complete ? 'completed' : step.isActive ? 'active' : 'inactive';
    this.tkStepClick.emit({ index, status });

    this.setActive(index);
  };

  private createStepIcon(step: IStep, index: number): JSX.Element {
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
      return <span class="tk-step-number">{index + 1}</span>;
    }

    if (step.isActive) {
      return step.activeIcon ? this.getIconElement(step.activeIcon) : this.activeIcon ? this.getIconElement(this.activeIcon) : this.createDefaultActiveIcon();
    }

    return step.inactiveIcon ? this.getIconElement(step.inactiveIcon) : this.inactiveIcon ? this.getIconElement(this.inactiveIcon) : this.createDefaultInactiveIcon();
  }

  private createDefaultErrorIcon(): JSX.Element {
    return (
      <span class="tk-step-icon-error">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M15.25 4.75843C14.925 4.43343 14.4 4.43343 14.075 4.75843L9.99998 8.8251L5.92498 4.7501C5.59998 4.4251 5.07498 4.4251 4.74998 4.7501C4.42498 5.0751 4.42498 5.6001 4.74998 5.9251L8.82498 10.0001L4.74998 14.0751C4.42498 14.4001 4.42498 14.9251 4.74998 15.2501C5.07498 15.5751 5.59998 15.5751 5.92498 15.2501L9.99998 11.1751L14.075 15.2501C14.4 15.5751 14.925 15.5751 15.25 15.2501C15.575 14.9251 15.575 14.4001 15.25 14.0751L11.175 10.0001L15.25 5.9251C15.5666 5.60843 15.5666 5.0751 15.25 4.75843Z"
            fill="var(--static-light)"
          />
        </svg>
      </span>
    );
  }

  private createDefaultCompleteIcon(): JSX.Element {
    return (
      <span class="tk-step-icon-complete">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
          <path
            d="M4.32922 9.22925L1.43755 6.33758C1.11255 6.01258 0.587549 6.01258 0.262549 6.33758C-0.0624512 6.66258 -0.0624512 7.18758 0.262549 7.51258L3.74588 10.9959C4.07088 11.3209 4.59588 11.3209 4.92088 10.9959L13.7376 2.17925C14.0626 1.85425 14.0626 1.32925 13.7376 1.00425C13.4126 0.679248 12.8875 0.679248 12.5625 1.00425L4.32922 9.22925Z"
            fill="var(--primary-base)"
          />
        </svg>
      </span>
    );
  }

  private createDefaultActiveIcon(): JSX.Element {
    return (
      <span class="tk-step-icon-dot">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="6" fill="var(--static-white)" />
        </svg>
      </span>
    );
  }

  private createDefaultInactiveIcon(): JSX.Element {
    return (
      <span class="tk-step-icon-dot">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="6" fill="var(--border-light)" />
        </svg>
      </span>
    );
  }

  private createStepSign(step: IStep, index: number): JSX.Element {
    return (
      <span class="tk-step-sign" aria-hidden="true" style={this.signStyle}>
        {this.createStepIcon(step, index)}
      </span>
    );
  }

  private renderSteps(): JSX.Element[] {
    return this.steps.map((step, index) => {
      const status = step.disabled ? 'disabled' : step.error ? 'error' : step.complete ? 'completed' : step.isActive ? 'active' : 'inactive';

      const isClickable = this.canStepBeSelected(index);
      const containerClasses = 'tk-step-container';
      const stepClasses = classNames('tk-step', `tk-step-${status}`, {
        'tk-step-clickable': isClickable && !step.disabled,
        'tk-step-disabled': step.disabled,
      });

      const contentClasses = 'tk-step-content';

      return (
        <li
          role="tab"
          class="tk-step-item"
          tabIndex={step.isClickable && !step.disabled ? 0 : -1}
          onClick={() => this.handleStepClick(index)}
          aria-label={step.header}
          aria-selected={step.isActive}
          aria-disabled={!this.canStepBeSelected(index)}
        >
          <div class={containerClasses} data-index={index} data-clickable={step.isClickable && !step.disabled}>
            <div class={stepClasses}>
              <div class="tk-step-rail"></div>
              {this.createStepSign(step, index)}
              <div class={contentClasses} style={this.contentStyle}>
                <div class="tk-step-header">{step.header}</div>
                {step.subheader && <div class="tk-step-subheader">{step.subheader}</div>}
              </div>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    const rootClasses = classNames('tk-stepper', `tk-stepper-${this.orientation}`, `tk-stepper-${this.stepMode}`, {
      'tk-stepper-linear': this.linear,
    });

    return (
      <div class={rootClasses} style={this.containerStyle} role="tablist" aria-orientation={this.orientation}>
        {this.renderSteps()}
      </div>
    );
  }
}
