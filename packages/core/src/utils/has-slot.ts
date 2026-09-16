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

/**
 * Checks if an element has a *direct child* assigned to the given slot.
 *
 * Unlike {@link hasSlot}, this does not match nested descendants, so a slotted element
 * belonging to an inner component is not mistaken for this host's own content. Equivalent to
 * `el.querySelector(':scope > [slot="name"]')`, which Stencil's mock-doc cannot parse.
 *
 * @param el - The host element to check.
 * @param name - The slot name.
 * @returns True if a direct child carries the slot, false otherwise.
 */
export const hasDirectSlot = (el: HTMLElement, name: string): boolean => {
  if (!el) return false;

  return Array.from(el.children).some(child => child.getAttribute('slot') === name);
};
