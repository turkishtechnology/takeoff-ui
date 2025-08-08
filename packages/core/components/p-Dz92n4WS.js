import { p as proxyCustomElement, H, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';

const tkSpinnerScss =
  '.tk-spin-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  &.vertical {\n    flex-direction: column;\n  }\n  &.horizontal {\n    flex-direction: row;\n  }\n  &.xxsmall {\n    .spinner-rounded,\n    .spinner-dots,\n    .spinner-lines,\n    .spinner-pulse,\n    .spinner-loader {\n      display: flex;\n      width: 16px;\n      height: 16px;\n    }\n  }\n  &.xsmall {\n    .spinner-rounded,\n    .spinner-dots,\n    .spinner-lines,\n    .spinner-pulse,\n    .spinner-loader {\n      display: flex;\n      width: 20px;\n      height: 20px;\n    }\n  }\n  &.small {\n    .spinner-rounded,\n    .spinner-dots,\n    .spinner-lines,\n    .spinner-pulse,\n    .spinner-loader {\n      display: flex;\n      width: 24px;\n      height: 24px;\n    }\n  }\n  &.base {\n    .spinner-rounded,\n    .spinner-dots,\n    .spinner-lines,\n    .spinner-pulse,\n    .spinner-loader {\n      display: flex;\n      width: 32px;\n      height: 32px;\n    }\n  }\n  &.large {\n    .spinner-rounded,\n    .spinner-dots,\n    .spinner-lines,\n    .spinner-pulse,\n    .spinner-loader {\n      display: flex;\n      width: 40px;\n      height: 40px;\n    }\n  }\n  &.xlarge {\n    .spinner-rounded,\n    .spinner-dots,\n    .spinner-lines,\n    .spinner-pulse,\n    .spinner-loader {\n      display: flex;\n      width: 48px;\n      height: 48px;\n    }\n  }\n}\n\n.tk-spinner-label {\n  font-size: 12px;\n  color: var(--text-sub-base);\n}\n\n.vertical .tk-spinner-label {\n  margin-top: 8px;\n  margin-left: 0;\n}\n\n.horizontal .tk-spinner-label {\n  margin-top: 0;\n  margin-left: 8px;\n}\n\n/* --------------------------------------------------- SPINNER ROUNDED ----------------------------------------------------- */\n\n.spinner-rounded {\n  border: 7px solid var(--background-light);\n  border-top: 7px solid var(--background-darkest);\n  border-radius: 50%;\n  animation: rounded-animation 1s linear infinite;\n  box-sizing: border-box;\n\n  &.border-lightest {\n    border: 3px solid var(--background-light);\n    border-top: 3px solid transparent;\n  }\n}\n\n/* --------------------------------------------------- SPINNER DOTS ----------------------------------------------------- */\n.spinner-dots {\n  position: relative;\n  align-items: center;\n  justify-content: center;\n}\n\n.spinner-dots .dot {\n  position: absolute;\n  width: 4px;\n  height: 4px;\n  background-color: var(--background-darkest);\n  border-radius: 50%;\n  animation: dots-animation 1.2s linear infinite;\n}\n\n.spinner-dots .dot:nth-child(1) {\n  top: 0;\n  left: 50%;\n  transform: translateX(-50%);\n  animation-delay: -1.1s;\n}\n.spinner-dots .dot:nth-child(2) {\n  top: 14%;\n  left: 85%;\n  transform: translate(-50%, -50%);\n  animation-delay: -1s;\n}\n.spinner-dots .dot:nth-child(3) {\n  top: 50%;\n  left: 100%;\n  transform: translate(-50%, -50%);\n  animation-delay: -0.9s;\n}\n.spinner-dots .dot:nth-child(4) {\n  top: 85%;\n  left: 85%;\n  transform: translate(-50%, -50%);\n  animation-delay: -0.8s;\n}\n.spinner-dots .dot:nth-child(5) {\n  top: 100%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  animation-delay: -0.7s;\n}\n.spinner-dots .dot:nth-child(6) {\n  top: 85%;\n  left: 14%;\n  transform: translate(-50%, -50%);\n  animation-delay: -0.6s;\n}\n.spinner-dots .dot:nth-child(7) {\n  top: 50%;\n  left: 0;\n  transform: translate(-50%, -50%);\n  animation-delay: -0.5s;\n}\n.spinner-dots .dot:nth-child(8) {\n  top: 14%;\n  left: 14%;\n  transform: translate(-50%, -50%);\n  animation-delay: -0.4s;\n}\n\n/* ------------------------------------------------ SPINNER LINES -------------------------------------------------------- */\n\n.spinner-lines {\n  position: relative;\n  align-items: center;\n  justify-content: center;\n}\n\n.spinner-lines .line {\n  position: absolute;\n  width: 2px;\n  height: 6px;\n  background-color: var(--background-darkest);\n  border-radius: 2px;\n  animation: lines-animation 1.2s linear infinite;\n}\n\n.spinner-lines .line:nth-child(1) {\n  top: 0;\n  left: 50%;\n  transform: translateX(-50%);\n  animation-delay: -1.1s;\n}\n.spinner-lines .line:nth-child(2) {\n  top: 14%;\n  left: 85%;\n  transform: translate(-50%, -50%) rotate(45deg);\n  animation-delay: -1s;\n}\n.spinner-lines .line:nth-child(3) {\n  top: 50%;\n  left: 100%;\n  transform: translate(-50%, -50%) rotate(90deg);\n  animation-delay: -0.9s;\n}\n.spinner-lines .line:nth-child(4) {\n  top: 85%;\n  left: 85%;\n  transform: translate(-50%, -50%) rotate(135deg);\n  animation-delay: -0.8s;\n}\n.spinner-lines .line:nth-child(5) {\n  top: 100%;\n  left: 50%;\n  transform: translate(-50%, -50%) rotate(180deg);\n  animation-delay: -0.7s;\n}\n.spinner-lines .line:nth-child(6) {\n  top: 85%;\n  left: 14%;\n  transform: translate(-50%, -50%) rotate(225deg);\n  animation-delay: -0.6s;\n}\n.spinner-lines .line:nth-child(7) {\n  top: 50%;\n  left: 0;\n  transform: translate(-50%, -50%) rotate(270deg);\n  animation-delay: -0.5s;\n}\n.spinner-lines .line:nth-child(8) {\n  top: 14%;\n  left: 14%;\n  transform: translate(-50%, -50%) rotate(315deg);\n  animation-delay: -0.4s;\n}\n\n/* ---------------------------------------------- SPINNER PULSE ----------------------------------------------------- */\n\n.spinner-pulse {\n  border-radius: 50%;\n  background-color: var(--background-darkest);\n  animation: pulse-animation 1.5s infinite;\n}\n\n/* ---------------------------------------------- SPINNER THREE DOTS ------------------------------------------------- */\n\n/* SPINNER THREE DOTS */\n.spinner-three-dots {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.spinner-three-dots .dot1,\n.spinner-three-dots .dot2,\n.spinner-three-dots .dot3,\n.spinner-three-dots .dot4 {\n  width: 8px;\n  height: 8px;\n  background-color: var(--background-darkest);\n  border-radius: 50%;\n  margin: 2px;\n  animation: three-dots-animation 1.2s infinite ease-in-out;\n}\n\n.spinner-three-dots .dot1 {\n  animation-delay: -0.45s;\n}\n\n.spinner-three-dots .dot2 {\n  animation-delay: -0.3s;\n}\n\n.spinner-three-dots .dot3 {\n  animation-delay: -0.15s;\n}\n\n/* Farklı Boyutlar İçin Dot Spinner */\n.spinner-three-dots.small .dot1,\n.spinner-three-dots.small .dot2,\n.spinner-three-dots.small .dot3 {\n  width: 4px;\n  height: 4px;\n}\n\n.spinner-three-dots.default .dot1,\n.spinner-three-dots.default .dot2,\n.spinner-three-dots.default .dot3 {\n  width: 8px;\n  height: 8px;\n}\n\n.spinner-three-dots.large .dot1,\n.spinner-three-dots.large .dot2,\n.spinner-three-dots.large .dot3 {\n  width: 12px;\n  height: 12px;\n}\n\n.spinner-loader {\n  width: 24px;\n  height: 24px;\n  border: 7px solid transparent;\n  border-top: 7px solid var(--background-darkest);\n  border-radius: 50%;\n  animation: loader-animation 1s linear infinite;\n}\n\n/* ----------- ANIMATIONS/KEYFRAMES ------------ */\n\n@keyframes rounded-animation {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes dots-animation {\n  0%,\n  20% {\n    opacity: 1;\n  }\n  80%,\n  100% {\n    opacity: 0;\n  }\n}\n\n@keyframes lines-animation {\n  0%,\n  20% {\n    opacity: 1;\n  }\n  80%,\n  100% {\n    opacity: 0;\n  }\n}\n\n@keyframes pulse-animation {\n  0% {\n    transform: scale(0.75);\n    opacity: 1;\n  }\n  100% {\n    transform: scale(1.5);\n    opacity: 0;\n  }\n}\n\n@keyframes three-dots-animation {\n  0%,\n  80%,\n  100% {\n    transform: scale(0);\n  }\n  40% {\n    transform: scale(1);\n  }\n}\n\n@keyframes loader-animation {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n';

const TkSpinner = /*@__PURE__*/ proxyCustomElement(
  class TkSpinner extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      var _a;
      this.isButton = false;
      /**
       * Controls the orientation of the spinner component.
       * @defaultValue 'horizontal'
       */
      this.orientation = 'vertical';
      /**
       * Controls the size of the spinner component.
       * @defaultValue 'base'
       */
      this.size = 'base';
      /**
       * Sets the style of spinner component.
       * @defaultValue 'rounded'
       */
      this.type = 'rounded';
      this.isButton = (_a = this.el.closest('button')) === null || _a === void 0 ? void 0 : _a.classList.contains('tk-button');
    }
    renderSpinner() {
      switch (this.type) {
        case 'rounded':
          if (this.isButton) {
            const button = this.el.closest('button');
            const borderColor = window.getComputedStyle(button).color;
            return h('div', { style: { border: '3px solid ' + borderColor, borderTop: '3px solid transparent' }, class: 'spinner-rounded' });
          }
          return h('div', { class: 'spinner-rounded' });
        case 'dots':
          return h(
            'div',
            { class: 'spinner-dots' },
            h('div', { class: 'dot' }),
            h('div', { class: 'dot' }),
            h('div', { class: 'dot' }),
            h('div', { class: 'dot' }),
            h('div', { class: 'dot' }),
            h('div', { class: 'dot' }),
            h('div', { class: 'dot' }),
            h('div', { class: 'dot' }),
          );
        case 'lines':
          return h(
            'div',
            { class: 'spinner-lines' },
            h('div', { class: 'line' }),
            h('div', { class: 'line' }),
            h('div', { class: 'line' }),
            h('div', { class: 'line' }),
            h('div', { class: 'line' }),
            h('div', { class: 'line' }),
            h('div', { class: 'line' }),
            h('div', { class: 'line' }),
          );
        case 'three-dots':
          return h('div', { class: 'spinner-three-dots' }, h('span', { class: 'dot1' }), h('span', { class: 'dot2' }), h('span', { class: 'dot3' }));
        case 'pulse':
          return h('div', { class: 'spinner-pulse' });
        case 'loader':
          return h('div', { class: 'spinner-loader' });
        default:
          return null;
      }
    }
    render() {
      return h(
        'div',
        {
          key: 'df4b1aee0e1f6bac859baaf7ada7587f74906e9f',
          role: 'progressbar',
          class: classNames('tk-spin-container', {
            [this.orientation]: true,
            [this.size]: true,
          }),
        },
        this.renderSpinner(),
        this.label && h('div', { key: '5b6ea1fe0f3de3a76f28bcd2c9df238d70e89c95', class: 'tk-spinner-label' }, this.label),
      );
    }
    get el() {
      return this;
    }
    static get style() {
      return tkSpinnerScss;
    }
  },
  [
    1,
    'tk-spinner',
    {
      orientation: [1],
      size: [1],
      type: [1],
      label: [1],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-spinner'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-spinner':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkSpinner);
        }
        break;
    }
  });
}

export { TkSpinner as T, defineCustomElement as d };
//# sourceMappingURL=p-Dz92n4WS.js.map

//# sourceMappingURL=p-Dz92n4WS.js.map
