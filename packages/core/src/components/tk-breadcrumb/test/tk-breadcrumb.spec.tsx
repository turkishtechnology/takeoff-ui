import { newSpecPage } from '@stencil/core/testing';
import { TkBreadcrumb } from '../tk-breadcrumb';
import { TkBreadcrumbItem } from '../tk-breadcrumb-item/tk-breadcrumb-item';
import { TkIcon } from '../../tk-icon/tk-icon';

describe('tk-breadcrumb', () => {
  it('renders model items and marks the last item as current', async () => {
    const page = await newSpecPage({
      components: [TkBreadcrumb, TkBreadcrumbItem, TkIcon],
      html: `<tk-breadcrumb></tk-breadcrumb>`,
    });

    page.rootInstance.model = [{ label: 'home' }, { label: 'profile' }, { label: 'cart' }];
    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll('.tk-breadcrumb-item');
    expect(items).toHaveLength(3);
    expect(items[2].classList.contains('tk-breadcrumb-item-current')).toBe(true);
  });

  it('renders icons and external links from model data', async () => {
    const page = await newSpecPage({
      components: [TkBreadcrumb, TkBreadcrumbItem, TkIcon],
      html: `<tk-breadcrumb></tk-breadcrumb>`,
    });

    page.rootInstance.model = [{ label: 'home', href: '/', icon: { name: 'home' }, isExternal: true }];
    await page.waitForChanges();

    const link = page.root.shadowRoot.querySelector('.tk-breadcrumb-link');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    expect(page.root.shadowRoot.querySelector('tk-icon').textContent).toContain('home');
  });

  it('renders configured separator and outlined type', async () => {
    const page = await newSpecPage({
      components: [TkBreadcrumb, TkBreadcrumbItem, TkIcon],
      html: `<tk-breadcrumb separator="icon" type="outlined"></tk-breadcrumb>`,
    });

    page.rootInstance.model = [{ label: 'home' }, { label: 'profile' }];
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('.tk-breadcrumb').classList.contains('tk-breadcrumb-outlined')).toBe(true);
    expect(page.root.shadowRoot.querySelector('.tk-breadcrumb-separator-icon')).toBeTruthy();
  });
});
