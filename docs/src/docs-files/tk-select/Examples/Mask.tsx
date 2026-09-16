import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Mask = () => {
  const reactCode = `<TkSelect
  editable
  label="Flight Number"
  placeholder="TK1234"
  options={flights}
  maskOptions={{ regex: /^[A-Z]{0,2}[0-9]{0,4}$/ }}
  value={value}
  onTkChange={(e) => setValue(e.detail)}
/>
<TkSelect
  editable
  allowCustomValue
  label="Departure Date"
  placeholder="dd.mm.YYYY"
  options={dates}
  maskOptions={{
    date: true,
    delimiter: ".",
    datePattern: ["d", "m", "Y"],
  }}
  value={value1}
  onTkChange={(e) => setValue1(e.detail)}
/>`;

  const vueCode = `<script setup>
import { TkSelect } from '@takeoff-ui/vue';

const flights = ['TK1234', 'TK1980', 'TK2020'];
const dates = ['01.01.2026', '15.06.2026'];
const value = ref();
const value1 = ref();
</script>

<template>
  <div>
    <TkSelect
      editable
      label="Flight Number"
      placeholder="TK1234"
      :options="flights"
      :maskOptions.prop="{ regex: /^[A-Z]{0,2}[0-9]{0,4}$/ }"
      v-model="value"
    />
    <TkSelect
      editable
      allowCustomValue
      label="Departure Date"
      placeholder="dd.mm.YYYY"
      :options="dates"
      :maskOptions="{
        date: true,
        delimiter: '.',
        datePattern: ['d', 'm', 'Y'],
      }"
      v-model="value1"
    />
  </div>
</template>`;

  const angularCode = `<tk-select
  editable
  label="Flight Number"
  placeholder="TK1234"
  [options]="flights"
  [maskOptions]="{ regex: '^[A-Z]{0,2}[0-9]{0,4}$' }"
  [(ngModel)]="value"
></tk-select>
<tk-select
  editable
  allowCustomValue
  label="Departure Date"
  placeholder="dd.mm.YYYY"
  [options]="dates"
  [maskOptions]="{
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y'],
  }"
  [(ngModel)]="value1"
></tk-select>`;

  const flights = ['TK1234', 'TK1980', 'TK2020'];
  const dates = ['01.01.2026', '15.06.2026'];
  const [value, setValue] = useState();
  const [value1, setValue1] = useState();

  const demo = (
    <div className="flex flex-col gap-2 w-[300px]">
      <TkSelect
        editable
        label="Flight Number"
        placeholder="TK1234"
        options={flights}
        maskOptions={{ regex: /^[A-Z]{0,2}[0-9]{0,4}$/ }}
        value={value}
        onTkChange={e => setValue(e.detail)}
      />
      <TkSelect
        editable
        allowCustomValue
        label="Departure Date"
        placeholder="dd.mm.YYYY"
        options={dates}
        maskOptions={{
          date: true,
          delimiter: '.',
          datePattern: ['d', 'm', 'Y'],
        }}
        value={value1}
        onTkChange={e => setValue1(e.detail)}
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Mask;
