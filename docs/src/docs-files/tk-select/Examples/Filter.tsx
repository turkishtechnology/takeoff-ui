import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Example = () => {
  const selectOptions = [
    { value: 'female', label: 'Female', searchField: 'XX' },
    { value: 'male', label: 'Male', searchField: 'XY' },
    { value: 'other', label: 'Other', searchField: '00' },
  ];
  const [value, setValue] = useState();
  const [value1, setValue1] = useState();

  return (
    <div className="max-w-[215px]">
      <TkSelect editable label="Default Filter" options={selectOptions} value={value} onTkChange={e => setValue(e.detail)} />
      <br />
      <TkSelect
        editable
        label="Custom Filter Method"
        options={selectOptions}
        filter={async (text: string, options: any[]) => {
          return options.filter(item => item.searchField.toLowerCase().indexOf(text.toLowerCase()) > -1);
        }}
        value={value1}
        onTkChange={e => setValue1(e.detail)}
      />
    </div>
  );
};

const Filter = () => {
  const reactCode = `const selectOptions = [
    { value: "female", label: "Female", searchField: "XX" },
    { value: "male", label: "Male", searchField: "XY" },
    { value: "other", label: "Other", searchField: "00" },
  ];

  const [value, setValue] = useState();
  const [value1, setValue1] = useState();
    
  return (
    <div>
      <TkSelect
        editable
        label="Default Filter"
        options={selectOptions}
        value={value}
        onTkChange={(e) => setValue(e.detail)}
      />
      <br />
      <TkSelect
        editable
        label="Custom Filter Function"
        options={selectOptions}
        filter={async (text: string, options: any[]) => {
          return options.filter(
            (item) =>
              item.searchField.toLowerCase().indexOf(text.toLowerCase()) > -1
          );
        }}
        value={value1}
        onTkChange={(e) => setValue1(e.detail)}
      />
    </div>
  );`;

  const vueCode = `<script setup>
import { TkSelect } from '@takeoff-ui/vue';

const selectOptions = [
  { value: 'female', label: 'Female', searchField: 'XX' },
  { value: 'male', label: 'Male', searchField: 'XY' },
  { value: 'other', label: 'Other', searchField: '00' },
];
</script>

<template>
  <div>
  <TkSelect
      editable
      label="Default Filter"
      :options.prop="selectOptions"
    />
    <TkSelect
      editable
      label="Custom Filter Function"
      :options.prop="selectOptions"
      filter="async (text: string, options: any[]) => {
        return options.filter(
          (item) =>
            item.searchField.toLowerCase().indexOf(text.toLowerCase()) > -1
        );
      }"
    />
  </div>
</template>
`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Filter;
