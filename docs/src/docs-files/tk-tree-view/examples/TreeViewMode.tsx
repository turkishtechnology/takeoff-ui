import { useState, useEffect } from 'react';
import {
  TkTreeView,
  TkTreeItem,
  TkRadioGroup,
  TkRadio,
} from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const modeOptions: Array<'basic' | 'stepper'> = ['basic', 'stepper'];

const TreeViewMode = () => {
  const [mode, setMode] = useState<'basic' | 'stepper'>('basic');
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  useEffect(() => {
    setReactCode(`
<TkTreeView mode="${mode}" type="light" size="base">
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
<TkTreeView mode="${mode}" type="light" size="base">
  <TkTreeItem item-id="1" label="Root Directory">
    <TkTreeItem item-id="1.2" label="Second Directory">
      <TkTreeItem item-id="1.3" label="Third Directory">
        <TkTreeItem item-id="1.4" label="Fourth Directory" />
      </TkTreeItem>
    </TkTreeItem>
  </TkTreeItem>
</TkTreeView>
`);
  }, [mode]);

  const demo = (
    <div className="flex flex-col gap-8 items-start w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap gap-4">
          <TkRadioGroup
            label="Mode"
            value={mode}
            onTkChange={(e) => setMode(e.detail)}
          >
            {modeOptions.map((opt) => (
              <TkRadio
                key={opt}
                label={opt.charAt(0).toUpperCase() + opt.slice(1)}
                value={opt}
              />
            ))}
          </TkRadioGroup>
        </div>
        <div className="w-full">
          <TkTreeView mode={mode} type="light" size="base">
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

export default TreeViewMode;
