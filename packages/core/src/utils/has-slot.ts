/**
 * Checks if an element has a slot with the given name, or any slot if no name is provided.
 *
 * @param el - The host element to check.
 * @param name - Optional slot name.
 * @returns True if the slot exists, false otherwise.
 */
export const hasSlot = (el: HTMLElement, name?: string): boolean => {
  if (!el) return false;

  if (name) {
    return el.querySelector(`[slot="${name}"]`) !== null;
  }

  return Array.from(el.childNodes).some(node => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') {
      return true;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      if (element.tagName.toLowerCase() !== 'template' && !element.hasAttribute('slot')) {
        return true;
      }
    }
    return false;
  });
};
