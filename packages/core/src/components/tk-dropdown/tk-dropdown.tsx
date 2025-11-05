import { Component, ComponentInterface, Element, Prop, State, Event, EventEmitter, h } from '@stencil/core';
import { computePosition, offset, flip, shift, autoUpdate } from '@floating-ui/dom';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { addDialogScrollListener, removeDialogScrollListener } from '../../utils/dialog-utils';
import { applyStyles } from '../../utils/style-utils';
import { ClickOutsideMixin } from '../../utils/clickoutside-mixin';

/**
 * TkDropdown creates a dropdown with a trigger element. Items in the options prop can be listed and templated.
 * @slot trigger - The trigger slot defines the element that will trigger the dropdown
 * @slot empty-data - Set how the dropdown will appear when there is no data
 * @react `import { TkDropdown } from '@takeoff-ui/react'`
 * @vue `import { TkDropdown } from '@takeoff-ui/vue'`
 * @angular `import { TkDropdown } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-dropdown',
  styleUrl: 'tk-dropdown.scss',
})
export class TkDropdown implements ComponentInterface {
  private hasEmptyDataSlot: boolean = false;
  private uniqueId: string;
  private triggerRef?: HTMLElement;
  private panelRef?: HTMLDivElement;
  private cleanup;
  private clickOutsideMixin?: ClickOutsideMixin;

  @Element() el: HTMLTkDropdownElement;

  constructor() {
    this.uniqueId = uuidv4();
  }

  @State() isOpen: boolean = false;

  /**
   * The disabled status.
   * @defaultValue false
   */
  @Prop() disabled: boolean = false;

  /**
   * The message to display when there is no data available.
   */
  @Prop() emptyMessage: string = 'No options available';

  /**
   * Provides a function to customize the options.
   */
  @Prop() optionHtml: Function;

  /**
   * The key to use for option labels
   * @defaultValue label
   */
  @Prop() optionLabelKey: string = 'label';

  /**
   * The key to use for option values
   * @defaultValue value
   */
  @Prop() optionValueKey: string = 'value';

  /**
   * The key to use for group names when options are grouped
   * @defaultValue groupName
   */
  @Prop() groupNameKey: string = 'groupName';

  /**
   * The key to use for grouped options array
   * @defaultValue options
   */
  @Prop() groupOptionsKey: string = 'options';

  /**
   * The list of options to be displayed in the select box.
   */
  @Prop() options: any[];

  /**
   * Indicates the alignment of options.
   * @defaultValue left
   */
  @Prop() optionsAlign: 'left' | 'center' | 'right' = 'left';

  /**
   * Sets the position of the tooltip.
   * @defaultValue 'right'
   */
  @Prop() position?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' =
    'bottom';

  /**
   * Sets size for the dropdown panel.
   * @defaultValue base
   */
  
  @Prop() size?: 'large' | 'base' | 'small' = 'base';


  /**
   * Emitted when the value has changed.
   */
  @Event({ eventName: 'tk-item-click' }) tkItemClick!: EventEmitter<any>;

  /**
   * Click outside handler implementation - called by the mixin
   */
  private clickOutsideHandler = (): void => {
    this.isOpen = false;
  };

  componentWillLoad() {
    this.hasEmptyDataSlot = !!this.el.querySelector('[slot="empty-data"]');

    this.triggerRef = this.el.querySelector('[slot="trigger"]');
    if (this.triggerRef && !this.disabled) {
      this.triggerRef.style.cursor = 'pointer';
      this.triggerRef.addEventListener('click', () => {
        this.isOpen = !this.isOpen;
      });
    }
  }

  componentDidLoad(): void {
    // Initialize click outside mixin
    this.clickOutsideMixin = new ClickOutsideMixin({
      referenceElement: this.el,
      handler: this.clickOutsideHandler,
      disabled: this.disabled || !this.isOpen,
    });

    addDialogScrollListener(this.el);
  }

  componentDidUpdate() {
    // Update click outside disabled state based on disabled prop and open state
    this.clickOutsideMixin.updateConfig({ disabled: this.disabled || !this.isOpen });

    if (this.isOpen) {
      this.cleanup = autoUpdate(this.triggerRef, this.panelRef, () => this.updatePosition(), {
        animationFrame: true,
      });
    } else {
      this.cleanup && this.cleanup();
    }
  }

  disconnectedCallback() {
    removeDialogScrollListener(this.el);

    // Call mixin's disconnectedCallback for cleanup
    this.clickOutsideMixin?.disconnectedCallback();
  }

  private updatePosition() {
    if (this.triggerRef && this.panelRef) {
      computePosition(this.triggerRef, this.panelRef, {
        placement: this.position,
        middleware: [offset(4), flip(), shift({ padding: 5 })],
      }).then(({ x, y }) => {
        applyStyles(this.panelRef, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
  }

  private isGrouped(): boolean {
    return this.options?.length > 0 && this.options[0].hasOwnProperty(this.groupNameKey);
  }

  private getOptionLabel(item: any): string {
    return typeof item === 'object' ? item[this.optionLabelKey] : item;
  }

  private handleItemClick(item) {
    this.isOpen = false;
    this.tkItemClick.emit(item);
  }

  private createOptionItem(options: any[]) {
    return options?.map((item, index) => {
      let optionItem;
      if (this.optionHtml != undefined) {
        optionItem = this.optionHtml(item);
      } else {
        optionItem = this.getOptionLabel(item);
      }
      return (
        <div
          class={classNames('tk-dropdown-item', this.optionsAlign, { disabled: item?.disabled })}
          data-option-index={index}
          data-active={index == 0 ? 'true' : 'false'}
          onClick={() => this.handleItemClick(item)}
          innerHTML={optionItem}
        ></div>
      );
    });
  }

  private createOptions() {
    if (this.isGrouped()) {
      return this.options?.map(group => {
        return (
          <div class="tk-dropdown-group">
            <div class="tk-dropdown-group-label">
              <label>{group[this.groupNameKey]}</label>
              <div class="line"></div>
            </div>
            {this.createOptionItem(group[this.groupOptionsKey])}
          </div>
        );
      });
    } else {
      return this.createOptionItem(this.options);
    }
  }

  private renderDropdown() {
    if (!this.isOpen) return null;

    return (
      <div class="tk-dropdown-panel" ref={el => (this.panelRef = el as HTMLDivElement)} data-tk-dropdown-id={this.uniqueId}>
        <div class="tk-dropdown-item-holder">{this.options?.length > 0 ? this.createOptions() : this.hasEmptyDataSlot ? <slot name="empty-data"></slot> : this.emptyMessage}</div>
      </div>
    );
  }

  render() {
    const rootClasses = classNames('tk-dropdown-container', this.size);

    return (
      <div class={rootClasses} data-tk-dropdown-id={this.uniqueId}>
        <slot name="trigger"></slot>
        {this.renderDropdown()}
      </div>
    );
  }
}
