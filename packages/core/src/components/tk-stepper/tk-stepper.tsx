import { Component, h, Prop, ComponentInterface } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'tk-stepper',
  styleUrl: 'tk-stepper.scss',
  shadow: true,
})
export class TkStepper implements ComponentInterface {
  /**
   * Controls the orientation of the stepper component.
   * @defaultValue 'horizontal'
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Controls the step mode of the stepper component.
   * @defaultValue 'basic'
   */
  @Prop() stepMode: 'basic' | 'icon' | 'number' = 'basic';
  /**
   * Controls the label position of the stepper component.
   * @defaultValue 'non-flip'
   */
  @Prop() labelPosition: 'flip' | 'non-flip' = 'non-flip';
  /**
   * Sets the steps of stepper component.
   */
  @Prop() steps:
    | string
    | Array<{
        number: number;
        label: string;
        description: string;
        icon?: string;
        status?: string;
      }> = '[]';

  componentWillLoad() {
    if (typeof this.steps === 'string') {
      try {
        this.steps = JSON.parse(this.steps as string);
      } catch (error) {
        console.error('Invalid JSON format', error);
      }
    }
  }

  render() {
    const rootClasses = classNames('tk-stepper', [`${this.orientation}`], [`${this.stepMode}`]);
    return (
      <ul class={rootClasses}>
        {this.steps &&
          Array.isArray(this.steps) &&
          this.steps.map(step => (
            <li class={`tk-stepper-item ${step.status} ${this.labelPosition}`}>
              <div class={`tk-stepper-content ${this.labelPosition}`}>
                {this.stepMode === 'basic' && step.status === 'completed' && <span class="material-symbols-outlined tk-stepper-icon tk-stepper-icon-completed">check</span>}
                {this.stepMode === 'basic' && step.status === 'active' && (
                  <span class="material-symbols-outlined tk-stepper-icon tk-stepper-icon-active">radio_button_checked</span>
                )}
                {this.stepMode === 'basic' && step.status === 'inactive' && (
                  <span class="material-symbols-outlined tk-stepper-icon tk-stepper-icon-inactive">radio_button_checked</span>
                )}
                {this.stepMode === 'icon' && step.status === 'completed' && <span class="material-symbols-outlined tk-stepper-icon tk-stepper-icon-completed">{step.icon}</span>}
                {this.stepMode === 'icon' && step.status === 'active' && <span class="material-symbols-outlined tk-stepper-icon tk-stepper-icon-active">{step.icon}</span>}
                {this.stepMode === 'icon' && step.status === 'inactive' && <span class="material-symbols-outlined tk-stepper-icon tk-stepper-icon-inactive">{step.icon}</span>}
                {this.stepMode === 'number' && step.status === 'completed' && (
                  <span class="material-symbols-outlined tk-stepper-icon tk-stepper-icon-completed">{step.number}</span>
                )}
                {this.stepMode === 'number' && step.status === 'active' && <span class="material-symbols-outlined tk-stepper-icon tk-stepper-icon-active">{step.number}</span>}
                {this.stepMode === 'number' && step.status === 'inactive' && <span class="material-symbols-outlined tk-stepper-icon tk-stepper-icon-inactive">{step.number}</span>}
                <div class="tk-step-info">
                  <div class="tk-step-label">{step.label}</div>
                  <div class="tk-step-desc">{step.description}</div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    );
  }
}
