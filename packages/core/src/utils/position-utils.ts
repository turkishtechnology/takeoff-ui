import { applyStyles, resetBorderStyles } from './style-utils';

/**
 * Updates arrow position based on placement side
 * @param arrowElement - The arrow element to position
 * @param side - The side where the arrow should be positioned
 */
export const updateArrowPosition = (arrowElement: HTMLElement, side?: string) => {
  // Reset all positions and borders
  applyStyles(arrowElement, {
    top: '',
    bottom: '',
    left: '',
    right: '',
  });
  resetBorderStyles(arrowElement);

  switch (side) {
    case 'top':
      applyStyles(arrowElement, {
        bottom: '-5px',
        borderTop: 'none',
        borderLeft: 'none',
      });
      break;
    case 'bottom':
      applyStyles(arrowElement, {
        top: '-5px',
        borderBottom: 'none',
        borderRight: 'none',
      });
      break;
    case 'left':
      applyStyles(arrowElement, {
        right: '-5px',
        borderLeft: 'none',
        borderTop: 'none',
      });
      break;
    case 'right':
      applyStyles(arrowElement, {
        left: '-5px',
        borderRight: 'none',
        borderBottom: 'none',
      });
      break;
  }
};
