import { TkDrawer, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Example = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  function handleClick() {
    setShowDrawer(true);
  }

  return (
    <>
      <TkButton label="Open Drawer" onTkClick={handleClick} />
      <TkDrawer header="Header Text" open={showDrawer} onTkDrawerClose={() => setShowDrawer(false)}>
        <div slot="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam
            nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
          </p>
        </div>
      </TkDrawer>
    </>
  );
};

const Basic = () => {
  const reactCode = `<TkButton label="Open Drawer" onTkClick={handleClick} />
<TkDrawer
 header="Header Text"
 open={showDrawer}
 onTkDrawerClose={() => setShowDrawer(false)}
>
  <div slot="content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
      quas!
    </p>
  </div>
</TkDrawer>`;

  const vueCode = `const showDrawer = ref(false);

<TkButton label="Open Drawer" @tk-click="showDrawer = true" />
<TkDrawer
  header="Header Text"
  :open="showDrawer"
  @tk-drawer-close="() => (showDrawer = false)"
>
  <div slot="content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
      sed consequuntur error repudiandae numquam deserunt quisquam repellat
      libero asperiores earum nam nobis, culpa ratione quam perferendis
      esse, cupiditate neque quas!
    </p>
  </div>
</TkDrawer>

`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Basic;
