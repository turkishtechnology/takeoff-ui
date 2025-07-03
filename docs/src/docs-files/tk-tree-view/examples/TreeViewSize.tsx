import { useState, useEffect } from 'react';
import {
  TkTreeView,
  TkTreeItem,
  TkRadioGroup,
  TkRadio,
} from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const sizeOptions: Array<'base' | 'small' | 'large'> = [
  'base',
  'small',
  'large',
];

const TreeViewSize = () => {
  const [size, setSize] = useState<'base' | 'small' | 'large'>('base');
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  useEffect(() => {
    setReactCode(`
<TkTreeView mode="basic" type="light" size="${size}">
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
<TkTreeView mode="basic" type="light" size="${size}">
  <TkTreeItem item-id="1" label="Root Directory">
    <TkTreeItem item-id="1.2" label="Second Directory">
      <TkTreeItem item-id="1.3" label="Third Directory">
        <TkTreeItem item-id="1.4" label="Fourth Directory" />
      </TkTreeItem>
    </TkTreeItem>
  </TkTreeItem>
</TkTreeView>
`);
  }, [size]);

  const demo = (
    <div className="flex flex-col gap-8 items-start w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap gap-4">
          <TkRadioGroup
            label="Size"
            value={size}
            onTkChange={(e) => setSize(e.detail)}
          >
            {sizeOptions.map((opt) => (
              <TkRadio
                key={opt}
                label={opt.charAt(0).toUpperCase() + opt.slice(1)}
                value={opt}
              />
            ))}
          </TkRadioGroup>
        </div>
        <div className="w-full">
          <TkTreeView mode="basic" type="light" size={size}>
            <TkTreeItem itemId="1" label="Root Directory">
              <TkTreeItem itemId="1.2" label="Second Directory">
                <TkTreeItem itemId="1.3" label="Third Directory">
                  <TkTreeItem itemId="1.4" label="Fourth Directory" />
                </TkTreeItem>
              </TkTreeItem>
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

export default TreeViewSize;
