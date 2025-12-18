import React from 'react';
import { TkTabs, TkTabsItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const AlignHeaders = () => {
  const reactCode = `<TkTabs alignHeaders="start">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Incididunt velit elit cupidatat dolore elit tempor laborum dolor amet magna aute magna pariatur.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Nulla cillum laborum amet sunt irure dolore veniam esse veniam ex ullamco.</p>
    </TkTabsItem>
  </TkTabs>

  <TkTabs alignHeaders="center">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
  </TkTabs>

  <TkTabs alignHeaders="end">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
  </TkTabs>`;

  const vueCode = `<TkTabs alignHeaders="start">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Incididunt velit elit cupidatat dolore elit tempor laborum dolor amet magna aute magna pariatur.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Nulla cillum laborum amet sunt irure dolore veniam esse veniam ex ullamco.</p>
    </TkTabsItem>
  </TkTabs>

  <TkTabs alignHeaders="center">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
  </TkTabs>

  <TkTabs alignHeaders="end">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </TkTabsItem>
  </TkTabs>`;

  const angularCode = `<tk-tabs alignHeaders="start">
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Incididunt velit elit cupidatat dolore elit tempor laborum dolor amet magna aute magna pariatur.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Nulla cillum laborum amet sunt irure dolore veniam esse veniam ex ullamco.</p>
    </tk-tabs-item>
  </tk-tabs>

  <tk-tabs alignHeaders="center">
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </tk-tabs-item>
  </tk-tabs>

  <tk-tabs alignHeaders="end">
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </tk-tabs-item>
  </tk-tabs>`;

  const demo = (
    <>
      <div>
        <h3>Start</h3>
        <TkTabs
          alignHeaders="start"
          contentStyle={{
            color: 'var(--text-dark)',
            fontSize: 'var(--desktop-body-s-size)',
          }}
        >
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Incididunt velit elit cupidatat dolore elit tempor laborum dolor amet magna aute magna pariatur.</p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Nulla cillum laborum amet sunt irure dolore veniam esse veniam ex ullamco.</p>
          </TkTabsItem>
        </TkTabs>
      </div>
      <div>
        <h3>Center</h3>
        <TkTabs
          alignHeaders="center"
          contentStyle={{
            color: 'var(--text-dark)',
            fontSize: 'var(--desktop-body-s-size)',
          }}
        >
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </TkTabsItem>
        </TkTabs>
      </div>
      <div>
        <h3>End</h3>
        <TkTabs
          alignHeaders="end"
          contentStyle={{
            color: 'var(--text-dark)',
            fontSize: 'var(--desktop-body-s-size)',
          }}
        >
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </TkTabsItem>
        </TkTabs>
      </div>
    </>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};
export default AlignHeaders;
