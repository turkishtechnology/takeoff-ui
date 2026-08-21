import { newSpecPage } from '@stencil/core/testing';
import { TkSpinner } from '../tk-spinner';

describe('tk-spinner', () => {
  it('renders the three-dots spinner variant', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<tk-spinner type="three-dots" label="Loading"></tk-spinner>`,
    });

    expect(page.root.shadowRoot.querySelector('.spinner-three-dots')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('.tk-spinner-label')?.textContent).toBe('Loading');
  });

  it('applies neutral variant by default', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<tk-spinner></tk-spinner>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-spin-container')?.classList.contains('neutral')).toBe(true);
  });

  it('applies given variant class', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<tk-spinner variant="danger"></tk-spinner>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-spin-container')?.classList.contains('danger')).toBe(true);
  });

  it('renders the rounded spinner by default', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<tk-spinner></tk-spinner>`,
    });

    expect(page.root.shadowRoot.querySelector('.spinner-rounded')).toBeTruthy();
  });

  it.each([
    ['pulse', '.spinner-pulse'],
    ['loader', '.spinner-loader'],
    ['logo', '.spinner-logo'],
  ])('renders the %s spinner type', async (type: string, selector: string) => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<tk-spinner type="${type}"></tk-spinner>`,
    });

    expect(page.root.shadowRoot.querySelector(selector)).toBeTruthy();
  });

  it('renders eight dots for the dots type', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<tk-spinner type="dots"></tk-spinner>`,
    });

    expect(page.root.shadowRoot.querySelectorAll('.spinner-dots .dot')).toHaveLength(8);
  });

  it('renders eight lines for the lines type', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<tk-spinner type="lines"></tk-spinner>`,
    });

    expect(page.root.shadowRoot.querySelectorAll('.spinner-lines .line')).toHaveLength(8);
  });

  it('renders an svg for the logo type', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<tk-spinner type="logo"></tk-spinner>`,
    });

    expect(page.root.shadowRoot.querySelector('.spinner-logo svg')).toBeTruthy();
  });

  it('renders no spinner for an unknown type', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<tk-spinner type="unknown"></tk-spinner>`,
    });

    const container = page.root.shadowRoot.querySelector('.tk-spin-container');
    expect(container.querySelector('[class^="spinner-"]')).toBeNull();
  });

  it('applies orientation and size classes to the container', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<tk-spinner orientation="horizontal" size="large"></tk-spinner>`,
    });

    const container = page.root.shadowRoot.querySelector('.tk-spin-container');
    expect(container.classList.contains('horizontal')).toBe(true);
    expect(container.classList.contains('large')).toBe(true);
  });

  it('does not render a label element when label is not set', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<tk-spinner></tk-spinner>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-spinner-label')).toBeNull();
  });

  it('applies data-testid attributes on container, spinner and label', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<tk-spinner data-testid="spin" label="Loading"></tk-spinner>`,
    });

    expect(page.root.shadowRoot.querySelector('[data-testid="spin-container"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[data-testid="spin-rounded"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[data-testid="spin-label"]')).toBeTruthy();
  });

  it('inherits the button color when rendered inside a tk-button', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<button class="tk-button"><tk-spinner></tk-spinner></button>`,
    });

    const spinner = page.body.querySelector('tk-spinner');
    const rounded = spinner.shadowRoot.querySelector('.spinner-rounded') as HTMLElement;
    expect(rounded).toBeTruthy();
    expect(rounded.style.borderTopColor).toBe('transparent');
  });

  it('does not apply inline border styles outside of a tk-button', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<button><tk-spinner></tk-spinner></button>`,
    });

    const spinner = page.body.querySelector('tk-spinner');
    const rounded = spinner.shadowRoot.querySelector('.spinner-rounded') as HTMLElement;
    expect(rounded.style.borderTopColor).toBe('');
  });
});
