import { newSpecPage } from '@stencil/core/testing';
import { TkAvatar } from '../tk-avatar';

describe('tk-avatar', () => {
  // Basic Rendering
  describe('basic rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [TkAvatar],
        html: `<tk-avatar></tk-avatar>`,
      });

      expect(page.root).toBeTruthy();
    });

    it('renders with label', async () => {
      const page = await newSpecPage({
        components: [TkAvatar],
        html: `<tk-avatar label='Test Label'></tk-avatar>`,
      });

      await page.waitForChanges();

      const label = page.root.querySelector('.tk-avatar-label');

      expect(label.textContent).toBe('Test Label');
    });
  });

  // State
  describe('state handling', () => {
    it('renders with different sizes', async () => {
      const sizes = ['xsmall', 'small', 'base', 'large', 'xlarge'];
      for (const size of sizes) {
        const page = await newSpecPage({
          components: [TkAvatar],
          html: `<tk-avatar size='${size}'></tk-avatar>`,
        });

        const container = page.root.querySelector('.tk-avatar-container');

        expect(container.classList.contains(`tk-avatar-${size}`)).toBe(true);
      }
    });
    it('renders with different backgrounds', async () => {
      const backgrounds = ['brand', 'solid'];
      for (const background in backgrounds) {
        const page = await newSpecPage({
          components: [TkAvatar],
          html: `<tk-avatar background=${background}></tk-avatar>`,
        });

        await page.waitForChanges();

        const avatar = page.root.querySelector('.tk-avatar');

        expect(avatar).toBeTruthy();
        expect(avatar.classList.contains(`tk-avatar-${background}`)).toBe(true);
      }
    });
    it('handles variants correctly', async () => {
      const variants = ['primary', 'light', 'success', 'info', 'warning', 'danger'];
      for (const variant of variants) {
        const page = await newSpecPage({
          components: [TkAvatar],
          html: `<tk-avatar variant='${variant}'></tk-avatar>`,
        });

        const avatar = page.root.querySelector('.tk-avatar');

        expect(avatar.classList.contains(`tk-avatar-${variant}`)).toBe(true);
      }
    });
    it('renders image correctly', async () => {
      const page = await newSpecPage({
        components: [TkAvatar],
        html: `
        <tk-avatar
          name='Test text'
          image='https://placeholder.pics/svg/300'
        ></tk-avatar>`,
      });

      const image = page.root.querySelector('.tk-avatar-image');

      expect(image).not.toBeNull();
      expect(image.getAttribute('alt')).toBe('Test text');
      expect(image.getAttribute('src')).toBe('https://placeholder.pics/svg/300');
    });
    it('renders default SVG when label and image are missing', async () => {
      const page = await newSpecPage({
        components: [TkAvatar],
        html: `
        <tk-avatar></tk-avatar>`,
      });

      const image = page.root.querySelector('svg');

      expect(image).not.toBeNull();
    });
    it('renders badge with rounded avatar', async () => {
      const page = await newSpecPage({
        components: [TkAvatar],
        html: `
        <tk-avatar
        badge='true'
        rounded='true'
        ></tk-avatar>`,
      });

      const avatar = page.root.querySelector('.tk-avatar');
      const container = page.root.querySelector('.tk-avatar-container');

      expect(avatar.classList.contains('tk-avatar-rounded')).toBe(true);
      expect(container.classList.contains('tk-avatar-badge')).not.toBeNull();
    });
    it('renders badge with different badgeStatus', async () => {
      const badgeStatuses = ['success', 'warning', 'info', 'danger'];
      for (const badgeStatus in badgeStatuses) {
        const page = await newSpecPage({
          components: [TkAvatar],
          html: `
        <tk-avatar
        badge='true'
        badgeStatus=${badgeStatus}
        ></tk-avatar>`,
        });

        const avatar = page.root.querySelector('.tk-avatar');

        expect(avatar.classList.contains('tk-avatar-badge')).not.toBeNull();
        expect(avatar.classList.contains(`tk-avatar-badge-status-${badgeStatus}`));
      }
    });
  });
});
