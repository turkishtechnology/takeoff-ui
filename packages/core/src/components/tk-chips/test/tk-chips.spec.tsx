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
    expect(icons[0].getAttribute('data-testid')).toBe('my-chip-left-icon');
    expect(icons[1].getAttribute('data-testid')).toBe('my-chip-remove-icon');
  });
});

describe('tk-chips keyboard and value handling', () => {
  it('removes the chip with Enter or Space on the remove icon', async () => {
    for (const key of ['Enter', ' ']) {
      const page = await newSpecPage({
        components: [TkChips, TkIcon],
        html: `<tk-chips label="Chip" removable="true" auto-self-destroy="false"></tk-chips>`,
      });
      const removeSpy = jest.fn();
      page.root.addEventListener('tk-remove', (e: CustomEvent) => removeSpy(e.detail));
      const event = new KeyboardEvent('keydown', { key });
      const preventDefault = jest.spyOn(event, 'preventDefault');

      page.root.shadowRoot.querySelector('tk-icon').dispatchEvent(event);
      await page.waitForChanges();

      expect(removeSpy).toHaveBeenCalledWith('Chip');
      expect(preventDefault).toHaveBeenCalled();
    }
  });

  it('ignores other keys on the remove icon', async () => {
    const page = await newSpecPage({
      components: [TkChips, TkIcon],
      html: `<tk-chips label="Chip" removable="true"></tk-chips>`,
    });
    const removeSpy = jest.fn();
    page.root.addEventListener('tk-remove', removeSpy);

    page.root.shadowRoot.querySelector('tk-icon').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await page.waitForChanges();

    expect(removeSpy).not.toHaveBeenCalled();
    expect(page.root.isConnected).toBe(true);
  });

  it('emits the explicit value instead of the label when one is set', async () => {
    const page = await newSpecPage({
      components: [TkChips, TkIcon],
      html: `<tk-chips label="Chip" removable="true" auto-self-destroy="false"></tk-chips>`,
    });
    page.root.value = { id: 7 };
    await page.waitForChanges();
    const removeSpy = jest.fn();
    page.root.addEventListener('tk-remove', (e: CustomEvent) => removeSpy(e.detail));

    page.root.shadowRoot.querySelector('tk-icon').dispatchEvent(new MouseEvent('click'));

    expect(removeSpy).toHaveBeenCalledWith({ id: 7 });
  });

  it('colors and disables the icons according to type and disabled state', async () => {
    const iconsFor = async (attrs: string) => {
      const page = await newSpecPage({
        components: [TkChips, TkIcon],
        html: `<tk-chips label="Chip" icon="star" removable="true" ${attrs}></tk-chips>`,
      });
      return Array.from(page.root.shadowRoot.querySelectorAll('tk-icon')) as any[];
    };

    const filled = await iconsFor('type="filled"');
    expect(filled[0].color).toBe('var(--static-white)');
    expect(filled[1].color).toBe('var(--static-white)');
    expect(filled[1].tabIndex).toBe(0);

    const outlined = await iconsFor('type="outlined"');
    expect(outlined[0].color).toBeUndefined();
    expect(outlined[1].color).toBeUndefined();

    const disabled = await iconsFor('type="filled" disabled="true"');
    expect(disabled[0].color).toBe('var(--icon-sub-base)');
    expect(disabled[1].color).toBe('var(--icon-sub-base)');
    expect(disabled[1].tabIndex).toBe(-1);
  });

  it('maps the large size to medium icons', async () => {
    const page = await newSpecPage({
      components: [TkChips, TkIcon],
      html: `<tk-chips label="Chip" icon="star" removable="true" size="large"></tk-chips>`,
    });
    const icons = Array.from(page.root.shadowRoot.querySelectorAll('tk-icon')) as any[];

    expect(icons[0].size).toBe('medium');
    expect(icons[1].size).toBe('medium');
  });

  it('reflects full-width, focused and container styles', async () => {
    const page = await newSpecPage({
      components: [TkChips],
      html: `<tk-chips label="Chip" full-width="true" focused="true"></tk-chips>`,
    });
    page.root.containerStyle = { margin: '1px' };
    await page.waitForChanges();

    expect(page.root.classList.contains('full-width')).toBe(true);
    expect(page.root.hasAttribute('focused')).toBe(true);
    const chip = page.root.shadowRoot.querySelector('.tk-chips') as HTMLElement;
    expect(chip.classList.contains('focused')).toBe(true);
    expect(chip.style.margin).toBe('1px');
  });
});
