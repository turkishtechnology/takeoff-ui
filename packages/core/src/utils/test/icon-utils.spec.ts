import { getIconElementProps, isMultiIconOptions, renderIcons } from '../icon-utils';
import { IIconOptions } from '../../global/interfaces/IIconOptions';

const getAttrs = (vnode: any): Record<string, any> => vnode.$attrs$;
const getTag = (vnode: any): string => vnode.$tag$;

describe('icon-utils', () => {
  describe('getIconElementProps', () => {
    it('returns null for null, undefined, or empty icon', () => {
      expect(getIconElementProps(null)).toBeNull();
      expect(getIconElementProps(undefined)).toBeNull();
      expect(getIconElementProps('')).toBeNull();
    });

    it('builds default props for a string icon', () => {
      expect(getIconElementProps('home')).toEqual({
        icon: 'home',
        iconType: 'outlined',
        iconTag: 'i',
      });
    });

    it('merges base props and honors custom iconStyle and iconTag for a string icon', () => {
      const result = getIconElementProps('home', { color: 'red' }, 'rounded', 'span');

      expect(result).toEqual({
        icon: 'home',
        iconType: 'rounded',
        iconTag: 'span',
        color: 'red',
      });
    });

    it('maps an IIconOptions object and strips style and name keys', () => {
      const click = jest.fn();
      const icon: IIconOptions = { name: 'star', style: 'sharp', color: 'blue', fill: true, sign: true, click };

      const result = getIconElementProps(icon);

      expect(result.icon).toBe('star');
      expect(result.iconType).toBe('sharp');
      expect(result.color).toBe('blue');
      expect(result.fill).toBe(true);
      expect(result.sign).toBe(true);
      expect(result.onClick).toBe(click);
      expect(result).not.toHaveProperty('style');
      expect(result).not.toHaveProperty('name');
    });

    it('falls back to props.iconType when the icon object has no style', () => {
      const result = getIconElementProps({ name: 'star' }, { iconType: 'rounded' });

      expect(result.iconType).toBe('rounded');
    });

    it('falls back to the iconStyle argument when neither icon.style nor props.iconType is set', () => {
      const result = getIconElementProps({ name: 'star' }, {}, 'sharp');

      expect(result.iconType).toBe('sharp');
    });

    it('prefers props.iconTag over the iconTag argument for object icons', () => {
      const result = getIconElementProps({ name: 'star' }, { iconTag: 'span' }, 'outlined', 'i');

      expect(result.iconTag).toBe('span');
    });

    it('falls back to props.color when the icon object has no color', () => {
      const result = getIconElementProps({ name: 'star' }, { color: 'green' });

      expect(result.color).toBe('green');
    });

    it('prefers an explicit icon.fill of false over props.fill', () => {
      const result = getIconElementProps({ name: 'star', fill: false }, { fill: true });

      expect(result.fill).toBe(false);
    });

    it('falls back to props.fill when icon.fill is undefined', () => {
      const result = getIconElementProps({ name: 'star' }, { fill: true });

      expect(result.fill).toBe(true);
    });

    it('does not add onClick when the icon object has no click handler', () => {
      const result = getIconElementProps({ name: 'star' });

      expect(result).not.toHaveProperty('onClick');
    });
  });

  describe('isMultiIconOptions', () => {
    it('returns falsy for null and undefined', () => {
      expect(isMultiIconOptions(null)).toBeFalsy();
      expect(isMultiIconOptions(undefined)).toBeFalsy();
    });

    it('returns false for a string', () => {
      expect(isMultiIconOptions('home')).toBe(false);
    });

    it('returns false for an IIconOptions object', () => {
      expect(isMultiIconOptions({ name: 'home' })).toBe(false);
    });

    it('returns false for an empty object', () => {
      expect(isMultiIconOptions({})).toBe(false);
    });

    it('returns true when the object has a left icon', () => {
      expect(isMultiIconOptions({ left: 'home' })).toBe(true);
    });

    it('returns true when the object has a right icon', () => {
      expect(isMultiIconOptions({ right: { name: 'home' } })).toBe(true);
    });
  });

  describe('renderIcons', () => {
    it('returns empty results when no icon is provided', () => {
      expect(renderIcons(undefined)).toEqual({ leftIcon: undefined, rightIcon: undefined });
      expect(renderIcons('')).toEqual({ leftIcon: undefined, rightIcon: undefined });
    });

    it('renders a single string icon on the left by default', () => {
      const { leftIcon, rightIcon } = renderIcons('home');

      expect(rightIcon).toBeUndefined();
      expect(getTag(leftIcon)).toBe('tk-icon');
      expect(getAttrs(leftIcon).icon).toBe('home');
      expect(getAttrs(leftIcon).size).toBe('base');
      expect(getAttrs(leftIcon).sign).toBe(false);
      expect(getAttrs(leftIcon).fill).toBe(false);
      expect(getAttrs(leftIcon).iconType).toBe('outlined');
      expect(getAttrs(leftIcon).iconTag).toBe('i');
      expect(getAttrs(leftIcon)['data-testid']).toBeUndefined();
    });

    it('renders a single icon on the right when position is right', () => {
      const { leftIcon, rightIcon } = renderIcons('home', {}, 'right');

      expect(leftIcon).toBeUndefined();
      expect(getAttrs(rightIcon).icon).toBe('home');
    });

    it('passes rendering options through to the icon props', () => {
      const { leftIcon } = renderIcons(
        { name: 'star' },
        {
          variant: 'primary',
          sign: true,
          size: 'large',
          fill: true,
          iconStyle: 'rounded',
          iconTag: 'span',
          additionalProps: { class: 'extra' },
          dataTestid: 'field',
        },
      );

      const attrs = getAttrs(leftIcon);
      expect(attrs.icon).toBe('star');
      expect(attrs.variant).toBe('primary');
      expect(attrs.sign).toBe(true);
      expect(attrs.size).toBe('large');
      expect(attrs.fill).toBe(true);
      expect(attrs.iconType).toBe('rounded');
      expect(attrs.iconTag).toBe('span');
      expect(attrs.class).toBe('extra');
      expect(attrs['data-testid']).toBe('field-left-icon');
    });

    it('suffixes the data-testid with the position for single icons', () => {
      const { rightIcon } = renderIcons('home', { dataTestid: 'field' }, 'right');

      expect(getAttrs(rightIcon)['data-testid']).toBe('field-right-icon');
    });

    it('renders both icons for a multi-icon configuration', () => {
      const { leftIcon, rightIcon } = renderIcons({ left: 'arrow_back', right: { name: 'arrow_forward', color: 'red' } }, { dataTestid: 'nav' });

      expect(getAttrs(leftIcon).icon).toBe('arrow_back');
      expect(getAttrs(leftIcon)['data-testid']).toBe('nav-left-icon');
      expect(getAttrs(rightIcon).icon).toBe('arrow_forward');
      expect(getAttrs(rightIcon).color).toBe('red');
      expect(getAttrs(rightIcon)['data-testid']).toBe('nav-right-icon');
    });

    it('renders only the left icon when the multi config has no right icon', () => {
      const { leftIcon, rightIcon } = renderIcons({ left: 'home' });

      expect(leftIcon).toBeDefined();
      expect(rightIcon).toBeUndefined();
    });

    it('renders only the right icon when the multi config has no left icon', () => {
      const { leftIcon, rightIcon } = renderIcons({ right: 'home' });

      expect(leftIcon).toBeUndefined();
      expect(rightIcon).toBeDefined();
    });

    it('returns neither icon for a single icon with an unsupported position', () => {
      const { leftIcon, rightIcon } = renderIcons('home', {}, 'both' as any);

      expect(leftIcon).toBeUndefined();
      expect(rightIcon).toBeUndefined();
    });
  });
});
