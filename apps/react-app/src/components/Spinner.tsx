import { TkSpinner } from '@takeoff-ui/react';
import { useState } from 'react';

function Spinner() {
  return (
    <div>
      <TkSpinner />

      <TkSpinner type="three-dots" label="Loading..." />

      <TkSpinner size="xlarge" type="rounded" label="XL" />
      <TkSpinner size="large" type="rounded" label="L" />
      <TkSpinner size="base" type="rounded" label="M" />
      <TkSpinner size="small" type="rounded" label="S" />

      <TkSpinner type="dots" />

      <TkSpinner orientation="horizontal" label="Horizontal" />
      <TkSpinner orientation="vertical" label="Vertical" />
    </div>
  );
}

export default Spinner;
