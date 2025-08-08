import { p as proxyCustomElement, H, h, F as Fragment } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { d as defineCustomElement$5 } from './p-cVKDnST7.js';
import { d as defineCustomElement$4 } from './p-D_-4qiry.js';
import { d as defineCustomElement$3 } from './p-DrRHtkyE.js';
import { d as defineCustomElement$2 } from './p-Dz92n4WS.js';

const tkCardScss =
  ":host {\n  display: block;\n}\n\n.tk-card {\n  display: flex;\n  background: var(--static-light);\n  border-radius: 16px;\n  border: 1px solid var(--border-light);\n  box-shadow: var(--effect-1-default-base);\n\n  &.has-hover-shadow {\n    &:hover {\n      box-shadow: var(--effect-1-hover-base);\n    }\n  }\n\n  &.tk-card-vertical {\n    flex-direction: column;\n  }\n\n  &.tk-card-horizontal {\n    flex-direction: row;\n    align-items: stretch;\n\n    &:has(.tk-card-image-top) {\n      flex-direction: column;\n      justify-content: stretch;\n    }\n\n    .tk-card-horizontal-has-image-container {\n      display: flex;\n      flex-direction: column;\n      flex: 1 0 0;\n      align-self: stretch;\n    }\n\n    .tk-card-image {\n      &:not(.tk-card-windowed-image) {\n        &.tk-card-image-left img {\n          border-radius: 8px 0 0 8px;\n        }\n\n        &.tk-card-image-right img {\n          border-radius: 0 8px 8px 0;\n        }\n      }\n    }\n  }\n\n  .tk-card-header {\n    display: flex;\n    padding: var(--card-header-base-v-padding, 12px) var(--card-header-base-h-padding, 16px);\n    justify-content: space-between;\n    align-items: center;\n    align-self: stretch;\n\n    .tk-card-header-content {\n      display: flex;\n      align-items: center;\n      gap: var(--dialog-header-base-gap);\n\n      .tk-card-title-container {\n        display: flex;\n        flex-direction: column;\n        align-items: flex-start;\n\n        .tk-card-title {\n          color: var(--text-darkest);\n          font-family: var(--desktop-title-h6-font, Geologica);\n          font-size: var(--desktop-title-h6-size, 20px);\n          font-weight: 400;\n          line-height: var(--desktop-title-h6-line-height);\n        }\n\n        .tk-card-subtitle {\n          color: var(--text-base);\n          font-family: var(--desktop-subheading-2xs-font, Geologica);\n          font-size: var(--desktop-subheading-2xs-size, 11px);\n          font-weight: 400;\n          line-height: var(--desktop-subheading-2xs-line-height, 16px);\n        }\n      }\n    }\n\n    &.tk-card-header-top:not(.tk-card-horizontal .tk-card-horizontal-has-image-container .tk-card-header) {\n      border-radius: 8px 8px 0 0;\n\n      &.tk-card-header-divided,\n      &.tk-card-header-light {\n        border-bottom: var(--spacing-px) solid var(--border-light);\n      }\n\n      &.tk-card-header-light {\n        background: var(--background-lightest);\n        border-top-left-radius: var(--radius-xl);\n        border-top-right-radius: var(--radius-xl);\n      }\n\n      &.tk-card-header-dark {\n        background: var(--background-darkest);\n\n        .tk-card-title-container {\n          .tk-card-subtitle {\n            color: var(--text-sub-base);\n          }\n\n          .tk-card-title {\n            color: var(--text-lightest);\n          }\n        }\n\n        .tk-card-header-menu-button {\n          color: var(--icon-base);\n        }\n      }\n\n      &.tk-card-header-primary {\n        background: var(--primary-base);\n\n        .tk-card-title-container {\n          .tk-card-subtitle {\n            color: var(--primary-lightest);\n          }\n\n          .tk-card-title {\n            color: var(--text-lightest);\n          }\n        }\n\n        .tk-card-header-menu-button {\n          color: var(--primary-lightest);\n        }\n      }\n    }\n  }\n\n  .tk-card-image {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    align-self: stretch;\n\n    &.tk-card-windowed-image {\n      padding: var(--card-image-windowed-v-padding, 16px) var(--card-image-windowed-h-padding, 16px);\n\n      img {\n        border-radius: 8px;\n      }\n    }\n\n    img {\n      width: 100%;\n      height: 100%;\n      flex: 1 0 0;\n      align-self: stretch;\n    }\n  }\n\n  .tk-card-content {\n    display: flex;\n    flex-direction: column;\n    align-self: stretch;\n    padding: var(--card-body-relaxed-v-padding, 16px) var(--card-body-relaxed-h-padding, 16px);\n    color: var(--text-base, #717784);\n    gap: 8px;\n  }\n\n  .tk-card-footer {\n    display: flex;\n    padding: var(--card-footer-base-v-padding, 16px) var(--card-footer-base-h-padding, 16px);\n    justify-content: flex-end;\n    align-self: stretch;\n\n    ::slotted([slot='footer-actions']) {\n      display: flex;\n      align-items: center;\n      gap: var(--dialog-footer-base-gap);\n    }\n\n    &:not(.tk-card-horizontal .tk-card-footer) {\n      &.tk-card-footer-divided,\n      &.tk-card-footer-light {\n        border-top: var(--spacing-px, 1px) solid var(--border-light, #e1e4ea);\n      }\n\n      &.tk-card-footer-light {\n        background: var(--background-lightest, #f9fafc);\n        border-bottom-left-radius: var(--radius-xl);\n        border-bottom-right-radius: var(--radius-xl);\n      }\n    }\n  }\n\n  &.tk-card-image-background {\n    .tk-card-header .tk-card-header-content .tk-card-title-container {\n      .tk-card-subtitle {\n        color: var(--text-light, #e1e4ea);\n      }\n\n      .tk-card-title {\n        color: var(--text-lightest, #f9fafc);\n      }\n    }\n\n    .tk-card-content {\n      color: var(--text-light, #e1e4ea);\n    }\n  }\n}\n";

const TkCard$1 = /*@__PURE__*/ proxyCustomElement(
  class TkCard extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      /**
       * TO DO
       * Options for the image display
       * @defaultValue { position: 'top', background: false, windowed: false }
       */
      this.imageOptions = {
        position: 'top',
        background: false,
        windowed: true,
      };
      /**
       * Controls whether the header avatar is shown
       * @defaultValue false
       */
      this.showAvatar = false;
      /**
       * TO DO State hata verdiği için buraya alındı, düzeltilecek
       * TkAvatar component properties
       * @defaultValue { severity: 'light', background: 'solid', rounded: true }
       */
      this.avatarProps = {
        severity: 'light',
        background: 'solid',
        rounded: true,
      };
      /**
       * Controls whether the header is hidden
       * @defaultValue false
       */
      this.hideHeader = false;
      /**
       * Controls whether the menu button is shown
       * @defaultValue false
       */
      this.showMenuButton = false;
      /**
       * The image source for the card
       * @defaultValue null
       */
      this.image = null;
      /**
       * The position of the header
       * @defaultValue 'top'
       */
      this.headerPosition = 'top';
      /**
       * The type of the header
       * @defaultValue 'basic'
       */
      this.headerType = 'basic';
      /**
       * Controls whether the card is displayed horizontally
       * @defaultValue false
       */
      this.horizontal = false;
      /**
       * The mode of the footer
       * @defaultValue 'basic'
       */
      this.footerType = 'basic';
      /**
       * Controls whether the card shows a hover shadow effect
       * @defaultValue false
       */
      this.enableHoverShadow = false;
      /**
       * The style attribute of container element
       */
      this.containerStyle = null;
      /**
       * The style attribute of content element
       */
      this.contentStyle = null;
    }
    componentWillLoad() {
      this.hasHeaderSlot = !!this.el.querySelector(':scope > [slot="header"]');
      this.hasAvatarSlot = !!this.el.querySelector(':scope > [slot="avatar"]');
      this.hasContentSlot = !!this.el.querySelector(':scope > [slot="content"]');
      this.hasFooterSlot = !!this.el.querySelector(':scope > [slot="footer"]');
      this.hasFooterActionsSlot = !!this.el.querySelector(':scope > [slot="footer-actions"]');
      this.hasDefaultSlotBody = Array.from(this.el.childNodes).some(node => {
        return node.nodeType === Node.ELEMENT_NODE && !node.hasAttribute('slot');
      });
    }
    createHeader() {
      if (this.hideHeader) return null;
      if (this.hasHeaderSlot) {
        return h('slot', { name: 'header' });
      } else {
        if (!this.header) return null;
        return h(
          'div',
          {
            class: classNames('tk-card-header', `tk-card-header-${this.headerPosition}`, {
              [`tk-card-header-${this.headerType}`]: !this.imageOptions.background,
            }),
          },
          h(
            'div',
            { class: 'tk-card-header-content' },
            this.hasAvatarSlot
              ? h('slot', { name: 'avatar' })
              : h(Fragment, null, this.showAvatar && h('div', { class: 'tk-card-avatar' }, ' ', h('tk-avatar', Object.assign({}, this.avatarProps)))),
            h(
              'div',
              { class: 'tk-card-title-container' },
              this.subheader && h('span', { class: 'tk-card-subtitle' }, this.subheader),
              this.header && h('span', { class: 'tk-card-title' }, this.header),
            ),
          ),
          this.showMenuButton && h('tk-button', { 'variant': 'neutral', 'icon': 'more_vert', 'size': 'base', 'type': 'text', 'aria-label': 'TkCard Header Menu Button' }),
        );
      }
    }
    createImage() {
      if (!this.image || this.imageOptions.background) return null;
      const imageClasses = classNames('tk-card-image', `tk-card-image-${this.imageOptions.position}`, { 'tk-card-windowed-image': this.imageOptions.windowed });
      return h('div', { class: imageClasses }, h('img', { src: this.image, alt: 'Card image' }));
    }
    createContent() {
      if (this.hasContentSlot) {
        return h('slot', { name: 'content' });
      } else if (this.hasDefaultSlotBody) {
        return h('div', { class: 'tk-card-content', style: this.contentStyle }, h('slot', null));
      }
      return null;
    }
    createFooter() {
      if (this.hasFooterSlot) {
        return h('slot', { name: 'footer' });
      } else if (this.hasFooterActionsSlot) {
        return h(
          'div',
          {
            class: classNames('tk-card-footer', {
              [`tk-card-footer-${this.footerType}`]: !this.imageOptions.background,
            }),
          },
          h('slot', { name: 'footer-actions' }),
        );
      }
      return null;
    }
    renderCardContent() {
      const header = this.createHeader();
      const image = this.createImage();
      const content = this.createContent();
      const footer = this.createFooter();
      const imageOption = this.imageOptions.position;
      if (imageOption === 'top') {
        return h(Fragment, null, this.headerPosition === 'top' && header, image, this.headerPosition === 'bottom' && header, content, footer);
      } else if (this.horizontal && (imageOption === 'left' || imageOption === 'right')) {
        return h(
          Fragment,
          null,
          imageOption === 'left' && image,
          h('div', { class: 'tk-card-horizontal-has-image-container' }, header, content, footer),
          imageOption === 'right' && image,
        );
      }
    }
    render() {
      const rootClasses = classNames('tk-card', {
        'tk-card-vertical': !this.horizontal,
        'tk-card-horizontal': this.horizontal,
        'tk-card-image-background': this.imageOptions.background,
        'has-hover-shadow': this.enableHoverShadow,
      });
      const rootProps = {
        class: rootClasses,
        style: Object.assign(Object.assign({}, this.imageOptions.backgroundUrl && { background: `url(${this.imageOptions.backgroundUrl})` }), this.containerStyle),
      };
      return h('div', Object.assign({ key: '6a133118d42211abd6e8d51b166b5041985685e2' }, rootProps), this.renderCardContent());
    }
    get el() {
      return this;
    }
    static get style() {
      return tkCardScss;
    }
  },
  [
    1,
    'tk-card',
    {
      imageOptions: [16, 'image-options'],
      showAvatar: [4, 'show-avatar'],
      avatarProps: [8, 'avatar-props'],
      hideHeader: [4, 'hide-header'],
      showMenuButton: [4, 'show-menu-button'],
      image: [1],
      headerPosition: [1, 'header-position'],
      header: [1],
      subheader: [1],
      headerType: [1, 'header-type'],
      horizontal: [4],
      footerType: [1, 'footer-type'],
      enableHoverShadow: [4, 'enable-hover-shadow'],
      containerStyle: [8, 'container-style'],
      contentStyle: [8, 'content-style'],
      hasHeaderSlot: [32],
      hasAvatarSlot: [32],
      hasContentSlot: [32],
      hasFooterSlot: [32],
      hasFooterActionsSlot: [32],
      hasDefaultSlotBody: [32],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-card', 'tk-avatar', 'tk-button', 'tk-icon', 'tk-spinner'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-card':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkCard$1);
        }
        break;
      case 'tk-avatar':
        if (!customElements.get(tagName)) {
          defineCustomElement$5();
        }
        break;
      case 'tk-button':
        if (!customElements.get(tagName)) {
          defineCustomElement$4();
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$3();
        }
        break;
      case 'tk-spinner':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
    }
  });
}

const TkCard = TkCard$1;
const defineCustomElement = defineCustomElement$1;

export { TkCard, defineCustomElement };
//# sourceMappingURL=tk-card.js.map

//# sourceMappingURL=tk-card.js.map
