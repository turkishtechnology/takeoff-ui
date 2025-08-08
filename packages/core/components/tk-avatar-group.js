import { p as proxyCustomElement, H, h } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkAvatarGroupCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}.tk-avatar-group{display:inline-flex;align-items:center;width:max-content;overflow:hidden}.tk-avatar-group.tk-avatar-group-compact{border-radius:var(--radius-full);border:1px solid var(--border-light, #e1e4ea);background:var(--static-light, #fff);padding:4px}.tk-avatar-group.tk-avatar-group-compact>tk-avatar:last-child .tk-avatar-container{margin-left:0}.tk-avatar-group.tk-avatar-group-compact>tk-avatar:last-child .tk-avatar-container .tk-avatar{background:transparent;border:1px solid transparent;box-shadow:none;user-select:none}.tk-avatar-group.tk-avatar-group-compact>tk-avatar:last-child .tk-avatar-container .tk-avatar .tk-avatar-label{color:var(--text-darkest, #222530)}.tk-avatar-group>tk-avatar:not(:last-child) .tk-avatar{box-shadow:var(--effect-1-default-base)}.tk-avatar-group>tk-avatar+tk-avatar>.tk-avatar-xlarge,.tk-avatar-group>tk-avatar+tk-avatar>.tk-avatar-large{margin-left:-20px}.tk-avatar-group>tk-avatar+tk-avatar>.tk-avatar-base{margin-left:var(--neutral-darker-shadows-2xl-spread, -12px)}.tk-avatar-group>tk-avatar+tk-avatar>.tk-avatar-small,.tk-avatar-group>tk-avatar+tk-avatar>.tk-avatar-xsmall{margin-left:-8px}';

const TkAvatarGroup$1 = /*@__PURE__*/ proxyCustomElement(
  class TkAvatarGroup extends H {
    constructor() {
      super();
      this.__registerHost();
      /**
       * Whether the avatars should have a shared background
       * @defaultValue false
       */
      this.compact = false;
    }
    render() {
      return h(
        'div',
        { key: '7f261d357477e9c5e8545dc7f3b0f1c9bd1e6e61', class: classNames('tk-avatar-group', { 'tk-avatar-group-compact': this.compact }) },
        h('slot', { key: 'c88bc92ca30a6d4f1247d41ba594edc027dbd8e7' }),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkAvatarGroupCss;
    }
  },
  [
    4,
    'tk-avatar-group',
    {
      compact: [4],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-avatar-group'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-avatar-group':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkAvatarGroup$1);
        }
        break;
    }
  });
}

const TkAvatarGroup = TkAvatarGroup$1;
const defineCustomElement = defineCustomElement$1;

export { TkAvatarGroup, defineCustomElement };
//# sourceMappingURL=tk-avatar-group.js.map

//# sourceMappingURL=tk-avatar-group.js.map
