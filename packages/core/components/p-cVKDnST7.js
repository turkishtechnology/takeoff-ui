import { p as proxyCustomElement, H, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkAvatarScss =
  ':host {\n  display: inline-block;\n}\n\n.tk-avatar-container {\n  position: relative;\n}\n\n:has(.tk-avatar-badge) {\n  .tk-avatar {\n    box-shadow: var(--effect-1-default-sm);\n  }\n}\n\n.tk-avatar {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n  border: 1px solid var(--static-light);\n  border-radius: 8px;\n  flex-shrink: 0;\n  gap: 10px;\n\n  .tk-avatar-label {\n    font-family: var(--desktop-title-h5-font, Geologica);\n    /* Title/H5-24 */\n    font-style: normal;\n    font-weight: 400;\n    line-height: var(--desktop-title-h5-line-height, 30px);\n    /* 125% */\n  }\n\n  > svg {\n    display: block;\n    fill: currentColor;\n    pointer-events: none;\n    width: 100%;\n    height: 100%;\n  }\n\n  &.tk-avatar-rounded {\n    border-radius: var(--radius-full);\n\n    .tk-avatar-image {\n      border-radius: var(--radius-full);\n    }\n  }\n}\n\n.tk-avatar-image {\n  width: 100%;\n  height: 100%;\n  vertical-align: bottom;\n  object-fit: cover;\n}\n\n.tk-avatar-xlarge {\n  .tk-avatar {\n    width: var(--spacing-16xl);\n    height: var(--spacing-16xl);\n    border: 2px solid var(--static-light);\n\n    .tk-avatar-label {\n      font-size: var(--desktop-title-h5-size, 24px);\n    }\n\n    > svg {\n      transform: translateY(12px);\n    }\n  }\n\n  .tk-avatar-badge {\n    width: 18px;\n    height: 18px;\n  }\n}\n\n.tk-avatar-large {\n  .tk-avatar {\n    width: 48px;\n    height: 48px;\n    border: 2px solid var(--static-light);\n\n    .tk-avatar-label {\n      font-size: var(--desktop-title-h6-size, 20px);\n    }\n\n    > svg {\n      transform: translateY(10px);\n    }\n  }\n\n  .tk-avatar-badge {\n    width: 14px;\n    height: 14px;\n  }\n}\n\n.tk-avatar-base {\n  .tk-avatar {\n    width: 32px;\n    height: 32px;\n\n    .tk-avatar-label {\n      font-size: var(--desktop-body-m-base-size, 16px);\n    }\n\n    > svg {\n      transform: translateY(8px);\n    }\n  }\n\n  .tk-avatar-badge {\n    width: 10px;\n    height: 10px;\n  }\n}\n\n.tk-avatar-small {\n  .tk-avatar {\n    width: 24px;\n    height: 24px;\n\n    .tk-avatar-label {\n      font-size: var(--desktop-body-xs-size, 12px);\n    }\n\n    > svg {\n      transform: translateY(6px);\n    }\n  }\n\n  .tk-avatar-badge {\n    width: 8px;\n    height: 8px;\n  }\n}\n\n.tk-avatar-xsmall {\n  .tk-avatar {\n    width: 20px;\n    height: 20px;\n\n    &:not(.tk-avatar-rounded) {\n      border-radius: 4px;\n    }\n\n    .tk-avatar-label {\n      font-size: var(--desktop-body-2xs-size, 11px);\n      line-height: var(--line-height-xxs-normal, 16px);\n      /* 145.455% */\n    }\n\n    > svg {\n      transform: translateY(4px);\n    }\n  }\n\n  .tk-avatar-badge {\n    width: 6px;\n    height: 6px;\n  }\n}\n\n.tk-avatar-base,\n.tk-avatar-small,\n.tk-avatar-xsmall {\n  .tk-avatar-badge {\n    border-width: 1px;\n  }\n}\n\n.tk-avatar-brand {\n  background: var(--primary-base);\n\n  .tk-avatar-label {\n    color: var(--text-lightest, #f9fafc);\n  }\n\n  &:has(.tk-avatar-image) {\n    background: transparent;\n  }\n}\n\n.tk-avatar-solid {\n  &.tk-avatar-primary {\n    background: var(--primary-light);\n\n    .tk-avatar-label {\n      color: var(--primary-darkest);\n    }\n  }\n\n  &.tk-avatar-light {\n    background: var(--background-light);\n\n    .tk-avatar-label {\n      color: var(--text-darkest);\n    }\n  }\n\n  &.tk-avatar-success {\n    background: var(--states-success-sub-base);\n\n    .tk-avatar-label {\n      color: var(--states-success-darkest);\n    }\n  }\n\n  &.tk-avatar-info {\n    background: var(--states-info-sub-base);\n\n    .tk-avatar-label {\n      color: var(--states-info-darkest);\n    }\n  }\n\n  &.tk-avatar-warning {\n    background: var(--states-warning-light);\n\n    .tk-avatar-label {\n      color: var(--states-warning-darkest);\n    }\n  }\n\n  &.tk-avatar-danger {\n    background: var(--states-danger-sub-base);\n\n    .tk-avatar-label {\n      color: var(--states-danger-darkest);\n    }\n  }\n}\n\n.tk-avatar-primary > svg {\n  color: var(--primary-lightest);\n}\n\n.tk-avatar-light > svg {\n  color: var(--frames-lightest);\n}\n\n.tk-avatar-success > svg {\n  color: var(--states-success-light);\n}\n\n.tk-avatar-info > svg {\n  color: var(--states-info-light);\n}\n\n.tk-avatar-warning > svg {\n  color: var(--states-warning-light);\n}\n\n.tk-avatar-danger > svg {\n  color: var(--states-danger-light);\n}\n\n.tk-avatar-badge {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  border-radius: var(--radius-full);\n  border: 2px solid var(--static-light);\n  border-width: 2px;\n  box-shadow: var(--effect-1-hover-sm);\n\n  &.tk-avatar-badge-status-success {\n    background: var(--states-success-base, #22c55e);\n  }\n\n  &.tk-avatar-badge-status-info {\n    background: var(--states-info-base, #3b82f6);\n  }\n\n  &.tk-avatar-badge-status-warning {\n    background: var(--states-warning-base, #eab308);\n  }\n\n  &.tk-avatar-badge-status-danger {\n    background: var(--states-danger-base, #ff3d32);\n  }\n}\n\n.tk-avatar-group-compact .tk-avatar-badge {\n  display: none;\n}\n';

const TkAvatar = /*@__PURE__*/ proxyCustomElement(
  class TkAvatar extends H {
    constructor() {
      super();
      this.__registerHost();
      /**
       * ID of the element that labels the avatar - accessibility
       */
      this.ariaLabelledby = null;
      /**
       * Background style of the avatar
       * @defaultValue 'brand'
       */
      this.background = 'brand';
      /**
       * The badge to be displayed in the avatar
       * @defaultValue false
       */
      this.badge = false;
      /**
       * The status of the badge
       * @defaultValue success
       */
      this.badgeStatus = 'success';
      /**
       * URL of the image to be displayed in the avatar
       */
      this.image = null;
      /**
       * Text label to be displayed in the avatar
       */
      this.label = null;
      /**
       * Name associated with the avatar - accessibility
       */
      this.name = null;
      /**
       * Whether the avatar should have rounded corners
       * @defaultValue false
       */
      this.rounded = false;
      /**
       * Appearance of the avatar
       * @defaultValue 'primary'
       */
      this.variant = 'primary';
      /**
       * Size of the avatar
       * @defaultValue 'base'
       */
      this.size = 'base';
    }
    renderDefaultSvg() {
      return h(
        'svg',
        { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 64 52', fill: 'currentColor' },
        h('circle', { cx: '32.3068', cy: '12.0212', r: '12.0212', fill: 'currentColor' }),
        h('path', {
          d: 'M64 54.0952C64 46.9218 60.6286 40.0421 54.6274 34.9697C48.6263 29.8973 40.4869 27.0476 32 27.0476C23.5131 27.0476 15.3737 29.8973 9.37259 34.9697C3.37142 40.0421 1.28149e-06 46.9217 0 54.0952L32 54.0952H64Z',
          fill: 'currentColor',
        }),
      );
    }
    render() {
      const containerClasses = classNames('tk-avatar-container', `tk-avatar-${this.size}`);
      const rootClasses = classNames('tk-avatar', `tk-avatar-${this.variant}`, `tk-avatar-${this.background}`, {
        'tk-avatar-rounded': this.rounded,
      });
      return h(
        'div',
        { key: '67e73f6fdfcfc96d949a6c5f5df677458f30e2d0', class: containerClasses, part: `avatar ${this.size}` },
        h(
          'div',
          { 'key': '3cef5224445d589af5b8385415b42df9ba1301e4', 'class': rootClasses, 'part': 'avatar', 'aria-label': this.name, 'aria-labelledby': this.ariaLabelledby },
          this.label && h('span', { key: '122609e2964c83c9249fa79292a288403241b9fd', class: 'tk-avatar-label' }, this.label),
          this.image && h('img', { key: '474c840e669a1d88029f6b95258efe504d1d2c45', class: 'tk-avatar-image', src: this.image, alt: this.name }),
          !this.label && !this.image && this.renderDefaultSvg(),
        ),
        this.badge &&
          this.rounded &&
          h('span', { key: '0c4eeeca88c049ad4b5fd31cb7043e0de5af8539', part: 'badge', class: classNames('tk-avatar-badge', `tk-avatar-badge-status-${this.badgeStatus}`) }),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkAvatarScss;
    }
  },
  [
    0,
    'tk-avatar',
    {
      ariaLabelledby: [1, 'aria-labelledby'],
      background: [1],
      badge: [4],
      badgeStatus: [1, 'badge-status'],
      image: [1],
      label: [1],
      name: [1],
      rounded: [4],
      variant: [1],
      size: [1],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-avatar'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-avatar':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkAvatar);
        }
        break;
    }
  });
}

export { TkAvatar as T, defineCustomElement as d };
//# sourceMappingURL=p-cVKDnST7.js.map

//# sourceMappingURL=p-cVKDnST7.js.map
