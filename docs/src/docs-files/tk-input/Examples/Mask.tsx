import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Mask = () => {
  const reactCode = `<TkInput
  label="Date Mask"
  placeholder="dd.mm.YYYY"
  maskOptions={{
    date: true,
    delimiter: ".",
    datePattern: ["d", "m", "Y"],
  }}
  value={value}
  onTkChange={(e) => setValue(e.detail)}
/>
<TkInput
  label="Expire Date"
  placeholder="mm/yy"
  maskOptions={{
    date: true,
    datePattern: ["m", "y"],
  }}
  value={value1}
  onTkChange={(e) => setValue1(e.detail)}
/>
<TkInput
  label="Time Formatting"
  placeholder="hh:mm"
  maskOptions={{
    time: true,
    timePattern: ["h", "m"],
  }}
  value={value2}
  onTkChange={(e) => setValue2(e.detail)}
/>
<TkInput
  label="Credit Card"
  placeholder="hh:mm"
  maskOptions={{
    blocks: [4, 4, 4, 4],
    numericOnly: true,
  }}
  value={value3}
  onTkChange={(e) => setValue3(e.detail)}
/>

<TkInput
  label="Letter Only"
  placeholder="xxxxxxxxxx"
  maskOptions={{
    blocks: [40],
    letterOnly: true,
  }}
  value={value4}
  onTkChange={(e) => {
    setValue4(e.detail);
  }}
/>`;

  const vueCode = `<script setup>
import { TkInput } from '@takeoff-ui/vue';

const value = ref();
const value1 = ref();
const value2 = ref();
const value3 = ref();
const value4 = ref();
</script>

<template>
  <div>
    <TkInput
      label="Date Mask"
      placeholder="dd.mm.YYYY"
      :maskOptions.prop="{
        date: true,
        delimiter: '.',
        datePattern: ['d', 'm', 'Y'],
      }"
      v-model="value"
    />
    <TkInput
      label="Expire Date"
      placeholder="mm/yy"
      :maskOptions.prop="{
        date: true,
        datePattern: ['m', 'y'],
      }"
      v-model="value1"
    />
    <TkInput
      label="Time Formatting"
      placeholder="hh:mm"
      :maskOptions.prop="{
        time: true,
        timePattern: ['h', 'm'],
      }"
      v-model="value2"
    />
    <TkInput
      label="Credit Card"
      placeholder="xxxx xxxx xxxx xxxx"
      :maskOptions.prop="{
        blocks: [4, 4, 4, 4],
        numericOnly: true,
      }"
      v-model="value3"
    />
    <TkInput
      label="Letter Only"
      placeholder="xxxxxxxxxx"
      :maskOptions.prop="{
        blocks: [40],
        letterOnly: true,
      }"
      v-model="value4"
    />
  </div>
</template>
`;

  const [value, setValue] = useState();
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [value4, setValue4] = useState();
  const demo = (
    <div className="flex flex-col gap-2 w-[300px]">
      <TkInput
        label="Date Mask"
        placeholder="dd.mm.YYYY"
        maskOptions={{
          date: true,
          delimiter: '.',
          datePattern: ['d', 'm', 'Y'],
        }}
        value={value}
        onTkChange={(e) => setValue(e.detail)}
      />

      <TkInput
        label="Expire Date"
        placeholder="mm/yy"
        maskOptions={{
          date: true,
          datePattern: ['m', 'y'],
        }}
        value={value1}
        onTkChange={(e) => setValue1(e.detail)}
      />

      <TkInput
        label="Time Formatting"
        placeholder="hh:mm"
        maskOptions={{
          time: true,
          timePattern: ['h', 'm'],
        }}
        value={value2}
        onTkChange={(e) => setValue2(e.detail)}
      />

      <TkInput
        label="Credit Card"
        placeholder="xxxx xxxx xxxx xxxx"
        maskOptions={{
          blocks: [4, 4, 4, 4],
          numericOnly: true,
        }}
        value={value3}
        onTkChange={(e) => setValue3(e.detail)}
      />

      <TkInput
        label="Letter Only"
        placeholder="xxxxxxxxxx"
        maskOptions={{
          blocks: [40],
          letterOnly: true,
        }}
        value={value4}
        onTkChange={(e) => {
          setValue4(e.detail);
        }}
      />
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default Mask;
