import { useState, useEffect } from 'react';
import {
  TkTreeView,
  TkTreeItem,
  TkRadioGroup,
  TkRadio,
} from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const typeOptions: Array<'basic' | 'divided' | 'light'> = [
  'basic',
  'divided',
  'light',
];

const TreeViewType = () => {
  const [type, setType] = useState<'basic' | 'divided' | 'light'>('basic');
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  useEffect(() => {
    setReactCode(`
<TkTreeView mode="basic" type="${type}" size="base">
  <TkTreeItem itemId="1" label="Root Directory">
    <TkTreeItem itemId="1.2" label="Second Directory">
      <TkTreeItem itemId="1.3" label="Third Directory">
        <TkTreeItem itemId="1.4" label="Fourth Directory" />
      </TkTreeItem>
    </TkTreeItem>
    <TkTreeItem itemId="2" label="Child 1" />
    <TkTreeItem itemId="3" label="Child 2" />
    <TkTreeItem itemId="4" label="Child 3" />
    <TkTreeItem itemId="5" label="Child 4" />
    <TkTreeItem itemId="6" label="Child 5" />
    <TkTreeItem itemId="7" label="Child 6" />
    <TkTreeItem itemId="8" label="Child 7" />
  </TkTreeItem>
</TkTreeView>
`);
    setVueCode(`
<TkTreeView mode="basic" type="${type}" size="base">
  <TkTreeItem item-id="1" label="Root Directory">
    <TkTreeItem item-id="1.2" label="Second Directory">
      <TkTreeItem item-id="1.3" label="Third Directory">
        <TkTreeItem item-id="1.4" label="Fourth Directory" />
      </TkTreeItem>
    </TkTreeItem>
    <TkTreeItem item-id="2" label="Child 1" />
    <TkTreeItem item-id="3" label="Child 2" />
    <TkTreeItem item-id="4" label="Child 3" />
    <TkTreeItem item-id="5" label="Child 4" />
    <TkTreeItem item-id="6" label="Child 5" />
    <TkTreeItem item-id="7" label="Child 6" />
    <TkTreeItem item-id="8" label="Child 7" />
  </TkTreeItem>
</TkTreeView>
`);
  }, [type]);

  const demo = (
    <div className="flex flex-col gap-8 items-start w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap gap-4">
          <TkRadioGroup
            label="Type"
            value={type}
            onTkChange={(e) => setType(e.detail)}
          >
            {typeOptions.map((opt) => (
              <TkRadio
                key={opt}
                label={opt.charAt(0).toUpperCase() + opt.slice(1)}
                value={opt}
              />
            ))}
          </TkRadioGroup>
        </div>
        <div className="w-full">
          <TkTreeView mode="basic" type={type} size="base">
            <TkTreeItem itemId="1" label="Root Directory">
              <TkTreeItem itemId="1.2" label="Second Directory">
                <TkTreeItem itemId="1.3" label="Third Directory">
                  <TkTreeItem itemId="1.4" label="Fourth Directory" />
                </TkTreeItem>
              </TkTreeItem>
              <TkTreeItem itemId="2" label="Child 1" />
              <TkTreeItem itemId="3" label="Child 2" />
              <TkTreeItem itemId="4" label="Child 3" />
              <TkTreeItem itemId="5" label="Child 4" />
              <TkTreeItem itemId="6" label="Child 5" />
              <TkTreeItem itemId="7" label="Child 6" />
              <TkTreeItem itemId="8" label="Child 7" />
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

export default TreeViewType;
