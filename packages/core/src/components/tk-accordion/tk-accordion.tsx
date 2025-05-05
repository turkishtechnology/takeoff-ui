import { Component, h, Element, Prop, ComponentInterface, Watch, Event, EventEmitter, State } from '@stencil/core';
import { IIconOptions } from '../../global/interfaces/IIconOptions';

export interface IAccordionItemSelect {
  index: string | number;
  active: boolean;
}

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

  /**
   * Currently active panel indexes. Can be a single value or an array.
   * When allowMultiple is false, only the last value in the array will be used.
   */
  @Prop({ mutable: true }) activeIndex?: string | number | string[] | number[];
  @Watch('activeIndex')
  activeIndexChanged() {
    const normalized = this.normalizeActiveIndex();
    if (JSON.stringify(normalized) !== JSON.stringify(this.internalActiveIndex)) {
      this.internalActiveIndex = normalized;
      this.updateItems();
    }
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
   * Emitted when an accordion item is selected
   */
  @Event() tkAccordionItemSelected: EventEmitter<IAccordionItemSelect>;

  componentDidLoad() {
    this.internalActiveIndex = this.normalizeActiveIndex();
    this.updateItems();
  }

  private normalizeActiveIndex(): (string | number)[] {
    if (this.activeIndex === undefined || this.activeIndex === null) return [];
    if (Array.isArray(this.activeIndex)) {
      if (!this.allowMultiple) {
        const lastItem = this.activeIndex[this.activeIndex.length - 1];
        return lastItem !== undefined ? [lastItem] : [];
      }
      return this.activeIndex as (string | number)[];
    }
    return [this.activeIndex as string | number];
  }

  private isIndexActive(index: string | number): boolean {
    return this.internalActiveIndex.map(String).includes(String(index));
  }

  private toggleItem(index: string | number) {
    const isActive = this.isIndexActive(index);
    if (this.allowMultiple) {
      const currentActive = [...this.internalActiveIndex];
      const newActive = isActive ? currentActive.filter(i => String(i) !== String(index)) : [...currentActive, index];
      this.internalActiveIndex = newActive as (string | number)[];
    } else {
      this.internalActiveIndex = isActive ? [] : [index];
    }
    this.tkAccordionItemSelected.emit({
      index,
      active: !isActive,
    });
    this.updateItems();
  }

  private updateItems() {
    const items = Array.from(this.el.querySelectorAll('tk-accordion-item')).filter(child => child.parentElement === this.el);

    items.forEach((item, index) => {
      const itemKey = item.getAttribute('item-key') !== null ? item.getAttribute('item-key') : String(index);
      item.active = this.isIndexActive(itemKey);
      item.toggleItem = () => this.toggleItem(itemKey);
    });
  }

  render() {
    return (
      <div class="tk-accordion">
        <slot />
      </div>
    );
  }
}
