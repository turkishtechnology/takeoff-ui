import { p as proxyCustomElement, H, h, F as Fragment } from './p-B4rZamdt.js';
import { a as autoUpdate, c as computePosition, o as offset, f as flip, s as shift, b as arrow } from './p-B0XocndT.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { d as defineCustomElement$1 } from './p-DrRHtkyE.js';

const tkTooltipScss =
  '.tk-tooltip {\n  display: flex;\n}\n\n.tk-tooltip-content {\n  display: flex;\n  gap: 8px;\n  position: fixed;\n  color: var(--static-white);\n  padding: var(--tooltips-base-v-padding) var(--tooltips-base-h-padding);\n  border-radius: var(--tooltips-base-radius, 8px);\n  pointer-events: none;\n  width: max-content;\n  max-width: 300px;\n  z-index: 1300;\n\n  &.tk-tooltip-dark {\n    background: var(--background-darkest);\n    line-height: 20px;\n    border: 1px solid var(--border-dark);\n\n    .tk-tooltip-header {\n      text-align: left;\n      color: var(--text-lightest);\n      font-size: var(--desktop-body-s-size);\n      font-style: normal;\n      font-weight: 400;\n    }\n\n    .tk-tooltip-description {\n      color: var(--text-sub-base);\n      font-weight: 300;\n      font-size: var(--desktop-body-xs-size);\n    }\n\n    .tk-tooltip-arrow {\n      background: var(--background-darkest);\n    }\n  }\n\n  &.tk-tooltip-white {\n    border: 1px solid var(--border-light);\n    background: var(--background-lightest);\n    line-height: 20px;\n\n    .tk-tooltip-header {\n      text-align: left;\n      color: var(--text-darkest);\n      font-size: var(--desktop-body-s-size);\n      font-style: normal;\n      font-weight: 400;\n    }\n\n    .tk-tooltip-description {\n      color: var(--text-dark);\n      font-weight: 300;\n      font-size: var(--desktop-body-xs-size);\n    }\n\n    .tk-tooltip-arrow {\n      background: var(--background-lightest);\n    }\n  }\n\n  &.tk-tooltip-info {\n    border: 1px solid var(--states-info-light);\n    background-color: var(--states-info-lightest);\n    line-height: 20px;\n\n    .tk-tooltip-header {\n      text-align: left;\n      color: var(--text-darkest);\n      font-size: var(--desktop-body-s-size);\n      font-style: normal;\n      font-weight: 400;\n    }\n\n    .tk-tooltip-description {\n      color: var(--text-dark);\n      font-weight: 300;\n      font-size: var(--desktop-body-xs-size);\n    }\n\n    .tk-tooltip-arrow {\n      background-color: var(--states-info-lightest);\n    }\n  }\n\n  &.tk-tooltip-success {\n    border: 1px solid var(--states-success-light);\n    background-color: var(--states-success-lightest);\n    line-height: 20px;\n\n    .tk-tooltip-header {\n      text-align: left;\n      color: var(--text-darkest);\n      font-size: var(--desktop-body-s-size);\n      font-style: normal;\n      font-weight: 400;\n    }\n\n    .tk-tooltip-description {\n      color: var(--text-dark);\n      font-weight: 300;\n      font-size: var(--desktop-body-xs-size);\n    }\n\n    .tk-tooltip-arrow {\n      background-color: var(--states-success-lightest);\n    }\n  }\n\n  &.tk-tooltip-danger {\n    border: 1px solid var(--states-danger-light);\n    background-color: var(--states-danger-lightest);\n    line-height: 20px;\n\n    .tk-tooltip-header {\n      text-align: left;\n      color: var(--text-darkest);\n      font-size: var(--desktop-body-s-size);\n      font-style: normal;\n      font-weight: 400;\n    }\n\n    .tk-tooltip-description {\n      color: var(--text-dark);\n      font-weight: 300;\n      font-size: var(--desktop-body-xs-size);\n    }\n\n    .tk-tooltip-arrow {\n      background-color: var(--states-danger-lightest);\n    }\n  }\n\n  &.tk-tooltip-warning {\n    border: 1px solid var(--states-warning-light);\n    background-color: var(--states-warning-lightest);\n    line-height: 20px;\n\n    .tk-tooltip-header {\n      text-align: left;\n      color: var(--text-darkest);\n      font-size: var(--desktop-body-s-size);\n      font-style: normal;\n      font-weight: 400;\n    }\n\n    .tk-tooltip-description {\n      color: var(--text-dark);\n      font-weight: 300;\n      font-size: var(--desktop-body-xs-size);\n    }\n\n    .tk-tooltip-arrow {\n      background-color: var(--states-warning-lightest);\n    }\n  }\n\n  &.tk-tooltip-neutral {\n    border: 1px solid var(--states-light);\n    background-color: var(--background-light);\n    line-height: 20px;\n\n    .tk-tooltip-header {\n      text-align: left;\n      color: var(--text-darkest);\n      font-size: var(--desktop-body-s-size);\n      font-style: normal;\n      font-weight: 400;\n    }\n\n    .tk-tooltip-description {\n      color: var(--text-dark);\n      font-weight: 300;\n      font-size: var(--desktop-body-xs-size);\n    }\n\n    .tk-tooltip-arrow {\n      background-color: var(--background-light);\n    }\n  }\n}\n\n.tk-tooltip-arrow {\n  position: absolute;\n  width: 9px;\n  height: 9px;\n  background: inherit;\n  border: 1px solid;\n  border-color: inherit;\n  transform: rotate(45deg);\n  z-index: 1300;\n}\n';

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
      return tkTooltipScss;
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
//# sourceMappingURL=p-D6SW83yT.js.map

//# sourceMappingURL=p-D6SW83yT.js.map
