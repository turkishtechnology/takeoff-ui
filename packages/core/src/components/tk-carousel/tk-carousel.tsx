import { Component, ComponentInterface, h, Prop, State, Event, Element, EventEmitter, Listen } from '@stencil/core';
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

  @State() activeSlide: number = 0;
  @State() totalSlides: number = 0;

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
   * Emitted when right arrow is clicked
   */
  @Event({ eventName: 'tk-next-slide' }) tkNextSlide: EventEmitter<{ slide: number }>;

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
  }

  private updateSlides() {
    const assigned = this.slotElement?.assignedElements() || [];
    this.slides = assigned.filter(el => !(el as HTMLElement).hasAttribute('slot')) as HTMLElement[];
    this.slides.forEach((slide, i) => {
      slide.classList.add('tk-carousel-slide');
      slide.dataset.slideIndex = String(i);
    });
    this.totalSlides = this.slides.length;
  }

  private applySlideClasses() {
    this.slides.forEach((slide, i) => {
      const isActive = i === this.activeSlide;
      slide.classList.add('tk-carousel-slide');
      slide.classList.toggle('is-active', isActive);
    });
  }

  private changeSlide(index: number) {
    if (!this.totalSlides) return;
    if (index < 0) index = 0;
    if (index > this.totalSlides - 1) index = this.totalSlides - 1;
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

  private renderPrevButton() {
    if (!this.showArrows || this.activeSlide === 0 || this.slides.length === 0) return null;
    return <tk-button size="small" class="prev-button" icon="chevron_left" onClick={this.handlePrevClick} />;
  }

  private renderNextButton() {
    if (!this.showArrows || this.activeSlide === this.slides.length - 1 || this.slides.length === 0) return null;
    return <tk-button size="small" class="next-button" icon="chevron_right" onClick={this.handleNextClick} />;
  }

  private renderIndicators() {
    if (!this.showIndicators || this.slides.length === 0) return null;
    return (
      <div class="tk-carousel-indicators">
        {this.slides.map((_, index) => (
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

  render() {
    const rootClasses = classNames('tk-carousel');
    return (
      <div class={rootClasses}>
        <div class={'tk-carousel-slider'}>
          <div class="tk-carousel-slide-list">
            <div class={'tk-carousel-slide-track'}>
              <slot></slot>
            </div>
          </div>
          {this.renderPrevButton()}
          {this.renderNextButton()}
          {this.renderIndicators()}
        </div>
      </div>
    );
  }
}
