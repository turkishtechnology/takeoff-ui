// floating-ui needs real layout APIs that the spec environment lacks; the picker only
// consumes the returned cleanup function, so a no-op factory stands in for autoUpdate.
jest.mock('../../../utils/position-utils', () => ({
  floatingElementAutoUpdate: jest.fn(() => jest.fn()),
}));

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkColorPicker } from '../tk-color-picker';
import { floatingElementAutoUpdate } from '../../../utils/position-utils';

const mockedAutoUpdate = floatingElementAutoUpdate as jest.Mock;

const setup = async (html: string) => newSpecPage({ components: [TkColorPicker], html });

const shadow = (page: SpecPage) => page.root.shadowRoot;
const instanceOf = (page: SpecPage) => page.rootInstance;
const query = <T extends Element = HTMLElement>(page: SpecPage, selector: string) => shadow(page).querySelector(selector) as T;

const listen = (page: SpecPage, eventName: string) => {
  const spy = jest.fn();
  page.root.addEventListener(eventName, spy);
  return spy;
};

/** Gives the mock DOM element a fixed 100x100 box at (10, 20). */
const stubRect = (el: Element, left = 10, top = 20, width = 100, height = 100) => {
  el.getBoundingClientRect = () => ({ left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON: () => ({}) });
};

const mouse = (type: string, clientX: number, clientY: number) => new MouseEvent(type, { bubbles: true, cancelable: true, clientX, clientY });

const pressOn = (el: Element, clientX: number, clientY: number) => el.dispatchEvent(mouse('mousedown', clientX, clientY));
const moveTo = (page: SpecPage, clientX: number, clientY: number) => {
  const event = mouse('mousemove', clientX, clientY);
  page.doc.dispatchEvent(event);
  return event;
};
const release = (page: SpecPage) => page.doc.dispatchEvent(mouse('mouseup', 0, 0));

const tkChangeOn = (el: Element, detail: unknown) => el.dispatchEvent(new CustomEvent('tk-change', { detail }));
const tkBlurOn = (el: Element) => el.dispatchEvent(new CustomEvent('tk-blur'));

describe('tk-color-picker saturation and slider dragging', () => {
  it('moves the saturation pointer to where the user presses', async () => {
    const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);
    const area = query(page, '.tk-color-picker-saturation-container');
    stubRect(area);

    // 25% across, 50% down -> s = 25, v = 50
    pressOn(area, 35, 70);
    release(page);
    await page.waitForChanges();

    const pointer = query(page, '.tk-color-picker-saturation-pointer');
    expect(pointer.style.left).toBe('25%');
    expect(pointer.style.top).toBe('50%');
    expect(instanceOf(page).internalHSVA).toMatchObject({ h: 0, s: 25, v: 50 });
  });

  it('keeps following the mouse while dragging and stops after mouseup', async () => {
    const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);
    const area = query(page, '.tk-color-picker-saturation-container');
    stubRect(area);

    pressOn(area, 10, 20);
    const move = moveTo(page, 110, 20);
    await page.waitForChanges();

    expect(move.defaultPrevented).toBe(true);
    expect(instanceOf(page).internalHSVA).toMatchObject({ s: 100, v: 100 });

    release(page);
    moveTo(page, 10, 120);
    await page.waitForChanges();

    // The move after mouseup must be ignored.
    expect(instanceOf(page).internalHSVA).toMatchObject({ s: 100, v: 100 });
  });

  it('clamps pointer positions outside the saturation area to its edges', async () => {
    const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);
    const area = query(page, '.tk-color-picker-saturation-container');
    stubRect(area);

    pressOn(area, -500, 900);
    release(page);
    await page.waitForChanges();

    expect(instanceOf(page).internalHSVA).toMatchObject({ s: 0, v: 0 });
  });

  it('sets the hue from a horizontal press on the hue slider', async () => {
    const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);
    const hue = query(page, '.tk-color-picker-hue');
    stubRect(hue);

    // 50% across -> 180deg
    pressOn(hue, 60, 20);
    release(page);
    await page.waitForChanges();

    expect(instanceOf(page).internalHSVA.h).toBe(180);
    expect(query(page, '.tk-color-picker-hue .tk-color-picker-slider-thumb').style.left).toBe('50%');
    expect(query(page, '.tk-color-picker-saturation-container').style.backgroundColor).toBe('hsl(180, 100%, 50%)');
  });

  it('reads the hue from the vertical axis in the horizontal orientation', async () => {
    const page = await setup(`<tk-color-picker inline="true" orientation="horizontal" value="#ff0000"></tk-color-picker>`);
    const hue = query(page, '.tk-color-picker-hue');
    stubRect(hue);

    // 25% down -> 90deg; the horizontal position is irrelevant.
    pressOn(hue, 999, 45);
    release(page);
    await page.waitForChanges();

    expect(instanceOf(page).internalHSVA.h).toBe(90);
    expect(query(page, '.tk-color-picker-hue .tk-color-picker-slider-thumb').style.top).toBe('25%');
  });

  it('sets the alpha from a horizontal press on the alpha slider', async () => {
    const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);
    const alpha = query(page, '.tk-color-picker-alpha-bg').parentElement;
    stubRect(alpha);

    pressOn(alpha, 35, 20);
    release(page);
    await page.waitForChanges();

    expect(instanceOf(page).internalHSVA.a).toBe(0.25);
    expect(query(page, '.tk-color-picker-alpha-input').getAttribute('value')).toBe('25');
    await expect(page.root.getValue('rgba')).resolves.toBe('rgba(255, 0, 0, 0.25)');
  });

  it('reads the alpha from the vertical axis in the horizontal orientation', async () => {
    const page = await setup(`<tk-color-picker inline="true" orientation="horizontal" value="#ff0000"></tk-color-picker>`);
    const alpha = query(page, '.tk-color-picker-alpha-bg').parentElement;
    stubRect(alpha);

    pressOn(alpha, 0, 95);
    release(page);
    await page.waitForChanges();

    expect(instanceOf(page).internalHSVA.a).toBe(0.75);
  });

  it('ignores value prop changes while dragging and honours them again afterwards', async () => {
    const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);
    const area = query(page, '.tk-color-picker-saturation-container');
    stubRect(area);

    pressOn(area, 110, 20);
    page.root.value = '#00ff00';
    await page.waitForChanges();
    expect(instanceOf(page).internalHSVA.h).toBe(0);

    release(page);
    page.root.value = '#0000ff';
    await page.waitForChanges();
    expect(instanceOf(page).internalHSVA.h).toBe(240);
  });

  it('stops an in-flight drag when the element is removed', async () => {
    const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);
    const area = query(page, '.tk-color-picker-saturation-container');
    stubRect(area);
    const removeSpy = jest.spyOn(page.doc, 'removeEventListener');

    pressOn(area, 10, 20);
    page.root.remove();
    await page.waitForChanges();

    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
    removeSpy.mockRestore();
  });
});

describe('tk-color-picker panel inputs', () => {
  it('applies a typed hex value after the hex field blurs', async () => {
    const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);
    const hexInput = query(page, '.tk-color-picker-hex-input');

    tkChangeOn(hexInput, '00ff00');
    tkBlurOn(hexInput);
    await page.waitForChanges();

    expect(instanceOf(page).internalHSVA).toEqual({ h: 120, s: 100, v: 100, a: 1 });
    expect(query(page, '.tk-color-picker-hex-input').getAttribute('value')).toBe('00ff00');
    expect(query(page, '.tk-color-picker-preview-box').style.backgroundColor).toBe('#00ff00');
  });

  it('applies a typed alpha percentage after the alpha field blurs', async () => {
    const page = await setup(`<tk-color-picker inline="true" value="#ff0000"></tk-color-picker>`);
    const alphaInput = query(page, '.tk-color-picker-alpha-input');

    tkChangeOn(alphaInput, '40');
    tkBlurOn(alphaInput);
    await page.waitForChanges();

    expect(instanceOf(page).internalHSVA.a).toBe(0.4);
    expect(query(page, '.tk-color-picker-alpha-input').getAttribute('value')).toBe('40');
  });

  it.each([
    ['red', 0, '128', { r: 128, g: 0, b: 0 }],
    ['green', 1, '64', { r: 255, g: 64, b: 0 }],
    ['blue', 2, '255', { r: 255, g: 0, b: 255 }],
  ])('updates the %s channel after its field blurs', async (_label, index, typed, expected) => {
    const page = await setup(`<tk-color-picker inline="true" format="rgba" value="rgb(255, 0, 0)"></tk-color-picker>`);
    const field = shadow(page).querySelectorAll('.tk-color-picker-rgb-input')[index];

    tkChangeOn(field, typed);
    tkBlurOn(field);
    await page.waitForChanges();

    const values = Array.from(shadow(page).querySelectorAll('.tk-color-picker-rgb-input')).map(el => el.getAttribute('value'));
    expect(values).toEqual([String(expected.r), String(expected.g), String(expected.b)]);
  });

  it('renders the alpha field in rgba format too and applies it', async () => {
    const page = await setup(`<tk-color-picker inline="true" format="rgba" value="rgba(0, 0, 255, 0.5)"></tk-color-picker>`);
    const alphaInput = query(page, '.tk-color-picker-rgb-inputs .tk-color-picker-alpha-input');

    expect(alphaInput.getAttribute('value')).toBe('50');

    tkChangeOn(alphaInput, '100');
    tkBlurOn(alphaInput);
    await page.waitForChanges();

    await expect(page.root.getValue()).resolves.toBe('rgba(0, 0, 255, 1.00)');
  });

  it('switches between hex and rgb fields through the format selector', async () => {
    const page = await setup(`<tk-color-picker inline="true" value="#0000ff"></tk-color-picker>`);
    const select = query(page, '.tk-color-picker-format-select');
    const onChange = listen(page, 'tk-change');

    const toRgba = new CustomEvent('tk-change', { detail: 'rgba', bubbles: true });
    select.dispatchEvent(toRgba);
    await page.waitForChanges();

    expect(query(page, '.tk-color-picker-rgb-inputs')).toBeTruthy();
    expect(query(page, '.tk-color-picker-hex-input')).toBeNull();
    expect(query(page, '.tk-color-picker-preview-box').style.backgroundColor).toBe('rgba(0, 0, 255, 1.00)');
    // The selector's own change event must not leak out as a color change.
    expect(toRgba.cancelBubble).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
    await expect(page.root.getValue()).resolves.toBe('rgba(0, 0, 255, 1.00)');

    select.dispatchEvent(new CustomEvent('tk-change', { detail: 'hex' }));
    await page.waitForChanges();

    expect(query(page, '.tk-color-picker-hex-input')).toBeTruthy();
    await expect(page.root.getValue()).resolves.toBe('#0000ff');
  });

  it('adopts a preset when it is clicked', async () => {
    const page = await setup(`<tk-color-picker inline="true" value="#000000"></tk-color-picker>`);
    const presets = shadow(page).querySelectorAll('.tk-color-picker-preset');

    expect(presets).toHaveLength(11);
    expect((presets[0] as HTMLElement).style.backgroundColor).toBe('#326FD1');

    presets[0].dispatchEvent(new MouseEvent('click'));
    await page.waitForChanges();

    await expect(page.root.getValue()).resolves.toBe('#326fd1');
  });

  it('renders custom presets and hides the section when the list is empty', async () => {
    const page = await setup(`<tk-color-picker inline="true"></tk-color-picker>`);

    page.root.presets = ['#ff0000', '#00ff00'];
    await page.waitForChanges();
    expect(shadow(page).querySelectorAll('.tk-color-picker-preset')).toHaveLength(2);

    page.root.presets = [];
    await page.waitForChanges();
    expect(query(page, '.tk-color-picker-presets')).toBeNull();

    page.root.presets = ['#ff0000'];
    page.root.showPresets = false;
    await page.waitForChanges();
    expect(query(page, '.tk-color-picker-presets')).toBeNull();
  });

  it('disables the panel fields when the picker is disabled', async () => {
    const page = await setup(`<tk-color-picker inline="true" format="rgba" disabled="true"></tk-color-picker>`);

    const disabledFields = Array.from(shadow(page).querySelectorAll('tk-input, tk-select, tk-button')).filter(el => el.hasAttribute('disabled'));
    expect(disabledFields.length).toBe(shadow(page).querySelectorAll('tk-input, tk-select, tk-button').length);
  });
});

describe('tk-color-picker popover', () => {
  beforeEach(() => mockedAutoUpdate.mockClear());

  it('renders the panel only while open and toggles the trigger arrow', async () => {
    const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);
    const trigger = query(page, 'tk-input');

    expect(query(page, '.tk-color-picker-panel')).toBeNull();
    expect(trigger.hasAttribute('aria-expanded')).toBe(false);

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(query(page, '.tk-color-picker-panel')).toBeTruthy();
    expect(query(page, 'tk-input').hasAttribute('aria-expanded')).toBe(true);
    expect(mockedAutoUpdate).toHaveBeenCalledTimes(1);

    await page.root.close();
    await page.waitForChanges();

    expect(query(page, '.tk-color-picker-panel')).toBeNull();
    expect(mockedAutoUpdate.mock.results[0].value as jest.Mock).toHaveBeenCalled();
  });

  it('applies the pending color and closes on a click outside', async () => {
    const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);
    const onChange = listen(page, 'tk-change');
    const onApply = listen(page, 'tk-apply');

    await page.root.open();
    await page.waitForChanges();
    instanceOf(page).internalHSVA = { h: 120, s: 100, v: 100, a: 1 };
    await page.waitForChanges();

    page.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root.value).toBe('#00ff00');
    expect(onChange.mock.calls[0][0].detail).toBe('#00ff00');
    expect(onApply).toHaveBeenCalledTimes(1);
    expect(query(page, '.tk-color-picker-panel')).toBeNull();
  });

  it('keeps the panel open on a click outside when preventDismiss is set', async () => {
    const page = await setup(`<tk-color-picker value="#ff0000" prevent-dismiss="true"></tk-color-picker>`);
    const onChange = listen(page, 'tk-change');

    await page.root.open();
    await page.waitForChanges();

    page.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(query(page, '.tk-color-picker-panel')).toBeTruthy();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not react to outside clicks while closed', async () => {
    const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);
    const onChange = listen(page, 'tk-change');

    page.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(onChange).not.toHaveBeenCalled();
  });

  it('closes without applying when the header close button is clicked', async () => {
    const page = await setup(`<tk-color-picker value="#ff0000" show-header="true" show-close-button="true" header="Pick"></tk-color-picker>`);
    const onCancel = listen(page, 'tk-cancel');
    const onChange = listen(page, 'tk-change');

    await page.root.open();
    await page.waitForChanges();
    instanceOf(page).internalHSVA = { h: 120, s: 100, v: 100, a: 1 };
    await page.waitForChanges();

    expect(query(page, '.tk-color-picker-title').textContent).toBe('Pick');
    query(page, '.tk-color-picker-panel-header tk-button').dispatchEvent(new MouseEvent('click'));
    await page.waitForChanges();

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();
    expect(instanceOf(page).internalHSVA).toEqual({ h: 0, s: 100, v: 100, a: 1 });
    expect(query(page, '.tk-color-picker-panel')).toBeNull();
  });

  it('shows the typed text in the trigger while it is focused', async () => {
    const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);
    const trigger = query(page, 'tk-input');

    trigger.dispatchEvent(new CustomEvent('tk-focus'));
    tkChangeOn(trigger, '#00f');
    await page.waitForChanges();
    expect(query(page, 'tk-input').getAttribute('value')).toBe('#00f');

    trigger.dispatchEvent(new CustomEvent('tk-blur'));
    await page.waitForChanges();

    expect(page.root.value).toBe('#0000ff');
    expect(query(page, 'tk-input').getAttribute('value')).toBe('#0000ff');
  });

  it('starts the trigger text empty when there is no value yet', async () => {
    const page = await setup(`<tk-color-picker></tk-color-picker>`);

    query(page, 'tk-input').dispatchEvent(new CustomEvent('tk-focus'));
    await page.waitForChanges();

    expect(instanceOf(page).triggerInputValue).toBe('');
    expect(query(page, 'tk-input').getAttribute('value')).toBe('');
  });

  it('rejects an unparsable typed color but accepts black', async () => {
    const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);
    const onChange = listen(page, 'tk-change');
    const trigger = query(page, 'tk-input');

    tkChangeOn(trigger, 'not-a-color');
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();

    expect(page.root.value).toBe('#ff0000');
    expect(onChange).not.toHaveBeenCalled();

    tkChangeOn(trigger, '#000000');
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();

    expect(page.root.value).toBe('#000000');
    expect(onChange.mock.calls[0][0].detail).toBe('#000000');
  });

  it('restores the current color in the trigger on Escape and ignores other keys', async () => {
    const page = await setup(`<tk-color-picker value="#ff0000"></tk-color-picker>`);
    const trigger = query(page, 'tk-input');

    tkChangeOn(trigger, 'garbage');
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(instanceOf(page).triggerInputValue).toBe('garbage');

    const escape = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
    trigger.dispatchEvent(escape);

    expect(escape.defaultPrevented).toBe(true);
    expect(instanceOf(page).triggerInputValue).toBe('#ff0000');
  });

  it('emits the typed color in rgba when that format is active', async () => {
    const page = await setup(`<tk-color-picker value="#ff0000" format="rgba"></tk-color-picker>`);
    const onChange = listen(page, 'tk-change');

    const trigger = query(page, 'tk-input');
    tkChangeOn(trigger, '#00ff00');
    tkBlurOn(trigger);
    await page.waitForChanges();

    expect(onChange.mock.calls[0][0].detail).toBe('rgba(0, 255, 0, 1.00)');
  });

  it.each(['disabled', 'readonly'])('passes %s through to the trigger input', async prop => {
    const page = await setup(`<tk-color-picker ${prop}="true"></tk-color-picker>`);

    expect(query(page, 'tk-input').hasAttribute(prop)).toBe(true);
  });
});

describe('tk-color-picker header and footer', () => {
  it('renders no header unless showHeader is set', async () => {
    const page = await setup(`<tk-color-picker inline="true" header="Pick"></tk-color-picker>`);

    expect(query(page, '.tk-color-picker-panel-header')).toBeNull();
  });

  it('renders the default header with the configured style and no close button by default', async () => {
    const page = await setup(`<tk-color-picker inline="true" show-header="true" header-type="primary" header="Pick"></tk-color-picker>`);

    const header = query(page, '.tk-color-picker-panel-header');
    expect(header.classList.contains('tk-color-picker-panel-header-primary')).toBe(true);
    expect(header.querySelector('tk-button')).toBeNull();
  });

  it('never shows a close button in inline mode', async () => {
    const page = await setup(`<tk-color-picker inline="true" show-header="true" show-close-button="true"></tk-color-picker>`);

    expect(query(page, '.tk-color-picker-panel-header tk-button')).toBeNull();
  });

  it('replaces the header with the header slot', async () => {
    const page = await setup(`<tk-color-picker inline="true" show-header="true"><div slot="header">Custom</div></tk-color-picker>`);

    expect(query(page, '.tk-color-picker-panel-header')).toBeNull();
    expect(query(page, 'slot[name="header"]')).toBeTruthy();
  });

  it('replaces the close button with the header-actions slot', async () => {
    const page = await setup(`<tk-color-picker show-header="true" show-close-button="true"><button slot="header-actions">x</button></tk-color-picker>`);

    await page.root.open();
    await page.waitForChanges();

    const header = query(page, '.tk-color-picker-panel-header');
    expect(header.querySelector('slot[name="header-actions"]')).toBeTruthy();
    expect(header.querySelector('tk-button')).toBeNull();
  });

  it('renders no footer by default', async () => {
    const page = await setup(`<tk-color-picker inline="true"></tk-color-picker>`);

    expect(query(page, '.tk-color-picker-panel-footer')).toBeNull();
    expect(query(page, 'slot[name="footer"]')).toBeNull();
  });

  it('renders the footer slot without the styled container', async () => {
    const page = await setup(`<tk-color-picker inline="true"><div slot="footer">Footer</div></tk-color-picker>`);

    expect(query(page, 'slot[name="footer"]')).toBeTruthy();
    expect(query(page, '.tk-color-picker-panel-footer')).toBeNull();
  });

  it('wraps the footer-actions slot in a styled footer', async () => {
    const page = await setup(`<tk-color-picker inline="true" footer-type="divided"><button slot="footer-actions">Apply</button></tk-color-picker>`);

    const footer = query(page, '.tk-color-picker-panel-footer');
    expect(footer.classList.contains('tk-color-picker-panel-footer-divided')).toBe(true);
    expect(footer.querySelector('slot[name="footer-actions"]')).toBeTruthy();
  });

  it('prefixes data-testid on the panel parts', async () => {
    const page = await setup(`<tk-color-picker inline="true" data-testid="cp"></tk-color-picker>`);

    expect(query(page, '[data-testid="cp-container"]')).toBeTruthy();
    expect(query(page, '[data-testid="cp-saturation"]')).toBeTruthy();
    expect(query(page, '[data-testid="cp-preset-0"]')).toBeTruthy();
  });
});
