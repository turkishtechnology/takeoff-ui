import { p as proxyCustomElement, H, c as createEvent, h } from './p-CsLMRZQo.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$5 } from './p-koqDnh95.js';
import { d as defineCustomElement$4 } from './p-vR69rcDp.js';
import { d as defineCustomElement$3 } from './p-C1bC_gIB.js';
import { d as defineCustomElement$2 } from './p-0MDsLQPw.js';

const tkTabsCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}.tk-tabs{display:flex;}.tk-tabs .tab-headers{display:flex;flex-shrink:0;overflow-x:auto}.tk-tabs .tab-headers .tab-header{display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer}.tk-tabs .tab-headers .tab-header .tk-tabs-item-label-container{display:flex;align-items:center}.tk-tabs .tab-headers .tab-header .tk-tabs-item-label-container .tk-tabs-item-label{font-family:var(--desktop-body-s-font, Geologica);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:400;line-height:var(--desktop-body-s-line-height);}.tk-tabs .tab-headers .tab-header .tk-tabs-item-close-icon{font-size:16px;width:16px;height:16px}.tk-tabs .tab-headers::-webkit-scrollbar{display:none}.tk-tabs.tk-tabs-xxsmall.tk-tabs-basic .tab-header,.tk-tabs.tk-tabs-xxsmall.tk-tabs-divided .tab-header,.tk-tabs.tk-tabs-xxsmall.tk-tabs-compact .tab-header,.tk-tabs.tk-tabs-xxsmall.tk-tabs-expanded .tab-header{padding:var(--tabs-items-xxsmall-v-padding) var(--tabs-items-xxsmall-h-padding);gap:var(--tabs-items-xxsmall-tab-content-gap)}.tk-tabs.tk-tabs-xxsmall.tk-tabs-basic .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-xxsmall.tk-tabs-divided .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-xxsmall.tk-tabs-compact .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-xxsmall.tk-tabs-expanded .tab-header .tk-tabs-item-icon{font-size:var(--tabs-items-xxsmall-icon-size);width:var(--tabs-items-xxsmall-icon-size);height:var(--tabs-items-xxsmall-icon-size)}.tk-tabs.tk-tabs-xxsmall.tk-tabs-basic .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-xxsmall.tk-tabs-divided .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-xxsmall.tk-tabs-compact .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-xxsmall.tk-tabs-expanded .tab-header .tk-tabs-item-label-container{gap:var(--tabs-items-xxsmall-tab-label-gap)}.tk-tabs.tk-tabs-xxsmall.tk-tabs-basic .tab-header .tk-tabs-item-label-container .tk-tabs-item-label,.tk-tabs.tk-tabs-xxsmall.tk-tabs-divided .tab-header .tk-tabs-item-label-container .tk-tabs-item-label,.tk-tabs.tk-tabs-xxsmall.tk-tabs-compact .tab-header .tk-tabs-item-label-container .tk-tabs-item-label,.tk-tabs.tk-tabs-xxsmall.tk-tabs-expanded .tab-header .tk-tabs-item-label-container .tk-tabs-item-label{font-size:var(--desktop-body-2xs-size)}.tk-tabs.tk-tabs-xxsmall.tk-tabs-basic .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-xxsmall.tk-tabs-divided .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-xxsmall.tk-tabs-compact .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-xxsmall.tk-tabs-expanded .tab-header .tk-tabs-item-badge-container{line-height:var(--desktop-body-xs-line-height)}.tk-tabs.tk-tabs-xsmall.tk-tabs-basic .tab-header,.tk-tabs.tk-tabs-xsmall.tk-tabs-divided .tab-header,.tk-tabs.tk-tabs-xsmall.tk-tabs-compact .tab-header,.tk-tabs.tk-tabs-xsmall.tk-tabs-expanded .tab-header{padding:var(--tabs-items-xsmall-v-padding) var(--tabs-items-xsmall-h-padding);gap:var(--tabs-items-xsmall-tab-content-gap)}.tk-tabs.tk-tabs-xsmall.tk-tabs-basic .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-xsmall.tk-tabs-divided .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-xsmall.tk-tabs-compact .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-xsmall.tk-tabs-expanded .tab-header .tk-tabs-item-icon{font-size:var(--tabs-items-xsmall-icon-size);width:var(--tabs-items-xsmall-icon-size);height:var(--tabs-items-xsmall-icon-size)}.tk-tabs.tk-tabs-xsmall.tk-tabs-basic .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-xsmall.tk-tabs-divided .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-xsmall.tk-tabs-compact .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-xsmall.tk-tabs-expanded .tab-header .tk-tabs-item-label-container{gap:var(--tabs-items-xsmall-tab-label-gap)}.tk-tabs.tk-tabs-xsmall.tk-tabs-basic .tab-header .tk-tabs-item-label-container .tk-tabs-item-label,.tk-tabs.tk-tabs-xsmall.tk-tabs-divided .tab-header .tk-tabs-item-label-container .tk-tabs-item-label,.tk-tabs.tk-tabs-xsmall.tk-tabs-compact .tab-header .tk-tabs-item-label-container .tk-tabs-item-label,.tk-tabs.tk-tabs-xsmall.tk-tabs-expanded .tab-header .tk-tabs-item-label-container .tk-tabs-item-label{font-size:var(--desktop-body-xs-size)}.tk-tabs.tk-tabs-xsmall.tk-tabs-basic .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-xsmall.tk-tabs-divided .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-xsmall.tk-tabs-compact .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-xsmall.tk-tabs-expanded .tab-header .tk-tabs-item-badge-container{line-height:var(--desktop-body-2xs-line-height)}.tk-tabs.tk-tabs-small.tk-tabs-basic .tab-header,.tk-tabs.tk-tabs-small.tk-tabs-divided .tab-header,.tk-tabs.tk-tabs-small.tk-tabs-compact .tab-header,.tk-tabs.tk-tabs-small.tk-tabs-expanded .tab-header{padding:var(--tabs-items-small-v-padding) var(--tabs-items-small-h-padding);gap:var(--tabs-items-small-tab-content-gap)}.tk-tabs.tk-tabs-small.tk-tabs-basic .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-small.tk-tabs-divided .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-small.tk-tabs-compact .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-small.tk-tabs-expanded .tab-header .tk-tabs-item-icon{font-size:var(--tabs-items-small-icon-size);width:var(--tabs-items-small-icon-size);height:var(--tabs-items-small-icon-size)}.tk-tabs.tk-tabs-small.tk-tabs-basic .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-small.tk-tabs-divided .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-small.tk-tabs-compact .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-small.tk-tabs-expanded .tab-header .tk-tabs-item-label-container{gap:var(--tabs-items-small-tab-label-gap)}.tk-tabs.tk-tabs-small.tk-tabs-basic .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-small.tk-tabs-divided .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-small.tk-tabs-compact .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-small.tk-tabs-expanded .tab-header .tk-tabs-item-badge-container{line-height:var(--desktop-body-2xs-line-height)}.tk-tabs.tk-tabs-base.tk-tabs-basic .tab-header,.tk-tabs.tk-tabs-base.tk-tabs-divided .tab-header,.tk-tabs.tk-tabs-base.tk-tabs-compact .tab-header,.tk-tabs.tk-tabs-base.tk-tabs-expanded .tab-header{padding:var(--tabs-items-base-v-padding) var(--tabs-items-base-h-padding);gap:var(--tabs-items-base-tab-content-gap)}.tk-tabs.tk-tabs-base.tk-tabs-basic .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-base.tk-tabs-divided .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-base.tk-tabs-compact .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-base.tk-tabs-expanded .tab-header .tk-tabs-item-icon{font-size:var(--tabs-items-base-icon-size);width:var(--tabs-items-base-icon-size);height:var(--tabs-items-base-icon-size)}.tk-tabs.tk-tabs-base.tk-tabs-basic .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-base.tk-tabs-divided .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-base.tk-tabs-compact .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-base.tk-tabs-expanded .tab-header .tk-tabs-item-label-container{gap:var(--tabs-items-base-tab-label-gap)}.tk-tabs.tk-tabs-base.tk-tabs-basic .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-base.tk-tabs-divided .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-base.tk-tabs-compact .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-base.tk-tabs-expanded .tab-header .tk-tabs-item-badge-container{line-height:var(--desktop-body-xs-line-height)}.tk-tabs.tk-tabs-large.tk-tabs-basic .tab-header,.tk-tabs.tk-tabs-large.tk-tabs-divided .tab-header,.tk-tabs.tk-tabs-large.tk-tabs-compact .tab-header,.tk-tabs.tk-tabs-large.tk-tabs-expanded .tab-header{padding:var(--tabs-items-large-v-padding) var(--tabs-items-large-h-padding);gap:var(--tabs-items-large-tab-content-gap)}.tk-tabs.tk-tabs-large.tk-tabs-basic .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-large.tk-tabs-divided .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-large.tk-tabs-compact .tab-header .tk-tabs-item-icon,.tk-tabs.tk-tabs-large.tk-tabs-expanded .tab-header .tk-tabs-item-icon{font-size:var(--tabs-items-large-icon-size);width:var(--tabs-items-large-icon-size);height:var(--tabs-items-large-icon-size)}.tk-tabs.tk-tabs-large.tk-tabs-basic .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-large.tk-tabs-divided .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-large.tk-tabs-compact .tab-header .tk-tabs-item-label-container,.tk-tabs.tk-tabs-large.tk-tabs-expanded .tab-header .tk-tabs-item-label-container{gap:var(--tabs-items-large-tab-label-gap)}.tk-tabs.tk-tabs-large.tk-tabs-basic .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-large.tk-tabs-divided .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-large.tk-tabs-compact .tab-header .tk-tabs-item-badge-container,.tk-tabs.tk-tabs-large.tk-tabs-expanded .tab-header .tk-tabs-item-badge-container{line-height:var(--desktop-body-xs-line-height)}.tk-tabs.tk-tabs-horizontal{flex-direction:column;}.tk-tabs.tk-tabs-horizontal .tab-headers{flex-direction:row;align-items:center}.tk-tabs.tk-tabs-horizontal .tab-headers .tab-header .tk-tabs-item-close-icon{font-size:16px;width:16px;height:16px}.tk-tabs.tk-tabs-horizontal .tab-headers .tk-tabs-item-add-icon{font-size:18px;width:16px;height:16px}.tk-tabs.tk-tabs-horizontal .tab-headers.spread .tab-header{flex:1 0 auto}.tk-tabs.tk-tabs-horizontal .tab-content{flex-grow:1;padding:20px 0}.tk-tabs.tk-tabs-horizontal.tk-tabs-basic .tab-headers{gap:8px;border-bottom:1px solid var(--border-light)}.tk-tabs.tk-tabs-horizontal.tk-tabs-divided .tab-headers{gap:8px;border-bottom:1px solid var(--border-light)}.tk-tabs.tk-tabs-horizontal.tk-tabs-divided .tab-header{color:var(--text-base);border-radius:8px 8px 0px 0px;border-top:var(--spacing-px) solid var(--border-light);border-right:var(--spacing-px) solid var(--border-light);border-left:var(--spacing-px) solid var(--border-light);background:var(--background-lightest)}.tk-tabs.tk-tabs-horizontal.tk-tabs-divided .tab-header:hover{color:var(--text-darkest)}.tk-tabs.tk-tabs-horizontal.tk-tabs-divided .tab-header.active{border-top:var(--spacing-px) solid var(--border-light);border-right:var(--spacing-px) solid var(--border-light);border-left:var(--spacing-px) solid var(--border-light);background:var(--static-light);position:relative}.tk-tabs.tk-tabs-horizontal.tk-tabs-divided.tk-tabs-primary .tab-header.active{color:var(--primary-base)}.tk-tabs.tk-tabs-horizontal.tk-tabs-divided.tk-tabs-info .tab-header.active{color:var(--states-info-base)}.tk-tabs.tk-tabs-horizontal.tk-tabs-compact .tab-header{border:var(--spacing-px) solid var(--border-light);background:var(--static-light);color:var(--text-base);cursor:pointer}.tk-tabs.tk-tabs-horizontal.tk-tabs-compact .tab-header:first-of-type{border-radius:8px 0 0 8px;border-right:none}.tk-tabs.tk-tabs-horizontal.tk-tabs-compact .tab-header:last-of-type{border-radius:0 8px 8px 0;border-left:none}.tk-tabs.tk-tabs-horizontal.tk-tabs-compact .tab-header:only-of-type{border-radius:8px}.tk-tabs.tk-tabs-horizontal.tk-tabs-compact .tab-header:hover{color:var(--text-darkest);background:var(--background-lightest)}.tk-tabs.tk-tabs-horizontal.tk-tabs-compact .tab-header.active{background:var(--background-lightest)}.tk-tabs.tk-tabs-horizontal.tk-tabs-compact.tk-tabs-primary .tab-header.active{color:var(--primary-base)}.tk-tabs.tk-tabs-horizontal.tk-tabs-compact.tk-tabs-info .tab-header.active{color:var(--states-info-base)}.tk-tabs.tk-tabs-horizontal.tk-tabs-expanded{position:relative}.tk-tabs.tk-tabs-horizontal.tk-tabs-expanded .tab-headers{padding:0px 16px;gap:8px;border-radius:8px;border:1px solid var(--border-light)}.tk-tabs.tk-tabs-vertical{flex-direction:row;}.tk-tabs.tk-tabs-vertical .tab-headers{flex-direction:column}.tk-tabs.tk-tabs-vertical .tab-headers .tk-tabs-item-add-icon{font-size:18px;width:18px;height:18px;margin:0 auto}.tk-tabs.tk-tabs-vertical .tab-content{flex-grow:1;padding:0 20px}.tk-tabs.tk-tabs-vertical.tk-tabs-basic .tab-headers{border-right:1px solid var(--background-light)}.tk-tabs.tk-tabs-vertical.tk-tabs-divided .tab-headers{gap:8px;border-right:1px solid var(--background-light)}.tk-tabs.tk-tabs-vertical.tk-tabs-divided .tab-header{color:var(--text-base);border-radius:8px 0px 0px 8px;border-top:var(--spacing-px) solid var(--border-light);border-bottom:var(--spacing-px) solid var(--border-light);border-left:var(--spacing-px) solid var(--border-light);background:var(--background-lightest);right:-1px}.tk-tabs.tk-tabs-vertical.tk-tabs-divided .tab-header:hover{color:var(--text-darkest)}.tk-tabs.tk-tabs-vertical.tk-tabs-divided .tab-header.active{border-top:var(--spacing-px) solid var(--border-light);border-bottom:var(--spacing-px) solid var(--border-light);border-left:var(--spacing-px) solid var(--border-light);background:var(--static-light);position:relative}.tk-tabs.tk-tabs-vertical.tk-tabs-divided.tk-tabs-primary .tab-header.active{color:var(--primary-base)}.tk-tabs.tk-tabs-vertical.tk-tabs-divided.tk-tabs-info .tab-header.active{color:var(--states-info-base)}.tk-tabs.tk-tabs-vertical.tk-tabs-compact .tab-header{border:var(--spacing-px) solid var(--border-light);background:var(--static-light);color:var(--text-base)}.tk-tabs.tk-tabs-vertical.tk-tabs-compact .tab-header:first-of-type{border-radius:8px 8px 0 0;border-bottom:none}.tk-tabs.tk-tabs-vertical.tk-tabs-compact .tab-header:last-of-type{border-radius:0 0 8px 8px;border-top:none}.tk-tabs.tk-tabs-vertical.tk-tabs-compact .tab-header:only-of-type{border-radius:8px}.tk-tabs.tk-tabs-vertical.tk-tabs-compact .tab-header:hover{color:var(--text-darkest);background:var(--background-lightest)}.tk-tabs.tk-tabs-vertical.tk-tabs-compact .tab-header.active{background:var(--background-lightest)}.tk-tabs.tk-tabs-vertical.tk-tabs-compact.tk-tabs-primary .tab-header.active{color:var(--primary-base)}.tk-tabs.tk-tabs-vertical.tk-tabs-compact.tk-tabs-info .tab-header.active{color:var(--states-info-base)}.tk-tabs.tk-tabs-vertical.tk-tabs-expanded{position:relative}.tk-tabs.tk-tabs-vertical.tk-tabs-expanded .tab-headers{gap:8px;border-radius:8px;border:1px solid var(--border-light)}.tk-tabs.tk-tab-header-disabled{cursor:not-allowed;pointer-events:none}.tk-tabs .tab-panel{display:block}.tk-tabs .tab-panel.active{display:block}.tk-tabs.tk-tabs-basic .tab-header,.tk-tabs.tk-tabs-expanded .tab-header{color:var(--text-base);position:relative}.tk-tabs.tk-tabs-basic .tab-header:hover,.tk-tabs.tk-tabs-basic .tab-header.active,.tk-tabs.tk-tabs-expanded .tab-header:hover,.tk-tabs.tk-tabs-expanded .tab-header.active{color:var(--text-darkest)}.tk-tabs.tk-tabs-basic.tk-tabs-primary .tab-header.active:after,.tk-tabs.tk-tabs-expanded.tk-tabs-primary .tab-header.active:after{background:var(--primary-base)}.tk-tabs.tk-tabs-basic.tk-tabs-info .tab-header.active:after,.tk-tabs.tk-tabs-expanded.tk-tabs-info .tab-header.active:after{background:var(--states-info-base)}.tk-tabs.tk-tabs-horizontal.tk-tabs-basic .tab-header.active:after,.tk-tabs.tk-tabs-horizontal.tk-tabs-expanded .tab-header.active:after{content:"";position:absolute;height:2px;border-radius:var(--radius-full) var(--radius-full) 0px 0px;top:calc(100% - 2px);left:50%;transform:translateX(-50%)}.tk-tabs.tk-tabs-horizontal.tk-tabs-xxsmall.tk-tabs-basic .tab-header.active:after,.tk-tabs.tk-tabs-horizontal.tk-tabs-xxsmall.tk-tabs-expanded .tab-header.active:after{width:calc(100% - 16px)}.tk-tabs.tk-tabs-horizontal.tk-tabs-xsmall.tk-tabs-basic .tab-header.active:after,.tk-tabs.tk-tabs-horizontal.tk-tabs-xsmall.tk-tabs-expanded .tab-header.active:after{width:calc(100% - 20px)}.tk-tabs.tk-tabs-horizontal.tk-tabs-small.tk-tabs-basic .tab-header.active:after,.tk-tabs.tk-tabs-horizontal.tk-tabs-small.tk-tabs-expanded .tab-header.active:after{width:calc(100% - 24px)}.tk-tabs.tk-tabs-horizontal.tk-tabs-base.tk-tabs-basic .tab-header.active:after,.tk-tabs.tk-tabs-horizontal.tk-tabs-base.tk-tabs-expanded .tab-header.active:after{width:calc(100% - 28px)}.tk-tabs.tk-tabs-horizontal.tk-tabs-large.tk-tabs-basic .tab-header.active:after,.tk-tabs.tk-tabs-horizontal.tk-tabs-large.tk-tabs-expanded .tab-header.active:after{width:calc(100% - 32px)}.tk-tabs.tk-tabs-vertical.tk-tabs-basic .tab-header.active:after,.tk-tabs.tk-tabs-vertical.tk-tabs-expanded .tab-header.active:after{content:"";position:absolute;width:2px;border-radius:var(--radius-full) 0px 0px var(--radius-full);left:calc(100% - 2px);top:50%;transform:translateY(-50%)}.tk-tabs.tk-tabs-vertical.tk-tabs-xxsmall.tk-tabs-basic .tab-header.active:after,.tk-tabs.tk-tabs-vertical.tk-tabs-xxsmall.tk-tabs-expanded .tab-header.active:after{height:calc(100% - 4px)}.tk-tabs.tk-tabs-vertical.tk-tabs-xsmall.tk-tabs-basic .tab-header.active:after,.tk-tabs.tk-tabs-vertical.tk-tabs-xsmall.tk-tabs-expanded .tab-header.active:after{height:calc(100% - 8px)}.tk-tabs.tk-tabs-vertical.tk-tabs-small.tk-tabs-basic .tab-header.active:after,.tk-tabs.tk-tabs-vertical.tk-tabs-small.tk-tabs-expanded .tab-header.active:after{height:calc(100% - 12px)}.tk-tabs.tk-tabs-vertical.tk-tabs-base.tk-tabs-basic .tab-header.active:after,.tk-tabs.tk-tabs-vertical.tk-tabs-base.tk-tabs-expanded .tab-header.active:after{height:calc(100% - 20px)}.tk-tabs.tk-tabs-vertical.tk-tabs-large.tk-tabs-basic .tab-header.active:after,.tk-tabs.tk-tabs-vertical.tk-tabs-large.tk-tabs-expanded .tab-header.active:after{height:calc(100% - 28px)}';

const TkTabs$1 = /*@__PURE__*/ proxyCustomElement(
  class TkTabs extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkTabClick = createEvent(this, 'tk-tab-click', 7);
      this.tkTabChange = createEvent(this, 'tk-tab-change', 7);
      this.internalActiveIndex = 0;
      this.internalTabItems = [];
      /**
       * Sets the alignment of the header.
       */
      this.alignHeaders = 'start';
      /**
       * Controls if the tabs component is controlled.
       * @defaultValue false
       */
      this.controlled = false;
      /**
       * Default Active Index for tabs component.
       * @defaultValue 0
       */
      this.defaultActiveIndex = 0;
      /**
       * Controls the currently active tab index.
       * Can be controlled programmatically from outside.
       * @defaultValue 0
       */
      this.activeIndex = 0;
      /**
       * Controls if tabs are closable.
       * @defaultValue false
       */
      this.isClosable = false;
      /**
       * Controls if new tabs can be added or not.
       * @defaultValue false
       */
      this.isExtendable = false;
      /**
       * Controls the orientation of the tabs component.
       * @defaultValue 'horizontal'
       */
      this.orientation = 'horizontal';
      /**
       * Determines whether the tab headers will spread evenly across the horizontal space.
       * @defaultValue false
       */
      this.spreadHeaders = false;
      /**
       * Controls the size of the tabs component.
       * @defaultValue 'base'
       */
      this.size = 'base';
      /**
       * Controls the tab style of the tabs component.
       * @defaultValue 'basic'
       */
      this.type = 'basic';
      /**
       * Controls the color variant of the tabs component.
       * @defaultValue 'primary'
       */
      this.variant = 'primary';
      /**
       * The style attribute of container element
       */
      this.containerStyle = null;
      /**
       * The style attribute of headers container element
       */
      this.headerContainerStyle = null;
      /**
       * The style attribute of tabs item element
       */
      this.contentStyle = null;
    }
    activeIndexChanged(newValue) {
      if (newValue !== undefined && newValue !== this.internalActiveIndex) {
        if (newValue >= 0 && newValue < this.internalTabItems.length) {
          this.internalActiveIndex = newValue;
          this.activeIndex = newValue;
          this.tkTabChange.emit(this.internalActiveIndex);
        } else {
          this.activeIndex = this.internalActiveIndex;
          console.warn('Invalid tab index provided');
        }
      }
    }
    componentWillLoad() {
      var _a;
      this.internalTabItems = Array.from(this.el.querySelectorAll(':scope > tk-tabs-item'));
      // slot ismini kullanıcının vermesine gerek kalmadan içeride setlenmesi sağlandı
      this.internalTabItems.forEach((tab, index) => {
        tab.setAttribute('slot', `tab-content-${index}`);
      });
      this.internalActiveIndex = (_a = this.activeIndex) !== null && _a !== void 0 ? _a : this.defaultActiveIndex;
      this.el.addEventListener('tk-update', this.handleTabUpdate.bind(this));
    }
    disconnectedCallback() {
      this.el.removeEventListener('tk-update', this.handleTabUpdate.bind(this));
    }
    selectTab(index) {
      if (index >= 0 && index < this.internalTabItems.length && !this.internalTabItems[index].disabled) {
        this.internalActiveIndex = index;
        this.activeIndex = index;
        this.tkTabChange.emit(this.internalActiveIndex);
      }
    }
    closeTab(index) {
      this.internalTabItems.splice(index, 1);
      if (this.internalActiveIndex >= index) {
        const newIndex = Math.max(0, this.internalActiveIndex - 1);
        this.selectTab(newIndex);
      }
      this.internalTabItems = [...this.internalTabItems];
    }
    addTab() {
      const newTabItem = document.createElement('tk-tabs-item');
      const newTabIndex = this.internalTabItems.length;
      newTabItem.setAttribute('label', `Tab label`);
      newTabItem.setAttribute('is-closable', 'true');
      const contentDiv = document.createElement('div');
      newTabItem.slot = `tab-content-${newTabIndex}`;
      contentDiv.innerHTML = `TK TAB CONTENT ${newTabIndex + 1}`;
      newTabItem.appendChild(contentDiv);
      this.el.appendChild(newTabItem);
      this.internalTabItems = [...this.internalTabItems, newTabItem];
      this.internalActiveIndex = newTabIndex;
      this.activeIndex = newTabIndex;
      this.tkTabChange.emit(this.internalActiveIndex);
    }
    /**
     * Handles badge update events from tab items
     */
    handleTabUpdate(event) {
      const tab = event.composedPath().find(el => el instanceof H && el.tagName.toLowerCase() === 'tk-tabs-item');
      if (tab) {
        const index = Array.from(this.el.querySelectorAll(':scope > tk-tabs-item')).indexOf(tab);
        if (index !== -1 && this.internalTabItems[index]) {
          this.internalTabItems[index].label = event.detail.label;
          this.internalTabItems[index].icon = event.detail.icon;
          this.internalTabItems[index].disabled = event.detail.disabled;
          this.internalTabItems[index].badged = event.detail.badged;
          this.internalTabItems[index].badgeCount = event.detail.badgeCount;
          this.internalTabItems[index].badgeLabel = event.detail.badgeLabel;
          this.internalTabItems[index].tooltipOptions = event.detail.tooltipOptions;
          this.internalTabItems = [...this.internalTabItems];
        }
      }
    }
    handleTabClick(index) {
      if (!this.controlled) {
        this.selectTab(index);
      } else {
        this.tkTabClick.emit(index);
      }
    }
    renderTabItemIcon(tab) {
      if (tab.icon && typeof tab.icon === 'string') {
        return h('span', { class: 'material-symbols-outlined tk-tabs-item-icon' }, tab.icon);
      } else if (tab.icon && typeof tab.icon === 'object') {
        const icon = tab.icon;
        return h('tk-icon', Object.assign({}, getIconElementProps(icon, { class: classNames('tk-tabs-item-icon') })));
      }
    }
    renderTabBadge(tab, index) {
      if (tab.badged) {
        const badgeCount = tab.badgeCount !== undefined ? tab.badgeCount : tab.badgeLabel;
        return h(
          'div',
          { class: 'tk-tabs-item-badge-container' },
          h('tk-badge', { count: badgeCount, variant: this.internalActiveIndex === index ? this.variant : 'neutral', type: 'filledlight', rounded: true, size: 'small' }),
        );
      }
      return null;
    }
    renderTabTooltip(tab) {
      if (tab === null || tab === void 0 ? void 0 : tab.tooltipOptions) {
        if (tab.tooltipOptions.icon) {
          return h(
            'tk-tooltip',
            {
              header: tab.tooltipOptions.header,
              description: tab.tooltipOptions.description,
              position: tab.tooltipOptions.position || 'bottom',
              variant: tab.tooltipOptions.variant || 'dark',
            },
            h(
              'tk-icon',
              Object.assign({ slot: 'trigger' }, typeof tab.tooltipOptions.icon === 'string' ? { icon: tab.tooltipOptions.icon } : getIconElementProps(tab.tooltipOptions.icon), {
                size: this.size === 'xxsmall' ? 'xsmall' : this.size,
              }),
            ),
          );
        }
        return null;
      }
    }
    render() {
      const rootClasses = classNames('tk-tabs', [`tk-tabs-${this.orientation}`], [`tk-tabs-${this.size}`], [`tk-tabs-${this.type}`], [`tk-tabs-${this.variant}`]);
      const headersClasses = classNames('tab-headers', { spread: this.spreadHeaders });
      const rootProps = {
        class: rootClasses,
        style: this.containerStyle,
      };
      const headersProps = {
        class: headersClasses,
        style: Object.assign({ justifyContent: this.alignHeaders }, this.headerContainerStyle && Object.assign({}, this.headerContainerStyle)),
      };
      const contentProps = {
        class: 'tab-content',
        style: this.contentStyle,
      };
      return h(
        'div',
        Object.assign({ key: 'ccd5ecf06fb168cc81d753b2f836e6c1a141f686' }, rootProps),
        h(
          'div',
          Object.assign({ key: '06ae6f1af32c3a01162d93c4a008989e7c33c0c3' }, headersProps),
          this.internalTabItems.map((tab, index) => {
            const headerClasses = classNames('tab-header', { 'active': this.internalActiveIndex === index, 'tk-tab-header-disabled': tab.disabled });
            return h(
              'div',
              { class: headerClasses, onClick: () => this.handleTabClick(index) },
              this.renderTabItemIcon(tab),
              h(
                'div',
                { class: 'tk-tabs-item-label-container' },
                h('span', { class: 'tk-tabs-item-label' }, tab.label),
                this.renderTabBadge(tab, index),
                this.renderTabTooltip(tab),
              ),
              this.isClosable &&
                h(
                  'span',
                  {
                    class: 'material-symbols-outlined tk-tabs-item-close-icon',
                    onClick: e => {
                      e.stopPropagation();
                      this.closeTab(index);
                    },
                  },
                  'close',
                ),
            );
          }),
          this.isExtendable &&
            h(
              'tk-icon',
              Object.assign(
                { key: 'da3664dd1d6f10ec7190887f2616c19eb36a5076' },
                getIconElementProps('add', { class: classNames('tk-tabs-item-add-icon'), onclick: () => this.addTab() }),
              ),
            ),
        ),
        h(
          'div',
          Object.assign({ key: 'fac4c84d386723ead120e401032e2d84862cd0f1' }, contentProps),
          this.internalTabItems.map((_tab, index) =>
            h(
              'div',
              { class: `tab-panel ${this.internalActiveIndex === index ? 'active' : 'hidden'}`, key: index },
              this.internalActiveIndex === index && h('div', null, h('slot', { name: `tab-content-${index}` })),
            ),
          ),
        ),
      );
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        activeIndex: ['activeIndexChanged'],
      };
    }
    static get style() {
      return tkTabsCss;
    }
  },
  [
    1,
    'tk-tabs',
    {
      alignHeaders: [1, 'align-headers'],
      controlled: [4],
      defaultActiveIndex: [2, 'default-active-index'],
      activeIndex: [1538, 'active-index'],
      isClosable: [4, 'is-closable'],
      isExtendable: [4, 'is-extendable'],
      orientation: [1],
      spreadHeaders: [4, 'spread-headers'],
      size: [1],
      type: [1],
      variant: [1],
      containerStyle: [8, 'container-style'],
      headerContainerStyle: [8, 'header-container-style'],
      contentStyle: [8, 'content-style'],
      internalActiveIndex: [32],
      internalTabItems: [32],
    },
    undefined,
    {
      activeIndex: ['activeIndexChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-tabs', 'tk-badge', 'tk-icon', 'tk-tabs-item', 'tk-tooltip'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-tabs':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkTabs$1);
        }
        break;
      case 'tk-badge':
        if (!customElements.get(tagName)) {
          defineCustomElement$5();
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$4();
        }
        break;
      case 'tk-tabs-item':
        if (!customElements.get(tagName)) {
          defineCustomElement$3();
        }
        break;
      case 'tk-tooltip':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
    }
  });
}

const TkTabs = TkTabs$1;
const defineCustomElement = defineCustomElement$1;

export { TkTabs, defineCustomElement };
//# sourceMappingURL=tk-tabs.js.map

//# sourceMappingURL=tk-tabs.js.map
