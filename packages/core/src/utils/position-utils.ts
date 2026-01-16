import { computePosition, offset, flip, shift, arrow, autoUpdate, size, hide } from '@floating-ui/dom';

import type { Placement } from '@floating-ui/dom';
import { applyStyles } from './style-utils';

export interface FloatingElementOptions {
  placement: Placement;
  offset?: number;
  size?: any;
}

function positionFloatingElement(triggerElement: HTMLElement, floatingElement: HTMLElement, arrowElement?: HTMLElement, options?: FloatingElementOptions) {
  const { placement, offset: off = 8, size: sizeOptions } = options || {};

  if (arrowElement) {
    applyStyles(arrowElement, {
      position: 'absolute',
      width: '9px',
      height: '9px',
      background: 'inherit',
      border: '1px solid',
      borderColor: 'inherit',
      transform: 'rotate(45deg)',
      zIndex: '1300',
    });
  }

  const middleware = [offset(off), flip(), shift({ padding: 5 }), ...(arrowElement ? [arrow({ element: arrowElement })] : []), ...(sizeOptions ? [size(sizeOptions)] : []), hide()];

  return computePosition(triggerElement, floatingElement, {
    strategy: 'fixed',
    placement,
    middleware,
  }).then(({ x, y, middlewareData, placement }) => {
    floatingElement.style.left = `${x}px`;
    floatingElement.style.top = `${y}px`;

    const side = placement.split('-')[0];
    const reverseSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side];

    if (arrowElement && middlewareData.arrow) {
      const { x: ax, y: ay } = middlewareData.arrow;
      arrowElement.dataset.side = side;
      applyStyles(arrowElement, {
        left: ax != null ? `${ax}px` : '',
        top: ay != null ? `${ay}px` : '',
        right: '',
        bottom: '',
        [reverseSide]: '-6px',
      });

      const borderStyles = {
        top: { borderTop: 'none', borderLeft: 'none' },
        bottom: { borderBottom: 'none', borderRight: 'none' },
        left: { borderLeft: 'none', borderBottom: 'none' },
        right: { borderRight: 'none', borderTop: 'none' },
      };

      applyStyles(arrowElement, borderStyles[side]);
    }

    if (middlewareData.hide) {
      applyStyles(floatingElement, {
        visibility: middlewareData.hide.referenceHidden ? 'hidden' : 'visible',
      });
    }

    return placement;
  });
}

export function floatingElementAutoUpdate(
  triggerElement: HTMLElement,
  floatingElement: HTMLElement,
  arrowElement?: HTMLElement,
  options?: FloatingElementOptions,
  handlePlacement?: (placement: string) => void,
) {
  return autoUpdate(
    triggerElement,
    floatingElement,
    () => {
      positionFloatingElement(triggerElement, floatingElement, arrowElement, options).then(position => handlePlacement?.(position));
    },
    { animationFrame: true },
  );
}
