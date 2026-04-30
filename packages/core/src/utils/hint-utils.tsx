import { h } from '@stencil/core';
import { getIconElementProps } from './icon-utils';
import classNames from 'classnames';
import { getDataTestId } from './test-id-utils';

/**
 * Utility to render hint or error message with icon.
 * @param params - ( hint?: string, error?: string, invalid?: boolean, dataTestid?: string, componentTag?: string )
 * @returns JSX.Element| null
 */
export function renderHint(hint?: string, error?: string, invalid?: boolean, dataTestid?: string): HTMLDivElement | null {
  const isError = error && error.length > 0;
  const isHint = hint && hint.length > 0;
  if (!isError && !isHint) {
    return null;
  }
  const icon = isError || invalid ? 'error' : 'info';
  const wrapperTestId = getDataTestId(dataTestid, isError ? 'error' : 'hint');
  const iconTestId = getDataTestId(dataTestid, isError ? 'error-icon' : 'hint-icon');
  const textTestId = getDataTestId(dataTestid, isError ? 'error-text' : 'hint-text');

  return (
    <div class={classNames('tk-hint-wrapper', { invalid: invalid, error: isError })} data-testid={wrapperTestId}>
      <tk-icon dataTestid={iconTestId} {...getIconElementProps(icon, { color: isError || invalid ? 'var(--states-danger-base)' : 'var(--icon-base)', size: 'small' })} />
      <span data-testid={textTestId}>{isError ? error : hint}</span>
    </div>
  );
}
