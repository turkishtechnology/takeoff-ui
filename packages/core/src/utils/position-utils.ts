import { computePosition, offset, flip, shift, arrow, autoUpdate } from '@floating-ui/dom';

import type { Placement } from '@floating-ui/dom';
import { applyStyles } from './style-utils';

export interface FloatingElementOptions {
  placement: Placement;
  offset?: number;
  outSideOffset?: number;
  arrowSize?: number;
}

function positionFloatingElement(triggerElement: HTMLElement, floatingElement: HTMLElement, arrowElement: HTMLElement, options: FloatingElementOptions) {
  const { placement, offset: off = 8, outSideOffset = 6, arrowSize = 9 } = options;

  applyStyles(arrowElement, {
    position: 'absolute',
    width: `${arrowSize}px`,
    height: `${arrowSize}px`,
    background: 'inherit',
    border: `1px solid`,
    borderColor: `inherit`,
    transform: 'rotate(45deg)',
    zIndex: '1300',
  });

  return computePosition(triggerElement, floatingElement, {
    strategy: 'fixed',
    placement,
    middleware: [offset(off), flip(), shift(), arrow({ element: arrowElement })],
  }).then(({ x, y, middlewareData, placement }) => {
    floatingElement.style.left = `${x}px`;
    floatingElement.style.top = `${y}px`;

    const side = placement.split('-')[0];
    const reverseSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side];

    if (middlewareData.arrow) {
      const { x: ax, y: ay } = middlewareData.arrow;
      arrowElement.setAttribute('data-side', side);
      Object.assign(arrowElement.style, {
        left: ax != null ? `${ax}px` : '',
        top: ay != null ? `${ay}px` : '',
        right: '',
        bottom: '',
        [reverseSide]: `-${outSideOffset}px`,
      });
    }

    switch (side) {
      case 'top':
        applyStyles(arrowElement, {
          borderTop: 'none',
          borderLeft: 'none',
        });
        break;
      case 'bottom':
        applyStyles(arrowElement, {
          borderBottom: 'none',
          borderRight: 'none',
        });
        break;

      case 'left':
        applyStyles(arrowElement, {
          borderLeft: 'none',
          borderBottom: 'none',
        });
        break;

      case 'right':
        applyStyles(arrowElement, {
          borderRight: 'none',
          borderTop: 'none',
        });
        break;
    }
    return placement;
  });
}

export function floatingElementAutoUpdate(
  triggerElement: HTMLElement,
  floatingElement: HTMLElement,
  arrowElement: HTMLElement,
  options: FloatingElementOptions,
  handlePlacement?: (placement: string) => void,
) {
  return autoUpdate(
    triggerElement,
    floatingElement,
    () => {
      positionFloatingElement(triggerElement, floatingElement, arrowElement, options).then(position => handlePlacement && handlePlacement(position));
    },
    { animationFrame: true },
  );
}
