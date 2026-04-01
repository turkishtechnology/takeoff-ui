import { TkColorPicker } from '../tk-color-picker';

type TkColorPickerTestInstance = {
  internalHSVA: { h: number; s: number; v: number; a: number };
  currentFormat: string;
};

describe('tk-color-picker', () => {
  it('returns the current value through getValue', async () => {
    const instance = new TkColorPicker();
    const testInstance = instance as unknown as TkColorPickerTestInstance;

    testInstance.internalHSVA = { h: 0, s: 100, v: 100, a: 1 };
    testInstance.currentFormat = 'hex';

    await expect(instance.getValue('hex')).resolves.toBe('#ff0000');
  });
});
