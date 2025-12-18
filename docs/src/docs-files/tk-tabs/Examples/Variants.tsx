import React from 'react';
import { TkTabs, TkTabsItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Variant = () => {
  const reactCode = `<TkTabs variant="primary">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Adipisicing aliqua nulla cupidatat proident.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Culpa aliqua nisi elit velit nostrud id quis.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Pariatur elit ad culpa quis.</p>
    </TkTabsItem>
  </TkTabs>

  <TkTabs variant="info">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Adipisicing aliqua nulla cupidatat proident.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Culpa aliqua nisi elit velit nostrud id quis.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Pariatur elit ad culpa quis.</p>
    </TkTabsItem>
  </TkTabs>

  <TkTabs variant="neutral">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Adipisicing aliqua nulla cupidatat proident.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Culpa aliqua nisi elit velit nostrud id quis.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Pariatur elit ad culpa quis.</p>
    </TkTabsItem>
  </TkTabs>`;

  const vueCode = `<TkTabs variant="primary">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Adipisicing aliqua nulla cupidatat proident.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Culpa aliqua nisi elit velit nostrud id quis.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Pariatur elit ad culpa quis.</p>
    </TkTabsItem>
  </TkTabs>

  <TkTabs variant="info">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Adipisicing aliqua nulla cupidatat proident.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Culpa aliqua nisi elit velit nostrud id quis.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Pariatur elit ad culpa quis.</p>
    </TkTabsItem>
  </TkTabs>

  <TkTabs variant="neutral">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Adipisicing aliqua nulla cupidatat proident.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Culpa aliqua nisi elit velit nostrud id quis.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Pariatur elit ad culpa quis.</p>
    </TkTabsItem>
  </TkTabs>`;

  const angularCode = `<tk-tabs variant="primary">
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Adipisicing aliqua nulla cupidatat proident.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Culpa aliqua nisi elit velit nostrud id quis.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Pariatur elit ad culpa quis.</p>
    </tk-tabs-item>
  </tk-tabs>

  <tk-tabs variant="info">
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Adipisicing aliqua nulla cupidatat proident.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Culpa aliqua nisi elit velit nostrud id quis.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Pariatur elit ad culpa quis.</p>
    </tk-tabs-item>
  </tk-tabs>

  <tk-tabs variant="neutral">
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Adipisicing aliqua nulla cupidatat proident.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Culpa aliqua nisi elit velit nostrud id quis.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Pariatur elit ad culpa quis.</p>
    </tk-tabs-item>
  </tk-tabs>`;

  const demo = (
    <>
      <div>
        <h3>Primary</h3>
        <TkTabs
          variant="primary"
          contentStyle={{
            color: 'var(--text-dark)',
            fontSize: 'var(--desktop-body-s-size)',
          }}
        >
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Adipisicing aliqua nulla cupidatat proident.</p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Culpa aliqua nisi elit velit nostrud id quis.</p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Pariatur elit ad culpa quis.</p>
          </TkTabsItem>
        </TkTabs>
      </div>
      <div>
        <h3>Info</h3>
        <TkTabs
          variant="info"
          contentStyle={{
            color: 'var(--text-dark)',
            fontSize: 'var(--desktop-body-s-size)',
          }}
        >
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Adipisicing aliqua nulla cupidatat proident.</p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Culpa aliqua nisi elit velit nostrud id quis.</p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Pariatur elit ad culpa quis.</p>
          </TkTabsItem>
        </TkTabs>
      </div>
      <div>
        <h3>Neutral</h3>
        <TkTabs
          variant="neutral"
          contentStyle={{
            color: 'var(--text-dark)',
            fontSize: 'var(--desktop-body-s-size)',
          }}
        >
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Adipisicing aliqua nulla cupidatat proident.</p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Culpa aliqua nisi elit velit nostrud id quis.</p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Pariatur elit ad culpa quis.</p>
          </TkTabsItem>
        </TkTabs>
      </div>
    </>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};
export default Variant;
