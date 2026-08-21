jest.mock('../../../utils/position-utils', () => ({
  floatingElementAutoUpdate: jest.fn(() => jest.fn()),
}));

import { newSpecPage } from '@stencil/core/testing';
import { TkPopover } from '../tk-popover';
import { floatingElementAutoUpdate } from '../../../utils/position-utils';

const mockedAutoUpdate = floatingElementAutoUpdate as jest.Mock;

describe('tk-popover', () => {
  beforeEach(() => {
    mockedAutoUpdate.mockClear();
  });

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

  it('toggles on trigger click and emits tk-change', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-change', spy);

    const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;
    trigger.click();
    await page.waitForChanges();

    expect(page.rootInstance.isOpen).toBe(true);
    expect(page.root.shadowRoot.querySelector('.tk-popover-content')).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe(true);

    trigger.click();
    await page.waitForChanges();

    expect(page.rootInstance.isOpen).toBe(false);
    expect(page.root.shadowRoot.querySelector('.tk-popover-content')).toBeFalsy();
    expect(spy.mock.calls[1][0].detail).toBe(false);
  });

  it('opens on mouseenter and closes on mouseleave when trigger is hover', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover trigger="hover"><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    const trigger = page.root.querySelector('[slot="trigger"]') as HTMLElement;

    trigger.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();
    expect(page.rootInstance.isOpen).toBe(true);

    trigger.dispatchEvent(new Event('mouseleave'));
    await page.waitForChanges();
    expect(page.rootInstance.isOpen).toBe(false);
  });

  it('closes via the close() method and emits tk-change', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    page.rootInstance.isOpen = true;
    await page.waitForChanges();

    const spy = jest.fn();
    page.root.addEventListener('tk-change', spy);

    await page.root.close();
    await page.waitForChanges();

    expect(page.rootInstance.isOpen).toBe(false);
    expect(page.root.shadowRoot.querySelector('.tk-popover-content')).toBeFalsy();
    expect(spy.mock.calls[0][0].detail).toBe(false);
  });

  it('sets up floating positioning when opened and recomputes on position change', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover position="bottom"><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    page.rootInstance.isOpen = true;
    await page.waitForChanges();

    expect(mockedAutoUpdate).toHaveBeenCalledTimes(1);
    expect(mockedAutoUpdate.mock.calls[0][3]).toEqual({ placement: 'bottom' });

    page.root.position = 'top';
    await page.waitForChanges();

    expect(mockedAutoUpdate.mock.calls.length).toBeGreaterThan(1);
    expect(mockedAutoUpdate.mock.calls[mockedAutoUpdate.mock.calls.length - 1][3]).toEqual({ placement: 'top' });
  });

  it('does not recompute position on position change while closed', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    page.root.position = 'left';
    await page.waitForChanges();

    expect(mockedAutoUpdate).not.toHaveBeenCalled();
  });

  it('tears down floating listeners when closed', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    page.rootInstance.isOpen = true;
    await page.waitForChanges();

    const cleanup = mockedAutoUpdate.mock.results[0].value as jest.Mock;

    page.rootInstance.isOpen = false;
    await page.waitForChanges();

    expect(cleanup).toHaveBeenCalled();
    expect((page.rootInstance as any).cleanup).toBeNull();
  });

  it('cleans up floating listeners and the click outside mixin on disconnect', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    page.rootInstance.isOpen = true;
    await page.waitForChanges();

    const cleanup = mockedAutoUpdate.mock.results[0].value as jest.Mock;
    const mixinSpy = jest.spyOn((page.rootInstance as any).clickOutsideMixin, 'disconnectedCallback');

    page.rootInstance.disconnectedCallback();

    expect(cleanup).toHaveBeenCalled();
    expect((page.rootInstance as any).cleanup).toBeNull();
    expect(mixinSpy).toHaveBeenCalled();
  });

  it('handles disconnect for hover triggers without errors', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover trigger="hover"><button slot="trigger">Open</button></tk-popover>`,
    });

    expect(() => page.rootInstance.disconnectedCallback()).not.toThrow();
  });

  it('closes when the click outside handler fires', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    page.rootInstance.isOpen = true;
    await page.waitForChanges();

    (page.rootInstance as any).closeHandler();
    await page.waitForChanges();

    expect(page.rootInstance.isOpen).toBe(false);
  });

  it('stops click propagation inside the panel', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    page.rootInstance.isOpen = true;
    await page.waitForChanges();

    const content = page.root.shadowRoot.querySelector('.tk-popover-content') as HTMLElement;
    const event = new Event('click', { bubbles: true });
    const stopSpy = jest.spyOn(event, 'stopPropagation');

    content.dispatchEvent(event);

    expect(stopSpy).toHaveBeenCalled();
  });

  it('promotes the panel to the top layer when the Popover API is available', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    const showPopover = jest.fn();
    (page.rootInstance as any).popoverElement = {
      showPopover,
      isConnected: true,
      matches: () => false,
    };

    (page.rootInstance as any).showInTopLayer();
    expect(showPopover).toHaveBeenCalledTimes(1);
  });

  it('skips top layer promotion when already open or unavailable', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    const showPopover = jest.fn();
    (page.rootInstance as any).popoverElement = {
      showPopover,
      isConnected: true,
      matches: () => true,
    };
    (page.rootInstance as any).showInTopLayer();
    expect(showPopover).not.toHaveBeenCalled();

    (page.rootInstance as any).popoverElement = { isConnected: true };
    expect(() => (page.rootInstance as any).showInTopLayer()).not.toThrow();
  });

  it('swallows showPopover errors for detached elements', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    (page.rootInstance as any).popoverElement = {
      showPopover: () => {
        throw new Error('not eligible');
      },
      isConnected: true,
      matches: () => false,
    };

    expect(() => (page.rootInstance as any).showInTopLayer()).not.toThrow();
  });

  it('applies the type class and container style to the panel', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover type="dark"><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>`,
    });

    page.root.containerStyle = { width: '200px' };
    page.rootInstance.isOpen = true;
    await page.waitForChanges();

    const content = page.root.shadowRoot.querySelector('.tk-popover-content') as HTMLElement;
    expect(content.classList.contains('tk-popover-dark')).toBe(true);
    expect(content.getAttribute('style')).toContain('width: 200px');
  });

  it('does not render a content slot when none is provided', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button></tk-popover>`,
    });

    page.rootInstance.isOpen = true;
    await page.waitForChanges();

    expect(page.rootInstance.hasContentSlot).toBe(false);
    expect(page.root.shadowRoot.querySelector('slot[name="content"]')).toBeFalsy();
  });

  it('renders without a trigger element', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover></tk-popover>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-popover')).toBeTruthy();
    expect(() => page.rootInstance.disconnectedCallback()).not.toThrow();
  });

  it('renders a hover popover without a trigger element', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover trigger="hover"></tk-popover>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-popover')).toBeTruthy();
    expect(() => page.rootInstance.disconnectedCallback()).not.toThrow();
  });

  it('skips top layer promotion for disconnected elements', async () => {
    const page = await newSpecPage({
      components: [TkPopover],
      html: `<tk-popover><button slot="trigger">Open</button></tk-popover>`,
    });

    const showPopover = jest.fn();
    (page.rootInstance as any).popoverElement = {
      showPopover,
      isConnected: false,
      matches: () => false,
    };

    (page.rootInstance as any).showInTopLayer();
    expect(showPopover).not.toHaveBeenCalled();
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
