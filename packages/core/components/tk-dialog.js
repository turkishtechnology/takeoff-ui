import { p as proxyCustomElement, H, c as createEvent, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$4 } from './p-D_-4qiry.js';
import { d as defineCustomElement$3 } from './p-DrRHtkyE.js';
import { d as defineCustomElement$2 } from './p-Dz92n4WS.js';

const tkDialogScss =
  "tk-dialog {\n  display: none;\n\n  &[visible],\n  &[visible='true'] {\n    display: block;\n  }\n}\n\n.tk-dialog-mask {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  left: 0;\n  top: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1500;\n  opacity: 0;\n  transition: opacity 0.3s ease-in-out;\n\n  &.tk-dialog-mask-blur {\n    backdrop-filter: blur(2px);\n  }\n\n  .tk-dialog-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 0;\n  }\n\n  &.tk-dialog-visible {\n    opacity: 1;\n  }\n\n  &.tk-dialog-mask-hidden {\n    background-color: transparent;\n  }\n\n  &:not(.tk-dialog-mask-hidden) {\n    &.tk-dialog-mask-lightest {\n      background-color: var(--overlay-black-lightest);\n    }\n\n    &.tk-dialog-mask-light {\n      background-color: var(--overlay-black-light);\n    }\n\n    &.tk-dialog-mask-base {\n      background-color: var(--overlay-black-base);\n    }\n\n    &.tk-dialog-mask-dark {\n      background-color: var(--overlay-black-dark);\n    }\n\n    &.tk-dialog-mask-darkest {\n      background-color: var(--overlay-black-darkest);\n    }\n  }\n}\n\n.tk-dialog {\n  font-family: var(--family-title);\n  display: flex;\n  max-height: 90%;\n  flex-direction: column;\n  align-items: flex-start;\n  border-radius: var(--radius-xl);\n  border: 1px solid var(--border-lightest);\n  background: var(--static-light);\n  box-shadow: var(--effect-1-default-base);\n  z-index: 100;\n\n  .tk-dialog-header {\n    display: flex;\n    padding: var(--dialog-header-base-v-padding) var(--dialog-header-base-h-padding);\n    justify-content: space-between;\n    align-items: flex-start;\n    align-self: stretch;\n\n    border-top-left-radius: var(--radius-xl);\n    border-top-right-radius: var(--radius-xl);\n\n    .tk-dialog-header-content {\n      display: flex;\n      align-items: center;\n      gap: var(--dialog-header-base-gap);\n\n      .tk-dialog-title-container {\n        display: flex;\n        flex-direction: column;\n        align-items: flex-start;\n\n        .tk-dialog-title {\n          color: var(--text-darkest);\n          font-family: var(--desktop-title-h5-font);\n          font-size: var(--desktop-title-h5-size);\n          font-style: normal;\n          font-weight: 400;\n          line-height: var(--desktop-title-h5-line-height);\n          /* 125% */\n        }\n\n        .tk-dialog-subtitle {\n          color: var(--text-base);\n          font-family: var(--desktop-subheading-xs-font);\n          font-size: var(--desktop-subheading-xs-size);\n          font-style: normal;\n          font-weight: 400;\n          line-height: var(--desktop-subheading-xs-line-height);\n          /* 150% */\n        }\n      }\n    }\n\n    .tk-dialog-header-close-button {\n      display: flex;\n      color: var(--icon-sub-base);\n      width: var(--dialog-header-base-close-icon-size);\n      height: var(--dialog-header-base-close-icon-size);\n      padding: var(--sizes-small-full-padding, 6px);\n      justify-content: center;\n      align-items: center;\n      gap: var(--dialog-header-small-gap);\n      border-radius: var(--sizes-small-radius, 8px);\n\n      &:focus {\n        box-shadow: var(--neutral-focus);\n      }\n    }\n\n    &.tk-dialog-header-divided {\n      border-bottom: var(--spacing-px) solid var(--border-light);\n    }\n\n    &.tk-dialog-header-light {\n      border-bottom: var(--spacing-px) solid var(--border-light);\n      background: var(--background-lightest);\n    }\n\n    &.tk-dialog-header-dark {\n      background: var(--background-darkest);\n\n      .tk-dialog-title-container {\n        .tk-dialog-subtitle {\n          color: var(--text-sub-base);\n        }\n\n        .tk-dialog-title {\n          color: var(--text-lightest);\n        }\n      }\n\n      .tk-dialog-header-close-button {\n        color: var(--icon-base);\n      }\n    }\n\n    &.tk-dialog-header-primary {\n      background: var(--primary-base);\n\n      .tk-dialog-title-container {\n        .tk-dialog-subtitle {\n          color: var(--primary-lightest);\n        }\n\n        .tk-dialog-title {\n          color: var(--text-lightest);\n        }\n      }\n\n      .tk-dialog-header-close-button {\n        color: var(--primary-lightest);\n      }\n    }\n  }\n\n  .tk-dialog-content {\n    padding: var(--dialog-body-base-v-padding) var(--dialog-body-base-h-padding);\n    align-self: stretch;\n    overflow-y: auto;\n\n    &::-webkit-scrollbar {\n      width: 6px;\n      background: var(--background-lightest);\n      opacity: 1;\n      transition: opacity 0.3s ease;\n    }\n\n    &::-webkit-scrollbar-track {\n      background: var(--background-lightest);\n      border-radius: 2px;\n      opacity: 1;\n      transition: opacity 0.3s ease;\n    }\n\n    &::-webkit-scrollbar-thumb {\n      background: var(--secondary-sub-base);\n      border-radius: 3px;\n      opacity: 1;\n      transition: opacity 0.3s ease;\n    }\n  }\n\n  .tk-dialog-footer {\n    display: flex;\n    padding: var(--dialog-footer-base-v-padding) var(--dialog-footer-base-h-padding);\n    justify-content: flex-end;\n    align-self: stretch;\n\n    ::slotted([slot='footer-actions']) {\n      display: flex;\n      align-items: center;\n      gap: var(--dialog-footer-base-gap);\n    }\n  }\n}\n";

const TkDialog$1 = /*@__PURE__*/ proxyCustomElement(
  class TkDialog extends H {
    constructor() {
      super();
      this.__registerHost();
      this.tkClose = createEvent(this, 'tk-close', 7);
      this.tkOpen = createEvent(this, 'tk-open', 7);
      this.tkVisibleChange = createEvent(this, 'tk-visible-change', 7);
      /**
       * Controls the visibility of the dialog
       */
      this.visible = false;
      /**
       * Header type
       */
      this.headerType = 'basic';
      /**
       * Controls whether the close button is shown
       */
      this.showCloseButton = true;
      /**
       * Controls whether the header is shown
       */
      this.showHeader = true;
      /**
       * Controls whether the variant sign is shown
       */
      this.showVariantSign = true;
      /**
       * The variant of the dialog
       */
      this.variant = 'info';
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
       * Controls whether the dialog has a blur background
       * @defaultValue false
       */
      this.isMaskBlur = false;
      /**
       * The style attribute of container element
       */
      this.containerStyle = null;
      /**
       * Prevents the dialog from being dismissed by clicking outside
       * @defaultValue false
       */
      this.preventDismiss = false;
      this.handleCloseButtonClick = () => {
        this.tkClose.emit();
        this.tkVisibleChange.emit(false);
      };
      this.handleOverlayClick = () => {
        if (!this.preventDismiss) {
          this.tkClose.emit();
          this.tkVisibleChange.emit(false);
        }
      };
    }
    visibleChanged(newValue) {
      if (newValue) {
        this.tkOpen.emit();
        if (!this.hideBackdrop) {
          this.blockBodyScroll();
        }
      } else {
        this.tkClose.emit();
        if (!this.hideBackdrop) {
          this.unblockBodyScroll();
        }
      }
    }
    componentWillLoad() {
      this.hasContainerSlot = !!this.el.querySelector(':scope > [slot="container"]');
      this.hasHeaderSlot = !!this.el.querySelector(':scope > [slot="header"]');
      this.hasContentSlot = !!this.el.querySelector(':scope > [slot="content"]');
      this.hasFooterSlot = !!this.el.querySelector(':scope > [slot="footer"]');
      this.hasFooterActionsSlot = !!this.el.querySelector(':scope > [slot="footer-actions"]');
      this.hasDefaultSlotContent = Array.from(this.el.childNodes).some(node => {
        return node.nodeType === Node.ELEMENT_NODE && !node.hasAttribute('slot');
      });
    }
    disconnectedCallback() {
      if (!this.hideBackdrop) {
        this.unblockBodyScroll();
      }
    }
    /**
     * Requests to open the dialog by emitting a tk-open event.
     * Note: This method only emits an event. The dialog will only open if the parent component
     * listens for this event and updates the 'visible' prop to true.
     */
    async open() {
      this.tkOpen.emit();
    }
    /**
     * Requests to close the dialog by emitting a tk-close event.
     * Note: This method only emits an event. The dialog will only close if the parent component
     * listens for this event and updates the 'visible' prop to false.
     */
    async close() {
      this.tkClose.emit();
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
    getVariantIcon() {
      switch (this.variant) {
        case 'success':
          return 'check_circle';
        case 'warning':
          return 'warning';
        case 'danger':
          return 'error';
        default:
          return 'info';
      }
    }
    createHeader() {
      if (this.showHeader) {
        if (this.hasHeaderSlot) {
          return h('slot', { name: 'header' });
        } else {
          const headerClasses = classNames('tk-dialog-header', `tk-dialog-header-${this.headerType}`);
          return h(
            'div',
            { class: headerClasses },
            h(
              'div',
              { class: 'tk-dialog-header-content' },
              this.showVariantSign &&
                h(
                  'tk-icon',
                  Object.assign(
                    { sign: true, size: 'xlarge' },
                    getIconElementProps(this.getVariantIcon(), { class: classNames('fill tk-dialog-sign-icon'), variant: this.variant }, 'rounded', 'span'),
                  ),
                ),
              h(
                'div',
                { class: 'tk-dialog-title-container' },
                this.subheader && h('span', { class: 'tk-dialog-subtitle' }, this.subheader),
                this.header && h('span', { class: 'tk-dialog-title' }, this.header),
              ),
            ),
            this.showCloseButton &&
              h('tk-button', { 'variant': 'neutral', 'icon': 'close', 'size': 'small', 'type': 'text', 'onTk-click': this.handleCloseButtonClick, 'aria-label': 'Close dialog' }),
          );
        }
      }
      return null;
    }
    createContent() {
      if (this.hasContentSlot) {
        return h('div', { class: 'tk-dialog-content' }, h('slot', { name: 'content' }));
      } else if (this.hasDefaultSlotContent) {
        return h('div', { class: 'tk-dialog-content' }, h('slot', null));
      }
      return null;
    }
    createFooter() {
      if (this.hasFooterSlot) {
        return h('slot', { name: 'footer' });
      } else if (this.hasFooterActionsSlot) {
        return h('div', { class: 'tk-dialog-footer' }, h('slot', { name: 'footer-actions' }));
      }
      return null;
    }
    createDialog() {
      const header = this.createHeader();
      const content = this.createContent();
      const footer = this.createFooter();
      const dialogClasses = classNames('tk-dialog', `tk-dialog-${this.variant}`);
      const rootProps = {
        'class': dialogClasses,
        'style': Object.assign({}, this.containerStyle),
        'role': 'dialog',
        'aria-modal': true,
      };
      return h('div', Object.assign({}, rootProps), header, content, footer);
    }
    renderMask() {
      const dialog = this.hasContainerSlot ? h('slot', { name: 'container' }) : this.createDialog();
      const maskClasses = classNames('tk-dialog-mask', `tk-dialog-mask-${this.maskVariant}`, {
        'tk-dialog-visible': this.visible,
        'tk-dialog-mask-hidden': this.hideBackdrop,
        'tk-dialog-mask-blur': this.isMaskBlur,
      });
      return h('div', { class: maskClasses }, h('div', { class: 'tk-dialog-overlay', onClick: () => this.handleOverlayClick() }), dialog);
    }
    render() {
      return this.renderMask();
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        visible: ['visibleChanged'],
      };
    }
    static get style() {
      return tkDialogScss;
    }
  },
  [
    4,
    'tk-dialog',
    {
      visible: [516],
      header: [1],
      headerType: [1, 'header-type'],
      showCloseButton: [4, 'show-close-button'],
      showHeader: [4, 'show-header'],
      showVariantSign: [4, 'show-variant-sign'],
      subheader: [1],
      variant: [1],
      hideBackdrop: [4, 'hide-backdrop'],
      maskVariant: [1, 'mask-variant'],
      isMaskBlur: [4, 'is-mask-blur'],
      containerStyle: [8, 'container-style'],
      preventDismiss: [4, 'prevent-dismiss'],
      hasContainerSlot: [32],
      hasContentSlot: [32],
      hasDefaultSlotContent: [32],
      hasFooterActionsSlot: [32],
      hasFooterSlot: [32],
      hasHeaderSlot: [32],
      open: [64],
      close: [64],
    },
    undefined,
    {
      visible: ['visibleChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-dialog', 'tk-button', 'tk-icon', 'tk-spinner'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-dialog':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkDialog$1);
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

const TkDialog = TkDialog$1;
const defineCustomElement = defineCustomElement$1;

export { TkDialog, defineCustomElement };
//# sourceMappingURL=tk-dialog.js.map

//# sourceMappingURL=tk-dialog.js.map
