import { Component, ComponentInterface, h, Prop, Host, Element } from '@stencil/core';
import { IIconOptions } from '../../global/interfaces/IIconOptions';

/**
 * TkStep sub-component for individual steps in TkStepper.
 */
@Component({
  tag: 'tk-step',
  styleUrl: 'tk-step.scss',
  shadow: false,
})
export class TkStep implements ComponentInterface {
  @Element() el: HTMLTkStepElement;

  /**
   * The header text to be displayed for the step.
   */
  @Prop() header: string;

  /**
   * Optional subheader text to provide additional context for the step.
   */
  @Prop() subheader?: string;

  /**
   * Icon to be displayed for the step. Can be either a string (icon name) or an IIconOptions object.
   */
  @Prop() icon?: string | IIconOptions;

  /**
   * Specifies a material icon or icon options for completed steps.
   */
  @Prop() completeIcon?: string | IIconOptions;

  /**
   * Specifies a material icon or icon options for active steps.
   */
  @Prop() activeIcon?: string | IIconOptions;

  /**
   * Specifies a material icon or icon options for inactive steps.
   */
  @Prop() inactiveIcon?: string | IIconOptions;

  /**
   * Specifies a material icon or icon options for error steps.
   */
  @Prop() errorIcon?: string | IIconOptions;

  /**
   * Indicates if the step has been completed.
   */
  @Prop() complete: boolean = false;

  /**
   * Indicates if the step has encountered an error.
   */
  @Prop() error: boolean = false;

  /**
   * Indicates if the step is currently active.
   */
  @Prop() isActive: boolean = false;

  /**
   * The index of the step in the stepper.
   */
  @Prop() index: number;

  /**
   * Whether the step is clickable.
   */
  @Prop() isClickable: boolean = true;

  /**
   * Controls the label position of the step.
   * @defaultValue 'non-flip'
   */
  @Prop() labelPosition: 'flip' | 'non-flip' = 'non-flip';

  /**
   * Controls the step mode of the stepper component.
   * @defaultValue 'basic'
   */
  @Prop() stepMode: 'basic' | 'number' = 'basic';

  /**
   * Indicates if the step is disabled (cannot be selected or interacted with).
   */
  @Prop() disabled: boolean = false;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
