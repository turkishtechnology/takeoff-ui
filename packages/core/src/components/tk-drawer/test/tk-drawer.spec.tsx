import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkDrawer } from '../tk-drawer';
import { TkButton } from '../../tk-button/tk-button';

describe('tk-drawer', () => {
  it('renders closed by default and visible when open is true', async () => {
    const closedPage = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer></tk-drawer>`,
    });

    expect(closedPage.root.shadowRoot.querySelector('.tk-drawer-mask')).toBeFalsy();

    const openPage = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true" header="Test Header"></tk-drawer>`,
    });

    const mask = openPage.root.shadowRoot.querySelector('.tk-drawer-mask');
    const label = openPage.root.shadowRoot.querySelector('.tk-drawer-header-label');

    expect(mask).toBeTruthy();
    expect(mask.classList.contains('tk-drawer-visible')).toBe(true);
    expect(label.textContent).toBe('Test Header');
  });

  it('emits close when the header close button is used', async () => {
    const page = await newSpecPage({
      components: [TkDrawer, TkButton],
      html: `<tk-drawer open="true" header="Test"></tk-drawer>`,
    });

    const closeSpy = jest.fn();

    page.root.addEventListener('tk-drawer-close', closeSpy);
    page.root.shadowRoot.querySelector('tk-button').dispatchEvent(new CustomEvent('tk-click', { bubbles: true, composed: true }));
    await page.waitForChanges();

    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(page.root.open).toBe(true);
  });

  it('emits open and close events from public methods', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer></tk-drawer>`,
    });

    const openSpy = jest.fn();
    const closeSpy = jest.fn();

    page.root.addEventListener('tk-drawer-open', openSpy);
    page.root.addEventListener('tk-drawer-close', closeSpy);

    await page.root.show();
    await page.root.close();

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('applies header, footer and mask classes', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `
        <tk-drawer open="true" header-type="dark" footer-type="divided" mask-variant="dark" hide-backdrop="true">
          <div slot="footer">Footer</div>
        </tk-drawer>
      `,
    });

    expect(page.root.shadowRoot.querySelector('.tk-drawer-header').classList.contains('tk-drawer-header-dark')).toBe(true);
    expect(page.root.shadowRoot.querySelector('.tk-drawer-footer').classList.contains('tk-drawer-footer-divided')).toBe(true);
    expect(page.root.shadowRoot.querySelector('.tk-drawer-mask').classList.contains('tk-drawer-mask-dark')).toBe(true);
    expect(page.root.shadowRoot.querySelector('.tk-drawer-mask').classList.contains('tk-drawer-mask-hidden')).toBe(true);
  });

  it('only emits overlay close when dismiss is allowed', async () => {
    const dismissiblePage = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true"></tk-drawer>`,
    });

    const dismissibleSpy = jest.fn();
    dismissiblePage.root.addEventListener('tk-drawer-close', dismissibleSpy);
    (dismissiblePage.root.shadowRoot.querySelector('.tk-drawer-overlay') as HTMLDivElement).click();
    await dismissiblePage.waitForChanges();

    expect(dismissibleSpy).toHaveBeenCalledTimes(1);

    const lockedPage = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true" prevent-dismiss="true"></tk-drawer>`,
    });

    const lockedSpy = jest.fn();
    lockedPage.root.addEventListener('tk-drawer-close', lockedSpy);
    (lockedPage.root.shadowRoot.querySelector('.tk-drawer-overlay') as HTMLDivElement).click();
    await lockedPage.waitForChanges();

    expect(lockedSpy).not.toHaveBeenCalled();
  });

  const openDrawer = async (attrs = '') =>
    newSpecPage({
      components: [TkDrawer, TkButton],
      html: `<tk-drawer data-testid="dw" open="true" ${attrs}></tk-drawer>`,
    });

  const shadow = (page: SpecPage) => page.root.shadowRoot;

  // Opening schedules a 300ms deferred `tk-drawer-open`. Left alone it fires after the suite
  // has torn the page down, which Jest reports as a post-teardown log and fails the run.
  // Only that timer is suppressed; everything else (including Stencil's queue) still runs.
  let deferredOpen: (() => void) | undefined;
  let timeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    const realSetTimeout = setTimeout;
    deferredOpen = undefined;
    timeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation(((handler: () => void, delay?: number, ...args: unknown[]) => {
      if (delay === 300) {
        deferredOpen = handler;
        return 0;
      }
      return realSetTimeout(handler, delay, ...args);
    }) as never);
  });

  afterEach(() => timeoutSpy.mockRestore());

  describe('deferred open', () => {
    it('emits tk-drawer-open once the enter transition has run', async () => {
      // hide-backdrop keeps onEnter from touching document.body.
      const page = await openDrawer(`hide-backdrop="true"`);
      const onOpen = jest.fn();
      const onEnterEvent = jest.fn();
      page.root.addEventListener('tk-drawer-open', onOpen);
      page.root.addEventListener('tk-drawer-enter', onEnterEvent);

      (page.rootInstance as any).onEnter();

      expect(onEnterEvent).toHaveBeenCalledTimes(1);
      expect(onOpen).not.toHaveBeenCalled();

      deferredOpen();

      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });

  describe('position', () => {
    it.each(['left', 'right', 'top', 'bottom', 'full-screen'])('applies the %s position class', async position => {
      const page = await openDrawer(`position="${position}"`);

      expect(shadow(page).querySelector('.tk-drawer').classList.contains(`tk-drawer-${position}`)).toBe(true);
    });

    it.each([
      ['left', 'translateX(-100%)'],
      ['right', 'translateX(100%)'],
      ['top', 'translateY(-100%)'],
      ['bottom', 'translateY(100%)'],
    ])('parks a closed %s drawer off-screen', async (position, transform) => {
      const page = await openDrawer(`position="${position}"`);

      (page.rootInstance as any).isOpen = false;
      await page.waitForChanges();

      expect((shadow(page).querySelector('.tk-drawer') as HTMLElement).style.transform).toBe(transform);
    });

    it('leaves a closed full-screen drawer untransformed', async () => {
      const page = await openDrawer(`position="full-screen"`);

      (page.rootInstance as any).isOpen = false;
      await page.waitForChanges();

      expect((shadow(page).querySelector('.tk-drawer') as HTMLElement).style.transform).toBeFalsy();
    });

    it('brings an open drawer back to the origin', async () => {
      const page = await openDrawer();

      (page.rootInstance as any).isOpen = true;
      await page.waitForChanges();

      expect((shadow(page).querySelector('.tk-drawer') as HTMLElement).style.transform).toBe('translate(0, 0)');
      expect(shadow(page).querySelector('.tk-drawer').classList.contains('tk-drawer-open')).toBe(true);
    });
  });

  describe('mask', () => {
    it.each(['lightest', 'light', 'base', 'dark', 'darkest'])('applies the %s mask variant', async maskVariant => {
      const page = await openDrawer(`mask-variant="${maskVariant}"`);

      expect(shadow(page).querySelector('.tk-drawer-mask').classList.contains(`tk-drawer-mask-${maskVariant}`)).toBe(true);
    });

    it('hides the mask when the backdrop is off', async () => {
      const page = await openDrawer(`hide-backdrop="true"`);

      expect(shadow(page).querySelector('.tk-drawer-mask').classList.contains('tk-drawer-mask-hidden')).toBe(true);
    });
  });

  describe('header', () => {
    it('renders no label when no header text is given', async () => {
      const page = await openDrawer();

      expect(shadow(page).querySelector('.tk-drawer-header-label')).toBeNull();
    });

    it('hides the close button when configured', async () => {
      const page = await openDrawer(`hide-close-icon="true"`);

      expect(shadow(page).querySelector('tk-button')).toBeNull();
    });

    it.each(['basic', 'divided', 'light', 'dark', 'primary'])('applies the %s header type', async headerType => {
      const page = await openDrawer(`header-type="${headerType}"`);

      expect(shadow(page).querySelector('.tk-drawer-header').classList.contains(`tk-drawer-header-${headerType}`)).toBe(true);
    });
  });

  describe('slots', () => {
    it('replaces the header with a header slot', async () => {
      const page = await newSpecPage({
        components: [TkDrawer, TkButton],
        html: `<tk-drawer open="true" header="ignored"><div slot="header">custom</div></tk-drawer>`,
      });

      expect(shadow(page).querySelector('.tk-drawer-header-label')).toBeNull();
      expect(shadow(page).querySelector('slot[name="header"]')).toBeTruthy();
    });

    it('replaces the close button with a header-actions slot', async () => {
      const page = await newSpecPage({
        components: [TkDrawer, TkButton],
        html: `<tk-drawer open="true"><div slot="header-actions">x</div></tk-drawer>`,
      });

      expect(shadow(page).querySelector('tk-button')).toBeNull();
      expect(shadow(page).querySelector('slot[name="header-actions"]')).toBeTruthy();
    });

    it('renders a footer only when the slot is filled', async () => {
      const without = await openDrawer();
      expect(shadow(without).querySelector('.tk-drawer-footer')).toBeNull();

      const withFooter = await newSpecPage({
        components: [TkDrawer, TkButton],
        html: `<tk-drawer open="true" footer-type="divided"><div slot="footer">f</div></tk-drawer>`,
      });

      const footer = shadow(withFooter).querySelector('.tk-drawer-footer');
      expect(footer).toBeTruthy();
      expect(footer.classList.contains('tk-drawer-footer-divided')).toBe(true);
    });
  });

  describe('container style', () => {
    it('merges containerStyle with the transform', async () => {
      const page = await openDrawer();

      page.root.containerStyle = { width: '480px' };
      await page.waitForChanges();

      const drawer = shadow(page).querySelector('.tk-drawer') as HTMLElement;

      expect(drawer.style.width).toBe('480px');
      expect(drawer.style.transform).toBeTruthy();
    });
  });

  describe('open state', () => {
    it('emits tk-drawer-change on both transitions', async () => {
      const page = await newSpecPage({ components: [TkDrawer], html: `<tk-drawer></tk-drawer>` });
      const onChange = jest.fn();
      page.root.addEventListener('tk-drawer-change', onChange);

      page.root.open = true;
      await page.waitForChanges();
      expect(onChange.mock.calls[0][0].detail).toBe(true);

      page.root.open = false;
      await page.waitForChanges();
      expect(onChange.mock.calls[1][0].detail).toBe(false);
    });

    it('tears the mask down once closed', async () => {
      const page = await openDrawer();
      expect(shadow(page).querySelector('.tk-drawer-mask')).toBeTruthy();

      page.root.open = false;
      await page.waitForChanges();

      expect(shadow(page).querySelector('.tk-drawer-mask')).toBeNull();
    });

    it('emits leave and close when it shuts', async () => {
      const page = await openDrawer();
      const onLeave = jest.fn();
      const onClose = jest.fn();
      page.root.addEventListener('tk-drawer-leave', onLeave);
      page.root.addEventListener('tk-drawer-close', onClose);

      page.root.open = false;
      await page.waitForChanges();

      expect(onLeave).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('body scroll locking', () => {
    afterEach(() => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    });

    it('releases the lock when the drawer closes', async () => {
      const page = await openDrawer();
      (page.rootInstance as any).blockBodyScroll();
      expect(document.body.style.overflow).toBe('hidden');

      page.root.open = false;
      await page.waitForChanges();

      expect(document.body.style.overflow).not.toBe('hidden');
    });

    it('leaves the body alone when scrolling is unblocked', async () => {
      const page = await openDrawer(`unblock-scroll="true"`);

      (page.rootInstance as any).onEnter();

      expect(document.body.style.overflow).not.toBe('hidden');
    });

    it('leaves the body alone when the backdrop is hidden', async () => {
      const page = await openDrawer(`hide-backdrop="true"`);

      (page.rootInstance as any).onEnter();

      expect(document.body.style.overflow).not.toBe('hidden');
    });
  });

  describe('data-testid', () => {
    it('suffixes the test id across the drawer parts', async () => {
      const page = await newSpecPage({
        components: [TkDrawer, TkButton],
        html: `<tk-drawer data-testid="dw" open="true" header="Title"><div slot="footer">f</div></tk-drawer>`,
      });

      const ids = Array.from(shadow(page).querySelectorAll('[data-testid]')).map(el => el.getAttribute('data-testid'));

      expect(ids).toEqual(expect.arrayContaining(['dw-mask', 'dw-overlay', 'dw-panel', 'dw-content', 'dw-header', 'dw-label', 'dw-body', 'dw-footer']));
    });

    it('emits no test ids when the prop is absent', async () => {
      const page = await newSpecPage({ components: [TkDrawer, TkButton], html: `<tk-drawer open="true" header="Title"></tk-drawer>` });

      expect(shadow(page).querySelectorAll('[data-testid]')).toHaveLength(0);
    });
  });
});
