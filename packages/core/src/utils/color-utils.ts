export interface HSLA {
  h: number; // 0–360
  s: number; // 0–1
  l: number; // 0–1
  a: number; // 0–1
}

export interface HSVA {
  h: number; // 0–360
  s: number; // 0–100
  v: number; // 0–100
  a: number; // 0–1
}

export function hslToRgb(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  let r = 0,
    g = 0,
    b = 0;

  if (hh >= 0 && hh < 1) {
    r = c;
    g = x;
    b = 0;
  } else if (hh < 2) {
    r = x;
    g = c;
    b = 0;
  } else if (hh < 3) {
    r = 0;
    g = c;
    b = x;
  } else if (hh < 4) {
    r = 0;
    g = x;
    b = c;
  } else if (hh < 5) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  const m = l - c / 2;
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export function rgbToHsla(r: number, g: number, b: number, a: number): HSLA {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = h * 60;
  }

  return { h, s, l, a };
}

export function hslaToHex(hsla: HSLA): string {
  const { r, g, b } = hslToRgb(hsla.h, hsla.s, hsla.l);
  // Only include alpha if it's not 1
  if (hsla.a < 1) {
    const aa = Math.round(hsla.a * 255)
      .toString(16)
      .padStart(2, '0');
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}${aa}`;
  }
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

export function hslaToCss(hsla: HSLA, format: string): string {
  const { h, s, l, a } = hsla;
  switch (format) {
    case 'hex':
      return hslaToHex(hsla);
    case 'rgba': {
      const { r, g, b } = hslToRgb(h, s, l);
      return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
    }
    default:
      return hslaToHex(hsla);
  }
}

export function parseColor(input: string): HSLA {
  if (!input) return { h: 0, s: 0, l: 0, a: 1 };
  input = input.trim();

  // Hex
  if (input.startsWith('#')) {
    const hex = input.slice(1);
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else if (hex.length === 8) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      const aa = parseInt(hex.slice(6, 8), 16);
      return rgbToHsla(r, g, b, aa / 255);
    }
    return rgbToHsla(r, g, b, 1);
  }

  // rgb(a)
  if (input.startsWith('rgb')) {
    const parts = input.match(/rgba?\(([^)]+)\)/);
    if (parts) {
      const comps = parts[1].split(',').map(x => x.trim());
      const r = Number(comps[0]);
      const g = Number(comps[1]);
      const b = Number(comps[2]);
      const a = comps.length === 4 ? Number(comps[3]) : 1;
      return rgbToHsla(r, g, b, a);
    }
  }

  // hsl(a) - kept for backward compatibility (input only, no output)
  if (input.startsWith('hsl')) {
    const parts = input.match(/hsla?\(([^)]+)\)/);
    if (parts) {
      const comps = parts[1].split(',').map(x => x.trim());
      const h = Number(comps[0]);
      const s = Number(comps[1].replace('%', '')) / 100;
      const l = Number(comps[2].replace('%', '')) / 100;
      const a = comps.length === 4 ? Number(comps[3]) : 1;
      return { h, s, l, a };
    }
  }

  return { h: 0, s: 0, l: 0, a: 1 };
}

// ============ HSVA Conversion Functions ============

export function rgbToHsva(r: number, g: number, b: number, a: number = 1): HSVA {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  const s = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;

  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }

  return { h, s, v, a };
}

export function hsvaToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  h = h / 360;
  s = s / 100;
  v = v / 100;

  let r = 0,
    g = 0,
    b = 0;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function hsvaToHex(hsva: HSVA): string {
  const { r, g, b } = hsvaToRgb(hsva.h, hsva.s, hsva.v);
  if (hsva.a < 1) {
    const aa = Math.round(hsva.a * 255)
      .toString(16)
      .padStart(2, '0');
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}${aa}`;
  }
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

export function hsvaToCss(hsva: HSVA, format: string): string {
  const { h, s, v, a } = hsva;
  switch (format) {
    case 'hex':
      return hsvaToHex(hsva);
    case 'rgba': {
      const { r, g, b } = hsvaToRgb(h, s, v);
      return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
    }
    default:
      return hsvaToHex(hsva);
  }
}

export function parseColorToHsva(input: string): HSVA {
  if (!input) return { h: 0, s: 0, v: 0, a: 1 };
  input = input.trim();

  // Hex
  if (input.startsWith('#')) {
    const hex = input.slice(1);
    let r = 0,
      g = 0,
      b = 0,
      a = 1;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else if (hex.length === 8) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      a = parseInt(hex.slice(6, 8), 16) / 255;
    }
    return rgbToHsva(r, g, b, a);
  }

  // rgb(a)
  if (input.startsWith('rgb')) {
    const parts = input.match(/rgba?\(([^)]+)\)/);
    if (parts) {
      const comps = parts[1].split(',').map(x => x.trim());
      const r = Number(comps[0]);
      const g = Number(comps[1]);
      const b = Number(comps[2]);
      const a = comps.length === 4 ? Number(comps[3]) : 1;
      return rgbToHsva(r, g, b, a);
    }
  }

  // hsl(a) - convert to HSVA
  if (input.startsWith('hsl')) {
    const parts = input.match(/hsla?\(([^)]+)\)/);
    if (parts) {
      const comps = parts[1].split(',').map(x => x.trim());
      const h = Number(comps[0]);
      const s = Number(comps[1].replace('%', '')) / 100;
      const l = Number(comps[2].replace('%', '')) / 100;
      const a = comps.length === 4 ? Number(comps[3]) : 1;
      // Convert HSL to RGB then to HSVA
      const { r, g, b } = hslToRgb(h, s, l);
      return rgbToHsva(r, g, b, a);
    }
  }

  return { h: 0, s: 0, v: 0, a: 1 };
}
