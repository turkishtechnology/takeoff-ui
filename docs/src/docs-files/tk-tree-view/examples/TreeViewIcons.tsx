import { useState, useEffect } from 'react';
import { TkTreeView, TkTreeItem, TkCheckbox } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const modeOptions: Array<'basic' | 'stepper'> = ['basic', 'stepper'];

const TreeViewIcons = () => {
  const [showExpandIcon, setShowExpandIcon] = useState(false);
  const [showFolderIcon, setShowFolderIcon] = useState(false);
  const [showFileIcon, setShowFileIcon] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  useEffect(() => {
    setReactCode(`
<TkTreeView mode="basic" type="light" size="base" showExpandIcon={${showExpandIcon}} showFolderIcon={${showFolderIcon}} showFileIcon={${showFileIcon}} showBadge={${showBadge}}>
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
<TkTreeView mode="basic" type="light" size="base" :showExpandIcon.prop="${showExpandIcon}" :showFolderIcon.prop="${showFolderIcon}" :showFileIcon.prop="${showFileIcon}" :showBadge.prop="${showBadge}">
  <TkTreeItem item-id="1" label="Root Directory">
    <TkTreeItem item-id="1.2" label="Second Directory">
      <TkTreeItem item-id="1.3" label="Third Directory">
        <TkTreeItem item-id="1.4" label="Fourth Directory" />
      </TkTreeItem>
    </TkTreeItem>
  </TkTreeItem>
</TkTreeView>
`);
  }, [showExpandIcon, showFolderIcon, showFileIcon, showBadge]);

  const demo = (
    <div className="flex flex-col gap-8 items-start w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap gap-4">
          <TkCheckbox
            label="Show Expand Icon"
            value={showExpandIcon}
            onTkChange={(e) => setShowExpandIcon(e.detail)}
          />
          <TkCheckbox
            label="Show Folder Icon"
            value={showFolderIcon}
            onTkChange={(e) => setShowFolderIcon(e.detail)}
          />
          <TkCheckbox
            label="Show File Icon"
            value={showFileIcon}
            onTkChange={(e) => setShowFileIcon(e.detail)}
          />
          <TkCheckbox
            label="Show Badge"
            value={showBadge}
            onTkChange={(e) => setShowBadge(e.detail)}
          />
        </div>
        <div className="flex flex-row gap-4 w-full">
          <TkTreeView
            mode="basic"
            type="light"
            size="base"
            showExpandIcon={showExpandIcon}
            showFolderIcon={showFolderIcon}
            showFileIcon={showFileIcon}
            showBadge={showBadge}
          >
            <TkTreeItem itemId="1" label="Root Directory">
              <TkTreeItem itemId="1.2" label="Second Directory"></TkTreeItem>
            </TkTreeItem>
          </TkTreeView>
        </div>
        <div className="flex flex-row gap-4 w-full">
          <TkTreeView
            mode="basic"
            type="light"
            size="base"
            showExpandIcon={showExpandIcon}
            showFolderIcon={showFolderIcon}
            showFileIcon={showFileIcon}
            showBadge={showBadge}
          >
            <TkTreeItem itemId="1" label="File" />
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

export default TreeViewIcons;
