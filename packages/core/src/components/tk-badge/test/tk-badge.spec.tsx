import { newSpecPage } from '@stencil/core/testing';
import { TkBadge } from '../tk-badge';
import { TkIcon } from '../../tk-icon/tk-icon';

describe('tk-badge', () => {
  it('renders label, rounded and dot states', async () => {
    const page = await newSpecPage({
      components: [TkBadge],
      html: `<tk-badge label="test" rounded="true" dot="true"></tk-badge>`,
    });

    const badge = page.root.shadowRoot.querySelector('.tk-badge');

    expect(badge.textContent).toBe('');
    expect(badge.classList.contains('rounded')).toBe(true);
    expect(badge.classList.contains('dot')).toBe(true);
  });

  it('renders count-only badges with count styling', async () => {
    const page = await newSpecPage({
      components: [TkBadge],
      html: `<tk-badge count="5"></tk-badge>`,
    });

    const badge = page.root.shadowRoot.querySelector('.tk-badge');

    expect(badge.textContent).toBe('5');
    expect(badge.classList.contains('count')).toBe(true);
    expect(badge.classList.contains('icon-only')).toBe(false);
  });

  it('renders variant, size and type classes', async () => {
    const page = await newSpecPage({
      components: [TkBadge],
      html: `<tk-badge variant="success" size="large" type="outlined"></tk-badge>`,
    });

    const badge = page.root.shadowRoot.querySelector('.tk-badge');

    expect(badge.classList.contains('success')).toBe(true);
    expect(badge.classList.contains('large')).toBe(true);
    expect(badge.classList.contains('outlined')).toBe(true);
  });

  it('renders icons from string and object values', async () => {
    const stringPage = await newSpecPage({
      components: [TkBadge, TkIcon],
      html: `<tk-badge icon="home"></tk-badge>`,
    });

    expect(stringPage.root.shadowRoot.querySelector('tk-icon')).toBeTruthy();
    expect(stringPage.root.shadowRoot.textContent).toContain('home');

    const objectPage = await newSpecPage({
      components: [TkBadge, TkIcon],
      html: `<tk-badge></tk-badge>`,
    });

    objectPage.root.icon = {
      name: 'search',
      style: 'rounded',
      fill: true,
      color: '#000000',
    };
    await objectPage.waitForChanges();

    const icon = objectPage.root.shadowRoot.querySelector('tk-icon i.material-symbols-rounded') as HTMLElement;

    expect(icon).toBeTruthy();
    expect(icon.textContent).toBe('search');
    expect(icon.classList.contains('fill')).toBe(true);
  });

  it('detects slotted content after load', async () => {
    const page = await newSpecPage({
      components: [TkBadge],
      html: `<tk-badge><span>Custom Content</span></tk-badge>`,
    });

    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('.tk-badge-container').classList.contains('has-slot')).toBe(true);
  });
});
