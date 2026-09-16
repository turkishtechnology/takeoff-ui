import { hasSlot, hasDirectSlot } from '../has-slot';

describe('has-slot', () => {
  describe('hasSlot', () => {
    it('returns false when el is null', () => {
      expect(hasSlot(null as any)).toBe(false);
    });

    it('returns false when el is undefined', () => {
      expect(hasSlot(undefined as any)).toBe(false);
    });

    describe('named slots', () => {
      it('returns true when a child with the matching slot attribute exists', () => {
        const el = document.createElement('div');
        const child = document.createElement('span');
        child.setAttribute('slot', 'footer');
        el.appendChild(child);

        expect(hasSlot(el, 'footer')).toBe(true);
      });

      it('returns false when no child has the requested slot name', () => {
        const el = document.createElement('div');
        const child = document.createElement('span');
        child.setAttribute('slot', 'header');
        el.appendChild(child);

        expect(hasSlot(el, 'footer')).toBe(false);
      });

      it('returns false for a named slot on an empty element', () => {
        const el = document.createElement('div');

        expect(hasSlot(el, 'footer')).toBe(false);
      });

      it('finds named slot content in nested descendants', () => {
        const el = document.createElement('div');
        const wrapper = document.createElement('div');
        const child = document.createElement('span');
        child.setAttribute('slot', 'footer');
        wrapper.appendChild(child);
        el.appendChild(wrapper);

        expect(hasSlot(el, 'footer')).toBe(true);
      });
    });

    describe('default (unnamed) slot', () => {
      it('returns false for an element without children', () => {
        const el = document.createElement('div');

        expect(hasSlot(el)).toBe(false);
      });

      it('returns true for a non-empty text node child', () => {
        const el = document.createElement('div');
        el.appendChild(document.createTextNode('hello'));

        expect(hasSlot(el)).toBe(true);
      });

      it('returns false for a whitespace-only text node child', () => {
        const el = document.createElement('div');
        el.appendChild(document.createTextNode('   \n  '));

        expect(hasSlot(el)).toBe(false);
      });

      it('returns true for an element child without a slot attribute', () => {
        const el = document.createElement('div');
        el.appendChild(document.createElement('span'));

        expect(hasSlot(el)).toBe(true);
      });

      it('returns false for an element child assigned to a named slot', () => {
        const el = document.createElement('div');
        const child = document.createElement('span');
        child.setAttribute('slot', 'footer');
        el.appendChild(child);

        expect(hasSlot(el)).toBe(false);
      });

      it('returns false for a template element child', () => {
        const el = document.createElement('div');
        el.appendChild(document.createElement('template'));

        expect(hasSlot(el)).toBe(false);
      });

      it('treats a text-like node with null textContent as content (current behavior)', () => {
        // `node.textContent?.trim() !== ''` evaluates to `undefined !== ''`,
        // which is true, so a null textContent counts as slot content.
        const el = {
          childNodes: [{ nodeType: Node.TEXT_NODE, textContent: null }],
        } as unknown as HTMLElement;

        expect(hasSlot(el)).toBe(true);
      });

      it('returns false for a comment node child', () => {
        const el = document.createElement('div');
        el.appendChild(document.createComment('note'));

        expect(hasSlot(el)).toBe(false);
      });

      it('returns true when a valid child appears among ignored nodes', () => {
        const el = document.createElement('div');
        el.appendChild(document.createComment('note'));
        el.appendChild(document.createTextNode('  '));
        const named = document.createElement('span');
        named.setAttribute('slot', 'footer');
        el.appendChild(named);
        el.appendChild(document.createElement('p'));

        expect(hasSlot(el)).toBe(true);
      });
    });
  });

  describe('hasDirectSlot', () => {
    it('returns false when el is null or undefined', () => {
      expect(hasDirectSlot(null as any, 'footer')).toBe(false);
      expect(hasDirectSlot(undefined as any, 'footer')).toBe(false);
    });

    it('returns true for a direct child carrying the slot', () => {
      const el = document.createElement('div');
      const child = document.createElement('span');
      child.setAttribute('slot', 'footer');
      el.appendChild(child);

      expect(hasDirectSlot(el, 'footer')).toBe(true);
    });

    it('returns false when the slot name does not match', () => {
      const el = document.createElement('div');
      const child = document.createElement('span');
      child.setAttribute('slot', 'header');
      el.appendChild(child);

      expect(hasDirectSlot(el, 'footer')).toBe(false);
    });

    it('returns false for an empty element', () => {
      expect(hasDirectSlot(document.createElement('div'), 'footer')).toBe(false);
    });

    // The whole point of this helper over `hasSlot`: a nested component's slotted content
    // must not be claimed by the outer host.
    it('ignores slotted content nested deeper than a direct child', () => {
      const el = document.createElement('div');
      const wrapper = document.createElement('div');
      const child = document.createElement('span');
      child.setAttribute('slot', 'footer');
      wrapper.appendChild(child);
      el.appendChild(wrapper);

      expect(hasDirectSlot(el, 'footer')).toBe(false);
      expect(hasSlot(el, 'footer')).toBe(true);
    });

    it('ignores children with no slot attribute', () => {
      const el = document.createElement('div');
      el.appendChild(document.createElement('p'));

      expect(hasDirectSlot(el, 'footer')).toBe(false);
    });

    it('finds the slot among several direct children', () => {
      const el = document.createElement('div');
      el.appendChild(document.createElement('p'));
      const header = document.createElement('span');
      header.setAttribute('slot', 'header');
      el.appendChild(header);
      const footer = document.createElement('span');
      footer.setAttribute('slot', 'footer');
      el.appendChild(footer);

      expect(hasDirectSlot(el, 'footer')).toBe(true);
      expect(hasDirectSlot(el, 'header')).toBe(true);
    });
  });
});
