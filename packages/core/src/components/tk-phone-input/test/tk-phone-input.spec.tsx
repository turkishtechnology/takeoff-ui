jest.mock('../../../utils/position-utils', () => ({
  floatingElementAutoUpdate: jest.fn(() => jest.fn()),
}));

import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TkPhoneInput } from '../tk-phone-input';
import { INTERNAL_COUNTRIES } from '../constants';
import { ICountry } from '../types';
import { floatingElementAutoUpdate } from '../../../utils/position-utils';

const positionMock = floatingElementAutoUpdate as unknown as jest.Mock;

const createPage = async (html: string) => {
  return newSpecPage({
    components: [TkPhoneInput],
    html,
  });
};

const getInput = (page): HTMLInputElement => page.root.querySelector('input.tk-phone-input-input');
const getDropdownButton = (page): HTMLElement => page.root.querySelector('.tk-phone-input-dropdown-button');
const getMenu = (page): HTMLElement | null => page.root.querySelector('.tk-phone-input-dropdown-menu');

const openDropdown = async page => {
  getDropdownButton(page).click();
  await page.waitForChanges();
};

describe('tk-phone-input', () => {
  beforeEach(() => {
    positionMock.mockClear();
  });

  it('renders the default country dial code', async () => {
    const page = await newSpecPage({
      components: [TkPhoneInput],
      html: `<tk-phone-input default-country="US"></tk-phone-input>`,
    });

    expect(page.root.querySelector('.tk-phone-input-dial-code')?.textContent).toBe('+1');
  });

  it('defaults to Turkey when no default country is provided', async () => {
    const page = await createPage(`<tk-phone-input></tk-phone-input>`);

    expect(page.root.querySelector('.tk-phone-input-dial-code')?.textContent).toBe('+90');
    expect(page.root.querySelector('.flag-tr')).not.toBeNull();
  });

  it('falls back to the first country for an unknown country code', async () => {
    const page = await createPage(`<tk-phone-input default-country="XX"></tk-phone-input>`);

    expect(page.root.querySelector('.tk-phone-input-dial-code')?.textContent).toBe(INTERNAL_COUNTRIES[0].dialCode);
  });

  it('renders label with asterisk when requested', async () => {
    const page = await createPage(`<tk-phone-input label="Phone Number" show-asterisk="true"></tk-phone-input>`);
    const label = page.root.querySelector('.tk-phone-input-label');
    expect(label?.textContent).toContain('Phone Number');
    expect(label?.querySelector('.tk-phone-input-asterisk')).not.toBeNull();

    const noLabelPage = await createPage(`<tk-phone-input></tk-phone-input>`);
    expect(noLabelPage.root.querySelector('.tk-phone-input-label')).toBeNull();
  });

  it('renders hint and error messages', async () => {
    const hintPage = await createPage(`<tk-phone-input hint="Helpful hint"></tk-phone-input>`);
    const hintWrapper = hintPage.root.querySelector('.tk-hint-wrapper');
    expect(hintWrapper?.textContent).toContain('Helpful hint');
    expect(hintWrapper?.classList.contains('error')).toBe(false);

    const errorPage = await createPage(`<tk-phone-input error="Bad phone" invalid="true"></tk-phone-input>`);
    const errorWrapper = errorPage.root.querySelector('.tk-hint-wrapper');
    expect(errorWrapper?.textContent).toContain('Bad phone');
    expect(errorWrapper?.classList.contains('error')).toBe(true);
    expect(errorWrapper?.classList.contains('invalid')).toBe(true);
  });

  it('applies the size class to the container', async () => {
    const page = await createPage(`<tk-phone-input size="small"></tk-phone-input>`);

    expect(page.root.querySelector('.tk-phone-input-container-small')).not.toBeNull();
  });

  it('uses the placeholder prop when the country has none, otherwise the mask', async () => {
    const page = await createPage(`<tk-phone-input placeholder="Custom placeholder"></tk-phone-input>`);
    expect(getInput(page).getAttribute('placeholder')).toBe('Custom placeholder');

    const maskPage = await createPage(`<tk-phone-input></tk-phone-input>`);
    expect(getInput(maskPage).getAttribute('placeholder')).toBe('(999) 999 9999');
  });

  it('disables the input and prevents the dropdown from opening when disabled', async () => {
    const page = await createPage(`<tk-phone-input disabled="true"></tk-phone-input>`);

    expect(getInput(page).hasAttribute('disabled')).toBe(true);

    getDropdownButton(page).click();
    await page.waitForChanges();
    expect(getMenu(page)).toBeNull();
  });

  describe('dropdown', () => {
    it('opens and closes via the dropdown button', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);

      await openDropdown(page);
      expect(getMenu(page)).not.toBeNull();
      expect(positionMock).toHaveBeenCalled();

      getDropdownButton(page).click();
      await page.waitForChanges();
      expect(getMenu(page)).toBeNull();
    });

    it('applies the dropdown width based on dropdownWidthMode', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);
      await openDropdown(page);

      let options = positionMock.mock.calls[positionMock.mock.calls.length - 1][3];
      const matchParentEl = { style: {} } as any;
      options.size.apply({ rects: { reference: { width: 240 } }, elements: { floating: matchParentEl } });
      expect(matchParentEl.style.width).toBe('240px');

      const fixedPage = await createPage(`<tk-phone-input dropdown-width-mode="300px"></tk-phone-input>`);
      await openDropdown(fixedPage);
      options = positionMock.mock.calls[positionMock.mock.calls.length - 1][3];
      const fixedEl = { style: {} } as any;
      options.size.apply({ rects: { reference: { width: 240 } }, elements: { floating: fixedEl } });
      expect(fixedEl.style.width).toBe('300px');

      const autoPage = await createPage(`<tk-phone-input dropdown-width-mode="auto"></tk-phone-input>`);
      await openDropdown(autoPage);
      options = positionMock.mock.calls[positionMock.mock.calls.length - 1][3];
      const autoEl = { style: {} } as any;
      options.size.apply({ rects: { reference: { width: 240 } }, elements: { floating: autoEl } });
      expect(autoEl.style.width).toBeUndefined();
    });

    it('selects a country from the list and emits tk-change', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);
      const changeSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);

      await openDropdown(page);
      const items = Array.from(page.root.querySelectorAll('.tk-phone-input-menu-item'));
      const usItem = items.find(item => item.querySelector('.tk-phone-input-menu-country-label')?.textContent === 'United States');
      expect(usItem).toBeTruthy();

      (usItem as HTMLElement).click();
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      const detail = changeSpy.mock.calls[0][0].detail;
      expect(detail.country.id).toBe('US');
      expect(detail.rawValue).toBe('');
      expect(detail.maskedValue).toBe('');
      expect(getMenu(page)).toBeNull();
      expect(page.root.querySelector('.tk-phone-input-dial-code')?.textContent).toBe('+1');
    });

    it('filters countries by label and dial code', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);
      const instance = page.rootInstance as any;

      await openDropdown(page);
      expect(page.root.querySelectorAll('.tk-phone-input-menu-item')).toHaveLength(INTERNAL_COUNTRIES.length);

      instance.handleSearchChange({ target: { value: 'turk' } });
      await page.waitForChanges();
      const labelFiltered = Array.from(page.root.querySelectorAll('.tk-phone-input-menu-country-label')).map(el => el.textContent);
      expect(labelFiltered.length).toBeGreaterThan(0);
      expect(labelFiltered.length).toBeLessThan(INTERNAL_COUNTRIES.length);
      expect(labelFiltered).toContain('Turkey');
      labelFiltered.forEach(label => expect(label.toLowerCase()).toContain('turk'));

      instance.handleSearchChange({ target: { value: '+90' } });
      await page.waitForChanges();
      const dialFiltered = Array.from(page.root.querySelectorAll('.tk-phone-input-menu-country-label')).map(el => el.textContent);
      expect(dialFiltered).toContain('Turkey');

      instance.handleSearchChange({ target: { value: '' } });
      await page.waitForChanges();
      expect(page.root.querySelectorAll('.tk-phone-input-menu-item')).toHaveLength(INTERNAL_COUNTRIES.length);
    });

    it('closes the dropdown when clicking outside but not inside', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);

      await openDropdown(page);
      expect(getMenu(page)).not.toBeNull();

      (page.root.querySelector('.tk-phone-input-menu') as HTMLElement).click();
      await page.waitForChanges();
      expect(getMenu(page)).not.toBeNull();

      page.doc.body.click();
      await page.waitForChanges();
      expect(getMenu(page)).toBeNull();
    });

    it('closes the dropdown when the component becomes disabled', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);

      await openDropdown(page);
      expect(getMenu(page)).not.toBeNull();

      page.root.disabled = true;
      await page.waitForChanges();
      expect(getMenu(page)).toBeNull();
    });

    it('cleans up floating listeners on disconnect', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);
      const instance = page.rootInstance as any;

      await openDropdown(page);
      const cleanupFn = positionMock.mock.results[positionMock.mock.results.length - 1].value;

      instance.disconnectedCallback();
      expect(cleanupFn).toHaveBeenCalled();
      expect(instance.cleanup).toBeNull();
    });
  });

  describe('input masking', () => {
    it('masks the typed value and emits tk-change', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);
      const changeSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);
      const input = getInput(page);

      input.value = '5321234567';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      const detail = changeSpy.mock.calls[0][0].detail;
      expect(detail.rawValue).toBe('5321234567');
      expect(detail.maskedValue).toBe('(532) 123 4567');
      expect(detail.country.id).toBe('TR');
      expect(input.value).toBe('(532) 123 4567');
    });

    it('ignores input beyond the mask length and invalid characters', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);
      const changeSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);
      const input = getInput(page);

      input.value = '5321234567';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      expect(changeSpy).toHaveBeenCalledTimes(1);

      input.value = '53212345678';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(input.value).toBe('(532) 123 4567');

      input.value = '532abc';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(input.value).toBe('(532) 123 4567');
    });

    it('keeps the raw value when the selected country has no mask', async () => {
      const customCountries: ICountry[] = [{ label: 'Nowhere', id: 'NW' }];
      const page = await newSpecPage({
        components: [TkPhoneInput],
        template: () => <tk-phone-input countryList={customCountries} defaultCountry="NW"></tk-phone-input>,
      });
      const changeSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);

      expect(page.root.querySelector('.flag-none')).not.toBeNull();
      expect(page.root.querySelector('.tk-phone-input-dial-code')).toBeNull();
      expect(page.root.querySelector('.tk-phone-input-no-dial-code')).not.toBeNull();

      const input = getInput(page);
      input.value = '12345';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      const detail = changeSpy.mock.calls[0][0].detail;
      expect(detail.rawValue).toBe('12345');
      expect(detail.maskedValue).toBe('12345');
      expect(detail.country.id).toBe('NW');
    });
  });

  describe('focus and blur', () => {
    it('emits tk-focus and tk-blur and tracks focus state', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);
      const instance = page.rootInstance as any;
      const focusSpy = jest.fn();
      const blurSpy = jest.fn();
      page.root.addEventListener('tk-focus', focusSpy);
      page.root.addEventListener('tk-blur', blurSpy);
      const input = getInput(page);

      input.dispatchEvent(new Event('focus'));
      await page.waitForChanges();
      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(instance.hasFocus).toBe(true);

      input.dispatchEvent(new Event('blur'));
      await page.waitForChanges();
      expect(blurSpy).toHaveBeenCalledTimes(1);
      expect(instance.hasFocus).toBe(false);
    });
  });

  describe('value handling', () => {
    it('loads an initial value with country and applies the mask', async () => {
      const page = await newSpecPage({
        components: [TkPhoneInput],
        template: () => (
          <tk-phone-input value={{ rawValue: '5321234567', maskedValue: '', country: { id: 'TR', label: 'Turkey', dialCode: '+90', mask: '(999) 999 9999' } }}></tk-phone-input>
        ),
      });

      expect(getInput(page).value).toBe('(532) 123 4567');
      expect(page.root.querySelector('.tk-phone-input-dial-code')?.textContent).toBe('+90');
    });

    it('falls back to the default country when the initial value has no country', async () => {
      const page = await newSpecPage({
        components: [TkPhoneInput],
        template: () => <tk-phone-input defaultCountry="US" value={{ rawValue: '5051112233', maskedValue: '' }}></tk-phone-input>,
      });

      expect(getInput(page).value).toBe('(505) 111-2233');
      expect(page.root.querySelector('.tk-phone-input-dial-code')?.textContent).toBe('+1');
      expect((page.rootInstance as any).selectedCountry.id).toBe('US');
    });

    it('updates the country and mask when the value is set programmatically', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);

      page.root.value = { rawValue: '5051112233', maskedValue: '', country: { id: 'US' } };
      await page.waitForChanges();

      expect((page.rootInstance as any).inputValue).toBe('(505) 111-2233');
      expect(page.root.querySelector('.tk-phone-input-dial-code')?.textContent).toBe('+1');
    });

    it('clears the input value when raw and masked values are empty', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);
      const input = getInput(page);

      input.value = '5321234567';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      expect((page.rootInstance as any).inputValue).toBe('(532) 123 4567');

      page.root.value = { rawValue: '', maskedValue: '', country: { id: 'TR' } };
      await page.waitForChanges();
      expect((page.rootInstance as any).inputValue).toBe('');
    });

    it('resets the component when the value is set to an empty object', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);
      const changeSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);

      page.root.value = {};
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      const detail = changeSpy.mock.calls[0][0].detail;
      expect(detail.rawValue).toBe('');
      expect(detail.maskedValue).toBe('');
      expect(detail.country.id).toBe('TR');
    });

    it.each([null, undefined])('resets cleanly when the value is set to %s', async emptyValue => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);
      const changeSpy = jest.fn();
      const input = getInput(page);

      input.value = '5321234567';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      expect(input.value).toBe('(532) 123 4567');

      page.root.addEventListener('tk-change', changeSpy);
      page.root.value = emptyValue;
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      const detail = changeSpy.mock.calls[0][0].detail;
      expect(detail.rawValue).toBe('');
      expect(detail.maskedValue).toBe('');
      expect(detail.country.id).toBe('TR');
      expect(input.value).toBe('');
      expect(page.root.value).toEqual(detail);
    });

    it('resets state through formResetCallback', async () => {
      const page = await createPage(`<tk-phone-input></tk-phone-input>`);
      const changeSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);
      const input = getInput(page);

      input.value = '5321234567';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      expect(changeSpy).toHaveBeenCalledTimes(1);

      (page.rootInstance as any).formResetCallback();
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(2);
      const detail = changeSpy.mock.calls[1][0].detail;
      expect(detail.rawValue).toBe('');
      expect(input.value).toBe('');
    });
  });
});

describe('tk-phone-input edge cases', () => {
  beforeEach(() => {
    positionMock.mockClear();
  });

  const customCountries = (): ICountry[] => [
    { id: 'PH', label: 'Placeholder Land', dialCode: '+1', mask: '999 999', placeholder: 'type here' },
    { id: 'NM', label: 'No Mask', dialCode: '+2' },
    { id: 'ND', label: 'No Dial' },
    { id: 'LT', label: 'Letters', dialCode: '+3', mask: 'ABC' },
  ];

  it('keeps the current country when a value without a country id is set', async () => {
    const page = await createPage(`<tk-phone-input default-country="US"></tk-phone-input>`);

    page.root.value = { rawValue: '5051112233', maskedValue: '' };
    await page.waitForChanges();

    expect(getInput(page).value).toBe('(505) 111-2233');
    expect(page.root.querySelector('.tk-phone-input-dial-code')?.textContent).toBe('+1');
  });

  it('renders the label without an asterisk by default', async () => {
    const page = await createPage(`<tk-phone-input label="Phone"></tk-phone-input>`);
    const label = page.root.querySelector('.tk-phone-input-label');

    expect(label?.textContent).toBe('Phone');
    expect(label?.querySelector('.tk-phone-input-asterisk')).toBeNull();
  });

  it('prefers the country placeholder and leaves it empty for countries without a mask', async () => {
    const withPlaceholder = await newSpecPage({
      components: [TkPhoneInput],
      template: () => <tk-phone-input countryList={customCountries()} defaultCountry="PH" placeholder="ignored"></tk-phone-input>,
    });
    expect(getInput(withPlaceholder).getAttribute('placeholder')).toBe('type here');

    const withoutMask = await newSpecPage({
      components: [TkPhoneInput],
      template: () => <tk-phone-input countryList={customCountries()} defaultCountry="NM"></tk-phone-input>,
    });
    expect(getInput(withoutMask).getAttribute('placeholder')).toBeFalsy();
  });

  it('rejects every digit when the mask has no digit slots', async () => {
    const page = await newSpecPage({
      components: [TkPhoneInput],
      template: () => <tk-phone-input countryList={customCountries()} defaultCountry="LT"></tk-phone-input>,
    });
    const changeSpy = jest.fn();
    page.root.addEventListener('tk-change', changeSpy);
    const input = getInput(page);

    input.value = '1';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(changeSpy).not.toHaveBeenCalled();
    expect(input.value).toBe('');
  });

  it('matches countries without a dial code only by label while searching', async () => {
    const page = await newSpecPage({
      components: [TkPhoneInput],
      template: () => <tk-phone-input countryList={customCountries()} defaultCountry="PH"></tk-phone-input>,
    });
    const instance = page.rootInstance as any;
    await openDropdown(page);

    instance.handleSearchChange({ target: { value: 'no' } });
    await page.waitForChanges();
    const labels = Array.from(page.root.querySelectorAll('.tk-phone-input-menu-country-label')).map(el => el.textContent);
    expect(labels).toEqual(['No Mask', 'No Dial']);

    instance.handleSearchChange({ target: { value: '+2' } });
    await page.waitForChanges();
    expect(Array.from(page.root.querySelectorAll('.tk-phone-input-menu-country-label')).map(el => el.textContent)).toEqual(['No Mask']);
  });

  it('renders a close icon instead of a flag for countries without a dial code', async () => {
    const page = await newSpecPage({
      components: [TkPhoneInput],
      template: () => <tk-phone-input countryList={customCountries()} defaultCountry="PH"></tk-phone-input>,
    });
    await openDropdown(page);

    const items = Array.from(page.root.querySelectorAll('.tk-phone-input-menu-item'));
    const noDial = items.find(item => item.querySelector('.tk-phone-input-menu-country-label')?.textContent === 'No Dial');
    expect(noDial.querySelector('.flag-none tk-icon')).toBeTruthy();
    expect(noDial.querySelector('.tk-phone-input-menu-dial-id')).toBeNull();
    expect(items[0].querySelector('.flag-ph')).toBeTruthy();
    expect(items[0].hasAttribute('aria-selected')).toBe(true);
    expect(noDial.hasAttribute('aria-selected')).toBe(false);
  });

  it('hides flags everywhere when hideFlag is set', async () => {
    const page = await createPage(`<tk-phone-input hide-flag="true"></tk-phone-input>`);
    await openDropdown(page);

    expect(page.root.querySelector('.flag')).toBeNull();
  });

  it('keeps the dropdown open when the search input is clicked', async () => {
    const page = await createPage(`<tk-phone-input></tk-phone-input>`);
    await openDropdown(page);

    const searchInput = page.root.querySelector('.tk-phone-input-dropdown-menu-search') as HTMLElement;
    const event = new MouseEvent('click', { bubbles: true });
    const stopPropagation = jest.spyOn(event, 'stopPropagation');
    searchInput.dispatchEvent(event);
    await page.waitForChanges();

    expect(stopPropagation).toHaveBeenCalled();
    expect(getMenu(page)).not.toBeNull();
  });

  it('tolerates being removed before the dropdown was ever opened', async () => {
    const page = await createPage(`<tk-phone-input></tk-phone-input>`);
    const instance = page.rootInstance as any;

    page.root.readonly = true;
    await page.waitForChanges();
    expect(getMenu(page)).toBeNull();

    expect(() => instance.disconnectedCallback()).not.toThrow();
    expect(instance.cleanup).toBeNull();
    expect(positionMock).not.toHaveBeenCalled();
  });
});

describe('tk-phone-input aria state', () => {
  it('renders the container state flags as "true"/"false" strings', async () => {
    const flagged = await createPage(`<tk-phone-input disabled="true" invalid="true"></tk-phone-input>`);
    const flaggedContainer = flagged.root.querySelector('.tk-phone-input-container');
    expect(flaggedContainer.getAttribute('aria-disabled')).toBe('true');
    expect(flaggedContainer.getAttribute('aria-invalid')).toBe('true');
    expect(flaggedContainer.getAttribute('aria-readonly')).toBe('false');

    const plain = await createPage(`<tk-phone-input></tk-phone-input>`);
    const plainContainer = plain.root.querySelector('.tk-phone-input-container');
    expect(plainContainer.getAttribute('aria-disabled')).toBe('false');
    expect(plainContainer.getAttribute('aria-invalid')).toBe('false');
  });
});
