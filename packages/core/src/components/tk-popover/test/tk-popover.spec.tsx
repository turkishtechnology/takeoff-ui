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

  it('renders the panel as a native popover so it lands in the top layer', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    page.rootInstance.isOpen = true;
    await page.waitForChanges();

    // popover="manual" escapes ancestor stacking contexts (e.g. sticky table
    // cells) via the top layer, while leaving dismissal to ClickOutsideMixin.
    expect(page.root.shadowRoot.querySelector('.tk-popover-content')?.getAttribute('popover')).toBe('manual');
  });

  describe('dataTestid', () => {
    it('applies semantic data-testid on root, content and arrow', async () => {
      const page = await newSpecPage({
        components: [TkPopover],
        html: `<tk-popover data-testid="my-pop"><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
      });

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      expect(page.root.shadowRoot.querySelector('[data-testid="my-pop-container"]')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('[data-testid="my-pop-content"]')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('[data-testid="my-pop-arrow"]')).toBeTruthy();
    });

    it('does not set data-testid on slot elements', async () => {
      const page = await newSpecPage({
        components: [TkPopover],
        html: `<tk-popover data-testid="my-pop"><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
      });

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      const triggerSlot = page.root.shadowRoot.querySelector('slot[name="trigger"]');
      const contentSlot = page.root.shadowRoot.querySelector('slot[name="content"]');

      expect(triggerSlot?.getAttribute('data-testid')).toBeNull();
      expect(contentSlot?.getAttribute('data-testid')).toBeNull();
    });
  });
});
