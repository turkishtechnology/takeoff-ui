import React, { useState } from 'react';
import { TkTabs, TkTabsItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Controlled = () => {
  const reactCode = `const [activeTab, setActiveTab] = useState(0);

<TkTabs
  activeIndex={activeTab}
  controlled
  onTkTabClick={(e) => setActiveTab(e.detail)}
>
  <TkTabsItem label="Tab label" icon="flight">
    <p className="m-0">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
      sed consequuntur error repudiandae numquam deserunt quisquam
      repellat libero asperiores earum nam nobis, culpa ratione quam
      perferendis esse, cupiditate nequequas! 1
    </p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight">
    <p className="m-0">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
      sed consequuntur error repudiandae numquam deserunt quisquam
      repellat libero asperiores earum nam nobis, culpa ratione quam
      perferendis esse, cupiditate nequequas! 2
    </p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight">
    <p className="m-0">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
      sed consequuntur error repudiandae numquam deserunt quisquam
      repellat libero asperiores earum nam nobis, culpa ratione quam
      perferendis esse, cupiditate nequequas! 3
    </p>
  </TkTabsItem>
</TkTabs> `;

  const vueCode = `const activeTab = ref(0);

<TkTabs
  activeIndex={activeTab}
  controlled
  onTkTabClick={(e) => activeTab = e.detail}
>
  <TkTabsItem label="Tab label" icon="flight">
    <p className="m-0">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
      sed consequuntur error repudiandae numquam deserunt quisquam
      repellat libero asperiores earum nam nobis, culpa ratione quam
      perferendis esse, cupiditate nequequas! 1
    </p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight">
    <p className="m-0">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
      sed consequuntur error repudiandae numquam deserunt quisquam
      repellat libero asperiores earum nam nobis, culpa ratione quam
      perferendis esse, cupiditate nequequas! 2
    </p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight">
    <p className="m-0">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
      sed consequuntur error repudiandae numquam deserunt quisquam
      repellat libero asperiores earum nam nobis, culpa ratione quam
      perferendis esse, cupiditate nequequas! 3
    </p>
  </TkTabsItem>
</TkTabs>`;

  const [activeTab, setActiveTab] = useState(0);

  const demo = (
    <>
      <TkTabs
        activeIndex={activeTab}
        controlled
        onTkTabClick={(e) => setActiveTab(e.detail)}
      >
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate nequequas! 1
          </p>
        </TkTabsItem>
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate nequequas! 2
          </p>
        </TkTabsItem>
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate nequequas! 3
          </p>
        </TkTabsItem>
      </TkTabs>
    </>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};
export default Controlled;
