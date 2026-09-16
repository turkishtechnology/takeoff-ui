import { newSpecPage } from '@stencil/core/testing';
import { TkDialog } from '../tk-dialog';
import { TkButton } from '../../tk-button/tk-button';
import { TkIcon } from '../../tk-icon/tk-icon';

// tk-dialog is not a shadow component, so everything is queried off `page.root` directly.
const setup = async (html: string) =>
  newSpecPage({
    components: [TkDialog, TkButton, TkIcon],
    html,
  });

describe('tk-dialog', () => {
  afterEach(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  });

  describe('structure', () => {
    it('renders a mask, an overlay and the dialog root', async () => {
      const page = await setup(`<tk-dialog></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-mask')).toBeTruthy();
      expect(page.root.querySelector('.tk-dialog-overlay')).toBeTruthy();
      expect(page.root.querySelector('.tk-dialog')).toBeTruthy();
    });

    it('marks the dialog as a modal for assistive technology', async () => {
      const page = await setup(`<tk-dialog></tk-dialog>`);
      const dialog = page.root.querySelector('.tk-dialog');

      expect(dialog.getAttribute('role')).toBe('dialog');
      expect(dialog.getAttribute('aria-modal')).toBe('true');
    });

    it('toggles the visible class on the mask', async () => {
      const page = await setup(`<tk-dialog></tk-dialog>`);
      const mask = page.root.querySelector('.tk-dialog-mask');

      expect(mask.classList.contains('tk-dialog-visible')).toBe(false);

      page.root.visible = true;
      await page.waitForChanges();

      expect(mask.classList.contains('tk-dialog-visible')).toBe(true);
    });

    it('merges containerStyle over the default flex layout', async () => {
      const page = await setup(`<tk-dialog></tk-dialog>`);

      page.root.containerStyle = { width: '500px' };
      await page.waitForChanges();

      const dialog = page.root.querySelector('.tk-dialog') as HTMLElement;

      expect(dialog.style.width).toBe('500px');
      expect(dialog.style.display).toBe('flex');
    });
  });

  describe('header', () => {
    it('renders the header and subheader text', async () => {
      const page = await setup(`<tk-dialog header="Confirm" subheader="Are you sure?"></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-title').textContent).toBe('Confirm');
      expect(page.root.querySelector('.tk-dialog-subtitle').textContent).toBe('Are you sure?');
    });

    it('omits the title nodes when no text is supplied', async () => {
      const page = await setup(`<tk-dialog></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-title')).toBeNull();
      expect(page.root.querySelector('.tk-dialog-subtitle')).toBeNull();
    });

    it('drops the whole header when showHeader is false', async () => {
      const page = await setup(`<tk-dialog header="Confirm" show-header="false"></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-header')).toBeNull();
    });

    it.each(['basic', 'divided', 'light', 'dark', 'primary'])('applies the %s header type class', async headerType => {
      const page = await setup(`<tk-dialog header-type="${headerType}"></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-header').classList.contains(`tk-dialog-header-${headerType}`)).toBe(true);
    });

    it('hides the close button when showCloseButton is false', async () => {
      const page = await setup(`<tk-dialog show-close-button="false"></tk-dialog>`);

      expect(page.root.querySelector('tk-button')).toBeNull();
    });

    it('hides the variant sign when showVariantSign is false', async () => {
      const page = await setup(`<tk-dialog show-variant-sign="false"></tk-dialog>`);

      expect(page.root.querySelector('tk-icon')).toBeNull();
    });
  });

  describe('variant', () => {
    it.each([
      ['info', 'info'],
      ['success', 'check_circle'],
      ['warning', 'warning'],
      ['danger', 'error'],
    ])('renders the %s sign icon', async (variant, iconName) => {
      const page = await setup(`<tk-dialog variant="${variant}"></tk-dialog>`);

      expect(page.root.querySelector('tk-icon').textContent).toContain(iconName);
    });

    it('applies the variant class to the dialog root', async () => {
      const page = await setup(`<tk-dialog variant="danger"></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog').classList.contains('tk-dialog-danger')).toBe(true);
    });
  });

  describe('mask', () => {
    it.each(['lightest', 'light', 'base', 'dark', 'darkest'])('applies the %s mask variant class', async maskVariant => {
      const page = await setup(`<tk-dialog mask-variant="${maskVariant}"></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-mask').classList.contains(`tk-dialog-mask-${maskVariant}`)).toBe(true);
    });

    it('hides the mask when hideBackdrop is set', async () => {
      const page = await setup(`<tk-dialog hide-backdrop="true"></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-mask').classList.contains('tk-dialog-mask-hidden')).toBe(true);
    });

    it('blurs the mask when isMaskBlur is set', async () => {
      const page = await setup(`<tk-dialog is-mask-blur="true"></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-mask').classList.contains('tk-dialog-mask-blur')).toBe(true);
    });
  });

  describe('events', () => {
    it('emits tk-open when it becomes visible', async () => {
      const page = await setup(`<tk-dialog></tk-dialog>`);
      const onOpen = jest.fn();
      page.root.addEventListener('tk-open', onOpen);

      page.root.visible = true;
      await page.waitForChanges();

      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('emits tk-close when it becomes hidden', async () => {
      const page = await setup(`<tk-dialog visible="true"></tk-dialog>`);
      const onClose = jest.fn();
      page.root.addEventListener('tk-close', onClose);

      page.root.visible = false;
      await page.waitForChanges();

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('emits tk-close and tk-visible-change(false) from the close button', async () => {
      const page = await setup(`<tk-dialog visible="true"></tk-dialog>`);
      const onClose = jest.fn();
      const onVisibleChange = jest.fn();
      page.root.addEventListener('tk-close', onClose);
      page.root.addEventListener('tk-visible-change', onVisibleChange);

      page.root.querySelector('tk-button').dispatchEvent(new CustomEvent('tk-click'));
      await page.waitForChanges();

      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onVisibleChange).toHaveBeenCalledTimes(1);
      expect(onVisibleChange.mock.calls[0][0].detail).toBe(false);
    });

    it('dismisses on an overlay click', async () => {
      const page = await setup(`<tk-dialog visible="true"></tk-dialog>`);
      const onVisibleChange = jest.fn();
      page.root.addEventListener('tk-visible-change', onVisibleChange);

      (page.root.querySelector('.tk-dialog-overlay') as HTMLElement).click();
      await page.waitForChanges();

      expect(onVisibleChange).toHaveBeenCalledTimes(1);
      expect(onVisibleChange.mock.calls[0][0].detail).toBe(false);
    });

    it('ignores an overlay click when preventDismiss is set', async () => {
      const page = await setup(`<tk-dialog visible="true" prevent-dismiss="true"></tk-dialog>`);
      const onClose = jest.fn();
      const onVisibleChange = jest.fn();
      page.root.addEventListener('tk-close', onClose);
      page.root.addEventListener('tk-visible-change', onVisibleChange);

      (page.root.querySelector('.tk-dialog-overlay') as HTMLElement).click();
      await page.waitForChanges();

      expect(onClose).not.toHaveBeenCalled();
      expect(onVisibleChange).not.toHaveBeenCalled();
    });
  });

  describe('methods', () => {
    it('open() emits tk-open without changing visibility', async () => {
      const page = await setup(`<tk-dialog></tk-dialog>`);
      const onOpen = jest.fn();
      page.root.addEventListener('tk-open', onOpen);

      await page.root.open();

      expect(onOpen).toHaveBeenCalledTimes(1);
      expect(page.root.visible).toBe(false);
    });

    it('close() emits tk-close without changing visibility', async () => {
      const page = await setup(`<tk-dialog visible="true"></tk-dialog>`);
      const onClose = jest.fn();
      page.root.addEventListener('tk-close', onClose);

      await page.root.close();

      expect(onClose).toHaveBeenCalledTimes(1);
      expect(page.root.visible).toBe(true);
    });
  });

  describe('body scroll locking', () => {
    it('locks body scroll while visible and restores it on close', async () => {
      const page = await setup(`<tk-dialog></tk-dialog>`);

      page.root.visible = true;
      await page.waitForChanges();

      expect(document.body.style.overflow).toBe('hidden');

      page.root.visible = false;
      await page.waitForChanges();

      expect(document.body.style.overflow).not.toBe('hidden');
    });

    it('leaves body scroll alone when the backdrop is hidden', async () => {
      const page = await setup(`<tk-dialog hide-backdrop="true"></tk-dialog>`);

      page.root.visible = true;
      await page.waitForChanges();

      expect(document.body.style.overflow).not.toBe('hidden');
    });
  });

  describe('slots', () => {
    it('replaces the built-in dialog with a container slot', async () => {
      const page = await setup(`<tk-dialog><div slot="container">custom</div></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog')).toBeNull();
      expect(page.root.textContent).toContain('custom');
    });

    it('replaces the built-in header with a header slot', async () => {
      const page = await setup(`<tk-dialog header="ignored"><div slot="header">custom header</div></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-header')).toBeNull();
      expect(page.root.textContent).toContain('custom header');
    });

    it('wraps a content slot', async () => {
      const page = await setup(`<tk-dialog><div slot="content">body</div></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-content')).toBeTruthy();
      expect(page.root.textContent).toContain('body');
    });

    it('wraps unslotted children as content', async () => {
      const page = await setup(`<tk-dialog><p>plain body</p></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-content')).toBeTruthy();
      expect(page.root.textContent).toContain('plain body');
    });

    it('renders no content region when nothing is slotted', async () => {
      const page = await setup(`<tk-dialog></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-content')).toBeNull();
    });

    it('replaces the built-in footer with a footer slot', async () => {
      const page = await setup(`<tk-dialog><div slot="footer">custom footer</div></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-footer')).toBeNull();
      expect(page.root.textContent).toContain('custom footer');
    });

    it('wraps footer actions in the default footer', async () => {
      const page = await setup(`<tk-dialog><div slot="footer-actions">actions</div></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-footer')).toBeTruthy();
      expect(page.root.textContent).toContain('actions');
    });

    it('renders no footer when nothing is slotted', async () => {
      const page = await setup(`<tk-dialog></tk-dialog>`);

      expect(page.root.querySelector('.tk-dialog-footer')).toBeNull();
    });
  });

  describe('data-testid', () => {
    it('suffixes the test id across the dialog parts', async () => {
      const page = await setup(`<tk-dialog data-testid="dlg" header="Confirm" subheader="sure?"><p>body</p><div slot="footer-actions">ok</div></tk-dialog>`);

      const ids = Array.from(page.root.querySelectorAll('[data-testid]')).map(el => el.getAttribute('data-testid'));

      expect(ids).toEqual(
        expect.arrayContaining(['dlg-mask', 'dlg-overlay', 'dlg-root', 'dlg-header-container', 'dlg-header', 'dlg-title', 'dlg-subheader', 'dlg-content', 'dlg-footer']),
      );
    });

    it('emits no test ids when the prop is absent', async () => {
      const page = await setup(`<tk-dialog header="Confirm"></tk-dialog>`);

      expect(page.root.querySelectorAll('[data-testid]')).toHaveLength(0);
    });
  });
});
