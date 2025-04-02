import { Component, Prop, Element, h } from '@stencil/core';
import classNames from 'classnames';

/**
 * The `TkSpinner` component description.
 * @react `import { TkSpinner } from @takeoff-ui/react`
 * @vue `import { TkSpinner } from @takeoff-ui/vue`
 * @angular `import { TkSpinner } from @takeoff-ui/angular`
 */
@Component({
  tag: 'tk-spinner',
  styleUrl: 'tk-spinner.scss',
  shadow: true,
})
export class TkSpinner {
  @Element() el: HTMLTkSpinnerElement;
  private isButton = false;
  constructor() {
    this.isButton = this.el.closest('button')?.classList.contains('tk-button');
  }
  /**
   * Controls the orientation of the spinner component.
   * @defaultValue 'horizontal'
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'vertical';

  /**
   * Controls the size of the spinner component.
   * @defaultValue 'base'
   */
  @Prop() size: 'xxsmall' | 'xsmall' | 'small' | 'base' | 'large' | 'xlarge' = 'base';

  /**
   * Sets the style of spinner component.
   * @defaultValue 'rounded'
   */
  @Prop() type: 'rounded' | 'dots' | 'lines' | 'pulse' | 'three-dots' | 'loader' = 'rounded';

  /**
   * Sets the label of the spinner component.
   */
  @Prop() label: string;

  private renderSpinner() {
    switch (this.type) {
      case 'rounded':
        if (this.isButton) {
          const button = this.el.closest('button');
          const borderColor = window.getComputedStyle(button).color;
          return <div style={{ border: '3px solid ' + borderColor, borderTop: '3px solid transparent' }} class="spinner-rounded"></div>;
        }
        return <div class="spinner-rounded"></div>;
      case 'dots':
        return (
          <div class="spinner-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        );
      case 'lines':
        return (
          <div class="spinner-lines">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        );
      case 'three-dots':
        return (
          <div class="spinner-three-dots">
            <span class="dot1"></span>
            <span class="dot2"></span>
            <span class="dot3"></span>
          </div>
        );
      case 'pulse':
        return <div class="spinner-pulse"></div>;
      case 'loader':
        return <div class="spinner-loader"></div>;
      default:
        return null;
    }
  }

  render() {
    return (
      <div
        role="progressbar"
        class={classNames('tk-spin-container', {
          [this.orientation]: true,
          [this.size]: true,
        })}
      >
        {this.renderSpinner()}
        {this.label && <div class="tk-spinner-label">{this.label}</div>}
      </div>
    );
  }
}
