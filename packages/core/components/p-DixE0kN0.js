import { p as proxyCustomElement, H, h, d as Host } from './p-F5eU3Bfi.js';

const tkTabsItemCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}';

const TkTabsItem = /*@__PURE__*/ proxyCustomElement(
  class TkTabsItem extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      /**
       * Checks if tab item has badge component or not.
       * @defaultValue false
       */
      this.badged = false;
    }
    iconChanged() {
      this.emitUpdate();
    }
    labelChanged() {
      this.emitUpdate();
    }
    disabledChanged() {
      this.emitUpdate();
    }
    badgedChanged() {
      this.emitUpdate();
    }
    badgeLabelChanged() {
      this.emitUpdate();
    }
    badgeCountChanged() {
      this.emitUpdate();
    }
    tooltipOptionsChanged() {
      this.emitUpdate();
    }
    // Dispatch a custom event that the parent component can listen for
    emitUpdate() {
      this.el.dispatchEvent(
        new CustomEvent('tk-update', {
          bubbles: true,
          composed: true,
          detail: {
            label: this.label,
            icon: this.icon,
            disabled: this.disabled,
            badged: this.badged,
            badgeCount: this.badgeCount,
            badgeLabel: this.badgeLabel,
            tooltipOptions: this.tooltipOptions,
          },
        }),
      );
    }
    render() {
      return h(Host, { key: 'bb4e3e40a65236b3b74c1e65bbec0878407caf8b' }, h('slot', { key: 'd70d5ceeb5307b060cbac4c01b0b8561948e11a8' }));
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        icon: ['iconChanged'],
        label: ['labelChanged'],
        disabled: ['disabledChanged'],
        badged: ['badgedChanged'],
        badgeLabel: ['badgeLabelChanged'],
        badgeCount: ['badgeCountChanged'],
        tooltipOptions: ['tooltipOptionsChanged'],
      };
    }
    static get style() {
      return tkTabsItemCss;
    }
  },
  [
    1,
    'tk-tabs-item',
    {
      icon: [1],
      label: [1],
      disabled: [4],
      badged: [4],
      badgeLabel: [1, 'badge-label'],
      badgeCount: [8, 'badge-count'],
      tooltipOptions: [16, 'tooltip-options'],
    },
    undefined,
    {
      icon: ['iconChanged'],
      label: ['labelChanged'],
      disabled: ['disabledChanged'],
      badged: ['badgedChanged'],
      badgeLabel: ['badgeLabelChanged'],
      badgeCount: ['badgeCountChanged'],
      tooltipOptions: ['tooltipOptionsChanged'],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-tabs-item'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-tabs-item':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkTabsItem);
        }
        break;
    }
  });
}

export { TkTabsItem as T, defineCustomElement as d };
//# sourceMappingURL=p-DixE0kN0.js.map

//# sourceMappingURL=p-DixE0kN0.js.map
