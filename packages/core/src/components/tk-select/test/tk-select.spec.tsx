jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
  some: (items: unknown[], predicate: (item: unknown) => boolean) => (items || []).some(predicate),
  remove: (items: unknown[], predicate: (item: unknown) => boolean) => {
    const removed: unknown[] = [];
    for (let i = items.length - 1; i >= 0; i--) {
      if (predicate(items[i])) {
        removed.unshift(items[i]);
        items.splice(i, 1);
      }
    }
    return removed;
  },
}));

import { newSpecPage } from '@stencil/core/testing';
import { TkSelect } from '../tk-select';
import { TkInput } from '../../tk-input/tk-input';

type TkSelectTestInstance = {
  inputRef: HTMLTkInputElement;
};

describe('tk-select', () => {
  it('passes the selected label into the input', async () => {
    const page = await newSpecPage({
      components: [TkSelect, TkInput],
      html: `<tk-select></tk-select>`,
    });

    page.root.options = ['One', 'Two'];
    page.root.value = 'Two';
    await page.waitForChanges();

    expect((page.rootInstance as unknown as TkSelectTestInstance).inputRef.value).toBe('Two');
  });
});
