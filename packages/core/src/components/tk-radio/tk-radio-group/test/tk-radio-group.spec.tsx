jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
}));

import { newSpecPage } from '@stencil/core/testing';
import { TkRadioGroup } from '../tk-radio-group';
import { TkRadio } from '../../tk-radio';

describe('tk-radio-group', () => {
  it('marks the radio matching the current value as checked', async () => {
    const page = await newSpecPage({
      components: [TkRadioGroup, TkRadio],
      html: `<tk-radio-group value="b"><tk-radio label="A" value="a"></tk-radio><tk-radio label="B" value="b"></tk-radio></tk-radio-group>`,
    });

    page.rootInstance.handleSlotChange();
    await page.waitForChanges();

    expect(page.root.querySelectorAll('tk-radio')[1].checked).toBe(true);
  });
});
