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

describe('tk-button form modes', () => {
  const clickButton = async page => {
    (page.body.querySelector('tk-button').shadowRoot.querySelector('button') as HTMLButtonElement).click();
    await page.waitForChanges();
  };

  it('resets the surrounding form in reset mode', async () => {
    const page = await newSpecPage({
      components: [TkButton],
      html: `<form><tk-button mode="reset"></tk-button></form>`,
    });
    const reset = jest.fn();
    (page.body.querySelector('form') as any).reset = reset;
    const clickSpy = jest.fn();
    page.body.querySelector('tk-button').addEventListener('tk-click', clickSpy);

    await clickButton(page);

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it('submits the surrounding form in submit mode', async () => {
    const page = await newSpecPage({
      components: [TkButton],
      html: `<form><tk-button mode="submit"></tk-button></form>`,
    });
    const requestSubmit = jest.fn();
    (page.body.querySelector('form') as any).requestSubmit = requestSubmit;

    await clickButton(page);

    expect(requestSubmit).toHaveBeenCalledTimes(1);
  });

  it('still emits tk-click in submit and reset modes without a form', async () => {
    for (const mode of ['submit', 'reset']) {
      const page = await newSpecPage({
        components: [TkButton],
        html: `<tk-button mode="${mode}"></tk-button>`,
      });
      const clickSpy = jest.fn();
      page.root.addEventListener('tk-click', clickSpy);

      await clickButton(page);

      expect(clickSpy).toHaveBeenCalledTimes(1);
    }
  });

  it('renders the native button type from the type prop', async () => {
    const page = await newSpecPage({
      components: [TkButton],
      html: `<tk-button type="outlined"></tk-button>`,
    });

    expect(page.root.shadowRoot.querySelector('button').getAttribute('type')).toBe('outlined');
    expect(page.root.shadowRoot.querySelector('button').classList.contains('outlined')).toBe(true);
  });
});

describe('tk-button icon color', () => {
  const iconColorFor = async (attrs: string) => {
    const page = await newSpecPage({
      components: [TkButton, TkIcon],
      html: `<tk-button icon="home" ${attrs}></tk-button>`,
    });
    return (page.root.shadowRoot.querySelector('tk-icon') as any).color;
  };

  it('uses white on filled buttons and the darkest text color on the white variant', async () => {
    expect(await iconColorFor('type="filled"')).toBe('var(--static-white)');
    expect(await iconColorFor('type="filled" variant="white"')).toBe('var(--text-darkest)');
  });

  it('inherits the current color on non filled buttons', async () => {
    expect(await iconColorFor('type="outlined"')).toBe('currentColor');
    expect(await iconColorFor('type="text"')).toBe('currentColor');
  });

  it('uses the animated content colors when animated', async () => {
    expect(await iconColorFor('animated="true" type="filled"')).toBe('var(--tk-button-animated-content-color)');
    expect(await iconColorFor('animated="true" type="outlined"')).toBe('var(--tk-button-animated-outlined-content-color)');
  });

  it('ignores the animated flag on text and filledLight buttons', async () => {
    const page = await newSpecPage({
      components: [TkButton, TkIcon],
      html: `<tk-button icon="home" animated="true" type="text"></tk-button>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-button').classList.contains('animated')).toBe(false);
    expect((page.root.shadowRoot.querySelector('tk-icon') as any).color).toBe('currentColor');
  });

  it('keeps a white icon on disabled filled buttons and a muted one otherwise', async () => {
    expect(await iconColorFor('disabled="true" type="filled"')).toBe('var(--static-white)');
    expect(await iconColorFor('disabled="true" type="filledLight"')).toBe('var(--static-white)');
    expect(await iconColorFor('disabled="true" type="outlined"')).toBe('var(--icon-sub-base)');
    expect(await iconColorFor('disabled="true" type="outlined" animated="true"')).toBe('var(--icon-sub-base)');
    expect(await iconColorFor('disabled="true" type="text"')).toBe('var(--icon-sub-base)');
  });
});

describe('tk-button layout classes', () => {
  it('applies rounded and icon-only classes only for icon buttons without a label', async () => {
    const iconOnly = await newSpecPage({
      components: [TkButton],
      html: `<tk-button icon="home" rounded="true"></tk-button>`,
    });
    const iconOnlyButton = iconOnly.root.shadowRoot.querySelector('.tk-button');
    expect(iconOnlyButton.classList.contains('rounded')).toBe(true);
    expect(iconOnlyButton.classList.contains('icon-only')).toBe(true);

    const labelled = await newSpecPage({
      components: [TkButton],
      html: `<tk-button icon="home" rounded="true" label="Home"></tk-button>`,
    });
    const labelledButton = labelled.root.shadowRoot.querySelector('.tk-button');
    expect(labelledButton.classList.contains('rounded')).toBe(false);
    expect(labelledButton.classList.contains('icon-only')).toBe(false);
  });

  it('does not treat a multi icon button as icon-only', async () => {
    const page = await newSpecPage({
      components: [TkButton],
      html: `<tk-button rounded="true"></tk-button>`,
    });
    page.root.icon = { left: { name: 'chevron_left' }, right: { name: 'chevron_right' } };
    await page.waitForChanges();

    const button = page.root.shadowRoot.querySelector('.tk-button');
    expect(button.classList.contains('icon-only')).toBe(false);
    expect(button.classList.contains('rounded')).toBe(true);
  });

  it('does not show the loading state while disabled', async () => {
    const page = await newSpecPage({
      components: [TkButton],
      html: `<tk-button loading="true" disabled="true"></tk-button>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-button').classList.contains('loading')).toBe(false);
    expect(page.root.shadowRoot.querySelector('tk-spinner')).toBeTruthy();
  });

  it('sizes the loading spinner from the button size', async () => {
    const spinnerSizeFor = async (size: string) => {
      const page = await newSpecPage({
        components: [TkButton, TkSpinner],
        html: `<tk-button loading="true" size="${size}"></tk-button>`,
      });
      return (page.root.shadowRoot.querySelector('tk-spinner') as any).size;
    };

    expect(await spinnerSizeFor('large')).toBe('small');
    expect(await spinnerSizeFor('base')).toBe('xsmall');
    expect(await spinnerSizeFor('small')).toBe('xxsmall');
  });

  it('applies the container style and the link class', async () => {
    const page = await newSpecPage({
      components: [TkButton],
      html: `<tk-button mode="link" href="/x"></tk-button>`,
    });
    page.root.containerStyle = { padding: '4px' };
    await page.waitForChanges();

    const link = page.root.shadowRoot.querySelector('a.tk-button') as HTMLElement;
    expect(link.classList.contains('link')).toBe(true);
    expect(link.style.padding).toBe('4px');
  });
});
