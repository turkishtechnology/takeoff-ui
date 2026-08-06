import { ClickOutsideMixin, ClickOutsideConfig } from '../clickoutside-mixin';

const createClickEvent = (path: EventTarget[]): MouseEvent => {
  const event = new MouseEvent('click', { bubbles: true });
  Object.defineProperty(event, 'composedPath', { value: () => path });
  return event;
};

describe('clickoutside-mixin', () => {
  let reference: HTMLElement;
  let ignored: HTMLElement;
  let outside: HTMLElement;
  let handler: jest.Mock;
  let mixins: ClickOutsideMixin[];

  const createMixin = (config: Partial<ClickOutsideConfig>): ClickOutsideMixin => {
    const mixin = new ClickOutsideMixin(config);
    mixins.push(mixin);
    return mixin;
  };

  beforeEach(() => {
    reference = document.createElement('div');
    ignored = document.createElement('div');
    outside = document.createElement('div');
    handler = jest.fn();
    mixins = [];
  });

  afterEach(() => {
    mixins.forEach(mixin => mixin.disconnectedCallback());
  });

  describe('constructor validation', () => {
    it('throws when referenceElement is missing', () => {
      const addSpy = jest.spyOn(window, 'addEventListener');

      expect(() => createMixin({ handler })).toThrow('Reference element must be provided');

      // Current behavior: the constructor binds the window listener before
      // validation throws, so detach it to keep other tests isolated.
      addSpy.mock.calls.forEach(([type, listener, options]) => {
        if (type === 'click') window.removeEventListener('click', listener as EventListener, options as boolean);
      });
      addSpy.mockRestore();
    });

    it('throws when handler is missing', () => {
      const addSpy = jest.spyOn(window, 'addEventListener');

      expect(() => createMixin({ referenceElement: reference })).toThrow('Handler must be provided');

      addSpy.mock.calls.forEach(([type, listener, options]) => {
        if (type === 'click') window.removeEventListener('click', listener as EventListener, options as boolean);
      });
      addSpy.mockRestore();
    });

    it('throws when constructed without any config', () => {
      const addSpy = jest.spyOn(window, 'addEventListener');

      expect(() => {
        const mixin = new ClickOutsideMixin();
        mixins.push(mixin);
      }).toThrow('Reference element must be provided');

      addSpy.mock.calls.forEach(([type, listener, options]) => {
        if (type === 'click') window.removeEventListener('click', listener as EventListener, options as boolean);
      });
      addSpy.mockRestore();
    });

    it('does not bind a listener before throwing when constructed as disabled', () => {
      const addSpy = jest.spyOn(window, 'addEventListener');

      expect(() => createMixin({ disabled: true })).toThrow('Reference element must be provided');
      expect(addSpy.mock.calls.filter(([type]) => type === 'click').length).toBe(0);

      addSpy.mockRestore();
    });
  });

  describe('click detection', () => {
    it('calls the handler for a click outside the reference element', () => {
      createMixin({ referenceElement: reference, handler });

      const event = createClickEvent([outside, document.body, window]);
      window.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(event);
    });

    it('does not call the handler for a click inside the reference element', () => {
      createMixin({ referenceElement: reference, handler });

      window.dispatchEvent(createClickEvent([reference, document.body, window]));

      expect(handler).not.toHaveBeenCalled();
    });

    it('does not call the handler for a click on an ignored element', () => {
      createMixin({ referenceElement: reference, handler, ignoredElements: [ignored] });

      window.dispatchEvent(createClickEvent([ignored, document.body, window]));

      expect(handler).not.toHaveBeenCalled();
    });

    it('calls the handler when the click path contains neither reference nor ignored elements', () => {
      createMixin({ referenceElement: reference, handler, ignoredElements: [ignored] });

      window.dispatchEvent(createClickEvent([outside, document.body, window]));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('does not fail when ignoredElements is explicitly undefined', () => {
      createMixin({ referenceElement: reference, handler, ignoredElements: undefined });

      window.dispatchEvent(createClickEvent([outside, document.body, window]));

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('listener lifecycle', () => {
    it('registers the window listener with capture by default', () => {
      const addSpy = jest.spyOn(window, 'addEventListener');

      createMixin({ referenceElement: reference, handler });

      expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function), true);
      addSpy.mockRestore();
    });

    it('registers the window listener without capture when useCapture is false', () => {
      const addSpy = jest.spyOn(window, 'addEventListener');

      createMixin({ referenceElement: reference, handler, useCapture: false });

      expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function), false);
      addSpy.mockRestore();
    });

    it('does not bind the listener when constructed with disabled: true', () => {
      createMixin({ referenceElement: reference, handler, disabled: true });

      window.dispatchEvent(createClickEvent([outside, document.body, window]));

      expect(handler).not.toHaveBeenCalled();
    });

    it('binds the listener only once for repeated bind calls', () => {
      const addSpy = jest.spyOn(window, 'addEventListener');
      const mixin = createMixin({ referenceElement: reference, handler });

      (mixin as any).bindListener();
      (mixin as any).bindListener();

      expect(addSpy.mock.calls.filter(([type]) => type === 'click').length).toBe(1);
      addSpy.mockRestore();
    });

    it('unbinds the listener only once for repeated unbind calls', () => {
      const removeSpy = jest.spyOn(window, 'removeEventListener');
      const mixin = createMixin({ referenceElement: reference, handler });

      (mixin as any).unbindListener();
      (mixin as any).unbindListener();

      expect(removeSpy.mock.calls.filter(([type]) => type === 'click').length).toBe(1);
      removeSpy.mockRestore();
    });

    it('unbinds on updateConfig({ disabled: true }) and rebinds on re-enable', () => {
      const mixin = createMixin({ referenceElement: reference, handler });

      mixin.updateConfig({ disabled: true });
      window.dispatchEvent(createClickEvent([outside, document.body, window]));
      expect(handler).not.toHaveBeenCalled();

      mixin.updateConfig({ disabled: false });
      window.dispatchEvent(createClickEvent([outside, document.body, window]));
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('applies updated ignoredElements to subsequent clicks', () => {
      const mixin = createMixin({ referenceElement: reference, handler });

      mixin.updateConfig({ ignoredElements: [ignored] });
      window.dispatchEvent(createClickEvent([ignored, document.body, window]));

      expect(handler).not.toHaveBeenCalled();
    });

    it('stops listening after disconnectedCallback', () => {
      const mixin = createMixin({ referenceElement: reference, handler });

      mixin.disconnectedCallback();
      window.dispatchEvent(createClickEvent([outside, document.body, window]));

      expect(handler).not.toHaveBeenCalled();
    });

    it('tolerates disconnectedCallback when the listener was never bound', () => {
      const mixin = createMixin({ referenceElement: reference, handler, disabled: true });

      expect(() => mixin.disconnectedCallback()).not.toThrow();
    });
  });
});
