import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const LabelTemplate = () => {
  const reactCode = `<TkInput
  placeholder="Window seat, meal preference..."
  hint="This information helps the crew prepare your trip."
  value={value}
  onTkChange={(e) => setValue(e.detail)}
>
  <span
    slot="label"
    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
  >
    <span
      className="material-symbols-outlined"
      style={{ color: 'var(--states-info-base)', fontSize: '16px' }}
    >
      flight_takeoff
    </span>
    <span>Flight note</span>
    <span
      style={{
        border: '1px solid var(--states-info-base)',
        borderRadius: '999px',
        color: 'var(--states-info-base)',
        fontSize: '11px',
        lineHeight: '16px',
        padding: '0 6px',
      }}
    >
      Optional
    </span>
  </span>
</TkInput>`;

  const vueCode = `<TkInput
  placeholder="Window seat, meal preference..."
  hint="This information helps the crew prepare your trip."
>
  <span slot="label" style="display: inline-flex; align-items: center; gap: 8px;">
    <span
      class="material-symbols-outlined"
      style="color: var(--states-info-base); font-size: 16px;"
    >
      flight_takeoff
    </span>
    <span>Flight note</span>
    <span
      style="
        border: 1px solid var(--states-info-base);
        border-radius: 999px;
        color: var(--states-info-base);
        font-size: 11px;
        line-height: 16px;
        padding: 0 6px;
      "
    >
      Optional
    </span>
  </span>
</TkInput>`;

  const angularCode = `<tk-input
  placeholder="Window seat, meal preference..."
  hint="This information helps the crew prepare your trip."
>
  <span slot="label" style="display: inline-flex; align-items: center; gap: 8px;">
    <span
      class="material-symbols-outlined"
      style="color: var(--states-info-base); font-size: 16px;"
    >
      flight_takeoff
    </span>
    <span>Flight note</span>
    <span
      style="
        border: 1px solid var(--states-info-base);
        border-radius: 999px;
        color: var(--states-info-base);
        font-size: 11px;
        line-height: 16px;
        padding: 0 6px;
      "
    >
      Optional
    </span>
  </span>
</tk-input>`;

  const [value, setValue] = useState('');

  const demo = (
    <div className="max-w-[360px]">
      <TkInput placeholder="Window seat, meal preference..." hint="This information helps the crew prepare your trip." value={value} onTkChange={e => setValue(e.detail)}>
        <span slot="label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--states-info-base)', fontSize: '16px' }}>
            flight_takeoff
          </span>
          <span>Flight note</span>
          <span
            style={{
              border: '1px solid var(--states-info-base)',
              borderRadius: '999px',
              color: 'var(--states-info-base)',
              fontSize: '11px',
              lineHeight: '16px',
              padding: '0 6px',
            }}
          >
            Optional
          </span>
        </span>
      </TkInput>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default LabelTemplate;
