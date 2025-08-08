import { p as proxyCustomElement, H, h, d as Host } from './p-B4rZamdt.js';

const tkTabsItemScss = ':host{display:block}';

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
      return tkTabsItemScss;
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
//# sourceMappingURL=p-DKPNfP1l.js.map

//# sourceMappingURL=p-DKPNfP1l.js.map
