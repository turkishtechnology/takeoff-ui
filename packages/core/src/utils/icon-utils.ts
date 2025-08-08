import { IIconOptions, IMultiIconOptions } from '../global/interfaces/IIconOptions';
import { h } from '@stencil/core';
export interface IconRendererOptions {
  variant?: string;
  sign?: boolean;
  size?: string;
  fill?: boolean;
  iconStyle?: 'outlined' | 'rounded' | 'sharp';
  iconTag?: 'i' | 'span';
  additionalProps?: Record<string, any>;
}

export interface IconRendererResult {
  leftIcon?: any;
  rightIcon?: any;
}
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

/**
 * Renders icons based on the provided icon configuration
 * @param icon - The icon configuration (string, IIconOptions, or IMultiIconOptions)
 * @param options - Rendering options
 * @param position - Where to place the icon ('left', 'right', or 'both' for multi-icons)
 * @returns Object containing leftIcon and rightIcon elements
 */
export const renderIcons = (
  icon: string | IIconOptions | IMultiIconOptions | undefined,
  options: IconRendererOptions = {},
  position: 'left' | 'right' = 'left',
): IconRendererResult => {
  const { variant, sign = false, size = 'base', iconStyle = 'outlined', iconTag = 'i', additionalProps = {} } = options;

  let leftIcon: any;
  let rightIcon: any;

  if (!icon) {
    return { leftIcon, rightIcon };
  }

  if (isMultiIconOptions(icon)) {
    const leftIconConfig = (icon as IMultiIconOptions).left;
    const rightIconConfig = (icon as IMultiIconOptions).right;

    if (leftIconConfig) {
      leftIcon = h('tk-icon', {
        ...getIconElementProps(leftIconConfig, { variant, sign, size, ...additionalProps }, iconStyle, iconTag),
      });
    }

    if (rightIconConfig) {
      rightIcon = h('tk-icon', {
        ...getIconElementProps(rightIconConfig, { variant, sign, size, ...additionalProps }, iconStyle, iconTag),
      });
    }
  } else {
    // Single icon with position control
    const iconElement = h('tk-icon', {
      ...getIconElementProps(icon as string | IIconOptions, { variant, sign, size, ...additionalProps }, iconStyle, iconTag),
    });

    if (position === 'left') {
      leftIcon = iconElement;
    } else if (position === 'right') {
      rightIcon = iconElement;
    }
  }

  return { leftIcon, rightIcon };
};
