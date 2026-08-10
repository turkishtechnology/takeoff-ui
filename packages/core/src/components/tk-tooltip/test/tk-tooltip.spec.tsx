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

  it('stays closed when no trigger slot is provided', async () => {
    const page = await newSpecPage({
      components: [TkTooltip, TkIcon],
      html: `<tk-tooltip header="Info" description="Details"></tk-tooltip>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-tooltip-content')).toBeNull();
    expect((page.rootInstance as any).triggerElement).toBeNull();
  });

  it('hides tooltip content on mouseleave', async () => {
    const page = await newSpecPage({
      components: [TkTooltip, TkIcon],
      html: `<tk-tooltip header="Info" description="Details"><button slot="trigger">Hover</button></tk-tooltip>`,
    });

    const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.tk-tooltip-content')).toBeTruthy();

    trigger.dispatchEvent(new Event('mouseleave'));
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('.tk-tooltip-content')).toBeNull();
  });

  it('cleans up the floating listeners when the tooltip closes', async () => {
    const page = await newSpecPage({
      components: [TkTooltip, TkIcon],
      html: `<tk-tooltip header="Info"><button slot="trigger">Hover</button></tk-tooltip>`,
    });

    const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    const instance = page.rootInstance as any;
    const cleanupSpy = jest.fn();
    instance.cleanup = cleanupSpy;

    trigger.dispatchEvent(new Event('mouseleave'));
    await page.waitForChanges();

    expect(cleanupSpy).toHaveBeenCalled();
    expect(instance.cleanup).toBeNull();
  });

  it('replaces the floating listeners when the open tooltip re-renders', async () => {
    const page = await newSpecPage({
      components: [TkTooltip, TkIcon],
      html: `<tk-tooltip header="Info"><button slot="trigger">Hover</button></tk-tooltip>`,
    });

    const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    const instance = page.rootInstance as any;
    const cleanupSpy = jest.fn();
    instance.cleanup = cleanupSpy;

    page.root.header = 'Updated';
    await page.waitForChanges();

    expect(cleanupSpy).toHaveBeenCalled();
    expect(instance.cleanup).not.toBe(cleanupSpy);
    expect(instance.cleanup).toBeTruthy();
  });

  it('updates the position when the position prop changes while open', async () => {
    const page = await newSpecPage({
      components: [TkTooltip, TkIcon],
      html: `<tk-tooltip header="Info"><button slot="trigger">Hover</button></tk-tooltip>`,
    });

    const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    const instance = page.rootInstance as any;
    const updatePositionSpy = jest.spyOn(instance, 'updatePosition');

    page.root.position = 'top';
    await page.waitForChanges();

    expect(updatePositionSpy).toHaveBeenCalled();
  });

  it('does not update the position when the position prop changes while closed', async () => {
    const page = await newSpecPage({
      components: [TkTooltip, TkIcon],
      html: `<tk-tooltip header="Info"><button slot="trigger">Hover</button></tk-tooltip>`,
    });

    const instance = page.rootInstance as any;
    const updatePositionSpy = jest.spyOn(instance, 'updatePosition');

    page.root.position = 'bottom';
    await page.waitForChanges();

    expect(updatePositionSpy).not.toHaveBeenCalled();
  });

  it('cleans up the floating listeners when the component is removed', async () => {
    const page = await newSpecPage({
      components: [TkTooltip, TkIcon],
      html: `<tk-tooltip header="Info"><button slot="trigger">Hover</button></tk-tooltip>`,
    });

    const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    const instance = page.rootInstance as any;
    const cleanupSpy = jest.fn();
    instance.cleanup = cleanupSpy;

    page.root.remove();
    await page.waitForChanges();

    expect(cleanupSpy).toHaveBeenCalled();
    expect(instance.cleanup).toBeNull();
  });

  it('applies the variant class and maps the dark variant icon to neutral', async () => {
    const page = await newSpecPage({
      components: [TkTooltip, TkIcon],
      html: `<tk-tooltip variant="dark" icon="info" header="Info"><button slot="trigger">Hover</button></tk-tooltip>`,
    });

    const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    const content = page.root.shadowRoot.querySelector('.tk-tooltip-content');
    expect(content.classList.contains('tk-tooltip-dark')).toBe(true);
    expect((page.root.shadowRoot.querySelector('tk-icon') as HTMLTkIconElement).variant).toBe('neutral');
  });

  it('passes non-dark variants to the icon as is', async () => {
    const page = await newSpecPage({
      components: [TkTooltip, TkIcon],
      html: `<tk-tooltip variant="success" icon="check" header="Done"><button slot="trigger">Hover</button></tk-tooltip>`,
    });

    const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    expect((page.root.shadowRoot.querySelector('tk-icon') as HTMLTkIconElement).variant).toBe('success');
  });

  it('applies containerStyle to the tooltip content', async () => {
    const page = await newSpecPage({
      components: [TkTooltip, TkIcon],
      html: `<tk-tooltip header="Info"><button slot="trigger">Hover</button></tk-tooltip>`,
    });

    page.root.containerStyle = { backgroundColor: 'red' };
    const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    const content = page.root.shadowRoot.querySelector('.tk-tooltip-content') as HTMLElement;
    expect(content.style.backgroundColor).toBe('red');
  });

  it('renders the content slot instead of header and description when provided', async () => {
    const page = await newSpecPage({
      components: [TkTooltip, TkIcon],
      html: `<tk-tooltip header="Ignored"><button slot="trigger">Hover</button><div slot="content">Custom</div></tk-tooltip>`,
    });

    const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('slot[name="content"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('.tk-tooltip-header')).toBeNull();
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
      expect(page.root.shadowRoot.querySelector('[data-testid="my-tooltip-left-icon"]')).toBeTruthy();
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
