import { applyStyles, resetBorderStyles } from './style-utils';

interface ArrowOptions {
  padding?: number; // space from content edge for clamping
  arrowSize?: number; // square size (rotated diamond)
  clampTolerance?: number; // if ideal pos differs more than this from clamped, fall back to center
}

/**
 * Dynamically positions the arrow relative to the trigger element based on placement.
 * Calculates cross‑axis alignment (center / start / end) using trigger & floating rects
 * and applies main‑axis offset & border trimming for visual arrow direction.
 */
export const updateArrowPosition = (arrowElement: HTMLElement, triggerElement: HTMLElement, floatingElement?: HTMLElement, placement?: string, options: ArrowOptions = {}) => {
  if (!arrowElement || !triggerElement || !floatingElement || !placement) return;

  const { padding = 8, arrowSize = 9, clampTolerance = 6 } = options;
  const half = arrowSize / 2;

  // Reset previous styles
  applyStyles(arrowElement, { top: '', bottom: '', left: '', right: '', borderTop: '', borderLeft: '', borderRight: '', borderBottom: '' });
  resetBorderStyles(arrowElement);

  const triggerRect = triggerElement.getBoundingClientRect();
  const floatingRect = floatingElement.getBoundingClientRect();
  const side = placement.split('-')[0];
  const variation = placement.split('-')[1]; // start | end | undefined

  let crossAxisPos = 0; // left for top/bottom, top for left/right
  let ideal: number; // ideal (unclamped) position
  let clampMin: number;
  let clampMax: number;

  if (side === 'top' || side === 'bottom') {
    // Horizontal alignment within floating
    if (variation === 'start') {
      ideal = triggerRect.left - floatingRect.left + padding;
    } else if (variation === 'end') {
      ideal = triggerRect.right - floatingRect.left - arrowSize - padding;
    } else {
      ideal = triggerRect.left + triggerRect.width / 2 - floatingRect.left - half;
    }
    clampMin = padding;
    clampMax = floatingRect.width - arrowSize - padding;
    crossAxisPos = Math.min(Math.max(ideal, clampMin), clampMax);
    // Fallback to center if deviation too large (content shrunk / trigger off-center)
    if (Math.abs(crossAxisPos - ideal) > clampTolerance && !variation) {
      crossAxisPos = floatingRect.width / 2 - half;
    }
  } else if (side === 'left' || side === 'right') {
    // Vertical alignment within floating
    if (variation === 'start') {
      ideal = triggerRect.top - floatingRect.top + padding;
    } else if (variation === 'end') {
      ideal = triggerRect.bottom - floatingRect.top - arrowSize - padding;
    } else {
      ideal = triggerRect.top + triggerRect.height / 2 - floatingRect.top - half;
    }
    clampMin = padding;
    clampMax = floatingRect.height - arrowSize - padding;
    crossAxisPos = Math.min(Math.max(ideal, clampMin), clampMax);
    if (Math.abs(crossAxisPos - ideal) > clampTolerance && !variation) {
      crossAxisPos = floatingRect.height / 2 - half;
    }
  }

  // Apply cross‑axis position
  if (side === 'top' || side === 'bottom') {
    applyStyles(arrowElement, { left: `${crossAxisPos}px` });
  } else {
    applyStyles(arrowElement, { top: `${crossAxisPos}px` });
  }

  // Main‑axis offset & border trimming for arrow direction
  switch (side) {
    case 'top':
      applyStyles(arrowElement, { bottom: `${-half}px`, borderTop: 'none', borderLeft: 'none' });
      break;
    case 'bottom':
      applyStyles(arrowElement, { top: `${-half}px`, borderBottom: 'none', borderRight: 'none' });
      break;
    case 'left':
      applyStyles(arrowElement, { right: `${-half}px`, borderLeft: 'none', borderBottom: 'none' });
      break;
    case 'right':
      applyStyles(arrowElement, { left: `${-half}px`, borderRight: 'none', borderTop: 'none' });
      break;
  }
};
