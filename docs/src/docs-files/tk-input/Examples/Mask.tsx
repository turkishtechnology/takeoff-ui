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

<TkInput
  label="Custom Regex (PNR Code)"
  placeholder="ABC123"
  maskOptions={{
    regex: /[A-Z0-9]/,
    blocks: [6],
  }}
  value={value5}
  onTkChange={(e) => {
    setValue5(e.detail);
  }}
/>

<TkInput
  label="Numeral"
  placeholder="1.234.567,89"
  maskOptions={{
    numeral: true,
    delimiter: '.',
    numeralDecimalMark: ',',
   
  }}
  value={value6}
  onTkChange={(e) => {
    setValue6(e.detail);
  }}
/>`;

  const vueCode = `<script setup>
import { TkInput } from '@takeoff-ui/vue';

const value = ref();
const value1 = ref();
const value2 = ref();
const value3 = ref();
const value4 = ref();
const value5 = ref();
const value6 = ref();
</script>

<template>
  <div>
    <TkInput
      label="Date Mask"
      placeholder="dd.mm.YYYY"
      :maskOptions="{
        date: true,
        delimiter: '.',
        datePattern: ['d', 'm', 'Y'],
      }"
      v-model="value"
    />
    <TkInput
      label="Expire Date"
      placeholder="mm/yy"
      :maskOptions="{
        date: true,
        datePattern: ['m', 'y'],
      }"
      v-model="value1"
    />
    <TkInput
      label="Time Formatting"
      placeholder="hh:mm"
      :maskOptions="{
        time: true,
        timePattern: ['h', 'm'],
      }"
      v-model="value2"
    />
    <TkInput
      label="Credit Card"
      placeholder="xxxx xxxx xxxx xxxx"
      :maskOptions="{
        blocks: [4, 4, 4, 4],
        numericOnly: true,
      }"
      v-model="value3"
    />
    <TkInput
      label="Letter Only"
      placeholder="xxxxxxxxxx"
      :maskOptions="{
        blocks: [40],
        letterOnly: true,
      }"
      v-model="value4"
    />
    <TkInput
      label="Custom Regex (PNR Code)"
      placeholder="ABC123"
      :maskOptions.prop="{
        regex: /[A-Z0-9]/,
        blocks: [6],
      }"
      v-model="value5"
    />
    <TkInput
      label="Numeral"
      placeholder="1.234.567,89"
      :maskOptions="{
        numeral: true,
        delimiter: '.',
        numeralDecimalMark: ',',
       
      }"
      v-model="value6"
    />
  </div>
</template>
`;

  const angularCode = `<tk-input
  label="Date Mask"
  placeholder="dd.mm.YYYY"
  [maskOptions]="{
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y'],
  }"
  [(ngModel)]="value"
></tk-input>
<tk-input
  label="Expire Date"
  placeholder="mm/yy"
  [maskOptions]="{
    date: true,
    datePattern: ['m', 'y'],
  }"
  [(ngModel)]="value1"
></tk-input>
<tk-input
  label="Time Formatting"
  placeholder="hh:mm"
  [maskOptions]="{
    time: true,
    timePattern: ['h', 'm'],
  }"
  [(ngModel)]="value2"
></tk-input>
<tk-input
  label="Credit Card"
  placeholder="xxxx xxxx xxxx xxxx"
  [maskOptions]="{
    blocks: [4, 4, 4, 4],
    numericOnly: true,
  }"
  [(ngModel)]="value3"
></tk-input>
<tk-input
  label="Letter Only"
  placeholder="xxxxxxxxxx"
  [maskOptions]="{
    blocks: [40],
    letterOnly: true,
  }"
  [(ngModel)]="value4"
></tk-input>
<tk-input
  label="Custom Regex (PNR Code)"
  placeholder="ABC123"
  [maskOptions]="{
    regex: /[A-Z0-9]/,
    blocks: [6],
  }"
  [(ngModel)]="value5"
></tk-input>
<tk-input
  label="Numeral"
  placeholder="1.234.567,89"
  [maskOptions]="{
    numeral: true,
    delimiter: '.',
    numeralDecimalMark: ',',
   
  }"
  [(ngModel)]="value6"
></tk-input>`;

  const [value, setValue] = useState();
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [value4, setValue4] = useState();
  const [value5, setValue5] = useState();
  const [value6, setValue6] = useState();
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
        onTkChange={e => setValue(e.detail)}
      />

      <TkInput
        label="Expire Date"
        placeholder="mm/yy"
        maskOptions={{
          date: true,
          datePattern: ['m', 'y'],
        }}
        value={value1}
        onTkChange={e => setValue1(e.detail)}
      />

      <TkInput
        label="Time Formatting"
        placeholder="hh:mm"
        maskOptions={{
          time: true,
          timePattern: ['h', 'm'],
        }}
        value={value2}
        onTkChange={e => setValue2(e.detail)}
      />

      <TkInput
        label="Credit Card"
        placeholder="xxxx xxxx xxxx xxxx"
        maskOptions={{
          blocks: [4, 4, 4, 4],
          numericOnly: true,
        }}
        value={value3}
        onTkChange={e => setValue3(e.detail)}
      />

      <TkInput
        label="Letter Only"
        placeholder="xxxxxxxxxx"
        maskOptions={{
          blocks: [40],
          letterOnly: true,
        }}
        value={value4}
        onTkChange={e => {
          setValue4(e.detail);
        }}
      />

      <TkInput
        label="Custom Regex (PNR Code)"
        placeholder="ABC123"
        maskOptions={{
          regex: /[A-Z0-9]/,
          blocks: [6],
        }}
        value={value5}
        onTkChange={e => {
          setValue5(e.detail);
        }}
      />

      <TkInput
        label="Numeral"
        placeholder="1.234.567,89"
        maskOptions={{
          numeral: true,
          delimiter: '.',
          numeralDecimalMark: ',',
        }}
        value={value6}
        onTkChange={e => {
          setValue6(e.detail);
        }}
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Mask;
