import { computePosition, offset, flip, shift, arrow, autoUpdate, size } from '@floating-ui/dom';

import type { Placement } from '@floating-ui/dom';
import { applyStyles } from './style-utils';

export interface FloatingElementOptions {
  placement: Placement;
  offset?: number;
  outSideOffset?: number;
  arrowSize?: number;
  shift?: any;
  size?: any;
}

function positionFloatingElement(triggerElement: HTMLElement, floatingElement: HTMLElement, options?: FloatingElementOptions, arrowElement?: HTMLElement) {
  const { placement, offset: off = 8, outSideOffset = 6, arrowSize = 9, shift: shiftOptions, size: sizeOptions } = options || {};

  if (arrowElement) {
    applyStyles(arrowElement, {
      position: 'absolute',
      width: `${arrowSize}px`,
      height: `${arrowSize}px`,
      background: 'inherit',
      border: '1px solid',
      borderColor: 'inherit',
      transform: 'rotate(45deg)',
      zIndex: '1300',
    });
  }

  const middleware = [
    offset(off),
    flip(),
    ...(shiftOptions ? [shift(shiftOptions)] : []),
    ...(sizeOptions ? [size(sizeOptions)] : []),
    ...(arrowElement ? [arrow({ element: arrowElement })] : []),
  ];

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
      Object.assign(arrowElement.style, {
        left: ax != null ? `${ax}px` : '',
        top: ay != null ? `${ay}px` : '',
        right: '',
        bottom: '',
        [reverseSide]: `-${outSideOffset}px`,
      });

      const borderStyles = {
        top: { borderTop: 'none', borderLeft: 'none' },
        bottom: { borderBottom: 'none', borderRight: 'none' },
        left: { borderLeft: 'none', borderBottom: 'none' },
        right: { borderRight: 'none', borderTop: 'none' },
      };

      applyStyles(arrowElement, borderStyles[side]);
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
      positionFloatingElement(triggerElement, floatingElement, options, arrowElement).then(position => handlePlacement?.(position));
    },
    { animationFrame: true },
  );
}
