import React, { useState } from 'react';
import { TkDrawer, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const DrawerWithFooter = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const reactCode = `<TkButton label="Open Drawer" onTkClick={() => setShowDrawer(true)} />
<TkDrawer
    header="Drawer with Footer"
    open={showDrawer}
    onTkDrawerClose={() => setShowDrawer(false)}
>
    <div slot="content">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
    </div>
    <div slot="footer">
        <TkButton label="Cancel" variant="neutral" onTkClick={() => setShowDrawer(false)} type="text" />
        <TkButton label="Confirm" variant="primary" />
    </div>
</TkDrawer>`;

  const vueCode = `<TkButton label="Open Drawer" @tkClick="showDrawer = true" />
<TkDrawer
    header="Drawer with Footer"
    :open="showDrawer"
    @tkDrawerClose="()=> showDrawer = false"
>
    <div slot="content">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
    </div>
    <div slot="footer">
        <TkButton label="Cancel" variant="neutral" @tkClick="showDrawer = false" type="text" />
        <TkButton label="Confirm" variant="primary" />
    </div>
</TkDrawer>`;

  const demo = (
    <>
      <TkButton label="Open Drawer" onTkClick={() => setShowDrawer(true)} />
      <TkDrawer header="Drawer with Footer" open={showDrawer} onTkDrawerClose={() => setShowDrawer(false)}>
        <div slot="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam
            nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
          </p>
        </div>
        <div slot="footer">
          <TkButton label="Cancel" variant="neutral" onTkClick={() => setShowDrawer(false)} type="text" />
          <TkButton label="Confirm" variant="primary" />
        </div>
      </TkDrawer>
    </>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default DrawerWithFooter;
