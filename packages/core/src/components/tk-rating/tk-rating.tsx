import { Component, ComponentInterface, Prop, State, Watch, Event, EventEmitter, h } from '@stencil/core';
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
  @Prop({ mutable: true }) value: number = 0;

  /**
   * Watches for changes to the `value` prop and emits an event when the value is updated.
   */
  @Watch('value')
  protected valueChanged() {
    this.tkChange.emit(this.value);
  }

  /**
   * Determines whether to show the numerical rating value under to the icon.
   * @defaultValue false
   */
  @Prop() showRatingValue: boolean = false;

  /**
   * the user cannot interact with the input.
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

    this.value = rating;
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

  private getNumberRatingColor(ratingValue: number): string | undefined {
    switch (ratingValue) {
      case 1:
        return '#B32B23';
      case 2:
        return '#FFACA7';
      case 3:
        return '#F6DE95';
      case 4:
        return '#22C55E';
      case 5:
        return '#136C34';
      default:
        return undefined;
    }
  }

  private getNumberHoverColor(selected: number, ratingValue: number): string | undefined {
    switch (selected) {
      case 1:
        return '#FFF5F5';
      case 2:
        return ratingValue <= 2 ? '#FFACA7' : '#FFF5F5';
      case 3:
        return ratingValue <= 3 ? '#F6DE95' : '#FEFBF3';
      case 4:
        return ratingValue <= 4 ? '#22C55E' : '#F4FCF7';
      case 5:
        return '#136C34';
      default:
        return undefined;
    }
  }

  render() {
    const isNumberType = this.type === 'number';
    const containerClass = isNumberType ? 'tk-rating-number-container' : 'tk-rating-container';

    return (
      <div class={containerClass}>
        {isNumberType
          ? [1, 2, 3, 4, 5].map(ratingValue => {
              let style = {};
              if (this.value && ratingValue === this.value) {
                style = {
                  backgroundColor: this.getNumberRatingColor(ratingValue),
                  color: ratingValue === 1 || ratingValue === 5 ? '#F9FAFC' : '#222530',
                };
              } else if (this.value && ratingValue && this.hoverRating > 0) {
                style = {
                  backgroundColor: this.getNumberHoverColor(this.value, ratingValue),
                  color: this.value === 5 ? '#F9FAFC' : this.value < ratingValue ? '#99A0AE' : '#222530',
                };
              }
              return (
                <div
                  class={classNames('tk-rating', 'number', { readonly: this.readonly, disabled: this.disabled, selected: ratingValue === this.value })}
                  style={style}
                  onMouseMove={() => this.handleMouseMove(ratingValue)}
                  onMouseLeave={() => this.handleMouseLeave()}
                  onClick={() => this.handleRatingClick(ratingValue)}
                >
                  {ratingValue.toString().padStart(2, '0')}
                </div>
              );
            })
          : Array.from({ length: this.maxRating }, (_, index) => this.renderIcon(index + 1))}
      </div>
    );
  }
}
