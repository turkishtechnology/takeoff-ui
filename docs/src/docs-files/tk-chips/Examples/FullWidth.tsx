import React from 'react';
import { TkChips } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const fullWidth = () => {
  const demo = (
    <div className="flex gap-2">
      <TkChips fullWidth label="A"></TkChips>
      <TkChips fullWidth label="AA"></TkChips>
      <TkChips fullWidth label="AAA"></TkChips>
    </div>
  );

  const reactCode = `<div className="flex gap-2">
    <TkChips fullwidth label="A" />
    <TkChips fullwidth label="AA" />
    <TkChips fullwidth label="AAA" />
</div>
`;

  const vueCode = `<div className="flex gap-2">
    <TkChips fullwidth label="A" />
    <TkChips fullwidth label="AA" />
    <TkChips fullwidth label="AAA" />
</div>
`;

  const angularCode = `<div className="flex gap-2">
    <tk-chips fullwidth label="A"></tk-chips>
    <tk-chips fullwidth label="AAA"></tk-chips>
    <tk-chips fullwidth label="AA"></tk-chips>
</div>
`;
  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};
export default fullWidth;
