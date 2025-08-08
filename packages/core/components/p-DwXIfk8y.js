/**
 * Generates the properties object for a tk-icon element based on Material Symbols.
 *
 * @param icon - The icon definition, either a string (icon name) or an IIconOptions object.
 * @param props - Additional base properties to merge.
 * @param iconStyle - The style for the icon ('outlined', 'rounded', 'sharp').
 * @param iconTag - The tag for the icon ('i' or 'span'). Defaults to 'i'.
 * @returns The properties object for the tk-icon element, or null if no icon is provided.
 */
const getIconElementProps = (icon, props = {}, iconStyle = 'outlined', iconTag = 'i') => {
  if (!icon) return null;
  let mergedProps = Object.assign({ iconType: iconStyle, iconTag }, props);
  if (typeof icon === 'string') {
    mergedProps.icon = icon;
  } else {
    mergedProps = Object.assign(Object.assign(Object.assign({}, icon), mergedProps), {
      icon: icon.name,
      iconType: props.iconType || icon.style || iconStyle,
      color: props.color || icon.color,
      fill: props.fill !== undefined ? props.fill : icon.fill,
    });
    mergedProps === null || mergedProps === void 0 ? true : delete mergedProps.style;
    mergedProps === null || mergedProps === void 0 ? true : delete mergedProps.name;
  }
  return mergedProps;
};

export { getIconElementProps as g };
//# sourceMappingURL=p-DwXIfk8y.js.map

//# sourceMappingURL=p-DwXIfk8y.js.map
