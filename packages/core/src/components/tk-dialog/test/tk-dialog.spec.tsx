import { TkDialog } from '../tk-dialog';

type TkDialogTestInstance = {
  hasHeaderSlot: boolean;
  createHeader: () => unknown;
};

describe('tk-dialog', () => {
  it('builds a header vnode containing the provided title', () => {
    const instance = new TkDialog();
    const testInstance = instance as unknown as TkDialogTestInstance;

    instance.header = 'Confirm';
    instance.showHeader = true;
    instance.showVariantSign = false;
    testInstance.hasHeaderSlot = false;

    expect(JSON.stringify(testInstance.createHeader())).toContain('Confirm');
  });
});
