import { Component, Prop, h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TkDatePicker } from '../tk-datepicker';

@Component({
  tag: 'tk-input',
})
class MockTkInput {
  @Prop() showAsterisk: boolean;

  render() {
    return h('div', null, this.showAsterisk ? '*' : '');
  }
}

describe('tk-datepicker', () => {
  it('passes the required marker to its input when configured', async () => {
    const page = await newSpecPage({
      components: [TkDatePicker, MockTkInput],
      html: `<tk-datepicker label="Start date" show-asterisk="true"></tk-datepicker>`,
    });

    expect(page.root.shadowRoot.querySelector('tk-input')?.showAsterisk).toBe(true);
  });
});
