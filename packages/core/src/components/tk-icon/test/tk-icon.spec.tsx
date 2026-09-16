import { newSpecPage } from '@stencil/core/testing';
import { TkIcon } from '../tk-icon';

describe('tk-icon', () => {
  it('renders the icon name with sign styling', async () => {
    const page = await newSpecPage({
      components: [TkIcon],
      html: `<tk-icon icon="home" sign="true"></tk-icon>`,
    });

    expect(page.root.querySelector('.tk-icon')?.textContent).toBe('home');
    expect(page.root.querySelector('.tk-icon')?.classList.contains('tk-icon-sign')).toBe(true);
  });
});

describe('tk-icon styling', () => {
  const iconEl = page => page.root.querySelector('.tk-icon') as HTMLElement;

  it('applies the color prop and falls back to iconColor', async () => {
    const colorPage = await newSpecPage({
      components: [TkIcon],
      html: `<tk-icon icon="home" color="red" icon-color="blue"></tk-icon>`,
    });
    expect(iconEl(colorPage).style.color).toBe('red');

    const iconColorPage = await newSpecPage({
      components: [TkIcon],
      html: `<tk-icon icon="home" icon-color="blue"></tk-icon>`,
    });
    expect(iconEl(iconColorPage).style.color).toBe('blue');

    const plainPage = await newSpecPage({
      components: [TkIcon],
      html: `<tk-icon icon="home"></tk-icon>`,
    });
    expect(iconEl(plainPage).style.color).toBe('');
  });

  it('applies border and background colors only for sign icons', async () => {
    const signPage = await newSpecPage({
      components: [TkIcon],
      html: `<tk-icon icon="home" sign="true" border-color="green" background-color="yellow"></tk-icon>`,
    });
    expect(iconEl(signPage).style.borderColor).toBe('green');
    expect(iconEl(signPage).style.backgroundColor).toBe('yellow');

    const partialSignPage = await newSpecPage({
      components: [TkIcon],
      html: `<tk-icon icon="home" sign="true"></tk-icon>`,
    });
    expect(iconEl(partialSignPage).style.borderColor).toBe('');
    expect(iconEl(partialSignPage).style.backgroundColor).toBe('');

    const plainPage = await newSpecPage({
      components: [TkIcon],
      html: `<tk-icon icon="home" border-color="green" background-color="yellow"></tk-icon>`,
    });
    expect(iconEl(plainPage).style.borderColor).toBe('');
    expect(iconEl(plainPage).style.backgroundColor).toBe('');
  });

  it('renders type, variant, size and fill classes', async () => {
    const page = await newSpecPage({
      components: [TkIcon],
      html: `<tk-icon icon="star" icon-type="rounded" variant="danger" size="large" fill="true"></tk-icon>`,
    });
    const icon = iconEl(page);

    expect(icon.classList.contains('material-symbols-rounded')).toBe(true);
    expect(icon.classList.contains('tk-icon-danger')).toBe(true);
    expect(icon.classList.contains('tk-icon-large')).toBe(true);
    expect(icon.classList.contains('fill')).toBe(true);
  });

  it('skips the variant class when the variant is empty', async () => {
    const page = await newSpecPage({
      components: [TkIcon],
      html: `<tk-icon icon="star" variant=""></tk-icon>`,
    });

    const classes = iconEl(page).className.split(' ');
    expect(classes).toContain('tk-icon-base');
    expect(classes.filter(cls => cls.startsWith('tk-icon-') && cls !== 'tk-icon-base')).toEqual([]);
  });

  it('renders the icon with the requested tag and data-testid', async () => {
    const page = await newSpecPage({
      components: [TkIcon],
      html: `<tk-icon icon="star" icon-tag="span" data-testid="icon"></tk-icon>`,
    });

    expect(page.root.querySelector('span.tk-icon')).toBeTruthy();
    expect(page.root.querySelector('i.tk-icon')).toBeNull();
    expect(page.root.querySelector('.tk-icon').getAttribute('data-testid')).toBe('icon-content');
  });
});
