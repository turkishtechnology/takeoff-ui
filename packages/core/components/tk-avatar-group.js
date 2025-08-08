import { p as proxyCustomElement, H, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkAvatarGroupScss =
  ':host {\n  display: block;\n}\n\n.tk-avatar-group {\n  display: inline-flex;\n  align-items: center;\n  width: max-content;\n  overflow: hidden;\n\n  &.tk-avatar-group-compact {\n    border-radius: var(--radius-full);\n    border: 1px solid var(--border-light, #e1e4ea);\n    background: var(--static-light, #fff);\n    padding: 4px;\n\n    > tk-avatar:last-child .tk-avatar-container {\n      margin-left: 0;\n\n      .tk-avatar {\n        background: transparent;\n        border: 1px solid transparent;\n        box-shadow: none;\n        user-select: none;\n\n        .tk-avatar-label {\n          color: var(--text-darkest, #222530);\n        }\n      }\n    }\n  }\n\n  > tk-avatar:not(:last-child) .tk-avatar {\n    box-shadow: var(--effect-1-default-base);\n  }\n\n  > tk-avatar + tk-avatar {\n    > .tk-avatar-xlarge,\n    > .tk-avatar-large {\n      margin-left: -20px;\n    }\n\n    > .tk-avatar-base {\n      margin-left: var(--neutral-darker-shadows-2xl-spread, -12px);\n    }\n\n    > .tk-avatar-small,\n    > .tk-avatar-xsmall {\n      margin-left: -8px;\n    }\n  }\n}\n';

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
      return tkAvatarGroupScss;
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
