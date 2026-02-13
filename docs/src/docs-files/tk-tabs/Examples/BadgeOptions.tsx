import { TkTabs, TkTabsItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const BadgeOptions = () => {
  const reactCode = `<TkTabs>
  <TkTabsItem label="Tab label" icon="flight" badged badgeCount={2} badgeOptions={{ type: 'text', variant: 'danger' }}>
    <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight" badged badgeCount={5} badgeOptions={{ type: 'outlined', variant: 'warning', rounded: false }}>
    <p className="m-0">Incididunt velit elit cupidatat dolore elit tempor laborum dolor amet magna aute magna pariatur.</p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight" badged badgeLabel="999" badgeOptions={{ type: 'filled', variant: 'info' }}>
    <p className="m-0">Nulla cillum laborum amet sunt irure dolore veniam esse veniam ex ullamco.</p>
  </TkTabsItem>
</TkTabs>`;

  const vueCode = `<TkTabs>
  <TkTabsItem label="Tab label" icon="flight" badged :badgeCount="2" :badgeOptions="{ type: 'text', variant: 'danger' }">
    <p class="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight" badged :badgeCount="5" :badgeOptions="{ type: 'outlined', variant: 'warning', rounded: false }">
    <p class="m-0">Incididunt velit elit cupidatat dolore elit tempor laborum dolor amet magna aute magna pariatur.</p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight" badged badgeLabel="999" :badgeOptions="{ type: 'filled', variant: 'info' }">
    <p class="m-0">Nulla cillum laborum amet sunt irure dolore veniam esse veniam ex ullamco.</p>
  </TkTabsItem>
</TkTabs>`;

  const angularCode = `<tk-tabs>
  <tk-tabs-item label="Tab label" icon="flight" badged badgeCount={2} badgeOptions={{ type: 'text', variant: 'danger' }}>
    <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  </tk-tabs-item>
  <tk-tabs-item label="Tab label" icon="flight" badged badgeCount={5} badgeOptions={{ type: 'outlined', variant: 'warning', rounded: false }}>
    <p className="m-0">Incididunt velit elit cupidatat dolore elit tempor laborum dolor amet magna aute magna pariatur.</p>
  </tk-tabs-item>
  <tk-tabs-item label="Tab label" icon="flight" badged badgeLabel="999" badgeOptions={{ type: 'filled', variant: 'info' }}>
    <p className="m-0">Nulla cillum laborum amet sunt irure dolore veniam esse veniam ex ullamco.</p>
  </tk-tabs-item>
</tk-tabs>`;

  const demo = (
    <TkTabs>
      <TkTabsItem label="Tab label" icon="flight" badged badgeCount={2} badgeOptions={{ type: 'text', variant: 'danger' }}>
        <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </TkTabsItem>
      <TkTabsItem label="Tab label" icon="flight" badged badgeCount={5} badgeOptions={{ type: 'outlined', variant: 'warning', rounded: false }}>
        <p className="m-0">Incididunt velit elit cupidatat dolore elit tempor laborum dolor amet magna aute magna pariatur.</p>
      </TkTabsItem>
      <TkTabsItem label="Tab label" icon="flight" badged badgeLabel="999" badgeOptions={{ type: 'filled', variant: 'info' }}>
        <p className="m-0">Nulla cillum laborum amet sunt irure dolore veniam esse veniam ex ullamco.</p>
      </TkTabsItem>
    </TkTabs>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};
export default BadgeOptions;
