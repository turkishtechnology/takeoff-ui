import { Component, ComponentInterface, h, Prop, State, Element, Watch, Method, Event, EventEmitter } from '@stencil/core';
import { computePosition, offset, flip, shift, arrow } from '@floating-ui/dom';
import { addDialogScrollListener, removeDialogScrollListener } from '../../utils/dialog-utils';
import { updateArrowPosition } from '../../utils/position-utils';

/**
 * The TkPopover displays additional information when triggered. By default, it opens when clicked, but can also be configured to open on hover.
 * @slot - Default slot for content without a specific name
 * @slot trigger - The trigger slot defines the element that will trigger the Popover
 * @slot content - Define custom HTML content for the Popover, which replaces the default header, description and icon elements
 * @react `import { TkPopover } from '@takeoff-ui/react'`
 * @vue `import { TkPopover } from '@takeoff-ui/vue'`
 * @angular `import { TkPopover } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-popover',
  styleUrl: 'tk-popover.scss',
  shadow: true,
})
export class TkPopover implements ComponentInterface {
  private popoverElement: HTMLElement;
  private triggerElement: HTMLElement;
  private arrowElement: HTMLElement;
  private cleanup;

  @Element() el: HTMLTkPopoverElement;

  @State() isOpen: boolean = false;
  @Watch('isOpen')
  isOpenChanged() {
    console.log('isOpen', this.isOpen);
    this.tkChange.emit(this.isOpen);
  }

  /**
   * Controls if popover has custom content.
   * @defaultValue false
   */
  @State() hasContentSlot: boolean = false;

  /**
   * Sets the action of the popover.
   * @defaultValue 'click'
   */
  @Prop() trigger?: 'click' | 'hover' = 'click';

  /**
   * Sets the position of the popover.
   * @defaultValue 'right'
   */
  @Prop() position?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

  @Watch('position')
  positionChanged() {
    if (this.popoverElement) {
      this.updateArrowPosition();
    }
  }

  /**
   * Sets the type of the popover.
   * @defaultValue "white"
   */
  @Prop() type: 'white' | 'dark' | 'basic' = 'basic';

  /**
   * The style attribute of container element
   */
  @Prop() containerStyle?: any = null;

  /**
   * Emitted when the open state of the popover changes
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<boolean>;

  componentWillLoad() {
    this.hasContentSlot = !!this.el.querySelector('[slot="content"]');
  }

  componentDidLoad() {
    this.triggerElement = this.el.querySelector('[slot="trigger"]');
    if (this.trigger === 'hover') {
      this.triggerElement?.addEventListener('mouseenter', () => (this.isOpen = true));
      this.triggerElement?.addEventListener('mouseleave', () => (this.isOpen = false));
    } else {
      this.triggerElement?.addEventListener('click', () => (this.isOpen = !this.isOpen));
      document.addEventListener('click', this.handleDocumentClick);
    }

    addDialogScrollListener(this.el);
  }

  disconnectedCallback() {
    if (this.trigger === 'hover') {
      this.triggerElement?.removeEventListener('mouseenter', () => (this.isOpen = true));
      this.triggerElement?.removeEventListener('mouseleave', () => (this.isOpen = false));
    } else {
      this.triggerElement?.removeEventListener('click', () => (this.isOpen = !this.isOpen));
      document.removeEventListener('click', this.handleDocumentClick);
    }
    this.cleanup && this.cleanup();
    removeDialogScrollListener(this.el);
  }

  componentDidUpdate() {
    if (this.isOpen) {
      const updatePosition = () => {
        if (this.isOpen) {
          requestAnimationFrame(() => this.updatePosition());
        }
      };

      window.addEventListener('scroll', updatePosition, { passive: true });
      window.addEventListener('resize', updatePosition, { passive: true });

      this.cleanup = () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };

      this.updatePosition();
    } else {
      this.cleanup && this.cleanup();
    }
  }

  /**
   * Closes the popover
   */
  @Method()
  async close() {
    this.isOpen = false;
  }

  private updatePosition() {
    computePosition(this.triggerElement, this.popoverElement, {
      strategy: 'fixed',
      placement: this.position,
      middleware: [offset(8), flip(), shift(), arrow({ element: this.arrowElement })],
    }).then(({ x, y, middlewareData, placement }) => {
      Object.assign(this.popoverElement.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      const { x: arrowX, y: arrowY } = middlewareData.arrow;
      Object.assign(this.arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
      });

      const [side] = placement.split('-');
      updateArrowPosition(this.arrowElement, side);
    });
  }

  private handleDocumentClick = (e: MouseEvent) => {
    const isInnerClicked = e.composedPath().some(item => item === this.el);
    if (!isInnerClicked) {
      this.isOpen = false;
    }
  };

  render() {
    return (
      <div class="tk-popover">
        <slot name="trigger" />
        {this.isOpen && (
          <div
            ref={el => (this.popoverElement = el as HTMLElement)}
            class={{
              'tk-popover-content': true,
              [`tk-popover-${this.type}`]: true,
            }}
            style={{ ...this.containerStyle }}
            role="popover"
            onClick={e => e.stopPropagation()}
          >
            {this.hasContentSlot && <slot name="content" />}
            <div ref={el => (this.arrowElement = el as HTMLElement)} class="tk-popover-arrow"></div>
          </div>
        )}
      </div>
    );
  }
}
