import { Component, Prop, h, State, Watch, Element, Event, EventEmitter, Method } from '@stencil/core';
import classNames from 'classnames';

/**
 * The `TkDrawer` is a container component displayed as an overlay. It supports various features such as different header and footer types, multiple variants, and flexible positioning, making it suitable for a wide range of use cases.
 * @slot container - Custom container template.
 * @slot header - Custom header template.
 * @slot header-action - Custom actions template of header.
 * @slot content - Custom inner body template.
 * @slot footer - Custom footer template.
 * @react `import { TkDrawer } from '@takeoff-ui/react'`
 * @vue `import { TkDrawer } from '@takeoff-ui/vue'`
 * @angular `import { TkDrawer } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-drawer',
  styleUrl: 'tk-drawer.scss',
  shadow: true,
})
export class TkDrawer {
  private bodyOverflow: string;
  private bodyPaddingRight: string;

  @Element() el: HTMLTkDrawerElement;

  @State() containerVisible: boolean = false;
  @State() isOpen: boolean = false;

  /**
   * Controls whether the drawer is open or closed
   * @defaultValue false
   */
  @Prop({ reflect: true }) open: boolean = false;
  @Watch('open')
  openChanged(newValue: boolean) {
    if (newValue) {
      requestAnimationFrame(() => {
        this.isOpen = true;
        this.onEnter();
      });
    } else {
      this.isOpen = false;
      this.onLeave();
    }
    this.containerVisible = newValue;
    this.tkDrawerChange.emit(newValue);
  }

  /**
   * Determines the position of the drawer
   * @defaultValue right
   */
  @Prop() position: 'left' | 'right' | 'top' | 'bottom' | 'full-screen' = 'right';

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
   * Prevents the drawer from being dismissed by clicking outside
   * @defaultValue false
   */
  @Prop() preventDismiss: boolean = false;

  /**
   * Controls whether to hide the close icon
   * @defaultValue false
   */
  @Prop() hideCloseIcon: boolean = false;

  /**
   * Controls whether to unblock scrolling when the drawer is open
   * @defaultValue false
   */
  @Prop() unblockScroll: boolean = false;

  /**
   * Text to display in the drawer header
   */
  @Prop() header?: string;

  /**
   * The type of the header
   * @defaultValue 'basic'
   */
  @Prop() headerType: 'basic' | 'divided' | 'light' | 'dark' | 'primary' = 'basic';

  /**
   * The mode of the footer
   * @defaultValue 'basic'
   */
  @Prop() footerType: 'basic' | 'divided' | 'light' = 'basic';

  /**
   * Emitted when the drawer is closed
   */
  @Event({ eventName: 'tk-drawer-close' }) tkDrawerClose: EventEmitter<void>;

  /**
   * Emitted when the drawer is opened
   */
  @Event({ eventName: 'tk-drawer-open' }) tkDrawerOpen: EventEmitter<void>;

  /**
   * Emitted when the drawer starts to enter
   */
  @Event({ eventName: 'tk-drawer-enter' }) tkDrawerEnter: EventEmitter<void>;

  /**
   * Emitted when the drawer starts to leave
   */
  @Event({ eventName: 'tk-drawer-leave' }) tkDrawerLeave: EventEmitter<void>;

  /**
   * Emitted when the drawer's open state changes
   */
  @Event({ eventName: 'tk-drawer-change' }) tkDrawerChange: EventEmitter<boolean>;

  componentWillLoad() {
    if (this.open) {
      this.containerVisible = true;

      requestAnimationFrame(() => {
        this.isOpen = true;
        this.onEnter();
      });
    }
  }

  /**
   * Opens the drawer by emitting a tk-drawer-open event
   * Parent components should listen for this event and update the open prop
   */
  @Method()
  async show() {
    this.tkDrawerOpen.emit();
  }

  /**
   * Closes the drawer by emitting a tk-drawer-close event
   * Parent components should listen for this event and update the open prop
   */
  @Method()
  async close() {
    this.tkDrawerClose.emit();
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

  private getTransformValue(): string {
    if (!this.isOpen) {
      switch (this.position) {
        case 'left':
          return 'translateX(-100%)';
        case 'right':
          return 'translateX(100%)';
        case 'top':
          return 'translateY(-100%)';
        case 'bottom':
          return 'translateY(100%)';
        default:
          return '';
      }
    }
    return 'translate(0, 0)';
  }

  private onEnter() {
    if (!this.unblockScroll && !this.hideBackdrop) {
      this.blockBodyScroll();
    }

    this.tkDrawerEnter.emit();

    setTimeout(() => {
      this.tkDrawerOpen.emit();
    }, 300);
  }

  private onLeave() {
    if (!this.unblockScroll && !this.hideBackdrop) {
      this.unblockBodyScroll();
    }

    this.tkDrawerLeave.emit();

    // setTimeout(() => {
    this.containerVisible = false;
    this.tkDrawerClose.emit();
    // }, 300);
  }

  private handleOverlayClick = () => {
    if (!this.preventDismiss) {
      this.tkDrawerClose.emit();
    }
  };

  private handleCloseButtonClick = () => {
    this.tkDrawerClose.emit();
  };

  private createHeader() {
    const hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
    const hasHeaderActionsSlot = !!this.el.querySelector('[slot="header-actions"]');

    return (
      <div class={classNames('tk-drawer-header', `tk-drawer-header-${this.headerType}`)}>
        {hasHeaderSlot ? <slot name="header"></slot> : this.header ? <span class="tk-drawer-header-label">{this.header}</span> : null}
        {hasHeaderActionsSlot ? (
          <slot name="header-actions"></slot>
        ) : (
          !this.hideCloseIcon && <tk-button class="tk-drawer-close" variant="neutral" icon="close" type="text" onTk-click={this.handleCloseButtonClick}></tk-button>
        )}
      </div>
    );
  }

  private createFooter() {
    const hasFooterSlot = !!this.el.querySelector('[slot="footer"]');

    if (hasFooterSlot) {
      return (
        <div class={classNames('tk-drawer-footer', `tk-drawer-footer-${this.footerType}`)}>
          <slot name="footer"></slot>
        </div>
      );
    }

    return null;
  }

  private createDrawer() {
    const drawerClass = classNames('tk-drawer', `tk-drawer-${this.position}`, {
      'tk-drawer-open': this.isOpen,
    });

    const style = {
      ...(this.containerStyle && { ...this.containerStyle }),
      transform: this.getTransformValue(),
    };

    return (
      <div class={drawerClass} style={style}>
        <div class="tk-drawer-content">
          <slot name="container">
            {this.createHeader()}
            <div class="tk-drawer-body">
              <slot name="content"></slot>
            </div>
            {this.createFooter()}
          </slot>
        </div>
      </div>
    );
  }

  private renderMask() {
    const maskClasses = classNames('tk-drawer-mask', `tk-drawer-mask-${this.maskVariant}`, {
      'tk-drawer-visible': this.containerVisible,
      'tk-drawer-mask-hidden': this.hideBackdrop,
    });
    return (
      <div class={maskClasses}>
        <div class="tk-drawer-overlay" onClick={() => this.handleOverlayClick()}></div>
        {this.createDrawer()}
      </div>
    );
  }

  render() {
    return this.containerVisible && this.renderMask();
  }
}
