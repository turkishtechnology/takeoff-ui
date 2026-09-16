import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkCard } from '../tk-card';

const setup = async (html: string) => newSpecPage({ components: [TkCard], html });

// tk-card is a shadow component, so its own markup lives under shadowRoot.
const shadow = (page: SpecPage) => page.root.shadowRoot;

describe('tk-card', () => {
  describe('root', () => {
    it('renders a vertical card by default', async () => {
      const page = await setup(`<tk-card></tk-card>`);
      const root = shadow(page).querySelector('.tk-card');

      expect(root.classList.contains('tk-card-vertical')).toBe(true);
      expect(root.classList.contains('tk-card-horizontal')).toBe(false);
    });

    it('switches to the horizontal class', async () => {
      const page = await setup(`<tk-card horizontal="true"></tk-card>`);
      const root = shadow(page).querySelector('.tk-card');

      expect(root.classList.contains('tk-card-horizontal')).toBe(true);
      expect(root.classList.contains('tk-card-vertical')).toBe(false);
    });

    it('adds the hover shadow class when enabled', async () => {
      const page = await setup(`<tk-card enable-hover-shadow="true"></tk-card>`);

      expect(shadow(page).querySelector('.tk-card').classList.contains('has-hover-shadow')).toBe(true);
    });

    it('adds the background image class and url style', async () => {
      const page = await setup(`<tk-card></tk-card>`);

      page.root.imageOptions = { position: 'top', background: true, backgroundUrl: 'pic.png' };
      await page.waitForChanges();

      const root = shadow(page).querySelector('.tk-card') as HTMLElement;

      expect(root.classList.contains('tk-card-image-background')).toBe(true);
      expect(root.style.background).toContain('pic.png');
    });

    it('applies containerStyle', async () => {
      const page = await setup(`<tk-card></tk-card>`);

      page.root.containerStyle = { width: '300px' };
      await page.waitForChanges();

      expect((shadow(page).querySelector('.tk-card') as HTMLElement).style.width).toBe('300px');
    });
  });

  describe('header', () => {
    it('renders the header and subheader text', async () => {
      const page = await setup(`<tk-card header="Title" subheader="Sub"></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-title').textContent).toBe('Title');
      expect(shadow(page).querySelector('.tk-card-subtitle').textContent).toBe('Sub');
    });

    it('renders no header when there is no header text', async () => {
      const page = await setup(`<tk-card></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-header')).toBeNull();
    });

    it('renders no header when hideHeader is set', async () => {
      const page = await setup(`<tk-card header="Title" hide-header="true"></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-header')).toBeNull();
    });

    it.each(['top', 'bottom'])('applies the %s header position class', async position => {
      const page = await setup(`<tk-card header="Title" header-position="${position}"></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-header').classList.contains(`tk-card-header-${position}`)).toBe(true);
    });

    it.each(['basic', 'divided', 'light', 'dark', 'primary'])('applies the %s header type class', async headerType => {
      const page = await setup(`<tk-card header="Title" header-type="${headerType}"></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-header').classList.contains(`tk-card-header-${headerType}`)).toBe(true);
    });

    it('drops the header type class over a background image', async () => {
      const page = await setup(`<tk-card header="Title" header-type="divided"></tk-card>`);

      page.root.imageOptions = { position: 'top', background: true };
      await page.waitForChanges();

      expect(shadow(page).querySelector('.tk-card-header').classList.contains('tk-card-header-divided')).toBe(false);
    });

    it('renders an avatar only when showAvatar is set', async () => {
      const without = await setup(`<tk-card header="Title"></tk-card>`);
      expect(shadow(without).querySelector('tk-avatar')).toBeNull();

      const withAvatar = await setup(`<tk-card header="Title" show-avatar="true"></tk-card>`);
      expect(shadow(withAvatar).querySelector('tk-avatar')).toBeTruthy();
    });

    it('spreads avatarProps onto the avatar', async () => {
      const page = await setup(`<tk-card header="Title" show-avatar="true"></tk-card>`);

      expect(shadow(page).querySelector('tk-avatar').getAttribute('size')).toBe('small');
    });

    it('renders a menu button only when showMenuButton is set', async () => {
      const without = await setup(`<tk-card header="Title"></tk-card>`);
      expect(shadow(without).querySelector('tk-button')).toBeNull();

      const withMenu = await setup(`<tk-card header="Title" show-menu-button="true"></tk-card>`);
      expect(shadow(withMenu).querySelector('tk-button')).toBeTruthy();
    });
  });

  describe('image', () => {
    it('renders the image with its source', async () => {
      const page = await setup(`<tk-card image="pic.png"></tk-card>`);
      const img = shadow(page).querySelector('img');

      expect(img.getAttribute('src')).toBe('pic.png');
      expect(img.getAttribute('alt')).toBe('Card image');
    });

    it('renders no image when the source is missing', async () => {
      const page = await setup(`<tk-card></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-image')).toBeNull();
    });

    it('renders no inline image when the image is used as a background', async () => {
      const page = await setup(`<tk-card image="pic.png"></tk-card>`);

      page.root.imageOptions = { position: 'top', background: true };
      await page.waitForChanges();

      expect(shadow(page).querySelector('.tk-card-image')).toBeNull();
    });

    it('applies the windowed class from imageOptions', async () => {
      const page = await setup(`<tk-card image="pic.png"></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-image').classList.contains('tk-card-windowed-image')).toBe(true);

      page.root.imageOptions = { position: 'top', windowed: false };
      await page.waitForChanges();

      expect(shadow(page).querySelector('.tk-card-image').classList.contains('tk-card-windowed-image')).toBe(false);
    });
  });

  describe('layout', () => {
    it('places the header above the image by default', async () => {
      const page = await setup(`<tk-card header="Title" image="pic.png"></tk-card>`);
      const children = Array.from(shadow(page).querySelector('.tk-card').children);

      expect(children[0].classList.contains('tk-card-header')).toBe(true);
      expect(children[1].classList.contains('tk-card-image')).toBe(true);
    });

    it('places the header below the image when headerPosition is bottom', async () => {
      const page = await setup(`<tk-card header="Title" image="pic.png" header-position="bottom"></tk-card>`);
      const children = Array.from(shadow(page).querySelector('.tk-card').children);

      expect(children[0].classList.contains('tk-card-image')).toBe(true);
      expect(children[1].classList.contains('tk-card-header')).toBe(true);
    });

    it.each(['left', 'right'])('wraps the body beside a %s image when horizontal', async position => {
      const page = await setup(`<tk-card horizontal="true" header="Title" image="pic.png"></tk-card>`);

      page.root.imageOptions = { position, background: false, windowed: true };
      await page.waitForChanges();

      const children = Array.from(shadow(page).querySelector('.tk-card').children);
      const imageIndex = children.findIndex(c => c.classList.contains('tk-card-image'));
      const bodyIndex = children.findIndex(c => c.classList.contains('tk-card-horizontal-has-image-container'));

      expect(imageIndex).toBeGreaterThanOrEqual(0);
      expect(bodyIndex).toBeGreaterThanOrEqual(0);
      expect(position === 'left' ? imageIndex < bodyIndex : imageIndex > bodyIndex).toBe(true);
    });

    it('falls back to the vertical stack for a side image position without horizontal', async () => {
      const page = await setup(`<tk-card header="Title" image="pic.png"></tk-card>`);

      page.root.imageOptions = { position: 'left', background: false, windowed: true };
      await page.waitForChanges();

      const children = Array.from(shadow(page).querySelector('.tk-card').children);

      expect(children[0].classList.contains('tk-card-header')).toBe(true);
      expect(children[1].classList.contains('tk-card-image')).toBe(true);
    });

    it('falls back to the vertical stack when imageOptions omits a position', async () => {
      const page = await setup(`<tk-card header="Title" image="pic.png"></tk-card>`);

      page.root.imageOptions = { windowed: true };
      await page.waitForChanges();

      expect(shadow(page).querySelector('.tk-card-header')).toBeTruthy();
      expect(shadow(page).querySelector('.tk-card-image')).toBeTruthy();
    });
  });

  describe('content', () => {
    it('wraps unslotted children', async () => {
      const page = await setup(`<tk-card><p>body</p></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-content')).toBeTruthy();
    });

    it('renders no content region when nothing is slotted', async () => {
      const page = await setup(`<tk-card></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-content')).toBeNull();
    });

    it('applies contentStyle', async () => {
      const page = await setup(`<tk-card><p>body</p></tk-card>`);

      page.root.contentStyle = { padding: '8px' };
      await page.waitForChanges();

      expect((shadow(page).querySelector('.tk-card-content') as HTMLElement).style.padding).toBe('8px');
    });
  });

  describe('footer', () => {
    it('wraps footer actions in the default footer', async () => {
      const page = await setup(`<tk-card><div slot="footer-actions">ok</div></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-footer')).toBeTruthy();
    });

    it('renders no footer when nothing is slotted', async () => {
      const page = await setup(`<tk-card></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-footer')).toBeNull();
    });

    it.each(['basic', 'divided', 'light'])('applies the %s footer type class', async footerType => {
      const page = await setup(`<tk-card footer-type="${footerType}"><div slot="footer-actions">ok</div></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-footer').classList.contains(`tk-card-footer-${footerType}`)).toBe(true);
    });

    it('drops the footer type class over a background image', async () => {
      const page = await setup(`<tk-card footer-type="divided"><div slot="footer-actions">ok</div></tk-card>`);

      page.root.imageOptions = { position: 'top', background: true };
      await page.waitForChanges();

      expect(shadow(page).querySelector('.tk-card-footer').classList.contains('tk-card-footer-divided')).toBe(false);
    });
  });

  describe('slots', () => {
    it('replaces the built-in header with a header slot', async () => {
      const page = await setup(`<tk-card header="ignored"><div slot="header">custom</div></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-header')).toBeNull();
      expect(shadow(page).querySelector('slot[name="header"]')).toBeTruthy();
    });

    it('replaces the avatar with an avatar slot', async () => {
      const page = await setup(`<tk-card header="Title" show-avatar="true"><div slot="avatar">A</div></tk-card>`);

      expect(shadow(page).querySelector('tk-avatar')).toBeNull();
      expect(shadow(page).querySelector('slot[name="avatar"]')).toBeTruthy();
    });

    it('replaces the menu button with a header-action slot', async () => {
      const page = await setup(`<tk-card header="Title" show-menu-button="true"><div slot="header-action">X</div></tk-card>`);

      expect(shadow(page).querySelector('tk-button')).toBeNull();
      expect(shadow(page).querySelector('slot[name="header-action"]')).toBeTruthy();
    });

    it('replaces the content wrapper with a content slot', async () => {
      const page = await setup(`<tk-card><div slot="content">body</div></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-content')).toBeNull();
      expect(shadow(page).querySelector('slot[name="content"]')).toBeTruthy();
    });

    it('replaces the built-in footer with a footer slot', async () => {
      const page = await setup(`<tk-card><div slot="footer">custom</div></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-footer')).toBeNull();
      expect(shadow(page).querySelector('slot[name="footer"]')).toBeTruthy();
    });

    it('does not treat a nested slotted element as its own', async () => {
      const page = await setup(`<tk-card header="Title"><div><span slot="header">nested</span></div></tk-card>`);

      expect(shadow(page).querySelector('.tk-card-header')).toBeTruthy();
    });
  });

  describe('data-testid', () => {
    it('suffixes the test id across the card parts', async () => {
      const page = await setup(`<tk-card data-testid="card" header="Title" subheader="Sub" image="pic.png"><p>body</p><div slot="footer-actions">ok</div></tk-card>`);

      const ids = Array.from(shadow(page).querySelectorAll('[data-testid]')).map(el => el.getAttribute('data-testid'));

      expect(ids).toEqual(
        expect.arrayContaining([
          'card-container',
          'card-header-container',
          'card-header',
          'card-title',
          'card-subtitle',
          'card-image-container',
          'card-image',
          'card-content',
          'card-footer',
        ]),
      );
    });

    it('emits no test ids when the prop is absent', async () => {
      const page = await setup(`<tk-card header="Title"></tk-card>`);

      expect(shadow(page).querySelectorAll('[data-testid]')).toHaveLength(0);
    });
  });
});
