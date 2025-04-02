import { TkCard, TkRadioGroup, TkRadio } from '@takeoff-ui/react';

function Radio() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TkCard header="Radio Group ile kullanım">
        <TkRadioGroup
          onTkChange={(e) => {
            console.log('name1', e.detail);
          }}
        >
          <TkRadio label="label 1" name="name1" value="1" />
          <TkRadio label="label 2" name="name1" value="2" />
        </TkRadioGroup>
      </TkCard>
      <TkCard header="Tekil kullanım">
        <TkRadio label="label 1" name="name2" value="1" />
        <TkRadio label="label 2" name="name2" value="2" />
      </TkCard>
      <TkCard header="Tekil kullanım">
        <TkRadio
          label="label 1"
          name="name3"
          value="1"
          onTkChange={(e) => {
            console.log('name3', e.detail);
          }}
        />
        <TkRadio
          label="label 2"
          name="name3"
          value="2"
          onTkChange={(e) => {
            console.log('name3', e.detail);
          }}
        />
      </TkCard>
    </div>
  );
}

export default Radio;
