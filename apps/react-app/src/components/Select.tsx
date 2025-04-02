import { TkCard, TkSelect } from '@takeoff-ui/react';
import { useState } from 'react';

function Select() {
  //#region text options
  // text base options
  const textBaseOptions = [
    'option 1',
    'option 2',
    'option 3',
    'option 4',
    'option 5',
    'option 6',
    'option 7',
    'option 8',
    'option 9',
    'option 10',
    'option 11',
  ];

  // text base group options
  const textBaseGroupOptions = [
    {
      groupName: 'Büyükşehir',
      options: ['ankara', 'izmir', 'istanbul'],
    },
    {
      groupName: 'Batı Karadeniz',
      options: ['bolu', 'bartin', 'zonguldak'],
    },
    {
      groupName: 'İç Anadolu',
      options: ['yozgat', 'kirikkale'],
    },
  ];

  // ----------------------------
  // text
  const textOptions = [...textBaseOptions];

  // text editable
  const textEditableOptions = [...textBaseOptions];

  // text editable filter
  const [textEditableFilterOptions, setTextEditableFilterOptions] =
    useState(textBaseOptions);

  // text allow custom value
  const textAllowCustomValueOptions = [...textBaseOptions];

  // text multiple
  const textMultipleOptions = [...textBaseOptions];

  // text group
  const textGroupOptions = [...textBaseGroupOptions];

  // text editable + allow custom value
  const textEditableAllowCustomValueOptions = [...textBaseOptions];

  // text editable + multiple
  const textEditableMultiple = [...textBaseOptions];

  // text editable + group
  const textEditableGroup = [...textBaseGroupOptions];

  // text editable + filter + allow custom value
  const [
    textEditableFilterAllowCustomValueOptions,
    setTextEditableFilterAllowCustomValueOptions,
  ] = useState(textBaseOptions);

  // text editable + filter + multiple
  const [
    textEditableFilterMultipleOptions,
    setTextEditableFilterMultipleOptions,
  ] = useState(textBaseOptions);

  // text editable + filter + group
  const [textEditableFilterGroupOptions, setTextEditableFilterGroupOptions] =
    useState(textBaseGroupOptions);

  // text multiple + allow custom value
  const textMultipleAllowCustomValue = [...textBaseOptions];

  // text multiple + group
  const textMultipleGroupOptions = [...textBaseGroupOptions];

  // text multiple + allow custom value + group
  const textMultipleAllowCustomValueGroupOptions = [...textBaseGroupOptions];
  //#endregion

  // ---------------------- object
  // text base options
  const objectBaseOptions = [
    { value: 'ankara 1', label: 'Ankara', code: 'esb' },
    { value: 'izmir 2', label: 'Izmir', code: 'izm' },
    { value: 'istanbul 3', label: 'İstanbul', code: 'ist' },
    { value: 'karabük 4', label: 'Karabük', code: 'krb' },
    { value: 'bartın 5', label: 'Bartın', code: 'brt' },
    { value: 'zonguldak 6', label: 'Zonguldak', code: 'zng' },
  ];

  // text base group options
  const objectBaseGroupOptions = [
    {
      groupName: 'Büyükşehir',
      options: [
        { value: 'ankara 1', label: 'Ankara' },
        { value: 'izmir 2', label: 'Izmir' },
        { value: 'istanbul 3', label: 'İstanbul' },
      ],
    },
    {
      groupName: 'Batı Karadeniz',
      options: [
        { value: 'bolu 1', label: 'Bolu' },
        { value: 'bartın 2', label: 'Bartın' },
        { value: 'karabük 3', label: 'Karabük' },
      ],
    },
    {
      groupName: 'İç Anadolu',
      options: ['yozgat', 'kirikkale'],
    },
  ];
  // object
  const objectOptions = [...objectBaseOptions];

  // object editable
  const objectEditableOptions = [...objectBaseOptions];

  // object editable filter
  const [objectEditableFilterOptions, setObjectEditableFilterOptions] =
    useState(objectBaseOptions);

  // object allow custom value
  const objectAllowCustomValueOptions = [...objectBaseOptions];

  // object multiple
  const objectMultipleOptions = [...objectBaseOptions];

  // object group
  const objectGroupOptions = [...objectBaseGroupOptions];

  // object editable + allow custom value
  const objectEditableAllowCustomValueOptions = [...objectBaseOptions];

  // object editable + multiple
  const objectEditableMultiple = [...objectBaseOptions];

  // object editable + group
  const objectEditableGroup = [...objectBaseGroupOptions];

  // object editable + filter + allow custom value
  const [
    objectEditableFilterAllowCustomValueOptions,
    setObjectEditableFilterAllowCustomValueOptions,
  ] = useState(objectBaseOptions);

  // object editable + filter + multiple
  const [
    objectEditableFilterMultipleOptions,
    setObjectEditableFilterMultipleOptions,
  ] = useState(objectBaseOptions);

  // object multiple + allow custom value
  const objectMultipleAllowCustomValue = [...objectBaseOptions];

  // object multiple + group
  const objectMultipleGroupOptions = [...objectBaseGroupOptions];

  // object multiple + allow custom value + group
  const objectMultipleAllowCustomValueGroupOptions = [
    ...objectBaseGroupOptions,
  ];

  const [value, setValue] = useState(null);
  const [valueString, setValueString] = useState(null);
  const [valueObject, setValueObject] = useState(null);
  const [htmlValue, setHtmlValue] = useState(null);
  const [valueObjectMultiple, setValueObjectMultiple] = useState(null);

  return (
    <TkCard className="p-10">
      <TkSelect
        label="Custom Item"
        optionLabelKey="name"
        optionValueKey="code"
        value={htmlValue}
        options={[
          {
            code: 'SAW',
            name: 'Sabiha Gökçen Havalimanı',
            country: 'İstanbul',
          },
          { code: 'ESB', name: 'Esenboğa Havalimanı', country: 'Ankara' },
          { code: 'AYT', name: 'Antalya Havalimanı', country: 'Antalya' },
        ]}
        optionHtml={(item: any) => {
          return `<div style="display: flex; flex-direction: column;">
                <div style="displaY: flex;justify-content: space-between;">
                    <div style="font-weight: bold;">${item.name}</div>
                    <div style="color: var(--primary-base)">${item.code}</div>
                </div>
                <div>${item.country}</div>
            </div>`;
        }}
        onTkChange={(e) => setHtmlValue(e.detail)}
      />
      {/* <TkSelect
        label="Multiple Select"
        value={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
        ]}
        options={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
          { value: 'other', label: 'Other' },
        ]}
        multiple
        hint="Hint text"
      /> */}
      //#region text options
      <h4>text options</h4>
      ----------------------
      <TkSelect
        label="Text"
        editable
        options={textOptions}
        value={valueString}
        onTkChange={(e: CustomEvent) => {
          console.log('text', 'tk-change', e.detail);
          setValueString(e.detail);
        }}
      />
      {/* <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text Editable"
        options={textEditableOptions}
        editable
        onTkChange={(e: CustomEvent) => {
          console.log('text editable ', 'tk-change', e.detail);
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text Editable Filter"
        options={textEditableFilterOptions}
        editable
        onTkChange={(e: CustomEvent) => {
          console.log('text editable filter', 'tk-change', e.detail);
        }}
        onTkFilter={(e: CustomEvent) => {
          console.log('text editable filter', 'tk-filter', e.detail);
          if (!e.detail) {
            setTextEditableFilterOptions([...textBaseOptions]);
          } else {
            setTextEditableFilterOptions(
              textBaseOptions.filter(
                (item) =>
                  item.toLowerCase().indexOf(e.detail.toLowerCase()) > -1,
              ),
            );
          }
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text Allow Custom Value"
        options={textAllowCustomValueOptions}
        allowCustomValue
        onTkChange={(e: CustomEvent) => {
          console.log('text allow custom value', 'tk-change', e.detail);
        }}
      /> */}
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text Multiple"
        value={value}
        options={textMultipleOptions}
        multiple
        editable
        allowCustomValue
        onTkChange={(e: CustomEvent) => {
          console.log('text multiple', 'tk-change', e.detail);
          setValue(e.detail);
        }}
      />
      {/* <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text Group"
        options={textGroupOptions}
        onTkChange={(e: CustomEvent) => {
          console.log('text group', 'tk-change', e.detail);
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text editable + allow custom value"
        options={textEditableAllowCustomValueOptions}
        editable
        allowCustomValue
        onTkChange={(e: CustomEvent) => {
          console.log(
            'text editable + allow custom value',
            'tk-change',
            e.detail,
          );
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text editable + multiple"
        options={textEditableMultiple}
        editable
        multiple
        onTkChange={(e: CustomEvent) => {
          console.log('text editable + multiple', 'tk-change', e.detail);
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text editable + group"
        options={textEditableGroup}
        editable
        onTkChange={(e: CustomEvent) => {
          console.log('text editable + group', 'tk-change', e.detail);
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text editable + filter + allow custom value"
        options={textEditableFilterAllowCustomValueOptions}
        editable
        allowCustomValue
        onTkChange={(e: CustomEvent) => {
          console.log(
            'text editable + filter + allow custom value',
            'tk-change',
            e.detail,
          );
        }}
        onTkFilter={(e: CustomEvent) => {
          console.log(
            'text editable filter + allow custom value',
            'tk-filter',
            e.detail,
          );
          if (!e.detail) {
            setTextEditableFilterAllowCustomValueOptions([...textBaseOptions]);
          } else {
            setTextEditableFilterAllowCustomValueOptions(
              textBaseOptions.filter(
                (item) =>
                  item.toLowerCase().indexOf(e.detail.toLowerCase()) > -1,
              ),
            );
          }
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text editable + filter + multiple"
        options={textEditableFilterMultipleOptions}
        editable
        multiple
        onTkChange={(e: CustomEvent) => {
          console.log(
            'text editable + filter + multiple',
            'tk-change',
            e.detail,
          );
        }}
        onTkFilter={(e: CustomEvent) => {
          console.log('text editable filter + multiple', 'tk-filter', e.detail);
          if (!e.detail) {
            setTextEditableFilterMultipleOptions([...textBaseOptions]);
          } else {
            setTextEditableFilterMultipleOptions(
              textBaseOptions.filter(
                (item) =>
                  item.toLowerCase().indexOf(e.detail.toLowerCase()) > -1,
              ),
            );
          }
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text editable + filter + group"
        options={textEditableFilterGroupOptions}
        editable
        onTkChange={(e: CustomEvent) => {
          console.log('text editable + filter + group', 'tk-change', e.detail);
        }}
        onTkFilter={(e: CustomEvent) => {
          console.log('text editable filter + group', 'tk-filter', e.detail);
          if (!e.detail) {
            setTextEditableFilterGroupOptions([...textBaseGroupOptions]);
          } else {
            setTextEditableFilterGroupOptions(
              textBaseGroupOptions.filter(
                () =>
                  // item.toLowerCase().indexOf(e.detail.toLowerCase()) > -1,
                  true,
              ),
            );
          }
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text multiple + allow custom value"
        options={textMultipleAllowCustomValue}
        allowCustomValue
        multiple
        editable
        onTkChange={(e: CustomEvent) => {
          console.log(
            'text multiple + allow custom value',
            'tk-change',
            e.detail,
          );
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text multiple + group"
        options={textMultipleGroupOptions}
        multiple
        onTkChange={(e: CustomEvent) => {
          console.log('text multiple + group', 'tk-change', e.detail);
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Text multiple + allow custom value + group"
        options={textMultipleAllowCustomValueGroupOptions}
        multiple
        allowCustomValue
        editable
        onTkChange={(e: CustomEvent) => {
          console.log(
            'text multiple + allow custom value + group',
            'tk-change',
            e.detail,
          );
        }}
      /> */}
      //#endregion
      <h4>object options</h4>
      ----------------------
      <TkSelect
        label="Object"
        editable
        allowCustomValue
        filter={async (text: string, options?: any[]) => {
          if (text) {
            return options?.filter(
              (item) =>
                item.code.toLowerCase().indexOf(text?.toLowerCase()) > -1,
            ) as any[];
          } else {
            return options as any[];
          }
        }}
        options={objectOptions}
        // optionValueKey="value"
        value={valueObject}
        onTkChange={(e: CustomEvent) => {
          console.log('object', 'tk-change', e.detail);
          setValueObject(e.detail);
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Object Multiple"
        options={objectMultipleOptions}
        value={valueObjectMultiple}
        multiple
        editable
        onTkChange={(e: CustomEvent) => {
          console.log('object multiple', 'tk-change', e.detail);
          setValueObjectMultiple(e.detail);
        }}
      />
      {/* <TkSelect
        label="Object Editable"
        options={objectEditableOptions}
        editable
        // value={ { value: 'ankara 1', label: 'Ankara' }}
        // optionValueKey="value"
        onTkChange={(e: CustomEvent) => {
          console.log('object editable ', 'tk-change', e.detail);
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Object Editable Filter"
        options={objectEditableFilterOptions}
        // value={'ankara 1'}
        editable
        optionValueKey="value"
        onTkChange={(e: CustomEvent) => {
          console.log('object editable filter', 'tk-change', e.detail);
        }}
        onTkFilter={(e: CustomEvent) => {
          console.log('object editable filter', 'tk-filter', e.detail);
          if (!e.detail) {
            setObjectEditableFilterOptions([...objectBaseOptions]);
          } else {
            setObjectEditableFilterOptions(
              objectBaseOptions.filter(
                (item) =>
                  item.label.toLowerCase().indexOf(e.detail.toLowerCase()) > -1,
              ),
            );
          }
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Object Allow Custom Value"
        options={objectAllowCustomValueOptions}
        allowCustomValue
        // optionValueKey="value"
        value={{ value: 'ankara 1', label: 'Ankara' }}
        onTkChange={(e: CustomEvent) => {
          console.log('object allow custom value', 'tk-change', e.detail);
        }}
      />
      <hr style={{ margin: '8px 0' }} />
   
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Object Group"
        options={objectGroupOptions}
        optionValueKey="value"
        value={'ankara 1'}
        onTkChange={(e: CustomEvent) => {
          console.log('object group', 'tk-change', e.detail);
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Object editable + allow custom value"
        options={objectEditableAllowCustomValueOptions}
        editable
        allowCustomValue
        // optionValueKey="value"
        onTkChange={(e: CustomEvent) => {
          console.log(
            'object editable + allow custom value',
            'tk-change',
            e.detail,
          );
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Object editable + multiple"
        options={objectEditableMultiple}
        editable
        multiple
        optionValueKey="value"
        onTkChange={(e: CustomEvent) => {
          console.log('object editable + multiple', 'tk-change', e.detail);
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Object editable + group"
        options={objectEditableGroup}
        editable
        onTkChange={(e: CustomEvent) => {
          console.log('object editable + group', 'tk-change', e.detail);
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Object editable + filter + allow custom value"
        options={objectEditableFilterAllowCustomValueOptions}
        editable
        allowCustomValue
        optionValueKey="value"
        onTkChange={(e: CustomEvent) => {
          console.log(
            'object editable + filter + allow custom value',
            'tk-change',
            e.detail,
          );
        }}
        onTkFilter={(e: CustomEvent) => {
          console.log(
            'object editable filter + allow custom value',
            'tk-filter',
            e.detail,
          );
          if (!e.detail) {
            setObjectEditableFilterAllowCustomValueOptions([
              ...objectBaseOptions,
            ]);
          } else {
            setObjectEditableFilterAllowCustomValueOptions(
              objectBaseOptions.filter(
                (item) =>
                  item.label.toLowerCase().indexOf(e.detail.toLowerCase()) > -1,
              ),
            );
          }
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Object editable + filter + multiple"
        options={objectEditableFilterMultipleOptions}
        editable
        multiple
        onTkChange={(e: CustomEvent) => {
          console.log(
            'object editable + filter + multiple',
            'tk-change',
            e.detail,
          );
        }}
        onTkFilter={(e: CustomEvent) => {
          console.log(
            'object editable filter + multiple',
            'tk-filter',
            e.detail,
          );
          if (!e.detail) {
            setObjectEditableFilterMultipleOptions([...objectBaseOptions]);
          } else {
            setObjectEditableFilterMultipleOptions([
              ...objectBaseOptions.filter(
                (item) =>
                  item.label.toLowerCase().indexOf(e.detail.toLowerCase()) > -1,
              ),
            ]);
          }
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Object multiple + allow custom value"
        options={objectMultipleAllowCustomValue}
        allowCustomValue
        multiple
        editable
        onTkChange={(e: CustomEvent) => {
          console.log(
            'object multiple + allow custom value',
            'tk-change',
            e.detail,
          );
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Object multiple + group"
        options={objectMultipleGroupOptions}
        multiple
        onTkChange={(e: CustomEvent) => {
          console.log('object multiple + group', 'tk-change', e.detail);
        }}
      />
      <hr style={{ margin: '8px 0' }} />
      <TkSelect
        label="Object multiple + allow custom value + group"
        options={objectMultipleAllowCustomValueGroupOptions}
        multiple
        allowCustomValue
        editable
        onTkChange={(e: CustomEvent) => {
          console.log(
            'object multiple + allow custom value + group',
            'tk-change',
            e.detail,
          );
        }}
      /> */}
    </TkCard>
  );
}

export default Select;
