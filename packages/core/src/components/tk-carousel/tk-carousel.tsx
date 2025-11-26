import { Component, ComponentInterface, h, Prop, State, Event, Element, EventEmitter } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'tk-carousel',
  styleUrl: 'tk-carousel.scss',
  shadow: true,
})
export class TkCarousel implements ComponentInterface {
  @Element() el: HTMLTkCarouselElement;

  private slotElement?: HTMLSlotElement;
  private slides: HTMLElement[] = [];
  private slideTrack?: HTMLElement;

  @State() autoplayTimer?: number;
  @State() activeSlide: number = 0;
  @State() totalSlides: number = 0;
  @State() isVertical: boolean = false;

  /**
   * Controls whether the slide indicators are shown
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
   * Number of slides to show per view
   * @defaultValue 1
   */
  @Prop() slidesPerView: number = 1;

  /**
   * Emitted when right arrow is clicked
   */
  @Event({ eventName: 'tk-next' })
  tkNext: EventEmitter<{ slide: number }>;

  /**
   * Emitted when slide is changed
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<{ slide: number }>;

  /**
   * Emitted when left arrow is clicked
   */
  @Event({ eventName: 'tk-prev' }) tkPrev: EventEmitter<{ slide: number }>;

  componentDidLoad() {
    if (!this.slotElement) {
      this.slotElement = this.el.shadowRoot?.querySelector('slot') as HTMLSlotElement | undefined;
    }
    this.slideTrack = this.el.shadowRoot?.querySelector('.tk-carousel-slide-track') as HTMLElement | undefined;
    this.el.tabIndex = 0;
    this.updateSlides();
    this.updateSlidePosition();
    this.startAutoplay();
    this.isVertical = this.navigationPosition === 'left' || this.navigationPosition === 'right';
    this.el.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.stopAutoplay();
    this.el.removeEventListener('keydown', this.handleKeyDown);
  }

  private startAutoplay = () => {
    if (!this.autoplay || this.totalSlides <= this.slidesPerView) return;
    this.stopAutoplay();
    this.autoplayTimer = window.setInterval(() => {
      const lastStartingView = this.totalSlides - this.slidesPerView;
      if (this.activeSlide >= lastStartingView) {
        if (this.circular) {
          this.changeSlide(0);
        } else {
          this.stopAutoplay();
        }
      } else {
        this.changeSlide(this.activeSlide + 1);
      }
    }, this.autoplayDelay);
  };

  private stopAutoplay = () => {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
  };

  private updateSlides() {
    const assigned = this.slotElement?.assignedElements() || [];
    this.slides = assigned.filter(el => !(el as HTMLElement).hasAttribute('slot')) as HTMLElement[];
    this.totalSlides = this.slides.length;
  }

  private updateSlidePosition() {
    if (!this.slideTrack) return;

    const sliderElement = this.el.shadowRoot?.querySelector('.tk-carousel-slider') as HTMLElement;
    if (!sliderElement) return;

    const containerRect = sliderElement.getBoundingClientRect();
    const containerSize = this.isVertical ? containerRect.height : containerRect.width;

    const gapSize = 16;
    const totalGaps = Math.max(0, this.slidesPerView - 1);
    const totalGapSpace = totalGaps * gapSize;
    const slideSize = (containerSize - totalGapSpace) / this.slidesPerView;

    const translateValue = this.activeSlide * (slideSize + gapSize);

    if (this.isVertical) {
      this.slideTrack.style.transform = `translateY(-${translateValue}px)`;
    } else {
      this.slideTrack.style.transform = `translateX(-${translateValue}px)`;
    }
  }
  private changeSlide(index: number) {
    if (!this.totalSlides) return;
    const lastStartingView = Math.max(0, this.totalSlides - this.slidesPerView);
    if (this.circular) {
      if (index < 0) {
        index = lastStartingView;
      } else if (index > lastStartingView) {
        index = 0;
      }
    } else {
      if (index < 0) index = 0;
      if (index > lastStartingView) index = lastStartingView;
    }

    this.activeSlide = index;
    this.updateSlidePosition();
    this.tkChange.emit({ slide: this.activeSlide });
  }

  private handlePrevClick = () => {
    this.changeSlide(this.activeSlide - 1);
    this.tkPrev.emit({ slide: this.activeSlide });
  };

  private handleNextClick = () => {
    this.changeSlide(this.activeSlide + 1);
    this.tkNext.emit({ slide: this.activeSlide });
  };

  private handleIndicatorClick = (index: number) => {
    this.changeSlide(index);
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.isVertical) {
      if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        this.handlePrevClick();
      } else if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        this.handleNextClick();
      }
    } else {
      if (ev.key === 'ArrowLeft') {
        ev.preventDefault();
        this.handlePrevClick();
      } else if (ev.key === 'ArrowRight') {
        ev.preventDefault();
        this.handleNextClick();
      }
    }
  };

  private createPrevButton() {
    if (!this.showArrows || this.slides.length <= this.slidesPerView) return null;
    if (!this.circular && this.activeSlide === 0) return null;

    return <tk-button size="small" class="prev-button" icon={this.isVertical ? 'keyboard_arrow_up' : 'chevron_left'} onClick={this.handlePrevClick} />;
  }

  private createNextButton() {
    const lastStartingView = Math.max(0, this.totalSlides - this.slidesPerView);
    if (!this.showArrows || this.slides.length <= this.slidesPerView) return null;
    if (!this.circular && this.activeSlide >= lastStartingView) return null;

    return <tk-button size="small" class="next-button" icon={this.isVertical ? 'keyboard_arrow_down' : 'chevron_right'} onClick={this.handleNextClick} />;
  }

  private createIndicators() {
    if (!this.showIndicators || this.slides.length <= this.slidesPerView) return null;
    const indicatorCount = Math.max(1, this.totalSlides - this.slidesPerView + 1);

    return (
      <div class="tk-carousel-indicators">
        {this.showPlayerButton &&
          this.autoplay &&
          (this.autoplayTimer ? (
            <tk-icon class="player-button" variant="white" size="large" icon="pause_circle" onClick={this.stopAutoplay} />
          ) : (
            <tk-icon class="player-button" variant="white" size="large" icon="play_circle" onClick={this.startAutoplay} />
          ))}
        {Array.from({ length: indicatorCount }).map((_, index) => (
          <div
            class={{
              'tk-carousel-indicator': true,
              'active': index === this.activeSlide,
            }}
            onClick={() => this.handleIndicatorClick(index)}
          />
        ))}
      </div>
    );
  }

  private renderNavigationElement() {
    return (
      <div class="tk-carousel-navigation">
        {this.createPrevButton()}
        {this.createIndicators()}
        {this.createNextButton()}
      </div>
    );
  }

  render() {
    const rootClasses = classNames('tk-carousel', this.navigationPlacement, this.navigationPosition, { vertical: this.isVertical });
    const sliderClasses = classNames('tk-carousel-slider', { vertical: this.isVertical });

    this.el.style.setProperty('--slides-per-view', String(this.slidesPerView));

    return (
      <div class={rootClasses}>
        <div class={sliderClasses}>
          <div class="tk-carousel-slide-track">
            <slot
              onSlotchange={() => {
                this.updateSlides();
                this.updateSlidePosition();
              }}
            ></slot>
          </div>
        </div>
        {this.renderNavigationElement()}
      </div>
    );
  }
}
