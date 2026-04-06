import React from 'react';
import { TkBadge } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const fullWidth = () => {
  const demo = (
    <div className="flex gap-2">
      <TkBadge fullWidth label="A" />
      <TkBadge fullWidth label="AA" />
      <TkBadge fullWidth label="AAA" />
    </div>
  );

  const reactCode = `<div className="flex gap-2">
  <TkBadge fullWidth label="A" />
  <TkBadge fullWidth label="AA" />
  <TkBadge fullWidth label="AAA" />
</div>
`;

  const vueCode = `<div class="flex gap-2">
  <TkBadge full-width label="A" />
  <TkBadge full-width label="AA" />
  <TkBadge full-width label="AAA" />
</div>
`;

  const angularCode = `<div class="flex gap-2">
  <tk-badge full-width label="A"></tk-badge>
  <tk-badge full-width label="AA"></tk-badge>
  <tk-badge full-width label="AAA"></tk-badge>
</div>
`;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};
export default fullWidth;
