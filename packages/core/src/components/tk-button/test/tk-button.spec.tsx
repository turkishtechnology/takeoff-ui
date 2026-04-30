import { newSpecPage } from '@stencil/core/testing';
import { TkButton } from '../tk-button';
import { TkIcon } from '../../tk-icon/tk-icon';
import { TkSpinner } from '../../tk-spinner/tk-spinner';

describe('tk-button', () => {
  it('renders its label and host full-width class', async () => {
    const page = await newSpecPage({
      components: [TkButton],
      html: `<tk-button label="test"></tk-button>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-button').textContent).toBe('test');

    page.root.fullWidth = true;
    await page.waitForChanges();

    expect(page.root.classList.contains('full-width')).toBe(true);
  });

  it('renders link mode as an anchor element', async () => {
    const page = await newSpecPage({
      components: [TkButton],
      html: `<tk-button mode="link" href="/test" target="_self" underline="true"></tk-button>`,
    });

    const link = page.root.shadowRoot.querySelector('a.tk-button');

    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/test');
    expect(link.getAttribute('target')).toBe('_self');
    expect(link.classList.contains('underline')).toBe(true);
  });

  it('renders a spinner while loading', async () => {
    const page = await newSpecPage({
      components: [TkButton],
      html: `<tk-button loading="true"></tk-button>`,
    });

    const button = page.root.shadowRoot.querySelector('.tk-button');
    const spinner = page.root.shadowRoot.querySelector('tk-spinner');

    expect(button.classList.contains('loading')).toBe(true);
    expect(spinner).toBeTruthy();
  });

  it('renders icons from both string and object values', async () => {
    const stringPage = await newSpecPage({
      components: [TkButton, TkIcon],
      html: `<tk-button icon="home"></tk-button>`,
    });

    expect(stringPage.root.shadowRoot.querySelector('tk-icon')).toBeTruthy();
    expect(stringPage.root.shadowRoot.querySelector('tk-icon')?.textContent).toContain('home');

    const objectPage = await newSpecPage({
      components: [TkButton, TkIcon],
      html: `<tk-button></tk-button>`,
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
    expect(icon.style.color).toBe('#000000');
  });

  it('emits tk-click for enabled buttons only', async () => {
    const enabledPage = await newSpecPage({
      components: [TkButton],
      html: `<tk-button></tk-button>`,
    });

    const enabledSpy = jest.fn();
    enabledPage.root.addEventListener('tk-click', enabledSpy);
    (enabledPage.root.shadowRoot.querySelector('button') as HTMLButtonElement).click();
    await enabledPage.waitForChanges();
    expect(enabledSpy).toHaveBeenCalledTimes(1);

    const disabledPage = await newSpecPage({
      components: [TkButton],
      html: `<tk-button disabled="true"></tk-button>`,
    });

    const disabledSpy = jest.fn();
    disabledPage.root.addEventListener('tk-click', disabledSpy);
    (disabledPage.root.shadowRoot.querySelector('button') as HTMLButtonElement).click();
    await disabledPage.waitForChanges();
    expect(disabledSpy).not.toHaveBeenCalled();
  });

  it('emits tk-click in submit mode', async () => {
    const page = await newSpecPage({
      components: [TkButton],
      html: `<form><tk-button mode="submit"></tk-button></form>`,
    });

    const clickSpy = jest.fn();
    page.body.querySelector('tk-button').addEventListener('tk-click', clickSpy);
    (page.body.querySelector('form') as any).requestSubmit = jest.fn();

    (page.body.querySelector('tk-button').shadowRoot.querySelector('button') as HTMLButtonElement).click();
    await page.waitForChanges();

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('reflects and forwards data-testid to the native button element', async () => {
    const page = await newSpecPage({
      components: [TkButton],
      html: `<tk-button data-testid="1" label="Click" icon="home"></tk-button>`,
    });

    expect(page.root.getAttribute('data-testid')).toBe('1');
    expect(page.root.shadowRoot.querySelector('button')?.getAttribute('data-testid')).toBe('1-container');
    expect(page.root.shadowRoot.querySelector('span')?.getAttribute('data-testid')).toBe('1-label');
    expect(page.root.shadowRoot.querySelector('tk-icon')?.getAttribute('data-testid')).toBe('1-left-icon');
  });

  it('forwards data-testid to anchor in link mode', async () => {
    const page = await newSpecPage({
      components: [TkButton],
      html: `<tk-button mode="link" href="/test" data-testid="2" label="Docs" icon-position="right" icon="arrow_forward"></tk-button>`,
    });

    expect(page.root.shadowRoot.querySelector('a')?.getAttribute('data-testid')).toBe('2-container');
    expect(page.root.shadowRoot.querySelector('span')?.getAttribute('data-testid')).toBe('2-label');
    expect(page.root.shadowRoot.querySelector('tk-icon')?.getAttribute('data-testid')).toBe('2-right-icon');
  });

  it('generates left and right icon test ids for multi-icon configuration', async () => {
    const page = await newSpecPage({
      components: [TkButton],
      html: `<tk-button data-testid="3"></tk-button>`,
    });

    page.root.icon = {
      left: { name: 'chevron_left' },
      right: { name: 'chevron_right' },
    };
    await page.waitForChanges();

    const icons = page.root.shadowRoot.querySelectorAll('tk-icon');

    expect(icons.length).toBe(2);
    expect(icons[0].getAttribute('data-testid')).toBe('3-left-icon');
    expect(icons[1].getAttribute('data-testid')).toBe('3-right-icon');
  });

  it('forwards derived data-testid to loading spinner', async () => {
    const page = await newSpecPage({
      components: [TkButton, TkSpinner],
      html: `<tk-button loading="true" data-testid="loading-button"></tk-button>`,
    });

    expect(page.root.shadowRoot.querySelector('tk-spinner')?.getAttribute('data-testid')).toBe('loading-button-loading-spinner');
  });
});
