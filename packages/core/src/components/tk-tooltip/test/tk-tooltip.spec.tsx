import { newSpecPage } from '@stencil/core/testing';
import { TkTooltip } from '../tk-tooltip';
import { TkIcon } from '../../tk-icon/tk-icon';

describe('tk-tooltip', () => {
  it('shows tooltip content on hover', async () => {
    const page = await newSpecPage({
      components: [TkTooltip, TkIcon],
      html: `<tk-tooltip header="Info" description="Details"><button slot="trigger">Hover</button></tk-tooltip>`,
    });

    const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('.tk-tooltip-content')).toBeTruthy();
  });

  describe('dataTestid', () => {
    it('applies semantic data-testid attributes on default tooltip content', async () => {
      const page = await newSpecPage({
        components: [TkTooltip, TkIcon],
        html: `<tk-tooltip data-testid="my-tooltip" header="Info" description="Details" icon="info"><button slot="trigger">Hover</button></tk-tooltip>`,
      });

      const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
      trigger.dispatchEvent(new Event('mouseenter'));
      await page.waitForChanges();

      expect(page.root.shadowRoot.querySelector('[data-testid="my-tooltip-container"]')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('[data-testid="my-tooltip-content"]')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('[data-testid="my-tooltip-header"]')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('[data-testid="my-tooltip-description"]')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('[data-testid="my-tooltip-arrow"]')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('[data-testid="my-tooltip-left"]')).toBeTruthy();
    });

    it('keeps semantic ids with custom content slot', async () => {
      const page = await newSpecPage({
        components: [TkTooltip, TkIcon],
        html: `<tk-tooltip data-testid="my-tooltip"><button slot="trigger">Hover</button><div slot="content">Custom</div></tk-tooltip>`,
      });

      const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
      trigger.dispatchEvent(new Event('mouseenter'));
      await page.waitForChanges();

      expect(page.root.shadowRoot.querySelector('[data-testid="my-tooltip-content"]')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('[data-testid="my-tooltip-arrow"]')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('[data-testid="my-tooltip-header"]')).toBeFalsy();
      expect(page.root.shadowRoot.querySelector('[data-testid="my-tooltip-description"]')).toBeFalsy();
    });

    it('does not set data-testid when not provided', async () => {
      const page = await newSpecPage({
        components: [TkTooltip, TkIcon],
        html: `<tk-tooltip header="Info" description="Details"><button slot="trigger">Hover</button></tk-tooltip>`,
      });

      const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
      trigger.dispatchEvent(new Event('mouseenter'));
      await page.waitForChanges();

      expect(page.root.shadowRoot.querySelector('[data-testid]')).toBeFalsy();
    });
  });
});
