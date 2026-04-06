import React from 'react';
import { TkTabs, TkTabsItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Type = () => {
  const reactCode = `<TkTabs type="basic">
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

  <TkTabs type="compact">
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

  <TkTabs type="divided">
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

  <TkTabs type="expanded">
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

  const vueCode = `<TkTabs type="basic">
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
  
  <TkTabs type="compact">
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

  <TkTabs type="divided">
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

  <TkTabs type="expanded">
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

  const angularCode = `<tk-tabs type="basic">
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

  <tk-tabs type="compact">
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

  <tk-tabs type="divided">
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

  <tk-tabs type="expanded">
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
        <h3>Basic</h3>
        <TkTabs
          type="basic"
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
        <h3>Compact</h3>
        <TkTabs
          type="compact"
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
        <h3>Divided</h3>
        <TkTabs
          type="divided"
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
        <h3>Expanded</h3>
        <TkTabs
          type="expanded"
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
export default Type;
