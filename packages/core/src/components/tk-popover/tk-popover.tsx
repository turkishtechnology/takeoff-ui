import { Component, ComponentInterface, h, Prop, State, Element, Watch, Method, Event, EventEmitter } from '@stencil/core';
import { floatingElementAutoUpdate } from '../../utils/position-utils';

import { ClickOutsideMixin } from '../../utils/clickoutside-mixin';
import { CSSStyleProperties } from '../../global/types';
import { getDataTestidAttribute } from '../../utils/test-id-utils';

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
  private clickOutsideMixin?: ClickOutsideMixin;

  @Element() el: HTMLTkPopoverElement;

  @State() isOpen: boolean = false;
  @Watch('isOpen')
  isOpenChanged() {
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
      this.updatePosition();
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
  @Prop() containerStyle?: CSSStyleProperties = null;

  /**
   * Sets the data-testid attribute on the root container element.
   */
  @Prop({ reflect: true }) dataTestid?: string;

  /**
   * Emitted when the open state of the popover changes
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<boolean>;

  /**
   * Click outside handler implementation - called by the mixin
   */

  private closeHandler = (): void => {
    this.isOpen = false;
  };

  private get isHover() {
    return this.trigger === 'hover';
  }

  componentWillLoad() {
    this.hasContentSlot = !!this.el.querySelector('[slot="content"]');
  }

  componentDidLoad() {
    // Initialize click outside mixin
    this.clickOutsideMixin = new ClickOutsideMixin({
      referenceElement: this.el,
      handler: this.closeHandler,
      disabled: this.isHover || !this.isOpen,
    });

    this.triggerElement = this.el.querySelector('[slot="trigger"]');
    if (this.trigger === 'hover') {
      this.triggerElement?.addEventListener('mouseenter', () => (this.isOpen = true));
      this.triggerElement?.addEventListener('mouseleave', () => (this.isOpen = false));
    } else {
      this.triggerElement?.addEventListener('click', () => (this.isOpen = !this.isOpen));
    }
  }

  disconnectedCallback() {
    if (this.trigger === 'hover') {
      this.triggerElement?.removeEventListener('mouseenter', () => (this.isOpen = true));
      this.triggerElement?.removeEventListener('mouseleave', () => (this.isOpen = false));
    } else {
      this.triggerElement?.removeEventListener('click', () => (this.isOpen = !this.isOpen));
    }
    // Clean up floating UI listeners on component unmount
    this.cleanup?.();
    // Clear reference to allow garbage collection
    this.cleanup = null;

    // Call mixin's disconnectedCallback for cleanup
    this.clickOutsideMixin?.disconnectedCallback();
  }

  componentDidUpdate() {
    // Update click outside disabled state based on trigger type and open state
    this.clickOutsideMixin.updateConfig({ disabled: this.isHover || !this.isOpen });

    if (this.isOpen) {
      // Clean up old floating UI listeners before setting up new ones
      this.cleanup?.();
      this.updatePosition();
    } else {
      // Remove floating UI listeners when popover closes
      this.cleanup?.();
      // Clear reference to allow garbage collection
      this.cleanup = null;
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
    this.cleanup = floatingElementAutoUpdate(this.triggerElement, this.popoverElement, this.arrowElement, { placement: this.position });
  }

  render() {
    return (
      <div class="tk-popover" {...getDataTestidAttribute(this.dataTestid, 'popover')}>
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
            {...getDataTestidAttribute(this.dataTestid, 'popover', 'content')}
          >
            {this.hasContentSlot && <slot name="content" />}
            <div ref={el => (this.arrowElement = el as HTMLElement)} class="tk-popover-arrow" {...getDataTestidAttribute(this.dataTestid, 'popover', 'arrow')}></div>
          </div>
        )}
      </div>
    );
  }
}
