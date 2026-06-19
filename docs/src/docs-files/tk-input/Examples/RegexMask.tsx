import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const RegexMask = () => {
  const reactCode = `// The \`regex\` mask validates input as the user types: characters that could
// never lead to a valid value are rejected, while valid prefixes are accepted.
// Write the regex for the FINAL value (anchors and length quantifiers are fine) —
// intermediate states are handled for you.

<TkInput
  label="PNR Code (letters & digits, max 6)"
  placeholder="ABC123"
  maskOptions={{ regex: /^[A-Z0-9]{1,6}$/ }}
  value={pnr}
  onTkChange={(e) => setPnr(e.detail)}
/>

<TkInput
  label="Amount (digits & commas, max 10)"
  placeholder="1,2,3"
  maskOptions={{ regex: /^[0-9,]{1,10}$/ }}
  value={amount}
  onTkChange={(e) => setAmount(e.detail)}
/>

<TkInput
  label="Plate (2 letters + 4 digits)"
  placeholder="AB1234"
  maskOptions={{ regex: /^[A-Z]{2}[0-9]{4}$/ }}
  value={plate}
  onTkChange={(e) => setPlate(e.detail)}
/>

<TkInput
  label="Currency"
  placeholder="$12.34"
  maskOptions={{ regex: /^\\$\\d+\\.\\d{2}$/ }}
  value={price}
  onTkChange={(e) => setPrice(e.detail)}
/>

<TkInput
  label="Phone (optional +90 prefix)"
  placeholder="+905551234567"
  maskOptions={{ regex: /^(\\+90)?[0-9]{10}$/ }}
  value={phone}
  onTkChange={(e) => setPhone(e.detail)}
/>

<TkInput
  label="Code (4 or 6 digits)"
  placeholder="1234 or 123456"
  maskOptions={{ regex: /^(\\d{4}|\\d{6})$/ }}
  value={code}
  onTkChange={(e) => setCode(e.detail)}
/>`;

  const vueCode = `<script setup>
import { TkInput } from '@takeoff-ui/vue';

const pnr = ref();
const amount = ref();
const plate = ref();
const price = ref();
const phone = ref();
const code = ref();
</script>

<template>
  <div>
    <TkInput
      label="PNR Code (letters & digits, max 6)"
      placeholder="ABC123"
      :maskOptions.prop="{ regex: /^[A-Z0-9]{1,6}$/ }"
      v-model="pnr"
    />
    <TkInput
      label="Amount (digits & commas, max 10)"
      placeholder="1,2,3"
      :maskOptions.prop="{ regex: /^[0-9,]{1,10}$/ }"
      v-model="amount"
    />
    <TkInput
      label="Plate (2 letters + 4 digits)"
      placeholder="AB1234"
      :maskOptions.prop="{ regex: /^[A-Z]{2}[0-9]{4}$/ }"
      v-model="plate"
    />
    <TkInput
      label="Currency"
      placeholder="$12.34"
      :maskOptions.prop="{ regex: /^\\$\\d+\\.\\d{2}$/ }"
      v-model="price"
    />
    <TkInput
      label="Phone (optional +90 prefix)"
      placeholder="+905551234567"
      :maskOptions.prop="{ regex: /^(\\+90)?[0-9]{10}$/ }"
      v-model="phone"
    />
    <TkInput
      label="Code (4 or 6 digits)"
      placeholder="1234 or 123456"
      :maskOptions.prop="{ regex: /^(\\d{4}|\\d{6})$/ }"
      v-model="code"
    />
  </div>
</template>
`;

  const angularCode = `<tk-input
  label="PNR Code (letters & digits, max 6)"
  placeholder="ABC123"
  [maskOptions]="{ regex: /^[A-Z0-9]{1,6}$/ }"
  [(ngModel)]="pnr"
></tk-input>
<tk-input
  label="Amount (digits & commas, max 10)"
  placeholder="1,2,3"
  [maskOptions]="{ regex: /^[0-9,]{1,10}$/ }"
  [(ngModel)]="amount"
></tk-input>
<tk-input
  label="Plate (2 letters + 4 digits)"
  placeholder="AB1234"
  [maskOptions]="{ regex: /^[A-Z]{2}[0-9]{4}$/ }"
  [(ngModel)]="plate"
></tk-input>
<tk-input
  label="Currency"
  placeholder="$12.34"
  [maskOptions]="{ regex: /^\\$\\d+\\.\\d{2}$/ }"
  [(ngModel)]="price"
></tk-input>
<tk-input
  label="Phone (optional +90 prefix)"
  placeholder="+905551234567"
  [maskOptions]="{ regex: /^(\\+90)?[0-9]{10}$/ }"
  [(ngModel)]="phone"
></tk-input>
<tk-input
  label="Code (4 or 6 digits)"
  placeholder="1234 or 123456"
  [maskOptions]="{ regex: /^(\\d{4}|\\d{6})$/ }"
  [(ngModel)]="code"
></tk-input>`;

  const [pnr, setPnr] = useState();
  const [amount, setAmount] = useState();
  const [plate, setPlate] = useState();
  const [price, setPrice] = useState();
  const [phone, setPhone] = useState();
  const [code, setCode] = useState();

  const demo = (
    <div className="flex flex-col gap-2 w-[300px]">
      <TkInput label="PNR Code (letters & digits, max 6)" placeholder="ABC123" maskOptions={{ regex: /^[A-Z0-9]{1,6}$/ }} value={pnr} onTkChange={e => setPnr(e.detail)} />

      <TkInput label="Amount (digits & commas, max 10)" placeholder="1,2,3" maskOptions={{ regex: /^[0-9,]{1,10}$/ }} value={amount} onTkChange={e => setAmount(e.detail)} />

      <TkInput label="Plate (2 letters + 4 digits)" placeholder="AB1234" maskOptions={{ regex: /^[A-Z]{2}[0-9]{4}$/ }} value={plate} onTkChange={e => setPlate(e.detail)} />

      <TkInput label="Currency" placeholder="$12.34" maskOptions={{ regex: /^\$\d+\.\d{2}$/ }} value={price} onTkChange={e => setPrice(e.detail)} />

      <TkInput label="Phone (optional +90 prefix)" placeholder="+905551234567" maskOptions={{ regex: /^(\+90)?[0-9]{10}$/ }} value={phone} onTkChange={e => setPhone(e.detail)} />

      <TkInput label="Code (4 or 6 digits)" placeholder="1234 or 123456" maskOptions={{ regex: /^(\d{4}|\d{6})$/ }} value={code} onTkChange={e => setCode(e.detail)} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default RegexMask;
