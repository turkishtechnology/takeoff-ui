import { h, p as proxyCustomElement, H, c as createEvent } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';

const getIcon = (type = 'star', state = 'default') => {
  switch (type) {
    case 'star':
      if (state == 'fill') {
        return h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '22', height: '22', viewBox: '0 0 22 22', fill: 'none' },
          h('path', {
            'd': 'M20.3536 8.04257L14.358 7.1301L11.6778 1.44017C11.6046 1.28438 11.4841 1.15827 11.3354 1.08161C10.9623 0.888733 10.5089 1.04947 10.3223 1.44017L7.64213 7.1301L1.64652 8.04257C1.48122 8.0673 1.33009 8.1489 1.21438 8.27254C1.07449 8.4231 0.99741 8.62566 1.00007 8.8357C1.00272 9.04575 1.0849 9.2461 1.22855 9.39272L5.56645 13.8215L4.5416 20.0753C4.51757 20.2207 4.53294 20.3704 4.58598 20.5071C4.63901 20.6439 4.72759 20.7624 4.84166 20.8492C4.95573 20.9359 5.09074 20.9875 5.23137 20.998C5.37199 21.0085 5.51262 20.9775 5.63729 20.9086L11 17.9561L16.3628 20.9086C16.5092 20.9902 16.6792 21.0174 16.8422 20.9877C17.2531 20.9135 17.5293 20.5055 17.4585 20.0753L16.4336 13.8215L20.7715 9.39272C20.8896 9.27156 20.9675 9.1133 20.9912 8.9402C21.0549 8.50746 20.7668 8.10686 20.3536 8.04257Z',
            'fill': '#F2D066',
            'stroke': '#F2D066',
            'stroke-width': '2',
            'stroke-linejoin': 'round',
          }),
        );
      } else if (state == 'semi') {
        return h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '22', height: '22', viewBox: '0 0 22 22', fill: 'none' },
          h('path', {
            'd': 'M20.3536 8.04257L14.358 7.1301L11.6778 1.44017C11.6046 1.28438 11.4841 1.15827 11.3354 1.08161C10.9623 0.888733 10.5089 1.04947 10.3223 1.44017L7.64213 7.1301L1.64652 8.04257C1.48122 8.0673 1.33009 8.1489 1.21438 8.27254C1.07449 8.4231 0.99741 8.62566 1.00007 8.8357C1.00272 9.04575 1.0849 9.2461 1.22855 9.39272L5.56645 13.8215L4.5416 20.0753C4.51757 20.2207 4.53294 20.3704 4.58598 20.5071C4.63901 20.6439 4.72759 20.7624 4.84166 20.8492C4.95573 20.9359 5.09074 20.9875 5.23137 20.998C5.37199 21.0085 5.51262 20.9775 5.63729 20.9086L11 17.9561L16.3628 20.9086C16.5092 20.9902 16.6792 21.0174 16.8422 20.9877C17.2531 20.9135 17.5293 20.5055 17.4585 20.0753L16.4336 13.8215L20.7715 9.39272C20.8896 9.27156 20.9675 9.1133 20.9912 8.9402C21.0549 8.50746 20.7668 8.10686 20.3536 8.04257Z',
            'stroke': '#F2D066',
            'stroke-width': '2',
            'stroke-linejoin': 'round',
          }),
          h('path', {
            d: 'M11 1C10.7224 1.0009 10.4549 1.16242 10.3223 1.44017L7.64213 7.1301L1.64652 8.04257C1.48122 8.06729 1.33009 8.1489 1.21438 8.27254C1.07449 8.4231 0.99741 8.62565 1.00007 8.8357C1.00272 9.04574 1.0849 9.24609 1.22855 9.39272L5.56645 13.8215L4.5416 20.0753C4.51757 20.2207 4.53294 20.3703 4.58598 20.5071C4.63901 20.6439 4.72759 20.7624 4.84166 20.8492C4.95573 20.9359 5.09074 20.9875 5.23137 20.998C5.37199 21.0085 5.51262 20.9775 5.63729 20.9086L11 17.9561V1Z',
            fill: '#F2D066',
          }),
        );
      } else if (state == 'default') {
        return h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '22', height: '22', viewBox: '0 0 22 22', fill: 'none' },
          h('path', {
            'd': 'M20.3536 8.04257L14.358 7.1301L11.6778 1.44017C11.6046 1.28438 11.4841 1.15827 11.3354 1.08161C10.9623 0.888733 10.5089 1.04947 10.3223 1.44017L7.64213 7.1301L1.64652 8.04257C1.48122 8.0673 1.33009 8.1489 1.21438 8.27254C1.07449 8.4231 0.99741 8.62566 1.00007 8.8357C1.00272 9.04575 1.0849 9.2461 1.22855 9.39272L5.56645 13.8215L4.5416 20.0753C4.51757 20.2207 4.53294 20.3704 4.58598 20.5071C4.63901 20.6439 4.72759 20.7624 4.84166 20.8492C4.95573 20.9359 5.09074 20.9875 5.23137 20.998C5.37199 21.0085 5.51262 20.9775 5.63729 20.9086L11 17.9561L16.3628 20.9086C16.5092 20.9902 16.6792 21.0174 16.8422 20.9877C17.2531 20.9135 17.5293 20.5055 17.4585 20.0753L16.4336 13.8215L20.7715 9.39272C20.8896 9.27156 20.9675 9.1133 20.9912 8.9402C21.0549 8.50746 20.7668 8.10686 20.3536 8.04257Z',
            'stroke': '#FAEDC4',
            'stroke-width': '2',
            'stroke-linejoin': 'round',
          }),
        );
      } else if (state == 'disabled') {
        return h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '22', height: '22', viewBox: '0 0 22 22', fill: 'none' },
          h('path', {
            'd': 'M20.3536 8.04257L14.358 7.1301L11.6778 1.44017C11.6046 1.28438 11.4841 1.15827 11.3354 1.08161C10.9623 0.888733 10.5089 1.04947 10.3223 1.44017L7.64213 7.1301L1.64652 8.04257C1.48122 8.0673 1.33009 8.1489 1.21438 8.27254C1.07449 8.4231 0.99741 8.62566 1.00007 8.8357C1.00272 9.04575 1.0849 9.2461 1.22855 9.39272L5.56645 13.8215L4.5416 20.0753C4.51757 20.2207 4.53294 20.3704 4.58598 20.5071C4.63901 20.6439 4.72759 20.7624 4.84166 20.8492C4.95573 20.9359 5.09074 20.9875 5.23137 20.998C5.37199 21.0085 5.51262 20.9775 5.63729 20.9086L11 17.9561L16.3628 20.9086C16.5092 20.9902 16.6792 21.0174 16.8422 20.9877C17.2531 20.9135 17.5293 20.5055 17.4585 20.0753L16.4336 13.8215L20.7715 9.39272C20.8896 9.27156 20.9675 9.1133 20.9912 8.9402C21.0549 8.50746 20.7668 8.10686 20.3536 8.04257Z',
            'stroke': '#E1E4EA',
            'stroke-width': '2',
            'stroke-linejoin': 'round',
          }),
        );
      }
      break;
    case 'heart':
      if (state == 'fill') {
        return h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '22', height: '20', viewBox: '0 0 22 20', fill: 'none' },
          h('path', {
            'd': 'M21 7.04927C21 13.2206 11 18.4569 11 18.4569C11 18.4569 1 13.2206 1 7.04927C1 5.71012 1.54705 4.42582 2.52079 3.4789C3.49454 2.53198 4.81522 2 6.19231 2C8.36442 2 10.225 3.15105 11 4.99216C11.775 3.15105 13.6356 2 15.8077 2C17.1848 2 18.5055 2.53198 19.4792 3.4789C20.453 4.42582 21 5.71012 21 7.04927Z',
            'fill': '#FF3D32',
            'stroke': '#FF3D32',
            'stroke-width': '2',
            'stroke-linejoin': 'round',
          }),
        );
      } else if (state == 'semi') {
        return h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '22', height: '20', viewBox: '0 0 22 20', fill: 'none' },
          h('path', {
            'd': 'M21 7.04927C21 13.2206 11 18.4569 11 18.4569C11 18.4569 1 13.2206 1 7.04927C1 5.71012 1.54705 4.42582 2.52079 3.4789C3.49454 2.53198 4.81522 2 6.19231 2C8.36442 2 10.225 3.15105 11 4.99216C11.775 3.15105 13.6356 2 15.8077 2C17.1848 2 18.5055 2.53198 19.4792 3.4789C20.453 4.42582 21 5.71012 21 7.04927Z',
            'stroke': '#FF3D32',
            'stroke-width': '2',
            'stroke-linejoin': 'round',
          }),
          h('path', {
            d: 'M11 4.99216C10.225 3.15105 8.36442 2 6.19231 2C4.81522 2 3.49454 2.53198 2.52079 3.4789C1.54705 4.42582 1 5.71012 1 7.04927C1 13.2206 11 18.4569 11 18.4569V4.99216Z',
            fill: '#FF3D32',
          }),
        );
      } else if (state == 'default') {
        return h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '22', height: '20', viewBox: '0 0 22 20', fill: 'none' },
          h('path', {
            'd': 'M21 7.04927C21 13.2206 11 18.4569 11 18.4569C11 18.4569 1 13.2206 1 7.04927C1 5.71012 1.54705 4.42582 2.52079 3.4789C3.49454 2.53198 4.81522 2 6.19231 2C8.36442 2 10.225 3.15105 11 4.99216C11.775 3.15105 13.6356 2 15.8077 2C17.1848 2 18.5055 2.53198 19.4792 3.4789C20.453 4.42582 21 5.71012 21 7.04927Z',
            'stroke': '#FFD0CE',
            'stroke-width': '2',
            'stroke-linejoin': 'round',
          }),
        );
      } else if (state == 'disabled') {
        return h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '22', height: '20', viewBox: '0 0 22 20', fill: 'none' },
          h('path', {
            'd': 'M21 7.04927C21 13.2206 11 18.4569 11 18.4569C11 18.4569 1 13.2206 1 7.04927C1 5.71012 1.54705 4.42582 2.52079 3.4789C3.49454 2.53198 4.81522 2 6.19231 2C8.36442 2 10.225 3.15105 11 4.99216C11.775 3.15105 13.6356 2 15.8077 2C17.1848 2 18.5055 2.53198 19.4792 3.4789C20.453 4.42582 21 5.71012 21 7.04927Z',
            'stroke': '#E1E4EA',
            'stroke-width': '2',
            'stroke-linejoin': 'round',
          }),
        );
      }
      break;
    case 'dot':
      if (state == 'fill') {
        return h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20', fill: 'none' },
          h('circle', { cx: '10', cy: '10', r: '10', fill: '#22C55E' }),
        );
      } else if (state == 'semi') {
        return h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20', fill: 'none' },
          h('path', {
            'fill-rule': 'evenodd',
            'clip-rule': 'evenodd',
            'd': 'M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM18 10C18 14.4183 14.4183 18 10 18V2C14.4183 2 18 5.58172 18 10Z',
            'fill': '#22C55E',
          }),
        );
      } else if (state == 'default') {
        return h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20', fill: 'none' },
          h('circle', { 'cx': '10', 'cy': '10', 'r': '9', 'stroke': '#CAF1D8', 'stroke-width': '2' }),
        );
      } else if (state == 'disabled') {
        return h(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20', fill: 'none' },
          h('circle', { 'cx': '10', 'cy': '10', 'r': '9', 'stroke': '#E1E4EA', 'stroke-width': '2' }),
        );
      }
      break;
  }
};

const tkRatingScss =
  ':host {\n  display: inline-block;\n}\n\n.tk-rating-container {\n  display: flex;\n  align-items: center;\n\n  &.number {\n    gap: 4px;\n  }\n}\n\n.tk-rating {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 4px;\n  padding: 2px;\n  cursor: pointer;\n  font-size: var(--desktop-subheading-2xs-size);\n\n  &.star {\n    color: var(--states-warning-light);\n\n    &.fill,\n    &.semi {\n      color: var(--states-warning-dark);\n    }\n  }\n\n  &.heart {\n    color: var(--states-danger-light);\n\n    &.fill,\n    &.semi {\n      color: var(--states-danger-dark);\n    }\n  }\n\n  &.dot {\n    color: var(--states-success-light);\n\n    &.fill,\n    &.semi {\n      color: var(--states-success-dark);\n    }\n  }\n\n  &.readonly {\n    pointer-events: none;\n  }\n\n  &.disabled {\n    color: var(--text-sub-base) !important;\n    pointer-events: none;\n  }\n\n  &.number {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    outline: 1px solid var(--border-sub-base);\n    border-radius: 8px;\n    width: 27px;\n    height: 27px;\n\n    font-size: 14px;\n    font-weight: 400;\n    line-height: 20px;\n    font-family: Geologica;\n\n    background-color: var(--static-light);\n    color: var(--text-darkest);\n\n    &.rating-number-1:not(.selected):hover {\n      background: var(--states-danger-lightest);\n      color: var(--text-sub-base);\n    }\n\n    &.rating-number-2:not(.selected):hover {\n      background: var(--states-danger-sub-base);\n      color: var(--text-darkest);\n    }\n\n    &.rating-number-3:not(.selected):hover {\n      background: var(--states-warning-sub-base);\n      color: var(--text-darkest);\n    }\n\n    &.rating-number-4:not(.selected):hover {\n      background: var(--states-success-base);\n      color: var(--text-darkest);\n    }\n\n    &.rating-number-5:not(.selected):hover {\n      background: var(--states-success-darkest);\n      color: var(--text-lightest);\n    }\n\n    &.selected {\n      &.rating-number-1 {\n        background: var(--states-danger-dark);\n        color: var(--text-lightest);\n        outline: unset;\n      }\n\n      &.rating-number-2 {\n        background: var(--states-danger-sub-base);\n        color: var(--text-darkest);\n        border: 0px;\n      }\n\n      &.rating-number-3 {\n        background: var(--states-warning-sub-base);\n        color: var(--text-darkest);\n        border: 0px;\n      }\n\n      &.rating-number-4 {\n        background: var(--states-success-base);\n        color: var(--text-darkest);\n        border: 0px;\n      }\n\n      &.rating-number-5 {\n        background: var(--states-success-darkest);\n        color: var(--text-lightest);\n        border: 0px;\n      }\n    }\n\n    &.disabled {\n      background-color: var(--background-disabled);\n      border-color: var(--border-disabled);\n    }\n  }\n}\n';

const TkRating$1 = /*@__PURE__*/ proxyCustomElement(
  class TkRating extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkChange = createEvent(this, 'tk-change', 7);
      this.hoverRating = 0; // Hover rating for temporary display
      /**
       * The maximum rating value. Possible options are 5 or 10.
       */
      this.maxRating = 5;
      /**
       * The type of icon to display for each rating element. Options include 'star', 'heart', 'dot' and 'number'.
       */
      this.type = 'star';
      /**
       * The currently selected rating value.
       */
      this.value = 0;
      /**
       * Determines whether to show the numerical rating value under to the icon.
       * @defaultValue false
       */
      this.showRatingValue = false;
      /**
       * The user cannot interact with the input.
       * @defaultValue false
       */
      this.disabled = false;
      /**
       * If `true`, the user cannot modify the value.
       * @defaultValue false
       */
      this.readonly = false;
    }
    // Set the rating on click, with half steps
    handleRatingClick(rating) {
      if (this.disabled || this.readonly) return;
      this.tkChange.emit(rating);
    }
    // Set hover rating with half steps
    handleMouseMove(rating) {
      if (this.disabled || this.readonly) return;
      if (rating !== this.hoverRating) {
        this.hoverRating = rating;
      }
    }
    // Reset hover rating when mouse leaves
    handleMouseLeave() {
      if (this.disabled || this.readonly) return;
      this.hoverRating = 0;
    }
    renderIcon(ratingValue) {
      const displayRating = this.hoverRating || this.value;
      let state = 'default';
      if (ratingValue <= displayRating) {
        state = 'fill';
      } else if (ratingValue - 0.5 === displayRating) {
        state = 'semi';
      }
      if (this.disabled) {
        return h(
          'div',
          { class: classNames('tk-rating', this.type, state, { disabled: this.disabled }) },
          getIcon(this.type, 'disabled'),
          this.showRatingValue && `0${ratingValue}`,
        );
      }
      return h(
        'div',
        {
          class: classNames('tk-rating', this.type, state, this.readonly, { disabled: this.disabled }),
          onMouseMove: () => this.handleMouseMove(ratingValue),
          onMouseLeave: () => this.handleMouseLeave(),
          onClick: () => this.handleRatingClick(ratingValue),
        },
        getIcon(this.type, state),
        ' ',
        this.showRatingValue && `0${ratingValue}`,
      );
    }
    renderNumberRating() {
      return [1, 2, 3, 4, 5].map(ratingValue =>
        h(
          'div',
          {
            class: classNames('tk-rating', 'number', `rating-number-${ratingValue}`, {
              readonly: this.readonly,
              disabled: this.disabled,
              selected: ratingValue === this.value,
            }),
            onMouseMove: () => this.handleMouseMove(ratingValue),
            onMouseLeave: () => this.handleMouseLeave(),
            onClick: () => this.handleRatingClick(ratingValue),
          },
          ratingValue.toString().padStart(2, '0'),
        ),
      );
    }
    render() {
      const isNumberType = this.type === 'number';
      return h(
        'div',
        { key: 'b4a29096dae8d8ef4c5452fccd4f762434bb6ad7', class: classNames('tk-rating-container', { number: isNumberType }) },
        isNumberType ? this.renderNumberRating() : Array.from({ length: this.maxRating }, (_, index) => this.renderIcon(index + 1)),
      );
    }
    static get style() {
      return tkRatingScss;
    }
  },
  [
    1,
    'tk-rating',
    {
      maxRating: [2, 'max-rating'],
      type: [1],
      value: [2],
      showRatingValue: [4, 'show-rating-value'],
      disabled: [4],
      readonly: [4],
      hoverRating: [32],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-rating'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-rating':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkRating$1);
        }
        break;
    }
  });
}

const TkRating = TkRating$1;
const defineCustomElement = defineCustomElement$1;

export { TkRating, defineCustomElement };
//# sourceMappingURL=tk-rating.js.map

//# sourceMappingURL=tk-rating.js.map
