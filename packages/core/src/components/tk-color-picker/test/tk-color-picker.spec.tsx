// floating-ui needs real layout APIs that the spec environment lacks; the picker only
// consumes the returned cleanup function, so a no-op factory stands in for autoUpdate.
jest.mock('../../../utils/position-utils', () => ({
  floatingElementAutoUpdate: jest.fn(() => jest.fn()),
}));

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkColorPicker } from '../tk-color-picker';

const setup = async (html: string) => newSpecPage({ components: [TkColorPicker], html });

const shadow = (page: SpecPage) => page.root.shadowRoot;
const instanceOf = (page: SpecPage) => page.rootInstance as any;

describe('tk-color-picker', () => {
  describe('initial state', () => {
    it('parses the initial value into HSVA', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);

      expect(instanceOf(page).internalHSVA).toEqual({ h: 0, s: 100, v: 100, a: 1 });
    });

    it('falls back to black when no value is supplied', async () => {
      const page = await setup(`<tk-color-picker></tk-color-picker>`);

      expect(instanceOf(page).internalHSVA).toEqual({ h: 0, s: 0, v: 0, a: 1 });
    });

    it('honours the format prop', async () => {
      const page = await setup(`<tk-color-picker format="rgba"></tk-color-picker>`);

      expect(instanceOf(page).currentFormat).toBe('rgba');
    });

    it('falls back to hex for an unrecognised format', async () => {
      const page = await setup(`<tk-color-picker></tk-color-picker>`);

      instanceOf(page).format = 'cmyk';
      instanceOf(page).componentWillLoad();

      expect(instanceOf(page).currentFormat).toBe('hex');
    });

    it('starts closed', async () => {
      const page = await setup(`<tk-color-picker></tk-color-picker>`);

      expect(instanceOf(page).isOpen).toBe(false);
    });
  });

  describe('methods', () => {
    it('open() opens the panel and snapshots the current color', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);

      await page.root.open();
      await page.waitForChanges();

      expect(instanceOf(page).isOpen).toBe(true);
      expect(instanceOf(page).pendingValue).toEqual({ h: 0, s: 100, v: 100, a: 1 });
    });

    it.each(['disabled', 'readonly', 'inline'])('open() is a no-op when %s', async prop => {
      const page = await setup(`<tk-color-picker ${prop}="true"></tk-color-picker>`);

      await page.root.open();
      await page.waitForChanges();

      expect(instanceOf(page).isOpen).toBe(false);
    });

    it('close() closes the panel', async () => {
      const page = await setup(`<tk-color-picker></tk-color-picker>`);

      await page.root.open();
      await page.waitForChanges();
      await page.root.close();
      await page.waitForChanges();

      expect(instanceOf(page).isOpen).toBe(false);
    });

    it('getValue() uses the current format by default', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);

      await expect(page.root.getValue()).resolves.toBe('#ff0000');
    });

    it('getValue() honours an explicit format override', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);

      await expect(page.root.getValue('rgba')).resolves.toBe('rgba(255, 0, 0, 1.00)');
    });
  });

  describe('apply and cancel', () => {
    it('apply() commits the value, emits and closes', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);
      const onApply = jest.fn();
      const onChange = jest.fn();
      page.root.addEventListener('tk-apply', onApply);
      page.root.addEventListener('tk-change', onChange);

      await page.root.open();
      await page.waitForChanges();
      await page.root.apply();
      await page.waitForChanges();

      expect(onApply.mock.calls[0][0].detail).toBe('#ff0000');
      expect(onChange.mock.calls[0][0].detail).toBe('#ff0000');
      expect(page.root.value).toBe('#ff0000');
      expect(instanceOf(page).isOpen).toBe(false);
      expect(instanceOf(page).pendingValue).toBeNull();
    });

    it('cancel() reverts to the color captured when the panel opened', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);
      const onCancel = jest.fn();
      page.root.addEventListener('tk-cancel', onCancel);

      await page.root.open();
      await page.waitForChanges();

      instanceOf(page).internalHSVA = { h: 120, s: 100, v: 100, a: 1 };
      await page.root.cancel();
      await page.waitForChanges();

      expect(instanceOf(page).internalHSVA).toEqual({ h: 0, s: 100, v: 100, a: 1 });
      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(instanceOf(page).isOpen).toBe(false);
    });

    it('cancel() without a snapshot leaves the color untouched', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);

      await page.root.cancel();
      await page.waitForChanges();

      expect(instanceOf(page).internalHSVA).toEqual({ h: 0, s: 100, v: 100, a: 1 });
    });
  });

  describe('events', () => {
    it('emits tk-open and tk-close as the panel toggles', async () => {
      const page = await setup(`<tk-color-picker></tk-color-picker>`);
      const onOpen = jest.fn();
      const onClose = jest.fn();
      page.root.addEventListener('tk-open', onOpen);
      page.root.addEventListener('tk-close', onClose);

      await page.root.open();
      await page.waitForChanges();
      expect(onOpen).toHaveBeenCalledTimes(1);

      await page.root.close();
      await page.waitForChanges();
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('watchers', () => {
    it('reparses the color when the value prop changes', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);

      page.root.value = '#00ff00';
      await page.waitForChanges();

      expect(instanceOf(page).internalHSVA).toEqual({ h: 120, s: 100, v: 100, a: 1 });
    });

    it('ignores value changes while a drag is in flight', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);

      instanceOf(page).isDragging = true;
      page.root.value = '#00ff00';
      await page.waitForChanges();

      expect(instanceOf(page).internalHSVA).toEqual({ h: 0, s: 100, v: 100, a: 1 });
    });

    it('closes the panel when it becomes disabled', async () => {
      const page = await setup(`<tk-color-picker></tk-color-picker>`);

      await page.root.open();
      await page.waitForChanges();

      page.root.disabled = true;
      await page.waitForChanges();

      expect(instanceOf(page).isOpen).toBe(false);
    });
  });

  describe('rendering', () => {
    it('renders the panel inline without a trigger', async () => {
      const page = await setup(`<tk-color-picker inline="true"></tk-color-picker>`);

      expect(shadow(page).querySelector('.tk-color-picker-saturation-container')).toBeTruthy();
    });

    it('renders the saturation pointer from the current color', async () => {
      const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);
      const pointer = shadow(page).querySelector('.tk-color-picker-saturation-pointer') as HTMLElement;

      expect(pointer.style.left).toBe('100%');
      expect(pointer.style.top).toBe('0%');
    });

    it('hides the alpha slider when showAlphaSlider is false', async () => {
      const page = await setup(`<tk-color-picker inline="true" show-alpha-slider="false"></tk-color-picker>`);

      expect(shadow(page).querySelector('.tk-color-picker-alpha-bg')).toBeNull();
      expect(shadow(page).querySelector('.tk-color-picker-alpha-input')).toBeNull();
    });

    it('marks sliders vertical in the horizontal orientation', async () => {
      const page = await setup(`<tk-color-picker inline="true" orientation="horizontal"></tk-color-picker>`);

      expect(shadow(page).querySelector('.tk-color-picker-hue').classList.contains('tk-color-picker-slider-vertical')).toBe(true);
    });

    it('hides the format selector when disabled', async () => {
      const page = await setup(`<tk-color-picker inline="true" show-format-selector="false"></tk-color-picker>`);

      expect(shadow(page).querySelector('.tk-color-picker-format-select')).toBeNull();
    });

    it('renders hex inputs in hex format and rgb inputs in rgba format', async () => {
      const hex = await setup(`<tk-color-picker inline="true" format="hex"></tk-color-picker>`);
      expect(shadow(hex).querySelector('.tk-color-picker-hex-input')).toBeTruthy();
      expect(shadow(hex).querySelector('.tk-color-picker-rgb-inputs')).toBeNull();

      const rgba = await setup(`<tk-color-picker inline="true" format="rgba"></tk-color-picker>`);
      expect(shadow(rgba).querySelector('.tk-color-picker-rgb-inputs')).toBeTruthy();
      expect(shadow(rgba).querySelector('.tk-color-picker-hex-input')).toBeNull();
    });
  });

  describe('color editing', () => {
    it('updates a single rgb channel while keeping the others', async () => {
      const page = await setup(`<tk-color-picker inline="true" value="#000000"></tk-color-picker>`);

      instanceOf(page).handleRgbChange('r', '255');

      expect(instanceOf(page).internalHSVA).toMatchObject({ h: 0, s: 100, v: 100 });
    });

    it('clamps an out-of-range rgb channel', async () => {
      const page = await setup(`<tk-color-picker inline="true" value="#000000"></tk-color-picker>`);

      instanceOf(page).handleRgbChange('r', '999');

      expect(instanceOf(page).internalHSVA.v).toBe(100);
    });

    it('treats an unparsable rgb channel as 0', async () => {
      const page = await setup(`<tk-color-picker inline="true" value="#ffffff"></tk-color-picker>`);

      instanceOf(page).handleRgbChange('g', 'abc');

      const { s, v } = instanceOf(page).internalHSVA;
      expect(s).toBeGreaterThan(0);
      expect(v).toBe(100);
    });

    it('preserves the hue when a channel edit makes the color achromatic', async () => {
      const page = await setup(`<tk-color-picker inline="true" value="#00ff00"></tk-color-picker>`);

      instanceOf(page).handleRgbChange('g', '0');

      expect(instanceOf(page).internalHSVA.h).toBe(120);
      expect(instanceOf(page).internalHSVA.v).toBe(0);
    });

    it('applies a hex value on blur', async () => {
      const page = await setup(`<tk-color-picker inline="true"></tk-color-picker>`);

      instanceOf(page).tempInputVal = 'ff0000';
      instanceOf(page).handleInputBlur('hex');

      expect(instanceOf(page).internalHSVA).toMatchObject({ h: 0, s: 100, v: 100 });
    });

    it('preserves the hue when a hex edit makes the color achromatic', async () => {
      const page = await setup(`<tk-color-picker inline="true" value="#00ff00"></tk-color-picker>`);

      instanceOf(page).tempInputVal = '000000';
      instanceOf(page).handleInputBlur('hex');

      expect(instanceOf(page).internalHSVA.h).toBe(120);
    });

    it('converts an alpha percentage on blur', async () => {
      const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);

      instanceOf(page).tempInputVal = '50';
      instanceOf(page).handleInputBlur('a');

      expect(instanceOf(page).internalHSVA.a).toBe(0.5);
    });

    it('clamps the alpha percentage to 0-100', async () => {
      const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);

      instanceOf(page).tempInputVal = '250';
      instanceOf(page).handleInputBlur('a');
      expect(instanceOf(page).internalHSVA.a).toBe(1);

      instanceOf(page).tempInputVal = '-10';
      instanceOf(page).handleInputBlur('a');
      expect(instanceOf(page).internalHSVA.a).toBe(0);
    });

    it('ignores a blur with no pending edit', async () => {
      const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);
      const before = instanceOf(page).internalHSVA;

      instanceOf(page).handleInputBlur('hex');

      expect(instanceOf(page).internalHSVA).toBe(before);
    });

    it('selects a preset color', async () => {
      const page = await setup(`<tk-color-picker inline="true"></tk-color-picker>`);

      instanceOf(page).handlePresetSelect('#00ff00');

      expect(instanceOf(page).internalHSVA).toEqual({ h: 120, s: 100, v: 100, a: 1 });
    });

    it('switches the active format', async () => {
      const page = await setup(`<tk-color-picker inline="true"></tk-color-picker>`);

      instanceOf(page).handleFormatChange({ detail: 'rgba', stopPropagation: jest.fn() });

      expect(instanceOf(page).currentFormat).toBe('rgba');
    });
  });

  describe('trigger input', () => {
    it('seeds the typed value from the current value on focus', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);

      instanceOf(page).handleTriggerInputFocus();

      expect(instanceOf(page).triggerInputValue).toBe('#ff0000');
      expect(instanceOf(page).isTriggerInputFocused).toBe(true);
    });

    it('applies a typed color on blur and emits', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);
      const onChange = jest.fn();
      page.root.addEventListener('tk-change', onChange);

      instanceOf(page).triggerInputValue = '#00ff00';
      instanceOf(page).handleTriggerInputBlur();

      expect(page.root.value).toBe('#00ff00');
      expect(onChange.mock.calls[0][0].detail).toBe('#00ff00');
    });

    it('ignores an empty typed value', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);
      const onChange = jest.fn();
      page.root.addEventListener('tk-change', onChange);

      instanceOf(page).triggerInputValue = '';
      instanceOf(page).handleTriggerInputBlur();

      expect(onChange).not.toHaveBeenCalled();
    });

    it('applies the typed value on Enter', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);

      instanceOf(page).triggerInputValue = '#0000ff';
      instanceOf(page).handleTriggerInputKeyDown({ key: 'Enter', preventDefault: jest.fn() });

      expect(page.root.value).toBe('#0000ff');
    });

    it('resets the typed value on Escape', async () => {
      const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);

      instanceOf(page).triggerInputValue = 'garbage';
      instanceOf(page).handleTriggerInputKeyDown({ key: 'Escape', preventDefault: jest.fn() });

      expect(instanceOf(page).triggerInputValue).toBe('#ff0000');
    });

    it('opens the panel on a trigger click', async () => {
      const page = await setup(`<tk-color-picker></tk-color-picker>`);

      instanceOf(page).handleTriggerClick({ stopPropagation: jest.fn() });
      await page.waitForChanges();

      expect(instanceOf(page).isOpen).toBe(true);
    });

    it.each(['disabled', 'readonly', 'inline'])('ignores a trigger click when %s', async prop => {
      const page = await setup(`<tk-color-picker ${prop}="true"></tk-color-picker>`);

      instanceOf(page).handleTriggerClick({ stopPropagation: jest.fn() });
      await page.waitForChanges();

      expect(instanceOf(page).isOpen).toBe(false);
    });
  });

  describe('eyedropper', () => {
    // The component reads `window` from the spec page, not the test file's global.
    const stubEyeDropper = (page: SpecPage, open: () => Promise<{ sRGBHex: string }>) => {
      (page.win as any).EyeDropper = class {
        open = open;
      };
    };

    it('does nothing when the browser has no EyeDropper', async () => {
      const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);

      await instanceOf(page).handleEyeDropper();

      expect(instanceOf(page).internalHSVA).toEqual({ h: 0, s: 100, v: 100, a: 1 });
    });

    it('adopts the picked color', async () => {
      const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);
      stubEyeDropper(page, () => Promise.resolve({ sRGBHex: '#00ff00' }));

      await instanceOf(page).handleEyeDropper();

      expect(instanceOf(page).internalHSVA).toEqual({ h: 120, s: 100, v: 100, a: 1 });
    });

    it('keeps the current color when the user cancels', async () => {
      const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);
      stubEyeDropper(page, () => Promise.reject(new Error('cancelled')));

      await instanceOf(page).handleEyeDropper();

      expect(instanceOf(page).internalHSVA).toEqual({ h: 0, s: 100, v: 100, a: 1 });
    });
  });

  describe('slots', () => {
    it.each([
      ['header', 'hasHeaderSlot'],
      ['header-actions', 'hasHeaderActionsSlot'],
      ['footer', 'hasFooterSlot'],
      ['footer-actions', 'hasFooterActionsSlot'],
    ])('detects a direct %s slot', async (slotName, stateKey) => {
      const page = await setup(`<tk-color-picker><div slot="${slotName}">x</div></tk-color-picker>`);

      expect(instanceOf(page)[stateKey]).toBe(true);
    });

    it('does not treat a nested slotted element as its own', async () => {
      const page = await setup(`<tk-color-picker><div><span slot="footer">nested</span></div></tk-color-picker>`);

      expect(instanceOf(page).hasFooterSlot).toBe(false);
    });

    it('reports no slots when none are provided', async () => {
      const page = await setup(`<tk-color-picker></tk-color-picker>`);
      const instance = instanceOf(page);

      expect([instance.hasHeaderSlot, instance.hasHeaderActionsSlot, instance.hasFooterSlot, instance.hasFooterActionsSlot]).toEqual([false, false, false, false]);
    });
  });
});
