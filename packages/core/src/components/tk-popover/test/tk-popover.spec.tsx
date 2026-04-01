import { newSpecPage } from '@stencil/core/testing';
import { TkPopover } from '../tk-popover';

describe('tk-popover', () => {
  it('renders slotted content when opened', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    page.rootInstance.isOpen = true;
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('.tk-popover-content')).toBeTruthy();
  });
});
