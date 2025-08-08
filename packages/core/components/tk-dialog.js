import { p as proxyCustomElement, H, c as createEvent, h } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$4 } from './p-DOzOzA8V.js';
import { d as defineCustomElement$3 } from './p-75KyitY6.js';
import { d as defineCustomElement$2 } from './p-BkhDFlMy.js';

const tkDialogCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}tk-dialog{display:none}tk-dialog[visible],tk-dialog[visible=true]{display:block}.tk-dialog-mask{position:fixed;height:100%;width:100%;left:0;top:0;display:flex;justify-content:center;align-items:center;z-index:1500;opacity:0;transition:opacity 0.3s ease-in-out}.tk-dialog-mask.tk-dialog-mask-blur{backdrop-filter:blur(2px)}.tk-dialog-mask .tk-dialog-overlay{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0}.tk-dialog-mask.tk-dialog-visible{opacity:1}.tk-dialog-mask.tk-dialog-mask-hidden{background-color:transparent}.tk-dialog-mask:not(.tk-dialog-mask-hidden).tk-dialog-mask-lightest{background-color:var(--overlay-black-lightest)}.tk-dialog-mask:not(.tk-dialog-mask-hidden).tk-dialog-mask-light{background-color:var(--overlay-black-light)}.tk-dialog-mask:not(.tk-dialog-mask-hidden).tk-dialog-mask-base{background-color:var(--overlay-black-base)}.tk-dialog-mask:not(.tk-dialog-mask-hidden).tk-dialog-mask-dark{background-color:var(--overlay-black-dark)}.tk-dialog-mask:not(.tk-dialog-mask-hidden).tk-dialog-mask-darkest{background-color:var(--overlay-black-darkest)}.tk-dialog{font-family:var(--family-title);display:flex;max-height:90%;flex-direction:column;align-items:flex-start;border-radius:var(--radius-xl);border:1px solid var(--border-lightest);background:var(--static-light);box-shadow:var(--effect-1-default-base);z-index:100}.tk-dialog .tk-dialog-header{display:flex;padding:var(--dialog-header-base-v-padding) var(--dialog-header-base-h-padding);justify-content:space-between;align-items:flex-start;align-self:stretch;border-top-left-radius:var(--radius-xl);border-top-right-radius:var(--radius-xl)}.tk-dialog .tk-dialog-header .tk-dialog-header-content{display:flex;align-items:center;gap:var(--dialog-header-base-gap)}.tk-dialog .tk-dialog-header .tk-dialog-header-content .tk-dialog-title-container{display:flex;flex-direction:column;align-items:flex-start}.tk-dialog .tk-dialog-header .tk-dialog-header-content .tk-dialog-title-container .tk-dialog-title{color:var(--text-darkest);font-family:var(--desktop-title-h5-font);font-size:var(--desktop-title-h5-size);font-style:normal;font-weight:400;line-height:var(--desktop-title-h5-line-height);}.tk-dialog .tk-dialog-header .tk-dialog-header-content .tk-dialog-title-container .tk-dialog-subtitle{color:var(--text-base);font-family:var(--desktop-subheading-xs-font);font-size:var(--desktop-subheading-xs-size);font-style:normal;font-weight:400;line-height:var(--desktop-subheading-xs-line-height);}.tk-dialog .tk-dialog-header .tk-dialog-header-close-button{display:flex;color:var(--icon-sub-base);width:var(--dialog-header-base-close-icon-size);height:var(--dialog-header-base-close-icon-size);padding:var(--sizes-small-full-padding, 6px);justify-content:center;align-items:center;gap:var(--dialog-header-small-gap);border-radius:var(--sizes-small-radius, 8px)}.tk-dialog .tk-dialog-header .tk-dialog-header-close-button:focus{box-shadow:var(--neutral-focus)}.tk-dialog .tk-dialog-header.tk-dialog-header-divided{border-bottom:var(--spacing-px) solid var(--border-light)}.tk-dialog .tk-dialog-header.tk-dialog-header-light{border-bottom:var(--spacing-px) solid var(--border-light);background:var(--background-lightest)}.tk-dialog .tk-dialog-header.tk-dialog-header-dark{background:var(--background-darkest)}.tk-dialog .tk-dialog-header.tk-dialog-header-dark .tk-dialog-title-container .tk-dialog-subtitle{color:var(--text-sub-base)}.tk-dialog .tk-dialog-header.tk-dialog-header-dark .tk-dialog-title-container .tk-dialog-title{color:var(--text-lightest)}.tk-dialog .tk-dialog-header.tk-dialog-header-dark .tk-dialog-header-close-button{color:var(--icon-base)}.tk-dialog .tk-dialog-header.tk-dialog-header-primary{background:var(--primary-base)}.tk-dialog .tk-dialog-header.tk-dialog-header-primary .tk-dialog-title-container .tk-dialog-subtitle{color:var(--primary-lightest)}.tk-dialog .tk-dialog-header.tk-dialog-header-primary .tk-dialog-title-container .tk-dialog-title{color:var(--text-lightest)}.tk-dialog .tk-dialog-header.tk-dialog-header-primary .tk-dialog-header-close-button{color:var(--primary-lightest)}.tk-dialog .tk-dialog-content{padding:var(--dialog-body-base-v-padding) var(--dialog-body-base-h-padding);align-self:stretch;overflow-y:auto}.tk-dialog .tk-dialog-content::-webkit-scrollbar{width:6px;background:var(--background-lightest);opacity:1;transition:opacity 0.3s ease}.tk-dialog .tk-dialog-content::-webkit-scrollbar-track{background:var(--background-lightest);border-radius:2px;opacity:1;transition:opacity 0.3s ease}.tk-dialog .tk-dialog-content::-webkit-scrollbar-thumb{background:var(--secondary-sub-base);border-radius:3px;opacity:1;transition:opacity 0.3s ease}.tk-dialog .tk-dialog-footer{display:flex;padding:var(--dialog-footer-base-v-padding) var(--dialog-footer-base-h-padding);justify-content:flex-end;align-self:stretch}.tk-dialog .tk-dialog-footer ::slotted([slot=footer-actions]){display:flex;align-items:center;gap:var(--dialog-footer-base-gap)}';

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
      return tkDialogCss;
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
