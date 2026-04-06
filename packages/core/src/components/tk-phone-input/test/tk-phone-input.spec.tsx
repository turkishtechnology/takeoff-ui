import { newSpecPage } from '@stencil/core/testing';
import { TkPhoneInput } from '../tk-phone-input';

describe('tk-phone-input', () => {
  it('renders the default country dial code', async () => {
    const page = await newSpecPage({
      components: [TkPhoneInput],
      html: `<tk-phone-input default-country="US"></tk-phone-input>`,
    });

    expect(page.root.querySelector('.tk-phone-input-dial-code')?.textContent).toBe('+1');
  });
});
