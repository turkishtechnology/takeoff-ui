import React, { useRef } from 'react';
import { TkDatepicker, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const FooterCustomization = () => {
  const reactCode = `import { useRef } from "react";
import { TkDatepicker, TkButton } from "@takeoff-ui/react";

const dp = useRef(null);

const setToday = async () => {
   await dp.current.setToday();
};

<TkDatepicker ref={dp} inline>
  <div slot="footer-actions" className="flex justify-between w-full">
    <TkButton label="Today" type="filled" variant="secondary" onTkClick={setToday} />
    <div className="flex gap-2">
      <TkButton label="Cancel" type="text" variant="neutral" />
      <TkButton label="Submit" />
    </div>
  </div>
</TkDatepicker>`;

  const vueCode = `<script setup>
import { ref } from 'vue';

const dp = ref(null);

const setToday = async () => {
   await dp.value.setToday()
};
</script>
<template>
  <TkDatepicker ref="dp" inline>
    <template #footer-actions>
      <div class="flex justify-between w-full">
        <TkButton label="Today" type="filled" variant="secondary" @tkClick="setToday" />
        <div class="flex gap-2">
          <TkButton label="Cancel" type="text" variant="neutral" />
          <TkButtonlabel="Submit" />
        </div>
      </div>
    </template>
  </TkDatepicker>
</template>`;

  const dp = useRef<HTMLTkDatepickerElement>(null);

  const setToday = async () => {
    await dp.current.setToday();
  };

  const demo = (
    <div className="flex justify-center items-center overflow-auto">
      <TkDatepicker ref={dp} className="mt-4" inline>
        <div slot="footer-actions" className="flex justify-between w-full">
          <TkButton label="Today" type="filled" variant="secondary" onTkClick={setToday}></TkButton>
          <div className="flex gap-2">
            <TkButton label="Cancel" type="text" variant="neutral"></TkButton>
            <TkButton label="Submit"></TkButton>
          </div>
        </div>
      </TkDatepicker>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};
export default FooterCustomization;
