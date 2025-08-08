import { p as proxyCustomElement, H, h } from './p-B4rZamdt.js';
import { c as computePosition, o as offset, f as flip, s as shift, b as arrow } from './p-B0XocndT.js';

const tkPopoverScss =
  '.tk-popover-content {\n  display: flex;\n  gap: 8px;\n  position: fixed;\n  padding: var(--tooltips-base-v-padding) var(--tooltips-base-h-padding);\n  border-radius: var(--tooltips-base-radius, 8px);\n  width: max-content;\n  color: var(--text-base);\n  line-height: 20px;\n  z-index: 1300;\n  box-shadow: var(--shadow-base);\n\n  &.tk-popover-dark {\n    border: 1px solid var(--border-light);\n    background: var(--background-darkest);\n\n    .tk-popover-arrow {\n      background: var(--background-darkest);\n    }\n  }\n\n  &.tk-popover-white {\n    border: 1px solid var(--border-light);\n    background: var(--static-light);\n\n    .tk-popover-arrow {\n      background: var(--static-light);\n    }\n  }\n\n  &.tk-popover-basic {\n    border: 1px solid var(--states-light);\n    background: var(--background-lightest);\n\n    .tk-popover-arrow {\n      background: var(--background-lightest);\n    }\n  }\n}\n\n.tk-popover-arrow {\n  position: absolute;\n  width: 9px;\n  height: 9px;\n  background: inherit;\n  border: 1px solid;\n  border-color: inherit;\n  transform: rotate(45deg);\n  z-index: 1300;\n}\n';

const TkPopover$1 = /*@__PURE__*/ proxyCustomElement(
  class TkPopover extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.isOpen = false;
      /**
       * Controls if popover has custom content.
       * @defaultValue false
       */
      this.hasContentSlot = false;
      /**
       * Sets the action of the popover.
       * @defaultValue 'click'
       */
      this.trigger = 'click';
      /**
       * Sets the type of the popover.
       * @defaultValue "white"
       */
      this.type = 'basic';
      /**
       * The style attribute of container element
       */
      this.containerStyle = null;
      this.handleDocumentClick = e => {
        const isInnerClicked = e.composedPath().some(item => item === this.el);
        if (!isInnerClicked) {
          this.isOpen = false;
        }
      };
    }
    positionChanged() {
      if (this.popoverElement) {
        this.updateArrowPosition();
      }
    }
    componentWillLoad() {
      this.hasContentSlot = !!this.el.querySelector('[slot="content"]');
    }
    componentDidLoad() {
      var _a, _b, _c, _d, _e;
      this.triggerElement = this.el.querySelector('[slot="trigger"]');
      if (this.trigger === 'hover') {
        (_a = this.triggerElement) === null || _a === void 0 ? void 0 : _a.addEventListener('mouseenter', () => (this.isOpen = true));
        (_b = this.triggerElement) === null || _b === void 0 ? void 0 : _b.addEventListener('mouseleave', () => (this.isOpen = false));
      } else {
        (_c = this.triggerElement) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => (this.isOpen = !this.isOpen));
        document.addEventListener('click', this.handleDocumentClick);
      }
      // dialog içerisindek kullanıldığında dialog içerisinde scroll olduğunda panelin kapanması için yapıldı.
      this.dialogRef = this.el.closest('tk-dialog');
      (_e = (_d = this.dialogRef) === null || _d === void 0 ? void 0 : _d.querySelector('.tk-dialog-content')) === null || _e === void 0
        ? void 0
        : _e.addEventListener('scroll', this.handleDialogScroll.bind(this));
    }
    disconnectedCallback() {
      var _a, _b, _c, _d, _e;
      if (this.trigger === 'hover') {
        (_a = this.triggerElement) === null || _a === void 0 ? void 0 : _a.removeEventListener('mouseenter', () => (this.isOpen = true));
        (_b = this.triggerElement) === null || _b === void 0 ? void 0 : _b.removeEventListener('mouseleave', () => (this.isOpen = false));
      } else {
        (_c = this.triggerElement) === null || _c === void 0 ? void 0 : _c.removeEventListener('click', () => (this.isOpen = !this.isOpen));
        document.removeEventListener('click', this.handleDocumentClick);
      }
      this.cleanup && this.cleanup();
      (_e = (_d = this.dialogRef) === null || _d === void 0 ? void 0 : _d.querySelector('.tk-dialog-content')) === null || _e === void 0
        ? void 0
        : _e.removeEventListener('scroll', this.handleDialogScroll.bind(this));
    }
    componentDidUpdate() {
      if (this.isOpen) {
        const updatePosition = () => {
          if (this.isOpen) {
            requestAnimationFrame(() => this.updatePosition());
          }
        };
        window.addEventListener('scroll', updatePosition, { passive: true });
        window.addEventListener('resize', updatePosition, { passive: true });
        this.cleanup = () => {
          window.removeEventListener('scroll', updatePosition);
          window.removeEventListener('resize', updatePosition);
        };
        this.updatePosition();
      } else {
        this.cleanup && this.cleanup();
      }
    }
    /**
     * Closes the popover
     */
    async close() {
      this.isOpen = false;
    }
    // dialog contentindeki scroll'u dinleyip scroll olduğunda panelin kapanması için yapıldı
    handleDialogScroll() {
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
    updatePosition() {
      computePosition(this.triggerElement, this.popoverElement, {
        strategy: 'fixed',
        placement: this.position,
        middleware: [offset(8), flip(), shift(), arrow({ element: this.arrowElement })],
      }).then(({ x, y, middlewareData, placement }) => {
        Object.assign(this.popoverElement.style, {
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
      return h(
        'div',
        { key: 'a3e38cb65abad447186614f184c430170c71b7d0', class: 'tk-popover' },
        h('slot', { key: '222a3f7715ae064bdeac53552c058ea03694acb3', name: 'trigger' }),
        this.isOpen &&
          h(
            'div',
            {
              key: '369a6ae413c52cfd90e0c5d6eb14af48ed6fef83',
              ref: el => (this.popoverElement = el),
              class: {
                'tk-popover-content': true,
                [`tk-popover-${this.type}`]: true,
              },
              style: Object.assign({}, this.containerStyle),
              role: 'popover',
              onClick: e => e.stopPropagation(),
            },
            this.hasContentSlot && h('slot', { key: 'e0548e01760fcd3348c0b321c2ca9c6c554b134c', name: 'content' }),
            h('div', { key: 'f821cadc3f921fba1d49158d7a775de9ea6523aa', ref: el => (this.arrowElement = el), class: 'tk-popover-arrow' }),
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
      return tkPopoverScss;
    }
  },
  [
    1,
    'tk-popover',
    {
      trigger: [1],
      position: [1],
      type: [1],
      containerStyle: [8, 'container-style'],
      isOpen: [32],
      hasContentSlot: [32],
      close: [64],
    },
    undefined,
    {
      position: ['positionChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-popover'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-popover':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkPopover$1);
        }
        break;
    }
  });
}

const TkPopover = TkPopover$1;
const defineCustomElement = defineCustomElement$1;

export { TkPopover, defineCustomElement };
//# sourceMappingURL=tk-popover.js.map

//# sourceMappingURL=tk-popover.js.map
