import { Component, ComponentInterface, h, Prop, State, Element, Watch } from '@stencil/core';
import { computePosition, offset, flip, shift, arrow } from '@floating-ui/dom';

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
      window.addEventListener('click', this.handleDocumentClick);
    }
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

  private updatePosition() {
    computePosition(this.triggerElement, this.popoverElement, {
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
      this.updateArrowPosition(side);
    });
  }

  private updateArrowPosition(side?: string) {
    const arrowElement = this.arrowElement;
    switch (side) {
      case 'top':
        arrowElement.style.bottom = '-5px';
        arrowElement.style.borderTop = 'none';
        arrowElement.style.borderLeft = 'none';
        break;
      case 'bottom':
        arrowElement.style.top = '-5px';
        arrowElement.style.borderBottom = 'none';
        arrowElement.style.borderRight = 'none';

        break;
      case 'left':
        arrowElement.style.right = '-5px';
        arrowElement.style.borderBottom = 'none';
        arrowElement.style.borderLeft = 'none';
        break;
      case 'right':
        arrowElement.style.left = '-5px';
        arrowElement.style.borderTop = 'none';
        arrowElement.style.borderRight = 'none';
        break;
    }
  }

  private handleDocumentClick = (e: MouseEvent) => {
    const isInnerClicked = e.composedPath().some(item => item == this.el);
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
