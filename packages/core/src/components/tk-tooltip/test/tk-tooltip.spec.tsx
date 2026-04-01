import { newSpecPage } from '@stencil/core/testing';
import { TkTooltip } from '../tk-tooltip';

describe('tk-tooltip', () => {
  it('shows tooltip content on hover', async () => {
    const page = await newSpecPage({
      components: [TkTooltip],
      html: `<tk-tooltip header="Info" description="Details"><button slot="trigger">Hover</button></tk-tooltip>`,
    });

    const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('.tk-tooltip-content')).toBeTruthy();
  });
});
