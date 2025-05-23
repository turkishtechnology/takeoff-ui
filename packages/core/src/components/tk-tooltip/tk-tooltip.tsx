import { Component, ComponentInterface, h, Prop, State, Element, Watch, Fragment } from '@stencil/core';
import { computePosition, offset, flip, shift, arrow, autoUpdate } from '@floating-ui/dom';
import { IIconOptions } from '../../global/interfaces/IIconOptions';
import { getIconElementProps } from '../../utils/icon-props';
import classNames from 'classnames';

/**
 * The TkTooltip is used to display additional information when element is hovered over.
 * @slot trigger - The trigger slot defines the element that will trigger the tooltip
 * @slot content - Define custom HTML content for the tooltip, which replaces the default header, description and icon elements
 * @react `import { TkTooltip } from '@takeoff-ui/react'`
 * @vue `import { TkTooltip } from '@takeoff-ui/vue'`
 * @angular `import { TkTooltip } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-tooltip',
  styleUrl: 'tk-tooltip.scss',
  shadow: true,
})
export class TkTooltip implements ComponentInterface {
  private tooltipElement: HTMLElement;
  private triggerElement: HTMLElement;
  private arrowElement: HTMLElement;
  private cleanup;
  private currentPosition: 'top' | 'bottom' | 'left' | 'right' = 'right';

  @Element() el: HTMLTkTooltipElement;

  @State() isOpen: boolean = false;

  /**
   * Controls if tooltip has custom content.
   * @defaultValue false
   */
  @State() hasContentSlot: boolean = false;

  /**
   * Sets header text for the tooltip.
   */
  @Prop() header?: string;

  /**
   * Sets description text for the tooltip.
   */
  @Prop() description?: string;

  /**
   * Sets the position of the tooltip.
   * @defaultValue 'right'
   */
  @Prop() position?: 'top' | 'bottom' | 'left' | 'right' = 'right';
  @Watch('position')
  positionChanged(newValue: string) {
    this.currentPosition = newValue as 'top' | 'bottom' | 'left' | 'right';
    if (this.tooltipElement) {
      this.updateArrowPosition();
    }
  }
  /**
   * Sets the color variant of the tooltip.
   * @defaultValue 'neutral'
   */
  @Prop() variant?: 'dark' | 'white' | 'info' | 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';

  /**
   * Sets the icon element of the tooltip.
   */
  @Prop() icon?: string | IIconOptions;

  /**
   * The style attribute of container element
   */
  @Prop() containerStyle?: any = null;

  componentWillLoad() {
    this.currentPosition = this.position || 'right';
    this.hasContentSlot = !!this.el.querySelector('[slot="content"]');
  }

  componentDidLoad() {
    this.triggerElement = this.el.querySelector('[slot="trigger"]');

    this.triggerElement?.addEventListener('mouseenter', this.handleMouseEnter);
    this.triggerElement?.addEventListener('mouseleave', this.handleMouseLeave);
  }

  componentDidUpdate() {
    if (this.isOpen) {
      this.cleanup = autoUpdate(this.triggerElement, this.tooltipElement, () => this.updatePosition(), {
        animationFrame: true,
      });
    } else {
      this.cleanup && this.cleanup();
    }
  }

  private updatePosition() {
    computePosition(this.triggerElement, this.tooltipElement, {
      strategy: 'fixed',
      placement: this.position,
      middleware: [offset(8), flip(), shift(), arrow({ element: this.arrowElement })],
    }).then(({ x, y, middlewareData }) => {
      Object.assign(this.tooltipElement.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      const { x: arrowX, y: arrowY } = middlewareData.arrow;
      Object.assign(this.arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
      });

      this.updateArrowPosition();
    });
  }

  private updateArrowPosition() {
    const arrowElement = this.arrowElement;

    switch (this.currentPosition) {
      case 'top':
        arrowElement.style.bottom = '-3px';
        break;
      case 'bottom':
        arrowElement.style.top = '-3px';
        break;
      case 'left':
        arrowElement.style.right = '-3px';
        break;
      case 'right':
        arrowElement.style.left = '-3px';
        break;
    }
  }

  private handleMouseEnter = () => {
    this.isOpen = true;
  };

  private handleMouseLeave = () => {
    this.isOpen = false;
  };

  render() {
    let _icon: HTMLTkIconElement;
    let iconVariant;

    if (this.variant == 'dark') iconVariant = 'neutral';
    else iconVariant = this.variant;

    _icon = <tk-icon {...getIconElementProps(this.icon, { class: classNames('tk-tooltip-item-icon'), variant: iconVariant, sign: true, size: 'small' })} />;

    return (
      <div class="tk-tooltip">
        <slot name="trigger" />

        {this.isOpen && (
          <div
            ref={el => (this.tooltipElement = el as HTMLElement)}
            class={{
              'tk-tooltip-content': true,
              [`tk-tooltip-${this.variant}`]: !!this.variant,
            }}
            style={{ ...this.containerStyle }}
            role="tooltip"
          >
            {this.hasContentSlot ? (
              <slot name="content" />
            ) : (
              <Fragment>
                {_icon}
                <div>
                  <div class="tk-tooltip-header">{this.header}</div>
                  <div class="tk-tooltip-description">{this.description}</div>
                </div>
              </Fragment>
            )}
            <div ref={el => (this.arrowElement = el as HTMLElement)} class="tk-tooltip-arrow"></div>
          </div>
        )}
      </div>
    );
  }
}
