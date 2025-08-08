import { p as proxyCustomElement, H, h, F as Fragment } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { d as defineCustomElement$5 } from './p-C4O4GV07.js';
import { d as defineCustomElement$4 } from './p-DOzOzA8V.js';
import { d as defineCustomElement$3 } from './p-75KyitY6.js';
import { d as defineCustomElement$2 } from './p-BkhDFlMy.js';

const tkCardCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}.tk-card{display:flex;background:var(--static-light);border-radius:16px;border:1px solid var(--border-light);box-shadow:var(--effect-1-default-base)}.tk-card.has-hover-shadow:hover{box-shadow:var(--effect-1-hover-base)}.tk-card.tk-card-vertical{flex-direction:column}.tk-card.tk-card-horizontal{flex-direction:row;align-items:stretch}.tk-card.tk-card-horizontal:has(.tk-card-image-top){flex-direction:column;justify-content:stretch}.tk-card.tk-card-horizontal .tk-card-horizontal-has-image-container{display:flex;flex-direction:column;flex:1 0 0;align-self:stretch}.tk-card.tk-card-horizontal .tk-card-image:not(.tk-card-windowed-image).tk-card-image-left img{border-radius:8px 0 0 8px}.tk-card.tk-card-horizontal .tk-card-image:not(.tk-card-windowed-image).tk-card-image-right img{border-radius:0 8px 8px 0}.tk-card .tk-card-header{display:flex;padding:var(--card-header-base-v-padding, 12px) var(--card-header-base-h-padding, 16px);justify-content:space-between;align-items:center;align-self:stretch}.tk-card .tk-card-header .tk-card-header-content{display:flex;align-items:center;gap:var(--dialog-header-base-gap)}.tk-card .tk-card-header .tk-card-header-content .tk-card-title-container{display:flex;flex-direction:column;align-items:flex-start}.tk-card .tk-card-header .tk-card-header-content .tk-card-title-container .tk-card-title{color:var(--text-darkest);font-family:var(--desktop-title-h6-font, Geologica);font-size:var(--desktop-title-h6-size, 20px);font-weight:400;line-height:var(--desktop-title-h6-line-height)}.tk-card .tk-card-header .tk-card-header-content .tk-card-title-container .tk-card-subtitle{color:var(--text-base);font-family:var(--desktop-subheading-2xs-font, Geologica);font-size:var(--desktop-subheading-2xs-size, 11px);font-weight:400;line-height:var(--desktop-subheading-2xs-line-height, 16px)}.tk-card .tk-card-header.tk-card-header-top:not(.tk-card-horizontal .tk-card-horizontal-has-image-container .tk-card-header){border-radius:8px 8px 0 0}.tk-card .tk-card-header.tk-card-header-top:not(.tk-card-horizontal .tk-card-horizontal-has-image-container .tk-card-header).tk-card-header-divided,.tk-card .tk-card-header.tk-card-header-top:not(.tk-card-horizontal .tk-card-horizontal-has-image-container .tk-card-header).tk-card-header-light{border-bottom:var(--spacing-px) solid var(--border-light)}.tk-card .tk-card-header.tk-card-header-top:not(.tk-card-horizontal .tk-card-horizontal-has-image-container .tk-card-header).tk-card-header-light{background:var(--background-lightest);border-top-left-radius:var(--radius-xl);border-top-right-radius:var(--radius-xl)}.tk-card .tk-card-header.tk-card-header-top:not(.tk-card-horizontal .tk-card-horizontal-has-image-container .tk-card-header).tk-card-header-dark{background:var(--background-darkest)}.tk-card .tk-card-header.tk-card-header-top:not(.tk-card-horizontal .tk-card-horizontal-has-image-container .tk-card-header).tk-card-header-dark .tk-card-title-container .tk-card-subtitle{color:var(--text-sub-base)}.tk-card .tk-card-header.tk-card-header-top:not(.tk-card-horizontal .tk-card-horizontal-has-image-container .tk-card-header).tk-card-header-dark .tk-card-title-container .tk-card-title{color:var(--text-lightest)}.tk-card .tk-card-header.tk-card-header-top:not(.tk-card-horizontal .tk-card-horizontal-has-image-container .tk-card-header).tk-card-header-dark .tk-card-header-menu-button{color:var(--icon-base)}.tk-card .tk-card-header.tk-card-header-top:not(.tk-card-horizontal .tk-card-horizontal-has-image-container .tk-card-header).tk-card-header-primary{background:var(--primary-base)}.tk-card .tk-card-header.tk-card-header-top:not(.tk-card-horizontal .tk-card-horizontal-has-image-container .tk-card-header).tk-card-header-primary .tk-card-title-container .tk-card-subtitle{color:var(--primary-lightest)}.tk-card .tk-card-header.tk-card-header-top:not(.tk-card-horizontal .tk-card-horizontal-has-image-container .tk-card-header).tk-card-header-primary .tk-card-title-container .tk-card-title{color:var(--text-lightest)}.tk-card .tk-card-header.tk-card-header-top:not(.tk-card-horizontal .tk-card-horizontal-has-image-container .tk-card-header).tk-card-header-primary .tk-card-header-menu-button{color:var(--primary-lightest)}.tk-card .tk-card-image{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}.tk-card .tk-card-image.tk-card-windowed-image{padding:var(--card-image-windowed-v-padding, 16px) var(--card-image-windowed-h-padding, 16px)}.tk-card .tk-card-image.tk-card-windowed-image img{border-radius:8px}.tk-card .tk-card-image img{width:100%;height:100%;flex:1 0 0;align-self:stretch}.tk-card .tk-card-content{display:flex;flex-direction:column;align-self:stretch;padding:var(--card-body-relaxed-v-padding, 16px) var(--card-body-relaxed-h-padding, 16px);color:var(--text-base, #717784);gap:8px}.tk-card .tk-card-footer{display:flex;padding:var(--card-footer-base-v-padding, 16px) var(--card-footer-base-h-padding, 16px);justify-content:flex-end;align-self:stretch}.tk-card .tk-card-footer ::slotted([slot=footer-actions]){display:flex;align-items:center;gap:var(--dialog-footer-base-gap)}.tk-card .tk-card-footer:not(.tk-card-horizontal .tk-card-footer).tk-card-footer-divided,.tk-card .tk-card-footer:not(.tk-card-horizontal .tk-card-footer).tk-card-footer-light{border-top:var(--spacing-px, 1px) solid var(--border-light, #e1e4ea)}.tk-card .tk-card-footer:not(.tk-card-horizontal .tk-card-footer).tk-card-footer-light{background:var(--background-lightest, #f9fafc);border-bottom-left-radius:var(--radius-xl);border-bottom-right-radius:var(--radius-xl)}.tk-card.tk-card-image-background .tk-card-header .tk-card-header-content .tk-card-title-container .tk-card-subtitle{color:var(--text-light, #e1e4ea)}.tk-card.tk-card-image-background .tk-card-header .tk-card-header-content .tk-card-title-container .tk-card-title{color:var(--text-lightest, #f9fafc)}.tk-card.tk-card-image-background .tk-card-content{color:var(--text-light, #e1e4ea)}';

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
      return tkCardCss;
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
