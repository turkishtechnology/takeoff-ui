import { Component, Method, Prop, State, Watch, h, Event, EventEmitter, Element, ComponentInterface } from '@stencil/core';
import classNames from 'classnames';
import { getIconElementProps } from '../../utils/icon-props';

/**
 * The `TkDialog` component provides a customizable modal dialog for displaying important information or requesting user input. It supports various configurations including different header types, variants, and customizable content.
 * @slot default - Default slot to detect child to inner content.
 * @slot container - Custom container template.
 * @slot header - Custom header template.
 * @slot content - Custom content template.
 * @slot footer - Custom footer template.
 * @slot footer-actions - Custom actions template to default footer.
 * @react `import { TkDialog } from '@takeoff-ui/react'`
 * @vue `import { TkDialog } from '@takeoff-ui/vue'`
 * @angular `import { TkDialog } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-dialog',
  styleUrl: 'tk-dialog.scss',
})
export class TkDialog implements ComponentInterface {
  private bodyOverflow: string;
  private bodyPaddingRight: string;

  @Element() el: HTMLTkDialogElement;

  @State() hasContainerSlot: boolean;
  @State() hasContentSlot: boolean;
  @State() hasDefaultSlotContent: boolean;
  @State() hasFooterActionsSlot: boolean;
  @State() hasFooterSlot: boolean;
  @State() hasHeaderSlot: boolean;

  /**
   * Controls the visibility of the dialog
   */
  @Prop({ reflect: true }) visible: boolean = false;
  @Watch('visible')
  visibleChanged(newValue: boolean) {
    if (newValue) {
      this.tkOpen.emit();
      if (!this.hideBackdrop) {
        this.blockBodyScroll();
      }
    } else {
      this.tkClose.emit();
      if (!this.hideBackdrop) {
        this.unblockBodyScroll();
      }
    }
  }

  /**
   * The header text
   */
  @Prop() header: string;

  /**
   * Header type
   */
  @Prop() headerType: 'basic' | 'divided' | 'light' | 'dark' | 'primary' = 'basic';

  /**
   * Controls whether the close button is shown
   */
  @Prop() showCloseButton: boolean = true;

  /**
   * Controls whether the header is shown
   */
  @Prop() showHeader: boolean = true;

  /**
   * Controls whether the variant sign is shown
   */
  @Prop() showVariantSign: boolean = true;

  /**
   * The subheader text
   */
  @Prop() subheader: string;

  /**
   * The variant of the dialog
   */
  @Prop() variant: 'success' | 'info' | 'warning' | 'danger' = 'info';

  /**
   * Controls whether the backdrop is shown
   * @defaultValue false
   */
  @Prop() hideBackdrop: boolean = false;

  /**
   * Appearance of the mask
   * @defaultValue base
   */
  @Prop() maskVariant: 'lightest' | 'light' | 'base' | 'dark' | 'darkest' = 'base';

  /**
   * The style attribute of container element
   */
  @Prop() containerStyle?: any = null;

  /**
   * Prevents the dialog from being dismissed by clicking outside
   * @defaultValue false
   */
  @Prop() preventDismiss: boolean = false;

  /**
   * Event emitted when the dialog is closed
   */
  @Event({ eventName: 'tk-close' }) tkClose: EventEmitter<void>;

  /**
   * Event emitted when the dialog is opened
   */
  @Event({ eventName: 'tk-open' }) tkOpen: EventEmitter<void>;

  /**
   * Event emitted when the dialog visibility changes
   */
  @Event({ eventName: 'tk-visible-change' }) tkVisibleChange: EventEmitter<boolean>;

  componentWillLoad() {
    this.hasContainerSlot = !!this.el.querySelector('[slot="container"]');
    this.hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
    this.hasContentSlot = !!this.el.querySelector('[slot="content"]');
    this.hasFooterSlot = !!this.el.querySelector('[slot="footer"]');
    this.hasFooterActionsSlot = !!this.el.querySelector('[slot="footer-actions"]');

    this.hasDefaultSlotContent = Array.from(this.el.childNodes).some(node => {
      return node.nodeType === Node.ELEMENT_NODE && !(node as HTMLElement).hasAttribute('slot');
    });
  }

  disconnectedCallback() {
    if (!this.hideBackdrop) {
      this.unblockBodyScroll();
    }
  }

  /**
   * Requests to open the dialog by emitting a tk-open event.
   * Note: This method only emits an event. The dialog will only open if the parent component
   * listens for this event and updates the 'visible' prop to true.
   */
  @Method()
  async open() {
    this.tkOpen.emit();
  }

  /**
   * Requests to close the dialog by emitting a tk-close event.
   * Note: This method only emits an event. The dialog will only close if the parent component
   * listens for this event and updates the 'visible' prop to false.
   */
  @Method()
  async close() {
    this.tkClose.emit();
  }

  private blockBodyScroll() {
    if (document.body.style.overflow !== 'hidden') {
      this.bodyOverflow = document.body.style.overflow;
      this.bodyPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    }
  }

  private unblockBodyScroll() {
    document.body.style.overflow = this.bodyOverflow;
    document.body.style.paddingRight = this.bodyPaddingRight;
  }

  private getVariantIcon() {
    switch (this.variant) {
      case 'success':
        return 'check_circle';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'error';
      default:
        return 'info';
    }
  }

  private handleCloseButtonClick = () => {
    this.tkClose.emit();
    this.tkVisibleChange.emit(false);
  };

  private handleOverlayClick = () => {
    if (!this.preventDismiss) {
      this.tkClose.emit();
      this.tkVisibleChange.emit(false);
    }
  };

  private createHeader() {
    if (this.showHeader) {
      if (this.hasHeaderSlot) {
        return <slot name="header"></slot>;
      } else {
        const headerClasses = classNames('tk-dialog-header', `tk-dialog-header-${this.headerType}`);

        return (
          <div class={headerClasses}>
            <div class="tk-dialog-header-content">
              {this.showVariantSign && (
                <tk-icon
                  sign
                  size="xlarge"
                  {...getIconElementProps(this.getVariantIcon(), { class: classNames('fill tk-dialog-sign-icon'), variant: this.variant }, 'rounded', 'span')}
                />
              )}
              <div class="tk-dialog-title-container">
                {this.subheader && <span class="tk-dialog-subtitle">{this.subheader}</span>}
                {this.header && <span class="tk-dialog-title">{this.header}</span>}
              </div>
            </div>
            {this.showCloseButton && (
              <tk-button variant="neutral" icon="close" size="small" type="text" onTk-click={this.handleCloseButtonClick} aria-label="Close dialog"></tk-button>
            )}
          </div>
        );
      }
    }
    return null;
  }

  private createContent() {
    if (this.hasContentSlot) {
      return (
        <div class="tk-dialog-content">
          <slot name="content"></slot>
        </div>
      );
    } else if (this.hasDefaultSlotContent) {
      return (
        <div class="tk-dialog-content">
          <slot></slot>
        </div>
      );
    }

    return null;
  }

  private createFooter() {
    if (this.hasFooterSlot) {
      return <slot name="footer"></slot>;
    } else if (this.hasFooterActionsSlot) {
      return (
        <div class="tk-dialog-footer">
          <slot name="footer-actions"></slot>
        </div>
      );
    }
    return null;
  }

  private createDialog() {
    const header = this.createHeader();
    const content = this.createContent();
    const footer = this.createFooter();

    const dialogClasses = classNames('tk-dialog', `tk-dialog-${this.variant}`);
    const rootProps = {
      'class': dialogClasses,
      'style': { ...this.containerStyle },
      'role': 'dialog',
      'aria-modal': true,
    };

    return (
      <div {...rootProps}>
        {header}
        {content}
        {footer}
      </div>
    );
  }

  private renderMask() {
    const dialog = this.hasContainerSlot ? <slot name="container"></slot> : this.createDialog();
    const maskClasses = classNames('tk-dialog-mask', `tk-dialog-mask-${this.maskVariant}`, {
      'tk-dialog-visible': this.visible,
      'tk-dialog-mask-hidden': this.hideBackdrop,
    });
    return (
      <div class={maskClasses}>
        <div class="tk-dialog-overlay" onClick={() => this.handleOverlayClick()}></div>
        {dialog}
      </div>
    );
  }
  render() {
    return this.renderMask();
  }
}
