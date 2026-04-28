import { newSpecPage } from '@stencil/core/testing';
import { TkChips } from '../tk-chips';
import { TkIcon } from '../../tk-icon/tk-icon';

describe('tk-chips', () => {
  it('renders label, classes and icons', async () => {
    const page = await newSpecPage({
      components: [TkChips, TkIcon],
      html: `<tk-chips label="Custom Chip" variant="success" size="large" type="outlined" icon="star"></tk-chips>`,
    });

    const chip = page.root.shadowRoot.querySelector('.tk-chips');
    expect(chip.textContent).toContain('Custom Chip');
    expect(chip.classList.contains('success')).toBe(true);
    expect(chip.classList.contains('large')).toBe(true);
    expect(chip.classList.contains('outlined')).toBe(true);
    expect(page.root.shadowRoot.querySelector('tk-icon').textContent).toContain('star');
  });

  it('emits tk-remove and optionally removes itself', async () => {
    const removablePage = await newSpecPage({
      components: [TkChips, TkIcon],
      html: `<tk-chips label="Removable Chip" removable="true"></tk-chips>`,
    });

    const removeSpy = jest.fn();
    removablePage.root.addEventListener('tk-remove', removeSpy);
    removablePage.root.shadowRoot.querySelectorAll('tk-icon')[0].dispatchEvent(new MouseEvent('click'));
    await removablePage.waitForChanges();

    expect(removeSpy).toHaveBeenCalled();
    expect(removablePage.root.isConnected).toBe(false);

    const persistentPage = await newSpecPage({
      components: [TkChips, TkIcon],
      html: `<tk-chips label="Persistent Chip" removable="true" auto-self-destroy="false"></tk-chips>`,
    });

    persistentPage.root.shadowRoot.querySelectorAll('tk-icon')[0].dispatchEvent(new MouseEvent('click'));
    await persistentPage.waitForChanges();
    expect(persistentPage.root.isConnected).toBe(true);
  });

  it('renders icon on the left by default', async () => {
    const page = await newSpecPage({
      components: [TkChips, TkIcon],
      html: `<tk-chips label="Chip" icon="star"></tk-chips>`,
    });

    const children = Array.from(page.root.shadowRoot.querySelector('.tk-chips').childNodes);
    const iconIndex = children.findIndex(n => (n as Element).tagName === 'TK-ICON');
    const labelIndex = children.findIndex(n => n.nodeType === Node.TEXT_NODE && (n.textContent || '').trim() === 'Chip');

    expect(iconIndex).toBeLessThan(labelIndex);
  });

  it('renders icon on the right when iconPosition is right', async () => {
    const page = await newSpecPage({
      components: [TkChips, TkIcon],
      html: `<tk-chips label="Chip" icon="star" icon-position="right"></tk-chips>`,
    });

    const children = Array.from(page.root.shadowRoot.querySelector('.tk-chips').childNodes);
    const iconIndex = children.findIndex(n => (n as Element).tagName === 'TK-ICON');
    const labelIndex = children.findIndex(n => n.nodeType === Node.TEXT_NODE && (n.textContent || '').trim() === 'Chip');

    expect(iconIndex).toBeGreaterThan(labelIndex);
  });

  it('applies disabled class', async () => {
    const page = await newSpecPage({
      components: [TkChips],
      html: `<tk-chips label="Disabled Chip" disabled="true"></tk-chips>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-chips').classList.contains('disabled')).toBe(true);
  });
});

describe('dataTestid', () => {
  it('sets data-testid on chip root when dataTestid is provided', async () => {
    const page = await newSpecPage({
      components: [TkChips],
      html: `<tk-chips data-testid="my-chip" label="Chip"></tk-chips>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-chips').getAttribute('data-testid')).toBe('my-chip-container');
  });

  it('does not set data-testid when dataTestid is not provided', async () => {
    const page = await newSpecPage({
      components: [TkChips],
      html: `<tk-chips label="Chip"></tk-chips>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-chips').getAttribute('data-testid')).toBeNull();
  });

  it('sets data-testid on icon and remove icon', async () => {
    const page = await newSpecPage({
      components: [TkChips, TkIcon],
      html: `<tk-chips data-testid="my-chip" label="Chip" icon="star" removable="true"></tk-chips>`,
    });

    const icons = page.root.shadowRoot.querySelectorAll('tk-icon');
    expect(icons[0].getAttribute('data-testid')).toBe('my-chip-left');
    expect(icons[1].getAttribute('data-testid')).toBe('my-chip-remove-icon');
  });
});
