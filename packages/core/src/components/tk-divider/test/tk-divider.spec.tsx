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

  it('applies horizontal orientation', async () => {
    const page = await newSpecPage({
      components: [TkDivider],
      html: `<tk-divider orientation="horizontal"></tk-divider>`,
    });

    const divider = page.root.shadowRoot.querySelector('.tk-divider');

    expect(divider.classList.contains('tk-divider-horizontal')).toBeTruthy();
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
