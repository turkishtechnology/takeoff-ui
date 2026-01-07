import React from 'react';
import { TkTabs, TkTabsItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Sizes = () => {
  const reactCode = `<TkTabs size="xsmall">
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

  <TkTabs size="base">
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

  <TkTabs size="large">
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

  const vueCode = `<TkTabs size="xsmall">
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

  <TkTabs size="base">
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

  <TkTabs size="large">
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

  const angularCode = `<tk-tabs size="xsmall">
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

  <tk-tabs size="base">
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

  <tk-tabs size="large">
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
        <h3>XSmall</h3>
        <TkTabs
          size="xsmall"
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
        <h3>Base</h3>
        <TkTabs
          size="base"
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
        <h3>Large</h3>
        <TkTabs
          size="large"
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
export default Sizes;
