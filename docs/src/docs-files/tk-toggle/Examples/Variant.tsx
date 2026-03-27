import { TkToggle } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Variant = () => {
  const reactCode = `<TkToggle label="Primary" variant="primary" value={true} showIcon={false} />
<TkToggle label="Secondary" variant="secondary" value={true} showIcon={false} />
<TkToggle label="Neutral" variant="neutral" value={true} showIcon={false} />
<TkToggle label="Info" variant="info" value={true} showIcon={false} />
<TkToggle label="Success" variant="success" value={true} showIcon={false} />
<TkToggle label="Warning" variant="warning" value={true} showIcon={false} />
<TkToggle label="Danger" variant="danger" value={true} showIcon={false} />
<TkToggle label="Verified" variant="verified" value={true} showIcon={false} />
<TkToggle label="Purple" variant="purple" value={true} showIcon={false} />
<TkToggle label="Cyan" variant="cyan" value={true} showIcon={false} />
<TkToggle label="Business" variant="business" value={true} showIcon={false} />
<TkToggle label="Teal" variant="teal" value={true} showIcon={false} />
<TkToggle label="Dark" variant="dark" value={true} showIcon={false} />
<TkToggle label="White" variant="white" value={true} showIcon={false} />`;

  const vueCode = `<TkToggle label="Primary" variant="primary" :value="true" :show-icon="false" />
<TkToggle label="Secondary" variant="secondary" :value="true" :show-icon="false" />
<TkToggle label="Neutral" variant="neutral" :value="true" :show-icon="false" />
<TkToggle label="Info" variant="info" :value="true" :show-icon="false" />
<TkToggle label="Success" variant="success" :value="true" :show-icon="false" />
<TkToggle label="Warning" variant="warning" :value="true" :show-icon="false" />
<TkToggle label="Danger" variant="danger" :value="true" :show-icon="false" />
<TkToggle label="Verified" variant="verified" :value="true" :show-icon="false" />
<TkToggle label="Purple" variant="purple" :value="true" :show-icon="false" />
<TkToggle label="Cyan" variant="cyan" :value="true" :show-icon="false" />
<TkToggle label="Business" variant="business" :value="true" :show-icon="false" />
<TkToggle label="Teal" variant="teal" :value="true" :show-icon="false" />
<TkToggle label="Dark" variant="dark" :value="true" :show-icon="false" />
<TkToggle label="White" variant="white" :value="true" :show-icon="false" />`;

  const angularCode = `<tk-toggle label="Primary" variant="primary" [value]="true" [showIcon]="false" />
<tk-toggle label="Secondary" variant="secondary" [value]="true" [showIcon]="false" />
<tk-toggle label="Neutral" variant="neutral" [value]="true" [showIcon]="false" />
<tk-toggle label="Info" variant="info" [value]="true" [showIcon]="false" />
<tk-toggle label="Success" variant="success" [value]="true" [showIcon]="false" />
<tk-toggle label="Warning" variant="warning" [value]="true" [showIcon]="false" />
<tk-toggle label="Danger" variant="danger" [value]="true" [showIcon]="false" />
<tk-toggle label="Verified" variant="verified" [value]="true" [showIcon]="false" />
<tk-toggle label="Purple" variant="purple" [value]="true" [showIcon]="false" />
<tk-toggle label="Cyan" variant="cyan" [value]="true" [showIcon]="false" />
<tk-toggle label="Business" variant="business" [value]="true" [showIcon]="false" />
<tk-toggle label="Teal" variant="teal" [value]="true" [showIcon]="false" />
<tk-toggle label="Dark" variant="dark" [value]="true" [showIcon]="false" />
<tk-toggle label="White" variant="white" [value]="true" [showIcon]="false" />`;

  const demo = (
    <div className="flex flex-wrap justify-center gap-2">
      <TkToggle label="Primary" variant="primary" value={true} showIcon={false} />
      <TkToggle label="Secondary" variant="secondary" value={true} showIcon={false} />
      <TkToggle label="Neutral" variant="neutral" value={true} showIcon={false} />
      <TkToggle label="Info" variant="info" value={true} showIcon={false} />
      <TkToggle label="Success" variant="success" value={true} showIcon={false} />
      <TkToggle label="Warning" variant="warning" value={true} showIcon={false} />
      <TkToggle label="Danger" variant="danger" value={true} showIcon={false} />
      <TkToggle label="Verified" variant="verified" value={true} showIcon={false} />
      <TkToggle label="Purple" variant="purple" value={true} showIcon={false} />
      <TkToggle label="Cyan" variant="cyan" value={true} showIcon={false} />
      <TkToggle label="Business" variant="business" value={true} showIcon={false} />
      <TkToggle label="Teal" variant="teal" value={true} showIcon={false} />
      <TkToggle label="Dark" variant="dark" value={true} showIcon={false} />
      <TkToggle label="White" variant="white" value={true} showIcon={false} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Variant;
