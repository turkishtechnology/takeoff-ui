import { IIconOptions, IMultiIconOptions } from '@takeoff-ui/core';
import { TkDivider, TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Icon = () => {
  const reactCode = `<div className="flex flex-col">
  <h4>String Usage - Single</h4>
  <div className="flex gap-2">
    <TkInput label="Left Icon" icon="flight" />
    <TkInput label="Right Icon" icon="flight" iconPosition="right" />
  </div>
  <TkDivider />
  <h4>Icon Options Usage - Single</h4>
  <div className="flex gap-2">
    <TkInput label="Left Icon" icon={{ name: 'home', color: 'red', fill: true } as IIconOptions} iconPosition="left" />
    <TkInput label="Right Icon" icon={{ name: 'home', color: 'red', fill: true } as IIconOptions} iconPosition="right" />
  </div>
  <TkDivider />
  <h4>String Icon Usage - Multiple</h4>
  <div className="flex gap-2">
    <TkInput
      label="Multiple Icon"
      icon={
        {
          left: 'key',
          right: 'check_circle',
        } as IMultiIconOptions
      }
      iconPosition="left"
    />
  </div>
  <TkDivider />
  <h4>Icon Options Usage - Multiple</h4>
  <div className="flex gap-2">
    <TkInput
      label="Multiple Icon"
      icon={
        {
          left: { name: 'key', color: 'var(--blue-500)' } as IIconOptions,
          right: { name: 'check_circle', color: 'var(--green-600', fill: true } as IIconOptions,
        } as IMultiIconOptions
      }
      iconPosition="left"
    />
  </div>
</div>`;

  const vueCode = `<div class="flex flex-col">
  <h4>String Usage - Single</h4>
  <div class="flex gap-2">
    <TkInput label="Left Icon" icon="flight" />
    <TkInput label="Right Icon" icon="flight" iconPosition="right" />
  </div>
  <TkDivider />
  <h4>Icon Options Usage - Single</h4>
  <div class="flex gap-2">
    <TkInput 
      label="Left Icon" 
      :icon="{ name: 'home', color: 'red', fill: true }" 
      iconPosition="left" 
    />
    <TkInput 
      label="Right Icon" 
      :icon="{ name: 'home', color: 'red', fill: true }" 
      iconPosition="right" 
    />
  </div>
  <TkDivider />
  <h4>String Icon Usage - Multiple</h4>
  <div class="flex gap-2">
    <TkInput
      label="Multiple Icon"
      :icon="{
        left: 'key',
        right: 'check_circle'
      }"
      iconPosition="left"
    />
  </div>
  <TkDivider />
  <h4>Icon Options Usage - Multiple</h4>
  <div class="flex gap-2">
    <TkInput
      label="Multiple Icon"
      :icon="{
        left: { name: 'key', color: 'var(--blue-500)' },
        right: { name: 'check_circle', color: 'var(--green-600)', fill: true }
      }"
      iconPosition="left"
    />
  </div>
</div>`;

  const demo = (
    <div className="flex flex-col">
      <h4>String Usage - Single</h4>
      <div className="flex gap-2">
        <TkInput label="Left Icon" icon="flight" />
        <TkInput label="Right Icon" icon="flight" iconPosition="right" />
      </div>
      <TkDivider />
      <h4>Icon Options Usage - Single</h4>
      <div className="flex gap-2">
        <TkInput label="Left Icon" icon={{ name: 'home', color: 'red', fill: true } as IIconOptions} iconPosition="left" />
        <TkInput label="Right Icon" icon={{ name: 'home', color: 'red', fill: true } as IIconOptions} iconPosition="right" />
      </div>
      <TkDivider />
      <h4>String Icon Usage - Multiple</h4>
      <div className="flex gap-2">
        <TkInput
          label="Multiple Icon"
          icon={
            {
              left: 'key',
              right: 'check_circle',
            } as IMultiIconOptions
          }
          iconPosition="left"
        />
      </div>
      <TkDivider />
      <h4>Icon Options Usage - Multiple</h4>
      <div className="flex gap-2">
        <TkInput
          label="Multiple Icon"
          icon={
            {
              left: { name: 'key', color: 'var(--blue-500)' } as IIconOptions,
              right: { name: 'check_circle', color: 'var(--green-600', fill: true } as IIconOptions,
            } as IMultiIconOptions
          }
          iconPosition="left"
        />
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Icon;
