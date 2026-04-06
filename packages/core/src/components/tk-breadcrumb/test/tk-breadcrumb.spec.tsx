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
});
// State
describe('state handling', () => {
  it('should render slotted items', async () => {
    const page = await newSpecPage({
      components: [TkBreadcrumb],
      html: `<tk-breadcrumb ><slot/>
        </tk-breadcrumb>`,
    });

    const slot = page.root.shadowRoot.querySelector('slot');

    expect(slot).not.toBeNull;
  });
  it('should render items when no slots provided', async () => {
    const page = await newSpecPage({
      components: [TkBreadcrumb, TkBreadcrumbItem],
      html: `<tk-breadcrumb>
        </tk-breadcrumb>`,
    });

    page.rootInstance.model = [{ label: 'home', href: '/', icon: { name: 'home' } }];

    await page.waitForChanges();

    const slot = page.root.shadowRoot.querySelector('slot');

    expect(slot).toBeNull;

    const label = page.root.shadowRoot.querySelector('.tk-breadcrumb-item-label');

    expect(label.textContent).toBe('home');
  });
  it('correctly assign the last item as isCurrent ', async () => {
    const page = await newSpecPage({
      components: [TkBreadcrumb, TkBreadcrumbItem],
      html: `<tk-breadcrumb>
        </tk-breadcrumb>`,
    });

    page.rootInstance.model = [{ label: 'home' }, { label: 'profile' }];
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('.tk-breadcrumb').classList.contains('tk-breadcrumb-outlined')).toBe(true);
    expect(page.root.shadowRoot.querySelector('.tk-breadcrumb-separator-icon')).toBeTruthy();
  });
});
