import { Component, h, Element, Prop, ComponentInterface, Watch, Event, type EventEmitter, State } from '@stencil/core';
import { isEqual } from 'lodash';
import { IIconOptions } from '../../global/interfaces/IIconOptions';
import type { AccordionItemIndex, ActiveIndex, IAccordionItemSelect } from './types';

/**
 * The TkAccordion component is a user interface element that organizes content under headers, allowing users to expand and collapse sections by clicking on each header. It is particularly useful for improving layout and readability on pages with extensive information.
 * @slot default - Default slot to detect TkAccordionItem components.
 * @react `import { TkAccordion, TkAccordionItem } from '@takeoff-ui/react'`
 * @vue `import { TkAccordion, TkAccordionItem } from '@takeoff-ui/vue'`
 * @angular `import { TkAccordion, TkAccordionItem } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-accordion',
  styleUrl: 'tk-accordion.scss',
  shadow: true,
})
export class TkAccordion implements ComponentInterface {
  @Element() el: HTMLTkAccordionElement;

  @State() private internalActiveIndex: AccordionItemIndex[] = [];
  @Watch('internalActiveIndex')
  internalActiveIndexChanged(newValue: AccordionItemIndex[], oldValue: AccordionItemIndex[]): void {
    // Exit early if the active index hasn't changed
    if (isEqual(newValue, oldValue)) return;
    this.updateActiveIndex();
  }

  /**
   * Currently active panel indexes. Can be a single value or an array.
   * When allowMultiple is false, only the last value in the array will be used.
   * Has priority over AccordionItem's active prop. To prevent conflicts, avoid using both simultaneously.
   */
  @Prop() activeIndex?: ActiveIndex;
  @Watch('activeIndex')
  activeIndexChanged(): void {
    const normalized = this.normalizeActiveIndex();
    if (isEqual(normalized, this.internalActiveIndex)) return;

    this.internalActiveIndex = normalized;
  }

  /**
   * Allows multiple accordion items to be expanded simultaneously.
   * @defaultValue false
   */
  @Prop() allowMultiple: boolean = false;

  /**
   * Sets the position of opening and closing chevrons.
   * @defaultValue 'right'
   */
  @Prop() arrowPosition: 'left' | 'right' = 'right';

  /**
   * Sets the expand icon
   * @defaultValue 'keyboard_arrow_down'
   */
  @Prop() expandIcon: string | IIconOptions = 'keyboard_arrow_down';

  /**
   * Sets the collapse icon
   * @defaultValue 'keyboard_arrow_up'
   */
  @Prop() collapseIcon: string | IIconOptions = 'keyboard_arrow_up';

  /**
   * Whether to hide the arrow icons.
   * @defaultValue false
   */
  @Prop() hideArrows: boolean = false;

  /**
   * Sets accordion style for the component.
   * @defaultValue 'grouped'
   */
  @Prop() type: 'grouped' | 'divided' = 'grouped';

  /**
   * Emitted when an active index is changed
   */
  @Event() tkActiveIndexChange: EventEmitter<ActiveIndex>;

  /**
   * Emitted when an accordion item is selected
   */
  @Event() tkItemToggle: EventEmitter<IAccordionItemSelect>;

  /**
   * Emitted when an accordion item is selected
   * @deprecated
   */
  @Event() tkAccordionItemSelected: EventEmitter<Omit<IAccordionItemSelect, 'itemKey'>>;

  componentDidLoad() {
    this.initInternalActiveIndex();
    this.initEventListeners();
  }

  private initInternalActiveIndex() {
    // if prop activeIndex is set, use it
    if (this.activeIndex || this.activeIndex === 0) return (this.internalActiveIndex = this.normalizeActiveIndex());
    // else if accordion items have active prop, use them
    this.getAccordionItems().forEach((item, index) => {
      if (item.active) this.internalActiveIndex = [...this.internalActiveIndex, this.getItemKey(item, index)];
    });

    this.updateActiveIndex();
  }

  private initEventListeners() {
    this.getAccordionItems().forEach((item, index) => {
      const itemKey = this.getItemKey(item, index);

      // listen to active change
      item.addEventListener('tk-active-change', e => {
        this.handleItemActiveChange(itemKey, index, e.detail);
        item.active = e.detail;
      });
    });
  }

  private normalizeActiveIndex(): AccordionItemIndex[] {
    if (!this.activeIndex) return [];
    if (!Array.isArray(this.activeIndex)) return [this.activeIndex];
    if (this.allowMultiple) return this.activeIndex;
    const lastItem = this.activeIndex.at(-1);
    return lastItem ? [lastItem] : [];
  }

  private getActiveIndex(): ActiveIndex {
    return this.allowMultiple ? this.internalActiveIndex : this.internalActiveIndex[this.internalActiveIndex.length - 1];
  }

  private updateActiveIndex() {
    const activeIndex = this.getActiveIndex();
    if (!isEqual(activeIndex, this.activeIndex)) this.tkActiveIndexChange.emit(activeIndex);
  }

  private handleItemActiveChange(itemKey: AccordionItemIndex, index: AccordionItemIndex, active: boolean): void {
    this.internalActiveIndex = active ? [...this.internalActiveIndex, itemKey] : this.internalActiveIndex.filter(activeIndex => String(activeIndex) !== String(itemKey));

    this.tkItemToggle.emit({
      index,
      itemKey,
      active,
    });
    this.tkAccordionItemSelected.emit({
      index: itemKey,
      active,
    });
  }

  private getAccordionItems(): HTMLTkAccordionItemElement[] {
    return Array.from(this.el.querySelectorAll('tk-accordion-item')).filter(child => child.parentElement === this.el);
  }

  private getItemKey(accordionItem: HTMLTkAccordionItemElement, index: number): AccordionItemIndex {
    return accordionItem.getAttribute('item-key') ?? String(index);
  }

  render() {
    return (
      <div class="tk-accordion">
        <slot />
      </div>
    );
  }
}
