jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
  isNil: (value: unknown) => value === null || value === undefined,
}));

// uuid v14 ships pure ESM which Jest can't transform from node_modules; stub it for the suite.
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkInput } from '../tk-input';

const render = async (html: string): Promise<SpecPage> => newSpecPage({ components: [TkInput], html });

const nativeInputOf = (page: SpecPage) => page.root.querySelector('input') as HTMLInputElement;
const lockIconOf = (page: SpecPage) => page.root.querySelector('tk-icon[icon="lock"]');
const visibilityIconOf = (page: SpecPage) => page.root.querySelector('tk-icon[icon="visibility"]');

const typeValue = async (page: SpecPage, text: string) => {
  const input = nativeInputOf(page);
  input.value = text;
  input.dispatchEvent(new Event('input'));
  await page.waitForChanges();
};

const lineClasses = (page: SpecPage) => Array.from(page.root.querySelectorAll('.safety-status .line')).map(line => line.className);

describe('tk-input password mode', () => {
  it('renders a password input with a lock icon and a visibility toggle', async () => {
    const page = await render(`<tk-input mode="password"></tk-input>`);

    expect(nativeInputOf(page).getAttribute('type')).toBe('password');
    expect(lockIconOf(page)).not.toBeNull();
    expect(visibilityIconOf(page).classList.contains('clickable')).toBe(true);
  });

  it('hides the lock icon when hidePasswordIcon is set', async () => {
    const page = await render(`<tk-input mode="password" hide-password-icon="true"></tk-input>`);

    expect(lockIconOf(page)).toBeNull();
    expect(visibilityIconOf(page)).not.toBeNull();
  });

  it('gives way to a custom icon on the same side', async () => {
    const withLeft = await render(`<tk-input mode="password" icon="person"></tk-input>`);
    expect(lockIconOf(withLeft)).toBeNull();
    expect(visibilityIconOf(withLeft)).not.toBeNull();

    const withRight = await render(`<tk-input mode="password" icon="person" icon-position="right"></tk-input>`);
    expect(lockIconOf(withRight)).not.toBeNull();
    expect(visibilityIconOf(withRight)).toBeNull();
  });

  it('reveals the password while the visibility icon is held down', async () => {
    const page = await render(`<tk-input mode="password"></tk-input>`);
    const icon = visibilityIconOf(page);
    const input = nativeInputOf(page);

    icon.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(input.type).toBe('text');
    expect(icon.innerHTML).toBe('visibility_off');

    icon.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    expect(input.type).toBe('password');
    expect(icon.innerHTML).toBe('visibility');
  });

  it('renders no safety status unless asked', async () => {
    const page = await render(`<tk-input mode="password"></tk-input>`);
    expect(page.root.querySelector('.safety-status')).toBeNull();
  });

  it('renders four empty strength lines before anything is typed', async () => {
    const page = await render(`<tk-input mode="password" show-safety-status="true"></tk-input>`);
    expect(lineClasses(page)).toEqual(['line', 'line', 'line', 'line']);
  });

  it('marks a short lowercase password as weak', async () => {
    const page = await render(`<tk-input mode="password" show-safety-status="true"></tk-input>`);

    await typeValue(page, 'abc');

    expect(lineClasses(page)).toEqual(['line weak', 'line', 'line', 'line']);
  });

  it('marks a password meeting three criteria as medium', async () => {
    const page = await render(`<tk-input mode="password" show-safety-status="true"></tk-input>`);

    // long, lowercase and digits: three criteria met
    await typeValue(page, 'abcd1234');

    expect(lineClasses(page)).toEqual(['line medium', 'line medium', 'line medium', 'line']);
  });

  it('marks a password meeting four criteria as strong', async () => {
    const page = await render(`<tk-input mode="password" show-safety-status="true"></tk-input>`);

    await typeValue(page, 'Abcd1234');

    expect(lineClasses(page)).toEqual(['line strong', 'line strong', 'line strong', 'line strong']);
  });

  it('keeps all four lines strong when every criterion is met', async () => {
    const page = await render(`<tk-input mode="password" show-safety-status="true"></tk-input>`);

    await typeValue(page, 'Abcd123!');

    expect(lineClasses(page)).toEqual(['line strong', 'line strong', 'line strong', 'line strong']);
  });

  it('drops back to weak when the password is shortened', async () => {
    const page = await render(`<tk-input mode="password" show-safety-status="true"></tk-input>`);

    await typeValue(page, 'Abcd123!');
    await typeValue(page, 'A1');

    expect(lineClasses(page)).toEqual(['line weak', 'line weak', 'line', 'line']);
  });

  it('does not compute strength when the safety status is hidden', async () => {
    const page = await render(`<tk-input mode="password"></tk-input>`);

    await typeValue(page, 'Abcd123!');

    expect(page.rootInstance.passwordStrength).toBe(0);
  });
});
