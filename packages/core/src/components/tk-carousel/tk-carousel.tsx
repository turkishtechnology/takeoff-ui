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
   *Controls the interval of the autoplay in milliseconds
   * @defaultValue 3000
   */
  @Prop() autoplaySpeed: number = 3000;

  /**
   *Controls whether it should loop back to the start after reaching the end
   * @defaultValue false
   */
  @Prop() autoplayLoop: boolean = false;

  /**
   * Orientation of the navigation indicators
   * @defaultValue 'inside'
   */
  @Prop() navigationOrientation: 'inside' | 'outside' = 'inside';

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
  @Event({ eventName: 'tk-next-slide' })
  tkNextSlide: EventEmitter<{ slide: number }>;

  /**
   * Emitted when slide is changed
   */
  @Event({ eventName: 'tk-slide-change' }) tkSlideChange: EventEmitter<{ slide: number; totalSlides: number }>;

  /**
   * Emitted when left arrow is clicked
   */
  @Event({ eventName: 'tk-prev-slide' }) tkPrevSlide: EventEmitter<{ slide: number }>;

  componentDidLoad() {
    if (!this.slotElement) {
      this.slotElement = this.el.shadowRoot?.querySelector('slot') as HTMLSlotElement | undefined;
    }
    this.updateSlides();
    this.applySlideClasses();
    this.tkSlideChange.emit({ slide: this.activeSlide, totalSlides: this.slides.length });
    this.startAutoplay();
    this.isVertical = this.navigationPosition === 'left' || this.navigationPosition === 'right';
  }

  disconnectedCallback() {
    this.stopAutoplay();
  }

  private startAutoplay = () => {
    if (!this.autoplay || this.totalSlides <= this.slidesPerView) return;
    this.stopAutoplay();
    this.autoplayTimer = window.setInterval(() => {
      const lastStartingView = this.totalSlides - this.slidesPerView;
      if (this.activeSlide >= lastStartingView) {
        if (this.autoplayLoop) {
          this.changeSlide(0);
        } else {
          this.stopAutoplay();
        }
      } else {
        this.changeSlide(this.activeSlide + 1);
      }
    }, this.autoplaySpeed);
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
    this.slides.forEach((slide, i) => {
      slide.classList.add('tk-carousel-slide');
      slide.style.borderRadius = '16px';
      slide.dataset.slideIndex = String(i);
    });
    this.totalSlides = this.slides.length;
  }

  private applySlideClasses() {
    this.slides.forEach((slide, i) => {
      const isActive = i === this.activeSlide;
      slide.classList.add('tk-carousel-slide');
      slide.classList.toggle('is-active', isActive);
      const isVisible = i >= this.activeSlide && i < this.activeSlide + this.slidesPerView;
      slide.classList.toggle('is-visible', isVisible);
    });
  }

  private changeSlide(index: number) {
    if (!this.totalSlides) return;
    const lastStartingView = this.totalSlides - this.slidesPerView;
    if (index < 0) index = 0;
    if (index > lastStartingView) index = lastStartingView;
    this.activeSlide = index;
    this.applySlideClasses();
    this.tkSlideChange.emit({ slide: this.activeSlide, totalSlides: this.totalSlides });
  }

  private handlePrevClick = () => {
    this.changeSlide(this.activeSlide - 1);
    this.tkPrevSlide.emit({ slide: this.activeSlide });
  };

  private handleNextClick = () => {
    this.changeSlide(this.activeSlide + 1);
    this.tkNextSlide.emit({ slide: this.activeSlide });
  };

  private handleIndicatorClick = (index: number) => {
    this.changeSlide(index);
  };

  private createPrevButton() {
    if (!this.showArrows || this.activeSlide === 0 || this.slides.length === 0) return null;
    return (
      <tk-button
        size="small"
        class="prev-button"
        icon={this.navigationPosition == 'left' || this.navigationPosition == 'right' ? 'keyboard_arrow_up' : 'chevron_left'}
        onClick={this.handlePrevClick}
      />
    );
  }

  private createNextButton() {
    if (!this.showArrows || this.activeSlide >= this.slides.length - this.slidesPerView || this.slides.length === 0) return null;
    return (
      <tk-button
        size="small"
        class="next-button"
        icon={this.navigationPosition == 'left' || this.navigationPosition == 'right' ? 'keyboard_arrow_down' : 'chevron_right'}
        onClick={this.handleNextClick}
      />
    );
  }

  private createIndicators() {
    if (!this.showIndicators || this.slides.length === 0) return null;
    const indicatorCount = this.totalSlides - this.slidesPerView + 1;
    return (
      <div class="tk-carousel-indicators">
        {this.showPlayerButton &&
          this.autoplay &&
          (this.autoplayTimer ? (
            <tk-icon class="player-button" icon="pause_circle" size="small" variant="white" onClick={this.stopAutoplay} />
          ) : (
            <tk-icon class="player-button" icon="play_circle" size="small" variant="white" onClick={this.startAutoplay} />
          ))}
        {Array.from({ length: indicatorCount }).map((_, index) => (
          <div
            class={{
              'tk-carousel-indicator': true,
              'is-active': index === this.activeSlide,
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
    const rootClasses = classNames('tk-carousel', {
      [this.navigationOrientation]: true,
      [this.navigationPosition]: true,
      'is-vertical': this.isVertical,
    });
    this.el.style.setProperty('--slides-per-view', String(this.slidesPerView));

    return (
      <div class={rootClasses}>
        <div class="tk-carousel-slider">
          <div class="tk-carousel-slide-list">
            <div class="tk-carousel-slide-track">
              <slot></slot>
            </div>
          </div>
          {this.renderNavigationElement()}
        </div>
      </div>
    );
  }
}
