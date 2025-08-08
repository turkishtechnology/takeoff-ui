import { p as proxyCustomElement, H, c as createEvent, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { d as defineCustomElement$4 } from './p-D_-4qiry.js';
import { d as defineCustomElement$3 } from './p-DrRHtkyE.js';
import { d as defineCustomElement$2 } from './p-Dz92n4WS.js';

const tkDrawerScss =
  ":host {\n  display: block;\n}\n\n.tk-drawer-mask {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  left: 0;\n  top: 0;\n  display: flex;\n  z-index: 1500;\n  opacity: 0;\n  transition: opacity 0.3s ease-in-out;\n\n  .tk-drawer-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 0;\n  }\n\n  &.tk-drawer-visible {\n    opacity: 1;\n  }\n\n  &.tk-drawer-mask-hidden {\n    background-color: transparent;\n  }\n\n  &:not(.tk-drawer-mask-hidden) {\n    &.tk-drawer-mask-lightest {\n      background-color: var(--overlay-black-lightest);\n    }\n\n    &.tk-drawer-mask-light {\n      background-color: var(--overlay-black-light);\n    }\n\n    &.tk-drawer-mask-base {\n      background-color: var(--overlay-black-base);\n    }\n\n    &.tk-drawer-mask-dark {\n      background-color: var(--overlay-black-dark);\n    }\n\n    &.tk-drawer-mask-darkest {\n      background-color: var(--overlay-black-darkest);\n    }\n  }\n}\n\n.tk-drawer {\n  position: fixed;\n  border: 1px solid var(--border-light);\n  background-color: var(--static-light);\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s ease-in-out;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  will-change: transform;\n  z-index: 100;\n\n  &.tk-drawer-full-screen {\n    width: 100vw !important;\n    height: 100vh !important;\n    max-height: 100%;\n    top: 0px !important;\n    left: 0px !important;\n    transition: none;\n    transform: none;\n  }\n\n  &.tk-drawer-left,\n  &.tk-drawer-right {\n    top: 0;\n    bottom: 0;\n    height: 100%;\n    width: 344px;\n  }\n\n  &.tk-drawer-top,\n  &.tk-drawer-bottom {\n    left: 0;\n    right: 0;\n    width: 100%;\n    height: 344px;\n  }\n\n  &.tk-drawer-left {\n    left: 0;\n    border-radius: 0px 8px 8px 0px;\n\n    .tk-drawer-header {\n      border-top-right-radius: var(--radius-m-base);\n    }\n\n    .tk-drawer-footer {\n      border-bottom-right-radius: var(--radius-m-base);\n    }\n  }\n\n  &.tk-drawer-right {\n    right: 0;\n    border-radius: 8px 0px 0px 8px;\n\n    .tk-drawer-header {\n      border-top-left-radius: var(--radius-m-base);\n    }\n\n    .tk-drawer-footer {\n      border-bottom-left-radius: var(--radius-m-base);\n    }\n  }\n\n  &.tk-drawer-top {\n    top: 0;\n    border-radius: 0px 0px 8px 8px;\n\n    .tk-drawer-header {\n      border-radius: 0;\n    }\n\n    .tk-drawer-footer {\n      border-bottom-left-radius: var(--radius-m-base);\n      border-bottom-right-radius: var(--radius-m-base);\n    }\n  }\n\n  &.tk-drawer-bottom {\n    bottom: 0;\n    border-radius: 8px 8px 0px 0px;\n\n    .tk-drawer-header {\n      border-top-left-radius: var(--radius-m-base);\n      border-top-right-radius: var(--radius-m-base);\n    }\n\n    .tk-drawer-footer {\n      border-radius: 0;\n    }\n  }\n}\n\n.tk-drawer-content {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n.tk-drawer-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--notification-header-v-padding) var(--notification-header-h-padding);\n\n  .tk-drawer-header-label {\n    color: var(--text-darkest);\n    font-family: var(--desktop-body-m-base-font, Geologica);\n    font-size: var(--desktop-body-m-base-size);\n    font-style: normal;\n    font-weight: 400;\n    line-height: var(--desktop-body-m-base-line-height);\n  }\n\n  &.tk-drawer-header-divided,\n  &.tk-drawer-header-light {\n    border-bottom: var(--spacing-px) solid var(--border-light);\n  }\n\n  &.tk-drawer-header-light {\n    background: var(--background-lightest);\n  }\n\n  &.tk-drawer-header-dark {\n    background: var(--background-darkest);\n\n    .tk-drawer-header-label {\n      color: var(--text-lightest);\n    }\n\n    .tk-drawer-close {\n      color: var(--icon-base);\n    }\n  }\n\n  &.tk-drawer-header-primary {\n    background: var(--primary-base);\n\n    .tk-drawer-header-label {\n      color: var(--text-lightest);\n    }\n\n    .tk-drawer-close {\n      color: var(--primary-lightest);\n    }\n  }\n}\n\n.tk-drawer-body {\n  flex-grow: 1;\n  overflow-y: auto;\n  padding: 0 var(--notification-body-h-padding);\n}\n\n.tk-drawer-footer {\n  padding: var(--notification-footer-v-padding) var(--notification-footer-h-padding);\n  box-shadow: var(--effect-2-default-base);\n\n  ::slotted([slot='footer']) {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    gap: var(--settings-footer-gap, 8px);\n  }\n\n  &.tk-drawer-footer-divided,\n  &.tk-drawer-footer-light {\n    border-top: var(--spacing-px, 1px) solid var(--border-light);\n  }\n\n  &.tk-drawer-footer-light {\n    background: var(--background-lightest);\n  }\n}\n";

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
      return tkDrawerScss;
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
