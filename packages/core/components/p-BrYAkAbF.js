import { p as proxyCustomElement, H, h, F as Fragment } from './p-F5eU3Bfi.js';
import { a as autoUpdate, c as computePosition, o as offset, f as flip, s as shift, b as arrow } from './p-B0XocndT.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { d as defineCustomElement$1 } from './p-75KyitY6.js';

const tkTooltipCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}.tk-tooltip{display:flex}.tk-tooltip-content{display:flex;gap:8px;position:fixed;color:var(--static-white);padding:var(--tooltips-base-v-padding) var(--tooltips-base-h-padding);border-radius:var(--tooltips-base-radius, 8px);pointer-events:none;width:max-content;max-width:300px;z-index:1300}.tk-tooltip-content.tk-tooltip-dark{background:var(--background-darkest);line-height:20px;border:1px solid var(--border-dark)}.tk-tooltip-content.tk-tooltip-dark .tk-tooltip-header{text-align:left;color:var(--text-lightest);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:400}.tk-tooltip-content.tk-tooltip-dark .tk-tooltip-description{color:var(--text-sub-base);font-weight:300;font-size:var(--desktop-body-xs-size)}.tk-tooltip-content.tk-tooltip-dark .tk-tooltip-arrow{background:var(--background-darkest)}.tk-tooltip-content.tk-tooltip-white{border:1px solid var(--border-light);background:var(--background-lightest);line-height:20px}.tk-tooltip-content.tk-tooltip-white .tk-tooltip-header{text-align:left;color:var(--text-darkest);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:400}.tk-tooltip-content.tk-tooltip-white .tk-tooltip-description{color:var(--text-dark);font-weight:300;font-size:var(--desktop-body-xs-size)}.tk-tooltip-content.tk-tooltip-white .tk-tooltip-arrow{background:var(--background-lightest)}.tk-tooltip-content.tk-tooltip-info{border:1px solid var(--states-info-light);background-color:var(--states-info-lightest);line-height:20px}.tk-tooltip-content.tk-tooltip-info .tk-tooltip-header{text-align:left;color:var(--text-darkest);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:400}.tk-tooltip-content.tk-tooltip-info .tk-tooltip-description{color:var(--text-dark);font-weight:300;font-size:var(--desktop-body-xs-size)}.tk-tooltip-content.tk-tooltip-info .tk-tooltip-arrow{background-color:var(--states-info-lightest)}.tk-tooltip-content.tk-tooltip-success{border:1px solid var(--states-success-light);background-color:var(--states-success-lightest);line-height:20px}.tk-tooltip-content.tk-tooltip-success .tk-tooltip-header{text-align:left;color:var(--text-darkest);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:400}.tk-tooltip-content.tk-tooltip-success .tk-tooltip-description{color:var(--text-dark);font-weight:300;font-size:var(--desktop-body-xs-size)}.tk-tooltip-content.tk-tooltip-success .tk-tooltip-arrow{background-color:var(--states-success-lightest)}.tk-tooltip-content.tk-tooltip-danger{border:1px solid var(--states-danger-light);background-color:var(--states-danger-lightest);line-height:20px}.tk-tooltip-content.tk-tooltip-danger .tk-tooltip-header{text-align:left;color:var(--text-darkest);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:400}.tk-tooltip-content.tk-tooltip-danger .tk-tooltip-description{color:var(--text-dark);font-weight:300;font-size:var(--desktop-body-xs-size)}.tk-tooltip-content.tk-tooltip-danger .tk-tooltip-arrow{background-color:var(--states-danger-lightest)}.tk-tooltip-content.tk-tooltip-warning{border:1px solid var(--states-warning-light);background-color:var(--states-warning-lightest);line-height:20px}.tk-tooltip-content.tk-tooltip-warning .tk-tooltip-header{text-align:left;color:var(--text-darkest);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:400}.tk-tooltip-content.tk-tooltip-warning .tk-tooltip-description{color:var(--text-dark);font-weight:300;font-size:var(--desktop-body-xs-size)}.tk-tooltip-content.tk-tooltip-warning .tk-tooltip-arrow{background-color:var(--states-warning-lightest)}.tk-tooltip-content.tk-tooltip-neutral{border:1px solid var(--states-light);background-color:var(--background-light);line-height:20px}.tk-tooltip-content.tk-tooltip-neutral .tk-tooltip-header{text-align:left;color:var(--text-darkest);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:400}.tk-tooltip-content.tk-tooltip-neutral .tk-tooltip-description{color:var(--text-dark);font-weight:300;font-size:var(--desktop-body-xs-size)}.tk-tooltip-content.tk-tooltip-neutral .tk-tooltip-arrow{background-color:var(--background-light)}.tk-tooltip-arrow{position:absolute;width:9px;height:9px;background:inherit;border:1px solid;border-color:inherit;transform:rotate(45deg);z-index:1300}';

const TkTooltip = /*@__PURE__*/ proxyCustomElement(
  class TkTooltip extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.isOpen = false;
      /**
       * Controls if tooltip has custom content.
       * @defaultValue false
       */
      this.hasContentSlot = false;
      /**
       * Sets the position of the tooltip.
       * @defaultValue 'right'
       */
      this.position = 'right';
      /**
       * Sets the color variant of the tooltip.
       * @defaultValue 'neutral'
       */
      this.variant = 'neutral';
      /**
       * The style attribute of container element
       */
      this.containerStyle = null;
      this.handleMouseEnter = () => {
        this.isOpen = true;
      };
      this.handleMouseLeave = () => {
        this.isOpen = false;
      };
    }
    positionChanged() {
      if (this.tooltipElement) {
        this.updateArrowPosition();
      }
    }
    componentWillLoad() {
      this.hasContentSlot = !!this.el.querySelector('[slot="content"]');
    }
    componentDidLoad() {
      var _a, _b;
      this.triggerElement = this.el.querySelector('[slot="trigger"]');
      (_a = this.triggerElement) === null || _a === void 0 ? void 0 : _a.addEventListener('mouseenter', this.handleMouseEnter);
      (_b = this.triggerElement) === null || _b === void 0 ? void 0 : _b.addEventListener('mouseleave', this.handleMouseLeave);
    }
    componentDidUpdate() {
      if (this.isOpen) {
        this.cleanup = autoUpdate(this.triggerElement, this.tooltipElement, () => this.updatePosition(), {
          animationFrame: true,
        });
      } else {
        this.cleanup && this.cleanup();
      }
    }
    updatePosition() {
      computePosition(this.triggerElement, this.tooltipElement, {
        strategy: 'fixed',
        placement: this.position,
        middleware: [offset(8), flip(), shift(), arrow({ element: this.arrowElement })],
      }).then(({ x, y, middlewareData, placement }) => {
        Object.assign(this.tooltipElement.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
        const { x: arrowX, y: arrowY } = middlewareData.arrow;
        Object.assign(this.arrowElement.style, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
        });
        const [side] = placement.split('-');
        this.updateArrowPosition(side);
      });
    }
    updateArrowPosition(side) {
      const arrowElement = this.arrowElement;
      switch (side) {
        case 'top':
          arrowElement.style.bottom = '-5px';
          arrowElement.style.borderTop = 'none';
          arrowElement.style.borderLeft = 'none';
          break;
        case 'bottom':
          arrowElement.style.top = '-5px';
          arrowElement.style.borderBottom = 'none';
          arrowElement.style.borderRight = 'none';
          break;
        case 'left':
          arrowElement.style.right = '-5px';
          arrowElement.style.borderBottom = 'none';
          arrowElement.style.borderLeft = 'none';
          break;
        case 'right':
          arrowElement.style.left = '-5px';
          arrowElement.style.borderTop = 'none';
          arrowElement.style.borderRight = 'none';
          break;
      }
    }
    render() {
      let _icon;
      let iconVariant;
      if (this.variant == 'dark') iconVariant = 'neutral';
      else iconVariant = this.variant;
      _icon = h(
        'tk-icon',
        Object.assign(
          { key: '6bdf5e5e902794acfca3e16195d76b9aab40de7b' },
          getIconElementProps(this.icon, { class: classNames('tk-tooltip-item-icon'), variant: iconVariant, sign: true, size: 'small' }),
        ),
      );
      return h(
        'div',
        { key: '0fe5c47ac5875db343cac394f75560cb0eace3e0', class: 'tk-tooltip' },
        h('slot', { key: '5386560843091b6c36a74295fc2631885930f30c', name: 'trigger' }),
        this.isOpen &&
          h(
            'div',
            {
              key: '815c3eb7546fdaf33bfb5560ae6fc338608c79b7',
              ref: el => (this.tooltipElement = el),
              class: {
                'tk-tooltip-content': true,
                [`tk-tooltip-${this.variant}`]: !!this.variant,
              },
              style: Object.assign({}, this.containerStyle),
              role: 'tooltip',
            },
            this.hasContentSlot
              ? h('slot', { name: 'content' })
              : h(Fragment, null, _icon, h('div', null, h('div', { class: 'tk-tooltip-header' }, this.header), h('div', { class: 'tk-tooltip-description' }, this.description))),
            h('div', { key: '651ee96db7e2c9a5da153acd34c0d86558aa79d9', ref: el => (this.arrowElement = el), class: 'tk-tooltip-arrow' }),
          ),
      );
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        position: ['positionChanged'],
      };
    }
    static get style() {
      return tkTooltipCss;
    }
  },
  [
    1,
    'tk-tooltip',
    {
      header: [1],
      description: [1],
      position: [1],
      variant: [1],
      icon: [1],
      containerStyle: [8, 'container-style'],
      isOpen: [32],
      hasContentSlot: [32],
    },
    undefined,
    {
      position: ['positionChanged'],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-tooltip', 'tk-icon'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-tooltip':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkTooltip);
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$1();
        }
        break;
    }
  });
}

export { TkTooltip as T, defineCustomElement as d };
//# sourceMappingURL=p-BrYAkAbF.js.map

//# sourceMappingURL=p-BrYAkAbF.js.map
