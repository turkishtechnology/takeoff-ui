import { TkCard, TkRadioGroup, TkRadio, TkIcon } from '@takeoff-ui/react';

function Radio() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TkCard header="Radio Group ile kullanım" containerStyle={{ padding: '16px' }}>
        <div slot="content">
          <TkRadioGroup
            onTkChange={e => {
              console.log('name1', e.detail);
            }}
            position="right"
            type="card"
          >
            <TkRadio label="label 1" name="name1" value="1" description="test">
              <div slot="content">
                <div className="flex items-start gap-2">
                  <TkIcon sign icon="home" variant="primary" />
                  <div className="flex flex-col gap-1">
                    <div>label</div>
                    <div>description</div>
                  </div>
                </div>
              </div>
            </TkRadio>
            <TkRadio label="label 2" name="name1" value="2" description="test">
              <div slot="content">
                <div className="flex items-start gap-2">
                  <TkIcon sign icon="home" variant="info" />
                  <div className="flex flex-col gap-1">
                    <div>label</div>
                    <div>description</div>
                  </div>
                </div>
              </div>
            </TkRadio>
          </TkRadioGroup>
        </div>
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
          onTkChange={e => {
            console.log('name3', e.detail);
          }}
        />
        <TkRadio
          label="label 2"
          name="name3"
          value="2"
          onTkChange={e => {
            console.log('name3', e.detail);
          }}
        />
      </TkCard>
    </div>
  );
}

export default Radio;
