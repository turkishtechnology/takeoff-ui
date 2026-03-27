import { newSpecPage } from '@stencil/core/testing';
import { TkAvatar } from '../tk-avatar';

describe('tk-avatar', () => {
  it('renders label text', async () => {
    const page = await newSpecPage({
      components: [TkAvatar],
      html: `<tk-avatar label='Test Label'></tk-avatar>`,
    });

    expect(page.root.querySelector('.tk-avatar-label').textContent).toBe('Test Label');
  });

  it('applies size and variant classes', async () => {
    const page = await newSpecPage({
      components: [TkAvatar],
      html: `<tk-avatar size='large' variant='success'></tk-avatar>`,
    });

    const container = page.root.querySelector('.tk-avatar-container');
    const avatar = page.root.querySelector('.tk-avatar');

    expect(container.classList.contains('tk-avatar-large')).toBe(true);
    expect(avatar.classList.contains('tk-avatar-success')).toBe(true);
  });

  it('renders image content with alt text', async () => {
    const page = await newSpecPage({
      components: [TkAvatar],
      html: `<tk-avatar name='Test text' image='https://placeholder.pics/svg/300'></tk-avatar>`,
    });

    const image = page.root.querySelector('.tk-avatar-image');

    expect(image).not.toBeNull();
    expect(image.getAttribute('alt')).toBe('Test text');
    expect(image.getAttribute('src')).toBe('https://placeholder.pics/svg/300');
  });

  it('renders a fallback svg when label and image are missing', async () => {
    const page = await newSpecPage({
      components: [TkAvatar],
      html: `<tk-avatar></tk-avatar>`,
    });

    expect(page.root.querySelector('svg')).not.toBeNull();
  });

  it('renders rounded badge state', async () => {
    const page = await newSpecPage({
      components: [TkAvatar],
      html: `<tk-avatar badge='true' rounded='true'></tk-avatar>`,
    });

    const avatar = page.root.querySelector('.tk-avatar');
    const badge = page.root.querySelector('.tk-avatar-badge');

    expect(avatar.classList.contains('tk-avatar-rounded')).toBe(true);
    expect(badge).not.toBeNull();
  });
});
