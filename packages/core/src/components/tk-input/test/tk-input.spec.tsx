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

  it('assigns unique data-testid values to password strength lines', async () => {
    const page = await newSpecPage({
      components: [TkInput],
      html: `<tk-input mode="password" show-safety-status="true" data-testid="secure-input"></tk-input>`,
    });

    const safetyStatus = page.root.querySelector('.safety-status');
    const lines = Array.from(page.root.querySelectorAll('.safety-status .line'));

    expect(safetyStatus?.getAttribute('data-testid')).toBe('secure-input-safety-status');
    expect(lines).toHaveLength(4);
    expect(lines.map(line => line.getAttribute('data-testid'))).toEqual([
      'secure-input-strength-line-0',
      'secure-input-strength-line-1',
      'secure-input-strength-line-2',
      'secure-input-strength-line-3',
    ]);
  });
});
