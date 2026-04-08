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
  private isButton = false;

  @Element() el: HTMLTkSpinnerElement;

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
  @Prop() type: 'rounded' | 'dots' | 'lines' | 'pulse' | 'three-dots' | 'loader' | 'logo' = 'rounded';

  /**
   * Sets the color variant of spinner component.
   * @defaultValue 'neutral'
   */
  @Prop() variant: 'primary' | 'neutral' | 'info' | 'success' | 'warning' | 'danger' = 'neutral';

  /**
   * Sets the label of the spinner component.
   */
  @Prop() label: string;

  componentWillLoad() {
    this.isButton = this.el.closest('button')?.classList.contains('tk-button');
  }

  private renderSpinner() {
    switch (this.type) {
      case 'rounded':
        if (this.isButton) {
          const button = this.el.closest('button');
          const borderColor = window.getComputedStyle(button).color;
          return <div style={{ borderColor: borderColor, borderTopColor: 'transparent' }} class="spinner-rounded"></div>;
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
      case 'logo':
        return (
          <div class="spinner-logo">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24V4C48 1.79086 46.2091 0 44 0H24ZM24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8Z"
              />
            </svg>
          </div>
        );
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
          [this.variant]: true,
        })}
      >
        {this.renderSpinner()}
        {this.label && <div class="tk-spinner-label">{this.label}</div>}
      </div>
    );
  }
}
