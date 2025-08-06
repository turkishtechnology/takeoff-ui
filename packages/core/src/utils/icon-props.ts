import { IIconOptions, IMultiIconOptions } from '../global/interfaces/IIconOptions';

/**
 * Generates the properties object for a tk-icon element based on Material Symbols.
 *
 * @param icon - The icon definition, either a string (icon name) or an IIconOptions object.
 * @param props - Additional base properties to merge.
 * @param iconStyle - The style for the icon ('outlined', 'rounded', 'sharp').
 * @param iconTag - The tag for the icon ('i' or 'span'). Defaults to 'i'.
 * @returns The properties object for the tk-icon element, or null if no icon is provided.
 */
export const getIconElementProps = (
  icon: string | IIconOptions | undefined | null,
  props: Record<string, any> = {},
  iconStyle: 'outlined' | 'rounded' | 'sharp' = 'outlined',
  iconTag: 'i' | 'span' = 'i',
): Record<string, any> | null => {
  if (!icon) return null;

  let mergedProps: Record<string, any> = {
    iconType: iconStyle,
    iconTag,
    ...props,
  };

  if (typeof icon === 'string') {
    mergedProps.icon = icon;
  } else {
    mergedProps = {
      ...icon,
      ...mergedProps,
      icon: icon.name,
      iconType: props.iconType || icon.style || iconStyle,
      color: props.color || icon.color,
      fill: props.fill !== undefined ? props.fill : icon.fill,
    };

    delete mergedProps?.style;
    delete mergedProps?.name;
  }

  return mergedProps;
};

export const isMultiIconOptions = (icon: any): icon is IMultiIconOptions => {
  return icon && typeof icon === 'object' && ('left' in icon || 'right' in icon) && !('name' in icon);
};
