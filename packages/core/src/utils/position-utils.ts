import { computePosition, offset, flip, shift, arrow, autoUpdate, size, hide } from '@floating-ui/dom';

import type { Placement } from '@floating-ui/dom';
import { applyStyles } from './style-utils';

export interface FloatingElementOptions {
  placement: Placement;
  offset?: number;
  size?: any;
}

function getShadowHost(element: HTMLElement): HTMLElement | null {
  const rootNode = element.getRootNode();
  return rootNode instanceof ShadowRoot ? (rootNode.host as HTMLElement) : null;
}

function setFloatingHidden(floatingElement: HTMLElement, hidden: boolean, shadowHost?: HTMLElement | null) {
  floatingElement.classList.toggle('floating-hidden', hidden);
  const host = shadowHost === undefined ? getShadowHost(floatingElement) : shadowHost;
  host?.classList.toggle('floating-hidden', hidden);
}

function positionFloatingElement(
  triggerElement: HTMLElement,
  floatingElement: HTMLElement,
  arrowElement?: HTMLElement,
  options?: FloatingElementOptions,
  shadowHost?: HTMLElement | null,
) {
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

  const middleware = [
    offset(off),
    flip(),
    shift({ padding: 5 }),
    ...(arrowElement ? [arrow({ element: arrowElement, padding: 8 })] : []),
    ...(sizeOptions ? [size(sizeOptions)] : []),
    hide(),
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
      applyStyles(arrowElement, {
        left: ax != null ? `${ax}px` : '',
        top: ay != null ? `${ay}px` : '',
        right: '',
        bottom: '',
        [reverseSide]: '-5.7px',
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
      if (middlewareData.hide.referenceHidden) {
        setFloatingHidden(floatingElement, true, shadowHost);
      } else {
        setFloatingHidden(floatingElement, false, shadowHost);
      }
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
  const shadowHost = getShadowHost(floatingElement);
  const cleanup = autoUpdate(
    triggerElement,
    floatingElement,
    () => {
      positionFloatingElement(triggerElement, floatingElement, arrowElement, options, shadowHost).then(position => handlePlacement?.(position));
    },
    { animationFrame: true },
  );

  return () => {
    cleanup();
    floatingElement.classList.remove('floating-hidden');
    shadowHost?.classList.remove('floating-hidden');
  };
}
