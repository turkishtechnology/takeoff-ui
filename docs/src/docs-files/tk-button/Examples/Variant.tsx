import { TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Style = () => {
  const reactCode = `<div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
  <TkButton variant="primary" label="Primary" />
  <TkButton variant="secondary" label="Secondary" />
  <TkButton variant="neutral" label="Neutral" />
  <TkButton variant="info" label="Info" />
  <TkButton variant="success" label="Success" />
  <TkButton variant="danger" label="Danger" />
  <TkButton variant="warning" label="Warning" />
</div>`;

  const vueCode = `<div style='margin-bottom: 16px; display: flex; gap: 8px;'>
  <TkButton variant="primary" label="Primary" />
  <TkButton variant="secondary" label="Secondary" />
  <TkButton variant="neutral" label="Neutral" />
  <TkButton variant="info" label="Info" />
  <TkButton variant="success" label="Success" />
  <TkButton variant="danger" label="Danger" />
  <TkButton variant="warning" label="Warning" />
</div>`;

  const angularCode = `<div style="margin-bottom: 16px; display: flex; gap: 8px">
  <tk-button variant="primary" label="Primary" />
  <tk-button variant="secondary" label="Secondary" />
  <tk-button variant="neutral" label="Neutral" />
  <tk-button variant="info" label="Info" />
  <tk-button variant="success" label="Success" />
  <tk-button variant="danger" label="Danger" />
  <tk-button variant="warning" label="Warning" />
</div>`;

  const demo = (
    <div className="flex justify-center flex-wrap gap-2">
      <TkButton variant="primary" label="Primary" />
      <TkButton variant="secondary" label="Secondary" />
      <TkButton variant="neutral" label="Neutral" />
      <TkButton variant="info" label="Info" />
      <TkButton variant="success" label="Success" />
      <TkButton variant="danger" label="Danger" />
      <TkButton variant="warning" label="Warning" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Style;
