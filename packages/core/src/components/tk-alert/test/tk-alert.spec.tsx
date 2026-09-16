import { newSpecPage } from '@stencil/core/testing';
import { TkAlert } from '../tk-alert';
import { TkIcon } from '../../tk-icon/tk-icon';
import { TkButton } from '../../tk-button/tk-button';

describe('tk-alert', () => {
  it('renders header, message and variant classes', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkIcon, TkButton],
      html: `<tk-alert header="Test header" message="Test message" variant="success"></tk-alert>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-alert-content').textContent).toContain('Test header');
    expect(page.root.shadowRoot.querySelector('.tk-alert-content').textContent).toContain('Test message');
    expect(page.root.shadowRoot.querySelector('.tk-alert-container').classList.contains('success')).toBe(true);
    expect(page.root.shadowRoot.querySelector('tk-icon')?.textContent).toContain('check_circle');
  });

  it('renders custom icon objects and multiple messages', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkIcon, TkButton],
      html: `<tk-alert></tk-alert>`,
    });

    page.root.icon = { name: 'search', style: 'rounded', fill: true, color: '#000000' };
    page.root.message = ['First', 'Second'];
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('tk-icon .material-symbols-rounded')?.textContent).toBe('search');
    expect(page.root.shadowRoot.querySelectorAll('.tk-alert-message')).toHaveLength(2);
  });

  it('applies icon size classes', async () => {
    for (const size of ['small', 'base', 'large'] as const) {
      const page = await newSpecPage({
        components: [TkAlert, TkIcon, TkButton],
        html: `<tk-alert icon="home" icon-size="${size}"></tk-alert>`,
      });

      const icon = page.root.shadowRoot.querySelector(`.tk-icon-${size === 'base' ? 'base' : size}`);

      expect(icon).toBeTruthy();
    }
  });

  it('renders multiple messages', async () => {
    const message = [
      'Lorem ipsum odor amet, consectetuer adipiscing elit.',
      'Aptent fringilla felis aenean mus habitant.',
      'Nullam lobortis dapibus habitant pellentesque netus placerat natoque consectetur phasellus.',
      'Ligula turpis id netus himenaeos magna semper netus elit.',
    ];
    const page = await newSpecPage({
      components: [TkAlert, TkIcon, TkButton],
      html: `<tk-alert></tk-alert>`,
    });
    page.root.message = message;

    await page.waitForChanges();

    const divs = page.root.shadowRoot.querySelectorAll('.tk-alert-message');
    console.log(page.root.shadowRoot.innerHTML);
    expect(divs.length).toBe(message.length);

    for (let i = 0; i < message.length; i++) {
      console.log(divs[i].textContent);
      expect(divs[i].textContent.trim()).toBe(message[i].trim());
    }
  });
});

//Event
describe('event handling', () => {
  it('should remove the alert when close button is clicked', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkIcon, TkButton],
      html: `<tk-alert removable
              ></tk-alert>`,
    });

    await page.waitForChanges();

    const button = page.root.shadowRoot.querySelector('tk-button');

    expect(button).toBeTruthy();
    expect(button.shadowRoot.querySelector('tk-icon')?.textContent).toContain('close');

    (button.shadowRoot.querySelector('button') as HTMLButtonElement).click();

    await page.waitForChanges();
    // `page.root` keeps its reference after the element detaches, so query the document.
    expect(page.body.querySelector('tk-alert')).toBeNull();
  });
  it('should call handleCloseButtonClick when close button is clicked', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkIcon, TkButton],
      html: `<tk-alert removable
                ></tk-alert>`,
    });

    await page.waitForChanges();

    const instance = page.rootInstance;

    expect(instance).toBeTruthy();

    const spy = jest.spyOn(instance as any, 'handleCloseButtonClick');
    const button = page.root.shadowRoot.querySelector('tk-button');

    expect(button).toBeTruthy();

    (button.shadowRoot.querySelector('button') as HTMLButtonElement).click();

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(page.body.querySelector('tk-alert')).toBeNull();
  });
});

describe('dataTestid', () => {
  it('sets data-testid on the root container when dataTestid is provided', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkIcon, TkButton],
      html: `<tk-alert data-testid="my-alert" header="Test"></tk-alert>`,
    });

    const container = page.root.shadowRoot.querySelector('.tk-alert-container');
    expect(container.getAttribute('data-testid')).toBe('my-alert-container');
  });

  it('does not set data-testid when dataTestid is not provided', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkIcon, TkButton],
      html: `<tk-alert header="Test"></tk-alert>`,
    });

    const container = page.root.shadowRoot.querySelector('.tk-alert-container');
    expect(container.getAttribute('data-testid')).toBeNull();
  });

  it('sets data-testid on header and message elements', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkIcon, TkButton],
      html: `<tk-alert data-testid="my-alert" header="Title" message="Body"></tk-alert>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-alert-header').getAttribute('data-testid')).toBe('my-alert-header');
    expect(page.root.shadowRoot.querySelector('.tk-alert-message').getAttribute('data-testid')).toBe('my-alert-message');
  });

  it('sets data-testid on message-holder when message is an array', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkIcon, TkButton],
      html: `<tk-alert data-testid="my-alert"></tk-alert>`,
    });
    page.root.message = ['First', 'Second'];
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('.tk-alert-message-holder').getAttribute('data-testid')).toBe('my-alert-message-holder');

    const messages = page.root.shadowRoot.querySelectorAll('.tk-alert-message');
    expect(messages[0].getAttribute('data-testid')).toBe('my-alert-message-0');
    expect(messages[1].getAttribute('data-testid')).toBe('my-alert-message-1');
  });

  it('sets data-testid on content wrapper', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkIcon, TkButton],
      html: `<tk-alert data-testid="my-alert" message="Body"></tk-alert>`,
    });

    const content = page.root.shadowRoot.querySelector('.tk-alert-content');
    expect(content.getAttribute('data-testid')).toBe('my-alert-content');
  });

  it('sets data-testid on close button when removable', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkIcon, TkButton],
      html: `<tk-alert data-testid="my-alert" removable></tk-alert>`,
    });

    const closeBtn = page.root.shadowRoot.querySelector('tk-button');
    expect(closeBtn.getAttribute('data-testid')).toBe('my-alert-close-button');
  });

  it('sets data-testid on icon element', async () => {
    const page = await newSpecPage({
      components: [TkAlert, TkIcon, TkButton],
      html: `<tk-alert data-testid="my-alert" icon="check" variant="success"></tk-alert>`,
    });

    const icon = page.root.shadowRoot.querySelector('tk-icon');
    expect(icon.getAttribute('data-testid')).toBe('my-alert-left-icon');
  });
});

describe('tk-alert variants and slots', () => {
  const create = (html: string) => newSpecPage({ components: [TkAlert, TkIcon, TkButton], html });

  it('picks the default icon from the variant', async () => {
    const iconFor = async (variant: string) => {
      const page = await create(`<tk-alert variant="${variant}" message="m"></tk-alert>`);
      return page.root.shadowRoot.querySelector('tk-icon')?.textContent ?? null;
    };

    expect(await iconFor('success')).toContain('check_circle');
    expect(await iconFor('info')).toContain('info');
    expect(await iconFor('danger')).toContain('error');
    expect(await iconFor('warning')).toContain('warning');
    expect(await iconFor('neutral')).toBeNull();
  });

  it('marks the content as message-only when there is no header', async () => {
    const withHeader = await create(`<tk-alert header="Title" message="Body"></tk-alert>`);
    expect(withHeader.root.shadowRoot.querySelector('.tk-alert-content').classList.contains('message-content')).toBe(false);

    const withoutHeader = await create(`<tk-alert message="Body"></tk-alert>`);
    expect(withoutHeader.root.shadowRoot.querySelector('.tk-alert-content').classList.contains('message-content')).toBe(true);
    expect(withoutHeader.root.shadowRoot.querySelector('.tk-alert-header')).toBeNull();
  });

  it('applies the header style, alignment and type classes', async () => {
    const page = await create(`<tk-alert header="Title" align-items="start" type="outlined"></tk-alert>`);
    page.root.headerStyle = { color: 'red' };
    page.root.containerStyle = { margin: '2px' };
    await page.waitForChanges();

    const container = page.root.shadowRoot.querySelector('.tk-alert-container') as HTMLElement;
    expect(container.classList.contains('tk-alert-alignment-start')).toBe(true);
    expect(container.classList.contains('outlined')).toBe(true);
    expect(container.style.margin).toBe('2px');
    expect((page.root.shadowRoot.querySelector('.tk-alert-header') as HTMLElement).style.color).toBe('red');
  });

  it('renders nothing for a message array that is not all strings', async () => {
    const page = await create(`<tk-alert></tk-alert>`);
    page.root.message = [1, 2];
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('.tk-alert-message')).toBeNull();
    expect(page.root.shadowRoot.querySelector('.tk-alert-message-holder')).toBeNull();
  });

  it('renders the footer-action and right-action slots only when provided', async () => {
    const plain = await create(`<tk-alert message="m"></tk-alert>`);
    expect(plain.root.shadowRoot.querySelector('slot[name="footer-action"]')).toBeNull();
    expect(plain.root.shadowRoot.querySelector('slot[name="right-action"]')).toBeNull();

    const slotted = await create(`<tk-alert message="m"><button slot="footer-action">Undo</button><button slot="right-action">Go</button></tk-alert>`);
    expect(slotted.root.shadowRoot.querySelector('.tk-alert-content slot[name="footer-action"]')).toBeTruthy();
    expect(slotted.root.shadowRoot.querySelector('slot[name="right-action"]')).toBeTruthy();
  });

  it('replaces the icon and text with the content slot', async () => {
    const page = await create(`<tk-alert variant="success" header="Hidden"><div slot="content">Custom</div></tk-alert>`);

    expect(page.root.shadowRoot.querySelector('slot[name="content"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('.tk-alert-content')).toBeNull();
    expect(page.root.shadowRoot.querySelector('tk-icon')).toBeNull();
  });

  it('uses a white close button on filled alerts and a neutral one otherwise', async () => {
    const filled = await create(`<tk-alert removable type="filled"></tk-alert>`);
    expect((filled.root.shadowRoot.querySelector('tk-button') as any).variant).toBe('white');

    const outlined = await create(`<tk-alert removable type="outlined"></tk-alert>`);
    expect((outlined.root.shadowRoot.querySelector('tk-button') as any).variant).toBe('neutral');

    const notRemovable = await create(`<tk-alert></tk-alert>`);
    expect(notRemovable.root.shadowRoot.querySelector('tk-button')).toBeNull();
  });
});
