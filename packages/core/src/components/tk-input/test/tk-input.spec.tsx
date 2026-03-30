jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
  isNil: (value: unknown) => value === null || value === undefined,
}));

import { newSpecPage } from '@stencil/core/testing';
import { TkInput } from '../tk-input';

describe('tk-input', () => {
  it('renders the label asterisk when showAsterisk is true', async () => {
    const page = await newSpecPage({
      components: [TkInput],
      html: `<tk-input label="Name" show-asterisk="true"></tk-input>`,
    });

    expect(page.root.querySelector('.label .asterisk')?.textContent).toBe('*');
  });
});
