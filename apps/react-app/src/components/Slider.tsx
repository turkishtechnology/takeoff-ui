import { TkSlider } from '@takeoff-ui/react';
import { useState } from 'react';

function Slider() {
  const [value, setValue] = useState(40);
  const [range, setRange] = useState<[number, number]>([20, 80]);

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
          type="labels"
        />
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
          hint="You can drag the slider"
        />
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
          showAsterisk
          invalid
          error="This field is required"
          hint="You can drag the slider"
        />
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
          type="ticks"
        />
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
          type="ticks"
          hint="You can drag the slider"
        />
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
          type="ticks"
          showAsterisk
          invalid
          error="This field is required"
          hint="You can drag the slider"
        />
      </div>

      <div>
        <TkSlider
          rangeVisibility={false}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={false}
          value={value}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
        />
      </div>
      <div>
        <TkSlider
          rangeVisibility={false}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={false}
          value={value}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
          hint="You can drag the slider"
        />
      </div>
      <div>
        <TkSlider
          rangeVisibility={false}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={false}
          value={value}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
          showAsterisk
          invalid
          error="This field is required"
          hint="You can drag the slider"
        />
      </div>

      <div>
        <TkSlider
          rangeVisibility={true}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={true}
          value={range}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
          type="labels"
        />
      </div>
      <div>
        <TkSlider
          rangeVisibility={true}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={true}
          value={range}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
          type="labels"
          hint="You can drag the slider"
        />
      </div>
      <div>
        <TkSlider
          rangeVisibility={true}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={true}
          value={range}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
          type="labels"
          showAsterisk
          invalid
          error="This field is required"
          hint="You can drag the slider"
        />
      </div>

      <div>
        <TkSlider
          rangeVisibility={true}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={true}
          value={range}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
          type="ticks"
        />
      </div>
      <div>
        <TkSlider
          rangeVisibility={true}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={true}
          value={range}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
          type="ticks"
          hint="You can drag the slider"
        />
      </div>
      <div>
        <TkSlider
          rangeVisibility={true}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={true}
          value={range}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
          type="ticks"
          showAsterisk
          invalid
          error="This field is required"
          hint="You can drag the slider"
        />
      </div>

      <div>
        <TkSlider
          rangeVisibility={false}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={true}
          value={range}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
        />
      </div>
      <div>
        <TkSlider
          rangeVisibility={false}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={true}
          value={range}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
          hint="You can drag the slider"
        />
      </div>
      <div>
        <TkSlider
          rangeVisibility={false}
          label="Brightness"
          min={0}
          max={100}
          step={1}
          range={true}
          value={range}
          onTkChange={(e) => {
            if (typeof e.detail === 'number') setValue(e.detail);
          }}
          showAsterisk
          invalid
          error="This field is required"
          hint="You can drag the slider"
        />
      </div>
    </>
  );
}

export default Slider;
