import { Component, ComponentInterface, Prop, State, Event, EventEmitter, h } from '@stencil/core';
import getIcon from './rating-icons';
import classNames from 'classnames';

/**
 * The `TkRating` component is a customizable rating input element that allows users to select a value from a series of icons (such as stars, hearts, or dot).
 * @react `import { TkRating } from '@takeoff-ui/react'`
 * @vue `import { TkRating } from '@takeoff-ui/vue'`
 * @angular `import { TkRating } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-rating',
  styleUrl: 'tk-rating.scss',
  shadow: true,
})
export class TkRating implements ComponentInterface {
  @State() hoverRating: number = 0; // Hover rating for temporary display

  /**
   * The maximum rating value. Possible options are 5 or 10.
   */
  @Prop() maxRating: number = 5;

  /**
   * The type of icon to display for each rating element. Options include 'star', 'heart', 'dot' and 'number'.
   */
  @Prop() type: 'star' | 'heart' | 'dot' | 'number' = 'star';

  /**
   * The currently selected rating value.
   */
  @Prop() value: number = 0;

  /**
   * Determines whether to show the numerical rating value under to the icon.
   * @defaultValue false
   */
  @Prop() showRatingValue: boolean = false;

  /**
   * The user cannot interact with the input.
   * @defaultValue false
   */
  @Prop() disabled: boolean = false;

  /**
   * If `true`, the user cannot modify the value.
   * @defaultValue false
   */
  @Prop() readonly: boolean = false;

  /**
   * Emitted when the value has changed.
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<number>;

  // Set the rating on click, with half steps
  private handleRatingClick(rating: number) {
    if (this.disabled || this.readonly) return;

    this.tkChange.emit(rating);
  }

  // Set hover rating with half steps
  private handleMouseMove(rating: number) {
    if (this.disabled || this.readonly) return;

    if (rating !== this.hoverRating) {
      this.hoverRating = rating;
    }
  }

  // Reset hover rating when mouse leaves
  private handleMouseLeave() {
    if (this.disabled || this.readonly) return;

    this.hoverRating = 0;
  }

  private renderIcon(ratingValue: number) {
    const displayRating = this.hoverRating || this.value;
    let state = 'default';

    if (ratingValue <= displayRating) {
      state = 'fill';
    } else if (ratingValue - 0.5 === displayRating) {
      state = 'semi';
    }

    if (this.disabled) {
      return (
        <div class={classNames('tk-rating', this.type, state, { disabled: this.disabled })}>
          {getIcon(this.type, 'disabled')}
          {this.showRatingValue && `0${ratingValue}`}
        </div>
      );
    }
    return (
      <div
        class={classNames('tk-rating', this.type, state, this.readonly, { disabled: this.disabled })}
        onMouseMove={() => this.handleMouseMove(ratingValue)}
        onMouseLeave={() => this.handleMouseLeave()}
        onClick={() => this.handleRatingClick(ratingValue)}
      >
        {getIcon(this.type, state)} {this.showRatingValue && `0${ratingValue}`}
      </div>
    );
  }

  renderNumberRating() {
    return [1, 2, 3, 4, 5].map(ratingValue => (
      <div
        class={classNames('tk-rating', 'number', `rating-number-${ratingValue}`, {
          readonly: this.readonly,
          disabled: this.disabled,
          selected: ratingValue === this.value,
        })}
        onMouseMove={() => this.handleMouseMove(ratingValue)}
        onMouseLeave={() => this.handleMouseLeave()}
        onClick={() => this.handleRatingClick(ratingValue)}
      >
        {ratingValue.toString().padStart(2, '0')}
      </div>
    ));
  }

  render() {
    const isNumberType = this.type === 'number';

    return (
      <div class={classNames('tk-rating-container', { number: isNumberType })}>
        {isNumberType ? this.renderNumberRating() : Array.from({ length: this.maxRating }, (_, index) => this.renderIcon(index + 1))}
      </div>
    );
  }
}
