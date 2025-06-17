import React, { useState } from 'react';
import { TkTabs, TkTabsItem, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Programmatically = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const codeSampleReact = `
<TkButton label="First Tab" onClick={() => setActiveTabIndex(0)} />
<TkButton label="Second Tab" onClick={() => setActiveTabIndex(1)} />
<TkButton label="Third Tab" onClick={() => setActiveTabIndex(2)} />
...
<TkTabs activeIndex={activeTabIndex} onTkTabChange={(e) => setActiveTabIndex(e.detail)}>
    <TkTabsItem label="First Tab" icon="flight">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
    <TkTabsItem label="Second Tab" icon="flight">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
    <TkTabsItem label="Third Tab" icon="flight">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
</TkTabs>`;
  const codeSampleVue = `
<TkButton label="First Tab" @click="activeTabIndex = 0" />
<TkButton label="Second Tab" @click="activeTabIndex = 1" />
<TkButton label="Third Tab" @click="activeTabIndex = 2" />
...
<TkTabs :activeIndex="activeTabIndex" @tk-tab-change="(e) => activeTabIndex = e.detail">
    <TkTabsItem label="First Tab" icon="flight">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
    <TkTabsItem label="Second Tab" icon="flight">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
    <TkTabsItem label="Third Tab" icon="flight">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
</TkTabs>`;

  const demo = (
    <>
      <div className="flex gap-2 mb-4">
        <TkButton label="First Tab" onClick={() => setActiveTabIndex(0)} />
        <TkButton label="Second Tab" onClick={() => setActiveTabIndex(1)} />
        <TkButton label="Third Tab" onClick={() => setActiveTabIndex(2)} />
      </div>
      <TkTabs
        activeIndex={activeTabIndex}
        onTkTabChange={(e) => setActiveTabIndex(e.detail)}
        contentStyle={{
          color: 'var(--text-dark)',
          fontSize: 'var(--desktop-body-s-size)',
        }}
      >
        <TkTabsItem label="First Tab" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate nequequas! 1
          </p>
        </TkTabsItem>
        <TkTabsItem label="Second Tab" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate nequequas! 2
          </p>
        </TkTabsItem>
        <TkTabsItem label="Third Tab" icon="flight">
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
      reactCode={codeSampleReact}
      vueCode={codeSampleVue}
      angularCode={''}
    />
  );
};

export default Programmatically;
