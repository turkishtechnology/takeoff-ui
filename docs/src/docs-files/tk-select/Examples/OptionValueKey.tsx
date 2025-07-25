import { TkDivider, TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Example = () => {
  const [selectValue, setSelectValue] = useState();

  const selectOptions = [
    { value: 'female', label: 'Female', symbol: 'XX' },
    { value: 'male', label: 'Male', symbol: 'XY' },
    { value: 'other', label: 'Other', symbol: '00' },
  ];
  const [selectObjectValue, setObjectSelectValue] = useState();

  return (
    <div>
      <div className="flex flex-col">
        <TkSelect
          editable
          label="Key Value Select"
          value={selectValue}
          options={selectOptions}
          optionValueKey="symbol"
          onTkChange={e => {
            setSelectValue(e.detail);
          }}
        />
        <p>
          <b>Selected Key's value:</b> {selectValue}
        </p>
      </div>
      <TkDivider></TkDivider>
      <div className="flex flex-col">
        <TkSelect
          editable
          label="Object Value Select"
          value={selectObjectValue}
          options={selectOptions}
          onTkChange={e => {
            setObjectSelectValue(e.detail);
          }}
        />
        <p className="my-0">
          {' '}
          <b>Selected Object's value:</b>
        </p>
        <p>{JSON.stringify(selectObjectValue)}</p>
      </div>
    </div>
  );
};

const OptionValueKey = () => {
  const reactCode = ` 
  const selectOptions = [
    {value: "female", label: "Female", symbol:"XX" },
    {value: "male", label: "Male", symbol: "XY" },
    {value: "other", label: "Other", symbol: "00" },
  ];
  const [selectValue, setSelectValue]=useState();
  const [selectObjectValue, setObjectSelectValue]=useState();

  return(
    <TkSelect
      editable
      label="Key Value Select"
      value={selectValue}
      options={selectOptions}
      optionValueKey="symbol"
      onTkChange={(e)=>{
        setSelectValue(e.detail);
      }}
    />
    p><b>Selected Key's value:</b> {selectValue}</p>
    <TkSelect
        editable
        label="Object Value Select"
        options={selectOptions}
        onTkChange={(e)=>{
          setObjectSelectValue(e.detail);
        }}
    />
    <p><b>Selected Key's value:</b> {JSON.stringify(selectObjectValue)}</p>
  );`;

  const vueCode = `<script setup>
  import { TkSelect } from '@takeoff-ui/vue';
  import { ref } from 'vue';

  const selectOptions = [
    {value: "female", label: "Female",symbol:"XX" },
    {value: "male", label: "Male",symbol: "XY" },
    {value: "other", label: "Other",symbol: "00"},
  ];
  const selectKeyValue = ref(null);
  const selectObjectValue = ref(null);

  </script>
  <template>
    <div>
      <TkSelect
        editable
        label="Key Value Select"
        :options.prop="selectOptions"
        optionValueKey="symbol"
        v-model="selectKeyValue"
      />
      <p><b>Selected Key's value:</b> {{ selectKeyValue }}</p>
    <TkSelect
        editable
        label="Key Value Select"
        :options.prop="selectOptions"
        v-model="selectObjectValue"
      />
      <p><b>Selected Object's value:</b> {{ selectObjectValue }}</p>
    </div>
  </template>
  `;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default OptionValueKey;
