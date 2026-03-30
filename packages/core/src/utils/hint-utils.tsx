import type { JSX } from '@stencil/core';
import { getIconElementProps } from './icon-utils';
import classNames from 'classnames';

/**
 * Utility to render hint or error message with icon.
 * @param params - ( hint?: string, error?: string, invalid?: boolean )
 * @returns JSX.Element| null
 */
export function renderHint(hint?: string, error?: string, invalid?: boolean): JSX.Element | null {
  const isError = error && error.length > 0;
  const isHint = hint && hint.length > 0;
  if (!isError && !isHint) {
    return null;
  }
  const icon = isError || invalid ? 'error' : 'info';

  return (
    <div class={classNames('tk-hint-wrapper', { invalid: invalid, error: isError })}>
      <tk-icon {...getIconElementProps(icon, { color: isError || invalid ? 'var(--states-danger-base)' : 'var(--icon-base)', size: 'small' })} />
      <span>{isError ? error : hint}</span>
    </div>
  );
}
