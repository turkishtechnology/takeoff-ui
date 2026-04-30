import { Component, Prop, Element, h } from '@stencil/core';
import classNames from 'classnames';
import { getDataTestId } from '../../utils/test-id-utils';

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

  /**
   * Sets the data-testid attribute on the root container element.
   */
  @Prop({ reflect: true }) dataTestid?: string;

  componentWillLoad() {
    this.isButton = this.el.closest('button')?.classList.contains('tk-button');
  }

  private renderSpinner() {
    switch (this.type) {
      case 'rounded':
        if (this.isButton) {
          const button = this.el.closest('button');
          const borderColor = window.getComputedStyle(button).color;
          return <div style={{ borderColor: borderColor, borderTopColor: 'transparent' }} class="spinner-rounded" data-testid={getDataTestId(this.dataTestid, 'rounded')}></div>;
        }
        return <div class="spinner-rounded" data-testid={getDataTestId(this.dataTestid, 'rounded')}></div>;
      case 'dots':
        return (
          <div class="spinner-dots" data-testid={getDataTestId(this.dataTestid, 'dots')}>
            <div class="dot" data-testid={getDataTestId(this.dataTestid, 'dot-0')}></div>
            <div class="dot" data-testid={getDataTestId(this.dataTestid, 'dot-1')}></div>
            <div class="dot" data-testid={getDataTestId(this.dataTestid, 'dot-2')}></div>
            <div class="dot" data-testid={getDataTestId(this.dataTestid, 'dot-3')}></div>
            <div class="dot" data-testid={getDataTestId(this.dataTestid, 'dot-4')}></div>
            <div class="dot" data-testid={getDataTestId(this.dataTestid, 'dot-5')}></div>
            <div class="dot" data-testid={getDataTestId(this.dataTestid, 'dot-6')}></div>
            <div class="dot" data-testid={getDataTestId(this.dataTestid, 'dot-7')}></div>
          </div>
        );
      case 'lines':
        return (
          <div class="spinner-lines" data-testid={getDataTestId(this.dataTestid, 'lines')}>
            <div class="line" data-testid={getDataTestId(this.dataTestid, 'line-0')}></div>
            <div class="line" data-testid={getDataTestId(this.dataTestid, 'line-1')}></div>
            <div class="line" data-testid={getDataTestId(this.dataTestid, 'line-2')}></div>
            <div class="line" data-testid={getDataTestId(this.dataTestid, 'line-3')}></div>
            <div class="line" data-testid={getDataTestId(this.dataTestid, 'line-4')}></div>
            <div class="line" data-testid={getDataTestId(this.dataTestid, 'line-5')}></div>
            <div class="line" data-testid={getDataTestId(this.dataTestid, 'line-6')}></div>
            <div class="line" data-testid={getDataTestId(this.dataTestid, 'line-7')}></div>
          </div>
        );
      case 'three-dots':
        return (
          <div class="spinner-three-dots" data-testid={getDataTestId(this.dataTestid, 'three-dots')}>
            <span class="dot1" data-testid={getDataTestId(this.dataTestid, 'dot-0')}></span>
            <span class="dot2" data-testid={getDataTestId(this.dataTestid, 'dot-1')}></span>
            <span class="dot3" data-testid={getDataTestId(this.dataTestid, 'dot-2')}></span>
          </div>
        );
      case 'pulse':
        return <div class="spinner-pulse" data-testid={getDataTestId(this.dataTestid, 'pulse')}></div>;
      case 'loader':
        return <div class="spinner-loader" data-testid={getDataTestId(this.dataTestid, 'loader')}></div>;
      case 'logo':
        return (
          <div class="spinner-logo" data-testid={getDataTestId(this.dataTestid, 'logo')}>
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid={getDataTestId(this.dataTestid, 'logo-icon')}>
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
        data-testid={getDataTestId(this.dataTestid, 'container')}
      >
        {this.renderSpinner()}
        {this.label && (
          <div class="tk-spinner-label" data-testid={getDataTestId(this.dataTestid, 'label')}>
            {this.label}
          </div>
        )}
      </div>
    );
  }
}
