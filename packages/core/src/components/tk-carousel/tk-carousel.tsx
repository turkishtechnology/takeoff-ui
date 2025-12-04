import { Component, ComponentInterface, h, Prop, State, Event, Element, EventEmitter } from '@stencil/core';
import classNames from 'classnames';

/**
 * The `TkCarousel` is a content slider component with various options.
 * @react `import { TkCarousel } from '@takeoff-ui/react'`
 * @vue `import { TkCarousel } from '@takeoff-ui/vue'`
 * @angular `import { TkCarousel } from '@takeoff-ui/angular'`
 */

@Component({
  tag: 'tk-carousel',
  styleUrl: 'tk-carousel.scss',
  shadow: true,
})
export class TkCarousel implements ComponentInterface {
  @Element() el: HTMLTkCarouselElement;

  private slotElement?: HTMLSlotElement;
  private items: HTMLElement[] = [];
  private itemsContainer?: HTMLElement;

  @State() autoplayTimer?: number;
  @State() activeIndex: number = 0;
  @State() totalItems: number = 0;

  /**
   * Controls whether the carousel indicators are shown
   * @defaultValue true
   */
  @Prop() showIndicators: boolean = true;

  /**
   * Controls whether the navigation arrows are shown
   * @defaultValue true
   */
  @Prop() showArrows: boolean = true;

  /**
   * Controls whether the carousel should autoplay
   * @defaultValue false
   */
  @Prop() autoplay: boolean = false;

  /**
   * Controls the interval of the autoplay in milliseconds
   * @defaultValue 3000
   */
  @Prop() autoplayDelay: number = 3000;

  /**
   * Controls whether it should loop back to the start after reaching the end
   * @defaultValue true
   */
  @Prop() circular: boolean = true;

  /**
   * Placement of the navigation indicators
   * @defaultValue 'inside'
   */
  @Prop() navigationPlacement: 'inside' | 'outside' = 'inside';

  /**
   * Position of the navigation indicators
   * @defaultValue 'distributed'
   */
  @Prop() navigationPosition: 'distributed' | 'top' | 'bottom' | 'left' | 'right' = 'distributed';

  /**
   * Controls whether the pause/play button is shown
   * @defaultValue false
   */
  @Prop() showPlayerButton: boolean = false;

  /**
   * Number of items to show per view
   * @defaultValue 1
   */
  @Prop() itemsPerView: number = 1;

  /**
   * Orientation of the carousel
   * @defaultValue 'horizontal'
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Height of the carousel when orientation is vertical
   * @defaultValue '300px'
   */
  @Prop() verticalViewHeight: string = '300px';

  /**
   * Emitted when item is changed
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<number>;

  componentDidLoad() {
    if (!this.slotElement) {
      this.slotElement = this.el.shadowRoot?.querySelector('slot') as HTMLSlotElement | undefined;
    }
    this.itemsContainer = this.el.shadowRoot?.querySelector('.tk-carousel-items-container') as HTMLElement | undefined;
    this.el.tabIndex = 0;
    this.updateItemPosition();
    this.updateItems();
    this.startAutoplay();
    this.el.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.stopAutoplay();
    this.el.removeEventListener('keydown', this.handleKeyDown);
  }

  private startAutoplay = () => {
    if (!this.autoplay || this.totalItems <= this.itemsPerView) return;
    this.stopAutoplay();
    this.autoplayTimer = window.setInterval(() => {
      const lastStartingItem = this.totalItems - this.itemsPerView;
      if (this.activeIndex >= lastStartingItem) {
        if (this.circular) {
          this.changeItem(0);
        } else {
          this.stopAutoplay();
        }
      } else {
        this.changeItem(this.activeIndex + 1);
      }
    }, this.autoplayDelay);
  };

  private stopAutoplay = () => {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
  };

  private updateItems() {
    const assigned = this.slotElement?.assignedElements() || [];
    this.items = assigned.filter(el => !(el as HTMLElement).hasAttribute('slot')) as HTMLElement[];
    this.totalItems = this.items.length;
  }

  private updateItemPosition() {
    if (!this.itemsContainer) return;

    const itemsContainerElement = this.el.shadowRoot?.querySelector('.tk-carousel-overlay') as HTMLElement;
    if (!itemsContainerElement) return;
    const gapSize = 16;

    const totalGaps = Math.max(0, this.itemsPerView - 1);
    const totalGapSpace = totalGaps * gapSize;
    let containerSize;

    if (this.orientation === 'horizontal') {
      containerSize = itemsContainerElement.getBoundingClientRect().width;
    } else {
      this.el.style.height = String(this.verticalViewHeight);
      containerSize = Number.parseFloat(this.verticalViewHeight);
    }

    const itemSize = (containerSize - totalGapSpace) / this.itemsPerView;

    const translateValue = this.activeIndex * (itemSize + gapSize);

    if (this.orientation === 'vertical') {
      this.itemsContainer.style.transform = `translateY(-${translateValue}px)`;
    } else {
      this.itemsContainer.style.transform = `translateX(-${translateValue}px)`;
    }
  }
  private changeItem(index: number) {
    if (!this.totalItems) return;
    const lastStartingItem = Math.max(0, this.totalItems - this.itemsPerView);
    if (this.circular) {
      if (index < 0) {
        index = lastStartingItem;
      } else if (index > lastStartingItem) {
        index = 0;
      }
    } else {
      if (index < 0) index = 0;
      if (index > lastStartingItem) index = lastStartingItem;
    }

    this.activeIndex = index;
    this.updateItemPosition();
    this.tkChange.emit(this.activeIndex);
  }

  private handlePrevClick = () => {
    this.changeItem(this.activeIndex - 1);
    this.tkChange.emit(this.activeIndex);
  };

  private handleNextClick = () => {
    this.changeItem(this.activeIndex + 1);
    this.tkChange.emit(this.activeIndex);
  };

  private handleIndicatorClick = (index: number) => {
    this.changeItem(index);
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.orientation === 'vertical') {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.handlePrevClick();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.handleNextClick();
      }
    } else {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.handlePrevClick();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.handleNextClick();
      }
    }
  };

  private createPrevButton() {
    if (!this.showArrows || this.items.length <= this.itemsPerView) return null;
    if (!this.circular && this.activeIndex === 0) return null;

    return <tk-button size="small" class="prev-button" icon={this.orientation === 'vertical' ? 'keyboard_arrow_up' : 'chevron_left'} onTk-click={this.handlePrevClick} />;
  }

  private createNextButton() {
    const lastStartingItem = Math.max(0, this.totalItems - this.itemsPerView);
    if (!this.showArrows || this.items.length <= this.itemsPerView) return null;
    if (!this.circular && this.activeIndex >= lastStartingItem) return null;

    return <tk-button size="small" class="next-button" icon={this.orientation === 'vertical' ? 'keyboard_arrow_down' : 'chevron_right'} onTk-click={this.handleNextClick} />;
  }

  private createPlayerButtons() {
    if (!this.showPlayerButton || !this.autoplay) return null;
    const iconProps = {
      color: 'var(--background-light)',
      icon: this.autoplayTimer ? 'pause_circle' : 'play_circle',
      onClick: this.autoplayTimer ? this.stopAutoplay : this.startAutoplay,
    };
    return <tk-icon class="player-button" size="small" {...iconProps}></tk-icon>;
  }

  private createIndicators() {
    if (!this.showIndicators || this.items.length <= this.itemsPerView) return null;
    const indicatorCount = Math.max(1, this.totalItems - this.itemsPerView + 1);

    return (
      <div class="tk-carousel-indicators">
        {this.createPlayerButtons()}
        {Array.from({ length: indicatorCount }).map((_, index) => (
          <div class="tk-carousel-indicator" onClick={() => this.handleIndicatorClick(index)}>
            <div class={classNames('tk-carousel-indicator-dot', { active: index === this.activeIndex })}></div>
          </div>
        ))}
      </div>
    );
  }

  private renderNavigationElement() {
    return (
      <div
        class={classNames(
          'tk-carousel-navigation-holder',
          { 'tk-carousel-navigation': this.navigationPosition !== 'distributed' },
          { 'vertical-navigation': this.navigationPosition === 'left' || this.navigationPosition === 'right' },
        )}
      >
        {this.createPrevButton()}
        {this.createIndicators()}
        {this.createNextButton()}
      </div>
    );
  }

  render() {
    const rootClasses = classNames(
      'tk-carousel',
      this.navigationPlacement,
      this.navigationPosition,
      { vertical: this.orientation === 'vertical' },
      { 'show-arrows': this.showArrows },
      { 'show-indicators': this.showIndicators },
    );

    this.el.style.setProperty('--items-per-view', String(this.itemsPerView));

    return (
      <div class={rootClasses}>
        <div class="tk-carousel-overlay">
          <div class="tk-carousel-items-container">
            <slot
              onSlotchange={() => {
                this.updateItems();
                this.updateItemPosition();
              }}
            ></slot>
          </div>
        </div>
        {this.renderNavigationElement()}
      </div>
    );
  }
}
