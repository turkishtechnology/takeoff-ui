import { newSpecPage } from '@stencil/core/testing';
import { TkToggleButton } from '../tk-toggle-button';
import { TkIcon } from '../../tk-icon/tk-icon';

describe('tk-toggle-button', () => {
  it('emits the next selected state on click', async () => {
    const page = await newSpecPage({
      components: [TkToggleButton],
      html: `<tk-toggle-button label="Bold"></tk-toggle-button>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-toggle', spy);
    (page.root.shadowRoot.querySelector('button') as HTMLButtonElement).click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.selected).toBe(true);
  });

  it('emits the value and the deselect state when it is already selected', async () => {
    const page = await newSpecPage({
      components: [TkToggleButton],
      html: `<tk-toggle-button label="Bold" value="bold" selected></tk-toggle-button>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-toggle', spy);
    (page.root.shadowRoot.querySelector('button') as HTMLButtonElement).click();
    await page.waitForChanges();

    expect(spy.mock.calls[0][0].detail).toEqual({ value: 'bold', selected: false });
  });

  it('does not emit tk-toggle when disabled', async () => {
    const page = await newSpecPage({
      components: [TkToggleButton],
      html: `<tk-toggle-button label="Bold" disabled></tk-toggle-button>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-toggle', spy);
    (page.root.shadowRoot.querySelector('button') as HTMLButtonElement).click();
    await page.waitForChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('does not render a label element when label is empty', async () => {
    const page = await newSpecPage({
      components: [TkToggleButton],
      html: `<tk-toggle-button></tk-toggle-button>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-toggle-button-label')).toBeNull();
  });

  it('applies variant, type, size and rounded classes on the button', async () => {
    const page = await newSpecPage({
      components: [TkToggleButton],
      html: `<tk-toggle-button variant="primary" type="outlined" size="small" rounded></tk-toggle-button>`,
    });

    const button = page.root.shadowRoot.querySelector('button');
    expect(button.classList.contains('primary')).toBe(true);
    expect(button.classList.contains('outlined')).toBe(true);
    expect(button.classList.contains('small')).toBe(true);
    expect(button.classList.contains('rounded')).toBe(true);
  });

  it('does not apply the selected class when selected and disabled at the same time', async () => {
    const page = await newSpecPage({
      components: [TkToggleButton],
      html: `<tk-toggle-button selected disabled></tk-toggle-button>`,
    });

    const button = page.root.shadowRoot.querySelector('button');
    expect(button.classList.contains('selected')).toBe(false);
    expect(button.classList.contains('disabled')).toBe(true);
  });

  describe('icon rendering', () => {
    it.each([
      ['disabled', `<tk-toggle-button icon="star" disabled selected></tk-toggle-button>`, 'var(--icon-sub-base)'],
      ['selected filled', `<tk-toggle-button icon="star" selected></tk-toggle-button>`, 'var(--static-white)'],
      ['selected raised', `<tk-toggle-button icon="star" selected type="raised"></tk-toggle-button>`, 'var(--static-white)'],
      ['selected outlined neutral', `<tk-toggle-button icon="star" selected type="outlined"></tk-toggle-button>`, 'var(--icon-darkest)'],
      ['selected text primary', `<tk-toggle-button icon="star" selected type="text" variant="primary"></tk-toggle-button>`, 'var(--primary-base)'],
    ])('uses the %s icon color', async (_name: string, html: string, expectedColor: string) => {
      const page = await newSpecPage({
        components: [TkToggleButton, TkIcon],
        html,
      });

      const icon = page.root.shadowRoot.querySelector('tk-icon') as HTMLTkIconElement;
      expect(icon.color).toBe(expectedColor);
    });

    it('uses no icon color override when not selected and not disabled', async () => {
      const page = await newSpecPage({
        components: [TkToggleButton, TkIcon],
        html: `<tk-toggle-button icon="star"></tk-toggle-button>`,
      });

      const icon = page.root.shadowRoot.querySelector('tk-icon') as HTMLTkIconElement;
      expect(icon.color).toBeFalsy();
    });

    it('renders the icon before the label by default', async () => {
      const page = await newSpecPage({
        components: [TkToggleButton, TkIcon],
        html: `<tk-toggle-button icon="star" label="Star"></tk-toggle-button>`,
      });

      const button = page.root.shadowRoot.querySelector('button');
      expect(button.firstElementChild.tagName.toLowerCase()).toBe('tk-icon');
    });

    it('renders the icon after the label when iconPosition is right', async () => {
      const page = await newSpecPage({
        components: [TkToggleButton, TkIcon],
        html: `<tk-toggle-button icon="star" label="Star" icon-position="right"></tk-toggle-button>`,
      });

      const button = page.root.shadowRoot.querySelector('button');
      expect(button.lastElementChild.tagName.toLowerCase()).toBe('tk-icon');
      expect(button.firstElementChild.classList.contains('tk-toggle-button-label')).toBe(true);
    });
  });

  it('applies data-testid attributes on the button and label', async () => {
    const page = await newSpecPage({
      components: [TkToggleButton],
      html: `<tk-toggle-button data-testid="tb" label="Bold"></tk-toggle-button>`,
    });

    expect(page.root.shadowRoot.querySelector('[data-testid="tb-button"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[data-testid="tb-label"]')).toBeTruthy();
  });
});
