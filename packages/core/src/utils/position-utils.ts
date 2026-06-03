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
        floatingElement.classList.add('floating-hidden');
      } else {
        floatingElement.classList.remove('floating-hidden');
      }
    }

    return placement;
  });
}

/**
 * If the trigger lives inside a tk-table sticky `<td>`, return that td.
 * Walks up through shadow DOM boundaries until it either finds the td
 * or leaves the tk-table scope.
 */
function findTableStickyTd(el: HTMLElement): HTMLElement | null {
  let node: Node = el;

  while (node) {
    const root = node.getRootNode();
    if (!(root instanceof ShadowRoot)) return null;

    const host = root.host as HTMLElement;
    if (host.tagName === 'TK-TABLE') {
      // in tk-table's shadow root — look for the sticky td
      const td = (node as HTMLElement).closest?.('td') as HTMLElement | null;
      return td?.style.zIndex && getComputedStyle(td).position === 'sticky' ? td : null;
    }
    node = host;
  }
  return null;
}

/** The z-index value applied to a sticky td while a floating element is open. */
const RAISED_Z_INDEX = '101';

export function floatingElementAutoUpdate(
  triggerElement: HTMLElement,
  floatingElement: HTMLElement,
  arrowElement?: HTMLElement,
  options?: FloatingElementOptions,
  handlePlacement?: (placement: string) => void,
) {
  // Raise the z-index of any sticky td inside tk-table so the floating
  // element is not trapped behind the sticky thead stacking context.
  const stickyTd = findTableStickyTd(triggerElement);
  let originalZIndex: string | undefined;
  if (stickyTd) {
    originalZIndex = stickyTd.style.zIndex;
    stickyTd.style.zIndex = RAISED_Z_INDEX;
  }

  const cleanupAutoUpdate = autoUpdate(
    triggerElement,
    floatingElement,
    () => {
      positionFloatingElement(triggerElement, floatingElement, arrowElement, options).then(position => handlePlacement?.(position));
    },
    { animationFrame: true },
  );

  // Return a cleanup function that also restores the original z-index.
  return () => {
    cleanupAutoUpdate();
    if (stickyTd) {
      stickyTd.style.zIndex = originalZIndex ?? '';
    }
  };
}
