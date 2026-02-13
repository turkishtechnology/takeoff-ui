import React from 'react';
import { TkCard } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const CardWithHeaderMode = () => {
  const reactCode = `<TkCard header="Basic Header" headerType="basic">
  <p>This card demonstrates different header options.</p>
</TkCard>

<TkCard header="Divided Header" headerType="divided">
  <p>This card demonstrates different header options.</p>
</TkCard>

<TkCard header="Light Header" headerType="light">
  <p>This card demonstrates different header options.</p>
</TkCard>

<TkCard header="Dark Header" headerType="dark">
  <p>This card demonstrates different header options.</p>
</TkCard>

<TkCard header="Primary Header" headerType="primary">
  <p>This card demonstrates different header options.</p>
</TkCard>`;

  const vueCode = `<TkCard header="Basic Header" headerType="basic">
  <p>This card demonstrates different header options.</p>
</TkCard>

<TkCard header="Divided Header" headerType="divided">
  <p>This card demonstrates different header options.</p>
</TkCard>

<TkCard header="Light Header" headerType="light">
  <p>This card demonstrates different header options.</p>
</TkCard>

<TkCard header="Dark Header" headerType="dark">
  <p>This card demonstrates different header options.</p>
</TkCard>

<TkCard header="Primary Header" headerType="primary">
  <p>This card demonstrates different header options.</p>
</TkCard>`;

  const angularCode = `<tk-card header="Basic Header" header-type="basic">
  <p>This card demonstrates different header options.</p>
</tk-card>

<tk-card header="Divided Header" header-type="divided">
  <p>This card demonstrates different header options.</p>
</tk-card>

<tk-card header="Light Header" header-type="light">
  <p>This card demonstrates different header options.</p>
</tk-card>

<tk-card header="Dark Header" header-type="dark">
  <p>This card demonstrates different header options.</p>
</tk-card>

<tk-card header="Primary Header" header-type="primary">
  <p>This card demonstrates different header options.</p>
</tk-card>`;

  const demo = (
    <>
      <div>
        <h3>Basic Header</h3>
        <TkCard header="Basic Header" headerType="basic">
          <p>This card demonstrates different header options.</p>
        </TkCard>
      </div>
      <br />
      <div>
        <h3>Divided Header</h3>
        <TkCard header="Divided Header" headerType="divided">
          <p>This card demonstrates different header options.</p>
        </TkCard>
      </div>
      <br />
      <div>
        <h3>Light Header</h3>
        <TkCard header="Light Header" headerType="light">
          <p>This card demonstrates different header options.</p>
        </TkCard>
      </div>
      <br />
      <div>
        <h3>Dark Header</h3>
        <TkCard header="Dark Header" headerType="dark">
          <p>This card demonstrates different header options.</p>
        </TkCard>
      </div>
      <br />
      <div>
        <h3>Primary Header</h3>
        <TkCard header="Primary Header" headerType="primary">
          <p>This card demonstrates different header options.</p>
        </TkCard>
      </div>
    </>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};
export default CardWithHeaderMode;
