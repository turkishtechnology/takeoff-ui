import { TkCard } from '../tk-card';

type TkCardTestInstance = {
  hasHeaderSlot: boolean;
  hasAvatarSlot: boolean;
  createHeader: () => unknown;
};

describe('tk-card', () => {
  it('builds a header vnode containing the provided title', () => {
    const instance = new TkCard();
    const testInstance = instance as unknown as TkCardTestInstance;

    instance.header = 'Card title';
    instance.hideHeader = false;
    instance.imageOptions = { position: 'top', background: false, windowed: true };
    testInstance.hasHeaderSlot = false;
    testInstance.hasAvatarSlot = false;

    expect(JSON.stringify(testInstance.createHeader())).toContain('Card title');
  });
});
