import { newSpecPage } from '@stencil/core/testing';
import { TkAlert } from '../tk-alert';
import { TkButton } from '../../tk-button/tk-button';
import { TkIcon } from '../../tk-icon/tk-icon';

describe('tk-alert', () => {
  it('renders header, message and variant classes', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkIcon],
      html: `<tk-alert header="Test header" message="Test message" variant="success"></tk-alert>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-alert-content').textContent).toContain('Test header');
    expect(page.root.shadowRoot.querySelector('.tk-alert-content').textContent).toContain('Test message');
    expect(page.root.shadowRoot.querySelector('.tk-alert-container').classList.contains('success')).toBe(true);
    expect(page.root.shadowRoot.querySelector('tk-icon').textContent).toContain('check_circle');
  });

  it('renders custom icon objects and multiple messages', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkIcon],
      html: `<tk-alert></tk-alert>`,
    });

    page.root.icon = { name: 'search', style: 'rounded', fill: true, color: '#000000' };
    page.root.message = ['First', 'Second'];
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('tk-icon i.material-symbols-rounded').textContent).toBe('search');
    expect(page.root.shadowRoot.querySelectorAll('.tk-alert-message')).toHaveLength(2);
  });

  it('removes itself when the close button emits tk-click', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkButton],
      html: `<tk-alert removable></tk-alert>`,
    });

    const button = page.root.shadowRoot.querySelector('tk-button');
    expect(button).toBeTruthy();

    button.dispatchEvent(new CustomEvent('tk-click', { bubbles: true, composed: true }));
    await page.waitForChanges();

    expect(page.root.isConnected).toBe(false);
  });
});
