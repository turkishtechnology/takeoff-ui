import { useState, useEffect } from 'react';
import { TkTreeView, TkTreeItem, TkCheckbox } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const TreeViewDisabled = () => {
  const [disabled, setDisabled] = useState(false);
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  useEffect(() => {
    setReactCode(`
<TkTreeView mode="basic" type="light" size="base" disabled={${disabled}}>
  <TkTreeItem itemId="1" label="Root Directory">
    <TkTreeItem itemId="1.2" label="Second Directory">
      <TkTreeItem itemId="1.3" label="Third Directory">
        <TkTreeItem itemId="1.4" label="Fourth Directory" />
      </TkTreeItem>
    </TkTreeItem>
  </TkTreeItem>
</TkTreeView>
`);
    setVueCode(`
<TkTreeView mode="basic" type="light" size="base" disabled="${disabled}">
  <TkTreeItem item-id="1" label="Root Directory">
    <TkTreeItem item-id="1.2" label="Second Directory">
      <TkTreeItem item-id="1.3" label="Third Directory">
        <TkTreeItem item-id="1.4" label="Fourth Directory" />
      </TkTreeItem>
    </TkTreeItem>
  </TkTreeItem>
</TkTreeView>
`);
  }, [disabled]);

  const demo = (
    <div className="flex flex-col gap-8 items-start w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap gap-4">
          <TkCheckbox
            label="Disabled"
            value={disabled}
            onTkChange={(e) => setDisabled(e.detail)}
          />
        </div>
        <div className="flex flex-row gap-4 w-full">
          <TkTreeView mode="basic" type="light" size="base" disabled={disabled}>
            <TkTreeItem itemId="1" label="Root1 Directory">
              <TkTreeItem itemId="1.2" label="Second Directory"></TkTreeItem>
            </TkTreeItem>
          </TkTreeView>
        </div>
        <div className="flex flex-row gap-4 w-full">
          <TkTreeView mode="basic" type="light" size="base">
            <TkTreeItem itemId="1" label="Root2 Directory">
              <TkTreeItem
                itemId="1.2"
                label="Second Directory"
                disabled={disabled}
              ></TkTreeItem>
            </TkTreeItem>
          </TkTreeView>
        </div>
      </div>
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode=""
    />
  );
};

export default TreeViewDisabled;
