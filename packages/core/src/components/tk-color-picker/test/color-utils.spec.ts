import { hslToRgb, rgbToHsla, hslaToHex, hslaToCss, parseColor, rgbToHsva, hsvaToRgb, hsvaToHex, hsvaToCss, parseColorToHsva } from '../color-utils';

describe('color-utils', () => {
  describe('hslToRgb', () => {
    // One case per hue sector, since the function branches on `h / 60`.
    it.each([
      ['red', 0, { r: 255, g: 0, b: 0 }],
      ['yellow', 60, { r: 255, g: 255, b: 0 }],
      ['green', 120, { r: 0, g: 255, b: 0 }],
      ['cyan', 180, { r: 0, g: 255, b: 255 }],
      ['blue', 240, { r: 0, g: 0, b: 255 }],
      ['magenta', 300, { r: 255, g: 0, b: 255 }],
    ])('converts fully saturated %s', (_name, h, expected) => {
      expect(hslToRgb(h, 1, 0.5)).toEqual(expected);
    });

    it('converts an unsaturated color to gray', () => {
      expect(hslToRgb(0, 0, 0.5)).toEqual({ r: 128, g: 128, b: 128 });
    });

    it('converts the lightness extremes to black and white', () => {
      expect(hslToRgb(210, 1, 0)).toEqual({ r: 0, g: 0, b: 0 });
      expect(hslToRgb(210, 1, 1)).toEqual({ r: 255, g: 255, b: 255 });
    });
  });

  describe('rgbToHsla', () => {
    it('converts red', () => {
      expect(rgbToHsla(255, 0, 0, 1)).toEqual({ h: 0, s: 1, l: 0.5, a: 1 });
    });

    it('converts green and blue through their own max branches', () => {
      expect(rgbToHsla(0, 255, 0, 1)).toEqual({ h: 120, s: 1, l: 0.5, a: 1 });
      expect(rgbToHsla(0, 0, 255, 1)).toEqual({ h: 240, s: 1, l: 0.5, a: 1 });
    });

    it('wraps the hue past 360 when green is below blue', () => {
      const hsla = rgbToHsla(255, 0, 128, 1);
      expect(hsla.h).toBeCloseTo(329.88, 1);
    });

    it('reports achromatic input with zero saturation', () => {
      expect(rgbToHsla(0, 0, 0, 1)).toEqual({ h: 0, s: 0, l: 0, a: 1 });
      expect(rgbToHsla(255, 255, 255, 1)).toEqual({ h: 0, s: 0, l: 1, a: 1 });
      expect(rgbToHsla(128, 128, 128, 1)).toMatchObject({ h: 0, s: 0 });
    });

    it('uses the light-color saturation formula above 50% lightness', () => {
      const hsla = rgbToHsla(255, 128, 128, 1);
      expect(hsla.l).toBeGreaterThan(0.5);
      expect(hsla.s).toBeCloseTo(1, 5);
    });

    it('passes alpha through untouched', () => {
      expect(rgbToHsla(255, 0, 0, 0.25).a).toBe(0.25);
    });
  });

  describe('hslaToHex', () => {
    it('omits the alpha channel when the color is opaque', () => {
      expect(hslaToHex({ h: 0, s: 1, l: 0.5, a: 1 })).toBe('#ff0000');
    });

    it('appends the alpha channel when the color is translucent', () => {
      expect(hslaToHex({ h: 0, s: 1, l: 0.5, a: 0.5 })).toBe('#ff000080');
      expect(hslaToHex({ h: 0, s: 1, l: 0.5, a: 0 })).toBe('#ff000000');
    });

    it('pads single-digit channels to two characters', () => {
      expect(hslaToHex({ h: 0, s: 0, l: 0, a: 1 })).toBe('#000000');
    });
  });

  describe('hslaToCss', () => {
    const red = { h: 0, s: 1, l: 0.5, a: 1 };

    it('formats as hex', () => {
      expect(hslaToCss(red, 'hex')).toBe('#ff0000');
    });

    it('formats as rgba with two-decimal alpha', () => {
      expect(hslaToCss({ ...red, a: 0.5 }, 'rgba')).toBe('rgba(255, 0, 0, 0.50)');
    });

    it('falls back to hex for an unknown format', () => {
      expect(hslaToCss(red, 'not-a-format')).toBe('#ff0000');
    });
  });

  describe('parseColor', () => {
    it('returns the default color for empty input', () => {
      expect(parseColor('')).toEqual({ h: 0, s: 0, l: 0, a: 1 });
      expect(parseColor(undefined as unknown as string)).toEqual({ h: 0, s: 0, l: 0, a: 1 });
    });

    it('parses 3-, 6- and 8-digit hex', () => {
      expect(parseColor('#f00')).toEqual({ h: 0, s: 1, l: 0.5, a: 1 });
      expect(parseColor('#ff0000')).toEqual({ h: 0, s: 1, l: 0.5, a: 1 });
      expect(parseColor('#ff000080').a).toBeCloseTo(0.502, 3);
    });

    it('parses rgb and rgba', () => {
      expect(parseColor('rgb(255, 0, 0)')).toEqual({ h: 0, s: 1, l: 0.5, a: 1 });
      expect(parseColor('rgba(255, 0, 0, 0.5)').a).toBe(0.5);
    });

    it('parses hsl and hsla without a round trip', () => {
      expect(parseColor('hsl(120, 100%, 50%)')).toEqual({ h: 120, s: 1, l: 0.5, a: 1 });
      expect(parseColor('hsla(120, 100%, 50%, 0.5)').a).toBe(0.5);
    });

    it('trims surrounding whitespace', () => {
      expect(parseColor('   #f00   ')).toEqual({ h: 0, s: 1, l: 0.5, a: 1 });
    });

    it('returns the default color for malformed input', () => {
      expect(parseColor('not-a-color')).toEqual({ h: 0, s: 0, l: 0, a: 1 });
      expect(parseColor('#ff')).toEqual({ h: 0, s: 0, l: 0, a: 1 });
      expect(parseColor('rgb(')).toEqual({ h: 0, s: 0, l: 0, a: 1 });
      expect(parseColor('hsl(')).toEqual({ h: 0, s: 0, l: 0, a: 1 });
    });
  });

  describe('rgbToHsva', () => {
    it('converts red', () => {
      expect(rgbToHsva(255, 0, 0, 1)).toEqual({ h: 0, s: 100, v: 100, a: 1 });
    });

    it('converts green and blue through their own max branches', () => {
      expect(rgbToHsva(0, 255, 0, 1)).toEqual({ h: 120, s: 100, v: 100, a: 1 });
      expect(rgbToHsva(0, 0, 255, 1)).toEqual({ h: 240, s: 100, v: 100, a: 1 });
    });

    it('wraps the hue past 360 when green is below blue', () => {
      expect(rgbToHsva(255, 0, 128, 1).h).toBeCloseTo(329.88, 1);
    });

    it('reports black with zero saturation and value', () => {
      expect(rgbToHsva(0, 0, 0, 1)).toEqual({ h: 0, s: 0, v: 0, a: 1 });
    });

    it('reports white with zero saturation and full value', () => {
      expect(rgbToHsva(255, 255, 255, 1)).toEqual({ h: 0, s: 0, v: 100, a: 1 });
    });

    it('defaults alpha to 1 when omitted', () => {
      expect(rgbToHsva(255, 0, 0).a).toBe(1);
    });
  });

  describe('hsvaToRgb', () => {
    // One case per `i % 6` sector.
    it.each([
      ['red', 0, { r: 255, g: 0, b: 0 }],
      ['yellow', 60, { r: 255, g: 255, b: 0 }],
      ['green', 120, { r: 0, g: 255, b: 0 }],
      ['cyan', 180, { r: 0, g: 255, b: 255 }],
      ['blue', 240, { r: 0, g: 0, b: 255 }],
      ['magenta', 300, { r: 255, g: 0, b: 255 }],
    ])('converts fully saturated %s', (_name, h, expected) => {
      expect(hsvaToRgb(h, 100, 100)).toEqual(expected);
    });

    it('wraps a hue of 360 back to red', () => {
      expect(hsvaToRgb(360, 100, 100)).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('converts the value extremes to black and white', () => {
      expect(hsvaToRgb(210, 100, 0)).toEqual({ r: 0, g: 0, b: 0 });
      expect(hsvaToRgb(210, 0, 100)).toEqual({ r: 255, g: 255, b: 255 });
    });
  });

  describe('hsvaToHex', () => {
    it('omits the alpha channel when the color is opaque', () => {
      expect(hsvaToHex({ h: 0, s: 100, v: 100, a: 1 })).toBe('#ff0000');
    });

    it('appends the alpha channel when the color is translucent', () => {
      expect(hsvaToHex({ h: 0, s: 100, v: 100, a: 0.5 })).toBe('#ff000080');
    });

    it('pads single-digit channels to two characters', () => {
      expect(hsvaToHex({ h: 0, s: 0, v: 0, a: 1 })).toBe('#000000');
    });
  });

  describe('hsvaToCss', () => {
    const red = { h: 0, s: 100, v: 100, a: 1 };

    it('formats as hex', () => {
      expect(hsvaToCss(red, 'hex')).toBe('#ff0000');
    });

    it('formats as rgba with two-decimal alpha', () => {
      expect(hsvaToCss({ ...red, a: 0.5 }, 'rgba')).toBe('rgba(255, 0, 0, 0.50)');
    });

    it('falls back to hex for an unknown format', () => {
      expect(hsvaToCss(red, 'not-a-format')).toBe('#ff0000');
    });
  });

  describe('parseColorToHsva', () => {
    it('returns the default color for empty input', () => {
      expect(parseColorToHsva('')).toEqual({ h: 0, s: 0, v: 0, a: 1 });
      expect(parseColorToHsva(undefined as unknown as string)).toEqual({ h: 0, s: 0, v: 0, a: 1 });
    });

    it('parses 3-, 6- and 8-digit hex', () => {
      expect(parseColorToHsva('#f00')).toEqual({ h: 0, s: 100, v: 100, a: 1 });
      expect(parseColorToHsva('#ff0000')).toEqual({ h: 0, s: 100, v: 100, a: 1 });
      expect(parseColorToHsva('#ff000080').a).toBeCloseTo(0.502, 3);
    });

    it('parses rgb and rgba', () => {
      expect(parseColorToHsva('rgb(255, 0, 0)')).toEqual({ h: 0, s: 100, v: 100, a: 1 });
      expect(parseColorToHsva('rgba(255, 0, 0, 0.5)').a).toBe(0.5);
    });

    it('parses hsl and hsla by way of rgb', () => {
      expect(parseColorToHsva('hsl(120, 100%, 50%)')).toEqual({ h: 120, s: 100, v: 100, a: 1 });
      expect(parseColorToHsva('hsla(120, 100%, 50%, 0.5)').a).toBe(0.5);
    });

    it('trims surrounding whitespace', () => {
      expect(parseColorToHsva('   #f00   ')).toEqual({ h: 0, s: 100, v: 100, a: 1 });
    });

    it('returns the default color for malformed input', () => {
      expect(parseColorToHsva('not-a-color')).toEqual({ h: 0, s: 0, v: 0, a: 1 });
      expect(parseColorToHsva('rgb(')).toEqual({ h: 0, s: 0, v: 0, a: 1 });
      expect(parseColorToHsva('hsl(')).toEqual({ h: 0, s: 0, v: 0, a: 1 });
    });
  });

  describe('round trips', () => {
    it.each(['#ff0000', '#00ff00', '#0000ff', '#123456', '#abcdef'])('preserves %s through the HSVA conversion', hex => {
      expect(hsvaToHex(parseColorToHsva(hex))).toBe(hex);
    });

    it.each(['#ff0000', '#00ff00', '#0000ff', '#123456'])('preserves %s through the HSLA conversion', hex => {
      expect(hslaToHex(parseColor(hex))).toBe(hex);
    });
  });
});
