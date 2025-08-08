import { p as proxyCustomElement, H, c as createEvent, h } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { d as defineCustomElement$4 } from './p-DOzOzA8V.js';
import { d as defineCustomElement$3 } from './p-75KyitY6.js';
import { d as defineCustomElement$2 } from './p-BkhDFlMy.js';

const tkDrawerCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}.tk-drawer-mask{position:fixed;height:100%;width:100%;left:0;top:0;display:flex;z-index:1500;opacity:0;transition:opacity 0.3s ease-in-out}.tk-drawer-mask .tk-drawer-overlay{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0}.tk-drawer-mask.tk-drawer-visible{opacity:1}.tk-drawer-mask.tk-drawer-mask-hidden{background-color:transparent}.tk-drawer-mask:not(.tk-drawer-mask-hidden).tk-drawer-mask-lightest{background-color:var(--overlay-black-lightest)}.tk-drawer-mask:not(.tk-drawer-mask-hidden).tk-drawer-mask-light{background-color:var(--overlay-black-light)}.tk-drawer-mask:not(.tk-drawer-mask-hidden).tk-drawer-mask-base{background-color:var(--overlay-black-base)}.tk-drawer-mask:not(.tk-drawer-mask-hidden).tk-drawer-mask-dark{background-color:var(--overlay-black-dark)}.tk-drawer-mask:not(.tk-drawer-mask-hidden).tk-drawer-mask-darkest{background-color:var(--overlay-black-darkest)}.tk-drawer{position:fixed;border:1px solid var(--border-light);background-color:var(--static-light);box-shadow:0 0 20px rgba(0, 0, 0, 0.1);transition:transform 0.3s ease-in-out;display:flex;flex-direction:column;transition:transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);will-change:transform;z-index:100}.tk-drawer.tk-drawer-full-screen{width:100vw !important;height:100vh !important;max-height:100%;top:0px !important;left:0px !important;transition:none;transform:none}.tk-drawer.tk-drawer-left,.tk-drawer.tk-drawer-right{top:0;bottom:0;height:100%;width:344px}.tk-drawer.tk-drawer-top,.tk-drawer.tk-drawer-bottom{left:0;right:0;width:100%;height:344px}.tk-drawer.tk-drawer-left{left:0;border-radius:0px 8px 8px 0px}.tk-drawer.tk-drawer-left .tk-drawer-header{border-top-right-radius:var(--radius-m-base)}.tk-drawer.tk-drawer-left .tk-drawer-footer{border-bottom-right-radius:var(--radius-m-base)}.tk-drawer.tk-drawer-right{right:0;border-radius:8px 0px 0px 8px}.tk-drawer.tk-drawer-right .tk-drawer-header{border-top-left-radius:var(--radius-m-base)}.tk-drawer.tk-drawer-right .tk-drawer-footer{border-bottom-left-radius:var(--radius-m-base)}.tk-drawer.tk-drawer-top{top:0;border-radius:0px 0px 8px 8px}.tk-drawer.tk-drawer-top .tk-drawer-header{border-radius:0}.tk-drawer.tk-drawer-top .tk-drawer-footer{border-bottom-left-radius:var(--radius-m-base);border-bottom-right-radius:var(--radius-m-base)}.tk-drawer.tk-drawer-bottom{bottom:0;border-radius:8px 8px 0px 0px}.tk-drawer.tk-drawer-bottom .tk-drawer-header{border-top-left-radius:var(--radius-m-base);border-top-right-radius:var(--radius-m-base)}.tk-drawer.tk-drawer-bottom .tk-drawer-footer{border-radius:0}.tk-drawer-content{display:flex;flex-direction:column;height:100%}.tk-drawer-header{display:flex;justify-content:space-between;align-items:center;padding:var(--notification-header-v-padding) var(--notification-header-h-padding)}.tk-drawer-header .tk-drawer-header-label{color:var(--text-darkest);font-family:var(--desktop-body-m-base-font, Geologica);font-size:var(--desktop-body-m-base-size);font-style:normal;font-weight:400;line-height:var(--desktop-body-m-base-line-height)}.tk-drawer-header.tk-drawer-header-divided,.tk-drawer-header.tk-drawer-header-light{border-bottom:var(--spacing-px) solid var(--border-light)}.tk-drawer-header.tk-drawer-header-light{background:var(--background-lightest)}.tk-drawer-header.tk-drawer-header-dark{background:var(--background-darkest)}.tk-drawer-header.tk-drawer-header-dark .tk-drawer-header-label{color:var(--text-lightest)}.tk-drawer-header.tk-drawer-header-dark .tk-drawer-close{color:var(--icon-base)}.tk-drawer-header.tk-drawer-header-primary{background:var(--primary-base)}.tk-drawer-header.tk-drawer-header-primary .tk-drawer-header-label{color:var(--text-lightest)}.tk-drawer-header.tk-drawer-header-primary .tk-drawer-close{color:var(--primary-lightest)}.tk-drawer-body{flex-grow:1;overflow-y:auto;padding:0 var(--notification-body-h-padding)}.tk-drawer-footer{padding:var(--notification-footer-v-padding) var(--notification-footer-h-padding);box-shadow:var(--effect-2-default-base)}.tk-drawer-footer ::slotted([slot=footer]){display:flex;justify-content:flex-end;align-items:center;gap:var(--settings-footer-gap, 8px)}.tk-drawer-footer.tk-drawer-footer-divided,.tk-drawer-footer.tk-drawer-footer-light{border-top:var(--spacing-px, 1px) solid var(--border-light)}.tk-drawer-footer.tk-drawer-footer-light{background:var(--background-lightest)}';

const TkDrawer$1 = /*@__PURE__*/ proxyCustomElement(
  class TkDrawer extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkDrawerClose = createEvent(this, 'tk-drawer-close', 7);
      this.tkDrawerOpen = createEvent(this, 'tk-drawer-open', 7);
      this.tkDrawerEnter = createEvent(this, 'tk-drawer-enter', 7);
      this.tkDrawerLeave = createEvent(this, 'tk-drawer-leave', 7);
      this.tkDrawerChange = createEvent(this, 'tk-drawer-change', 7);
      this.containerVisible = false;
      this.isOpen = false;
      /**
       * Controls whether the drawer is open or closed
       * @defaultValue false
       */
      this.open = false;
      /**
       * Determines the position of the drawer
       * @defaultValue right
       */
      this.position = 'right';
      /**
       * Controls whether the backdrop is shown
       * @defaultValue false
       */
      this.hideBackdrop = false;
      /**
       * Appearance of the mask
       * @defaultValue base
       */
      this.maskVariant = 'base';
      /**
       * The style attribute of container element
       */
      this.containerStyle = null;
      /**
       * Prevents the drawer from being dismissed by clicking outside
       * @defaultValue false
       */
      this.preventDismiss = false;
      /**
       * Controls whether to hide the close icon
       * @defaultValue false
       */
      this.hideCloseIcon = false;
      /**
       * Controls whether to unblock scrolling when the drawer is open
       * @defaultValue false
       */
      this.unblockScroll = false;
      /**
       * The type of the header
       * @defaultValue 'basic'
       */
      this.headerType = 'basic';
      /**
       * The mode of the footer
       * @defaultValue 'basic'
       */
      this.footerType = 'basic';
      this.handleOverlayClick = () => {
        if (!this.preventDismiss) {
          this.tkDrawerClose.emit();
        }
      };
      this.handleCloseButtonClick = () => {
        this.tkDrawerClose.emit();
      };
    }
    openChanged(newValue) {
      if (newValue) {
        requestAnimationFrame(() => {
          this.isOpen = true;
          this.onEnter();
        });
      } else {
        this.isOpen = false;
        this.onLeave();
      }
      this.containerVisible = newValue;
      this.tkDrawerChange.emit(newValue);
    }
    componentWillLoad() {
      if (this.open) {
        this.containerVisible = true;
        requestAnimationFrame(() => {
          this.isOpen = true;
          this.onEnter();
        });
      }
    }
    /**
     * Opens the drawer by emitting a tk-drawer-open event
     * Parent components should listen for this event and update the open prop
     */
    async show() {
      this.tkDrawerOpen.emit();
    }
    /**
     * Closes the drawer by emitting a tk-drawer-close event
     * Parent components should listen for this event and update the open prop
     */
    async close() {
      this.tkDrawerClose.emit();
    }
    blockBodyScroll() {
      if (document.body.style.overflow !== 'hidden') {
        this.bodyOverflow = document.body.style.overflow;
        this.bodyPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.overflow = 'hidden';
      }
    }
    unblockBodyScroll() {
      document.body.style.overflow = this.bodyOverflow;
      document.body.style.paddingRight = this.bodyPaddingRight;
    }
    getTransformValue() {
      if (!this.isOpen) {
        switch (this.position) {
          case 'left':
            return 'translateX(-100%)';
          case 'right':
            return 'translateX(100%)';
          case 'top':
            return 'translateY(-100%)';
          case 'bottom':
            return 'translateY(100%)';
          default:
            return '';
        }
      }
      return 'translate(0, 0)';
    }
    onEnter() {
      if (!this.unblockScroll && !this.hideBackdrop) {
        this.blockBodyScroll();
      }
      this.tkDrawerEnter.emit();
      setTimeout(() => {
        this.tkDrawerOpen.emit();
      }, 300);
    }
    onLeave() {
      if (!this.unblockScroll && !this.hideBackdrop) {
        this.unblockBodyScroll();
      }
      this.tkDrawerLeave.emit();
      // setTimeout(() => {
      this.containerVisible = false;
      this.tkDrawerClose.emit();
      // }, 300);
    }
    createHeader() {
      const hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
      const hasHeaderActionsSlot = !!this.el.querySelector('[slot="header-actions"]');
      return h(
        'div',
        { class: classNames('tk-drawer-header', `tk-drawer-header-${this.headerType}`) },
        hasHeaderSlot ? h('slot', { name: 'header' }) : this.header ? h('span', { class: 'tk-drawer-header-label' }, this.header) : null,
        hasHeaderActionsSlot
          ? h('slot', { name: 'header-actions' })
          : !this.hideCloseIcon && h('tk-button', { 'class': 'tk-drawer-close', 'variant': 'neutral', 'icon': 'close', 'type': 'text', 'onTk-click': this.handleCloseButtonClick }),
      );
    }
    createFooter() {
      const hasFooterSlot = !!this.el.querySelector('[slot="footer"]');
      if (hasFooterSlot) {
        return h('div', { class: classNames('tk-drawer-footer', `tk-drawer-footer-${this.footerType}`) }, h('slot', { name: 'footer' }));
      }
      return null;
    }
    createDrawer() {
      const drawerClass = classNames('tk-drawer', `tk-drawer-${this.position}`, {
        'tk-drawer-open': this.isOpen,
      });
      const style = Object.assign(Object.assign({}, this.containerStyle && Object.assign({}, this.containerStyle)), { transform: this.getTransformValue() });
      return h(
        'div',
        { class: drawerClass, style: style },
        h(
          'div',
          { class: 'tk-drawer-content' },
          h('slot', { name: 'container' }, this.createHeader(), h('div', { class: 'tk-drawer-body' }, h('slot', { name: 'content' })), this.createFooter()),
        ),
      );
    }
    renderMask() {
      const maskClasses = classNames('tk-drawer-mask', `tk-drawer-mask-${this.maskVariant}`, {
        'tk-drawer-visible': this.containerVisible,
        'tk-drawer-mask-hidden': this.hideBackdrop,
      });
      return h('div', { class: maskClasses }, h('div', { class: 'tk-drawer-overlay', onClick: () => this.handleOverlayClick() }), this.createDrawer());
    }
    render() {
      return this.containerVisible && this.renderMask();
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        open: ['openChanged'],
      };
    }
    static get style() {
      return tkDrawerCss;
    }
  },
  [
    1,
    'tk-drawer',
    {
      open: [516],
      position: [1],
      hideBackdrop: [4, 'hide-backdrop'],
      maskVariant: [1, 'mask-variant'],
      containerStyle: [8, 'container-style'],
      preventDismiss: [4, 'prevent-dismiss'],
      hideCloseIcon: [4, 'hide-close-icon'],
      unblockScroll: [4, 'unblock-scroll'],
      header: [1],
      headerType: [1, 'header-type'],
      footerType: [1, 'footer-type'],
      containerVisible: [32],
      isOpen: [32],
      show: [64],
      close: [64],
    },
    undefined,
    {
      open: ['openChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-drawer', 'tk-button', 'tk-icon', 'tk-spinner'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-drawer':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkDrawer$1);
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

const TkDrawer = TkDrawer$1;
const defineCustomElement = defineCustomElement$1;

export { TkDrawer, defineCustomElement };
//# sourceMappingURL=tk-drawer.js.map

//# sourceMappingURL=tk-drawer.js.map
