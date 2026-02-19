import { useRef, useState } from 'react';
import { TkDatepicker, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const FooterCustomization = () => {
  const reactCode = `import { useRef, useState } from "react";
import { TkDatepicker, TkButton } from "@takeoff-ui/react";

const dp = useRef(null);

const [date, setDate] = useState();

const setToday = async () => {
   await dp?.current?.setToday();
};

const submit = async () => {
  await dp?.current?.apply();
};

<TkDatepicker ref={dp} value={date} allowApplyButton inline onTkChange={e => setDate(e.detail)}>
  <div slot="footer-actions" className="flex justify-between w-full">
    <TkButton label="Today" type="filled" variant="secondary" onTkClick={setToday} />
    <div className="flex gap-2">
      <TkButton label="Cancel" type="text" variant="neutral" />
      <TkButton label="Submit" onTkClick={submit}></TkButton>
    </div>
  </div>
</TkDatepicker>`;

  const vueCode = `<script setup>
import { ref } from 'vue';

const dp = ref(null);
const value = ref("");

const setToday = async () => {
   await dp?.value?.setToday()
};
const submit = async () => {
   await dp?.value?.apply()
};
</script>
<template>
  <TkDatepicker ref="dp" v-model="value" allowApplyButton inline>
    <template #footer-actions>
      <div class="flex justify-between w-full">
        <TkButton label="Today" type="filled" variant="secondary" @tkClick="setToday" />
        <div class="flex gap-2">
          <TkButton label="Cancel" type="text" variant="neutral" />
          <TkButton label="Submit" @tkClick="submit" />
        </div>
      </div>
    </template>
  </TkDatepicker>
</template>`;

  const dp = useRef<HTMLTkDatepickerElement>(null);
  const [date, setDate] = useState();
  const setToday = async () => {
    await dp?.current?.setToday();
  };
  const submit = async () => {
    await dp?.current?.apply();
  };

  const demo = (
    <div className="flex flex-col justify-center items-center overflow-auto">
      <p>
        <b>Selected Date:</b> {JSON.stringify(date)}
      </p>
      <TkDatepicker ref={dp} value={date} allowApplyButton onTkChange={e => setDate(e.detail)}>
        <div slot="footer-actions" className="flex justify-between w-full">
          <TkButton label="Today" type="filled" variant="secondary" onTkClick={setToday}></TkButton>
          <div className="flex gap-2">
            <TkButton label="Cancel" type="text" variant="neutral" />
            <TkButton label="Submit" onTkClick={submit}></TkButton>
          </div>
        </div>
      </TkDatepicker>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};
export default FooterCustomization;
