import { applyStyles, resetBorderStyles, setFixedPosition, showElement, hideElement } from '../style-utils';

describe('style-utils', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  describe('applyStyles', () => {
    it('applies the given styles to the element', () => {
      applyStyles(element, { color: 'red', display: 'flex' });

      expect(element.style.color).toBe('red');
      expect(element.style.display).toBe('flex');
    });

    it('keeps previously set styles that are not overridden', () => {
      element.style.margin = '4px';

      applyStyles(element, { color: 'blue' });

      expect(element.style.margin).toBe('4px');
      expect(element.style.color).toBe('blue');
    });
  });

  describe('resetBorderStyles', () => {
    it('clears all four border styles', () => {
      element.style.borderTop = '1px solid red';
      element.style.borderBottom = '1px solid red';
      element.style.borderLeft = '1px solid red';
      element.style.borderRight = '1px solid red';

      resetBorderStyles(element);

      expect(element.style.borderTop).toBe('');
      expect(element.style.borderBottom).toBe('');
      expect(element.style.borderLeft).toBe('');
      expect(element.style.borderRight).toBe('');
    });
  });

  describe('setFixedPosition', () => {
    it('sets fixed positioning with pixel coordinates', () => {
      setFixedPosition(element, 10, 20);

      expect(element.style.position).toBe('fixed');
      expect(element.style.left).toBe('10px');
      expect(element.style.top).toBe('20px');
    });

    it('supports zero and negative coordinates', () => {
      setFixedPosition(element, 0, -5);

      expect(element.style.left).toBe('0px');
      expect(element.style.top).toBe('-5px');
    });
  });

  describe('showElement', () => {
    it('shows the element with the default display value', () => {
      showElement(element);

      expect(element.style.display).toBe('block');
      expect(element.style.visibility).toBe('visible');
      expect(element.style.opacity).toBe('1');
    });

    it('shows the element with a custom display value', () => {
      showElement(element, 'inline-flex');

      expect(element.style.display).toBe('inline-flex');
      expect(element.style.visibility).toBe('visible');
      expect(element.style.opacity).toBe('1');
    });
  });

  describe('hideElement', () => {
    it('hides the element', () => {
      hideElement(element);

      expect(element.style.display).toBe('none');
      expect(element.style.visibility).toBe('hidden');
      expect(element.style.opacity).toBe('0');
    });
  });
});
