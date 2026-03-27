import React from 'react';
import { TkCard, TkButton, TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const options = [
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
];

const CardWithHeaderAction = () => {
  const reactCode = `<TkCard header="Card with Header Action" subheader="Subheader" headerType="divided">
  <p>This card demonstrates the use of a custom action in the header.</p>
  <div slot="header-action" style={{ display: 'flex', gap: '8px' }}>
    <TkSelect options={[
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' },
      { value: 'year', label: 'This Year' },
    ]} placeholder="Select period"></TkSelect>
    <TkButton icon="filter_alt" variant="info" label="Filter"></TkButton>
  </div>
</TkCard>`;

  const vueCode = `<TkCard header="Card with Header Action" subheader="Subheader" headerType="divided">
  <p>This card demonstrates the use of a custom action in the header.</p>
  <div slot="header-action" style="display: flex; gap: 8px">
    <TkSelect :options="[
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' },
      { value: 'year', label: 'This Year' },
    ]" placeholder="Select period"></TkSelect>
    <TkButton icon="filter_alt" variant="info" label="Filter"></TkButton>
  </div>
</TkCard>`;

  const angularCode = `<tk-card header="Card with Header Action" subheader="Subheader" header-type="divided">
  <p>This card demonstrates the use of a custom action in the header.</p>
  <div slot="header-action" style="display: flex; gap: 8px">
    <tk-select [options]="[
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' },
      { value: 'year', label: 'This Year' },
    ]" placeholder="Select period"></tk-select>
    <tk-button icon="filter_alt" variant="info" label="Filter"></tk-button>
  </div>
</tk-card>`;

  const demo = (
    <TkCard header="Card with Header Action" subheader="Subheader" headerType="divided">
      <p>This card demonstrates the use of a custom action in the header.</p>
      <div slot="header-action" style={{ display: 'flex', gap: '8px' }}>
        <TkSelect options={options} placeholder="Select period"></TkSelect>
        <TkButton icon="filter_alt" variant="info" label="Filter"></TkButton>
      </div>
    </TkCard>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default CardWithHeaderAction;
