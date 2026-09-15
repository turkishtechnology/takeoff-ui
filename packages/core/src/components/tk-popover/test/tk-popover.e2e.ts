import { newE2EPage } from '@stencil/core/testing';

// The trigger sits below the fold so scrolling past it makes Floating UI report it as hidden.
const SCROLLABLE_POPOVER =
  '<div style="height: 1200px; padding-top: 900px;"><tk-popover><button slot="trigger">Open</button><div slot="content"><span id="slotted-content">Body</span></div></tk-popover></div>';

const panelVisibilityIs = (expected: string) => {
  const panel = document.querySelector('tk-popover')?.shadowRoot?.querySelector('.tk-popover-content');
  return !!panel && getComputedStyle(panel).visibility === expected;
};

describe('tk-popover', () => {
  it('opens on trigger click and emits open state', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-popover data-testid="my-pop"><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>');

    const popover = await page.find('tk-popover');
    const changeSpy = await popover.spyOnEvent('tk-change');
    const trigger = await page.find('tk-popover [slot="trigger"]');

    await trigger.click();
    await page.waitForChanges();

    const content = await page.find('tk-popover >>> .tk-popover-content');
    const rootWithId = await page.find('tk-popover >>> [data-testid="my-pop-container"]');
    const contentWithId = await page.find('tk-popover >>> [data-testid="my-pop-content"]');
    const arrowWithId = await page.find('tk-popover >>> [data-testid="my-pop-arrow"]');
    const triggerSlot = await page.find('tk-popover >>> slot[name="trigger"]');
    const contentSlot = await page.find('tk-popover >>> slot[name="content"]');

    expect(content).toBeTruthy();
    expect(rootWithId).toBeTruthy();
    expect(contentWithId).toBeTruthy();
    expect(arrowWithId).toBeTruthy();
    expect(await triggerSlot.getAttribute('data-testid')).toBeNull();
    expect(await contentSlot.getAttribute('data-testid')).toBeNull();
    expect(changeSpy).toHaveReceivedEventDetail(true);
  });

  it('renders the open panel in the top layer (native popover)', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-popover><button slot="trigger">Open</button><div slot="content">Body</div></tk-popover>');

    const trigger = await page.find('tk-popover [slot="trigger"]');
    await trigger.click();
    await page.waitForChanges();

    // The panel must be promoted to the top layer so it escapes ancestor
    // stacking contexts (the sticky-table-cell z-index bug). Assert via the
    // :popover-open pseudo-class, which only matches top-layer popovers.
    const isInTopLayer = await page.evaluate(() => {
      const panel = document.querySelector('tk-popover')?.shadowRoot?.querySelector('.tk-popover-content');
      return !!panel && panel.matches(':popover-open');
    });

    expect(isInTopLayer).toBe(true);
  });

  it('hides the panel and its slotted content when the trigger scrolls out of view', async () => {
    const page = await newE2EPage();

    await page.setContent(SCROLLABLE_POPOVER);

    const trigger = await page.find('tk-popover [slot="trigger"]');
    await trigger.click();
    await page.waitForChanges();

    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForFunction(panelVisibilityIs, {}, 'hidden');

    const visibility = await page.evaluate(() => ({
      // The slotted content lives in light DOM and must inherit the panel's hidden state.
      slotted: getComputedStyle(document.querySelector('#slotted-content')).visibility,
      // Only the panel is clipped out of view - the trigger must stay visible and clickable.
      trigger: getComputedStyle(document.querySelector('tk-popover [slot="trigger"]')).visibility,
    }));

    expect(visibility.slotted).toBe('hidden');
    expect(visibility.trigger).toBe('visible');
  });

  it('shows the panel again when it is reopened after closing while hidden', async () => {
    const page = await newE2EPage();

    await page.setContent(SCROLLABLE_POPOVER);

    const trigger = await page.find('tk-popover [slot="trigger"]');
    await trigger.click();
    await page.waitForChanges();

    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForFunction(panelVisibilityIs, {}, 'hidden');

    await page.evaluate(() => document.querySelector('tk-popover').close());
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForChanges();

    await trigger.click();
    await page.waitForChanges();
    await page.waitForFunction(panelVisibilityIs, {}, 'visible');

    expect(await page.evaluate(() => getComputedStyle(document.querySelector('#slotted-content')).visibility)).toBe('visible');
  });
});
