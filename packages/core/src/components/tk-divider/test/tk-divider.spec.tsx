import { newSpecPage } from '@stencil/core/testing';
import { TkDivider } from '../tk-divider';

describe('tk-divider', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TkDivider],
      html: `<tk-divider></tk-divider>`,
    });

    const divider = page.root.shadowRoot.querySelector('.tk-divider');

    expect(divider).toBeTruthy();
    expect(divider.classList.contains('tk-divider-horizontal')).toBeTruthy();
  });

  it('applies vertical orientation', async () => {
    const page = await newSpecPage({
      components: [TkDivider],
      html: `<tk-divider orientation="vertical"></tk-divider>`,
    });

    const divider = page.root.shadowRoot.querySelector('.tk-divider');

    expect(divider.classList.contains('tk-divider-vertical')).toBeTruthy();
  });

  it('applies mx and my spacing styles', async () => {
    const page = await newSpecPage({
      components: [TkDivider],
      html: `<tk-divider mx="10px" my="20px"></tk-divider>`,
    });

    const divider = page.root.shadowRoot.querySelector('.tk-divider') as HTMLElement;

    expect(divider.style.marginLeft).toBe('10px');
    expect(divider.style.marginRight).toBe('10px');
    expect(divider.style.marginTop).toBe('20px');
    expect(divider.style.marginBottom).toBe('20px');
  });

  it('renders slot content when present', async () => {
    const page = await newSpecPage({
      components: [TkDivider],
      html: `<tk-divider>Content</tk-divider>`,
    });

    expect(page.root.textContent).toBe('Content');
  });
});

describe('tk-divider spacing and slot', () => {
  it('converts numeric spacing to pixels', async () => {
    const page = await newSpecPage({
      components: [TkDivider],
      html: `<tk-divider></tk-divider>`,
    });
    page.root.mx = 8;
    page.root.my = 12;
    await page.waitForChanges();

    const divider = page.root.shadowRoot.querySelector('.tk-divider') as HTMLElement;
    expect(divider.style.marginLeft).toBe('8px');
    expect(divider.style.marginRight).toBe('8px');
    expect(divider.style.marginTop).toBe('12px');
    expect(divider.style.marginBottom).toBe('12px');
  });

  it('applies no margins without spacing props', async () => {
    const page = await newSpecPage({
      components: [TkDivider],
      html: `<tk-divider></tk-divider>`,
    });

    const divider = page.root.shadowRoot.querySelector('.tk-divider') as HTMLElement;
    expect(divider.style.marginLeft).toBe('');
    expect(divider.style.marginTop).toBe('');
  });

  it('renders the content wrapper only for default slot content', async () => {
    const emptyPage = await newSpecPage({
      components: [TkDivider],
      html: `<tk-divider>   </tk-divider>`,
    });
    expect(emptyPage.root.shadowRoot.querySelector('.tk-divider-content')).toBeNull();

    const namedSlotPage = await newSpecPage({
      components: [TkDivider],
      html: `<tk-divider><span slot="other">x</span></tk-divider>`,
    });
    expect(namedSlotPage.root.shadowRoot.querySelector('.tk-divider-content')).toBeNull();

    const elementPage = await newSpecPage({
      components: [TkDivider],
      html: `<tk-divider><span>Label</span></tk-divider>`,
    });
    expect(elementPage.root.shadowRoot.querySelector('.tk-divider-content')).toBeTruthy();
  });

  it('exposes separator semantics and data-testid attributes', async () => {
    const page = await newSpecPage({
      components: [TkDivider],
      html: `<tk-divider data-testid="div" orientation="vertical">Text</tk-divider>`,
    });

    const divider = page.root.shadowRoot.querySelector('.tk-divider');
    expect(divider.getAttribute('role')).toBe('separator');
    expect(divider.getAttribute('aria-orientation')).toBe('vertical');
    expect(divider.getAttribute('data-testid')).toBe('div-container');
    expect(page.root.shadowRoot.querySelector('.tk-divider-content').getAttribute('data-testid')).toBe('div-content');
  });
});
