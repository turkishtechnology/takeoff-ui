import { newSpecPage } from '@stencil/core/testing';
import { TkRating } from '../tk-rating';
import getIcon from '../rating-icons';

const createPage = async (html: string) => {
  return newSpecPage({
    components: [TkRating],
    html,
  });
};

describe('tk-rating', () => {
  it('marks the selected number rating item', async () => {
    const page = await newSpecPage({
      components: [TkRating],
      html: `<tk-rating type="number" value="3"></tk-rating>`,
    });

    expect(page.root.shadowRoot.querySelector('.rating-number-3')?.classList.contains('selected')).toBe(true);
  });

  it('renders 5 star icons by default', async () => {
    const page = await createPage(`<tk-rating></tk-rating>`);

    const items = page.root.shadowRoot.querySelectorAll('.tk-rating');
    expect(items).toHaveLength(5);
    items.forEach(item => expect(item.classList.contains('star')).toBe(true));
  });

  it('renders maxRating icons for icon types', async () => {
    const page = await createPage(`<tk-rating max-rating="10"></tk-rating>`);

    expect(page.root.shadowRoot.querySelectorAll('.tk-rating')).toHaveLength(10);
  });

  it('applies fill, semi and default states based on a half-step value', async () => {
    const page = await createPage(`<tk-rating value="2.5"></tk-rating>`);

    const items = page.root.shadowRoot.querySelectorAll('.tk-rating');
    expect(items[0].classList.contains('fill')).toBe(true);
    expect(items[1].classList.contains('fill')).toBe(true);
    expect(items[2].classList.contains('semi')).toBe(true);
    expect(items[3].classList.contains('default')).toBe(true);
    expect(items[4].classList.contains('default')).toBe(true);
  });

  it('renders heart and dot types', async () => {
    const heartPage = await createPage(`<tk-rating type="heart" value="1"></tk-rating>`);
    expect(heartPage.root.shadowRoot.querySelectorAll('.tk-rating.heart')).toHaveLength(5);

    const dotPage = await createPage(`<tk-rating type="dot" value="1"></tk-rating>`);
    expect(dotPage.root.shadowRoot.querySelectorAll('.tk-rating.dot')).toHaveLength(5);
  });

  it('shows the rating value text when showRatingValue is set', async () => {
    const page = await createPage(`<tk-rating show-rating-value="true" value="2"></tk-rating>`);

    const items = page.root.shadowRoot.querySelectorAll('.tk-rating');
    expect(items[0].textContent).toContain('01');
    expect(items[4].textContent).toContain('05');
  });

  it('emits tk-change with the clicked rating', async () => {
    const page = await createPage(`<tk-rating value="1"></tk-rating>`);
    const changeSpy = jest.fn();
    page.root.addEventListener('tk-change', changeSpy);

    const items = page.root.shadowRoot.querySelectorAll('.tk-rating');
    (items[3] as HTMLElement).click();
    await page.waitForChanges();

    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy.mock.calls[0][0].detail).toBe(4);
  });

  it('previews the hovered rating and resets it on mouse leave', async () => {
    const page = await createPage(`<tk-rating value="1"></tk-rating>`);

    const items = page.root.shadowRoot.querySelectorAll('.tk-rating');
    items[3].dispatchEvent(new Event('mousemove'));
    await page.waitForChanges();

    let rendered = page.root.shadowRoot.querySelectorAll('.tk-rating');
    expect(rendered[3].classList.contains('fill')).toBe(true);

    // Moving over the same rating again keeps the hover state unchanged
    rendered[3].dispatchEvent(new Event('mousemove'));
    await page.waitForChanges();
    expect((page.rootInstance as any).hoverRating).toBe(4);

    rendered[3].dispatchEvent(new Event('mouseleave'));
    await page.waitForChanges();

    rendered = page.root.shadowRoot.querySelectorAll('.tk-rating');
    expect(rendered[3].classList.contains('fill')).toBe(false);
    expect(rendered[0].classList.contains('fill')).toBe(true);
  });

  it('ignores interaction when readonly', async () => {
    const page = await createPage(`<tk-rating readonly="true" value="2"></tk-rating>`);
    const changeSpy = jest.fn();
    page.root.addEventListener('tk-change', changeSpy);

    const items = page.root.shadowRoot.querySelectorAll('.tk-rating');
    items[4].dispatchEvent(new Event('mousemove'));
    await page.waitForChanges();
    expect((page.rootInstance as any).hoverRating).toBe(0);

    items[4].dispatchEvent(new Event('mouseleave'));
    (items[4] as HTMLElement).click();
    await page.waitForChanges();

    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('renders disabled icons without interaction', async () => {
    const page = await createPage(`<tk-rating disabled="true" value="3" show-rating-value="true"></tk-rating>`);
    const changeSpy = jest.fn();
    page.root.addEventListener('tk-change', changeSpy);

    const items = page.root.shadowRoot.querySelectorAll('.tk-rating');
    expect(items).toHaveLength(5);
    items.forEach(item => expect(item.classList.contains('disabled')).toBe(true));
    expect(items[0].textContent).toContain('01');

    (items[2] as HTMLElement).click();
    await page.waitForChanges();
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('sets data-testid attributes when dataTestid is provided', async () => {
    const page = await createPage(`<tk-rating data-testid="rating"></tk-rating>`);

    expect(page.root.shadowRoot.querySelector('[data-testid="rating-container"]')).not.toBeNull();
    expect(page.root.shadowRoot.querySelector('[data-testid="rating-item-1"]')).not.toBeNull();
    expect(page.root.shadowRoot.querySelector('[data-testid="rating-item-5"]')).not.toBeNull();
  });

  describe('number type', () => {
    it('renders five padded number items inside a number container', async () => {
      const page = await createPage(`<tk-rating type="number"></tk-rating>`);

      expect(page.root.shadowRoot.querySelector('.tk-rating-container.number')).not.toBeNull();
      const items = page.root.shadowRoot.querySelectorAll('.tk-rating.number');
      expect(items).toHaveLength(5);
      expect(items[0].textContent).toBe('01');
      expect(items[4].textContent).toBe('05');
    });

    it('emits tk-change with the clicked number rating', async () => {
      const page = await createPage(`<tk-rating type="number" value="1"></tk-rating>`);
      const changeSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);

      const item = page.root.shadowRoot.querySelector('.rating-number-4') as HTMLElement;
      item.dispatchEvent(new Event('mousemove'));
      await page.waitForChanges();

      (page.root.shadowRoot.querySelector('.rating-number-4') as HTMLElement).dispatchEvent(new Event('mouseleave'));
      (page.root.shadowRoot.querySelector('.rating-number-4') as HTMLElement).click();
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toBe(4);
    });

    it('applies readonly and disabled classes and blocks clicks', async () => {
      const readonlyPage = await createPage(`<tk-rating type="number" readonly="true" value="2"></tk-rating>`);
      expect(readonlyPage.root.shadowRoot.querySelector('.tk-rating.number').classList.contains('readonly')).toBe(true);

      const disabledPage = await createPage(`<tk-rating type="number" disabled="true" value="2"></tk-rating>`);
      expect(disabledPage.root.shadowRoot.querySelector('.tk-rating.number').classList.contains('disabled')).toBe(true);

      const changeSpy = jest.fn();
      disabledPage.root.addEventListener('tk-change', changeSpy);
      (disabledPage.root.shadowRoot.querySelector('.rating-number-5') as HTMLElement).click();
      await disabledPage.waitForChanges();

      expect(changeSpy).not.toHaveBeenCalled();
    });
  });
});

describe('rating-icons', () => {
  const types = ['star', 'heart', 'dot'];
  const states = ['fill', 'semi', 'default', 'disabled'];

  types.forEach(type => {
    states.forEach(state => {
      it(`returns an svg vnode for type "${type}" and state "${state}"`, () => {
        const icon = getIcon(type, state);
        expect(icon).toBeTruthy();
        expect((icon as any).$tag$).toBe('svg');
      });
    });
  });

  it('defaults to the star icon in default state', () => {
    const icon = getIcon();
    expect(icon).toBeTruthy();
    expect((icon as any).$tag$).toBe('svg');
  });

  it('returns undefined for an unknown type', () => {
    expect(getIcon('triangle', 'fill')).toBeUndefined();
  });

  it('returns undefined for an unknown state', () => {
    expect(getIcon('star', 'unknown')).toBeUndefined();
    expect(getIcon('heart', 'unknown')).toBeUndefined();
    expect(getIcon('dot', 'unknown')).toBeUndefined();
  });
});
