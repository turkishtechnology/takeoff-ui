/**
 * Updates arrow position based on placement side
 * @param arrowElement - The arrow element to position
 * @param side - The side where the arrow should be positioned
 */
export const updateArrowPosition = (arrowElement: HTMLElement, side: string) => {
  // Reset all positions
  arrowElement.style.top = '';
  arrowElement.style.bottom = '';
  arrowElement.style.left = '';
  arrowElement.style.right = '';
  arrowElement.style.borderTop = '';
  arrowElement.style.borderBottom = '';
  arrowElement.style.borderLeft = '';
  arrowElement.style.borderRight = '';

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
      arrowElement.style.borderLeft = 'none';
      arrowElement.style.borderTop = 'none';
      break;
    case 'right':
      arrowElement.style.left = '-5px';
      arrowElement.style.borderRight = 'none';
      arrowElement.style.borderBottom = 'none';
      break;
  }
};
