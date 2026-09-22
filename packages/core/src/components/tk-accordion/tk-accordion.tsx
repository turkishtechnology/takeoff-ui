import { Component, h, Element, Prop, ComponentInterface, Watch, Event, type EventEmitter, State } from '@stencil/core';
import { isEqual } from 'lodash-es';
import { IIconOptions } from '../../global/interfaces/IIconOptions';
import type { IAccordionItemSelect } from './types';
import { getDataTestId } from '../../utils/test-id-utils';

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

  @State() private internalActiveIndex: (string | number)[] = [];
  @Watch('internalActiveIndex')
  internalActiveIndexChanged(newValue: (string | number)[], oldValue: (string | number)[]): void {
    // Exit early if the active index hasn't changed
    if (isEqual(newValue, oldValue)) return;
    this.updateActiveIndex();
    this.syncItemsWithActiveIndex();
  }

  /**
   * Currently active panel indexes. Can be a single value or an array.
   * When allowMultiple is false, only the last value in the array will be used.
   * Has priority over AccordionItem's active prop. To prevent conflicts, avoid using both simultaneously.
   */
  @Prop() activeIndex?: string | number | (string | number)[];
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
   * Controls the display mode of the accordion component.
   * @defaultValue 'default'
   */
  @Prop() mode: 'default' | 'compact' = 'default';

  /**
   * Sets the data-testid attribute on the root container element.
   */
  @Prop({ reflect: true }) dataTestid?: string;

  /**
   * Emitted when an active index is changed
   */
  @Event({ eventName: 'tk-active-index-change' }) tkActiveIndexChange: EventEmitter<string | number | (string | number)[]>;

  /**
   * Emitted when an accordion item is selected
   * @deprecated
   */
  @Event({ eventName: 'tk-accordion-item-selected' }) tkAccordionItemSelected: EventEmitter<IAccordionItemSelect>;

  componentDidLoad() {
    this.validateItemKeylessActiveIndex();
    this.validateActiveProps();
    this.validateControlType();
    this.validateKeyType();
    this.initInternalActiveIndex();
    this.initEventListeners();
  }

  private initInternalActiveIndex() {
    // if prop activeIndex is set, use it
    if (this.hasActiveIndex()) return (this.internalActiveIndex = this.normalizeActiveIndex());
    // else if accordion items have active prop, use them
    // collected first and assigned once: every assignment syncs the items, which would close the ones not collected yet
    this.internalActiveIndex = this.limitToMode(this.getActiveItemKeys(this.getAccordionItems()));
  }

  private initEventListeners() {
    // listen at the host so items appended after load are covered too
    this.el.addEventListener('tk-active-change', (e: CustomEvent<boolean>) => {
      const items = this.getAccordionItems();
      const item = e.target as HTMLTkAccordionItemElement;
      const index = items.indexOf(item);
      // ignore items that are not direct children (e.g. of a nested accordion)
      if (index === -1) return;

      const itemKey = this.getItemKey(item, index);
      // A header click emits the opposite of the item's current state. The item's `active` watcher re-emits the
      // value that was just written to it; when that value is what the accordion holds, it is only our own sync
      // echoing back. A programmatic `item.active = x` the accordion does not hold yet is adopted like a click.
      const isEcho = e.detail === item.active && e.detail === this.internalActiveIndex.includes(itemKey);
      if (isEcho) return;

      this.handleItemActiveChange(items, itemKey, e.detail);
    });
  }

  // Validation Logic
  private validateActiveProps() {
    const activeCount = this.getAccordionItems().reduce((count, item) => (item.active ? count + 1 : count), 0);
    if (activeCount > 1 && !this.allowMultiple) {
      console.error('TkAccordion: Multiple accordion items are set to active while allowMultiple is false. This may lead to unexpected behavior.');
    }
  }

  private validateControlType() {
    const hasActiveAccordionItems = this.getAccordionItems().some(item => item.active !== undefined);
    if (this.hasActiveIndex() && hasActiveAccordionItems) console.error('TkAccordion: Accordion cannot have both activeIndex and active accordion items');
  }

  private validateKeyType() {
    const type = typeof (this.getAccordionItems().find(item => item.itemKey !== undefined)?.itemKey ?? 0);
    const allItemsHaveSameType = this.getAccordionItems().every(item => item.itemKey === undefined || typeof item.itemKey === type);
    let activeIndexHasSameType = true;
    if (this.hasActiveIndex()) activeIndexHasSameType = Array.isArray(this.activeIndex) ? this.activeIndex.every(item => typeof item === type) : typeof this.activeIndex === type;
    if (!allItemsHaveSameType || !activeIndexHasSameType) console.error('TkAccordion: Accordion item keys must be of the same type');
  }

  private validateItemKeylessActiveIndex() {
    if (!this.hasActiveIndex()) return;
    const hasKeylessItems = this.getAccordionItems().every(item => item.itemKey === undefined);
    const activeIndexType = Array.isArray(this.activeIndex) ? this.activeIndex.map(item => typeof item) : [typeof this.activeIndex];
    if (hasKeylessItems && activeIndexType.some(type => type !== 'number')) {
      console.error('TkAccordion: When using keyless accordion items, activeIndex must be of type number or number array.');
    }
  }

  private hasActiveIndex() {
    return this.activeIndex || this.activeIndex === 0;
  }

  private normalizeActiveIndex(): (string | number)[] {
    if (!this.activeIndex && this.activeIndex !== 0) return [];
    if (!Array.isArray(this.activeIndex)) return [this.activeIndex];
    return this.limitToMode(this.activeIndex as (string | number)[]);
  }

  /** Without allowMultiple only one item can be open; the last one wins, as documented on `activeIndex`. */
  private limitToMode(keys: (string | number)[]): (string | number)[] {
    return this.allowMultiple ? keys : keys.slice(-1);
  }

  private getActiveItemKeys(items: HTMLTkAccordionItemElement[]): (string | number)[] {
    return items.flatMap((item, index) => (item.active ? [this.getItemKey(item, index)] : []));
  }

  private syncItemsWithActiveIndex() {
    this.getAccordionItems().forEach((item, index) => {
      item.active = this.internalActiveIndex.includes(this.getItemKey(item, index));
    });
  }

  private getActiveIndex(): string | number | (string | number)[] {
    return this.allowMultiple ? this.internalActiveIndex : this.internalActiveIndex[this.internalActiveIndex.length - 1];
  }

  private updateActiveIndex() {
    const activeIndex = this.getActiveIndex();
    if (!isEqual(activeIndex, this.activeIndex)) this.tkActiveIndexChange.emit(activeIndex);
  }

  private handleItemActiveChange(items: HTMLTkAccordionItemElement[], itemKey: string | number, active: boolean): void {
    // Rebuild the open set from the items themselves rather than from the held state: an item appended with
    // `active` after load, or keyless items re-indexed by a DOM insertion/removal, would otherwise leave the
    // state stale and the click without effect.
    const otherOpenKeys = this.getActiveItemKeys(items).filter(key => key !== itemKey);
    const nextActiveIndex = active ? this.limitToMode([...otherOpenKeys, itemKey]) : otherOpenKeys;

    if (isEqual(nextActiveIndex, this.internalActiveIndex)) {
      // the index is already right but an item disagrees with it (e.g. it was appended already open), so realign the items
      this.syncItemsWithActiveIndex();
    } else {
      this.internalActiveIndex = nextActiveIndex;
    }

    this.tkAccordionItemSelected.emit({
      index: itemKey,
      active,
    });
  }

  private getAccordionItems(): HTMLTkAccordionItemElement[] {
    return Array.from(this.el.querySelectorAll('tk-accordion-item')).filter(child => child.parentElement === this.el);
  }

  private getItemKey(accordionItem: HTMLTkAccordionItemElement, index: number): string | number {
    return accordionItem.itemKey ?? index;
  }

  render() {
    return (
      <div class="tk-accordion" data-testid={getDataTestId(this.dataTestid, 'container')}>
        <slot />
      </div>
    );
  }
}
