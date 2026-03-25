import { Component, Prop, State, Event, EventEmitter, Element, Watch, Method, ComponentInterface } from '@stencil/core';
import type { JSX } from '@stencil/core';
import classNames from 'classnames';
import { IStep, IStepClickDetail } from './interfaces';
import { IIconOptions } from '../../global/interfaces/IIconOptions';
import type { CSSStyleProperties } from '../../global/types';
import { getIconElementProps } from '../../utils/icon-utils';

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
   * Controls the display mode of the stepper component.
   * @defaultValue 'default'
   */
  @Prop() mode: 'default' | 'compact' = 'default';

  /**
   * Whether the steps follow a linear progression (can only navigate to the next step when current step is completed).
   * @defaultValue false
   */
  @Prop() linear: boolean = false;

  /**
   * The size of the stepper component.
   * @defaultValue 'base'
   */
  @Prop() size: 'large' | 'base' | 'small' | 'xsmall' = 'base';

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
  @Prop() containerStyle?: CSSStyleProperties = null;

  /**
   * The style attribute of content elements
   */
  @Prop() contentStyle?: CSSStyleProperties = null;

  /**
   * The style attribute of step sign elements
   */
  @Prop() signStyle?: CSSStyleProperties = null;

  /**
   * The style attribute of rail elements
   */
  @Prop() railStyle?: CSSStyleProperties = null;

  /**
   * Whether the step headers and content should be reversed.
   * @defaultValue false
   */
  @Prop() reverse: boolean = false;

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

  private getIconElement(icon: string | IIconOptions, props: Record<string, any> = {}): JSX.Element {
    const iconSizes = {
      large: 'xxlarge',
      base: 'medium',
      small: 'base',
      xsmall: 'xsmall',
    };
    const defaultProps = { size: iconSizes[this.size], fill: true, color: 'var(--primary-base)', ...props, class: classNames('tk-step-icon', props?.class) };
    const iconProps = getIconElementProps(icon, defaultProps, 'outlined', 'i');

    return <tk-icon {...iconProps} />;
  }

  private handleStepClick = (index: number) => {
    const step = this.steps[index];
    const status = step.disabled ? 'disabled' : step.error ? 'error' : step.complete ? 'completed' : step.isActive ? 'active' : 'inactive';
    this.tkStepClick.emit({ index, status });

    this.setActive(index);
  };

  private createStepIcon(step: IStep, index: number): JSX.Element {
    if (step.disabled) {
      return this.getIconElement({
        name: 'fiber_manual_record',
        color: 'var(--border-light)',
      });
    }

    if (step.icon) {
      return this.getIconElement(step.icon);
    }

    if (step.error) {
      return this.getIconElement(
        step.errorIcon ||
          this.errorIcon || {
            name: 'close',
            color: 'var(--static-light)',
          },
      );
    }

    if (step.complete) {
      return this.getIconElement(
        step.completeIcon ||
          this.completeIcon || {
            name: 'check',
          },
      );
    }

    if (this.stepMode === 'number') {
      return <span class="tk-step-number">{index + 1}</span>;
    }

    if (step.isActive) {
      return this.getIconElement(
        step.activeIcon ||
          this.activeIcon || {
            name: 'fiber_manual_record',
            color: 'var(--static-white)',
          },
      );
    }

    return this.getIconElement(
      step.inactiveIcon ||
        this.inactiveIcon || {
          name: 'fiber_manual_record',
          color: 'var(--border-light)',
        },
    );
  }

  private createStepSign(step: IStep, index: number): JSX.Element {
    return (
      <span class="tk-step-sign" aria-hidden="true" style={this.signStyle}>
        {this.createStepIcon(step, index)}
      </span>
    );
  }

  private createRail(): JSX.Element | null {
    if (this.mode === 'compact') return null;
    else return <div class="tk-step-rail" style={this.railStyle}></div>;
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
              {this.createRail()}
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
    const rootClasses = classNames('tk-stepper', `tk-stepper-${this.orientation}`, `tk-stepper-${this.stepMode}`, `tk-stepper-${this.size}`, `tk-stepper-${this.mode}`, {
      'tk-stepper-linear': this.linear,
      'tk-stepper-reverse': this.reverse,
    });

    return (
      <div class={rootClasses} style={this.containerStyle} role="tablist" aria-orientation={this.orientation}>
        {this.renderSteps()}
      </div>
    );
  }
}
