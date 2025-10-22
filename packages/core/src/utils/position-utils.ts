import { applyStyles, resetBorderStyles } from './style-utils';

/**
 * Updates arrow position based on placement side
 * @param arrowElement - The arrow element to position
 * @param side - The side where the arrow should be positioned
 */
export const updateArrowPosition = (arrowElement: HTMLElement, placement?: string) => {
  // Reset all positions and borders
  applyStyles(arrowElement, {
    top: '',
    bottom: '',
    left: '',
    right: '',
  });
  resetBorderStyles(arrowElement);

  switch (placement) {
    case 'top':
      applyStyles(arrowElement, {
        bottom: '-5px',
        left: '50%',
        borderTop: 'none',
        borderLeft: 'none',
      });
      break;
    case 'top-start':
      applyStyles(arrowElement, {
        bottom: '-5px',
        left: '12px',
        borderTop: 'none',
        borderLeft: 'none',
      });
      break;
    case 'top-end':
      applyStyles(arrowElement, {
        bottom: '-5px',
        right: '12px',
        borderTop: 'none',
        borderLeft: 'none',
      });
      break;

    case 'bottom':
      applyStyles(arrowElement, {
        top: '-5px',
        left: '50%',
        borderBottom: 'none',
        borderRight: 'none',
      });
      break;
    case 'bottom-start':
      applyStyles(arrowElement, {
        top: '-5px',
        left: '12px',
        borderBottom: 'none',
        borderRight: 'none',
      });
      break;
    case 'bottom-end':
      applyStyles(arrowElement, {
        top: '-5px',
        right: '12px',
        borderBottom: 'none',
        borderRight: 'none',
      });
      break;

    case 'left':
      applyStyles(arrowElement, {
        right: '-5px',
        top: '50%',
        borderLeft: 'none',
        borderBottom: 'none',
      });
      break;
    case 'left-start':
      applyStyles(arrowElement, {
        right: '-5px',
        top: '12px',
        borderLeft: 'none',
        borderBottom: 'none',
      });
      break;
    case 'left-end':
      applyStyles(arrowElement, {
        right: '-5px',
        bottom: '12px',
        borderLeft: 'none',
        borderBottom: 'none',
      });
      break;

    case 'right':
      applyStyles(arrowElement, {
        left: '-5px',
        top: '50%',
        borderRight: 'none',
        borderTop: 'none',
      });
      break;
    case 'right-start':
      applyStyles(arrowElement, {
        left: '-5px',
        top: '12px',
        borderRight: 'none',
        borderTop: 'none',
      });
      break;
    case 'right-end':
      applyStyles(arrowElement, {
        left: '-5px',
        bottom: '12px',
        borderRight: 'none',
        borderTop: 'none',
      });
      break;
  }
};
