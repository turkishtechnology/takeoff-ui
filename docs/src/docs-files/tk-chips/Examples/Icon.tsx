import { IIconOptions, IMultiIconOptions } from '@takeoff-ui/core';
import { TkChips, TkDivider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Icon = () => {
  const reactCode = `<TkChips variant="primary" size="large" icon="flight" label="Left Icon" />
<TkChips variant="primary" size="large" icon="flight" label="Right Icon" iconPosition="right" />

<TkChips variant="primary" size="large" icon={{ name: 'home', color: 'red', fill: true } as IIconOptions} label="Left Icon" />
<TkChips variant="primary" size="large" icon={{ name: 'home', color: 'red', fill: true } as IIconOptions} label="Right Icon" iconPosition="right" />

<TkChips
  variant="primary"
  size="large"
  label="Multiple Icon"
  icon={
    {
      left: 'key',
      right: 'check_circle',
    } as IMultiIconOptions
  }
/>
<TkChips
  variant="primary"
  size="large"
  label="Multiple Icon"
  icon={
    {
      left: { name: 'key', color: 'var(--blue-500)' } as IIconOptions,
      right: { name: 'check_circle', color: 'var(--green-600)', fill: true } as IIconOptions,
    } as IMultiIconOptions
  }
/>`;

  const vueCode = `<TkChips variant="primary" size="large" icon="flight" label="Left Icon" />
<TkChips variant="primary" size="large" icon="flight" label="Right Icon" iconPosition="right" />

<TkChips
  variant="primary"
  size="large"
  :icon="{ name: 'home', color: 'red', fill: true }"
  label="Left Icon"
/>
<TkChips
  variant="primary"
  size="large"
  :icon="{ name: 'home', color: 'red', fill: true }"
  label="Right Icon"
  iconPosition="right"
/>

<TkChips
  variant="primary"
  size="large"
  label="Multiple Icon"
  :icon="{
    left: 'key',
    right: 'check_circle'
  }"
/>
<TkChips
  variant="primary"
  size="large"
  label="Multiple Icon"
  :icon="{
    left: { name: 'key', color: 'var(--blue-500)' },
    right: { name: 'check_circle', color: 'var(--green-600)', fill: true }
  }"
/>`;

  const angularCode = `<tk-chips variant="primary" size="large" icon="flight" label="Left Icon"></tk-chips>
<tk-chips variant="primary" size="large" icon="flight" label="Right Icon" iconPosition="right"></tk-chips>

<tk-chips
  variant="primary"
  size="large"
  [icon]="{ name: 'home', color: 'red', fill: true }"
  label="Left Icon"
></tk-chips>
<tk-chips
  variant="primary"
  size="large"
  [icon]="{ name: 'home', color: 'red', fill: true }"
  label="Right Icon"
  iconPosition="right"
></tk-chips>

<tk-chips
  variant="primary"
  size="large"
  label="Multiple Icon"
  [icon]="{
    left: 'key',
    right: 'check_circle'
  }"
></tk-chips>
<tk-chips
  variant="primary"
  size="large"
  label="Multiple Icon"
  [icon]="{
    left: { name: 'key', color: 'var(--blue-500)' },
    right: { name: 'check_circle', color: 'var(--green-600)', fill: true }
  }"
></tk-chips>`;

  const demo = (
    <div className="flex flex-col">
      <h4>String Usage - Single</h4>
      <div className="flex gap-2 flex-wrap">
        <TkChips variant="primary" size="large" icon="flight" label="Left Icon" />
        <TkChips variant="primary" size="large" icon="flight" label="Right Icon" iconPosition="right" />
      </div>
      <TkDivider />
      <h4>Icon Options Usage - Single</h4>
      <div className="flex gap-2 flex-wrap">
        <TkChips variant="primary" size="large" icon={{ name: 'home', color: 'red', fill: true } as IIconOptions} label="Left Icon" />
        <TkChips variant="primary" size="large" icon={{ name: 'home', color: 'red', fill: true } as IIconOptions} label="Right Icon" iconPosition="right" />
      </div>
      <TkDivider />
      <h4>String Icon Usage - Multiple</h4>
      <div className="flex gap-2 flex-wrap">
        <TkChips
          variant="primary"
          size="large"
          label="Multiple Icon"
          icon={
            {
              left: 'key',
              right: 'check_circle',
            } as IMultiIconOptions
          }
        />
      </div>
      <TkDivider />
      <h4>Icon Options Usage - Multiple</h4>
      <div className="flex gap-2 flex-wrap">
        <TkChips
          variant="primary"
          size="large"
          label="Multiple Icon"
          icon={
            {
              left: { name: 'key', color: 'var(--blue-500)' } as IIconOptions,
              right: { name: 'check_circle', color: 'var(--green-600)', fill: true } as IIconOptions,
            } as IMultiIconOptions
          }
        />
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Icon;
