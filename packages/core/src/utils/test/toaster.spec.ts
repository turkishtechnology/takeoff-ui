import { createToast, showPersistentToast, isPersistentToastVisible, dismissAllPersistentToasts, IToast } from '../toaster';

const baseOptions: IToast = {
  variant: 'success',
  type: 'filled',
};

const getToaster = (position = 'top-right'): HTMLElement | null => document.querySelector(`.tk-toaster.${position}`);
const getToasts = (): HTMLElement[] => Array.from(document.querySelectorAll('.tk-toast'));
const getAlert = (): any => document.querySelector('tk-alert');

describe('toaster', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    dismissAllPersistentToasts();
    jest.runAllTimers();
    jest.useRealTimers();
    document.body.innerHTML = '';
  });

  describe('createToast', () => {
    it('creates a toaster container and a toast in the default top-right position', () => {
      createToast({ ...baseOptions });

      const toaster = getToaster('top-right');
      expect(toaster).not.toBeNull();
      expect(toaster.querySelector('.tk-toast')).not.toBeNull();
      expect(toaster.querySelector('tk-alert')).not.toBeNull();
    });

    it('falls back to top-right for an invalid position', () => {
      createToast({ ...baseOptions, position: 'center' });

      expect(getToaster('top-right')).not.toBeNull();
      expect(getToaster('center')).toBeNull();
    });

    it('uses a valid custom position', () => {
      createToast({ ...baseOptions, position: 'bottom-left' });

      expect(getToaster('bottom-left')).not.toBeNull();
    });

    it('reuses an existing toaster container for the same position', () => {
      createToast({ ...baseOptions });
      createToast({ ...baseOptions });

      expect(document.querySelectorAll('.tk-toaster').length).toBe(1);
      expect(getToasts().length).toBe(2);
    });

    it('sets type and variant as attributes on the alert', () => {
      createToast({ ...baseOptions, type: 'outlined', variant: 'danger' });

      const alert = getAlert();
      expect(alert.getAttribute('type')).toBe('outlined');
      expect(alert.getAttribute('variant')).toBe('danger');
    });

    it('assigns optional properties on the alert element when provided', () => {
      createToast({
        ...baseOptions,
        header: 'Header',
        message: 'Message',
        alignItems: 'center',
        icon: 'info',
        iconSize: 'large',
        removable: true,
        containerStyle: { backgroundColor: 'red' },
      });

      const alert = getAlert();
      expect(alert.header).toBe('Header');
      expect(alert.message).toBe('Message');
      expect(alert.alignItems).toBe('center');
      expect(alert.icon).toBe('info');
      expect(alert.iconSize).toBe('large');
      expect(alert.removable).toBe(true);
      expect(alert.containerStyle).toEqual({ backgroundColor: 'red' });
    });

    it('skips optional properties when they are not provided', () => {
      createToast({ ...baseOptions });

      const alert = getAlert();
      expect(alert.header).toBeUndefined();
      expect(alert.message).toBeUndefined();
      expect(alert.icon).toBeUndefined();
      expect(alert.removable).toBeUndefined();
    });

    it('renders action buttons with defaults and wires tk-click to the action', () => {
      const action = jest.fn();
      createToast({
        ...baseOptions,
        actions: [
          { label: 'Undo', icon: 'undo', action },
          { label: 'Close', variant: 'secondary', type: 'text', size: 'small' },
        ],
      });

      const slot = document.querySelector('[slot="footer-action"]') as HTMLElement;
      expect(slot).not.toBeNull();
      expect(slot.style.display).toBe('flex');
      expect(slot.style.gap).toBe('8px');

      const buttons = Array.from(slot.querySelectorAll('tk-button')) as any[];
      expect(buttons.length).toBe(2);
      expect(buttons[0].label).toBe('Undo');
      expect(buttons[0].icon).toBe('undo');
      expect(buttons[0].variant).toBe('primary');
      expect(buttons[0].type).toBe('filled');
      expect(buttons[0].size).toBe('base');
      expect(buttons[1].variant).toBe('secondary');
      expect(buttons[1].type).toBe('text');
      expect(buttons[1].size).toBe('small');

      buttons[0].dispatchEvent(new Event('tk-click'));
      expect(action).toHaveBeenCalledTimes(1);

      expect(() => buttons[1].dispatchEvent(new Event('tk-click'))).not.toThrow();
    });

    it('opens the toast after 1ms and removes it after the default 6000ms timeout', () => {
      createToast({ ...baseOptions });

      const toast = getToasts()[0];
      expect(toast.classList.contains('open')).toBe(false);

      jest.advanceTimersByTime(1);
      expect(toast.classList.contains('open')).toBe(true);

      jest.advanceTimersByTime(6000);
      expect(toast.classList.contains('open')).toBe(false);
      expect(document.body.contains(toast)).toBe(true);

      jest.advanceTimersByTime(300);
      expect(document.body.contains(toast)).toBe(false);
      expect(getAlert()).toBeNull();
    });

    it('respects a custom timeout', () => {
      createToast({ ...baseOptions, timeout: 1000 });

      jest.advanceTimersByTime(1001);
      expect(getToasts()[0].classList.contains('open')).toBe(false);

      jest.advanceTimersByTime(300);
      expect(getToasts().length).toBe(0);
    });

    it('does not auto-remove a persistent toast', () => {
      createToast({ ...baseOptions, persistent: true });

      jest.advanceTimersByTime(10000);

      const toast = getToasts()[0];
      expect(toast).toBeDefined();
      expect(toast.classList.contains('open')).toBe(true);
    });
  });

  describe('showPersistentToast', () => {
    it('creates a persistent toast and returns true', () => {
      const result = showPersistentToast({
        ...baseOptions,
        persistentId: 'p1',
        header: 'Hi',
        message: 'Details',
        alignItems: 'end',
        icon: 'warning',
        iconSize: 'small',
      });

      expect(result).toBe(true);
      expect(getToaster('top-right')).not.toBeNull();

      const alert = getAlert();
      expect(alert.header).toBe('Hi');
      expect(alert.message).toBe('Details');
      expect(alert.alignItems).toBe('end');
      expect(alert.icon).toBe('warning');
      expect(alert.iconSize).toBe('small');
      expect(alert.removable).toBe(true);
      expect(isPersistentToastVisible('p1')).toBe(true);

      jest.advanceTimersByTime(1);
      expect(getToasts()[0].classList.contains('open')).toBe(true);
    });

    it('falls back to top-right for an invalid position', () => {
      showPersistentToast({ ...baseOptions, persistentId: 'p1', position: 'middle' });

      expect(getToaster('top-right')).not.toBeNull();
    });

    it('renders action buttons and wires tk-click to the action', () => {
      const action = jest.fn();
      showPersistentToast({ ...baseOptions, persistentId: 'p1', actions: [{ label: 'Retry', action }] });

      const button = document.querySelector('[slot="footer-action"] tk-button') as any;
      expect(button.label).toBe('Retry');
      expect(button.variant).toBe('primary');

      button.dispatchEvent(new Event('tk-click'));
      expect(action).toHaveBeenCalledTimes(1);
    });

    it('toggles: a second call with the same id starts removal and returns false', () => {
      showPersistentToast({ ...baseOptions, persistentId: 'p1' });
      jest.advanceTimersByTime(1);

      const toast = getToasts()[0];
      const result = showPersistentToast({ ...baseOptions, persistentId: 'p1' });

      expect(result).toBe(false);
      expect(toast.classList.contains('open')).toBe(false);
      expect(isPersistentToastVisible('p1')).toBe(false);

      jest.advanceTimersByTime(300);
      expect(document.body.contains(toast)).toBe(false);
    });

    it('returns false and does nothing while the toast is being removed', () => {
      showPersistentToast({ ...baseOptions, persistentId: 'p1' });
      showPersistentToast({ ...baseOptions, persistentId: 'p1' });

      const result = showPersistentToast({ ...baseOptions, persistentId: 'p1' });

      expect(result).toBe(false);
      expect(getToasts().length).toBe(1);
    });

    it('can be shown again after the removal animation completes', () => {
      showPersistentToast({ ...baseOptions, persistentId: 'p1' });
      showPersistentToast({ ...baseOptions, persistentId: 'p1' });
      jest.advanceTimersByTime(300);

      const result = showPersistentToast({ ...baseOptions, persistentId: 'p1' });

      expect(result).toBe(true);
      expect(isPersistentToastVisible('p1')).toBe(true);
    });

    it('tracks toasts with different ids independently', () => {
      showPersistentToast({ ...baseOptions, persistentId: 'p1' });
      showPersistentToast({ ...baseOptions, persistentId: 'p2' });

      expect(isPersistentToastVisible('p1')).toBe(true);
      expect(isPersistentToastVisible('p2')).toBe(true);
      expect(getToasts().length).toBe(2);
    });

    it('removes the registry entry when the alert emits a remove event', () => {
      showPersistentToast({ ...baseOptions, persistentId: 'p1' });

      getAlert().dispatchEvent(new Event('remove'));

      expect(isPersistentToastVisible('p1')).toBe(false);
    });
  });

  describe('isPersistentToastVisible', () => {
    it('returns false for an unknown id', () => {
      expect(isPersistentToastVisible('missing')).toBe(false);
    });
  });

  describe('dismissAllPersistentToasts', () => {
    it('dismisses every visible persistent toast', () => {
      showPersistentToast({ ...baseOptions, persistentId: 'p1' });
      showPersistentToast({ ...baseOptions, persistentId: 'p2' });
      jest.advanceTimersByTime(1);

      dismissAllPersistentToasts();

      expect(isPersistentToastVisible('p1')).toBe(false);
      expect(isPersistentToastVisible('p2')).toBe(false);

      jest.advanceTimersByTime(300);
      expect(getToasts().length).toBe(0);
    });

    it('skips toasts that are already being removed', () => {
      showPersistentToast({ ...baseOptions, persistentId: 'p1' });
      showPersistentToast({ ...baseOptions, persistentId: 'p1' });

      expect(() => dismissAllPersistentToasts()).not.toThrow();

      jest.advanceTimersByTime(300);
      expect(getToasts().length).toBe(0);
    });

    it('is a no-op when there are no persistent toasts', () => {
      expect(() => dismissAllPersistentToasts()).not.toThrow();
    });
  });
});
