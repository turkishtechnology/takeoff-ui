/**
 * Utility functions for common styling operations
 */

/**
 * Applies styles to an element using Object.assign
 * @param element - The HTML element to style
 * @param styles - The styles to apply as a key-value object
 */
export const applyStyles = (element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void => {
  Object.assign(element.style, styles);
};

/**
 * Resets border styles on an element
 * @param element - The HTML element to reset
 */
export const resetBorderStyles = (element: HTMLElement): void => {
  applyStyles(element, {
    borderTop: '',
    borderBottom: '',
    borderLeft: '',
    borderRight: '',
  });
};

/**
 * Sets fixed positioning on an element
 * @param element - The HTML element to position
 * @param x - The x coordinate
 * @param y - The y coordinate
 */
export const setFixedPosition = (element: HTMLElement, x: number, y: number): void => {
  applyStyles(element, {
    position: 'fixed',
    left: `${x}px`,
    top: `${y}px`,
  });
};

/**
 * Shows an element by setting display and visibility
 * @param element - The HTML element to show
 * @param display - The display value to use (default: 'block')
 */
export const showElement = (element: HTMLElement, display: string = 'block'): void => {
  applyStyles(element, {
    display,
    visibility: 'visible',
    opacity: '1',
  });
};

/**
 * Hides an element by setting display and visibility
 * @param element - The HTML element to hide
 */
export const hideElement = (element: HTMLElement): void => {
  applyStyles(element, {
    display: 'none',
    visibility: 'hidden',
    opacity: '0',
  });
};
