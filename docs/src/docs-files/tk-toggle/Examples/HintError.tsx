import { TkToggle } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const HintError = () => {
  const reactCode = `<TkToggle label="Email notifications" hint="Recommended for account updates" />
<TkToggle label="Two-factor authentication" invalid error="This setting requires verification" value={true} />`;

  const vueCode = `<TkToggle label="Email notifications" hint="Recommended for account updates" />
<TkToggle label="Two-factor authentication" :invalid="true" error="This setting requires verification" :value="true" />`;

  const angularCode = `<tk-toggle label="Email notifications" hint="Recommended for account updates"></tk-toggle>
<tk-toggle label="Two-factor authentication" [invalid]="true" error="This setting requires verification" [value]="true"></tk-toggle>`;

  const demo = (
    <div className="flex flex-col gap-4">
      <TkToggle label="Email notifications" hint="Recommended for account updates" />
      <TkToggle label="Two-factor authentication" invalid error="This setting requires verification" value={true} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default HintError;
