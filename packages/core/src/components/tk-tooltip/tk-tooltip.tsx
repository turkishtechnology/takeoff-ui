import { Component, ComponentInterface, Element, Prop, h, State, Fragment, Watch } from '@stencil/core';
import { IIconOptions, IMultiIconOptions } from '../../global/interfaces/IIconOptions';
import { renderIcons } from '../../utils/icon-utils';
import classNames from 'classnames';
import { addDialogScrollListener, removeDialogScrollListener } from '../../utils/dialog-utils';
import { CSSStyleProperties } from '../../global/types';
import { floatingElementAutoUpdate } from '../../utils/position-utils';

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
  @Prop() position?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' =
    'right';

  @Watch('position')
  positionChanged() {
    if (this.tooltipElement) {
      this.updatePosition();
    }
  }
  /**
   * Sets the color variant of the tooltip.
   * @defaultValue 'neutral'
   */
  @Prop() variant?: 'dark' | 'white' | 'info' | 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';

  /**
   * Specifies a material icon name to be displayed.
   */
  @Prop() icon?: string | IIconOptions | IMultiIconOptions;

  /**
   * The style attribute of container element
   */
  @Prop() containerStyle?: CSSStyleProperties = null;

  componentWillLoad() {
    this.hasContentSlot = !!this.el.querySelector('[slot="content"]');
  }

  componentDidLoad() {
    this.triggerElement = this.el.querySelector('[slot="trigger"]');

    this.triggerElement?.addEventListener('mouseenter', this.handleMouseEnter);
    this.triggerElement?.addEventListener('mouseleave', this.handleMouseLeave);
    addDialogScrollListener(this.el, () => {
      this.isOpen = false;
    });
  }

  componentDidUpdate() {
    if (this.isOpen) {
      // Clean up old floating UI listeners before setting up new ones
      this.cleanup?.();
      this.updatePosition();
    } else {
      // Remove floating UI listeners when tooltip closes
      this.cleanup?.();
      // Clear reference to allow garbage collection
      this.cleanup = null;
    }
  }

  disconnectedCallback() {
    // Clean up floating UI listeners on component unmount
    this.cleanup?.();
    // Clear reference to allow garbage collection
    this.cleanup = null;
    removeDialogScrollListener(this.el);
  }

  private updatePosition() {
    this.cleanup = floatingElementAutoUpdate(this.triggerElement, this.tooltipElement, this.arrowElement, { placement: this.position });
  }

  private handleMouseEnter = () => {
    this.isOpen = true;
  };

  private handleMouseLeave = () => {
    this.isOpen = false;
  };

  render() {
    let iconVariant;

    if (this.variant == 'dark') iconVariant = 'neutral';
    else iconVariant = this.variant;

    let _leftIcon: HTMLTkIconElement;
    let _rightIcon: HTMLTkIconElement;
    if (this.icon) {
      const { leftIcon, rightIcon } = renderIcons(this.icon, {
        variant: iconVariant,
        sign: true,
        size: 'small',
        additionalProps: { class: classNames('tk-tooltip-item-icon') },
      });
      _leftIcon = leftIcon;
      _rightIcon = rightIcon;
    }

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
                {_leftIcon}
                <div>
                  <div class="tk-tooltip-header">{this.header}</div>
                  <div class="tk-tooltip-description">{this.description}</div>
                </div>
                {_rightIcon}
              </Fragment>
            )}
            <div ref={el => (this.arrowElement = el as HTMLElement)} class="tk-tooltip-arrow"></div>
          </div>
        )}
      </div>
    );
  }
}
