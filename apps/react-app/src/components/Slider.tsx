import { TkSlider } from '@takeoff-ui/react';
import { useState } from 'react';

function Slider() {
  const [value, setValue] = useState(40);
  const [range, setRange] = useState<[number, number]>([700, 800]);
  const [range2, setRange2] = useState<[number, number]>([20, 80]);

  return (
    <>
      <div>
        <TkSlider
          rangeVisibility={true}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={false}
          value={value}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
          type="ticks"
          showAsterisk
          invalid
          error="This field is required"
          hint="You can drag the slider"
        />

        <div style={{ marginTop: '0.5rem', fontSize: '14px', color: '#666' }}>
          Selected Value: <strong>{value}</strong>
        </div>
      </div>
      <div>
        <TkSlider
          rangeVisibility={true}
          label="Select Range"
          min={100}
          max={1000}
          step={1}
          range={true}
          value={range}
          onTkChange={(e) => {
            if (Array.isArray(e.detail)) setRange([e.detail[0], e.detail[1]]);
          }}
          type="labels"
          invalid
          error="This field is required"
          hint="You can drag the slider"
        />

        <div style={{ marginTop: '0.5rem', fontSize: '14px', color: '#666' }}>
          Selected Range: <strong>{range[0]}</strong> –{' '}
          <strong>{range[1]}</strong>
        </div>
      </div>
      <div>
        <TkSlider
          rangeVisibility={true}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={false}
          value={value}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
          type="labels"
          disabled
        />

        {/*<div style={{ marginTop: '0.5rem', fontSize: '14px', color: '#666' }}>
          Selected Value: <strong>{value}</strong>
        </div>*/}
      </div>

      <div>
        <TkSlider
          rangeVisibility={true}
          label="Select Range"
          min={100}
          max={1000}
          step={1}
          range={true}
          value={range}
          onTkChange={(e) => {
            if (Array.isArray(e.detail)) setRange([e.detail[0], e.detail[1]]);
          }}
          type="labels"
          disabled
        />

        {/*<div style={{ marginTop: '0.5rem', fontSize: '14px', color: '#666' }}>
          Selected Range: <strong>{range[0]}</strong> –{' '}
          <strong>{range[1]}</strong>
        </div>*/}
      </div>
      <div>
        <TkSlider
          rangeVisibility={true}
          label="Brightness"
          min={0}
          max={1000}
          step={10}
          range={false}
          value={value}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
          type="ticks"
        />

        {/*<div style={{ marginTop: '0.5rem', fontSize: '14px', color: '#666' }}>
          Selected Value: <strong>{value}</strong>
        </div>*/}
      </div>
      <div>
        <TkSlider
          rangeVisibility={true}
          label="Select Range"
          min={0}
          max={100}
          step={1}
          range={true}
          value={range2}
          onTkChange={(e) => {
            if (Array.isArray(e.detail)) setRange([e.detail[0], e.detail[1]]);
          }}
          type="ticks"
        />

        {/*<div style={{ marginTop: '0.5rem', fontSize: '14px', color: '#666' }}>
          Selected Range: <strong>{range[0]}</strong> –{' '}
          <strong>{range[1]}</strong>
        </div>*/}
      </div>
    </>
  );
}

export default Slider;
