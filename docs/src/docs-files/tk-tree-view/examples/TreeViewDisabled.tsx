import { useState, useEffect } from 'react';
import {
  TkTreeView,
  TkTreeItem,
  TkRadioGroup,
  TkRadio,
} from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const TreeViewDisabled = () => {
  const [disabledMode, setDisabledMode] = useState('null'); // 'none', 'tree', 'item'
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  useEffect(() => {
    let reactTreeViewDisabled = disabledMode === 'tree' ? ' disabled' : '';
    let reactTreeItemDisabled = disabledMode === 'item' ? ' disabled' : '';
    let vueTreeViewDisabled = disabledMode === 'tree' ? ' disabled' : '';
    let vueTreeItemDisabled = disabledMode === 'item' ? ' disabled' : '';

    setReactCode(`
<TkTreeView mode="basic" type="light" size="base" ${reactTreeViewDisabled}>
  <TkTreeItem itemId="1" label="Root Directory">
    <TkTreeItem itemId="1.2" label="Second Directory" ${reactTreeItemDisabled}>
      <TkTreeItem itemId="1.3" label="Third Directory" />
    </TkTreeItem>
    <TkTreeItem itemId="2" label="Another Child" />
  </TkTreeItem>
</TkTreeView>
`);
    setVueCode(`
<TkTreeView mode="basic" type="light" size="base" ${vueTreeViewDisabled}>
  <TkTreeItem item-id="1" label="Root Directory">
    <TkTreeItem item-id="1.2" label="Second Directory" ${vueTreeItemDisabled}>
      <TkTreeItem item-id="1.3" label="Third Directory" />
    </TkTreeItem>
    <TkTreeItem item-id="2" label="Another Child" />
  </TkTreeItem>
</TkTreeView>
`);
  }, [disabledMode]);

  const demo = (
    <div className="flex flex-col gap-8 items-start w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap gap-4 items-center">
          <label htmlFor="disabled-mode-radio">Disable:</label>
          <TkRadioGroup
            id="disabled-mode-radio"
            value={disabledMode}
            onTkChange={(e) => setDisabledMode(e.detail)}
            direction="horizontal"
          >
            <TkRadio value="tree">TkTreeView</TkRadio>
            <TkRadio value="item">TkTreeItem</TkRadio>
          </TkRadioGroup>
        </div>
        <div className="flex flex-row gap-4 w-full">
          <TkTreeView
            mode="basic"
            type="light"
            size="base"
            disabled={disabledMode === 'tree'}
          >
            <TkTreeItem itemId="1" label="Root Directory">
              <TkTreeItem
                itemId="1.2"
                label="Second Directory"
                disabled={disabledMode === 'item'}
              >
                <TkTreeItem itemId="1.3" label="Third Directory" />
              </TkTreeItem>
              <TkTreeItem itemId="2" label="Another Child" />
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
