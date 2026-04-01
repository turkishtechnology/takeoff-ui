jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
}));

import { newSpecPage } from '@stencil/core/testing';
import { TkToggleButton } from '../tk-toggle-button';
import { TkToggleButtonGroup } from '../tk-toggle-button-group';

describe('tk-toggle-button-group', () => {
  it('selects the child whose value matches the group value', async () => {
    const page = await newSpecPage({
      components: [TkToggleButtonGroup, TkToggleButton],
      html: `<tk-toggle-button-group value="b"><tk-toggle-button value="a" label="A"></tk-toggle-button><tk-toggle-button value="b" label="B"></tk-toggle-button></tk-toggle-button-group>`,
    });

    expect(page.root.querySelectorAll('tk-toggle-button')[1].selected).toBe(true);
  });
});
