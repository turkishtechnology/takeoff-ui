import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-CsLMRZQo.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$2 } from './p-vR69rcDp.js';
import { d as defineCustomElement$1 } from './p-CEvspPP4.js';

const tkButtonCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:inline-block}:host(.full-width){width:100%}:host(.full-width) .tk-button{width:100%}.tk-button{font-family:"Geologica", sans-serif;font-weight:400;line-height:var(--desktop-body-m-base-line-height);transition:all 200ms cubic-bezier(0.17, 0.67, 0.83, 0.67);display:inline-flex;align-items:center;justify-content:center;outline:none}.tk-button.primary{border:0px;color:var(--static-white)}.tk-button.primary.filled{background-color:var(--primary-base)}.tk-button.primary.filled:hover{background-color:var(--primary-darkest);cursor:pointer}.tk-button.primary.filled:focus-visible{background-color:var(--primary-base);box-shadow:var(--primary-focus)}.tk-button.primary.filled:disabled{background-color:var(--frames-sub-base)}.tk-button.primary.outlined{background-color:transparent;color:var(--primary-base);border:1px solid var(--primary-base)}.tk-button.primary.outlined:hover{background-color:var(--primary-lightest);cursor:pointer}.tk-button.primary.outlined:focus-visible{background-color:var(--overlay-white-lightest);box-shadow:var(--primary-focus)}.tk-button.primary.outlined:disabled{color:var(--text-sub-base);border:1px solid var(--border-sub-base)}.tk-button.primary.text{background-color:transparent;color:var(--primary-base)}.tk-button.primary.text:hover{background-color:var(--primary-lightest);cursor:pointer}.tk-button.primary.text:focus-visible{background-color:var(--primary-lightest);box-shadow:var(--primary-focus)}.tk-button.primary.text:disabled{background-color:transparent;color:var(--text-sub-base)}.tk-button.primary.link{color:var(--primary-base)}.tk-button.primary.link:hover{color:var(--primary-dark);cursor:pointer}.tk-button.secondary{border:0px;color:var(--text-lightest)}.tk-button.secondary.filled{background-color:var(--secondary-darkest)}.tk-button.secondary.filled:hover{background-color:var(--secondary-dark);cursor:pointer}.tk-button.secondary.filled:focus-visible{background-color:var(--secondary-darkest);box-shadow:var(--secondary-focus)}.tk-button.secondary.filled:disabled{background-color:var(--frames-sub-base);color:var(--text-lightest)}.tk-button.secondary.outlined{background-color:transparent;color:var(--secondary-base);border:1px solid var(--secondary-base)}.tk-button.secondary.outlined:hover{background-color:var(--secondary-lightest);cursor:pointer}.tk-button.secondary.outlined:focus-visible{background-color:var(--overlay-white-lightest);box-shadow:var(--secondary-focus)}.tk-button.secondary.outlined:disabled{color:var(--text-sub-base);border-color:var(--border-sub-base)}.tk-button.secondary.text{background-color:transparent;color:var(--secondary-base)}.tk-button.secondary.text:hover{background-color:var(--secondary-lightest);cursor:pointer}.tk-button.secondary.text:focus-visible{background-color:var(--secondary-lightest);box-shadow:var(--secondary-focus)}.tk-button.secondary.text:disabled{background-color:transparent;color:var(--text-sub-base)}.tk-button.secondary.link{color:var(--secondary-dark)}.tk-button.secondary.link:hover{color:var(--secondary-darkest);cursor:pointer}.tk-button.neutral{border:0px;color:var(--text-lightest)}.tk-button.neutral.filled{background-color:var(--frames-base)}.tk-button.neutral.filled .tk-button-icon{color:var(--icon-lightest)}.tk-button.neutral.filled:hover{background-color:var(--frames-darkest);cursor:pointer}.tk-button.neutral.filled:focus-visible{background-color:var(--frames-base);box-shadow:var(--secondary-focus)}.tk-button.neutral.filled:disabled{background-color:var(--frames-sub-base)}.tk-button.neutral.outlined{background-color:transparent;color:var(--text-darkest);border:1px solid var(--border-sub-base)}.tk-button.neutral.outlined .tk-button-icon{color:var(--icon-darkest)}.tk-button.neutral.outlined:hover{background-color:var(--frames-lightest);border:1px solid var(--border-base);cursor:pointer}.tk-button.neutral.outlined:focus-visible{background-color:var(--overlay-white-lightest);border:1px solid var(--border-base);box-shadow:var(--secondary-focus)}.tk-button.neutral.outlined:disabled{color:var(--text-sub-base);border-color:var(--border-sub-base)}.tk-button.neutral.outlined:disabled .tk-button-icon{color:var(--icon-sub-base)}.tk-button.neutral.text{background-color:transparent;color:var(--text-darkest)}.tk-button.neutral.text .tk-button-icon{color:var(--icon-darkest)}.tk-button.neutral.text:hover{background-color:var(--frames-lightest);cursor:pointer}.tk-button.neutral.text:focus-visible{background-color:var(--frames-lightest);box-shadow:var(--secondary-focus)}.tk-button.neutral.text:disabled{background-color:transparent;color:var(--text-sub-base)}.tk-button.neutral.text:disabled .tk-button-icon{color:var(--icon-sub-base)}.tk-button.neutral.link{color:var(--text-dark)}.tk-button.neutral.link:hover{color:var(--text-darkest);cursor:pointer}.tk-button.info{border:0px;color:var(--text-lightest)}.tk-button.info.filled{background-color:var(--states-info-dark)}.tk-button.info.filled .tk-button-icon{color:var(--icon-lightest)}.tk-button.info.filled:hover{background-color:var(--states-info-darkest);cursor:pointer}.tk-button.info.filled:focus-visible{background-color:var(--states-info-base);box-shadow:var(--secondary-focus)}.tk-button.info.filled:disabled{background-color:var(--states-info-sub-base)}.tk-button.info.outlined{background-color:transparent;color:var(--states-info-dark);border:1px solid var(--states-info-dark)}.tk-button.info.outlined:hover{background-color:var(--states-info-light);cursor:pointer}.tk-button.info.outlined:focus-visible{background-color:var(--overlay-white-lightest);box-shadow:var(--secondary-focus)}.tk-button.info.outlined:disabled{color:var(--states-info-light);border:1px solid var(--states-info-light)}.tk-button.info.text{background-color:transparent;color:var(--states-info-dark)}.tk-button.info.text:hover{background-color:var(--states-info-light);cursor:pointer}.tk-button.info.text:focus-visible{background-color:var(--states-info-light);box-shadow:var(--secondary-focus)}.tk-button.info.text:disabled{background-color:transparent;color:var(--states-info-light)}.tk-button.info.link{color:var(--states-info-dark)}.tk-button.info.link:hover{color:var(--states-info-darkest);cursor:pointer}.tk-button.success{border:0px;color:var(--text-lightest)}.tk-button.success.filled{background-color:var(--states-success-dark)}.tk-button.success.filled .tk-button-icon{color:var(--icon-lightest)}.tk-button.success.filled:hover{background-color:var(--states-success-darkest);cursor:pointer}.tk-button.success.filled:focus-visible{background-color:var(--states-success-dark);box-shadow:var(--secondary-focus)}.tk-button.success.filled:disabled{background-color:var(--states-success-sub-base)}.tk-button.success.outlined{background-color:transparent;color:var(--states-success-dark);border:1px solid var(--states-success-dark)}.tk-button.success.outlined:hover{background-color:var(--states-success-light);cursor:pointer}.tk-button.success.outlined:focus-visible{background-color:var(--overlay-white-lightest);box-shadow:var(--secondary-focus)}.tk-button.success.outlined:disabled{color:var(--states-success-light);border:1px solid var(--states-success-light)}.tk-button.success.text{background-color:transparent;color:var(--states-success-dark)}.tk-button.success.text:hover{background-color:var(--states-success-light);cursor:pointer}.tk-button.success.text:focus-visible{background-color:var(--states-success-light);box-shadow:var(--secondary-focus)}.tk-button.success.text:disabled{background-color:transparent;color:var(--states-success-light)}.tk-button.success.link{color:var(--states-success-dark)}.tk-button.success.link:hover{color:var(--states-success-darkest);cursor:pointer}.tk-button.danger{border:0px;color:var(--states-danger-dark)}.tk-button.danger.filled{background-color:var(--states-danger-dark);color:var(--text-lightest)}.tk-button.danger.filled .tk-button-icon{color:var(--icon-lightest)}.tk-button.danger.filled:hover{background-color:var(--states-danger-darkest);cursor:pointer}.tk-button.danger.filled:focus-visible{background-color:var(--states-danger-dark);box-shadow:var(--secondary-focus)}.tk-button.danger.filled:disabled{background-color:var(--states-danger-light)}.tk-button.danger.outlined{background-color:transparent;border:1px solid var(--states-danger-dark)}.tk-button.danger.outlined:hover{background-color:var(--states-danger-light);cursor:pointer}.tk-button.danger.outlined:focus-visible{background-color:var(--overlay-white-lightest);box-shadow:var(--secondary-focus)}.tk-button.danger.outlined:disabled{color:var(--states-danger-light);border:1px solid var(--states-danger-light)}.tk-button.danger.text{background-color:transparent}.tk-button.danger.text:hover{background-color:var(--states-danger-light);cursor:pointer}.tk-button.danger.text:focus-visible{background-color:var(--states-danger-light);box-shadow:var(--secondary-focus)}.tk-button.danger.text:disabled{background-color:transparent;color:var(--states-danger-light)}.tk-button.danger.link{color:var(--states-danger-dark)}.tk-button.danger.link:hover{color:var(--states-danger-darkest);cursor:pointer}.tk-button.warning{border:0px;color:var(--states-warning-dark)}.tk-button.warning.filled{background-color:var(--states-warning-dark);color:var(--text-lightest)}.tk-button.warning.filled .tk-button-icon{color:var(--icon-lightest)}.tk-button.warning.filled:hover{background-color:var(--states-warning-darkest);cursor:pointer}.tk-button.warning.filled:focus-visible{background-color:var(--states-warning-dark);box-shadow:var(--secondary-focus)}.tk-button.warning.filled:disabled{background-color:var(--states-warning-sub-base)}.tk-button.warning.outlined{background-color:transparent;border:1px solid var(--states-warning-dark)}.tk-button.warning.outlined:hover{background-color:var(--states-warning-light);cursor:pointer}.tk-button.warning.outlined:focus-visible{background-color:var(--overlay-white-light);box-shadow:var(--secondary-focus)}.tk-button.warning.outlined:disabled{color:var(--states-warning-light);border:1px solid var(--states-warning-light)}.tk-button.warning.text{background-color:transparent}.tk-button.warning.text:hover{background-color:var(--states-warning-light);cursor:pointer}.tk-button.warning.text:focus-visible{background-color:var(--states-warning-light);box-shadow:var(--secondary-focus)}.tk-button.warning.text:disabled{background-color:transparent;color:var(--states-warning-light)}.tk-button.warning.link{color:var(--states-warning-dark)}.tk-button.warning.link:hover{color:var(--states-warning-darkest);cursor:pointer}.tk-button.white{border:0px;box-shadow:var(--secondary-focus)}.tk-button.white.filled{background-color:var(--static-light);color:var(--text-darkest)}.tk-button.white.filled .tk-button-icon{color:var(--icon-darkest)}.tk-button.white.filled:hover{background-color:var(--background-lightest);cursor:pointer}.tk-button.white.filled:focus-visible{background-color:var(--static-light)}.tk-button.white.filled:disabled{background-color:var(--static-light);color:var(--text-lightest)}.tk-button.white.outlined{background-color:transparent;color:var(--static-light);border:1px solid var(--static-light)}.tk-button.white.outlined:hover{background-color:var(--overlay-white-light);cursor:pointer}.tk-button.white.outlined:focus-visible{background-color:var(--overlay-white-lightest)}.tk-button.white.outlined:disabled{color:var(--text-sub-base);border-color:var(--border-sub-base)}.tk-button.white.text{background-color:transparent;color:var(--static-light);box-shadow:none}.tk-button.white.text:hover{color:var(--text-dark);background-color:var(--overlay-white-light);cursor:pointer}.tk-button.white.link{color:var(--text-lightest)}.tk-button.white.link:hover{color:var(--text-light);cursor:pointer}.tk-button:disabled{cursor:not-allowed;pointer-events:none}.tk-button.reverse{flex-direction:row-reverse}.tk-button.small{height:32px;font-size:var(--desktop-body-xs-size);border-radius:var(--button-sizes-small-radius);padding:var(--button-sizes-small-v-padding) var(--button-sizes-small-h-padding);gap:var(--button-sizes-small-gap)}.tk-button.small.rounded{height:unset;border-radius:100%;padding:var(--fab-button-sizes-small-v-padding) var(--fab-button-sizes-small-h-padding)}.tk-button.small i{font-size:var(--button-sizes-small-icon-size);width:var(--button-sizes-small-icon-size);height:var(--button-sizes-small-icon-size);line-height:unset}.tk-button.small.icon-only{padding:var(--sizes-small-full-padding, 6px)}.tk-button.base{height:40px;font-size:var(--desktop-body-s-size);border-radius:var(--button-sizes-base-radius);padding:var(--button-sizes-base-v-padding) var(--button-sizes-base-h-padding);gap:var(--button-sizes-base-gap)}.tk-button.base.rounded{height:unset;border-radius:100%;padding:var(--fab-button-sizes-base-v-padding) var(--fab-button-sizes-base-h-padding)}.tk-button.base i{font-size:var(--button-sizes-base-icon-size);width:var(--button-sizes-base-icon-size);height:var(--button-sizes-base-icon-size);line-height:unset}.tk-button.base.icon-only{padding:var(--sizes-base-full-padding, 8px)}.tk-button.large{height:48px;font-size:var(--desktop-body-m-base-size);border-radius:var(--button-sizes-large-radius);padding:var(--button-sizes-large-v-padding) var(--button-sizes-large-h-padding);gap:var(--button-sizes-large-gap)}.tk-button.large.rounded{height:unset;border-radius:100%;padding:var(--fab-button-sizes-large-v-padding) var(--fab-button-sizes-large-h-padding)}.tk-button.large i{font-size:var(--button-sizes-large-icon-size);width:var(--button-sizes-large-icon-size);height:var(--button-sizes-large-icon-size);line-height:unset}.tk-button.large.icon-only{padding:var(--sizes-large-full-padding, 12px)}.tk-button.link{padding:0;background-color:transparent;text-decoration:none}.tk-button.link.underline span{text-decoration:underline}.tk-button.link:disabled{color:var(--text-sub-base)}.tk-button.link.small{height:18px}.tk-button.link.small i{font-size:var(--link-button-sizes-small-icon-size);width:var(--link-button-sizes-small-icon-size);height:var(--link-button-sizes-small-icon-size)}.tk-button.link.base{height:20px}.tk-button.link.base i{font-size:var(--link-button-sizes-base-icon-size);width:var(--link-button-sizes-base-icon-size);height:var(--link-button-sizes-base-icon-size)}.tk-button.link.large{height:24px}.tk-button.link.large i{font-size:var(--link-button-sizes-large-icon-size);width:var(--link-button-sizes-large-icon-size);height:var(--link-button-sizes-large-icon-size)}.tk-button i{display:flex;justify-content:center;align-items:center}';

const TkButton = /*@__PURE__*/ proxyCustomElement(
  class TkButton extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkClick = createEvent(this, 'tk-click', 7);
      /**
       * This field specifies the design type of the component.
       * @defaultValue filled
       */
      this.type = 'filled';
      /**
       * Defines the position of the icon.
       * @defaultValue 'left'
       */
      this.iconPosition = 'left';
      /**
       * Label text displayed inside the button.
       */
      this.label = '';
      /**
       * Sets size for the component.
       * @defaultValue 'base'
       */
      this.size = 'base';
      /**
       * Sets the button type.
       * @defaultValue 'button'
       */
      this.mode = 'button';
      /**
       * Determines the button's variant for different styles.
       */
      this.variant = 'primary';
    }
    componentWillLoad() {
      if (this.mode == 'link') {
        this.type = null;
      }
    }
    handleClick(e) {
      if (this.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      this.tkClick.emit(e);
      if (this.mode === 'submit') {
        const form = this.el.closest('form');
        if (form) {
          form.requestSubmit();
        }
      } else if (this.mode === 'reset') {
        const form = this.el.closest('form');
        if (form) {
          form.reset();
        }
      }
    }
    render() {
      var _a;
      const rootClasses = classNames(
        'tk-button',
        this.type,
        {
          'loading': this.loading && !this.disabled,
          'reverse': this.icon && this.iconPosition == 'right',
          'rounded': this.rounded && this.icon && (this.label == '' || this.label == null || this.label.length <= 0),
          'link': this.mode == 'link',
          'underline': this.underline,
          'icon-only': (this.label == '' || this.label == null || this.label.length <= 0) && this.icon,
        },
        [this.variant],
        [this.size],
      );
      let icon;
      const spinnerElement = h('tk-spinner', {
        key: '5f98c33058b7ad23361b1942cf485e2539c621c5',
        size: this.size === 'large' ? 'small' : this.size === 'base' ? 'xsmall' : 'xxsmall',
      });
      if (this.loading) {
        icon = spinnerElement;
      } else if (this.icon) {
        icon = h('tk-icon', Object.assign({ key: 'b839c92010a917ce31fb27ae8f4897945c370a04' }, getIconElementProps(this.icon, { class: 'tk-button-icon', variant: null })));
      }
      let Tag;
      let props;
      if (this.mode == 'link') {
        Tag = 'a';
        props = { href: this.href, target: this.target };
      } else {
        Tag = 'button';
        props = { type: this.type };
      }
      let label;
      if (((_a = this.label) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        label = h('span', { key: 'a2a44ecc7469ec757f07bdd915fb40db2dfc9f58' }, this.label);
      }
      return h(
        Host,
        { key: 'a71a5292f75b07582166fd468110f5854531386e', class: { 'full-width': this.fullWidth } },
        h(
          Tag,
          Object.assign({ key: 'c9bafb40d46801a0c94901359884c77d3aae531e', class: rootClasses }, props, { disabled: this.disabled, onClick: e => this.handleClick(e) }),
          icon,
          label,
        ),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkButtonCss;
    }
  },
  [
    1,
    'tk-button',
    {
      disabled: [4],
      fullWidth: [4, 'full-width'],
      type: [1025],
      icon: [1],
      iconPosition: [1, 'icon-position'],
      href: [1],
      target: [1],
      underline: [4],
      label: [1],
      loading: [4],
      rounded: [4],
      size: [1],
      mode: [1],
      variant: [1],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-button', 'tk-icon', 'tk-spinner'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-button':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkButton);
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
      case 'tk-spinner':
        if (!customElements.get(tagName)) {
          defineCustomElement$1();
        }
        break;
    }
  });
}

export { TkButton as T, defineCustomElement as d };
//# sourceMappingURL=p-DFQnxT5R.js.map

//# sourceMappingURL=p-DFQnxT5R.js.map
