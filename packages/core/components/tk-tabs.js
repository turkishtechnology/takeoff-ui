import { p as proxyCustomElement, H, c as createEvent, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$5 } from './p-DsC7NjXG.js';
import { d as defineCustomElement$4 } from './p-DrRHtkyE.js';
import { d as defineCustomElement$3 } from './p-DKPNfP1l.js';
import { d as defineCustomElement$2 } from './p-D6SW83yT.js';

const tkTabsScss =
  ":host {\n  display: block;\n}\n\n.tk-tabs {\n  display: flex;\n\n  .tab-headers {\n    display: flex;\n    flex-shrink: 0;\n    overflow-x: auto;\n    .tab-header {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-shrink: 0;\n      cursor: pointer;\n\n      .tk-tabs-item-label-container {\n        display: flex;\n        align-items: center;\n\n        .tk-tabs-item-label {\n          font-family: var(--desktop-body-s-font, Geologica);\n          font-size: var(--desktop-body-s-size);\n          font-style: normal;\n          font-weight: 400;\n          line-height: var(--desktop-body-s-line-height);\n          /* 142.857% */\n        }\n      }\n\n      .tk-tabs-item-close-icon {\n        font-size: 16px;\n        width: 16px;\n        height: 16px;\n      }\n    }\n\n    &::-webkit-scrollbar {\n      display: none;\n    }\n  }\n\n  /* XX SMALL */\n  &.tk-tabs-xxsmall {\n    &.tk-tabs-basic,\n    &.tk-tabs-divided,\n    &.tk-tabs-compact,\n    &.tk-tabs-expanded {\n      .tab-header {\n        padding: var(--tabs-items-xxsmall-v-padding) var(--tabs-items-xxsmall-h-padding);\n        gap: var(--tabs-items-xxsmall-tab-content-gap);\n\n        .tk-tabs-item-icon {\n          font-size: var(--tabs-items-xxsmall-icon-size);\n          width: var(--tabs-items-xxsmall-icon-size);\n          height: var(--tabs-items-xxsmall-icon-size);\n        }\n\n        .tk-tabs-item-label-container {\n          gap: var(--tabs-items-xxsmall-tab-label-gap);\n          .tk-tabs-item-label {\n            font-size: var(--desktop-body-2xs-size);\n          }\n        }\n\n        .tk-tabs-item-badge-container {\n          line-height: var(--desktop-body-xs-line-height);\n        }\n      }\n    }\n  }\n\n  /* X SMALL */\n  &.tk-tabs-xsmall {\n    &.tk-tabs-basic,\n    &.tk-tabs-divided,\n    &.tk-tabs-compact,\n    &.tk-tabs-expanded {\n      .tab-header {\n        padding: var(--tabs-items-xsmall-v-padding) var(--tabs-items-xsmall-h-padding);\n        gap: var(--tabs-items-xsmall-tab-content-gap);\n\n        .tk-tabs-item-icon {\n          font-size: var(--tabs-items-xsmall-icon-size);\n          width: var(--tabs-items-xsmall-icon-size);\n          height: var(--tabs-items-xsmall-icon-size);\n        }\n\n        .tk-tabs-item-label-container {\n          gap: var(--tabs-items-xsmall-tab-label-gap);\n          .tk-tabs-item-label {\n            font-size: var(--desktop-body-xs-size);\n          }\n        }\n\n        .tk-tabs-item-badge-container {\n          line-height: var(--desktop-body-2xs-line-height);\n        }\n      }\n    }\n  }\n\n  /* SMALL */\n  &.tk-tabs-small {\n    &.tk-tabs-basic,\n    &.tk-tabs-divided,\n    &.tk-tabs-compact,\n    &.tk-tabs-expanded {\n      .tab-header {\n        padding: var(--tabs-items-small-v-padding) var(--tabs-items-small-h-padding);\n        gap: var(--tabs-items-small-tab-content-gap);\n\n        .tk-tabs-item-icon {\n          font-size: var(--tabs-items-small-icon-size);\n          width: var(--tabs-items-small-icon-size);\n          height: var(--tabs-items-small-icon-size);\n        }\n\n        .tk-tabs-item-label-container {\n          gap: var(--tabs-items-small-tab-label-gap);\n        }\n\n        .tk-tabs-item-badge-container {\n          line-height: var(--desktop-body-2xs-line-height);\n        }\n      }\n    }\n  }\n\n  /* BASE */\n  &.tk-tabs-base {\n    &.tk-tabs-basic,\n    &.tk-tabs-divided,\n    &.tk-tabs-compact,\n    &.tk-tabs-expanded {\n      .tab-header {\n        padding: var(--tabs-items-base-v-padding) var(--tabs-items-base-h-padding);\n        gap: var(--tabs-items-base-tab-content-gap);\n\n        .tk-tabs-item-icon {\n          font-size: var(--tabs-items-base-icon-size);\n          width: var(--tabs-items-base-icon-size);\n          height: var(--tabs-items-base-icon-size);\n        }\n\n        .tk-tabs-item-label-container {\n          gap: var(--tabs-items-base-tab-label-gap);\n        }\n\n        .tk-tabs-item-badge-container {\n          line-height: var(--desktop-body-xs-line-height);\n        }\n      }\n    }\n  }\n\n  /* LARGE */\n  &.tk-tabs-large {\n    &.tk-tabs-basic,\n    &.tk-tabs-divided,\n    &.tk-tabs-compact,\n    &.tk-tabs-expanded {\n      .tab-header {\n        padding: var(--tabs-items-large-v-padding) var(--tabs-items-large-h-padding);\n        gap: var(--tabs-items-large-tab-content-gap);\n\n        .tk-tabs-item-icon {\n          font-size: var(--tabs-items-large-icon-size);\n          width: var(--tabs-items-large-icon-size);\n          height: var(--tabs-items-large-icon-size);\n        }\n\n        .tk-tabs-item-label-container {\n          gap: var(--tabs-items-large-tab-label-gap);\n        }\n\n        .tk-tabs-item-badge-container {\n          line-height: var(--desktop-body-xs-line-height);\n        }\n      }\n    }\n  }\n\n  &.tk-tabs-horizontal {\n    flex-direction: column;\n\n    .tab-headers {\n      flex-direction: row;\n      align-items: center;\n\n      .tab-header {\n        .tk-tabs-item-close-icon {\n          font-size: 16px;\n          width: 16px;\n          height: 16px;\n        }\n      }\n\n      .tk-tabs-item-add-icon {\n        font-size: 18px;\n        width: 16px;\n        height: 16px;\n      }\n\n      &.spread .tab-header {\n        flex: 1 0 auto;\n      }\n    }\n\n    .tab-content {\n      flex-grow: 1;\n      padding: 20px 0;\n    }\n\n    /* TAB STYLE: BASIC */\n    &.tk-tabs-basic {\n      .tab-headers {\n        gap: 8px;\n        border-bottom: 1px solid var(--border-light);\n      }\n    }\n\n    /* TAB STYLE: DIVIDED */\n    &.tk-tabs-divided {\n      .tab-headers {\n        gap: 8px;\n        border-bottom: 1px solid var(--border-light);\n      }\n\n      .tab-header {\n        color: var(--text-base);\n        border-radius: 8px 8px 0px 0px;\n        border-top: var(--spacing-px) solid var(--border-light);\n        border-right: var(--spacing-px) solid var(--border-light);\n        border-left: var(--spacing-px) solid var(--border-light);\n        background: var(--background-lightest);\n\n        &:hover {\n          color: var(--text-darkest);\n        }\n\n        &.active {\n          border-top: var(--spacing-px) solid var(--border-light);\n          border-right: var(--spacing-px) solid var(--border-light);\n          border-left: var(--spacing-px) solid var(--border-light);\n          background: var(--static-light);\n          position: relative;\n        }\n      }\n\n      &.tk-tabs-primary {\n        .tab-header {\n          &.active {\n            color: var(--primary-base);\n          }\n        }\n      }\n\n      &.tk-tabs-info {\n        .tab-header {\n          &.active {\n            color: var(--states-info-base);\n          }\n        }\n      }\n    }\n\n    /* TAB STYLE: COMPACT */\n    &.tk-tabs-compact {\n      .tab-header {\n        border: var(--spacing-px) solid var(--border-light);\n        background: var(--static-light);\n        color: var(--text-base);\n        cursor: pointer;\n\n        &:first-of-type {\n          border-radius: 8px 0 0 8px;\n          border-right: none;\n        }\n\n        &:last-of-type {\n          border-radius: 0 8px 8px 0;\n          border-left: none;\n        }\n\n        &:only-of-type {\n          border-radius: 8px;\n        }\n\n        &:hover {\n          color: var(--text-darkest);\n          background: var(--background-lightest);\n        }\n\n        &.active {\n          background: var(--background-lightest);\n        }\n      }\n\n      &.tk-tabs-primary {\n        .tab-header {\n          &.active {\n            color: var(--primary-base);\n          }\n        }\n      }\n\n      &.tk-tabs-info {\n        .tab-header {\n          &.active {\n            color: var(--states-info-base);\n          }\n        }\n      }\n    }\n\n    /* TAB STYLE: EXPANDED */\n    &.tk-tabs-expanded {\n      position: relative;\n\n      .tab-headers {\n        padding: 0px 16px;\n        gap: 8px;\n        border-radius: 8px;\n        border: 1px solid var(--border-light);\n      }\n    }\n  }\n\n  &.tk-tabs-vertical {\n    flex-direction: row;\n\n    .tab-headers {\n      flex-direction: column;\n\n      .tk-tabs-item-add-icon {\n        font-size: 18px;\n        width: 18px;\n        height: 18px;\n        margin: 0 auto;\n      }\n    }\n\n    .tab-content {\n      flex-grow: 1;\n      padding: 0 20px;\n    }\n\n    /* TAB STYLE: BASIC */\n    &.tk-tabs-basic {\n      .tab-headers {\n        border-right: 1px solid var(--background-light);\n      }\n    }\n\n    /* TAB STYLE: DIVIDED */\n    &.tk-tabs-divided {\n      .tab-headers {\n        gap: 8px;\n        border-right: 1px solid var(--background-light);\n      }\n\n      .tab-header {\n        color: var(--text-base);\n        border-radius: 8px 0px 0px 8px;\n        border-top: var(--spacing-px) solid var(--border-light);\n        border-bottom: var(--spacing-px) solid var(--border-light);\n        border-left: var(--spacing-px) solid var(--border-light);\n        background: var(--background-lightest);\n        right: -1px;\n\n        &:hover {\n          color: var(--text-darkest);\n        }\n\n        &.active {\n          border-top: var(--spacing-px) solid var(--border-light);\n          border-bottom: var(--spacing-px) solid var(--border-light);\n          border-left: var(--spacing-px) solid var(--border-light);\n          background: var(--static-light);\n          position: relative;\n        }\n      }\n\n      &.tk-tabs-primary {\n        .tab-header {\n          &.active {\n            color: var(--primary-base);\n          }\n        }\n      }\n\n      &.tk-tabs-info {\n        .tab-header {\n          &.active {\n            color: var(--states-info-base);\n          }\n        }\n      }\n    }\n\n    /* TAB STYLE: COMPACT */\n    &.tk-tabs-compact {\n      .tab-header {\n        border: var(--spacing-px) solid var(--border-light);\n        background: var(--static-light);\n        color: var(--text-base);\n\n        &:first-of-type {\n          border-radius: 8px 8px 0 0;\n          border-bottom: none;\n        }\n\n        &:last-of-type {\n          border-radius: 0 0 8px 8px;\n          border-top: none;\n        }\n\n        &:only-of-type {\n          border-radius: 8px;\n        }\n\n        &:hover {\n          color: var(--text-darkest);\n          background: var(--background-lightest);\n        }\n\n        &.active {\n          background: var(--background-lightest);\n        }\n      }\n\n      &.tk-tabs-primary {\n        .tab-header {\n          &.active {\n            color: var(--primary-base);\n          }\n        }\n      }\n\n      &.tk-tabs-info {\n        .tab-header {\n          &.active {\n            color: var(--states-info-base);\n          }\n        }\n      }\n    }\n\n    /* TAB STYLE: EXPANDED */\n    &.tk-tabs-expanded {\n      position: relative;\n\n      .tab-headers {\n        gap: 8px;\n        border-radius: 8px;\n        border: 1px solid var(--border-light);\n      }\n    }\n  }\n\n  &.tk-tab-header-disabled {\n    cursor: not-allowed;\n    pointer-events: none;\n  }\n\n  .tab-panel {\n    display: block;\n\n    &.active {\n      display: block;\n    }\n  }\n\n  &.tk-tabs-basic,\n  &.tk-tabs-expanded {\n    .tab-header {\n      color: var(--text-base);\n      position: relative;\n\n      &:hover,\n      &.active {\n        color: var(--text-darkest);\n      }\n    }\n\n    &.tk-tabs-primary {\n      .tab-header {\n        &.active {\n          &:after {\n            background: var(--primary-base);\n          }\n        }\n      }\n    }\n\n    &.tk-tabs-info {\n      .tab-header {\n        &.active {\n          &:after {\n            background: var(--states-info-base);\n          }\n        }\n      }\n    }\n  }\n\n  &.tk-tabs-horizontal {\n    &.tk-tabs-basic,\n    &.tk-tabs-expanded {\n      .tab-header {\n        &.active {\n          &:after {\n            content: '';\n            position: absolute;\n            height: 2px;\n            border-radius: var(--radius-full) var(--radius-full) 0px 0px;\n            top: calc(100% - 2px);\n            left: 50%;\n            transform: translateX(-50%);\n          }\n        }\n      }\n    }\n\n    &.tk-tabs-xxsmall {\n      &.tk-tabs-basic,\n      &.tk-tabs-expanded {\n        .tab-header {\n          &.active {\n            &:after {\n              width: calc(100% - 16px);\n            }\n          }\n        }\n      }\n    }\n\n    &.tk-tabs-xsmall {\n      &.tk-tabs-basic,\n      &.tk-tabs-expanded {\n        .tab-header {\n          &.active {\n            &:after {\n              width: calc(100% - 20px);\n            }\n          }\n        }\n      }\n    }\n\n    &.tk-tabs-small {\n      &.tk-tabs-basic,\n      &.tk-tabs-expanded {\n        .tab-header {\n          &.active {\n            &:after {\n              width: calc(100% - 24px);\n            }\n          }\n        }\n      }\n    }\n\n    &.tk-tabs-base {\n      &.tk-tabs-basic,\n      &.tk-tabs-expanded {\n        .tab-header {\n          &.active {\n            &:after {\n              width: calc(100% - 28px);\n            }\n          }\n        }\n      }\n    }\n\n    &.tk-tabs-large {\n      &.tk-tabs-basic,\n      &.tk-tabs-expanded {\n        .tab-header {\n          &.active {\n            &:after {\n              width: calc(100% - 32px);\n            }\n          }\n        }\n      }\n    }\n  }\n\n  &.tk-tabs-vertical {\n    &.tk-tabs-basic,\n    &.tk-tabs-expanded {\n      .tab-header {\n        &.active {\n          &:after {\n            content: '';\n            position: absolute;\n            width: 2px;\n            border-radius: var(--radius-full) 0px 0px var(--radius-full);\n            left: calc(100% - 2px);\n            top: 50%;\n            transform: translateY(-50%);\n          }\n        }\n      }\n    }\n\n    &.tk-tabs-xxsmall {\n      &.tk-tabs-basic,\n      &.tk-tabs-expanded {\n        .tab-header {\n          &.active {\n            &:after {\n              height: calc(100% - 4px);\n            }\n          }\n        }\n      }\n    }\n\n    &.tk-tabs-xsmall {\n      &.tk-tabs-basic,\n      &.tk-tabs-expanded {\n        .tab-header {\n          &.active {\n            &:after {\n              height: calc(100% - 8px);\n            }\n          }\n        }\n      }\n    }\n\n    &.tk-tabs-small {\n      &.tk-tabs-basic,\n      &.tk-tabs-expanded {\n        .tab-header {\n          &.active {\n            &:after {\n              height: calc(100% - 12px);\n            }\n          }\n        }\n      }\n    }\n\n    &.tk-tabs-base {\n      &.tk-tabs-basic,\n      &.tk-tabs-expanded {\n        .tab-header {\n          &.active {\n            &:after {\n              height: calc(100% - 20px);\n            }\n          }\n        }\n      }\n    }\n\n    &.tk-tabs-large {\n      &.tk-tabs-basic,\n      &.tk-tabs-expanded {\n        .tab-header {\n          &.active {\n            &:after {\n              height: calc(100% - 28px);\n            }\n          }\n        }\n      }\n    }\n  }\n}\n";

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
      return tkTabsScss;
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
