import { TkCard, TkDropdown, TkButton } from '@takeoff-ui/react';
import { useState } from 'react';

function Dropdown() {
  const [action, setAction] = useState('sec');
  const dropdownOptions = [
    { value: '1', label: 'Item 1' },
    { value: '2', label: 'Item 1', disabled: true },
    { value: '3', label: 'Item 1 Item 1' },
  ];
  return (
    <TkCard style={{ paddingLeft: '200px' }}>
      <TkDropdown
        position="bottom-end"
        options={dropdownOptions}
        optionsAlign="center"
        style={{ width: '200px !important' }}
        onTkItemClick={(e: any) => {
          console.log(e);
          setAction(e.detail.label);
        }}
      >
        <TkButton label={action} slot="trigger" size="small" />
      </TkDropdown>
      <TkDropdown
        position="bottom-end"
        style={{ width: '200px' }}
        options={dropdownOptions}
        onTkItemClick={e => {
          console.log(e);
          alert(e.detail);
        }}
        // optionHtml={(row: any) => {
        //   return `<span>Custom item templating ${row.label + row.value}</span>`;
        // }}
      >
        <i slot="trigger" className="material-symbols-outlined">
          more_vert
        </i>
      </TkDropdown>
    </TkCard>
  );
}

export default Dropdown;
