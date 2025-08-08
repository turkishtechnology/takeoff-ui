import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Example = () => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const options = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
  ];

  const fetchData = async (text: string) => {
    return new Promise(resolve => {
      setTimeout(() => {
        let response;
        response = options.filter(item => item.label?.toLowerCase().indexOf(text?.toLowerCase()) > -1);

        resolve(response);
      }, 2000);
    });
  };

  return (
    <div className="max-w-[215px]">
      <TkSelect
        editable
        label="Loading Prop"
        loading={loading}
        options={options}
        filter={async (text: string) => {
          setLoading(true);
          const response = await fetchData(text);
          setLoading(false);
          return response;
        }}
        value={value}
        onTkChange={e => {
          setValue(e.detail);
        }}
      />
    </div>
  );
};

const Loading = () => {
  const reactCode = `const selectOptions = [
    { value: "female", label: "Female"},
    { value: "male", label: "Male"},
    { value: "other", label: "Other"},
  ];

  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
   
  const fetchData = async (text: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let response;
        response = options.filter(
          (item) => item.label?.toLowerCase().indexOf(text?.toLowerCase()) > -1
        );

        resolve(response);
      }, 2000);
    });
  };

  return (
    <div>
      <TkSelect
        editable
        label="Loading Prop"
        loading={loading}
        options={selectOptions}
        filter={async (text: string, selectOptions: any[]) => {
          setLoading(true);
          const response = await fetchData(text);
          setLoading(false);
          return response;
        }}
        value={value}
        onTkChange={(e) => {
          setValue(e.detail);
        }}
      />
    </div>
  );`;

  const vueCode = `<script setup>
import { TkSelect } from '@takeoff-ui/vue';
import { ref } from "vue"

const selectOptions = [
  { value: 'female', label: 'Female'},
  { value: 'male', label: 'Male'},
  { value: 'other', label: 'Other'},
];
 
const fetchData = async (text) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let response;
      response = selectOptions.filter(
        (item) => item.label?.toLowerCase().indexOf(text?.toLowerCase()) > -1
      );
      resolve(response);
    }, 2000);
  });
};
const loading= ref(false)
</script>

<template>
  <div>
    <TkSelect
      editable
      label="Loading Prop"
      :loading="loading"
      :options.prop="selectOptions"
      :filter.prop="async (text) => {
        loading=!loading
        const response = await fetchData(text);
        loading=!loading
        return response;
      }"
      :value.prop="value"
    />
  </div>
</template>
`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Loading;
