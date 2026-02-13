import React from 'react';
import { TkTabs, TkTabsItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const SpreadHeaders = () => {
  const reactCode = `<TkTabs spreadHeaders>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
  </TkTabs>`;

  const vueCode = `<TkTabs :spreadHeaders="true">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
  </TkTabs>`;

  const angularCode = `<tk-tabs [spreadHeaders]="true">
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </tk-tabs-item>
  </tk-tabs>`;

  const demo = (
    <>
      <TkTabs
        spreadHeaders
        contentStyle={{
          color: 'var(--text-dark)',
          fontSize: 'var(--desktop-body-s-size)',
        }}
      >
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam
            nobis, culpa ratione quam perferendis esse, cupiditate nequequas! 1
          </p>
        </TkTabsItem>
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam
            nobis, culpa ratione quam perferendis esse, cupiditate nequequas! 2
          </p>
        </TkTabsItem>
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam
            nobis, culpa ratione quam perferendis esse, cupiditate nequequas! 3
          </p>
        </TkTabsItem>
      </TkTabs>
    </>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};
export default SpreadHeaders;
