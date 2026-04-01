import { newSpecPage } from '@stencil/core/testing';
import { TkCurrencyInput } from '../tk-currency-input';

describe('tk-currency-input', () => {
  it('shows the selected currency code in the trigger button', async () => {
    const page = await newSpecPage({
      components: [TkCurrencyInput],
      html: `<tk-currency-input default-currency="USD"></tk-currency-input>`,
    });

    expect(page.root.querySelector('.tk-currency-input-dropdown-button-currency-code')?.textContent).toBe('USD');
  });
});
